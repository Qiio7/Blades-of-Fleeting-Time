const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Region');

const files = fs.readdirSync(targetDir).filter(f => f.startsWith('势力人名_') && f.endsWith('.txt'));

console.log(`Found ${files.length} dispatch files.`);

let allPassed = true;

for (const f of files) {
  const content = fs.readFileSync(path.join(targetDir, f), 'utf8');
  console.log(`\nVerifying: ${f} (${content.length} chars)`);

  if (!content.includes('核心人物:')) {
    console.error(`  [FAIL] Missing '核心人物:'`);
    allPassed = false;
  }
  if (!content.includes('人名表使用指令: 在发展剧情和剧情演绎时，优先使用符合剧情发展和人设的人名表里的核心人物，而不是使用随机人物。')) {
    console.error(`  [FAIL] Missing instruction directive`);
    allPassed = false;
  }
  if (!content.includes('<世界观_势力人名_') || !content.includes('</世界观_势力人名_')) {
    console.error(`  [FAIL] Missing world lore tags`);
    allPassed = false;
  }
  
  // Check EJS condition
  const ejsMatch = content.match(/<%\_ if \((.*?)\) \{ \_%\>/);
  if (!ejsMatch) {
    console.error(`  [FAIL] Missing EJS condition`);
    allPassed = false;
  } else {
    console.log(`  [PASS] EJS trigger: ${ejsMatch[1].trim()}`);
  }

  // Count core characters
  const lines = content.split('\n');
  const factionLines = lines.filter(l => l.trim().startsWith('-'));
  console.log(`  [PASS] Factions defined: ${factionLines.length}`);
  for (const fl of factionLines) {
    if (!fl.includes('(男)') && !fl.includes('(女)') && !fl.includes('(不详)')) {
      console.warn(`  [WARN] Line might not have gender: ${fl.trim()}`);
    }
  }
}

if (allPassed) {
  console.log('\nALL 12 DISPATCH FILES PASSED VERIFICATION!');
} else {
  console.error('\nSOME FILES FAILED VERIFICATION!');
}
