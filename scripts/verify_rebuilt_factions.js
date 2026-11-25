const fs = require('fs');
const path = require('path');

const factionDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Faction');

const targetFiles = [
  '势力详情_幽月楼.txt',
  '势力详情_伏牛寨.txt',
  '势力详情_万玄药庄.txt',
  '势力详情_断魂窟.txt',
  '势力详情_青城剑派.txt',
  '势力详情_锦江排帮.txt',
  '势力详情_滇南三十六寨.txt',
  '势力详情_滇南茶马帮.txt',
  '势力详情_黑风水寨.txt',
  '势力详情_江陵铁剑门.txt',
  '势力详情_大通铁矿帮.txt',
  '势力详情_百草堂草药行.txt',
  '势力详情_冰川龙王渡.txt',
  '势力详情_瀚海盐枭帮.txt',
  '势力详情_绝尘客栈.txt',
  '势力详情_汴河漕帮.txt'
];

let allPassed = true;

for (const file of targetFiles) {
  const filePath = path.join(factionDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] Missing file: ${file}`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\nChecking: ${file} (${content.length} chars)`);

  // Check forbidden '性质:'
  if (content.includes('性质:')) {
    console.error(`  [FAIL] Contains '性质:'!`);
    allPassed = false;
  } else {
    console.log(`  [PASS] No '性质:' found.`);
  }

  // Check no 内功 or 心法 in small factions
  if (content.includes('(内功)') || content.includes('(心法)')) {
    console.error(`  [FAIL] Contains 内功 or 心法 in small faction!`);
    allPassed = false;
  } else {
    console.log(`  [PASS] No 内功/心法 in martial arts.`);
  }

  // Check tiers count in martial arts
  const fanpinMatch = content.match(/凡品:\s*([\s\S]*?)\s*良逸:/);
  const liangyiMatch = content.match(/良逸:\s*([\s\S]*?)\s*上乘:/);
  const shangchengMatch = content.match(/上乘:\s*([\s\S]*?)\s*核心人物:/);

  const fanpinCount = fanpinMatch ? fanpinMatch[1].split('\n').filter(l => l.trim().startsWith('-')).length : 0;
  const liangyiCount = liangyiMatch ? liangyiMatch[1].split('\n').filter(l => l.trim().startsWith('-')).length : 0;
  const shangchengCount = shangchengMatch ? shangchengMatch[1].split('\n').filter(l => l.trim().startsWith('-')).length : 0;

  if (fanpinCount === 2 && liangyiCount === 2 && shangchengCount === 2) {
    console.log(`  [PASS] Martial arts count: 凡品 2, 良逸 2, 上乘 2`);
  } else {
    console.error(`  [FAIL] Martial arts count mismatch: 凡品 ${fanpinCount}, 良逸 ${liangyiCount}, 上乘 ${shangchengCount}`);
    allPassed = false;
  }

  // Check for gamey names
  const gameyKeywords = ['狂兽', '破阵斩', '淬毒弩', '魅影', '暴雪', '魔龙', '瞬杀'];
  const foundGamey = gameyKeywords.filter(k => content.includes(k));
  if (foundGamey.length > 0) {
    console.error(`  [FAIL] Contains gamey keywords:`, foundGamey);
    allPassed = false;
  } else {
    console.log(`  [PASS] No gamey keywords detected.`);
  }
}

console.log(`\n========================================`);
if (allPassed) {
  console.log('ALL 16 SMALL FACTION FILES PASSED VERIFICATION PERFECTLY!');
} else {
  console.error('SOME CHECKS FAILED!');
}
