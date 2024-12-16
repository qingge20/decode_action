//Mon Dec 16 2024 14:25:49 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x162b32 = $.isNode() ? require("./jdCookie.js") : "";
let _0x3ded81 = [];
if ($.isNode()) {
  Object.keys(_0x162b32).forEach(_0x269e45 => {
    _0x3ded81.push(_0x162b32[_0x269e45]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x3ded81 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0xe6c2e5($.getdata("CookiesJD") || "[]").map(_0x5a4dbd => _0x5a4dbd.cookie)].filter(_0x4378d8 => !!_0x4378d8);
const _0x5d845f = require("./function/dylib"),
  _0x4f34c8 = require("./function/dylans"),
  _0x51b64b = "11.1.2";
let _0x13b679 = {};
const _0x5d3c5f = process.env.LJD_DELAY ? process.env.LJD_DELAY : "2";
if (process.env.DY_PROXY) try {
  _0x13b679 = require("./function/proxy.js");
  $.dget = _0x13b679.intoRequest($.get.bind($));
  $.dpost = _0x13b679.intoRequest($.post.bind($));
} catch {
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
!(async () => {
  if (!_0x3ded81[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("版本：20240718");
  console.log("LJD_DELAY='5' 每个账号延迟,默认2秒");
  for (let _0x36494a = 0; _0x36494a < _0x3ded81.length; _0x36494a++) {
    if (_0x3ded81[_0x36494a]) {
      $.cookie = _0x3ded81[_0x36494a] + "";
      $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x36494a + 1;
      $.bean = 0;
      $.limit = false;
      iphoneVersion = [Math.ceil(Math.random() * 2 + 12), Math.ceil(Math.random() * 4)];
      UA = "jdapp;iPhone;" + _0x51b64b + ";" + Math.ceil(Math.random() * 2 + 12) + "." + Math.ceil(Math.random() * 4) + ";" + _0x59e76e(40) + ";network/wifi;model/iPhone12,1;addressid/0;appBuild/167802;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS " + iphoneVersion[0] + "_" + iphoneVersion[1] + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
      UUID = _0x59e76e(40);
      console.log("\n*****开始【京东账号" + $.index + "】" + $.UserName + "****\n");
      await _0x3cd972();
      $.limit && _0x13b679.swip && (await _0x13b679.swip(), await _0x3cd972());
      if (_0x13b679.swip) {} else await $.wait(parseInt(Math.random() * 1000 + _0x5d3c5f * 1000, 10));
    }
  }
})().catch(_0x3c0ff7 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3c0ff7 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x3cd972() {
  try {
    await _0x19e38d("signBeanAct");
    await $.wait(500);
  } catch (_0x4c6fb8) {
    console.log(_0x4c6fb8);
  }
}
async function _0x19e38d(_0x27b50d) {
  let _0xc1078f = "",
    _0x4ef7bc = "";
  switch (_0x27b50d) {
    case "beanTaskList":
      _0xc1078f = "{\"viewChannel\":\"AppHome\"}", _0x4ef7bc = await _0x21d28c("beanTaskList", escape(_0xc1078f));
      break;
    case "signBeanAct":
      _0xc1078f = {};
      let _0x1ff4d7 = {
        "appId": "9d49c",
        "functionId": "signBeanAct",
        "body": _0xc1078f,
        "appid": "signed_wh5_ihub",
        "clientVersion": _0x51b64b,
        "client": "apple",
        "user": $.UserName,
        "t": Date.now(),
        "code": 1,
        "xcr": 1,
        "ua": UA
      };
      _0xc1078f = await _0x4f34c8.getbody(_0x1ff4d7), _0x4ef7bc = await _0x21d28c("signBeanAct", _0xc1078f);
      break;
    default:
      console.log("错误" + _0x27b50d);
  }
  if (_0x4ef7bc) return new Promise(async _0x1436b1 => {
    $.dpost(_0x4ef7bc, (_0x1dcf02, _0x5bf9ba, _0xceb23b) => {
      try {
        _0xceb23b.includes("拥挤") && ($.limit = true);
        _0x282ea5(_0x27b50d, _0xceb23b);
      } catch (_0x29b2a5) {
        $.logErr(_0x29b2a5, _0x5bf9ba);
      } finally {
        _0x1436b1();
      }
    });
  });
}
async function _0x282ea5(_0x29a173, _0x5f4b06) {
  try {
    data = JSON.parse(_0x5f4b06);
  } catch (_0x150bad) {
    console.log("返回异常：" + _0x5f4b06);
    return;
  }
  switch (_0x29a173) {
    case "beanTaskList":
      if (data.code == 0 && data.data) console.log("当前等级:" + (data.data.curLevel || 0) + " 下一级可领取:" + (data.data.nextLevelBeanNum || 0) + "京豆"), $.taskList = data.data.taskInfos && data.data.taskInfos || [], $.viewAppHome = data.data.viewAppHome && data.data.viewAppHome || {};else {
        if (data.data && data.data.bizMsg) console.log(data.data.bizMsg);else {
          console.log(_0x5f4b06);
        }
      }
      break;
    case "signBeanAct":
      if (data.code == 0 && data.data) data.data?.["continuityAward"]?.["beanAward"]?.["beanCount"] ? (console.log((data.data.continuityAward.title || 0) + ":" + (data.data.continuityAward.beanAward.beanCount || 0) + "京豆"), $.bean += Number(data.data.continuityAward.beanAward.beanCount) || 0) : data.data?.["dailyAward"] ? (console.log(data.data.dailyAward.title + ("获得:" + (data.data.dailyAward.beanAward.beanCount || 0) + "京豆")), $.bean += Number(data.data.dailyAward.beanAward.beanCount) || 0) : console.log("DEBUG1:" + JSON.stringify(data));else {
        console.log("DEBUG2:" + JSON.stringify(_0x5f4b06));
      }
      break;
    default:
      console.log("未判断的异常" + _0x29a173);
  }
}
async function _0x21d28c(_0x2d8f68, _0x22105b) {
  let _0x49e09b = "https://api.m.jd.com/client.action?" + _0x22105b + "&uuid=" + UUID + "&openudid=" + UUID;
  const _0x318128 = "GET",
    _0x40871d = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Cookie": $.cookie,
      "Referer": "https://pro.m.jd.com/",
      "User-Agent": UA
    };
  return {
    "url": _0x49e09b,
    "method": _0x318128,
    "headers": _0x40871d,
    "ciphers": _0x5d845f.cpstr
  };
}
async function _0x7916ac() {
  let _0xf3746c = {
    "url": "https://nu.jr.jd.com/gw/generic/jrm/h5/m/process",
    "headers": {
      "Cookie": $.cookie
    },
    "body": "reqData=" + encodeURIComponent("{\"actCode\":\"F68B2C3E71\",\"type\":\"3\",\"frontParam\":{\"belong\":\"jingdou\"}}")
  };
  return new Promise(async _0x2cfa98 => {
    $.dpost(_0xf3746c, async (_0x261b7a, _0x3eea47, _0x2716fd) => {
      try {
        if (_0x261b7a) console.log("" + JSON.stringify(_0x261b7a)), console.log(" API请求失败，请检查网路重试");else {
          if (_0x2716fd.match(/"京豆.*"/)) {
            const _0x1048f2 = _0x2716fd.match(/\"count\":\"?(\d.*?)\"?,/)[1];
            console.log("双签成功：" + _0x1048f2 + "京豆");
          } else {
            const _0x10fb93 = _0x2716fd.match(/},\"businessMsg\":\"(\S.*)\",\"c/)[1];
            console.log("金融双签:" + _0x10fb93);
          }
        }
      } catch (_0xda789d) {
        $.logErr(_0xda789d, _0x3eea47);
      } finally {
        _0x2cfa98();
      }
    });
  });
}
function _0xe6c2e5(_0x1e9bfc) {
  if (typeof _0x1e9bfc == "string") try {
    return JSON.parse(_0x1e9bfc);
  } catch (_0x5946a5) {
    return console.log(_0x5946a5), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function _0x59e76e(_0x3f18b4) {
  _0x3f18b4 = _0x3f18b4 || 32;
  let _0xf67531 = "abcdef0123456789",
    _0x751bb5 = _0xf67531.length,
    _0x2dbaf9 = "";
  for (i = 0; i < _0x3f18b4; i++) _0x2dbaf9 += _0xf67531.charAt(Math.floor(Math.random() * _0x751bb5));
  return _0x2dbaf9;
}