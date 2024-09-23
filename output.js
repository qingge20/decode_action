//Mon Sep 23 2024 15:59:07 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let _0x2dc19f = 100,
  _0x4af36d = [],
  _0x577d7b = "",
  _0x173063,
  _0x11bd41,
  _0x204d5e = "",
  _0x458801 = "",
  _0x1f97d6 = "",
  _0x5df69e = {},
  _0x52570 = false,
  _0x45198f = 0;
const _0x2aee42 = "https://api.m.jd.com/client.action",
  _0x211acb = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D";
let _0x3c2ba1 = "";
const _0x243d58 = process.env.WTNUM_NEW ? process.env.WTNUM_NEW : 0,
  _0x1ca4b7 = [1, 2, 3].includes(parseInt(process.env.FRUIT_LEVEL)) ? parseInt(process.env.FRUIT_LEVEL) : 3,
  _0x2bd31d = process.env.FRUIT_NOTIFY == "true" ? true : false,
  _0x2aa291 = 1000,
  _0x3e147d = require("./USER_AGENTS"),
  _0x1bb8aa = require("fs"),
  _0xd5704 = require("./function/dylib"),
  _0x69f4ee = require("./function/dylanv"),
  _0x273f72 = require("./function/jdCommon1"),
  {
    H5st: _0x2d8034
  } = require("./function/jdCrypto");
if (process.env.DY_PROXY) {
  const _0x56761e = require("./function/proxy.js");
  $.get = _0x56761e.intoRequest($.get.bind($));
  $.post = _0x56761e.intoRequest($.post.bind($));
}
let _0x513d0d = [];
const _0x90481f = {
    "farm_home": "c57f6",
    "farm_do_task": "28981",
    "farm_task_receive_award": "33e0f",
    "farm_water": "28981",
    "farm_assist_receive_award": "c4332",
    "farm_rain_round_icon": "c57f6",
    "farm_rain_reward": "c57f6"
  },
  _0x2a2f99 = {
    "dongDongFarmSignHome": "deba1",
    "dongDongFarmSignIn": "65f9d",
    "wheelsHome": "c06b7",
    "wheelsLottery": "bd6c8",
    "apsDoTask": "54ed7"
  };
!(async () => {
  await _0x15298a();
  if (!_0x4af36d[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n版本：20240916 ");
  $.log("问题建议：https://t.me/dylan_jdpro\n");
  $.log("\n环境变量（可选项）：");
  $.log("export DY_PROXY='url' 代理API");
  $.log("export WTNUM_NEW='100' 指定浇水次数");
  $.log("export FRUIT_NOTIFY='true' 开启详情通知，默认只通知成熟和异常");
  $.log("export FRUIT_LEVEL='2' 自动种植等级，默认最高3级，只能设置1-3");
  $.reqnum = 1;
  process.env.NO_WATER == "true" && 0 ? (_0x204d5e = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n")) : process.env.DO_TEN_WATER_AGAIN == "true" && 0 && (_0x204d5e = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));
  for (let _0x146b53 = 0; _0x146b53 < _0x4af36d.length; _0x146b53++) {
    if (_0x4af36d[_0x146b53]) {
      _0x577d7b = _0x4af36d[_0x146b53];
      $.UserName = decodeURIComponent(_0x577d7b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x577d7b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x146b53 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.farmInfo = "";
      ct = 0;
      $.kuwei = false;
      await _0x519808();
      console.log("\n------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x173063.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      _0x458801 = "";
      _0x1f97d6 = "";
      _0x5df69e = {};
      $.UA = _0x3e147d.UARAM ? _0x3e147d.UARAM() : _0x3e147d.USER_AGENT;
      $.UUID = _0x273f72.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await _0x1097e7();
      await $.wait(2000);
    }
  }
  _0x1bb8aa.writeFileSync("./fruit_helpcode_new", JSON.stringify(_0x513d0d), _0x352386 => {
    _0x352386 && console.log(_0x352386);
  });
  $.isNode() && _0x204d5e && _0x2bd31d && (await _0x173063.sendNotify("" + $.name, "" + _0x204d5e));
})().catch(_0xc6040d => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xc6040d + "!", "");
}).finally(() => {
  $.done();
});
async function _0x1097e7() {
  _0x1f97d6 = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);
  try {
    await _0x5d7ff4();
    await $.wait(500);
    if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
      _0x458801 = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
      console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
      console.log("【已完成种植】" + $.farmInfo.data.result.completeTimes + "次");
      _0x458801 += "【已完成种植】" + $.farmInfo.data.result.completeTimes + "次\n";
      _0x513d0d.push($.farmInfo.data.result.farmHomeShare.inviteCode);
      await _0x4a7217();
      if ($.farmInfo.data.result.treeFullStage === 5 || $.kuwei) {
        if ($.farmInfo.data.result.treeFullStage === 5) _0x5df69e["open-url"] = _0x211acb, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x5df69e), await _0x173063.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换");else $.kuwei && console.log("\n" + $.farmInfo.data.result.skuName + "   枯萎了，重新种植吧！");
        await _0x33fef5();
        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"] && _0x1ca4b7 - 1 == 2) {
          let _0x527f1b = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"];
          _0x3c2ba1 = _0x527f1b[Math.floor(Math.random() * _0x527f1b.length)].uid;
          console.log("\n已选择3级商品为自动种植目标");
        } else {
          if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"] && _0x1ca4b7 - 1 == 1) {
            let _0x3ca944 = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"];
            _0x3c2ba1 = _0x3ca944[Math.floor(Math.random() * _0x3ca944.length)].uid;
            console.log("\n已选择2级商品为自动种植目标");
          } else {
            if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"] && _0x1ca4b7 - 1 == 0) {
              let _0x538cdf = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"];
              _0x3c2ba1 = _0x538cdf[Math.floor(Math.random() * _0x538cdf.length)].uid;
              console.log("\n已选择1级商品为自动种植目标");
            } else console.log("未匹配到自动种植规则，请手动种植");
          }
        }
        if (_0x3c2ba1) {
          console.log("\n\n已随机选择种植目标，开始种植。。。");
          await _0x4685f9(_0x3c2ba1);
          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行做任务领水滴浇水吧！");
            return;
          }
        }
        return;
      } else $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"));
      await _0x56e9a8();
      if ($.rain_round.data.result.curRoundToken) {
        console.log("\n开始水滴红包雨...");
        await $.wait(1000);
        await _0x996f97($.rain_round.data.result.curRoundToken);
        await _0x5d2943($.rain_round.data.result.curRoundToken);
        $.rain_reward.data.bizCode == 0 && console.log("获得水滴" + $.rain_reward.data.result.waterRainPrize[0].value + "g💧");
      }
      await _0x509492();
      await _0x4cd051();
      process.env.DO_TEN_WATER_AGAIN != "true" || 1 ? ($.log("执行继续浇水..."), await _0x4a8b6d()) : $.log("不执行再次浇水，攒水滴!");
      await $.wait(500);
      await _0x5d7ff4();
      console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%");
      _0x458801 += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n";
      _0x458801 += "【剩余水滴】" + _0x45198f + "g💧\n";
    } else {
      if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
        console.log("没有种植水果，开始自动种植...");
        await _0x33fef5();
        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"] && _0x1ca4b7 - 1 == 2) {
          let _0x223aff = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"];
          _0x3c2ba1 = _0x223aff[Math.floor(Math.random() * _0x223aff.length)].uid;
          console.log("\n已选择3级商品为自动种植目标");
        } else {
          if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"] && _0x1ca4b7 - 1 == 1) {
            let _0x5b718d = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"];
            _0x3c2ba1 = _0x5b718d[Math.floor(Math.random() * _0x5b718d.length)].uid;
            console.log("\n已选择2级商品为自动种植目标");
          } else {
            if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"] && _0x1ca4b7 - 1 == 0) {
              let _0x11dd6f = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"];
              _0x3c2ba1 = _0x11dd6f[Math.floor(Math.random() * _0x11dd6f.length)].uid;
              console.log("\n已选择1级商品为自动种植目标");
            } else console.log("未匹配到自动种植规则，请手动种植");
          }
        }
        if (_0x3c2ba1) {
          console.log("\n\n已设置种植目标，开始种植。。。");
          await _0x4685f9(_0x3c2ba1);
          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
            return;
          }
        }
        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
        $.isNode() && (await _0x173063.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
        return;
      } else console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x458801 = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
    }
  } catch (_0x47bf36) {
    console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
    $.logErr(_0x47bf36);
  }
  await _0x11337a();
}
async function _0x4cd051() {
  await _0x2be9a7();
  console.log("\n开始日常任务...");
  for (let _0x543df0 of $.farmTask.data.result.taskList) {
    if (_0x543df0.taskStatus == 3) {
      console.log(_0x543df0.mainTitle + "已完成");
      continue;
    }
    if (_0x543df0.taskStatus == 2) {
      console.log("领取 " + _0x543df0.mainTitle + " 奖励");
      for (let _0x1e6e2b of Array(_0x543df0.taskDoTimes)) {
        await _0x215d45(_0x543df0.taskType, _0x543df0.taskId);
        try {
          if ($.dotaskResult?.["data"]?.["result"] && Object.keys($.dotaskResult.data.result).length > 0) console.log("完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");else break;
        } catch {}
        await $.wait(1000);
      }
      continue;
    }
    console.log("去做 " + _0x543df0.mainTitle);
    await $.wait(1000);
    switch (_0x543df0.taskType) {
      case "CUMULATIVE_TIMES":
      case "WECHAT_SHARE":
        break;
      case "ORDER_MARK":
        break;
      case "EXTERNAL_BROWSE":
      case "BROWSE_CHANNEL":
      case "BROWSE_PRODUCT":
      case "EXTERNAL_BROWSE_BI_LIVE":
      case "FOLLOW_CHANNEL":
        if (!_0x543df0.taskSourceUrl) {
          await _0x352436(_0x543df0.taskType, _0x543df0.taskId);
          let _0x3e453e = $.taskDetail.data.result.taskDetaiList;
          _0x543df0.taskSourceUrl = _0x3e453e[Math.floor(Math.random() * _0x3e453e.length)].itemId;
        }
        await _0x13268d(_0x543df0.taskType, _0x543df0.taskId, Buffer.from(_0x543df0.taskSourceUrl).toString("base64")), await $.wait(_0x543df0.timePeriod * 1000), await _0x215d45(_0x543df0.taskType, _0x543df0.taskId);
        $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
        break;
      default:
        console.log(_0x543df0.taskType + " 类型未支持");
        break;
    }
  }
  await _0x13d10c();
  await $.wait(500);
}
async function _0x56a0ff() {
  console.log("开始预测水果成熟时间...\n");
  await initForFarm();
  if (!$.farmInfo.farmUserPro) await initForFarm();
  await _0x2be9a7();
  let _0x1386ad = $.farmTask.firstWaterInit.totalWaterTimes;
  _0x458801 += "【今日共浇水】" + _0x1386ad + "次\n";
  _0x458801 += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
  _0x458801 += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";
  if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) _0x458801 += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x458801 += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");
  let _0x1b3dc7 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;
  if (_0x1386ad > 2) {
    let _0x278da7 = Math.ceil(_0x1b3dc7 / _0x1386ad) || 0;
    _0x458801 += "【预测】" + (_0x278da7 === 1 ? "明天" : _0x278da7 === 2 ? "后天" : _0x278da7 + "天之后") + "(" + _0x4d25b8(24 * 60 * 60 * 1000 * _0x278da7 + Date.now()) + "日)可兑换水果🍉\n";
  } else _0x458801 += "【预测】不浇水无限期\n";
}
async function _0x509492() {
  await _0x2be9a7();
  let _0x2baaeb = $.farmTask.data.result.taskList.filter(_0x5f0ff6 => JSON.stringify(_0x5f0ff6).includes("累计浇水"));
  _0x2dc19f = _0x2baaeb[0].taskLimitTimes * 10;
  if (_0x2baaeb[0].taskDoTimes !== _0x2baaeb[0].taskLimitTimes) {
    console.log("\n准备浇水" + _0x2baaeb[0].taskLimitTimes + "次");
    _0x52570 = false;
    for (let _0x160a64 = 0; _0x160a64 < _0x2baaeb[0].taskLimitTimes; _0x160a64++) {
      console.log("第" + (_0x160a64 + 1) + "次浇水");
      await _0xea6c05(1);
      if ($.waterResult.data?.["bizCode"] === 0) {
        console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);
        if ($.waterResult.data.result.finished) {
          _0x52570 = true;
          break;
        } else {
          if ($.waterResult.data.result.bottleWater < 10) {
            console.log("水滴不够，结束浇水\n");
            break;
          }
        }
      } else {
        if ($.waterResult.data?.["bizCode"] === 4) {
          console.log("水滴不够，结束浇水\n");
          break;
        } else {
          console.log("浇水出现失败异常,跳出不在继续浇水\n");
          console.log("" + JSON.stringify($.waterResult));
          break;
        }
      }
      _0x45198f = $.waterResult.data?.["result"]?.["bottleWater"];
    }
    _0x52570 && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP查看"), $.isNode() && (await _0x173063.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换")));
  } else console.log("\n今日已完成" + _0x2baaeb[0].taskLimitTimes + "次浇水任务\n");
}
async function _0x4a8b6d() {
  console.log("检查剩余水滴能否继续浇水...\n");
  await _0x5d7ff4();
  _0x45198f = $.farmInfo.data.result.bottleWater;
  let _0x40a13c = $.farmInfo.data.result.waterGramSingleTime;
  console.log("剩余水滴" + _0x45198f + "g\n");
  let _0x1b9cbb = _0x45198f - _0x2dc19f;
  if (_0x1b9cbb >= 10) {
    $.log("\n开始浇水...");
    console.log("目前剩余水滴：" + _0x45198f + "g，可继续浇水");
    _0x52570 = false;
    let _0x2c95f3 = _0x243d58 > 0 ? Math.min.apply(null, [Number(_0x243d58), parseInt(_0x1b9cbb / 10)]) : parseInt(_0x1b9cbb / 10);
    console.log("\n开始执行" + _0x2c95f3 + "次浇水，可变量指定次数...");
    let _0x40e660 = _0x40a13c == 10 ? 1 : 2;
    for (let _0x364951 = 0; _0x364951 < _0x2c95f3; _0x364951++) {
      $.log("浇水第" + (_0x364951 + 1) + "次");
      await _0xea6c05(_0x40e660);
      if ($.waterResult.code === 0) {
        console.log("浇水" + _0x40a13c + "g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");
        if ($.waterResult.data.result.finished) {
          _0x52570 = true;
          $.log("水果已成熟啦！\n");
          break;
        } else {}
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    _0x45198f = $.waterResult.data.result.bottleWater;
  } else console.log("目前剩余水滴：【" + _0x45198f + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
  _0x52570 && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看"), $.isNode() && (await _0x173063.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换")));
}
function _0x25053b() {
  return new Promise(async _0x17095c => {
    if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) console.log("果树发芽了,奖励30g💧"), await _0x33ff70("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");else {
      if ($.waterResult.waterStatus === 1) console.log("果树开花了,奖励40g💧"), await _0x33ff70("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");else {
        if ($.waterResult.waterStatus === 2) {
          console.log("果树长出小果子啦, 奖励50g💧");
          await _0x33ff70("3");
          console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
          $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
        }
      }
    }
    _0x17095c();
  });
}
async function _0x4d6fe6() {
  await _0x4df6bc();
  if ($.initForTurntableFarmRes && $.initForTurntableFarmRes.code === 0) {
    console.log("\n开始天天抽奖任务...");
    await _0x84d061();
    if ($.wheeltaskRes.code == 0) {
      for (let _0x36353d of $.wheeltaskRes.data) {
        if (_0x36353d.taskFinished) {
          console.log(_0x36353d.taskTitle + "----" + _0x36353d.taskShowTitle + " 已完成");
          continue;
        }
        await _0x2e944f(_0x36353d.taskType, _0x36353d.id, _0x36353d.taskSourceUrl);
        if ($.wheeldoRes && $.wheeldoRes.code == 0) console.log("任务完成，获得1次抽奖机会");else {
          console.log("错误了，403");
          break;
        }
        await $.wait(3000);
      }
    }
    await _0x4df6bc();
    if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
      console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
      console.log("开始抽奖...");
      let _0x3baf33 = "";
      for (let _0x15fdf2 = 0; _0x15fdf2 < $.initForTurntableFarmRes.data.lotteryChances; _0x15fdf2++) {
        await _0x3da597();
        console.log("第" + (_0x15fdf2 + 1) + "次抽奖");
        if ($.lotteryRes && $.lotteryRes.code === 0) {
          _0x3baf33 += $.lotteryRes.data.prizeName + "，";
          if ($.lotteryRes.data.lotteryChances === 0) break;
        } else {
          console.log("错误了！");
          break;
        }
        await $.wait(3000);
      }
      _0x3baf33 && console.log("天天抽奖奖励：" + _0x3baf33.substr(0, _0x3baf33.length - 1) + "\n");
    } else {
      console.log("天天抽奖无次数！");
    }
  } else console.log("初始化天天抽奖得好礼失败！");
}
async function _0x13d10c() {
  await _0x53052d();
  if ($.farmAssistResult.code === 0) {
    try {
      if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 1) {
        if ($.farmAssistResult.data.result.status === 2) {
          let _0x1f5cf6 = 0;
          for (let _0x34eff8 of Object.keys($.farmAssistResult.data.result.assistStageList)) {
            let _0x386b30 = $.farmAssistResult.data.result.assistStageList[_0x34eff8];
            _0x386b30.stageStaus === 2 && (await _0x1e674e(), $.receiveStageEnergy.code === 0 && (console.log("成功领取第" + (Number(_0x34eff8) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧"), _0x1f5cf6 += $.receiveStageEnergy.data.result.amount), await $.wait(1500));
          }
          _0x458801 += "【额外奖励】" + _0x1f5cf6 + "g💧领取完成\n";
          console.log("【额外奖励】" + _0x1f5cf6 + "g💧领取完成\n");
        } else $.farmAssistResult.data.result.status === 3 && (console.log("已经领取过好友助力额外奖励"), _0x458801 += "【额外奖励】已领取过\n");
      } else console.log("【额外奖励】领取失败：无好友助力"), _0x458801 += "【额外奖励】领取失败,原因：无好友助力\n";
      if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
        let _0x165a1 = "";
        $.farmAssistResult.data.result.assistFriendList.map((_0xad444a, _0x92a273) => {
          _0x92a273 === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x165a1 += _0xad444a.nickname || "匿名用户" : _0x165a1 += (_0xad444a.nickname || "匿名用户") + ",";
          let _0x368712 = new Date(_0xad444a.time),
            _0x40ad60 = _0x368712.getFullYear() + "/" + ("0" + (_0x368712.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x368712.getDate()).slice(-2) + " " + ("0" + _0x368712.getHours()).slice(-2) + ":" + ("0" + _0x368712.getMinutes()).slice(-2) + ":" + ("0" + _0x368712.getSeconds()).slice(-2);
          console.log("【" + (_0xad444a.nickname || "匿名用户") + "】 在 " + _0x40ad60 + " 给您助过力");
        });
        _0x458801 += "【助力您的好友】" + _0x165a1 + "\n";
      }
      console.log("\n领取额外奖励水滴结束\n");
    } catch {
      console.log("获取数据失败 " + JSON.stringify($.farmAssistResult));
    }
  } else {
    await _0x14a246();
    if ($.masterHelpResult.code === "0") {
      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) {
        if (!$.masterHelpResult.masterGotFinal) await _0x2a4065(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x458801 += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n");else {
          console.log("已经领取过5好友助力额外奖励");
          _0x458801 += "【额外奖励】已被领取过\n";
        }
      } else console.log("助力好友未达到5个"), _0x458801 += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";
      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
        let _0x4a16e4 = "";
        $.masterHelpResult.masterHelpPeoples.map((_0x1e7b60, _0x24539e) => {
          _0x24539e === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x4a16e4 += _0x1e7b60.nickName || "匿名用户" : _0x4a16e4 += (_0x1e7b60.nickName || "匿名用户") + ",";
          let _0x253053 = new Date(_0x1e7b60.time),
            _0x5d2813 = _0x253053.getFullYear() + "-" + (_0x253053.getMonth() + 1) + "-" + _0x253053.getDate() + " " + _0x253053.getHours() + ":" + _0x253053.getMinutes() + ":" + _0x253053.getMinutes();
          console.log("【" + (_0x1e7b60.nickName || "匿名用户") + "】 在 " + _0x5d2813 + " 给您助过力");
        });
        _0x458801 += "【助力您的好友】" + _0x4a16e4 + "\n";
      }
      console.log("领取额外奖励水滴结束\n");
    }
  }
}
async function _0x187a64() {
  let _0x591c37 = !$.farmTask.waterRainInit.f;
  _0x591c37 ? (console.log("水滴雨任务，每天两次，最多可得10g水滴"), console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否")), $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000 && (_0x591c37 = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n")), _0x591c37 && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x4a3dc9(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n")))) : console.log("【水滴雨】已全部完成\n");
}
async function _0x4a7217() {
  await _0xc3e319();
  if ($.clockInInit.code === 0) {
    if ($.clockInInit.data.signInFlag == 0) {
      console.log("\n开始今日签到");
      await _0x1c361c();
      if ($.clockInForFarmRes.code === 0) console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n");else $.clockInForFarmRes.code === 210000 ? (console.log("签到失败：" + JSON.stringify($.clockInForFarmRes)), $.kuwei = true) : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes));
    }
  }
}
async function _0x40c500() {
  await _0x5d83de();
  console.log("\n开始给好友浇水...");
  await _0x2be9a7();
  const {
    waterFriendCountKey: _0x160420,
    waterFriendMax: _0x3fb4f8
  } = $.farmTask.waterFriendTaskInit;
  console.log("今日已给" + _0x160420 + "个好友浇水");
  if (_0x160420 < _0x3fb4f8) {
    let _0xc6223a = [];
    if ($.friendList.friends && $.friendList.friends.length > 0) {
      $.friendList.friends.map((_0x2c2873, _0x29bde7) => {
        _0x2c2873.friendState === 1 && _0xc6223a.length < _0x3fb4f8 - _0x160420 && _0xc6223a.push(_0x2c2873.shareCode);
      });
      _0xc6223a.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0xc6223a));
      _0xc6223a.length == 0 && console.log("没有需要浇水的好友!\n");
      let _0x221947 = 0,
        _0x121bd1 = "";
      for (let _0xb21056 = 0; _0xb21056 < _0xc6223a.length; _0xb21056++) {
        await _0x3bab0b(_0xc6223a[_0xb21056]);
        console.log("为第" + (_0xb21056 + 1) + "个好友浇水");
        if ($.waterFriendForFarmRes.code === "0") {
          _0x221947++;
          if ($.waterFriendForFarmRes.cardInfo) {
            console.log("为好友浇水获得道具了");
            if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x121bd1 += "水滴换豆卡,";else {
              if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x121bd1 += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x121bd1 += "水滴翻倍卡,";else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x121bd1 += "加签卡,");
              }
            }
          }
        } else {
          if ($.waterFriendForFarmRes.code === "11") {
            console.log("水滴不够,跳出浇水");
          }
        }
      }
      _0x221947 > 0 && console.log("已给" + _0x221947 + "个好友浇水,消耗" + _0x221947 * 10 + "g水\n");
      _0x121bd1 && _0x121bd1.length > 0 && console.log("【好友浇水奖励】" + _0x121bd1.substr(0, _0x121bd1.length - 1) + "\n");
    } else console.log("好友列表无好友,快去邀请您的好友吧!\n");
  } else console.log("今日已为" + _0x3fb4f8 + "个好友浇水\n");
}
async function _0x22b1f3() {
  await _0x2be9a7();
  const {
    waterFriendCountKey: _0x41afa5,
    waterFriendMax: _0x4d3acf,
    waterFriendSendWater: _0x2a9513,
    waterFriendGotAward: _0x4791ad
  } = $.farmTask.waterFriendTaskInit;
  if (_0x41afa5 >= _0x4d3acf) {
    !_0x4791ad ? (await _0x53b7a0(), $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n")) : console.log("给好友浇水的水滴奖励已领取\n");
  } else {
    console.log("给" + _0x4d3acf + "个好友浇水未完成\n");
  }
}
async function _0x57a9b4() {
  for (let _0x59cf1c of _0x11bd41) {
    if (_0x59cf1c === $.farmInfo.farmUserPro.shareCode) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }
    await _0x3911ef(_0x59cf1c);
    if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}
async function _0x4354ed() {
  for (let _0x1b7824 = 0; _0x1b7824 < 10; _0x1b7824++) {
    $.duckRes = await _0x5766c5("getFullCollectionReward", {
      "type": 2,
      "version": 24,
      "channel": 1,
      "babelChannel": "121"
    });
    if ($.duckRes.code === "0") {
      if (!$.duckRes.hasLimit) console.log("小鸭子游戏:" + $.duckRes.title);else {
        console.log("" + $.duckRes.title);
        break;
      }
    } else {
      if ($.duckRes.code === "10") {
        console.log("小鸭子游戏达到上限");
        break;
      }
    }
  }
}
async function _0x5da673() {
  $.totalWaterReward = await _0x5766c5("totalWaterTaskForFarm");
}
async function _0x1bb43f() {
  $.firstWaterReward = await _0x5766c5("firstWaterTaskForFarm");
}
async function _0x26140b() {
  $.newtaskinfo = await _0x5766c5("gotNewUserTaskForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x1e9eaa() {
  $.newtaskinfo = await _0x5766c5("gotLowFreqWaterForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x5d7ff4() {
  $.farmInfo = await _0x5766c5("farm_home", {
    "version": 5
  });
}
async function _0x56e9a8() {
  $.rain_round = await _0x5766c5("farm_rain_round_icon", {
    "version": 5
  });
}
async function _0x996f97(_0x2ee64d) {
  $.rain_page = await _0x5766c5("farm_rain_page", {
    "version": 5,
    "token": _0x2ee64d
  });
}
async function _0x5d2943(_0x4f25ce) {
  $.rain_reward = await _0x5766c5("farm_rain_reward", {
    "version": 5,
    "token": _0x4f25ce,
    "bcc": 200,
    "scc": 0
  });
}
async function _0x53b7a0() {
  $.waterFriendGotAwardRes = await _0x5766c5("waterFriendGotAwardForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function _0x9a8daa() {
  $.myCardInfoRes = await _0x5766c5("myCardInfoForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function _0x51e6ee(_0x3b6d27) {
  $.userMyCardRes = await _0x5766c5("userMyCardForFarm", {
    "cardType": _0x3b6d27
  });
}
async function _0x33ff70(_0x39a798) {
  $.gotStageAwardForFarmRes = await _0x5766c5("gotStageAwardForFarm", {
    "type": _0x39a798
  });
}
async function _0xea6c05(_0x37c67f) {
  await $.wait(1500);
  $.waterResult = await _0x5766c5("farm_water", {
    "version": 5,
    "waterType": _0x37c67f
  });
}
async function _0x4df6bc() {
  $.initForTurntableFarmRes = await _0x29a67b("wheelsHome", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}
async function _0x84d061() {
  $.wheeltaskRes = await _0x29a67b("apTaskList", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}
async function _0x2e944f(_0x2dc4dc, _0x4c907f, _0x7c54fc) {
  $.wheeldoRes = await _0x29a67b("apsDoTask", {
    "taskType": _0x2dc4dc,
    "taskId": _0x4c907f,
    "channel": 4,
    "checkVersion": true,
    "linkId": "VssYBUKJOen7HZXpC8dRFA",
    "itemId": _0x7c54fc
  });
}
async function _0x3da597() {
  $.lotteryRes = await _0x29a67b("wheelsLottery", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}
async function _0x33fef5() {
  $.treeboardRes = await _0x5766c5("farm_tree_board", {
    "version": 5
  });
}
async function _0x4685f9(_0xcc7bda) {
  $.planttreeRes = await _0x5766c5("farm_plant_tree", {
    "version": 5,
    "uid": _0xcc7bda
  });
}
async function _0x2ffb65(_0x5650d8) {
  const _0x41f68f = {
    "type": 2,
    "adId": _0x5650d8,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.browserForTurntableFarm2Res = await _0x5766c5("browserForTurntableFarm", _0x41f68f);
}
async function _0x1c1e12() {
  $.lotteryMasterHelpRes = await _0x5766c5("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 24,
    "channel": 1
  });
}
async function _0x2a4065() {
  $.masterGotFinished = await _0x5766c5("masterGotFinishedTaskForFarm");
}
async function _0x14a246() {
  $.masterHelpResult = await _0x5766c5("masterHelpTaskInitForFarm");
}
async function _0x53052d() {
  $.farmAssistResult = await _0x5766c5("farm_assist_init_info", {
    "version": 5
  });
}
async function _0x1e674e() {
  $.receiveStageEnergy = await _0x5766c5("farm_assist_receive_award", {
    "version": 5
  });
}
async function _0x3911ef() {
  $.inviteFriendRes = await _0x5766c5("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function _0x24ac28() {
  $.helpResult = await _0x5766c5("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function _0x4a3dc9() {
  const _0x355ea6 = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterRain = await _0x5766c5("waterRainForFarm", _0x355ea6);
}
async function _0xc3e319() {
  $.clockInInit = await _0x29a67b("dongDongFarmSignHome", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}
async function _0x1c361c() {
  $.clockInForFarmRes = await _0x29a67b("dongDongFarmSignIn", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}
async function _0x3f02ed(_0x13ac6b, _0x8fdd9c, _0x4ac085) {
  const _0x488b3a = "clockInFollowForFarm";
  let _0x558160 = {
    "id": _0x13ac6b,
    "type": _0x8fdd9c,
    "step": _0x4ac085
  };
  if (_0x8fdd9c === "theme") {
    if (_0x4ac085 === "1") $.themeStep1 = await _0x5766c5(_0x488b3a, _0x558160);else {
      if (_0x4ac085 === "2") {
        $.themeStep2 = await _0x5766c5(_0x488b3a, _0x558160);
      }
    }
  } else {
    if (_0x8fdd9c === "venderCoupon") {
      if (_0x4ac085 === "1") $.venderCouponStep1 = await _0x5766c5(_0x488b3a, _0x558160);else _0x4ac085 === "2" && ($.venderCouponStep2 = await _0x5766c5(_0x488b3a, _0x558160));
    }
  }
}
async function _0x4893a0() {
  $.gotClockInGiftRes = await _0x5766c5("clockInForFarm", {
    "type": 2,
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x575805() {
  $.threeMeal = await _0x5766c5("gotThreeMealForFarm");
}
async function _0x13268d(_0x208ebc, _0x521500, _0x4ea241) {
  $.browseResult = await _0x5766c5("farm_do_task", {
    "version": 5,
    "taskType": _0x208ebc,
    "taskId": _0x521500,
    "taskInsert": true,
    "itemId": _0x4ea241,
    "channel": 0
  });
}
async function _0x215d45(_0x5ca4c5, _0x454eab) {
  $.dotaskResult = await _0x5766c5("farm_task_receive_award", {
    "version": 5,
    "taskType": _0x5ca4c5,
    "taskId": _0x454eab,
    "channel": 0
  });
}
async function _0x352436(_0x54a86e, _0x42e36f) {
  $.taskDetail = await _0x5766c5("farm_task_detail", {
    "version": 5,
    "taskType": _0x54a86e,
    "taskId": _0x42e36f,
    "channel": 0
  });
}
async function _0x578e00() {
  $.goalResult = await _0x5766c5("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function _0x2be9a7() {
  $.farmTask = await _0x5766c5("farm_task_list", {
    "version": 5,
    "channel": 0,
    "babelChannel": "ttt7",
    "lbsSwitch": true
  });
}
async function _0xe9d546() {
  $.farmTask = await _0x5766c5("taskInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "45",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x5d83de() {
  $.friendList = await _0x5766c5("friendListInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x3a22d5() {
  $.awardInviteFriendRes = await _0x5766c5("awardInviteFriendForFarm");
}
async function _0x3bab0b(_0x522056) {
  const _0x18e045 = {
    "shareCode": _0x522056,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await _0x5766c5("waterFriendForFarm", _0x18e045);
}
async function _0x11337a() {
  if (_0x2bd31d) {
    $.msg($.name, _0x1f97d6, _0x458801, _0x5df69e);
    if ($.isNode()) {
      _0x204d5e += _0x1f97d6 + "\n" + _0x458801 + ($.index !== _0x4af36d.length ? "\n\n" : "");
    }
  } else $.log("\n" + _0x458801 + "\n");
}
function _0x4d25b8(_0x2d6000) {
  let _0x423f9f;
  return _0x2d6000 ? _0x423f9f = new Date(_0x2d6000) : _0x423f9f = new Date(), _0x423f9f.getFullYear() + "-" + (_0x423f9f.getMonth() + 1 >= 10 ? _0x423f9f.getMonth() + 1 : "0" + (_0x423f9f.getMonth() + 1)) + "-" + (_0x423f9f.getDate() >= 10 ? _0x423f9f.getDate() : "0" + _0x423f9f.getDate());
}
function _0x15298a() {
  return new Promise(_0x5ca81c => {
    console.log("开始获取配置文件\n");
    _0x173063 = $.isNode() ? require("./sendNotify") : "";
    const _0x3e3851 = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(_0x3e3851).forEach(_0x933883 => {
        if (_0x3e3851[_0x933883]) {
          _0x4af36d.push(_0x3e3851[_0x933883]);
        }
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else _0x4af36d = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x10b501($.getdata("CookiesJD") || "[]").map(_0x58332b => _0x58332b.cookie)].filter(_0x4f9eca => !!_0x4f9eca);
    _0x5ca81c();
  });
}
async function _0x19fbf9() {
  await _0x5766c5("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x4f6a68();
  await $.wait(2000);
  let _0x48352c = await _0x5766c5("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  return _0x48352c;
}
async function _0x40bba9() {
  await _0x5766c5("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0xe9d546();
  await $.wait(2000);
  let _0x518d76 = await _0x5766c5("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "45",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  return _0x518d76;
}
function _0x4f6a68() {
  return new Promise(_0x26edd0 => {
    const _0x282ac6 = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
      "headers": {
        "Cookie": _0x577d7b,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x282ac6, (_0xe3e2f1, _0x3d93f0, _0x198d2d) => {
      _0x26edd0();
    });
  });
}
function _0x519808() {
  return new Promise(_0x5e47fb => {
    const _0x58464d = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x577d7b,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x58464d, (_0x53c134, _0x50e7b8, _0x4779ab) => {
      try {
        if (_0x4779ab) {
          _0x4779ab = JSON.parse(_0x4779ab);
          if (_0x4779ab.islogin === "1") {} else _0x4779ab.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x3928ea) {
        console.log(_0x3928ea);
      } finally {
        _0x5e47fb();
      }
    });
  });
}
async function _0x5766c5(_0x2076f1, _0x161b67 = {}, _0x19f444 = 800) {
  if ($.reqnum % 5 == 0) _0x19f444 = _0x2aa291;
  $.reqnum++;
  if (_0x90481f[_0x2076f1]) {
    let _0x83b580 = {
      "appId": _0x90481f[_0x2076f1],
      "fn": _0x2076f1,
      "body": _0x161b67,
      "apid": "signed_wh5",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x161b67 = await _0x69f4ee.getbody(_0x83b580);
  } else _0x161b67 = "functionId=" + _0x2076f1 + "&body=" + encodeURIComponent(JSON.stringify(_0x161b67)) + "&appid=signed_wh5";
  return new Promise(_0x4c098e => {
    setTimeout(() => {
      $.get(_0x12df39(_0x161b67), (_0x595ba9, _0x49e979, _0x25af2f) => {
        try {
          _0x595ba9 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x595ba9)), console.log("function_id:" + _0x2076f1), $.logErr(_0x595ba9)) : _0x183c6a(_0x25af2f) && (_0x25af2f = JSON.parse(_0x25af2f));
        } catch (_0x1a9335) {
          $.logErr(_0x1a9335, _0x49e979);
        } finally {
          _0x4c098e(_0x25af2f);
        }
      });
    }, _0x19f444);
  });
}
async function _0x323d44(_0x550143, _0x50e2bc = {}) {
  return new Promise(async _0x25c566 => {
    let _0x3757ed = "POST",
      _0x96692d;
    const _0x1c64e7 = {
      "wqDefault": "false",
      "rfs": "0000",
      "cthr": "1",
      "loginType": "",
      "loginWQBiz": "wegame",
      "openudid": $.UUID,
      "uuid": $.UUID,
      "build": "169107",
      "screen": "430*932",
      "networkType": "wifi",
      "d_brand": "iPhone",
      "d_model": "iPhone16,2",
      "lang": "zh_CN",
      "osVersion": _0x273f72.getLatestIOSVersion(),
      "partner": ""
    };
    if (_0x2a2f99[_0x550143]) {
      _0x1d7f09 = {
        "appId": _0x2a2f99[_0x550143],
        "functionId": _0x550143,
        "appid": "activities_platform",
        "clientVersion": _0x273f72.getLatestAppVersion(),
        "client": "ios",
        "body": _0x50e2bc,
        "version": "4.4",
        "ua": $.UA,
        "t": true
      };
      let _0x5a5b33 = await _0x2d8034.getH5st(_0x1d7f09);
      _0x50e2bc = _0x5a5b33.paramsData;
    } else {
      _0x3757ed = "GET";
      _0x50e2bc = {
        "functionId": _0x550143,
        "body": JSON.stringify(_0x50e2bc),
        "t": Date.now(),
        "appid": "activities_platform",
        "client": "ios",
        "clientVersion": _0x273f72.getLatestAppVersion()
      };
      _0x96692d = Object.assign(_0x50e2bc, _0x1c64e7);
    }
    const _0x2f5225 = {
      "url": "https://api.m.jd.com/api",
      "method": _0x3757ed,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x577d7b,
        "Host": "api.m.jd.com",
        "Referer": "https://h5.m.jd.com/",
        "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
        "Origin": "https://h5.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      "params": _0x96692d,
      "data": _0x50e2bc,
      "timeout": 30000,
      "httpsTlsOptions": ["wheelsHome", "wheelsLottery"].includes(_0x550143) ? _0x273f72.useAppTls() : null
    };
    ["wheelsHome", "apsDoTask", "wheelsLottery", "apTaskList"].includes(_0x550143) && (_0x2f5225.headers.Referer = "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA", _0x2f5225.headers.Origin = "https://lotterydraw-new.jd.com", _0x2f5225.headers["X-Referer-Page"] = "https://lotterydraw-new.jd.com/");
    const _0x318da5 = await _0x273f72.request(_0x2f5225);
    _0x25c566(_0x318da5.data);
  });
}
function _0x57a7ea(_0x45a975, _0x44996f, _0x5729d0) {
  if (_0x45a975 == null) return "";
  var _0x46e60d = [];
  var _0x34d897 = typeof _0x45a975;
  if (_0x34d897 == "string" || _0x34d897 == "number" || _0x34d897 == "boolean") _0x46e60d.push(_0x44996f + "=" + (_0x5729d0 == null || _0x5729d0 ? encodeURIComponent(_0x45a975) : _0x45a975));else for (var _0x2c67bc in _0x45a975) {
    var _0xf596e5 = _0x44996f == null ? _0x2c67bc : _0x44996f + (_0x45a975 instanceof Array ? "[" + _0x2c67bc + "]" : "." + _0x2c67bc);
    _0x46e60d.push(_0x57a7ea(_0x45a975[_0x2c67bc], _0xf596e5, _0x5729d0));
  }
  return _0x46e60d.join("&");
}
async function _0x29a67b(_0x5e579f, _0x597e5c = {}, _0x4c7f03 = 1500) {
  $.reqnum++;
  if (_0x2a2f99[_0x5e579f]) {
    let _0x436961 = {
        "appId": _0x2a2f99[_0x5e579f],
        "functionId": _0x5e579f,
        "appid": "activities_platform",
        "clientVersion": $.UA.split(";")[2],
        "client": "ios",
        "body": _0x597e5c,
        "version": "4.4",
        "ua": $.UA,
        "t": true
      },
      _0x5a72f3 = await _0x2d8034.getH5st(_0x436961);
    _0x597e5c = _0x57a7ea(_0x5a72f3.paramsData);
  } else _0x597e5c = "functionId=" + _0x5e579f + "&body=" + encodeURIComponent(JSON.stringify(_0x597e5c)) + "&appid=activities_platform";
  return new Promise(_0x129be1 => {
    setTimeout(() => {
      $.post(_0x19828b(_0x597e5c), (_0x48cae1, _0x104778, _0x25ecc8) => {
        try {
          _0x48cae1 ? (console.log("\n东东农场: API请求失败 ‼️‼️"), console.log(JSON.stringify(_0x48cae1)), console.log("function_id:" + _0x5e579f), $.logErr(_0x48cae1)) : _0x183c6a(_0x25ecc8) && (_0x25ecc8 = JSON.parse(_0x25ecc8));
        } catch (_0x2223e0) {
          $.logErr(_0x2223e0, _0x104778);
        } finally {
          _0x129be1(_0x25ecc8);
        }
      });
    }, _0x4c7f03);
  });
}
function _0x183c6a(_0x129955) {
  try {
    if (typeof JSON.parse(_0x129955) == "object") return true;
  } catch (_0x5a10e1) {
    return console.log(_0x5a10e1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function _0x12df39(_0x55b165 = {}) {
  return {
    "url": _0x2aee42 + "?" + _0x55b165,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://h5.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://h5.m.jd.com/",
      "Cookie": _0x577d7b
    },
    "timeout": 30000
  };
}
function _0x19828b(_0x23465a = {}) {
  return {
    "url": "https://api.m.jd.com/api",
    "body": _0x23465a + "&cthr=1&loginType=&loginWQBiz=wegame&openudid=" + $.UUID + "&uuid=" + $.UUID + "&build=169088&screen=414*736&networkType=wifi&d_brand=iPhone&d_model=iPhone&lang=zh_CN&osVersion=&partner=-1",
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": _0x577d7b,
      "Host": "api.m.jd.com",
      "Referer": "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA",
      "x-referer-page": "https://lotterydraw-new.jd.com/",
      "Origin": "https://lotterydraw-new.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA,
      "request-from": "native"
    },
    "ciphers": _0xd5704.cpstr,
    "timeout": 30000
  };
}
function _0x44c52f(_0x5f18dd, _0x20aa62 = {}) {
  return {
    "url": _0x2aee42 + "?" + _0x20aa62,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "Cookie": _0x577d7b
    },
    "timeout": 10000
  };
}
function _0x10b501(_0x2223fe) {
  if (typeof _0x2223fe == "string") try {
    return JSON.parse(_0x2223fe);
  } catch (_0x10b78c) {
    return console.log(_0x10b78c), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(o, t) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((r, i) => {
        s.call(this, t, (t, e, s) => {
          t ? i(t) : r(e);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.logLevels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      this.logLevelPrefixs = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevel = "info";
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(r => {
        this.get({
          url: t
        }, (t, e, s) => r(s));
      });
    }
    runScript(a, o) {
      return new Promise(r => {
        let t = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        t = t && t.replace(/\n/g, "").trim();
        var e = (e = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout")) ? +e : 20,
          [s, i] = (e = o && o.timeout ? o.timeout : e, t.split("@"));
        this.post({
          url: `http://${i}/v1/scripting/evaluate`,
          body: {
            script_text: a,
            mock_type: "cron",
            timeout: e
          },
          headers: {
            "X-Key": s,
            Accept: "*/*"
          },
          timeout: e
        }, (t, e, s) => r(s));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      this.fs = this.fs || require("fs");
      this.path = this.path || require("path");
      var t = this.path.resolve(this.dataFile),
        e = this.path.resolve(process.cwd(), this.dataFile),
        s = this.fs.existsSync(t),
        r = !s && this.fs.existsSync(e);
      if (!s && !r) return {};
      r = s ? t : e;
      try {
        return JSON.parse(this.fs.readFileSync(r));
      } catch (t) {
        return {};
      }
    }
    writedata() {
      var t, e, s, r, i;
      this.isNode() && (this.fs = this.fs || require("fs"), this.path = this.path || require("path"), t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), r = !(s = this.fs.existsSync(t)) && this.fs.existsSync(e), i = JSON.stringify(this.data), !s && r ? this.fs.writeFileSync(e, i) : this.fs.writeFileSync(t, i));
    }
    lodash_get(t, e, s) {
      let r = t;
      for (const t of e.replace(/\[(\d+)\]/g, ".$1").split(".")) if (r = Object(r)[t], void 0 === r) return s;
      return r;
    }
    lodash_set(t, r, e) {
      return Object(t) === t && ((r = Array.isArray(r) ? r : r.toString().match(/[^.[\]]+/g) || []).slice(0, -1).reduce((t, e, s) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(r[s + 1]) >> 0 == +r[s + 1] ? [] : {}, t)[r[r.length - 1]] = e), t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        var [, s, r] = /^@(.*?)\.(.*?)$/.exec(t);
        if (s = s ? this.getval(s) : "") try {
          const t = JSON.parse(s);
          e = t ? this.lodash_get(t, r, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        var [, r, i] = /^@(.*?)\.(.*?)$/.exec(e),
          a = this.getval(r),
          a = r ? "null" === a ? null : a || "{}" : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, i, t);
          s = this.setval(JSON.stringify(e), r);
        } catch (e) {
          this.lodash_set(a = {}, i, t);
          s = this.setval(JSON.stringify(a), r);
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          return this.data = this.loaddata(), this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got || require("got");
      this.cktough = this.cktough || require("tough-cookie");
      this.ckjar = this.ckjar || new this.cktough.CookieJar();
      t && (t.headers = t.headers || {}, t) && (t.headers = t.headers || {}, void 0 === t.headers.cookie) && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar);
    }
    tmout() {
      return new Promise((t, e) => {
        this.tmoutId = setTimeout(() => {
          this.prms.cancel();
          e({
            message: "timemout",
            response: ""
          });
        }, 50000);
      });
    }
    get(t, a = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          })), $httpClient.get(t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          })), $task.fetch(t).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            }, r, i);
          }, t => a(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          this.initGotEnv(t), this.prms = this.got(t).on("redirect", (t, e) => {
            try {
              var s;
              t.headers["set-cookie"] && ((s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString()) && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar);
            } catch (t) {
              this.logErr(t);
            }
          }), Promise.race([this.prms, this.tmout()]).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            }, i);
            clearTimeout(this.tmoutId);
          }, t => {
            var {
              message: t,
              response: e
            } = t;
            clearTimeout(this.tmoutId);
            a(t, e, e && e.body);
          });
      }
    }
    post(t, a = () => {}) {
      var e = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          })), $httpClient[e](t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          t.method = e, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          })), $task.fetch(t).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            }, r, i);
          }, t => a(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          this.initGotEnv(t);
          var {
            url: s,
            ...r
          } = t;
          this.prms = this.got[e](s, r), Promise.race([this.prms, this.tmout()]).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            }, i);
            clearTimeout(this.tmoutId);
          }, t => {
            var {
              message: t,
              response: e
            } = t;
            clearTimeout(this.tmoutId);
            a(t, e, e && e.body);
          });
      }
    }
    time(t, e = null) {
      var s,
        r = {
          "M+": (e = e ? new Date(e) : new Date()).getMonth() + 1,
          "d+": e.getDate(),
          "H+": e.getHours(),
          "m+": e.getMinutes(),
          "s+": e.getSeconds(),
          "q+": Math.floor((e.getMonth() + 3) / 3),
          S: e.getMilliseconds()
        };
      for (s in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), r) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[s] : ("00" + r[s]).substr(("" + r[s]).length)));
      return t;
    }
    queryStr(e) {
      let s = "";
      for (const r in e) {
        let t = e[r];
        null != t && "" !== t && ("object" == typeof t && (t = JSON.stringify(t)), s += `${r}=${t}&`);
      }
      return s = s.substring(0, s.length - 1);
    }
    msg(t = o, e = "", s = "", r = {}) {
      var i,
        a = r => {
          const {
            $open: t,
            $copy: e,
            $media: i,
            $mediaMime: a
          } = r;
          switch (typeof r) {
            case void 0:
              return r;
            case "string":
              switch (this.getEnv()) {
                case "Surge":
                case "Stash":
                default:
                  return {
                    url: r
                  };
                case "Loon":
                case "Shadowrocket":
                  return r;
                case "Quantumult X":
                  return {
                    "open-url": r
                  };
                case "Node.js":
                  return;
              }
            case "object":
              switch (this.getEnv()) {
                case "Surge":
                case "Stash":
                case "Shadowrocket":
                default:
                  var o = {},
                    s = r.openUrl || r.url || r["open-url"] || t;
                  if (s && Object.assign(o, {
                    action: "open-url",
                    url: s
                  }), (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(o, {
                    action: "clipboard",
                    text: s
                  }), i) {
                    let t, e, s;
                    if (i.startsWith("http")) t = i;else if (i.startsWith("data:")) {
                      const [r] = i.split(";"),
                        [, a] = i.split(",");
                      e = a;
                      s = r.replace("data:", "");
                    } else e = i, s = (t => {
                      var e,
                        s = {
                          JVBERi0: "application/pdf",
                          R0lGODdh: "image/gif",
                          R0lGODlh: "image/gif",
                          iVBORw0KGgo: "image/png",
                          "/9j/": "image/jpg"
                        };
                      for (e in s) if (0 === t.indexOf(e)) return s[e];
                      return null;
                    })(i);
                    Object.assign(o, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": a ?? s
                    });
                  }
                  return Object.assign(o, {
                    "auto-dismiss": r["auto-dismiss"],
                    sound: r.sound
                  }), o;
                case "Loon":
                  {
                    const e = {};
                    (s = r.openUrl || r.url || r["open-url"] || t) && Object.assign(e, {
                      openUrl: s
                    });
                    var n = r.mediaUrl || r["media-url"];
                    return (n = i?.startsWith("http") ? i : n) && Object.assign(e, {
                      mediaUrl: n
                    }), console.log(JSON.stringify(e)), e;
                  }
                case "Quantumult X":
                  {
                    const a = {};
                    (o = r["open-url"] || r.url || r.openUrl || t) && Object.assign(a, {
                      "open-url": o
                    });
                    n = r["media-url"] || r.mediaUrl;
                    return (n = i?.startsWith("http") ? i : n) && Object.assign(a, {
                      "media-url": n
                    }), (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(a, {
                      "update-pasteboard": s
                    }), console.log(JSON.stringify(a)), a;
                  }
                case "Node.js":
                  return;
              }
            default:
              return;
          }
        };
      if (!this.isMute) switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          $notification.post(t, e, s, a(r));
          break;
        case "Quantumult X":
          $notify(t, e, s, a(r));
          break;
        case "Node.js":
      }
      this.isMuteLog || ((i = ["", "==============📣系统通知📣=============="]).push(t), e && i.push(e), s && i.push(s), console.log(i.join("\n")), this.logs = this.logs.concat(i));
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.debug + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.info + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.warn + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.error + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    log(...t) {
      0 < t.length && (this.logs = [...this.logs, ...t]);
      console.log(t.map(t => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, void 0 !== t.message ? t.message : t);
      }
    }
    wait(e) {
      return new Promise(t => setTimeout(t, e));
    }
    done(t = {}) {
      var e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(o, t);
}