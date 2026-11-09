# -*- coding: utf-8 -*-
"""
死表校验：检查 data/*.json 之间不自相矛盾。
只用标准库。用法：
  python scripts/check_tables.py
退出码 0 = 全过，1 = 有问题。
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

errors = []
warns = []
oks = []


def load(name):
    path = os.path.join(DATA, name)
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def check_jingjie(t):
    if t is None:
        warns.append("境界.json 缺失，跳过")
        return
    jj = t["境界"]
    dk = t["大档"]

    seqs = [x["序"] for x in jj]
    if seqs != list(range(1, len(jj) + 1)):
        errors.append("境界.json：序不是从 1 连续递增，实际 %s" % seqs)
    else:
        oks.append("境界序 1~%d 连续" % len(jj))

    names = [x["名"] for x in jj]
    dup = {n for n in names if names.count(n) > 1}
    if dup:
        errors.append("境界.json：境界名重复 %s" % sorted(dup))
    else:
        oks.append("境界名无重复（%d 个）" % len(names))

    # 大档区间必须无缝覆盖且与每条境界的「档」字段一致
    covered = {}
    for d in dk:
        for i in range(d["起"], d["止"] + 1):
            if i in covered:
                errors.append("境界.json：第 %d 境同时属于 %s 与 %s" % (i, covered[i], d["名"]))
            covered[i] = d["名"]
    missing = [i for i in seqs if i not in covered]
    if missing:
        errors.append("境界.json：这些境界没有大档 %s" % missing)

    mismatch = [(x["序"], x["名"], x["档"], covered.get(x["序"])) for x in jj
                if covered.get(x["序"]) != x["档"]]
    if mismatch:
        for m in mismatch:
            errors.append("境界.json：第 %d 境「%s」标称 %s，大档区间算出 %s" % m)
    else:
        oks.append("大档区间与每条境界的档字段一致")

    # 大档之间不许重叠、不许有空洞
    dks = sorted(dk, key=lambda d: d["起"])
    for a, b in zip(dks, dks[1:]):
        if b["起"] != a["止"] + 1:
            errors.append("境界.json：%s(止%d) 与 %s(起%d) 之间有断档或重叠"
                          % (a["名"], a["止"], b["名"], b["起"]))
    if dks[0]["起"] != 1:
        errors.append("境界.json：首个大档不从 1 起")
    if dks[-1]["止"] != len(jj):
        errors.append("境界.json：末尾大档止于 %d，但境界共 %d 条" % (dks[-1]["止"], len(jj)))
    else:
        oks.append("大档 %s 覆盖 1~%d，无断档" % ("/".join(d["名"] for d in dks), len(jj)))

    for x in jj:
        if not x.get("要义", "").strip():
            errors.append("境界.json：第 %d 境「%s」要义为空" % (x["序"], x["名"]))


def check_xinfa(t, jj):
    """心法表：五阶各自能撑到第几境，必须非递减且不超过境界总数。
    允许与前一阶同顶，但必须显式标 "同顶": true —— 同顶代表死路阶，是设计不是笔误。"""
    if t is None:
        warns.append("心法.json 尚未建立，跳过")
        return
    total = len(jj) if jj else 11
    last = 0
    last_name = ""
    for row in t["心法阶"]:
        cap = row["上限"]
        name = row["名"]
        if not isinstance(cap, int):
            errors.append("心法.json：「%s」上限必须是整数" % name)
            continue
        if cap < last:
            errors.append("心法.json：「%s」上限 %d 低于前一阶「%s」的 %d" % (name, cap, last_name, last))
        elif cap == last and not row.get("同顶"):
            errors.append("心法.json：「%s」与「%s」同为 %d，但未标 同顶:true —— 死路阶必须显式声明" % (name, last_name, cap))
        if cap > total:
            errors.append("心法.json：「%s」上限 %d 超过境界总数 %d" % (name, cap, total))
        if last_name == "" or cap > last:
            last = cap
            last_name = name
    if last > 0:
        oks.append("心法五阶上限非递减，最高到第 %d 境" % last)


def check_pojing(t, jj):
    if t is None:
        warns.append("破境任务.json 尚未建立，跳过")
        return
    total = len(jj) if jj else 11
    rows = t["破境"]
    targets = [r["目标境"] for r in rows]
    if targets != list(range(2, total + 1)):
        errors.append("破境任务.json：目标境应覆盖 2~%d，实际 %s" % (total, targets))
    else:
        oks.append("破境任务覆盖 2~%d，无缺漏" % total)
    for r in rows:
        n = len(r.get("任务", []))
        if n != 3:
            errors.append("破境任务.json：目标第 %d 境有 %d 条任务，应固定 3 条" % (r["目标境"], n))


def check_lock(xf_t, pj_t, jj):
    """交叉校验：破境表里的「锁」标记，必须正好落在需要换心法的那几境上。
    规则：tier(N) = 上限 >= N 的最低一阶。凡 tier(N) != tier(N-1) 的 N 就是锁点。"""
    if xf_t is None or pj_t is None:
        warns.append("锁标记交叉校验：心法表或破境表缺失，跳过")
        return
    total = len(jj) if jj else 11
    tiers = sorted(xf_t["心法阶"], key=lambda r: r["序"])

    def tier(n):
        for r in tiers:
            if r["上限"] >= n:
                return r["名"]
        return None

    expect = {}
    for n in range(2, total + 1):
        prev = tier(n - 1) if n - 1 >= 1 else None
        expect[n] = (tier(n) != prev) if prev else True

    bad = []
    for row in pj_t["破境"]:
        n = row["目标境"]
        if n not in expect:
            continue
        if bool(row.get("锁")) != expect[n]:
            bad.append((n, row.get("锁"), expect[n]))
    if bad:
        for n, got, want in bad:
            errors.append("破境任务.json：第 %d 境的「锁」标成 %s，按心法表应为 %s" % (n, got, want))
    else:
        lock_pts = [n for n in expect if expect[n]]
        oks.append("锁标记与心法表一致（锁点：%s）" % "、".join(str(n) for n in lock_pts))


def main():
    jj_t = load("境界.json")
    xf_t = load("心法.json")
    pj_t = load("破境任务.json")

    check_jingjie(jj_t)
    jj = jj_t["境界"] if jj_t else None
    check_xinfa(xf_t, jj)
    check_pojing(pj_t, jj)
    check_lock(xf_t, pj_t, jj)

    out = []
    for s in oks:
        out.append("  PASS  " + s)
    for s in warns:
        out.append("  SKIP  " + s)
    for s in errors:
        out.append("  FAIL  " + s)
    out.append("")
    out.append("结果：%d 通过 / %d 跳过 / %d 失败" % (len(oks), len(warns), len(errors)))
    print("\n".join(out))
    return 0 if not errors else 1


if __name__ == "__main__":
    sys.exit(main())
