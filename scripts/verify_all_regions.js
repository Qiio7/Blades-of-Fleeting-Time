const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Region');

// Pure non-geographic faction / organization names that MUST NOT appear in location triggers
const pureFactions = [
  '五仙教', '真武', '唐门', '丐帮', '修罗楼', '白帝阁', '神刀堂', '移花宫',
  '御前禁军', '六扇门', '皇城司', '大通宝钱庄', '万隆商盟', '长风镖局', '影杀楼', '绝智听风楼',
  '天策府', '牧马堂', '狼主堂', '黑水悍匪',
  '伏牛寨', '万玄药庄', '武当清云观', '朝阳玉真宫', '汉江排帮',
  '断魂窟', '青城剑派', '锦江排帮', '玄天会', '唐门外门',
  '幽月楼', '三十六峒百越联寨', '三十六峒', '滇南茶马帮', '黑水蛊寨', '罗霄蛮峒',
  '黑风水寨', '江陵铁剑门', '铁剑门', '洞庭水军残部', '潇湘剑社',
  '大通铁矿帮', '百草堂草药行', '百草堂', '江湖会', '修罗血煞死士楼',
  '白莲教', '封剑帮', '凌霄剑庐',
  '瀚海盐枭帮', '昭武门', '驯兽山庄', '关东快刀盟',
  '临波碧水庄', '连云十八坞', '神机百炼谷', '万象宗', '沧溟流'
];

const files = fs.readdirSync(baseDir).filter(f => f.startsWith('区域详情_') && f.endsWith('.txt'));

let allPassed = true;

console.log(`Found ${files.length} regional detail files to verify.`);

for (const file of files) {
  const content = fs.readFileSync(path.join(baseDir, file), 'utf8');
  console.log(`\n=== Checking: ${file} (Chars: ${content.length}) ===`);

  // 1. Check for '精选地标:'
  if (content.includes('精选地标:')) {
    console.error(`  [FAIL] Contains '精选地标:'!`);
    allPassed = false;
  } else {
    console.log(`  [PASS] No '精选地标:' found.`);
  }

  // 2. Check for '要地:'
  if (!content.includes('要地:')) {
    console.error(`  [FAIL] Missing '要地:'!`);
    allPassed = false;
  } else {
    console.log(`  [PASS] '要地:' found.`);
  }

  // 3. Extract trigger array
  const triggerMatch = content.match(/const \w+Locs = \[([\s\S]*?)\];/);
  if (!triggerMatch) {
    console.error(`  [FAIL] Trigger array not found!`);
    allPassed = false;
    continue;
  }
  
  const rawArray = triggerMatch[1];
  const items = rawArray
    .split(',')
    .map(s => s.trim().replace(/['"]/g, ''))
    .filter(s => s.length > 0);

  console.log(`  Trigger items (${items.length}):`, items.join(', '));

  // Check pure factions in trigger
  const foundFactions = items.filter(it => pureFactions.includes(it));
  if (foundFactions.length > 0) {
    console.error(`  [FAIL] Found pure factions in trigger:`, foundFactions);
    allPassed = false;
  } else {
    console.log(`  [PASS] No pure factions in trigger array.`);
  }

  // Check that every trigger item actually exists in the body text (excluding the trigger declaration)
  const bodyText = content.substring(content.indexOf('<世界观_区域_'));
  for (const it of items) {
    if (!bodyText.includes(it)) {
      console.error(`  [FAIL] Trigger item '${it}' not found in body text!`);
      allPassed = false;
    }
  }

  // 4. Check parenthetical impressions in 要地
  const yaodiSection = content.match(/要地:\s*([\s\S]*?)\s*风物:/);
  if (yaodiSection) {
    const lines = yaodiSection[1].split('\n').filter(l => l.trim().startsWith('-'));
    let maxLen = 0;
    for (const line of lines) {
      const parenMatch = line.match(/（(.*?)）/);
      if (parenMatch) {
        const desc = parenMatch[1];
        if (desc.length > maxLen) maxLen = desc.length;
        if (desc.length > 20) {
          console.warn(`  [WARN] Long desc (${desc.length} chars): ${line.trim()}`);
        }
      }
    }
    console.log(`  [PASS] Checked ${lines.length} 要地 items (max impression len: ${maxLen} chars).`);
  }
}

console.log(`\n========================================`);
if (allPassed) {
  console.log('ALL 12 REGIONAL DETAIL FILES PASSED VERIFICATION PERFECTLY!');
} else {
  console.error('SOME CHECKS FAILED. PLEASE REVIEW ABOVE.');
}
