const fs = require('fs');
const path = require('path');

// Dictionary of polished descriptions for all 32 pool martial arts
const polishedPoolSkills = {
  // 一、外功 · 军伍流
  '军中劈砍': {
    type: '外功',
    desc: '军伍制式腰刀基础劈杀术，直劈斜撩，大开大阖，劲力全在一刀断甲碎骨，凶悍简练毫无花招。'
  },
  '长枪突刺': {
    type: '外功',
    desc: '军阵长枪合力直扎之技，双手握杆如铁铸，沉肩推腰直贯而出，进退如风，专破敌前锋冲阵。'
  },
  '铁尺打穴': {
    type: '外功',
    desc: '公门快捕随身铁尺擒拿短术，沉铁敲砸腕骨、锁别关节，旨在格架白刃与制敌卸力。'
  },
  '硬弓步射': {
    type: '外功',
    desc: '军伍步卒立桩射术，下盘沉实如钉，挽石重弓发矢连贯，专在数步之内开弦穿心。'
  },

  // 二、外功 · 镖马流
  '走镖棍法': {
    type: '外功',
    desc: '镖门行路护身短棍法，齐眉白蜡棍横架车前，挑、扫、格、截势势连环，守御车阵滴水不漏。'
  },
  '押车护货': {
    type: '外功',
    desc: '镖行护卫辎重的阵列拒敌之法，依托大车轮板屏障侧翼，刀棍一致对外，稳扎稳打截杀近身伏匪。'
  },
  '赶马鞭法': {
    type: '外功',
    desc: '马帮驯兽兼防身长皮鞭法，运腕甩动炸若惊雷，鞭梢回旋可远缠敌兵刃，破皮裂骨直击面门。'
  },

  // 三、外功 · 码头水帮
  '撑篙法': {
    type: '外功',
    desc: '船夫运篙借浪之沉厚技法，借水势腰腿合一发力，长竹篙既能点水荡舟，横扫直戳势若滚木。'
  },
  '船桨横拍': {
    type: '外功',
    desc: '水手近身接舷格斗术，硬木阔刃长桨立架可卸刀剑重斩，借船身摇晃借力横拍，势重力猛。'
  },
  '渔叉刺鱼': {
    type: '外功',
    desc: '水乡渔人刺浪捕猎之技，三股钢叉顺流急戳，虚晃变向直取下盘与前心，狠准刁钻。'
  },

  // 四、外功 · 市井流
  '街头打狗棒': {
    type: '外功',
    desc: '市井草莽与行乞之人防身竹棒术，招走下三路，专挑膝弯、胫骨与手腕敲砸，刁滑实效。'
  },
  '巷口短刀': {
    type: '外功',
    desc: '狭窄深巷贴身刺杀短匕术，反手握刃近身抹喉，突刺极短极狠，专攻方寸之间要害。'
  },
  '摔跤跌扑': {
    type: '外功',
    desc: '市井草莽贴身扭绊之技，扯襟抓腕借力使力，勾足别膝顺势下砸，制人于倒地之间。'
  },

  // 五、外功 · 山野流
  '柴刀开山': {
    type: '外功',
    desc: '山野猎夫沉重大柴刀劈砍之术，发力朴拙，借身形惯性沉劈斜剁，刀势厚重粗粝。'
  },
  '猎户短弓': {
    type: '外功',
    desc: '丛林猎兽快发短弓术，弓身短小轻便，林木藤蔓间出箭极速，专在近身数丈穿心破甲。'
  },
  '矿镐砸击': {
    type: '外功',
    desc: '矿场力夫操重铁尖镐狠砸之法，周身筋骨聚力沉闷砸下，尖喙破铁断甲，势沉若裂顽石。'
  },
  '绊索滚石': {
    type: '外功',
    desc: '山道草莽关隘设伏之法，善借山崖密林拉布绊索落石机关，引敌入伏后截断退路趁势掩杀。'
  },

  // 六、外功 · 雪原大漠
  '马背劈砍': {
    type: '外功',
    desc: '关外马背冲阵斩马术，借烈马奔驰之狂暴冲势拖刀直掠，挥斩力透甲胄，势若奔雷。'
  },
  '盐车护队': {
    type: '外功',
    desc: '荒漠私盐商队围车拒敌阵式，背靠坚实盐袋车板，兵刃内外互为犄角，专御马贼群袭。'
  },
  '拔刀斩': {
    type: '外功',
    desc: '拔刀出鞘顺势绝杀之快刀术，推颚震鞘疾削咽喉，借真气瞬息拔刃，出招无声快绝狠厉。'
  },

  // 七、轻功 · 地形流
  '踏雪防滑': {
    type: '轻功',
    desc: '极北冰原踏雪步法，全掌受力轻踩硬雪壳，提气如虚悬，防滑止跌，风雪中落步稳健。'
  },
  '沙地缓行': {
    type: '轻功',
    desc: '狂沙戈壁卸沙步法，步伐小巧短促，落步随沙下陷即起，借流沙之势轻身滑步而不深陷。'
  },
  '山地攀行': {
    type: '轻功',
    desc: '险峰危岩腾挪攀援身法，手搭岩缝足扣老根，步履起落虚实相随，攀爬陡壁险峰如履平地。'
  },
  '船板稳身': {
    type: '轻功',
    desc: '颠簸舟楫立桩身法，沉膝松胯随波浪起伏化解摇晃，下盘沉实如锚定甲板。'
  },
  '负重步': {
    type: '轻功',
    desc: '挑夫力夫长途跋涉沉稳步法，含胸实腹调匀内息，挑负重物行过烂泥险道依然稳健不晃。'
  },
  '墙头翻越': {
    type: '轻功',
    desc: '市井穿街过巷翻跃身法，借前冲之势蹬踏墙缝借力拔高，搭檐扣缝借力倒翻，轻快利落。'
  },
  '赤脚泥步': {
    type: '轻功',
    desc: '滩涂泥沼滑步身法，足尖侧旋借力卸去泥水吸扯，落脚轻浅滑泥而走，涉险如踩硬地。'
  },

  // 八、奇功 · 营生带来的杂术
  '喊号子': {
    type: '奇功',
    desc: '船工逆水行舟调气合声之术，丹田聚气引颈发号，声震江面，振奋众人气力同心发劲。'
  },
  '听风辨向': {
    type: '奇功',
    desc: '塞外猎手与伏击探子凝神辨音之术，侧耳贴地捕捉微弱风声蹄鸣，预判十里内敌骑踪迹。'
  },
  '辨药识毒': {
    type: '奇功',
    desc: '山间采药行医者的望闻辨验法，借草木气味纹理查验生克毒性，避深山瘴气、辨药疗伤。'
  },
  '犬哨驱兽': {
    type: '奇功',
    desc: '猎户行山驭兽奇术，吹奏特异音调哨音，可远招猎犬助战、惊退寻常山林恶兽。'
  },
  '屏息潜行': {
    type: '奇功',
    desc: '贴伏阴暗角落的隐息潜身之法，闭气敛住周身呼吸微声，借墙影暗隙蹑足疾走，极难为人察觉。'
  }
};

// 1. Update Source/World Lore/MartialArts/凡品武学池（不入json）.txt
const poolPath = path.join(__dirname, '..', 'Source', 'World Lore', 'MartialArts', '凡品武学池（不入json）.txt');
let poolContent = `凡品武学池（不入json）
========================================

江湖底层的功夫没有产权。你会的我也会，差别只在谁教、怎么用。
凡品的来历只有三条：从军伍里带出来的、被大派逐出师门时带出来的、被营生逼出来的。
八大门派的凡品不在此池（那是各家的门下功课），此处只供各方势力取用。

----------------------------------------
一、外功 · 军伍流（边军、卫所、逃卒、军屯）
----------------------------------------
- 军中劈砍 (外功): ${polishedPoolSkills['军中劈砍'].desc}
- 长枪突刺 (外功): ${polishedPoolSkills['长枪突刺'].desc}
- 铁尺打穴 (外功): ${polishedPoolSkills['铁尺打穴'].desc}
- 硬弓步射 (外功): ${polishedPoolSkills['硬弓步射'].desc}

----------------------------------------
二、外功 · 镖马流（镖局、马帮、脚行、商队）
----------------------------------------
- 走镖棍法 (外功): ${polishedPoolSkills['走镖棍法'].desc}
- 押车护货 (外功): ${polishedPoolSkills['押车护货'].desc}
- 赶马鞭法 (外功): ${polishedPoolSkills['赶马鞭法'].desc}

----------------------------------------
三、外功 · 码头水帮（漕帮、排帮、船工、水寨）
----------------------------------------
- 撑篙法 (外功): ${polishedPoolSkills['撑篙法'].desc}
- 船桨横拍 (外功): ${polishedPoolSkills['船桨横拍'].desc}
- 渔叉刺鱼 (外功): ${polishedPoolSkills['渔叉刺鱼'].desc}

----------------------------------------
四、外功 · 市井流（丐众、脚夫、黑市、小偷、赌坊）
----------------------------------------
- 街头打狗棒 (外功): ${polishedPoolSkills['街头打狗棒'].desc}
- 巷口短刀 (外功): ${polishedPoolSkills['巷口短刀'].desc}
- 摔跤跌扑 (外功): ${polishedPoolSkills['摔跤跌扑'].desc}

----------------------------------------
五、外功 · 山野流（猎户、药农、矿工、山贼）
----------------------------------------
- 柴刀开山 (外功): ${polishedPoolSkills['柴刀开山'].desc}
- 猎户短弓 (外功): ${polishedPoolSkills['猎户短弓'].desc}
- 矿镐砸击 (外功): ${polishedPoolSkills['矿镐砸击'].desc}
- 绊索滚石 (外功): ${polishedPoolSkills['绊索滚石'].desc}

----------------------------------------
六、外功 · 雪原大漠（燕云、秦川、徐海）
----------------------------------------
- 马背劈砍 (外功): ${polishedPoolSkills['马背劈砍'].desc}
- 盐车护队 (外功): ${polishedPoolSkills['盐车护队'].desc}
- 拔刀斩 (外功): ${polishedPoolSkills['拔刀斩'].desc}

----------------------------------------
七、轻功 · 地形流（按地方分，不按门派分）
----------------------------------------
- 踏雪防滑 (轻功): ${polishedPoolSkills['踏雪防滑'].desc}
- 沙地缓行 (轻功): ${polishedPoolSkills['沙地缓行'].desc}
- 山地攀行 (轻功): ${polishedPoolSkills['山地攀行'].desc}
- 船板稳身 (轻功): ${polishedPoolSkills['船板稳身'].desc}
- 负重步 (轻功): ${polishedPoolSkills['负重步'].desc}
- 墙头翻越 (轻功): ${polishedPoolSkills['墙头翻越'].desc}
- 赤脚泥步 (轻功): ${polishedPoolSkills['赤脚泥步'].desc}

----------------------------------------
八、奇功 · 营生带来的杂术
----------------------------------------
- 喊号子 (奇功): ${polishedPoolSkills['喊号子'].desc}
- 听风辨向 (奇功): ${polishedPoolSkills['听风辨向'].desc}
- 辨药识毒 (奇功): ${polishedPoolSkills['辨药识毒'].desc}
- 犬哨驱兽 (奇功): ${polishedPoolSkills['犬哨驱兽'].desc}
- 屏息潜行 (奇功): ${polishedPoolSkills['屏息潜行'].desc}

----------------------------------------
说明
----------------------------------------
凡品心法不在此表。凡品心法见《心法表（不入json）.txt》凡品八门：
锋锐、归鞘、厚德、青松、空雪、金刚、心流、晚音。

同名不等于同水平。同一套「撑篙法」，漕帮帮众使出来是挡人，水寨匪首使出来能戳穿咽喉——
差别在修为境界，不在招式。
`;

fs.writeFileSync(poolPath, poolContent, 'utf8');
console.log('Updated 凡品武学池（不入json）.txt');

// 2. Update the 22 Factions in Source/World Lore/Faction/
const factionDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Faction');
const factionFiles = fs.readdirSync(factionDir);

let updatedFactions = 0;
for (const file of factionFiles) {
  const filePath = path.join(factionDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let fileChanged = false;

  // Replace any matching pool skill in the 凡品 section
  for (const [skillName, data] of Object.entries(polishedPoolSkills)) {
    // Regex matching: - <skillName> (<type>): <oldDesc>
    const regex = new RegExp(`(-\\s*${skillName}\\s*\\(${data.type}\\):\\s*)([^\r\n]+)`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${data.desc}`);
      fileChanged = true;
    }
  }

  if (fileChanged) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated faction: ${file}`);
    updatedFactions++;
  }
}

console.log(`Total factions updated: ${updatedFactions}`);

// 3. Update scripts/factions_data.js
const allData = {};
for (const file of factionFiles) {
  allData[file] = fs.readFileSync(path.join(factionDir, file), 'utf8');
}
fs.writeFileSync(path.join(__dirname, 'factions_data.js'), 'module.exports = ' + JSON.stringify(allData, null, 2) + ';\n', 'utf8');
console.log('Synchronized scripts/factions_data.js');
