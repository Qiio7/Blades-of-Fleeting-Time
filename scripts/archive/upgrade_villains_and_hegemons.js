const fs = require('fs');
const path = require('path');

const factionDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Faction');
const regionDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Region');
const sectDir = path.join(__dirname, '..', 'Source', 'World Lore', 'Sect');
const overviewFile = path.join(__dirname, '..', 'Source', 'World Lore', '门派与势力概览表.md');

// 1. Rename 势力详情_封剑帮.txt to 势力详情_封剑楼.txt if needed
const oldFengjian = path.join(factionDir, '势力详情_封剑帮.txt');
const newFengjian = path.join(factionDir, '势力详情_封剑楼.txt');
if (fs.existsSync(oldFengjian)) {
  fs.unlinkSync(oldFengjian);
  console.log('Removed old 势力详情_封剑帮.txt');
}

// 2. Define the exact updated contents for the upgraded factions

// --- 封剑楼 ---
const fengjianContent = `<势力详情_封剑楼>
  基础信息:
    名称: 封剑楼
    驻地: 秦川·苍雪林深处冰木飞楼
    阵营立场: 混乱邪恶（由被白帝阁逐出之叛徒剑客与凶残逃犯结成之极北恶道势力）

  核心理念与行事作风:
    最终目的: 截断秦川古道劫杀客商，搜罗雪山奇珍与断剑残篇，图谋报复白帝阁。
    行事特征: 
      - 伏击时惯于借狂风暴雪隐蔽行迹，设陷阱绊马断骨，下手毒辣不留活口。
      - 帮规戾气极重，帮中弟子佩剑皆磨去剑尖示绝情，唯力是视。

  组织架构:
    层级划分:
      - 楼主: 遭名门白帝阁逐出师门的一代邪剑凶徒，心胸狭隘，剑法狠辣，修为【六境见山】至【七境叩心】。
      - 截道当家与护楼剑客: 专司在陈仓驿与雪岭要道盘剥客商、伏击落单行客的剑术好手，修为在【四境观潮】至【五境裁云】。
      - 恶霸喽啰与逐客剑徒: 依附飞楼啸聚雪原的亡命恶徒，佩磨尖断剑，修为在【一境挽弓】至【三境踏雪】。

  核心功法传承:
    凡品:
      - 凌霜小剑 (外功): 白帝阁入门剑法，逐出师门时只带走半套；剑尖按帮规磨了去，原本的"点"便只能用"劈"来凑。
      - 踏雪无痕 (轻功): 白帝阁雪原身法，被他们用成了逃命与偷袭的路数，落脚依然轻，方向却总往人背后去。

    良逸:
      - 回风舞雪剑 (外功): 还是白帝阁那一套，只是该回转卸力的剑势被改成了撩筋挑腕，看着像，使出来是两个人。
      - 碎骨锁喉手 (奇功): 贴身贴靠错骨分筋之阴爪，中者喉管立碎。

    上乘:
      - 断霜绝命剑 (外功): 封不平叛逃出阁后将白帝阁凌霄剑诀魔改之杀戮绝艺，招招走偏锋撩割筋脉，断剑出鞘必饮血。
      - 碎雪折锋掌 (奇功): 掌心暗凝阴寒裂石内劲，专以内劲震断敌兵刃，中者经脉寸断、如堕万载冰窟。

  核心人物:
    - 封不平: 身份 封剑楼楼主

  江湖外交:
    - 死仇: 白帝阁（屡被白帝阁巡山弟子断剑驱逐，结怨入骨）
    - 欺凌: 龙王渡（常年劫掠雪橇队粮食物资）
    - 勾结: 白莲教（私下换取邪术丹药与销赃门路）
</势力详情_封剑楼>
`;
fs.writeFileSync(newFengjian, fengjianContent, 'utf8');
console.log('Wrote 势力详情_封剑楼.txt');

// --- 黑风水寨 ---
const heifengPath = path.join(factionDir, '势力详情_黑风水寨.txt');
const heifengContent = `<势力详情_黑风水寨>
  基础信息:
    名称: 黑风水寨
    驻地: 荆州·八百里洞庭水泽深处黑风岛
    阵营立场: 混乱邪恶（称霸洞庭水泽之凶残水寇，截杀大江官私粮船，行事歹毒不留活口）

  核心理念与行事作风:
    最终目的: 割据洞庭八百里水陆航道，劫掠两湖过往巨贾与官粮，与两淮水匪遥相呼应。
    行事特征: 
      - 水寨战船密布，专于风暴与大雾之夜乘快船合围猎物，登舟即施乱刃屠戮。
      - 寨规凶残狼性，凡怯懦畏战或私藏浮财者，立施沉江喂鱼极刑。

  组织架构:
    层级划分:
      - 总寨主: 洞庭湖八百里水泽巨寇头目，前朝水师叛将出身，一身横练硬功与水底搏杀之术，性情凶残，修为【六境见山】至【七境叩心】。
      - 掌舵水堂主与分寨水枭: 掌管快船劫掠、设伏拦江与窝赃分利的亡命水匪领头，修为在【四境观潮】至【五境裁云】。
      - 水匪喽啰与快刀水手: 擅操快舟水战、持滚刀飞爪截江的江洋劫匪，修为在【一境挽弓】至【三境踏雪】。

  核心功法传承:
    凡品:
      - 船桨横拍 (外功): 水手近身接舷格斗术，硬木阔刃长桨立架可卸刀剑重斩，借船身摇晃借力横拍，势重力猛。
      - 船板稳身 (轻功): 颠簸舟楫立桩身法，沉膝松胯随波浪起伏化解摇晃，下盘沉实如锚定甲板。

    良逸:
      - 黑水断魂钩 (外功): 洞庭水寇短兵器绝活，分水刺改制带倒刺铁钩，专勾敌琵琶骨与手腕。
      - 浪里飞叉 (奇功): 水上投掷淬毒飞叉之术，水面滑翔极快，百步之内取人性命。

    上乘:
      - 破浪狂涛斩 (外功): 邬翻浪昔年水师战阵沉重朴刀绝技，借水浪冲撞之势抡斩而出，刀芒裂甲碎舟。
      - 九曲分水翻江劲 (奇功): 水贼深水潜游与闭气搏杀奇门内劲，入水如游龙，以内力翻卷暗涌掀翻敌船。

  核心人物:
    - 邬翻浪: 身份 黑风水寨总寨主

  江湖外交:
    - 戒备: 丐帮（洞庭青螺泽总舵近在咫尺，双方常因水路行侠冲突不断）
    - 仇视: 官府水师（朝廷荆江水师长年悬重赏通缉）
    - 结盟: 连云十八坞（同为大江南北水寇，互通水路行期销赃）
</势力详情_黑风水寨>
`;
fs.writeFileSync(heifengPath, heifengContent, 'utf8');
console.log('Wrote 势力详情_黑风水寨.txt');

// --- 绝尘客栈 ---
const juechenPath = path.join(factionDir, '势力详情_绝尘客栈.txt');
const juechenContent = `<势力详情_绝尘客栈>
  基础信息:
    名称: 绝尘客栈
    驻地: 燕云·大漠腹地绝尘镇深处
    阵营立场: 绝对中立（风沙绝境中唯一的避风客栈，法外之地，门内严禁动武，认钱不认人）

  核心理念与行事作风:
    最终目的: 在万里狂沙中维系这片销金避难乐土，搜罗大漠各派秘闻，大发黑白两道横财。
    行事特征: 
      - 店规森严：无论深仇大恨，进得客栈卸刀饮酒，门内严禁私斗；违者乱刀分尸弃尸沙海。
      - 明修客栈栈道，暗度黄沙暗道；专纳朝廷钦犯、江洋大盗与逃亡刀客，明码标价买命。

  组织架构:
    层级划分:
      - 当家掌柜: 八面玲珑的风情老板娘，手腕极硬，定下店内禁武规矩，手使柳叶飞刀与独门销魂毒香，修为【六境见山】至【七境叩心】。
      - 独眼账房: 专司核算黑市销赃、收受过路重金与调停纷争的心腹老怪，精通铁算盘点穴，修为在【五境裁云】至【六境见山】。
      - 跑堂伙计与厨子: 表面殷勤伺候、暗藏短刃杀技的悍戾伙计，修为在【一境挽弓】至【三境踏雪】。

  核心功法传承:
    凡品:
      - 巷口短刀 (外功): 狭窄深巷贴身刺杀短匕术，反手握刃近身抹喉，突刺极短极狠，专攻方寸之间要害。
      - 屏息潜行 (奇功): 贴伏阴暗角落的隐息潜身之法，闭气敛住周身呼吸微声，借墙影暗隙蹑足疾走，极难为人察觉。

    良逸:
      - 金梭夺魄飞刀 (外功): 金镶玉贴身柳叶飞刀绝技，指缝可瞬发三刀，例不虚发。
      - 铁算盘打穴功 (奇功): 柴老鬼将沉重铁算盘作短兵，算珠连弹破人麻穴，招式刁钻。

    上乘:
      - 狂沙乱刃流 (外功): 金镶玉与跑堂快刀手深藏之杀法，短刃飞旋如狂风卷沙，贴身瞬出数十刀，断骨割脉。
      - 迷离销魂香 (奇功): 金镶玉独门特制秘香，随指风或衣袂无声散布，闻者内息迟滞、筋骨酥软任人宰割。

  核心人物:
    - 金镶玉: 身份 绝尘客栈当家掌柜
    - 柴老鬼: 身份 绝尘客栈独眼账房

  江湖外交:
    - 平衡: 天策府与狼主堂（在两军死士之间左右逢源，互通有无）
    - 暗通: 牧马堂（长年收购牧马堂良驹提供给过往逃亡豪侠）
    - 庇护: 各路通缉犯（只要付足金银，皆受客栈密道与规矩庇佑）
</势力详情_绝尘客栈>
`;
fs.writeFileSync(juechenPath, juechenContent, 'utf8');
console.log('Wrote 势力详情_绝尘客栈.txt');

// --- 牧马堂 ---
const mumaPath = path.join(factionDir, '势力详情_牧马堂.txt');
const mumaContent = `<势力详情_牧马堂>
  基础信息:
    名称: 牧马堂
    驻地: 燕云·大漠南部风鸣碧洲巨寨
    阵营立场: 守序中立（垄断燕云马市的大漠部族商帮，擅养纯血神驹，精熟马背快刀）

  核心理念与行事作风:
    最终目的: 垄断北疆战马血统与互市商道，维持大漠马帮部族生息繁衍与自治地位。
    行事特征: 
      - 做马匹买卖重信守诺，但对盗马贼与假马贩惩罚极酷，拿获必挑断脚筋弃尸荒漠。
      - 严守中立信条，既向天策军提供军马，亦私下与塞外商队互市，左右逢源。

  组织架构:
    层级划分:
      - 堂主: 雄踞燕云的草原马霸部族统帅，统领战马互市与大漠精骑，一身大漠狂刀与骑阵杀伐，修为【六境见山】至【七境叩心】。
      - 牧马把头与快刀哨探: 统领草场驯马、查探边关暗哨的马背悍手，修为在【四境观潮】至【五境裁云】。
      - 牧马人与骑手: 世代逐水草放牧烈马的草原健儿，修为在【一境挽弓】至【三境踏雪】。

  核心功法传承:
    凡品:
      - 赶马鞭法 (外功): 马帮驯兽兼防身长皮鞭法，运腕甩动炸若惊雷，鞭梢回旋可远缠敌兵刃，破皮裂骨直击面门。
      - 马背劈砍 (外功): 关外马背冲阵斩马术，借烈马奔驰之狂暴冲势拖刀直掠，挥斩力透甲胄，势若奔雷。

    良逸:
      - 狂烈劈沙刀 (外功): 马背冲锋借下砍惯性的大劈斩，刀势猛烈如裂帛。
      - 听风识马诀 (奇功): 伏地听闻三十里外奔马动静与群马性情的奇门心法。

    上乘:
      - 八荒斩马霸刀 (外功): 乌尔烈成名大开大合长柄斩马刀法，合周身狂暴气劲迎风劈下，人马俱碎。
      - 万马踏浪劲 (奇功): 观群马奔腾悟出的狂暴冲击气劲，运劲于足如铁蹄踏岳，震荡地面裂人内腑。

  核心人物:
    - 乌尔烈: 身份 牧马堂堂主

  江湖外交:
    - 合作: 天策府（大宗军马最大供应商，互为依托）
    - 暗市: 绝尘客栈（向绝尘客栈输送耐旱快马换取中原铁器药材）
    - 抵制: 狼主堂（坚拒其强征战马资敌之图谋）
</势力详情_牧马堂>
`;
fs.writeFileSync(mumaPath, mumaContent, 'utf8');
console.log('Wrote 势力详情_牧马堂.txt');

// --- 三十六寨 ---
const sanshiliuPath = path.join(factionDir, '势力详情_三十六寨.txt');
const sanshiliuContent = `<势力详情_三十六寨>
  基础信息:
    名称: 三十六寨
    驻地: 云滇·盘虬岭
    阵营立场: 混乱中立（崇尚自治，民风彪悍，不喜外人擅扰祖林）

  核心理念与行事作风:
    最终目的: 维护深山土司山寨自治与生息。
    行事特征: 
      - 性情强悍尚武，擅闯深山禁地者，必以武力驱逐。
      - 三十六寨同气连枝，凡遇外来强寇侵袭，铜锣一响，各寨猎师携藤甲短刀齐聚御敌。

  组织架构:
    层级划分:
      - 大寨主: 统领苍山深山三十六峒土司盟约，调协各寨纠纷、统摄万千苗汉猎师部族的一方蛮王，修为【五境裁云】至【六境见山】。
      - 分寨寨主: 各峒头领与药寨、猎寨掌事，修为在【三境踏雪】至【四境观潮】。
      - 猎户寨丁: 身披藤甲、携带短刀药弩的青壮寨民，修为多在【一境挽弓】至【二境听风】。

  核心功法传承:
    凡品:
      - 猎户短弓 (外功): 丛林猎兽快发短弓术，弓身短小轻便，林木藤蔓间出箭极速，专在近身数丈穿心破甲。
      - 山地攀行 (轻功): 险峰危岩腾挪攀援身法，手搭岩缝足扣老根，步履起落虚实相随，攀爬陡壁险峰如履平地。

    良逸:
      - 泼风断岳刀 (外功): 刀家祖传战刀术，运足臂力抡圆疾劈，势如狂风扫落叶。
      - 迷烟引蜂术 (奇功): 采深山野蜂药香制成的引蜂奇法，散布气味可驱使山蜂追袭扰敌。

    上乘:
      - 三十六峒斩岳刀 (外功): 刀天德成名刚猛厚背砍刀法，势大力沉，合苗刀劈杀与战阵开山之势，专破坚甲铁盾。
      - 蛮王百毒护体罡 (奇功): 借南疆深山瘴气与灵药淬炼体魄的横练硬功，皮肉坚若熟牛皮，兼辟寻常百毒。

  核心人物:
    - 刀天德: 身份 三十六寨大寨主
    - 白月娘: 身份 三十六寨药寨寨主

  江湖外交:
    - 敬重: 五仙教（世代奉为西南巫祖圣地，遇重大争端常请其长老公断）
    - 仇视: 幽月楼（痛恨其盗采山中珍稀毒草、掳劫山民试毒）
    - 和睦: 茶马帮（长期互通商贸，以兽皮药材换取食盐铁器布匹）
</势力详情_三十六寨>
`;
fs.writeFileSync(sanshiliuPath, sanshiliuContent, 'utf8');
console.log('Wrote 势力详情_三十六寨.txt');

// --- 狼主堂 ---
const langzhuPath = path.join(factionDir, '势力详情_狼主堂.txt');
let langzhuContent = fs.readFileSync(langzhuPath, 'utf8');
const langzhuArch = `  组织架构:
    层级划分:
      - 堂主: 北狄元国皇族天狼战神，塞外第一魔刀，统辖南下军政前哨与死士重阵，修为【八境折柳】至【九境登楼】。
      - 潜影千夫长: 专司刺探边关防线、收买中原奸细与统帅天狼骑阵的谍战将领，修为在【六境见山】至【七境叩心】。
      - 狼影死士: 通晓暗杀与骑射、誓死效忠狼主的前哨精锐，修为在【三境踏雪】至【四境观潮】。
      - 密谍暗桩: 伪装为关外客商混迹边城茶肆的斥候探子，修为在【一境挽弓】至【二境听风】。

`;
langzhuContent = langzhuContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, langzhuArch);
// Ensure 天策府 is used instead of 龙骧堡 if any
langzhuContent = langzhuContent.replace(/龙骧堡/g, '天策府');
fs.writeFileSync(langzhuPath, langzhuContent, 'utf8');
console.log('Updated 势力详情_狼主堂.txt');

// --- 修罗楼 ---
const xiuluoPath = path.join(factionDir, '势力详情_修罗楼.txt');
let xiuluoContent = fs.readFileSync(xiuluoPath, 'utf8');
const xiuluoArch = `  组织架构:
    层级划分:
      - 楼主: 嗜血死士总坛之主，天下第一魔道杀神，精擅易容血煞奇门，修为【八境折柳】至【九境登楼】。
      - 血影使: 分掌四方血影刺杀堂口、督管死士刑律与受雇暗杀的绝顶杀手，修为在【六境见山】至【七境叩心】。
      - 绝命死士: 绝情绝义、口含毒丸执行灭门绝户任务的杀人傀儡，修为在【三境踏雪】至【四境观潮】。
      - 外围眼线暗桩: 散布四海客栈茶肆物色猎物、销毁痕迹的耳目，修为在【凡人】至【二境听风】。

`;
xiuluoContent = xiuluoContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, xiuluoArch);
fs.writeFileSync(xiuluoPath, xiuluoContent, 'utf8');
console.log('Updated 势力详情_修罗楼.txt');

// --- 白莲教 ---
const bailianPath = path.join(factionDir, '势力详情_白莲教.txt');
let bailianContent = fs.readFileSync(bailianPath, 'utf8');
const bailianArch = `  组织架构:
    层级划分:
      - 法王坛主: 统摄秦川极北分坛的邪教巨头，精通幻术邪蛊与迷魂妖法，可引妖神邪祭，修为【八境折柳】至【九境登楼】。
      - 白衣圣女与传道护法: 主持降神邪祭、以妖言蛊惑百姓教众的核心骨干，修为在【六境见山】至【七境叩心】。
      - 狂信死士与黑袍香主: 经药物洗脑、不畏生死刀剑的护坛狂徒，修为在【三境踏雪】至【四境观潮】。
      - 愚蒙教徒: 被虚妄长生之说驱使的寻常苦寒百姓，修为在【凡人】至【一境挽弓】。

`;
bailianContent = bailianContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, bailianArch);
fs.writeFileSync(bailianPath, bailianContent, 'utf8');
console.log('Updated 势力详情_白莲教.txt');

// --- 玄天会 ---
const xuantianPath = path.join(factionDir, '势力详情_玄天会.txt');
let xuantianContent = fs.readFileSync(xuantianPath, 'utf8');
const xuantianArch = `  组织架构:
    层级划分:
      - 总魁首与幕后尊主: 隐匿于暗处的巨擘，操弄朝堂与武林风云，深不可测，修为在【九境登楼】至【十境扶摇】。
      - 区域暗舵舵主: 统领一省或数州情报网、渗透各大门派的分舵枭雄，修为在【七境叩心】至【八境折柳】。
      - 通商大管事与暗线执事: 表面为豪商大贾、走私官铁火器与刺探机要的情报骨干，修为在【五境裁云】至【六境见山】。
      - 幽魂密探与死士爪牙: 充斥各大客栈商栈、执行灭口暗算的外围耳目，修为在【二境听风】至【四境观潮】。

`;
xuantianContent = xuantianContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, xuantianArch);
fs.writeFileSync(xuantianPath, xuantianContent, 'utf8');
console.log('Updated 势力详情_玄天会.txt');

// --- 沧溟流 ---
const cangmingPath = path.join(factionDir, '势力详情_沧溟流.txt');
let cangmingContent = fs.readFileSync(cangmingPath, 'utf8');
const cangmingArch = `  组织架构:
    层级划分:
      - 流主: 东瀛残心拔刀居合剑术名家，出刀断水，残忍嗜杀，修为【七境叩心】至【八境折柳】。
      - 妖狐忍客与拔刀师范: 专司施放迷雾遁术、暗夜破门与传习居合战阵的精锐杀手，修为在【五境裁云】至【六境见山】。
      - 浪人武士与海寇悍卒: 操持野太刀冲锋掠夺、战败即剖腹尽节的狂暴死士，修为在【三境踏雪】至【四境观潮】。
      - 掠海棹夫: 负责摇橹操纵乌篷黑船乘夜抢滩的凶悍盗寇，修为在【一境挽弓】至【二境听风】。

`;
cangmingContent = cangmingContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, cangmingArch);
fs.writeFileSync(cangmingPath, cangmingContent, 'utf8');
console.log('Updated 势力详情_沧溟流.txt');

// --- 连云十八坞 ---
const lianyunPath = path.join(factionDir, '势力详情_连云十八坞.txt');
let lianyunContent = fs.readFileSync(lianyunPath, 'utf8');
const lianyunArch = `  组织架构:
    层级划分:
      - 总总把子: 统领长江十八座水寨的黑道巨枭，横练功霸道，狂浪刀势沉猛，修为【七境叩心】至【八境折柳】。
      - 各坞坞主: 坐镇各路大泽险隘分寨、分管战船冲锋与水路抽水的分舵枭首，修为在【五境裁云】至【六境见山】。
      - 飞浪快刀水手: 擅长操驾快舟截杀、水底摸索沉船与飞爪接舷的悍恶先锋，修为在【三境踏雪】至【四境观潮】。
      - 水匪喽啰: 啸聚大泽江渚的亡命狂徒，负责水寨箭塔警戒与摇橹巡水，修为在【一境挽弓】至【二境听风】。

`;
lianyunContent = lianyunContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, lianyunArch);
fs.writeFileSync(lianyunPath, lianyunContent, 'utf8');
console.log('Updated 势力详情_连云十八坞.txt');

// --- 影杀楼 ---
const yingshaPath = path.join(factionDir, '势力详情_影杀楼.txt');
let yingshaContent = fs.readFileSync(yingshaPath, 'utf8');
const yingshaArch = `  组织架构:
    层级划分:
      - 楼主: 隐于歌台舞榭幕后的绝顶刺客巨擘，深不可测，剑如幽魅，修为【七境叩心】至【八境折柳】。
      - 画舫花魁与暗刺首领: 伪装为名妓琴师、专司接近达官贵人与豪门巨贾执行诛心暗杀的名手，修为在【五境裁云】至【六境见山】。
      - 绝影杀手: 借夜市烟火与画舫微澜潜行突刺的职业刺客，修为在【三境踏雪】至【四境观潮】。
      - 侍女琴童与外围眼线: 穿梭苏杭酒肆瓦肆、打探目标起居与护卫底细的暗桩，修为在【一境挽弓】至【二境听风】。

`;
yingshaContent = yingshaContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, yingshaArch);
fs.writeFileSync(yingshaPath, yingshaContent, 'utf8');
console.log('Updated 势力详情_影杀楼.txt');

// --- 幽月楼 ---
const youyuePath = path.join(factionDir, '势力详情_幽月楼.txt');
let youyueContent = fs.readFileSync(youyuePath, 'utf8');
const youyueArch = `  组织架构:
    层级划分:
      - 楼主: 执掌生杀血令与核心秘库，残忍冷酷，擅使阴狠环刃与奇毒，修为【七境叩心】至【八境折柳】。
      - 杀手首领: 领衔各路月影刺客，承接顶尖买凶暗杀，修为在【五境裁云】至【六境见山】。
      - 冥花死士: 充当暗探、外围刺杀与消耗的年轻死士，修为在【二境听风】至【四境观潮】。

`;
youyueContent = youyueContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, youyueArch);
fs.writeFileSync(youyuePath, youyueContent, 'utf8');
console.log('Updated 势力详情_幽月楼.txt');

// --- 黑街 ---
const heijiePath = path.join(factionDir, '势力详情_黑街.txt');
let heijieContent = fs.readFileSync(heijiePath, 'utf8');
const heijieArch = `  组织架构:
    层级划分:
      - 鬼市之主: 执掌汴京地下坊市生杀规矩的神秘长者，双目盲而心眼明，手握京畿黑道生杀大权，修为【六境见山】至【七境叩心】。
      - 坊市掌柜与暗档执事: 操持地下珍玩销赃、买凶接单与死囚发落的黑市头领，修为在【四境观潮】至【五境裁云】。
      - 巡市暗刺与护场打手: 监察鬼市秩序、严惩坏规矩狂徒的冷酷杀手，修为在【二境听风】至【三境踏雪】。
      - 地下扒手与耳目游荡者: 散布市井探听风吹草动、搜罗违禁物资的阴暗爪牙，修为在【凡人】至【一境挽弓】。

`;
heijieContent = heijieContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, heijieArch);
fs.writeFileSync(heijiePath, heijieContent, 'utf8');
console.log('Updated 势力详情_黑街.txt');

// --- 漕帮 ---
const caobangPath = path.join(factionDir, '势力详情_漕帮.txt');
let caobangContent = fs.readFileSync(caobangPath, 'utf8');
const caobangArch = `  组织架构:
    层级划分:
      - 总舵主: 掌控进京万艘官民粮船水运命脉的总龙头，膂力惊人，深谙码头江湖世故，修为【四境观潮】至【五境裁云】。
      - 分堂舵爷与粮道巡检: 把守汴河各水门闸口、调配千万石漕粮水陆周转的实权把头，修为在【三境踏雪】至【四境观潮】。
      - 押运水勇与码头护卫: 护送漕船防范水匪劫粮、平定私盐纠纷的水战好手，修为在【二境听风】至【三境踏雪】。
      - 船夫纤夫: 操舟拉纤、起早摸黑装卸大宗粮货的数万底层工友，修为在【凡人】至【一境挽弓】。

`;
caobangContent = caobangContent.replace(/  组织架构:[\s\S]*?(?=  核心功法传承:)/, caobangArch);
fs.writeFileSync(caobangPath, caobangContent, 'utf8');
console.log('Updated 势力详情_漕帮.txt');

// 3. Update references from 封剑帮 to 封剑楼 across the repo
const filesToReplace = [
  path.join(regionDir, '势力人名_秦川.txt'),
  path.join(regionDir, '区域详情_秦川.txt'),
  path.join(sectDir, '门派详情_白帝阁.txt'),
  path.join(factionDir, '势力详情_龙王渡.txt'),
  overviewFile
];

for (const fp of filesToReplace) {
  if (fs.existsSync(fp)) {
    let c = fs.readFileSync(fp, 'utf8');
    c = c.replaceAll('封剑帮', '封剑楼');
    fs.writeFileSync(fp, c, 'utf8');
    console.log('Updated 封剑楼 reference in:', fp);
  }
}

// 4. Update Source/World Lore/门派与势力概览表.md
let overviewContent = fs.readFileSync(overviewFile, 'utf8');

// Update table entries in 门派与势力概览表.md
overviewContent = overviewContent.replace(
  /\| \*\*狼主堂\*\* \| 燕云 \| \*\*敌国前哨\*\* \| 守序邪恶 \| 【五境】~【六境】 \| 凡\/良\/上 \| 北狄元国贵族在燕云秘密建立的军政前哨死士堂，刺探边防边塞图谋南下。 \|/,
  '| **狼主堂** | 燕云 | **敌国前哨** | 守序邪恶 | 【八境】~【九境】 | 凡/良/上 | 北狄元国天狼战神南下军政前哨，萨满秘术与死士重阵并立，欲吞中原。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*修罗楼\*\* \| 九华 \| \*\*刺客魔楼\*\* \| 混乱邪恶 \| 【六境】~【七境】 \| 凡\/良\/上 \| 九华千仞绝峰嗜血死士总坛，擅血煞易容与灭门惨案，残忍嗜杀不择手段。 \|/,
  '| **修罗楼** | 九华 | **刺客魔楼** | 混乱邪恶 | 【八境】~【九境】 | 凡/良/上 | 天下第一嗜血魔道死士总坛，血煞魔功大成，易容绝命，各大名门寝食难安。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*白莲教\*\* \| 秦川 \| \*\*邪派大宗\*\* \| 混乱邪恶 \| 【六境】~【七境】 \| 凡\/良\/上 \| 隐秘盘踞极北冰窟与雪林之间的邪教总坛，精擅妖法迷魂，以虚妄教义惑众。 \|/,
  '| **白莲教** | 秦川 | **邪派大宗** | 混乱邪恶 | 【八境】~【九境】 | 凡/良/上 | 极北冰窟邪教总坛，摄魂还阳邪祭妖术通玄，与白帝阁正邪对峙数十年。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*玄天会\*\* \| 巴蜀、燕云 \| \*\*幕后黑手\*\* \| 守序邪恶 \| 【九境】~【十境】 \| 凡\/良\/上 \| 跨区渗透的天下第一地下暗网，幕后巨擘操控朝野，各地暗舵图谋甚大。 \|/,
  '| **玄天会** | 巴蜀、燕云 | **幕后黑手** | 守序邪恶 | 【九境】~【十境】 | 凡/良/上 | 跨区渗透的天下第一地下暗网，幕后大尊主操控朝野，各地暗舵舵主达七至八境。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*沧溟流\*\* \| 东越 \| \*\*境外寇流\*\* \| 混乱邪恶 \| 【六境见山】 \| 凡\/良\/上 \| 跨海而来的东瀛浪人武士与海寇同盟，狠辣残忍，精熟残心居合拔刀绝杀。 \|/,
  '| **沧溟流** | 东越 | **境外寇流** | 混乱邪恶 | 【七境】~【八境】 | 凡/良/上 | 东瀛居合残心剑圣魔君统领之海寇同盟，刀出断浪，乃东南数十载滔天海患。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*连云十八坞\*\* \| 江南 \| \*\*水上巨霸\*\* \| 混乱邪恶 \| 【六境见山】 \| 凡\/良\/上 \| 大江南北最凶悍的水上黑帮同盟，十八座水寨连环，截杀水路、勒索商船。 \|/,
  '| **连云十八坞** | 江南 | **水上巨霸** | 混乱邪恶 | 【七境】~【八境】 | 凡/良/上 | 大江南北最凶悍水上黑道巨枭，横练霸道，十八连环水寨令过江龙俯首。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*影杀楼\*\* \| 杭州 \| \*\*刺客大楼\*\* \| 中立邪恶 \| 【六境】~【七境】 \| 凡\/良\/上 \| 隐于江南画舫歌舞温柔乡的第一刺客楼，行事鬼魅飘忽，拿人钱财替人消灾。 \|/,
  '| **影杀楼** | 杭州 | **刺客大楼** | 中立邪恶 | 【七境】~【八境】 | 凡/良/上 | 隐于江南画舫温柔乡之第一杀手楼，楼主幽魅通神，有跨境刺杀大宗师之凶威。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*幽月楼\*\* \| 云滇 \| \*\*刺客大楼\*\* \| 中立邪恶 \| 【七境叩心】 \| 凡\/良\/上 \| 隐于劫花海深处的西南暗夜死士楼，专擅花毒致幻与环刃暗杀，认钱索命。 \|/,
  '| **幽月楼** | 云滇 | **刺客大楼** | 中立邪恶 | 【七境】~【八境】 | 凡/良/上 | 隐于万劫花海深处之西南暗夜死士楼，花瘴奇毒致幻通玄，环刃索命不留活口。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*封剑帮\*\* \| 秦川 \| \*\*逐客匪帮\*\* \| 混乱邪恶 \| 【四境观潮】 \| \*\*凡\/良\*\* \| 由遭名门逐出师门的心术不正恶徒聚成的极北匪帮，截道勒索。 \|/,
  '| **封剑楼** | 秦川 | **雪岭恶霸** | 混乱邪恶 | 【六境】~【七境】 | **凡/良/上** | 白帝阁叛徒剑宗恶道飞楼，磨尖断剑阴狠暴戾，霸占雪道与白帝阁结死仇。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*黑风水寨\*\* \| 荆州 \| \*\*洞庭水寇\*\* \| 混乱邪恶 \| 【四境】~【五境】 \| \*\*凡\/良\*\* \| 洞庭湖水泽深处的水贼凶寇，擅操快船水战，截杀官船民商。 \|/,
  '| **黑风水寨** | 荆州 | **洞庭水霸** | 混乱邪恶 | 【六境】~【七境】 | **凡/良/上** | 前朝水师叛将割据八百里洞庭水泽，数百战船劫掠大江，连通两淮水网。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*绝尘客栈\*\* \| 燕云 \| \*\*大漠孤店\*\* \| 绝对中立 \| 【四境观潮】 \| \*\*凡\/良\*\* \| 茫茫黄沙中立自保的避风客栈，老板娘八面玲珑，店内禁武充当法外枢纽。 \|/,
  '| **绝尘客栈** | 燕云 | **大漠法外店** | 绝对中立 | 【六境】~【七境】 | **凡/良/上** | 狂沙绝境中绝对中立避风乐土，老板娘八面玲珑武力通神，店内禁武法外枢纽。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*牧马堂\*\* \| 燕云 \| \*\*大漠贩马\*\* \| 混乱中立 \| 【四境观潮】 \| \*\*凡\/良\*\* \| 燕云大漠南部的草原马帮，擅长养马贩马与马背快刀，控制局部马市。 \|/,
  '| **牧马堂** | 燕云 | **北疆马霸** | 守序中立 | 【六境】~【七境】 | **凡/良/上** | 垄断燕云战马互市与大漠精骑之草原部族霸主，马霸快刀横行，抗衡北狄。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*三十六寨\*\* \| 云滇 \| \*\*土著山寨\*\* \| 混乱中立 \| 【四境观潮】 \| \*\*凡\/良\*\* \| 苍山深山土司山寨自治同盟，民风彪悍尚武，善使藤甲短刀药弩守护祖林。 \|/,
  '| **三十六寨** | 云滇 | **土司总盟** | 混乱中立 | 【五境】~【六境】 | **凡/良/上** | 苍山三十六峒蛮王土司大联盟，统领万千猎师部族，与五仙教守望十万大山。 |'
);
overviewContent = overviewContent.replace(
  /\| \*\*漕帮\*\* \| 汴京 \| \*\*水运工会\*\* \| 守序中立 \| 【五境】~【六境】 \| 凡\/良\/上 \| 掌控进京数万艘官民粮船装卸的庞大平民工会，帮众数万，牵系帝都命脉。 \|/,
  '| **漕帮** | 汴京 | **水运工会** | 守序中立 | 【四境】~【五境】 | 凡/良/上 | 掌控进京数万艘官民粮船装卸的庞大平民工会，帮众数万，牵系帝都命脉。 |'
);
fs.writeFileSync(overviewFile, overviewContent, 'utf8');
console.log('Updated 门派与势力概览表.md');

// 5. Update scripts/factions_data.js
const allFiles = fs.readdirSync(factionDir);
const allData = {};
for (const file of allFiles) {
  allData[file] = fs.readFileSync(path.join(factionDir, file), 'utf8');
}
fs.writeFileSync(path.join(__dirname, 'factions_data.js'), 'module.exports = ' + JSON.stringify(allData, null, 2) + ';\n', 'utf8');
console.log('Synchronized scripts/factions_data.js');

console.log('All upgrades completed successfully.');
