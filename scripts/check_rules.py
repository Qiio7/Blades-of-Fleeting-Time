# -*- coding: utf-8 -*-
"""
规则条目校验：字数上限、结构完整、口语词扫描。
用法：python scripts/check_rules.py
退出码 0 = 全过，1 = 有问题。

口径来自 docs/prd/世界书分段规划.md：
- 单条上限见 LIMITS；未列出的默认 2500
- 结构：【条目名】 + 用途： + 至少 3 个「中文数字_」小节
- 文风：规则条目写规范句，不写口语与评价。引号内的对白不参与扫描。
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RULES = os.path.join(ROOT, "Source", "Rules")

LIMITS = {
    "好感与情谊": 2200,
    "相处": 2200,
    "门内": 1800,
    "杂学": 800,
    "破境": 2500,
    "武学": 1800,
    "交锋": 1800,
    "伤病": 1500,
    "机缘": 1500,
}
DEFAULT_LIMIT = 2500

# 口语、评价、比喻类词。规则条目里出现即为文风不合格。
COLLOQUIAL = [
    "吧", "呢", "啊", "嘛", "呀", "哦",
    "你", "我", "咱",
    "其实", "说白了", "说实话", "实在",
    "挺", "太", "很不", "非常", "特别",
    "宁可", "反而", "才不", "就是",
    "脑补", "白写", "删掉",
    "真会", "很难", "难评", "有点", "一点儿",
    "不许", "别把", "别让",
]

QUOTED = re.compile(r"「[^」]*」|『[^』]*』|“[^”]*”|\"[^\"]*\"|（[^）]*）|\([^)]*\)")
SECTION = re.compile(r"^[一二三四五六七八九十]+_", re.M)

errors = []
warns = []
oks = []


def strip_quoted(text):
    return QUOTED.sub("", text)


def check(name, text):
    limit = LIMITS.get(name, DEFAULT_LIMIT)
    n = len(text)

    if n > limit:
        errors.append("%s：%d 字，超过上限 %d" % (name, n, limit))
    else:
        oks.append("%s：%d/%d 字" % (name, n, limit))

    head = text.lstrip().splitlines()[0] if text.strip() else ""
    if not head.startswith("【") or not head.rstrip().endswith("】"):
        errors.append("%s：首行必须是【条目名】" % name)
    elif head[1:-1] != name:
        errors.append("%s：首行条目名「%s」与文件名不一致" % (name, head[1:-1]))

    if "用途：" not in text:
        errors.append("%s：缺少「用途：」行" % name)

    secs = SECTION.findall(text)
    if len(secs) < 3:
        errors.append("%s：只有 %d 个「中文数字_」小节，至少 3 个" % (name, len(secs)))
    else:
        oks.append("%s：%d 个小节" % (name, len(secs)))

    body = strip_quoted(text)
    hits = []
    for w in COLLOQUIAL:
        c = body.count(w)
        if c:
            hits.append("%s×%d" % (w, c))
    if hits:
        errors.append("%s：口语/评价词 " % name + "、".join(hits))
    else:
        oks.append("%s：无口语词" % name)


def main():
    if not os.path.isdir(RULES):
        print("找不到 %s" % RULES)
        return 1

    files = sorted(f for f in os.listdir(RULES) if f.endswith(".txt"))
    if not files:
        warns.append("Source/Rules 下没有 txt")

    for f in files:
        name = os.path.splitext(f)[0]
        with open(os.path.join(RULES, f), "r", encoding="utf-8") as fh:
            check(name, fh.read())

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
