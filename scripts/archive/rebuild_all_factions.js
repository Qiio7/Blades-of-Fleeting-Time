const fs = require('fs');
const path = require('path');

const factionDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Faction');

// List of old files to delete if renamed
const oldFilesToDelete = [
  '势力详情_滇南茶马帮.txt',
  '势力详情_滇南三十六寨.txt',
  '势力详情_三十六峒百越联寨.txt',
  '势力详情_江陵铁剑门.txt',
  '势力详情_冰川龙王渡.txt',
  '势力详情_汴河漕帮.txt',
  '势力详情_百草堂草药行.txt',
  '势力详情_万隆汇通商盟.txt',
  '势力详情_长风水陆镖局.txt',
  '势力详情_临波碧水庄.txt',
  '势力详情_锦江排帮.txt',
  '势力详情_瀚海盐枭帮.txt',
  '势力详情_绝智听风楼.txt',
  '势力详情_大通铁矿帮.txt'
];

for (const oldFile of oldFilesToDelete) {
  const p = path.join(factionDir, oldFile);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`Deleted old file: ${oldFile}`);
  }
}

// Read the complete definitions
const factionsData = require('./factions_data.js');

for (const [filename, content] of Object.entries(factionsData)) {
  const p = path.join(factionDir, filename);
  fs.writeFileSync(p, content, 'utf8');
  console.log(`Wrote: ${filename}`);
}

console.log('All factions generated successfully.');
