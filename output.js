//Fri Nov 15 2024 12:19:50 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x23d9b4 = require("./jdCookie"),
  _0x2ee7fa = require("./function/dylans"),
  _0x2d23a2 = require("./function/dylib");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("JD_FCWB_ROUND // 指定剩余血量");
console.log("JD_FCWB_TXNUM // 轮询提现页数");
console.log("JD_FCWB_EXCHANGE // 达到剩余血量是否领取奖励");
console.log("JD_FCWB_SWISH // 是否延长提现时间");
console.log("DY_PROXY // 代理");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const _0x1a3876 = process.env.JD_FCWB_ROUND || "1",
  _0x230c6d = "Bn1VWXtvgTv5ewPoMR-X8A",
  _0x52b533 = process.env.JD_FCWB_TXNUM ? process.env.JD_FCWB_TXNUM : "1",
  _0x57f32a = process.env.JD_FCWB_EXCHANGE === "true",
  _0xff4ab4 = process.env.JD_FCWB_SWISH === "true",
  _0x503859 = process.env.JD_FCWB_TXMAX_RETRY || "3";
if (process.env.DY_PROXY) try {
  require("https-proxy-agent");
  ccc = require("./function/proxy.js");
  $.dget = ccc.intoRequest($.get.bind($));
  $.dpost = ccc.intoRequest($.post.bind($));
} catch {
  $.log("未安装https-proxy-agent依赖，无法启用代理");
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
let _0x288b6a = Date.now(),
  _0x59fe1d = "happyDigger",
  _0x5e52d2 = 1000;
_0x23d9b4.RS_PROXY_OPEN && (_0x23d9b4.RS_PROXY_TUNNRL || _0x23d9b4.RS_PROXY_TUNNRL) && (_0x5e52d2 = 100);
let _0xbd76dd = "";
const _0x29a3f8 = Object.keys(_0x23d9b4).map(_0x2badf8 => _0x23d9b4[_0x2badf8]).filter(_0x38870 => _0x38870);
!_0x29a3f8[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("❖ 当前活动ID：" + _0x230c6d);
  console.log("❖ 达到剩余血量是否领取奖励:[" + (_0x57f32a == true ? "领取" : "不领取") + "],是否延长提现:[" + (_0xff4ab4 == true ? "延长" : "不延长") + "]");
  for (let _0x44270a = 0; _0x44270a < _0x29a3f8.length; _0x44270a++) {
    {
      $.index = _0x44270a + 1;
      _0xbd76dd = _0x29a3f8[_0x44270a];
      $.UserName = decodeURIComponent(_0xbd76dd.match(/pt_pin=([^; ]+)(?=;?)/) && _0xbd76dd.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.UA = _0x2d23a2.getUA("", $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.uuid = new Date().getTime() + "" + parseInt(2147483647 * Math.random());
      await _0x350921();
      await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
    }
  }
})().catch(_0x415126 => $.logErr(_0x415126)).finally(() => $.done());
async function _0x350921() {
  $.skipRun = false;
  $.txhot = false;
  try {
    await _0x443060();
    if ($.skipRun) return;
    await _0x2fdb54();
    if ($.skipRun) return;
    await _0x4a3fb3();
    if ($.skipRun) return;
  } catch (_0x12534e) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x12534e);
  }
}
async function _0x443060() {
  $.happyDigHome = "";
  $.round = "";
  await _0x35acf9("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
  $.happyDigHelpList = "";
  await _0x35acf9("happyDigHelpList");
  await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
  $.myinviteCode = $.happyDigHome?.["inviteCode"];
  $.blood = $.happyDigHome?.["blood"];
  $.markedPin = $.happyDigHome?.["markedPin"];
  const _0x1926ff = $.happyDigHelpList?.["personNum"] || 0;
  $.roundList = $.happyDigHome?.["roundList"] || [];
  const _0x526442 = new Date().valueOf(),
    _0x358440 = $.happyDigHome?.["leftTime"] + _0x526442,
    _0x5cf0a = $.time("yyyy-MM-dd HH:mm:ss", _0x358440);
  console.log("本轮结束时间 " + _0x5cf0a + "\n已有助力人数 " + _0x1926ff + " 🚶 \n当前血量 " + $.blood + " 🩸 (剩余 " + _0x1a3876 + " 🩸 退出执行)");
  if ($.blood <= _0x1a3876) {
    await _0x2355dd();
    console.log("");
    console.log("🙅‍♂ 当前血量[" + _0x1a3876 + "]已达到设定值，退出执行！");
    $.skipRun = true;
    return;
  }
}
async function _0x2fdb54() {
  $.apTaskList = "";
  await _0x35acf9("apTaskList");
  if (!$.apTaskList) {
    console.log("🙅‍♂ 未能正确获取到任务参数");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
  console.log("");
  for (let _0x320e7a = 0; _0x320e7a < $.apTaskList.length; _0x320e7a++) {
    const _0x135a2b = $.apTaskList[_0x320e7a];
    $.taskId = _0x135a2b?.["id"];
    $.taskType = _0x135a2b?.["taskType"];
    $.taskSourceUrl = _0x135a2b?.["taskSourceUrl"];
    const _0x7a7e6 = _0x135a2b?.["taskFinished"],
      _0x3a2887 = _0x135a2b?.["taskShowTitle"],
      _0x17b626 = _0x135a2b?.["timeLimitPeriod"];
    if (_0x7a7e6 || _0x17b626 !== null) continue;
    if (!$.taskType.includes("BROWSE_")) continue;
    console.log("去做 \"" + _0x3a2887 + "\" 任务");
    if ($.taskSourceUrl) await _0x35acf9("apDoTask"), await $.wait(parseInt(Math.random() * 1500 + 1500, 10));else {
      $.apTaskDetail = "";
      await _0x35acf9("apTaskDetail");
      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
      const _0x54398b = $.apTaskDetail?.["taskItemList"] || [];
      for (let _0x21bc4e = 0; _0x21bc4e < _0x54398b.length; _0x21bc4e++) {
        $.taskSourceUrl = _0x54398b[_0x21bc4e]?.["itemId"];
        await _0x35acf9("apDoTask");
        await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
      }
    }
  }
}
async function _0x4a3fb3() {
  $.digStop = false;
  $.lastPrize = false;
  $.happyDigHome = "";
  await _0x35acf9("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
  $.blood = $.happyDigHome?.["blood"];
  $.roundList = $.happyDigHome?.["roundList"] || [];
  const _0x2332d4 = $.happyDigHome?.["curRound"];
  if ($.blood <= _0x1a3876) {
    return;
  }
  const _0x225ef6 = $.roundList[_0x2332d4 - 1] || {};
  $.round = _0x225ef6?.["round"];
  const _0x1f4c8e = _0x225ef6?.["state"],
    _0x456966 = $.round === 1 ? "入门" : $.round === 2 ? "挑战" : $.round === 3 ? "终极" : "未知";
  if (_0x1f4c8e === 1) _0x2332d4 === 3 && console.log("今日已通关，明天再参与吧~");else {
    console.log("\n开始进行 \"" + _0x456966 + "\" 难度关卡，当前剩余 " + $.blood + " 🩸\n");
    const _0x211178 = _0x225ef6?.["chunks"] || [];
    $.digBombNums = 0;
    for (let _0x2769d9 = 0; _0x2769d9 < _0x211178.length; _0x2769d9++) {
      const _0x1cd848 = _0x211178[_0x2769d9],
        _0xe49a30 = _0x1cd848?.["state"];
      if (_0xe49a30 === 1) {
        const _0x471a21 = _0x1cd848?.["type"];
        if (_0x471a21 === 4) $.digBombNums++;
        continue;
      }
      $.rowIdx = _0x1cd848?.["rowIdx"];
      $.colIdx = _0x1cd848?.["colIdx"];
      await _0x35acf9("happyDigDo");
      await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
      if ($.digStop) {
        console.log("\n🙅‍♂ 号黑了，溜了溜了~");
        $.skipRun = true;
        return;
      } else {
        if ($.lastPrize) break;else {
          if ($.blood <= _0x1a3876) {
            console.log("\n🙅‍♂ 没血了，溜了溜了~");
            _0x57f32a && $.blood > 0 && (await _0x35acf9("happyDigExchange"));
            await _0x2355dd();
            return;
          }
        }
      }
    }
  }
  $.lastPrize && _0x2332d4 < 3 && $.blood > 0 && (await _0x4a3fb3());
}
async function _0x2355dd() {
  $.happyDigHome = "";
  await _0x35acf9("happyDigHome");
  if (!$.happyDigHome?.["markedPin"]) {
    console.log("🙅‍♂ 未能正确获取到主页信息，退出执行！");
    $.skipRun = true;
    return;
  }
  await $.wait(parseInt(_0x5e52d2 * 1 + 100, 10));
  $.blood = $.happyDigHome?.["blood"];
  $.roundList = $.happyDigHome?.["roundList"] || [];
  let _0x22e6d4 = "";
  for (let _0x3ad9ad = 0; _0x3ad9ad < $.roundList.length; _0x3ad9ad++) {
    {
      const _0x29fd67 = $.roundList[_0x3ad9ad],
        _0x42fa73 = _0x29fd67.round,
        _0x2e6d0e = _0x42fa73 === 1 ? "入门" : _0x42fa73 === 2 ? "挑战" : _0x42fa73 === 3 ? "终极" : "未知",
        _0x1f022f = _0x29fd67.redAmount,
        _0x21858b = _0x29fd67.cashAmount;
      if (_0x1f022f || _0x21858b) switch (_0x42fa73) {
        case 1:
        case 2:
        case 3:
          _0x22e6d4 += "\"" + _0x2e6d0e + "\" 难度关卡累计获得：" + _0x1f022f + "元无门槛红包🧧，" + _0x21858b + "元微信现金 💰\n";
          break;
        default:
          break;
      }
    }
  }
  _0x22e6d4 && console.log("\n📢 收入汇总\n" + _0x22e6d4.trim());
  for (let _0xa840b2 = 0; _0xa840b2 < _0x52b533; _0xa840b2++) {
    $.pageNum = _0xa840b2 + 1;
    await _0x252c74();
    if ($.txhot) break;
  }
}
async function _0x252c74() {
  $.superRedBagList = "";
  await _0x35acf9("superRedBagList");
  const _0x4ac56a = ($.superRedBagList.items || []).filter(_0x59b7f4 => _0x59b7f4.prizeType === 4 && _0x59b7f4.state === 0 || _0x59b7f4.state === 2);
  if (_0x4ac56a.length > 0) console.log("");
  for (i = 0; i < _0x4ac56a.length; i++) {
    const _0x42a115 = _0x4ac56a[i];
    console.log("去提现" + _0x42a115?.["amount"] + "💰");
    $.apCashWithDrawBaseParams = {
      "prizeType": 4,
      "business": _0x59fe1d,
      "id": _0x42a115.id,
      "poolBaseId": _0x42a115.poolBaseId,
      "prizeGroupId": _0x42a115.prizeGroupId,
      "prizeBaseId": _0x42a115.prizeBaseId
    };
    $.apCashWithDraw = "";
    await _0x35acf9("apCashWithDraw");
    if ($.apCashWithDraw) {
      const _0x3a3df0 = $.apCashWithDraw.status,
        _0x38f0e4 = $.apCashWithDraw.message;
      if (_0x3a3df0 === "310") {
        console.log("✅ 提现成功");
      } else {
        let _0x2f6101 = false,
          _0x5d15d0 = 0;
        const _0x2e48c9 = _0x503859;
        if (_0x38f0e4.includes("上限")) console.log("❌ 提现失败：当月提现额度已满"), !_0xff4ab4 && ($.txhot = true);else {
          if (_0x38f0e4.includes("已存在状态")) console.log("❌ 提现失败：上一笔提现还未完成"), _0x2f6101 = true;else {
            if (_0x38f0e4.includes("其它pin的订单")) {
              console.log("❌ 提现失败：其它pin的订单");
              if (!_0xff4ab4) break;
            } else {
              if (_0x38f0e4.includes("未绑定微信") || _0x38f0e4.includes("绑定手机号")) {
                console.log("❌ 提现失败：未绑定微信或手机号");
                if (!_0xff4ab4) break;
              } else {
                console.log("❌ 提现失败：" + _0x38f0e4);
                if (!_0xff4ab4) break;
              }
            }
          }
        }
        while (_0x2f6101 && _0x5d15d0 < _0x2e48c9) {
          await $.wait(50000);
          await _0x35acf9("apCashWithDraw");
          const _0x80cd48 = $.apCashWithDraw.status,
            _0x23c397 = $.apCashWithDraw.message;
          if (_0x80cd48 === "310") console.log("✅ 提现成功"), _0x2f6101 = false;else _0x23c397.includes("已存在状态") ? _0x5d15d0++ : (console.log("❌ 重试提现失败：上一笔提现还未完成"), _0x2f6101 = false);
        }
      }
      i !== _0x4ac56a.length - 1 && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
    }
  }
}
async function _0x3d23af(_0x39d3ef, _0x154388) {
  try {
    switch (_0x39d3ef) {
      case "happyDigHome":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.happyDigHome = _0x154388.data;else {
          if (_0x154388.data?.["bizMsg"]) console.log("> " + _0x154388.data?.["bizMsg"] + "}");else {
            if (_0x154388.errMsg) $.skipRun = true, console.log("> " + _0x154388.errMsg);else _0x154388.msg ? console.log("> " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "happyDigHelpList":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.happyDigHelpList = _0x154388.data;else {
          if (_0x154388.data?.["bizMsg"]) console.log("> " + _0x154388.data?.["bizMsg"]);else {
            if (_0x154388.errMsg) $.skipRun = true, console.log("> " + _0x154388.errMsg);else _0x154388.msg ? console.log("> " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "apTaskList":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.apTaskList = _0x154388.data || [];else {
          if (_0x154388.data?.["bizMsg"]) console.log("> " + _0x154388.data?.["bizMsg"] + "}");else {
            if (_0x154388.errMsg) $.skipRun = true, console.log("> " + _0x154388.errMsg);else _0x154388.msg ? console.log("> " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "apTaskDetail":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.apTaskDetail = _0x154388.data;else {
          if (_0x154388.data?.["bizMsg"]) console.log("> " + _0x154388.data?.["bizMsg"] + "}");else {
            if (_0x154388.errMsg) $.skipRun = true, console.log("> " + _0x154388.errMsg);else _0x154388.msg ? console.log("> " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "apDoTask":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.blood++, console.log(" >> 任务完成");else {
          if (_0x154388.data?.["bizMsg"]) console.log(" >> " + _0x154388.data?.["bizMsg"] + "}");else {
            if (_0x154388.errMsg) $.skipRun = true, console.log(" >> " + _0x154388.errMsg);else _0x154388.msg ? console.log(" >> " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "happyDigExchange":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) console.log("\n📢 结束当前关卡, 获得" + _0x154388.data?.["wxValue"] + "现金, " + _0x154388.data?.["redValue"] + "红包");else {
          if (_0x154388.data?.["bizMsg"]) console.log("> " + _0x154388.data?.["bizMsg"]);else {
            if (_0x154388.errMsg) $.skipRun = true, console.log("> " + _0x154388.errMsg);else _0x154388.msg ? console.log("> " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "happyDigDo":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) {
          const _0x100df6 = _0x154388.data?.["chunk"]?.["type"],
            _0x1f2d48 = _0x154388.data?.["chunk"]?.["value"],
            _0x20fd1d = _0x154388.data?.["lastPrize"];
          switch (_0x100df6) {
            case 1:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 🎟️ " + _0x1f2d48 + "元优惠券 🗑️"), $.digStop = true;
              break;
            case 2:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 🧧 " + _0x1f2d48 + "元无门槛红包");
              break;
            case 3:
              console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 💰 " + _0x1f2d48 + "元微信现金");
              break;
            case 4:
              $.blood--, $.digBombNums++, console.log("⛏️(" + $.rowIdx + "," + $.colIdx + ") > 💣️ Bomb💥");
              break;
            default:
              {
                {
                  console.log("❌ 奖品 " + _0x100df6 + " 状态未知 ❔️");
                  break;
                }
              }
          }
          _0x20fd1d && typeof _0x20fd1d === "boolean" && ($.lastPrize = true, $.round++, console.log("\n📢 当前难度关卡已通关，累计获得：" + _0x154388.data?.["redAmount"] + "🧧，" + _0x154388.data?.["cashAmount"] + "💰"));
        } else {
          if (_0x154388.data?.["bizMsg"]) console.log("挖宝失败 " + _0x154388.data?.["bizMsg"] + "}");else {
            if (_0x154388.errMsg) {
              $.skipRun = true;
              console.log("挖宝失败 " + _0x154388.errMsg);
            } else _0x154388.msg ? console.log("挖宝失败 " + _0x154388.msg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
          }
        }
        break;
      case "superRedBagList":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.superRedBagList = _0x154388.data;else {
          if (_0x154388?.["code"] === "605") console.log("> 滑块验证,请尝试手动验证一次或者更换IP"), $.txhot = true;else _0x154388.errMsg ? console.log("> 失败：" + _0x154388.errMsg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
        }
        break;
      case "apCashWithDraw":
        if (_0x154388?.["code"] === 0 && _0x154388?.["success"] === true) $.apCashWithDraw = _0x154388.data;else {
          if (_0x154388?.["code"] === "605") console.log("> 滑块验证,请尝试手动验证一次或者更换IP"), $.txhot = true;else _0x154388.errMsg ? console.log("> 失败：" + _0x154388.errMsg) : console.log("❓" + _0x39d3ef + " " + JSON.stringify(_0x154388));
        }
        break;
    }
  } catch (_0x28c279) {
    console.log("❌ 未能正确处理 " + _0x39d3ef + " 请求响应 " + (_0x28c279.message || _0x28c279));
  }
}
async function _0x35acf9(_0x2dfa2e) {
  if ($.skipRun) return;
  let _0x127f42 = "https://api.m.jd.com/api",
    _0x5c3633 = "get",
    _0x53c546 = {},
    _0x52e49d = "";
  switch (_0x2dfa2e) {
    case "happyDigHome":
      _0x52e49d = "ce6c2", _0x53c546 = {
        "linkId": _0x230c6d,
        "round": $.round
      };
      break;
    case "happyDigHelpList":
      _0x52e49d = "02f8d", _0x53c546 = {
        "pageNum": 1,
        "pageSize": 50,
        "linkId": _0x230c6d
      };
      break;
    case "apTaskList":
      bodystr = {
        "linkId": _0x230c6d
      }, _0x127f42 = "https://api.m.jd.com/api?functionId=apTaskList&body=" + encodeURIComponent(JSON.stringify(bodystr)) + "&t=" + _0x288b6a + "&appid=activities_platform&client=ios&clientVersion=12.3.1";
      break;
    case "apDoTask":
      _0x52e49d = "cd949", _0x53c546 = {
        "taskType": $.taskType,
        "taskId": $.taskId,
        "channel": 4,
        "checkVersion": false,
        "taskInsert": false,
        "linkId": _0x230c6d,
        "itemId": $.taskSourceUrl
      };
      break;
    case "apTaskDetail":
      _0x52e49d = "cd949", _0x53c546 = {
        "linkId": _0x230c6d,
        "taskType": $.taskType,
        "taskId": $.taskId,
        "channel": 4,
        "cityId": "133",
        "provinceId": "4",
        "countyId": "58530"
      };
      break;
    case "happyDigDo":
      _0x52e49d = "f7674", _0x53c546 = {
        "round": $.round,
        "rowIdx": $.rowIdx,
        "colIdx": $.colIdx,
        "linkId": _0x230c6d
      };
      break;
    case "happyDigExchange":
      _0x52e49d = "f7674", _0x53c546 = {
        "round": $.round,
        "linkId": _0x230c6d
      };
      break;
    case "superRedBagList":
      _0x5c3633 = "post", _0x52e49d = "f2b1d", _0x53c546 = {
        "pageNum": $.pageNum,
        "pageSize": 50,
        "linkId": _0x230c6d,
        "associateLinkId": "",
        "business": _0x59fe1d
      };
      break;
    case "apCashWithDraw":
      _0x5c3633 = "post", _0x52e49d = "73bca", _0x53c546 = {
        "linkId": _0x230c6d,
        "businessSource": "NONE",
        "base": $.apCashWithDrawBaseParams
      };
      break;
    default:
      console.log("❌ 未知请求 " + _0x2dfa2e);
      return;
  }
  const _0x389f0e = _0x53f1ca({
    "loginType": "2",
    "loginWQBiz": "wegame",
    "uuid": $.uuid,
    "lang": "zh_CN"
  });
  if (_0x52e49d) {
    let _0x207d17 = {
      "appId": _0x52e49d,
      "functionId": _0x2dfa2e,
      "body": _0x53c546,
      "appid": "activities_platform",
      "clientVersion": $.UA.split(";")[2],
      "client": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x53c546 = await _0x2ee7fa.getbody(_0x207d17);
    _0x53c546 += "&" + _0x389f0e;
    if (!_0x53c546) return;
  } else _0x53c546 && (_0x53c546 = "functionId=" + _0x2dfa2e + "&body=" + encodeURIComponent(JSON.stringify(_0x53c546)) + "&t=" + Date.now() + "&appid=activities_platform&client=apple&clientVersion=" + $.UA.split(";")[2] + "&" + _0x389f0e);
  const _0x552a0f = {
    "url": "" + _0x127f42 + (_0x53c546 ? "?" + _0x53c546 : ""),
    "method": _0x5c3633,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": _0xbd76dd,
      "Host": "api.m.jd.com",
      "Referer": "https://bnzf.jd.com/index?activityId=" + _0x230c6d + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=",
      "Origin": "https://bnzf.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    "timeout": 30000,
    "ciphers": _0x2d23a2.cpstr
  };
  return _0x5c3633 === "get" && (delete _0x552a0f.data, delete _0x552a0f.headers["Content-Type"]), new Promise(async _0x35ffeb => {
    $["d" + _0x5c3633](_0x552a0f, async (_0x1cf197, _0x63c581, _0x283f1d) => {
      try {
        _0x1cf197 ? console.log("" + $.toStr(_0x1cf197, _0x1cf197)) : _0x3d23af(_0x2dfa2e, JSON.parse(_0x283f1d));
      } catch (_0x302453) {
        console.log(_0x302453, _0x63c581);
      } finally {
        _0x35ffeb();
      }
    });
  });
}
function _0x53f1ca(_0x520489) {
  return Object.entries(_0x520489).map(([_0x650cd2, _0x1cd845]) => encodeURIComponent(_0x650cd2) + "=" + encodeURIComponent(_0x1cd845)).join("&");
}