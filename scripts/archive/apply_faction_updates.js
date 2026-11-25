const fs = require('fs');
const path = require('path');

const factionDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Faction');
const factionsMeta = require('./factions_architectures_data.js');

for (const [filename, meta] of Object.entries(factionsMeta)) {
  const filePath = path.join(factionDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filename);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace 组织架构 block
  const archBlock = '  组织架构:\n    层级划分:\n' + meta.arch.map(item => '      - ' + item).join('\n') + '\n\n';
  content = content.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, archBlock);

  // 2. Handle 上乘 in 核心功法传承
  if (!meta.hasShangcheng) {
    // If has no shangcheng, remove 上乘: block
    if (content.includes('上乘:')) {
      content = content.replace(/    上乘:[\s\S]*?(?=  核心人物:)/, '');
    }
  }

  // 3. Clean up extra trailing blank lines before 核心人物
  content = content.replace(/\n{3,}  核心人物:/g, '\n\n  核心人物:');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated faction: ${filename} (hasShangcheng: ${meta.hasShangcheng})`);
}

console.log('All 42 factions updated successfully.');
