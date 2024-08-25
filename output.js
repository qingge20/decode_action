//Sun Aug 25 2024 16:25:21 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x1a820c = 100;
let _0xdcffc7 = [],
  _0x4a5461 = "",
  _0x56ce45,
  _0x39854b,
  _0x1fe325 = "",
  _0x4de38f = "",
  _0x1200f1 = "",
  _0x3e6ff3 = {},
  _0x5dc38f = false,
  _0x493970 = 0;
const _0x520055 = "https://api.m.jd.com/client.action",
  _0x536d13 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D";
let _0x29bd8f = "";
const _0x3f676a = process.env.WTNUM_NEW ? process.env.WTNUM_NEW : 0,
  _0x5dcf61 = process.env.FRUIT_NOTIFY == "true" ? true : false,
  _0xf3cfa4 = 1000,
  _0x5f3b2e = require("./USER_AGENTS"),
  _0x1fb009 = require("fs"),
  _0x4fcb60 = require("./function/dylib"),
  _0x20dcb4 = require("./function/dylanv"),
  _0x40cada = require("./function/jdCommon1"),
  {
    H5st: _0x1247ba
  } = require("./function/jdCrypto");
if (process.env.DY_PROXY) {
  const _0x492c90 = require("./function/proxy.js");
  $.get = _0x492c90.intoRequest($.get.bind($));
  $.post = _0x492c90.intoRequest($.post.bind($));
}
let _0x2b560e = [];
const _0x414e31 = {
    "farm_home": "c57f6",
    "farm_do_task": "28981",
    "farm_task_receive_award": "33e0f",
    "farm_water": "28981",
    "farm_assist_receive_award": "c4332",
    "farm_rain_round_icon": "c57f6",
    "farm_rain_reward": "c57f6"
  },
  _0x28eb7 = {
    "dongDongFarmSignHome": "deba1",
    "dongDongFarmSignIn": "65f9d",
    "wheelsHome": "c06b7",
    "wheelsLottery": "bd6c8",
    "apsDoTask": "54ed7"
  };
!(async () => {
  await _0x391dc0();
  if (!_0xdcffc7[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n版本：20240819 ");
  $.log("问题建议：https://t.me/dylan_jdpro\n");
  $.log("\n环境变量（可选项）：");
  $.log("export DY_PROXY='url' 代理API");
  $.log("export WTNUM_NEW='100' 指定浇水次数");
  $.log("export FRUIT_NOTIFY=true 开启详情通知，默认只通知成熟和异常");
  $.log("Tips: 没种植会随机选择最高等级种子自动种植\n");
  $.reqnum = 1;
  if (process.env.NO_WATER == "true" && 0) _0x1fe325 = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n");else {
    process.env.DO_TEN_WATER_AGAIN == "true" && 0 && (_0x1fe325 = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));
  }
  for (let _0x539f63 = 0; _0x539f63 < _0xdcffc7.length; _0x539f63++) {
    if (_0xdcffc7[_0x539f63]) {
      _0x4a5461 = _0xdcffc7[_0x539f63];
      $.UserName = decodeURIComponent(_0x4a5461.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4a5461.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x539f63 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.farmInfo = "";
      ct = 0;
      $.kuwei = false;
      await _0x2fc970();
      console.log("\n------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await _0x56ce45.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      _0x4de38f = "";
      _0x1200f1 = "";
      _0x3e6ff3 = {};
      $.UA = _0x5f3b2e.UARAM ? _0x5f3b2e.UARAM() : _0x5f3b2e.USER_AGENT;
      $.UUID = _0x40cada.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await _0xba5e();
      await $.wait(2000);
    }
  }
  _0x1fb009.writeFileSync("./fruit_helpcode_new", JSON.stringify(_0x2b560e), _0x2ffcfc => {
    _0x2ffcfc && console.log(_0x2ffcfc);
  });
  $.isNode() && _0x1fe325 && _0x5dcf61 && (await _0x56ce45.sendNotify("" + $.name, "" + _0x1fe325));
})().catch(_0x2b690f => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2b690f + "!", "");
}).finally(() => {
  $.done();
});
async function _0xba5e() {
  _0x1200f1 = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);
  try {
    await _0x4f0a75();
    await $.wait(500);
    if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
      _0x4de38f = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
      console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
      console.log("【已成功兑换水果】" + $.farmInfo.data.result.completeTimes + "次");
      _0x4de38f += "【已兑换水果】" + $.farmInfo.data.result.completeTimes + "次\n";
      _0x2b560e.push($.farmInfo.data.result.farmHomeShare.inviteCode);
      await _0x110f55();
      if ($.farmInfo.data.result.treeFullStage === 5 || $.kuwei) {
        if ($.farmInfo.data.result.treeFullStage === 5) _0x3e6ff3["open-url"] = _0x536d13, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x3e6ff3), await _0x56ce45.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换");else $.kuwei && console.log("\n" + $.farmInfo.data.result.skuName + "   枯萎了，重新种植吧！");
        await _0x3757b1();
        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
          let _0x39796e = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"];
          _0x29bd8f = _0x39796e[Math.floor(Math.random() * _0x39796e.length)].uid;
          console.log("\n已选择3级商品为自动种植目标");
        } else {
          if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
            let _0x4b1376 = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"];
            _0x29bd8f = _0x4b1376[Math.floor(Math.random() * _0x4b1376.length)].uid;
            console.log("\n已选择2级商品为自动种植目标");
          } else {
            if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
              let _0x4708cd = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"];
              _0x29bd8f = _0x4708cd[Math.floor(Math.random() * _0x4708cd.length)].uid;
              console.log("\n已选择1级商品为自动种植目标");
            }
          }
        }
        if (_0x29bd8f) {
          console.log("\n\n已随机选择种植目标，开始种植。。。");
          await _0x352243(_0x29bd8f);
          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行做任务领水滴浇水吧！");
            return;
          }
        }
        return;
      } else $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"));
      await _0x453721();
      if ($.rain_round.data.result.curRoundToken) {
        console.log("\n开始水滴红包雨...");
        await $.wait(1000);
        await _0x454fcd($.rain_round.data.result.curRoundToken);
        await _0x571256($.rain_round.data.result.curRoundToken);
        $.rain_reward.data.bizCode == 0 && console.log("获得水滴" + $.rain_reward.data.result.waterRainPrize[0].value + "g💧");
      }
      await _0x5de7ab();
      await _0x5f2e1b();
      process.env.DO_TEN_WATER_AGAIN != "true" || 1 ? ($.log("执行继续浇水..."), await _0x3fb205()) : $.log("不执行再次浇水，攒水滴!");
      await $.wait(500);
      await _0x4f0a75();
      console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%");
      _0x4de38f += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n";
      _0x4de38f += "【剩余水滴】" + _0x493970 + "g💧\n";
    } else {
      if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
        console.log("没有种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
        await _0x3757b1();
        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
          let _0xc4ec81 = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"];
          _0x29bd8f = _0xc4ec81[Math.floor(Math.random() * _0xc4ec81.length)].uid;
          console.log("\n已选择3级商品为自动种植目标");
        } else {
          if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
            let _0x5665cc = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"];
            _0x29bd8f = _0x5665cc[Math.floor(Math.random() * _0x5665cc.length)].uid;
            console.log("\n已选择2级商品为自动种植目标");
          } else {
            if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
              let _0x35adab = $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"];
              _0x29bd8f = _0x35adab[Math.floor(Math.random() * _0x35adab.length)].uid;
              console.log("\n已选择1级商品为自动种植目标");
            }
          }
        }
        if (_0x29bd8f) {
          console.log("\n\n已设置种植目标，开始种植。。。");
          await _0x352243(_0x29bd8f);
          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
            return;
          }
        }
        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
        $.isNode() && (await _0x56ce45.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
        return;
      } else console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x4de38f = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
    }
  } catch (_0x1dfbaa) {
    console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
    $.logErr(_0x1dfbaa);
  }
  await _0xf08b48();
}
async function _0x5f2e1b() {
  await _0xeb4569();
  console.log("\n开始日常任务...");
  for (let _0x3033b8 of $.farmTask.data.result.taskList) {
    if (_0x3033b8.taskStatus == 3) {
      console.log(_0x3033b8.mainTitle + "已完成");
      continue;
    }
    console.log("去做 " + _0x3033b8.mainTitle);
    if (_0x3033b8.taskStatus == 2) {
      await _0x135bca(_0x3033b8.taskType, _0x3033b8.taskId);
      $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
      continue;
    }
    await $.wait(1000);
    switch (_0x3033b8.taskType) {
      case "CUMULATIVE_TIMES":
        break;
      case "ORDER_MARK":
        break;
      case "EXTERNAL_BROWSE":
      case "BROWSE_CHANNEL":
      case "BROWSE_PRODUCT":
      case "EXTERNAL_BROWSE_BI_LIVE":
      case "FOLLOW_CHANNEL":
        if (!_0x3033b8.taskSourceUrl) {
          await _0x469d8c(_0x3033b8.taskType, _0x3033b8.taskId);
          let _0x48a2a1 = $.taskDetail.data.result.taskDetaiList;
          _0x3033b8.taskSourceUrl = _0x48a2a1[Math.floor(Math.random() * _0x48a2a1.length)].itemId;
        }
        await _0x1db811(_0x3033b8.taskType, _0x3033b8.taskId, Buffer.from(_0x3033b8.taskSourceUrl).toString("base64")), await $.wait(_0x3033b8.timePeriod * 1000), await _0x135bca(_0x3033b8.taskType, _0x3033b8.taskId);
        $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
        break;
      default:
        console.log(_0x3033b8.taskType + " 类型未支持");
        break;
    }
  }
  await _0x16f575();
  await $.wait(500);
}
async function _0x268bc8() {
  console.log("开始预测水果成熟时间...\n");
  await initForFarm();
  if (!$.farmInfo.farmUserPro) await initForFarm();
  await _0xeb4569();
  let _0x268450 = $.farmTask.firstWaterInit.totalWaterTimes;
  _0x4de38f += "【今日共浇水】" + _0x268450 + "次\n";
  _0x4de38f += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
  _0x4de38f += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";
  if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) _0x4de38f += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x4de38f += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");
  let _0x2f5731 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;
  if (_0x268450 > 2) {
    let _0x462072 = Math.ceil(_0x2f5731 / _0x268450) || 0;
    _0x4de38f += "【预测】" + (_0x462072 === 1 ? "明天" : _0x462072 === 2 ? "后天" : _0x462072 + "天之后") + "(" + _0x263731(24 * 60 * 60 * 1000 * _0x462072 + Date.now()) + "日)可兑换水果🍉\n";
  } else _0x4de38f += "【预测】不浇水无限期\n";
}
async function _0x5de7ab() {
  await _0xeb4569();
  if (JSON.stringify($.farmTask.data.result.taskList).includes("\"每日累计浇水10次\",\"singleTask\":true,\"subTitle\":\"完成任务，奖励20g水滴\",\"taskDoTimes\":10") === false) {
    console.log("\n准备浇水十次");
    _0x5dc38f = false;
    for (let _0x352bc1 = 0; _0x352bc1 < 10 - $.farmTask.data.result.taskList[0].taskDoTimes; _0x352bc1++) {
      console.log("第" + (_0x352bc1 + 1) + "次浇水");
      await _0x4a57cb(1);
      if ($.waterResult.data?.["bizCode"] === 0) {
        console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);
        if ($.waterResult.data.result.finished) {
          _0x5dc38f = true;
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
      _0x493970 = $.waterResult.data?.["result"]?.["bottleWater"];
    }
    _0x5dc38f && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP查看"), $.isNode() && (await _0x56ce45.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换")));
  } else console.log("\n今日已完成10次浇水任务\n");
}
async function _0x3fb205() {
  console.log("检查剩余水滴能否继续浇水...\n");
  await _0x4f0a75();
  _0x493970 = $.farmInfo.data.result.bottleWater;
  console.log("剩余水滴" + _0x493970 + "g\n");
  let _0x5e4478 = _0x493970 - _0x1a820c;
  if (_0x5e4478 >= 10) {
    $.log("\n开始浇水...");
    console.log("目前剩余水滴：" + _0x493970 + "g，可继续浇水");
    _0x5dc38f = false;
    let _0x49d5e7 = _0x3f676a > 0 ? Math.min.apply(null, [Number(_0x3f676a), parseInt(_0x5e4478 / 10)]) : parseInt(_0x5e4478 / 10);
    console.log("\n开始执行" + _0x49d5e7 + "次浇水，可变量指定次数...");
    for (let _0x4a8bb6 = 0; _0x4a8bb6 < _0x49d5e7; _0x4a8bb6++) {
      $.log("浇水第" + (_0x4a8bb6 + 1) + "次");
      await _0x4a57cb(1);
      if ($.waterResult.code === 0) {
        console.log("浇水10g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");
        if ($.waterResult.data.result.finished) {
          _0x5dc38f = true;
          $.log("水果已成熟啦！\n");
          break;
        } else {}
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }
    _0x493970 = $.waterResult.data.result.bottleWater;
  } else console.log("目前剩余水滴：【" + _0x493970 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
  _0x5dc38f && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看"), $.isNode() && (await _0x56ce45.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换")));
}
function _0x563749() {
  return new Promise(async _0x1e9aae => {
    if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) console.log("果树发芽了,奖励30g💧"), await _0x4dd63c("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");else {
      if ($.waterResult.waterStatus === 1) {
        console.log("果树开花了,奖励40g💧");
        await _0x4dd63c("2");
        console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
        $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
      } else $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g💧"), await _0x4dd63c("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
    }
    _0x1e9aae();
  });
}
async function _0x492325() {
  await _0x496e07();
  if ($.initForTurntableFarmRes && $.initForTurntableFarmRes.code === 0) {
    console.log("\n开始天天抽奖任务...");
    await _0x31ff70();
    if ($.wheeltaskRes.code == 0) for (let _0x27faad of $.wheeltaskRes.data) {
      if (_0x27faad.taskFinished) {
        console.log(_0x27faad.taskTitle + "----" + _0x27faad.taskShowTitle + " 已完成");
        continue;
      }
      await _0x8d8778(_0x27faad.taskType, _0x27faad.id, _0x27faad.taskSourceUrl);
      if ($.wheeldoRes && $.wheeldoRes.code == 0) console.log("任务完成，获得1次抽奖机会");else {
        console.log("错误了，403");
        break;
      }
      await $.wait(3000);
    }
    await _0x496e07();
    if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
      console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
      console.log("开始抽奖...");
      let _0x16e78c = "";
      for (let _0x280608 = 0; _0x280608 < $.initForTurntableFarmRes.data.lotteryChances; _0x280608++) {
        await _0x1703a6();
        console.log("第" + (_0x280608 + 1) + "次抽奖");
        if ($.lotteryRes && $.lotteryRes.code === 0) {
          _0x16e78c += $.lotteryRes.data.prizeName + "，";
          if ($.lotteryRes.data.lotteryChances === 0) {
            break;
          }
        } else {
          console.log("错误了！");
          break;
        }
        await $.wait(3000);
      }
      _0x16e78c && console.log("天天抽奖奖励：" + _0x16e78c.substr(0, _0x16e78c.length - 1) + "\n");
    } else console.log("天天抽奖无次数！");
  } else console.log("初始化天天抽奖得好礼失败！");
}
async function _0x16f575() {
  await _0xf26743();
  if ($.farmAssistResult.code === 0) {
    try {
      if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 1) {
        if ($.farmAssistResult.data.result.status === 2) {
          let _0x2d7989 = 0;
          for (let _0x17dcdd of Object.keys($.farmAssistResult.data.result.assistStageList)) {
            let _0x5c28da = $.farmAssistResult.data.result.assistStageList[_0x17dcdd];
            if (_0x5c28da.stageStaus === 2) {
              await _0x5af9e8();
              $.receiveStageEnergy.code === 0 && (console.log("成功领取第" + (Number(_0x17dcdd) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧"), _0x2d7989 += $.receiveStageEnergy.data.result.amount);
              await $.wait(1500);
            }
          }
          _0x4de38f += "【额外奖励】" + _0x2d7989 + "g💧领取完成\n";
          console.log("【额外奖励】" + _0x2d7989 + "g💧领取完成\n");
        } else $.farmAssistResult.data.result.status === 3 && (console.log("已经领取过好友助力额外奖励"), _0x4de38f += "【额外奖励】已领取过\n");
      } else console.log("【额外奖励】领取失败：无好友助力"), _0x4de38f += "【额外奖励】领取失败,原因：无好友助力\n";
      if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
        let _0x12b516 = "";
        $.farmAssistResult.data.result.assistFriendList.map((_0x1fbe74, _0x4ce2b7) => {
          _0x4ce2b7 === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x12b516 += _0x1fbe74.nickname || "匿名用户" : _0x12b516 += (_0x1fbe74.nickname || "匿名用户") + ",";
          let _0x1a7690 = new Date(_0x1fbe74.time),
            _0x3c5cd4 = _0x1a7690.getFullYear() + "/" + ("0" + (_0x1a7690.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x1a7690.getDate()).slice(-2) + " " + ("0" + _0x1a7690.getHours()).slice(-2) + ":" + ("0" + _0x1a7690.getMinutes()).slice(-2) + ":" + ("0" + _0x1a7690.getSeconds()).slice(-2);
          console.log("【" + (_0x1fbe74.nickname || "匿名用户") + "】 在 " + _0x3c5cd4 + " 给您助过力");
        });
        _0x4de38f += "【助力您的好友】" + _0x12b516 + "\n";
      }
      console.log("\n领取额外奖励水滴结束\n");
    } catch {
      console.log("获取数据失败 " + JSON.stringify($.farmAssistResult));
    }
  } else {
    await _0x3a9014();
    if ($.masterHelpResult.code === "0") {
      $.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5 ? !$.masterHelpResult.masterGotFinal ? (await _0x485487(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x4de38f += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), _0x4de38f += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), _0x4de38f += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");
      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
        let _0xa236a5 = "";
        $.masterHelpResult.masterHelpPeoples.map((_0x1df387, _0x3d8cba) => {
          _0x3d8cba === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0xa236a5 += _0x1df387.nickName || "匿名用户" : _0xa236a5 += (_0x1df387.nickName || "匿名用户") + ",";
          let _0x3889bd = new Date(_0x1df387.time),
            _0x1bf870 = _0x3889bd.getFullYear() + "-" + (_0x3889bd.getMonth() + 1) + "-" + _0x3889bd.getDate() + " " + _0x3889bd.getHours() + ":" + _0x3889bd.getMinutes() + ":" + _0x3889bd.getMinutes();
          console.log("【" + (_0x1df387.nickName || "匿名用户") + "】 在 " + _0x1bf870 + " 给您助过力");
        });
        _0x4de38f += "【助力您的好友】" + _0xa236a5 + "\n";
      }
      console.log("领取额外奖励水滴结束\n");
    }
  }
}
async function _0x5ad6bb() {
  let _0x19791d = !$.farmTask.waterRainInit.f;
  if (_0x19791d) {
    console.log("水滴雨任务，每天两次，最多可得10g水滴");
    console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否"));
    $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000 && (_0x19791d = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n"));
    _0x19791d && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x452662(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n")));
  } else console.log("【水滴雨】已全部完成\n");
}
async function _0x110f55() {
  await _0x46c731();
  if ($.clockInInit.code === 0) {
    if ($.clockInInit.data.signInFlag == 0) {
      console.log("\n开始今日签到");
      await _0x5e4713();
      if ($.clockInForFarmRes.code === 0) console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n");else $.clockInForFarmRes.code === 210000 ? (console.log("签到失败：" + JSON.stringify($.clockInForFarmRes)), $.kuwei = true) : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes));
    }
  }
}
async function _0x2771f4() {
  await _0x51e5a1();
  console.log("\n开始给好友浇水...");
  await _0xeb4569();
  const {
    waterFriendCountKey: _0x34ce1d,
    waterFriendMax: _0x30f655
  } = $.farmTask.waterFriendTaskInit;
  console.log("今日已给" + _0x34ce1d + "个好友浇水");
  if (_0x34ce1d < _0x30f655) {
    let _0x3a8aad = [];
    if ($.friendList.friends && $.friendList.friends.length > 0) {
      $.friendList.friends.map((_0x58572d, _0x5df89d) => {
        _0x58572d.friendState === 1 && _0x3a8aad.length < _0x30f655 - _0x34ce1d && _0x3a8aad.push(_0x58572d.shareCode);
      });
      _0x3a8aad.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0x3a8aad));
      _0x3a8aad.length == 0 && console.log("没有需要浇水的好友!\n");
      let _0x506874 = 0,
        _0x10b670 = "";
      for (let _0x306db6 = 0; _0x306db6 < _0x3a8aad.length; _0x306db6++) {
        await _0x174c52(_0x3a8aad[_0x306db6]);
        console.log("为第" + (_0x306db6 + 1) + "个好友浇水");
        if ($.waterFriendForFarmRes.code === "0") {
          _0x506874++;
          if ($.waterFriendForFarmRes.cardInfo) {
            console.log("为好友浇水获得道具了");
            if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x10b670 += "水滴换豆卡,";else {
              if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x10b670 += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x10b670 += "水滴翻倍卡,";else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x10b670 += "加签卡,");
              }
            }
          }
        } else $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
      }
      _0x506874 > 0 && console.log("已给" + _0x506874 + "个好友浇水,消耗" + _0x506874 * 10 + "g水\n");
      _0x10b670 && _0x10b670.length > 0 && console.log("【好友浇水奖励】" + _0x10b670.substr(0, _0x10b670.length - 1) + "\n");
    } else {
      console.log("好友列表无好友,快去邀请您的好友吧!\n");
    }
  } else console.log("今日已为" + _0x30f655 + "个好友浇水\n");
}
async function _0x39f665() {
  await _0xeb4569();
  const {
    waterFriendCountKey: _0xf67d0f,
    waterFriendMax: _0x3c0c89,
    waterFriendSendWater: _0x59a832,
    waterFriendGotAward: _0x5dbf3e
  } = $.farmTask.waterFriendTaskInit;
  if (_0xf67d0f >= _0x3c0c89) !_0x5dbf3e ? (await _0x25f1aa(), $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n")) : console.log("给好友浇水的水滴奖励已领取\n");else {
    console.log("给" + _0x3c0c89 + "个好友浇水未完成\n");
  }
}
async function _0x575567() {
  for (let _0xfad2c9 of _0x39854b) {
    if (_0xfad2c9 === $.farmInfo.farmUserPro.shareCode) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }
    await _0x5afeca(_0xfad2c9);
    if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}
async function _0x354f78() {
  for (let _0x14cbe8 = 0; _0x14cbe8 < 10; _0x14cbe8++) {
    $.duckRes = await _0x5d0537("getFullCollectionReward", {
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
async function _0xb7e5a5() {
  $.totalWaterReward = await _0x5d0537("totalWaterTaskForFarm");
}
async function _0x53af3f() {
  $.firstWaterReward = await _0x5d0537("firstWaterTaskForFarm");
}
async function _0x58d33e() {
  $.newtaskinfo = await _0x5d0537("gotNewUserTaskForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x3c98ba() {
  $.newtaskinfo = await _0x5d0537("gotLowFreqWaterForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x4f0a75() {
  $.farmInfo = await _0x5d0537("farm_home", {
    "version": 4
  });
}
async function _0x453721() {
  $.rain_round = await _0x5d0537("farm_rain_round_icon", {
    "version": 4
  });
}
async function _0x454fcd(_0x5b619e) {
  $.rain_page = await _0x5d0537("farm_rain_page", {
    "version": 4,
    "token": _0x5b619e
  });
}
async function _0x571256(_0x4cac0a) {
  $.rain_reward = await _0x5d0537("farm_rain_reward", {
    "version": 4,
    "token": _0x4cac0a,
    "bcc": 200,
    "scc": 0
  });
}
async function _0x25f1aa() {
  $.waterFriendGotAwardRes = await _0x5d0537("waterFriendGotAwardForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function _0x2a6b8a() {
  $.myCardInfoRes = await _0x5d0537("myCardInfoForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function _0x5322cc(_0x2b2836) {
  $.userMyCardRes = await _0x5d0537("userMyCardForFarm", {
    "cardType": _0x2b2836
  });
}
async function _0x4dd63c(_0x38a153) {
  $.gotStageAwardForFarmRes = await _0x5d0537("gotStageAwardForFarm", {
    "type": _0x38a153
  });
}
async function _0x4a57cb(_0x302ef3) {
  await $.wait(1500);
  $.waterResult = await _0x5d0537("farm_water", {
    "version": 4,
    "waterType": _0x302ef3
  });
}
async function _0x496e07() {
  $.initForTurntableFarmRes = await _0x4d35f1("wheelsHome", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}
async function _0x31ff70() {
  $.wheeltaskRes = await _0x4d35f1("apTaskList", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}
async function _0x8d8778(_0x677b31, _0x53efdb, _0x3c8c75) {
  $.wheeldoRes = await _0x4d35f1("apsDoTask", {
    "taskType": _0x677b31,
    "taskId": _0x53efdb,
    "channel": 4,
    "checkVersion": true,
    "linkId": "VssYBUKJOen7HZXpC8dRFA",
    "itemId": _0x3c8c75
  });
}
async function _0x1703a6() {
  $.lotteryRes = await _0x4d35f1("wheelsLottery", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}
async function _0x3757b1() {
  $.treeboardRes = await _0x5d0537("farm_tree_board", {
    "version": 4
  });
}
async function _0x352243(_0x4134f3) {
  $.planttreeRes = await _0x5d0537("farm_plant_tree", {
    "version": 4,
    "uid": _0x4134f3
  });
}
async function _0x3db47e(_0x4d8c38) {
  const _0x3c9fc1 = {
    "type": 2,
    "adId": _0x4d8c38,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.browserForTurntableFarm2Res = await _0x5d0537("browserForTurntableFarm", _0x3c9fc1);
}
async function _0x17c25a() {
  $.lotteryMasterHelpRes = await _0x5d0537("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 24,
    "channel": 1
  });
}
async function _0x485487() {
  $.masterGotFinished = await _0x5d0537("masterGotFinishedTaskForFarm");
}
async function _0x3a9014() {
  $.masterHelpResult = await _0x5d0537("masterHelpTaskInitForFarm");
}
async function _0xf26743() {
  $.farmAssistResult = await _0x5d0537("farm_assist_init_info", {
    "version": 4
  });
}
async function _0x5af9e8() {
  $.receiveStageEnergy = await _0x5d0537("farm_assist_receive_award", {
    "version": 4
  });
}
async function _0x5afeca() {
  $.inviteFriendRes = await _0x5d0537("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function _0x555762() {
  $.helpResult = await _0x5d0537("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function _0x452662() {
  const _0x4e6be7 = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterRain = await _0x5d0537("waterRainForFarm", _0x4e6be7);
}
async function _0x46c731() {
  $.clockInInit = await _0x4d35f1("dongDongFarmSignHome", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}
async function _0x5e4713() {
  $.clockInForFarmRes = await _0x4d35f1("dongDongFarmSignIn", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}
async function _0x4b0cea(_0x4b5abf, _0x3374ab, _0x3edd8d) {
  const _0x574837 = "clockInFollowForFarm";
  let _0x384fc3 = {
    "id": _0x4b5abf,
    "type": _0x3374ab,
    "step": _0x3edd8d
  };
  if (_0x3374ab === "theme") {
    if (_0x3edd8d === "1") $.themeStep1 = await _0x5d0537(_0x574837, _0x384fc3);else _0x3edd8d === "2" && ($.themeStep2 = await _0x5d0537(_0x574837, _0x384fc3));
  } else {
    if (_0x3374ab === "venderCoupon") {
      if (_0x3edd8d === "1") $.venderCouponStep1 = await _0x5d0537(_0x574837, _0x384fc3);else _0x3edd8d === "2" && ($.venderCouponStep2 = await _0x5d0537(_0x574837, _0x384fc3));
    }
  }
}
async function _0x2abb3d() {
  $.gotClockInGiftRes = await _0x5d0537("clockInForFarm", {
    "type": 2,
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x5493e9() {
  $.threeMeal = await _0x5d0537("gotThreeMealForFarm");
}
async function _0x1db811(_0x1c3384, _0x1eb5bb, _0x1acaf9) {
  $.browseResult = await _0x5d0537("farm_do_task", {
    "version": 4,
    "taskType": _0x1c3384,
    "taskId": _0x1eb5bb,
    "taskInsert": true,
    "itemId": _0x1acaf9,
    "channel": 0
  });
}
async function _0x135bca(_0x2a787f, _0xa0f4f0) {
  $.dotaskResult = await _0x5d0537("farm_task_receive_award", {
    "version": 4,
    "taskType": _0x2a787f,
    "taskId": _0xa0f4f0,
    "channel": 0
  });
}
async function _0x469d8c(_0x567de4, _0x55473a) {
  $.taskDetail = await _0x5d0537("farm_task_detail", {
    "version": 4,
    "taskType": _0x567de4,
    "taskId": _0x55473a,
    "channel": 0
  });
}
async function _0x316f2d() {
  $.goalResult = await _0x5d0537("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function _0xeb4569() {
  $.farmTask = await _0x5d0537("farm_task_list", {
    "version": 4,
    "channel": 0,
    "babelChannel": "ttt7",
    "lbsSwitch": true
  });
}
async function _0x1dabe8() {
  $.farmTask = await _0x5d0537("taskInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "45",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x51e5a1() {
  $.friendList = await _0x5d0537("friendListInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}
async function _0x264feb() {
  $.awardInviteFriendRes = await _0x5d0537("awardInviteFriendForFarm");
}
async function _0x174c52(_0x5ebc46) {
  const _0x5baee8 = {
    "shareCode": _0x5ebc46,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await _0x5d0537("waterFriendForFarm", _0x5baee8);
}
async function _0xf08b48() {
  if (_0x5dcf61) $.msg($.name, _0x1200f1, _0x4de38f, _0x3e6ff3), $.isNode() && (_0x1fe325 += _0x1200f1 + "\n" + _0x4de38f + ($.index !== _0xdcffc7.length ? "\n\n" : ""));else {
    $.log("\n" + _0x4de38f + "\n");
  }
}
function _0x263731(_0x282cb2) {
  let _0x510edd;
  if (_0x282cb2) _0x510edd = new Date(_0x282cb2);else {
    _0x510edd = new Date();
  }
  return _0x510edd.getFullYear() + "-" + (_0x510edd.getMonth() + 1 >= 10 ? _0x510edd.getMonth() + 1 : "0" + (_0x510edd.getMonth() + 1)) + "-" + (_0x510edd.getDate() >= 10 ? _0x510edd.getDate() : "0" + _0x510edd.getDate());
}
function _0x391dc0() {
  return new Promise(_0x5bbe1e => {
    console.log("开始获取配置文件\n");
    _0x56ce45 = $.isNode() ? require("./sendNotify") : "";
    const _0x398b23 = $.isNode() ? require("./jdCookie.js") : "";
    if ($.isNode()) {
      Object.keys(_0x398b23).forEach(_0xf0d494 => {
        _0x398b23[_0xf0d494] && _0xdcffc7.push(_0x398b23[_0xf0d494]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else _0xdcffc7 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x30477c($.getdata("CookiesJD") || "[]").map(_0x5ea725 => _0x5ea725.cookie)].filter(_0x4b258d => !!_0x4b258d);
    _0x5bbe1e();
  });
}
async function _0xdbd3a() {
  await _0x5d0537("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x263b8b();
  await $.wait(2000);
  let _0x531b78 = await _0x5d0537("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  return _0x531b78;
}
async function _0x1cea64() {
  await _0x5d0537("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x1dabe8();
  await $.wait(2000);
  let _0x15076e = await _0x5d0537("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "45",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  return _0x15076e;
}
function _0x263b8b() {
  return new Promise(_0x3aa149 => {
    const _0x110a78 = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
      "headers": {
        "Cookie": _0x4a5461,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x110a78, (_0x30b0d9, _0x1544b4, _0x4b6f06) => {
      _0x3aa149();
    });
  });
}
function _0x2fc970() {
  return new Promise(_0x5e8bcf => {
    const _0x2fa0af = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x4a5461,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x2fa0af, (_0x5d59cd, _0x43f893, _0x54c3f9) => {
      try {
        if (_0x54c3f9) {
          _0x54c3f9 = JSON.parse(_0x54c3f9);
          if (_0x54c3f9.islogin === "1") {} else _0x54c3f9.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x5a43a1) {
        console.log(_0x5a43a1);
      } finally {
        _0x5e8bcf();
      }
    });
  });
}
async function _0x5d0537(_0x1ce7d0, _0x1a1842 = {}, _0x522eb7 = 800) {
  if ($.reqnum % 5 == 0) _0x522eb7 = _0xf3cfa4;
  $.reqnum++;
  if (_0x414e31[_0x1ce7d0]) {
    let _0x363466 = {
      "appId": _0x414e31[_0x1ce7d0],
      "fn": _0x1ce7d0,
      "body": _0x1a1842,
      "apid": "signed_wh5",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x1a1842 = await _0x20dcb4.getbody(_0x363466);
  } else {
    _0x1a1842 = "functionId=" + _0x1ce7d0 + "&body=" + encodeURIComponent(JSON.stringify(_0x1a1842)) + "&appid=signed_wh5";
  }
  return new Promise(_0x2f0417 => {
    setTimeout(() => {
      $.get(_0x264a1a(_0x1a1842), (_0x2420ce, _0x5df3fc, _0x3d9c1c) => {
        try {
          _0x2420ce ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x2420ce)), console.log("function_id:" + _0x1ce7d0), $.logErr(_0x2420ce)) : _0x11d0cf(_0x3d9c1c) && (_0x3d9c1c = JSON.parse(_0x3d9c1c));
        } catch (_0x3c34fd) {
          $.logErr(_0x3c34fd, _0x5df3fc);
        } finally {
          _0x2f0417(_0x3d9c1c);
        }
      });
    }, _0x522eb7);
  });
}
async function _0x454d6f(_0x15f3c5, _0xfad0d4 = {}) {
  return new Promise(async _0x228600 => {
    let _0x15541a = "POST",
      _0x16305c;
    const _0x2fe30f = {
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
      "osVersion": _0x40cada.getLatestIOSVersion(),
      "partner": ""
    };
    if (_0x28eb7[_0x15f3c5]) {
      _0x1d7f09 = {
        "appId": _0x28eb7[_0x15f3c5],
        "functionId": _0x15f3c5,
        "appid": "activities_platform",
        "clientVersion": _0x40cada.getLatestAppVersion(),
        "client": "ios",
        "body": _0xfad0d4,
        "version": "4.4",
        "ua": $.UA,
        "t": true
      };
      let _0xe0dbf4 = await _0x1247ba.getH5st(_0x1d7f09);
      _0xfad0d4 = _0xe0dbf4.paramsData;
    } else {
      _0x15541a = "GET";
      _0xfad0d4 = {
        "functionId": _0x15f3c5,
        "body": JSON.stringify(_0xfad0d4),
        "t": Date.now(),
        "appid": "activities_platform",
        "client": "ios",
        "clientVersion": _0x40cada.getLatestAppVersion()
      };
      _0x16305c = Object.assign(_0xfad0d4, _0x2fe30f);
    }
    const _0x1d96bd = {
      "url": "https://api.m.jd.com/api",
      "method": _0x15541a,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x4a5461,
        "Host": "api.m.jd.com",
        "Referer": "https://h5.m.jd.com/",
        "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
        "Origin": "https://h5.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      "params": _0x16305c,
      "data": _0xfad0d4,
      "timeout": 30000,
      "httpsTlsOptions": ["wheelsHome", "wheelsLottery"].includes(_0x15f3c5) ? _0x40cada.useAppTls() : null
    };
    ["wheelsHome", "apsDoTask", "wheelsLottery", "apTaskList"].includes(_0x15f3c5) && (_0x1d96bd.headers.Referer = "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA", _0x1d96bd.headers.Origin = "https://lotterydraw-new.jd.com", _0x1d96bd.headers["X-Referer-Page"] = "https://lotterydraw-new.jd.com/");
    const _0x3e7eb5 = await _0x40cada.request(_0x1d96bd);
    _0x228600(_0x3e7eb5.data);
  });
}
function _0x3b9716(_0x6cc3ba, _0x24e79d, _0x534c62) {
  if (_0x6cc3ba == null) return "";
  var _0x36c193 = [],
    _0x1ef96e = typeof _0x6cc3ba;
  if (_0x1ef96e == "string" || _0x1ef96e == "number" || _0x1ef96e == "boolean") {
    _0x36c193.push(_0x24e79d + "=" + (_0x534c62 == null || _0x534c62 ? encodeURIComponent(_0x6cc3ba) : _0x6cc3ba));
  } else {
    for (var _0x3e213d in _0x6cc3ba) {
      var _0x5e2519 = _0x24e79d == null ? _0x3e213d : _0x24e79d + (_0x6cc3ba instanceof Array ? "[" + _0x3e213d + "]" : "." + _0x3e213d);
      _0x36c193.push(_0x3b9716(_0x6cc3ba[_0x3e213d], _0x5e2519, _0x534c62));
    }
  }
  return _0x36c193.join("&");
}
async function _0x4d35f1(_0x368d05, _0x33f8e8 = {}, _0x4d4384 = 1500) {
  $.reqnum++;
  if (_0x28eb7[_0x368d05]) {
    let _0xf74954 = {
        "appId": _0x28eb7[_0x368d05],
        "functionId": _0x368d05,
        "appid": "activities_platform",
        "clientVersion": $.UA.split(";")[2],
        "client": "ios",
        "body": _0x33f8e8,
        "version": "4.4",
        "ua": $.UA,
        "t": true
      },
      _0x2d7866 = await _0x1247ba.getH5st(_0xf74954);
    _0x33f8e8 = _0x3b9716(_0x2d7866.paramsData);
  } else _0x33f8e8 = "functionId=" + _0x368d05 + "&body=" + encodeURIComponent(JSON.stringify(_0x33f8e8)) + "&appid=activities_platform";
  return new Promise(_0x23f9d8 => {
    setTimeout(() => {
      $.post(_0x2cabe4(_0x33f8e8), (_0x239367, _0x32a1b5, _0x1fa5dc) => {
        try {
          _0x239367 ? (console.log("\n东东农场: API请求失败 ‼️‼️"), console.log(JSON.stringify(_0x239367)), console.log("function_id:" + _0x368d05), $.logErr(_0x239367)) : _0x11d0cf(_0x1fa5dc) && (_0x1fa5dc = JSON.parse(_0x1fa5dc));
        } catch (_0x529a5c) {
          $.logErr(_0x529a5c, _0x32a1b5);
        } finally {
          _0x23f9d8(_0x1fa5dc);
        }
      });
    }, _0x4d4384);
  });
}
function _0x11d0cf(_0x210d1d) {
  try {
    if (typeof JSON.parse(_0x210d1d) == "object") return true;
  } catch (_0x2c0b74) {
    return console.log(_0x2c0b74), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function _0x264a1a(_0x35e852 = {}) {
  return {
    "url": _0x520055 + "?" + _0x35e852,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://h5.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://h5.m.jd.com/",
      "Cookie": _0x4a5461
    },
    "timeout": 30000
  };
}
function _0x2cabe4(_0x5141e2 = {}) {
  return {
    "url": "https://api.m.jd.com/api",
    "body": _0x5141e2 + "&cthr=1&loginType=&loginWQBiz=wegame&openudid=" + $.UUID + "&uuid=" + $.UUID + "&build=169088&screen=414*736&networkType=wifi&d_brand=iPhone&d_model=iPhone&lang=zh_CN&osVersion=&partner=-1",
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": _0x4a5461,
      "Host": "api.m.jd.com",
      "Referer": "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA",
      "x-referer-page": "https://lotterydraw-new.jd.com/",
      "Origin": "https://lotterydraw-new.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA,
      "request-from": "native"
    },
    "ciphers": _0x4fcb60.cpstr,
    "timeout": 30000
  };
}
function _0x40258e(_0x5e67a1, _0x597243 = {}) {
  return {
    "url": _0x520055 + "?" + _0x597243,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "Cookie": _0x4a5461
    },
    "timeout": 10000
  };
}
function _0x30477c(_0x179a8f) {
  if (typeof _0x179a8f == "string") {
    try {
      return JSON.parse(_0x179a8f);
    } catch (_0x359cd0) {
      return console.log(_0x359cd0), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
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