const fs = require('fs');
const content = fs.readFileSync('Source/World Lore/门派与势力概览表.md', 'utf8');
const lines = content.split('\n');

const regionMap = {};

let inSect = false;
let inFaction = false;

for (const line of lines) {
  if (line.includes('## 二、 八大门派')) { inSect = true; inFaction = false; continue; }
  if (line.includes('## 三、 四十二股江湖与朝野势力')) { inSect = false; inFaction = true; continue; }
  if (line.startsWith('## 四、')) { break; }

  if (inSect && line.startsWith('| **')) {
    const parts = line.split('|').map(s => s.trim());
    const name = parts[1].replace(/\*\*/g, '');
    const reg = parts[2];
    const desc = parts[4];
    if (!regionMap[reg]) regionMap[reg] = [];
    regionMap[reg].push({ type: '门派', name, desc });
  }

  if (inFaction && line.startsWith('| **')) {
    const parts = line.split('|').map(s => s.trim());
    const name = parts[1].replace(/\*\*/g, '');
    const reg = parts[2];
    const desc = parts[5];
    if (!regionMap[reg]) regionMap[reg] = [];
    regionMap[reg].push({ type: '势力', name, desc });
  }
}

for (const [r, list] of Object.entries(regionMap)) {
  console.log(`=== ${r} (${list.length}) ===`);
  for (const item of list) {
    console.log(`  [${item.type}] ${item.name}: ${item.desc}`);
  }
}
