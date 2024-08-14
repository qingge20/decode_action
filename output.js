//Wed Aug 14 2024 17:46:49 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x389188 = $.isNode() ? require("./jdCookie.js") : "",
  _0x431caf = require("./function/dylib.js"),
  _0x5486fb = require("./USER_AGENTS");
let _0x3b3e38 = "",
  _0x3a0faa = {};
if (process.env.DY_PROXY) try {
  require("https-proxy-agent");
  _0x3a0faa = require("./function/proxy.js");
  $.dget = _0x3a0faa.intoRequest($.get.bind($));
  $.dpost = _0x3a0faa.intoRequest($.post.bind($));
} catch {
  $.log("未安装https-proxy-agent依赖，无法启用代理");
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
let _0x215c1e = [],
  _0x67d417 = "",
  _0x376ba2 = 0;
const {
  execSync: _0x5b2d09
} = require("child_process");
if ($.isNode()) {
  Object.keys(_0x389188).forEach(_0x3be4fd => {
    _0x215c1e.push(_0x389188[_0x3be4fd]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x215c1e = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x7f5d3d => _0x7f5d3d.cookie)].filter(_0x1c3538 => !!_0x1c3538);
const _0x426ff9 = process.env.WYW_HELPTM ? process.env.WYW_HELPTM : "23",
  _0xddcd41 = process.env.WYW_HELPCODE ? process.env.WYW_HELPCODE : "";
$.helpId = [];
$.fullId = [];
$.apiTokenObj = {};
$.banpin = [];
!(async () => {
  if (!_0x215c1e[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前版本：20240719");
  console.log("问题建议：https://t.me/dylan_jdpro");
  console.log("环境变量：\n    WYW_HELPCODE='code1' 多个&分割");
  _0xddcd41 != "" && ($.helpId = _0xddcd41.split("&"));
  $.helpId.length > 0 ? (console.log("\n\n开始助力..."), await _0x229147()) : console.log("未指定助力马，退出！");
})().catch(_0x28f71d => {
  return $.logErr(_0x28f71d);
}).finally(() => {
  return $.done();
});
async function _0x229147() {
  for (let _0x1e692a = 0; _0x1e692a < _0x215c1e.length; _0x1e692a++) {
    $.UA = _0x5486fb.UARAM ? _0x5486fb.UARAM("", _0x67d417) : _0x5486fb.USER_AGENT;
    _0x67d417 = _0x431caf.buildck(_0x215c1e[_0x1e692a]);
    if (_0x67d417) {
      $.UserName = decodeURIComponent(_0x67d417.match(/pt_pin=([^; ]+)(?=;?)/) && _0x67d417.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x1e692a + 1;
      console.log("\n-------开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "------\n");
      $.apitoken = $.apiTokenObj[$.UserName];
      $.nonum = false;
      $.hphotflag = false;
      _0x376ba2 = 0;
      $.UUID = _0x431caf.UUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.fullId.length != 0 && ($.helpId = $.helpId.filter(_0x1f33d7 => !$.fullId.includes(_0x1f33d7)), $.fullId = []);
      _0x3a0faa.swip && (await _0x3a0faa.swip());
      for (let _0x51d128 of $.helpId) {
        $.itemId = _0x51d128;
        console.log("去助力 --> " + $.itemId);
        await _0x47bcf1("wanyiwan_assist");
        if ($.nonum || $.hphotflag || !$.isLogin) break;
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
      await $.wait(parseInt(Math.random() * 500 + 2000, 10));
      if ($.outFlag) break;
    }
  }
}
async function _0x3ed9f1() {
  try {
    $.taskList = [];
    $.isBan = false;
    $.signstatus = 0;
    await _0x47bcf1("wanyiwan_home");
    await $.wait(parseInt(Math.random() * 500 + 600, 10));
    $.signstatus == 0 ? (console.log("\n去签到..."), await _0x47bcf1("wanyiwan_sign")) : console.log("\n今日以签过!");
    if ($.isBan) {
      $.banpin.push($.UserName);
      return;
    }
    console.log("\n去做任务...");
    await _0x47bcf1("wanyiwan_task_list");
    for (let _0x4e929e of $.taskList) {
      $.itemId = 0;
      $.encryptAssignmentId = _0x4e929e.encryptAssignmentId;
      $.taskType = _0x4e929e.taskType;
      let _0x4372f8 = _0x4e929e.maxTimes - _0x4e929e.finishTimes;
      if (_0x4e929e.title.includes("邀请")) {
        if (_0x4e929e.status != 3) {
          $.helpId.push(_0x4e929e.taskDetail[0].itemId);
          console.log("入列邀请码：" + _0x4e929e.taskDetail[0].itemId);
        }
      }
      if (_0x4e929e.status == 2) {
        console.log("领取 " + _0x4e929e.title + " 奖励...");
        $.endflag = false;
        for (let _0x5e1bfd of Array(_0x4e929e.finishTimes)) {
          await _0x47bcf1("award");
          if ($.endflag) break;
          await $.wait(1500);
        }
        continue;
      } else {
        if (_0x4e929e.status == 3) {
          console.log(_0x4e929e.title + " ---- 已完成");
          continue;
        } else {
          if (/邀请|下单/.test(_0x4e929e.title)) continue;
        }
      }
      console.log("去做 " + _0x4e929e.title);
      for (let _0x2fa0f9 = 0; _0x2fa0f9 < _0x4372f8; _0x2fa0f9++) {
        if (_0x4e929e.taskDetail) {
          $.itemId = _0x4e929e.taskDetail[_0x2fa0f9].itemId;
        }
        await _0x47bcf1("startTask");
        _0x4e929e.limitTime != 0 && (await $.wait(_0x4e929e.limitTime * 1000), await _0x47bcf1("endTask"));
        await $.wait(parseInt(Math.random() * 500 + 1000, 10));
        await _0x47bcf1("award");
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      }
      await $.wait(parseInt(Math.random() * 500 + 1500, 10));
    }
    await $.wait(parseInt(Math.random() * 500 + 2000, 10));
  } catch (_0x2d900d) {
    console.log(_0x2d900d);
  }
}
async function _0x47bcf1(_0x23f5ae) {
  if ($.outFlag || $.isban) {
    return;
  }
  let _0x2d1619 = "",
    _0x169d2b,
    _0x333ec4,
    _0x1a68a6 = "post",
    _0x56c8e5 = "https://api.m.jd.com/client.action",
    _0x3de13e = "signed_wh5";
  switch (_0x23f5ae) {
    case "wanyiwan_sign":
      _0x2d1619 = {
        "version": 1
      }, _0x169d2b = "d12dd", _0x333ec4 = "wanyiwan_sign";
      break;
    case "wanyiwan_home":
      _0x2d1619 = {
        "outsite": 0,
        "firstCall": 1,
        "version": 1,
        "lbsSwitch": true
      }, _0x169d2b = "c81ad", _0x333ec4 = "wanyiwan_home";
      break;
    case "wanyiwan_task_list":
      _0x2d1619 = {
        "version": 1,
        "lbsSwitch": false
      }, _0x333ec4 = "wanyiwan_task_list";
      break;
    case "apTaskList":
      _0x56c8e5 = "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22Fl1LmxG_f0poD7w1ycZqnw%22%7D&t=1715170975269&appid=activities_platform&client=android&clientVersion=6.24.0&loginType=2&loginWQBiz=wegame&h5st=null&build=22779&screen=393*873&networkType=wifi&eufv=1&cthr=1", _0x1a68a6 = "get";
      break;
    case "startTask":
      _0x2d1619 = {
        "itemId": $.itemId,
        "taskType": $.taskType,
        "assignmentId": $.encryptAssignmentId,
        "actionType": 1,
        "version": 1
      }, _0x169d2b = "89db2", _0x333ec4 = "wanyiwan_do_task";
      break;
    case "endTask":
      _0x2d1619 = {
        "itemId": $.itemId,
        "taskType": $.taskType,
        "assignmentId": $.encryptAssignmentId,
        "actionType": 0,
        "version": 1
      }, _0x169d2b = "89db2", _0x333ec4 = "wanyiwan_do_task";
      break;
    case "award":
      _0x2d1619 = {
        "taskType": $.taskType,
        "assignmentId": $.encryptAssignmentId,
        "version": 1
      }, _0x169d2b = "d12dd", _0x333ec4 = "wanyiwan_task_receive_award";
      break;
    case "wanyiwan_assist":
      _0x2d1619 = {
        "inviteCode": $.itemId,
        "version": 1
      }, _0x169d2b = "ba505", _0x333ec4 = "wanyiwan_assist";
      break;
    case "turnHappyHome":
      _0x56c8e5 = "https://api.m.jd.com/api", _0x2d1619 = {
        "linkId": "CDv-TaCmVcD0sxAI_HE2RQ"
      }, _0x3de13e = "activities_platform", _0x333ec4 = "turnHappyHome";
      break;
    case "turnHappyDouble":
      _0x56c8e5 = "https://api.m.jd.com/api", _0x2d1619 = {
        "linkId": "CDv-TaCmVcD0sxAI_HE2RQ",
        "turnNum": parseInt(_0x3b3e38)
      }, _0x169d2b = "614f1", _0x3de13e = "activities_platform", _0x333ec4 = "turnHappyDouble";
      break;
    case "turnHappyReceive":
      _0x56c8e5 = "https://api.m.jd.com/api", _0x2d1619 = {
        "linkId": "CDv-TaCmVcD0sxAI_HE2RQ"
      }, _0x169d2b = "25fac", _0x3de13e = "activities_platform", _0x333ec4 = "turnHappyReceive";
      break;
    case "superRedBagHome":
      _0x56c8e5 = "https://api.m.jd.com/api", _0x2d1619 = {
        "linkId": "aE-1vg6_no2csxgXFuv3Kg"
      }, _0x169d2b = "5be1b", _0x3de13e = "activity_platform_se", _0x333ec4 = "superRedBagHome";
      break;
    case "superRedBagDraw":
      _0x56c8e5 = "https://api.m.jd.com/api", _0x2d1619 = {
        "linkId": "aE-1vg6_no2csxgXFuv3Kg"
      }, _0x169d2b = "89cfe", _0x3de13e = "activity_platform_se", _0x333ec4 = "superRedBagDraw";
      break;
    default:
      console.log("错误" + _0x23f5ae);
  }
  if (_0x169d2b) {
    let _0x42b16b = {
      "appId": _0x169d2b,
      "functionId": _0x333ec4,
      "body": _0x2d1619,
      "appid": _0x3de13e,
      "clientVersion": $.UA.split(";")[2],
      "client": "apple",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x2d1619 = await _0xd4274d(_0x42b16b);
    if (!_0x2d1619) return;
  } else _0x2d1619 && (_0x2d1619 = "functionId=" + _0x333ec4 + "&body=" + encodeURIComponent(JSON.stringify(_0x2d1619)) + "&t=" + Date.now() + "&appid=" + _0x3de13e + "&client=apple&clientVersion=" + $.UA.split(";")[2] + "&h5st=null");
  let _0x122a7a = _0x304ac7(_0x56c8e5, _0x2d1619),
    _0x1738ae = await _0x25e294(_0x122a7a, _0x1a68a6);
  do {
    JSON.stringify(_0x1738ae).includes("重试") ? (_0x376ba2++, await $.wait(1000), _0x1738ae = await _0x25e294(_0x122a7a, _0x1a68a6)) : _0x376ba2 = 0;
  } while (_0x376ba2 > 0 & _0x376ba2 < 4);
  _0x1972f5(_0x23f5ae, _0x1738ae);
}
async function _0x25e294(_0x2e9372, _0xbd3216) {
  return new Promise(async _0x2116db => {
    $["d" + _0xbd3216](_0x2e9372, async (_0x157f84, _0x121ba8, _0x2bf533) => {
      try {
        if (_0x157f84) console.log("" + $.toStr(_0x157f84, _0x157f84));else {
          if (_0x2bf533.includes("登录")) $.isLogin = false;
        }
      } catch (_0x2fdbea) {
        console.log(_0x2fdbea, _0x121ba8);
      } finally {
        _0x2116db(_0x2bf533);
      }
    });
  });
}
function _0x513bf1(_0x5f34a0) {
  let _0x18ee3a = "";
  switch (type) {
    case [_0x18ee3a]:
      const _0x19eb5d = {
        "ed": ed
      };
      _0xf1f6le = _0x19eb5d;
      break;
    case [_0x18ee3a]:
      const _0xb4b7fc = {
        "bd": bd
      };
      _0xf1f6lc = _0xb4b7fc;
      break;
    case [_0x18ee3a]:
      const _0x32a6c4 = {
        "ed": ed
      };
      _0xf1f6lf = _0x32a6c4;
      break;
    case [_0x18ee3a]:
      const _0x306c94 = {
        "ed": ed
      };
      _0xf1f6lg = _0x306c94;
      break;
    case [_0x18ee3a]:
      const _0x31f8a2 = {
        "ed": ed
      };
      _0xf1f6lv = _0x31f8a2;
      break;
  }
}
async function _0x1972f5(_0x494007, _0x411267) {
  let _0x11aa41 = "";
  try {
    _0x11aa41 = JSON.parse(_0x411267);
  } catch (_0x377f27) {
    console.log(_0x494007 + " 执行任务异常");
  }
  try {
    switch (_0x494007) {
      case "award":
        if (_0x11aa41.code == 0) _0x11aa41.data.bizCode == 0 ? console.log("任务完成，获得" + _0x11aa41.data.result.rewardCount + "奖票 🎫") : (console.log(_0x11aa41.data.bizCode, _0x11aa41.data.bizMsg), $.endflag = true);else {
          console.log(_0x11aa41.message);
        }
        break;
      case "wanyiwan_sign":
        if (_0x11aa41.code == 0) {
          if (_0x11aa41.data.bizCode == 0) console.log("签到成功,获得" + _0x11aa41.data.result.getScore + "奖票 🎫");else _0x11aa41.data.bizCode == -10001 ? (console.log("该账户可能黑子！无法签到和任务！"), $.isBan = true) : console.log(_0x11aa41.data.bizMsg);
        } else console.log(_0x11aa41.message);
        break;
      case "wanyiwan_assist":
        if (_0x11aa41.code == 0) {
          if (_0x11aa41.data.bizCode == 0) console.log("✔️ 助力成功"), $.nonum = true;else {
            if (_0x11aa41.data.bizMsg.includes("太多人") || _0x11aa41.data.bizMsg.includes("重复")) console.log("❌", _0x11aa41.data.bizCode, _0x11aa41.data.bizMsg), $.nonum = true;else {
              if (_0x11aa41.data.bizMsg.includes("已经完成")) console.log("❌", _0x11aa41.data.bizCode, _0x11aa41.data.bizMsg), $.fullId.push($.itemId);else _0x11aa41.data.bizMsg.includes("火爆") ? (console.log("❌", _0x11aa41.data.bizCode, _0x11aa41.data.bizMsg), $.hphotflag = true) : console.log("❌", _0x11aa41.data.bizCode, _0x11aa41.data.bizMsg);
            }
          }
        } else console.log("❌", _0x11aa41.code, _0x11aa41.message), _0x11aa41.message.includes("火爆") && ($.hphotflag = true);
        break;
      case "wanyiwan_home":
        if (_0x11aa41.code == 0) {
          if (_0x11aa41.data.bizCode == 0) {
            _0x11aa41.data.result.popWindows.length != 0 && console.log("获得新手奖励：", _0x11aa41.data.result.popWindows[0].getScore, "奖票 🎫");
            console.log("当前奖票总量：" + _0x11aa41.data.result.score + " 🎫");
            $.isLogin = _0x11aa41.data?.["result"]?.["isLogin"];
            $.taskList = _0x11aa41.data?.["result"]?.["taskBoard"] || [];
            $.signstatus = _0x11aa41.data?.["result"]?.["signBoard"]?.["status"] || 0;
          } else console.log(_0x11aa41.data.bizMsg);
        } else console.log(_0x11aa41.message);
        break;
      case "wanyiwan_task_list":
        _0x11aa41.code == 0 ? _0x11aa41.data.bizCode == 0 ? $.taskList = _0x11aa41.data?.["result"]?.["taskList"] || [] : console.log(_0x11aa41.data.bizMsg) : console.log(_0x11aa41.message);
        break;
      case "turnHappyHome":
        _0x11aa41.success ? $.leftTime = _0x11aa41.data.leftTime : console.log(_0x11aa41.errMsg);
        break;
      case "turnHappyDouble":
        if (_0x11aa41.success) {
          if (_0x11aa41.data.rewardState == 1) console.log("翻倍成功，获得 " + _0x11aa41.data.rewardValue + "奖票 🎫"), $.dbsuc = true;else {
            $.dbsuc = false;
            console.log("叼了，翻倍失败！再接再厉！");
          }
        } else console.log(_0x11aa41.errMsg), $.dbsuc = false;
        break;
      case "superRedBagHome":
        _0x11aa41.success ? ($.sceneStatus = _0x11aa41.data.sceneStatus, $.nextLeftTime = _0x11aa41.data.nextLeftTime) : console.log(_0x11aa41.errMsg);
        break;
      case "superRedBagDraw":
        if (_0x11aa41.success) {
          $.shakeLeftTime = _0x11aa41.data.shakeLeftTime;
          const {
            prizeDrawVo = ""
          } = _0x11aa41.data;
          if (prizeDrawVo) {
            switch (prizeDrawVo.prizeType) {
              case 24:
                console.log("获得：" + prizeDrawVo.amount + "票奖 🎫"), $.sucdraw++;
                break;
              case 1:
                console.log("获得:" + prizeDrawVo.prizeConfigName);
                break;
              default:
                console.log(prizeDrawVo);
                break;
            }
          } else console.log(_0x411267);
        } else console.log(_0x11aa41.errMsg);
        break;
      case "startTask":
      case "turnHappyReceive":
      case "endTask":
        break;
      default:
        console.log(_0x494007 + " -> " + _0x411267);
    }
    if (typeof _0x11aa41 == "object") {
      if (_0x11aa41.errorMessage) {
        if (_0x11aa41.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (_0x53076b) {
    console.log(_0x494007 + " " + _0x53076b);
  }
}
function _0x304ac7(_0x2c7efc, _0x44d98a) {
  _0x44d98a = _0x44d98a + "&rfs=0000&x-api-eid-token=" + $.apitoken;
  let _0x10db1c = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://pro.m.jd.com",
    "Referer": "https://pro.m.jd.com/",
    "Cookie": _0x67d417,
    "User-Agent": $.UA,
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-referer-page": "https://pro.m.jd.com/mall/active/3fcyrvLZALNPWCEDRvaZJVrzek8v/index.html",
    "request-from": "native",
    "x-rp-client": "h5_1.0.0"
  };
  return {
    "url": _0x2c7efc,
    "headers": _0x10db1c,
    "timeout": 30000,
    "ciphers": _0x431caf.cpstr,
    ...(_0x44d98a ? {
      "body": _0x44d98a
    } : {})
  };
}
async function _0x3da524() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x456afa(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x456afa(_0x4e8b71) {
  _0x4e8b71 = _0x4e8b71 || 32;
  let _0x2e3c22 = "abcdef0123456789",
    _0x5577d9 = _0x2e3c22.length,
    _0xde9bd9 = "";
  for (i = 0; i < _0x4e8b71; i++) {
    _0xde9bd9 += _0x2e3c22.charAt(Math.floor(Math.random() * _0x5577d9));
  }
  return _0xde9bd9;
}
function _0x47aa08(_0x282bd0) {
  if (typeof _0x282bd0 == "string") {
    try {
      return JSON.parse(_0x282bd0);
    } catch (_0x294d32) {
      return console.log(_0x294d32), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function _0x180b2b() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x33963b => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    let _0x75c3be = {
      "venderId": "" + $.joinVenderId + "",
      "shopId": "" + $.joinVenderId + "",
      "bindByVerifyCodeFlag": 1,
      "registerExtend": {},
      "writeChildFlag": 0,
      "channel": 406
    };
    $.shopactivityId == "" && delete _0x75c3be.activityId;
    let _0x2b434e = {
      "appId": "27004",
      "fn": "bindWithVender",
      "body": _0x75c3be,
      "apid": "shopmember_m_jd_com",
      "ver": "9.2.0",
      "cl": "H5",
      "user": $.UserName,
      "code": 0,
      "ua": $.UA
    };
    _0x75c3be = await dyy.getbody(_0x2b434e);
    const _0x318255 = {
      "url": "https://api.m.jd.com/client.action?" + _0x75c3be + "&uuid=88888",
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": _0x67d417,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": $.UA
      },
      "timeout": 30000
    };
    $.dget(_0x318255, async (_0x393765, _0x102f6e, _0x3aff41) => {
      try {
        _0x3aff41 = _0x3aff41 && _0x3aff41.match(/jsonp_.*?\((.*?)\);/) && _0x3aff41.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3aff41;
        let _0x52e148 = $.toObj(_0x3aff41, _0x3aff41);
        if (_0x52e148 && typeof _0x52e148 == "object") {
          if (_0x52e148 && _0x52e148.success === true) {
            console.log("    " + _0x52e148.message);
            $.errorJoinShop = _0x52e148.message;
            if (_0x52e148.result && _0x52e148.result.giftInfo) for (let _0x98b208 of _0x52e148.result.giftInfo.giftList) {
              console.log("\u5165\u4F1A\u83B7\u5F97:" + _0x98b208.discountString + _0x98b208.prizeName + _0x98b208.secondLineDesc);
            }
          } else _0x52e148 && typeof _0x52e148 == "object" && _0x52e148.message ? ($.errorJoinShop = _0x52e148.message, console.log("" + (_0x52e148.message || ""))) : console.log(_0x3aff41);
        } else console.log(_0x3aff41);
      } catch (_0x4b9f74) {
        $.logErr(_0x4b9f74, _0x102f6e);
      } finally {
        _0x33963b();
      }
    });
  });
}
async function _0x43cb36() {
  return new Promise(async _0x1248d2 => {
    let _0x232adc = {
        "venderId": $.joinVenderId,
        "payUpShop": true,
        "queryVersion": "10.5.2",
        "appid": "ef79a",
        "needSecurity": true,
        "bizId": "shop_view_app",
        "channel": 406
      },
      _0x4da3d7 = {
        "appId": "ef79a",
        "fn": "getShopOpenCardInfo",
        "body": _0x232adc,
        "apid": "jd_shop_member",
        "ver": "9.2.0",
        "cl": "H5",
        "user": $.UserName,
        "code": 0,
        "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      };
    _0x232adc = await dyy.getbody(_0x4da3d7);
    const _0x54ae79 = {
      "url": "https://api.m.jd.com/client.action?" + _0x232adc + "&uuid=88888",
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": _0x67d417,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      },
      "timeout": 60000
    };
    $.get(_0x54ae79, async (_0x4297f2, _0x66be58, _0xbde89) => {
      try {
        _0xbde89 = _0xbde89 && _0xbde89.match(/jsonp_.*?\((.*?)\);/) && _0xbde89.match(/jsonp_.*?\((.*?)\);/)[1] || _0xbde89;
        let _0x5b6c46 = $.toObj(_0xbde89, _0xbde89);
        _0x5b6c46 && typeof _0x5b6c46 == "object" ? _0x5b6c46 && _0x5b6c46.success == true && (console.log("去加入 -> " + (_0x5b6c46.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x5b6c46.result[0].interestsRuleList && _0x5b6c46.result[0].interestsRuleList[0] && _0x5b6c46.result[0].interestsRuleList[0].interestsInfo && _0x5b6c46.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0xbde89);
      } catch (_0x43e437) {
        $.logErr(_0x43e437, _0x66be58);
      } finally {
        _0x1248d2();
      }
    });
  });
}
function _0xd4274d(_0xc2d05a) {
  let _0x22daea = {
      "url": "http://121.40.162.127:9000/bdy_h5",
      "body": JSON.stringify(_0xc2d05a),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 10000
    },
    _0x197f69 = "";
  return new Promise(_0x2004f4 => {
    $.post(_0x22daea, (_0x5ec8f3, _0x2a952c, _0x433ca8) => {
      try {
        if (_0x5ec8f3) {} else {
          _0x433ca8 = JSON.parse(_0x433ca8);
          if (_0x433ca8.code == 200) _0x197f69 = _0x433ca8.data;else {
            $.log(_0x433ca8.msg);
          }
        }
      } catch (_0x17b870) {
        console.log(_0x17b870, _0x2a952c);
      } finally {
        _0x2004f4(_0x197f69);
      }
    });
  });
}
function _0x1cceb0(_0x1b776c, _0xefeed9) {
  return Math.floor(Math.random() * (_0xefeed9 - _0x1b776c)) + _0x1b776c;
}
function _0x43a0a9(_0x215fb1 = +new Date()) {
  var _0x42ccdf = new Date(_0x215fb1 + 8 * 3600 * 1000);
  return _0x42ccdf.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}
function _0x47323f() {
  return new Promise(_0x48e795 => {
    const _0x23b86a = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x67d417,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x23b86a, (_0x42e550, _0x462698, _0x220be4) => {
      try {
        if (_0x220be4) {
          _0x220be4 = JSON.parse(_0x220be4);
          if (_0x220be4.islogin === "1") {} else {
            if (_0x220be4.islogin === "0") {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x2b6c12) {
        console.log(_0x2b6c12);
      } finally {
        _0x48e795();
      }
    });
  });
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