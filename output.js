//Tue Sep 24 2024 15:11:28 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let _0x2bfb75 = true,
  _0x51dd75 = [],
  _0x2e5723 = "",
  _0x501c90,
  _0x2d659d = [],
  _0x4e17c2 = [],
  _0x1866a7 = [];
const _0x408f74 = require("fs"),
  _0x4ca228 = require("./function/dylans"),
  _0xe85a22 = "https://api.m.jd.com/client.action",
  _0x4d94e9 = process.env.BEAN_DELAY ? process.env.BEAN_DELAY * 1 : 2000;
$.reqnum = 1;
!(async () => {
  await _0x308854();
  if (!_0x51dd75[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("版本：20240819");
  console.log("BEANCODES 指定助力变量，多个&分割");
  for (let _0x3788e7 = 0; _0x3788e7 < _0x51dd75.length; _0x3788e7++) {
    if (_0x51dd75[_0x3788e7]) {
      _0x2e5723 = _0x51dd75[_0x3788e7];
      $.UserName = decodeURIComponent(_0x2e5723.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2e5723.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x3788e7 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = require("./USER_AGENTS").UARAM();
      console.log("\n----------------开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "-----------------\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x501c90.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0xfe39e8();
      if (_0x2d659d.length == 0) {
        $.log("没有助力码,先执行种豆得豆任务在跑助力");
        return;
      }
      await _0x1be5b4();
      await $.wait(1000);
    }
  }
})().catch(_0x59ebd3 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x59ebd3 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x1be5b4() {
  let _0xc84d66 = 0;
  for (let _0x11e262 of _0x2d659d) {
    if (_0xc84d66 >= 3) break;
    console.log("\n开始助力好友: " + _0x11e262);
    if (!_0x11e262) continue;
    if (_0x11e262 === $.myPlantUuid) {
      console.log("\n跳过自己的plantUuid\n");
      continue;
    }
    await _0x38cf15(_0x11e262);
    if ($.helpResult && $.helpResult.code === "0") {
      if ($.helpResult.data?.["helpShareRes"]) {
        if ($.helpResult.data.helpShareRes.state === "1") console.log("助力成功"), console.log("" + $.helpResult.data.helpShareRes.promptText), _0xc84d66++;else {
          if ($.helpResult.data.helpShareRes.state === "2") {
            console.log("今日助力机会已耗尽，不能再帮助好友助力了");
            break;
          } else {
            if ($.helpResult.data.helpShareRes.state === "3") console.log("该好友今日已满助力,明天再来为Ta助力吧"), _0x1866a7.push(_0x11e262);else $.helpResult.data.helpShareRes.state === "4" ? (console.log("" + $.helpResult.data.helpShareRes.promptText), _0xc84d66++) : console.log("助力其他情况：" + JSON.stringify($.helpResult.data.helpShareRes));
          }
        }
      } else {
        if ($.helpResult.errorCode) {
          console.log(JSON.stringify($.helpResult));
          break;
        }
      }
    } else console.log("助力失败: " + JSON.stringify($.helpResult));
    await $.wait(2000);
  }
}
function _0x1ea4d2() {
  $.log("\n" + message + "\n");
  _0x2bfb75 = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : _0x2bfb75;
  (!_0x2bfb75 || _0x2bfb75 === "false") && $.msg($.name, subTitle, message);
}
async function _0x59abba() {
  $.shareSupportList = await _0x4fa21d("plantShareSupportList", {
    "roundId": ""
  });
  if ($.shareSupportList && $.shareSupportList.code === "0") {
    const {
        data: _0x5cf524
      } = $.shareSupportList,
      _0x11ea1b = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
      _0x25d209 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
    let _0x46fff9 = [];
    _0x5cf524.map(_0xd08996 => {
      _0x11ea1b <= _0xd08996.createTime && _0xd08996.createTime < _0x25d209 && _0x46fff9.push(_0xd08996);
    });
    message += "【助力您的好友】共" + _0x46fff9.length + "人";
  } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}
async function _0x38cf15(_0x2ad59c) {
  const _0x3882e2 = {
    "plantUuid": _0x2ad59c
  };
  $.helpResult = await _0x5689c9("plantBeanIndex", _0x3882e2);
}
function _0xfe39e8() {
  return new Promise(async _0x1c548d => {
    if ($.shareCodesArr.length != 0) {
      if (_0x2d659d[$.index - 1]) {
        _0x2d659d = $.shareCodesArr[$.index - 1].split("@");
      } else {
        const _0x52d763 = $.index > _0x4e17c2.length ? _0x4e17c2.length - 1 : $.index - 1;
        _0x2d659d = _0x4e17c2[_0x52d763].split("@");
      }
    }
    _0x2d659d = _0x2d659d.filter(_0x3969db => _0x1866a7.indexOf(_0x3969db) == -1 && !!_0x3969db);
    console.log("您提供了" + _0x2d659d.length + "个助力码\n");
    console.log("将要助力的好友" + JSON.stringify(_0x2d659d));
    _0x1c548d();
  });
}
function _0x308854() {
  return new Promise(_0x364a20 => {
    console.log("开始获取配置文件...\n");
    _0x501c90 = $.isNode() ? require("./sendNotify") : "";
    const _0x3d39cb = $.isNode() ? require("./jdCookie.js") : "";
    if (process.env.DY_PROXY) {
      const _0x4ba191 = require("./function/proxy.js");
      $.get = _0x4ba191.intoRequest($.get.bind($));
      $.post = _0x4ba191.intoRequest($.post.bind($));
    }
    $.shareCodesArr = [];
    if ($.isNode()) {
      if (process.env.BEANCODES) {
        _0x2d659d = process.env.BEANCODES.split("&");
      } else {
        if (process.env.PLANT_BEAN_SHARECODES) {
          if (process.env.PLANT_BEAN_SHARECODES.indexOf("\n") > -1) {
            _0x4e17c2 = process.env.PLANT_BEAN_SHARECODES.split("\n");
          } else _0x4e17c2 = process.env.PLANT_BEAN_SHARECODES.split("&");
        }
      }
    }
    if ($.isNode()) {
      Object.keys(_0x3d39cb).forEach(_0x42595e => {
        _0x3d39cb[_0x42595e] && _0x51dd75.push(_0x3d39cb[_0x42595e]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else _0x51dd75 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonFormat($.getdata("CookiesJD") || "[]").map(_0x1dde21 => _0x1dde21.cookie)].filter(_0x97369e => !!_0x97369e);
    if ($.isNode()) Object.keys(_0x4e17c2).forEach(_0x284ab9 => {
      _0x4e17c2[_0x284ab9] && $.shareCodesArr.push(_0x4e17c2[_0x284ab9]);
    });else {
      if ($.getdata("jd_fruit_inviter")) $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x3c7b81 => !!_0x3c7b81);
      console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
    }
    let _0x23bd1 = _0x408f74.existsSync("./bean_helpcode");
    if (process.env.PLANT_BEAN_SHARECODES) $.log("使用日志搜集的助力码\n");else {
      if (process.env.BEANCODES) $.log("使用变量指定的助力码\n");else {
        if (_0x4e17c2.length == 0 && _0x23bd1) $.log("使用本地缓存的助力码\n"), _0x2d659d = _0x408f74.readFileSync("./bean_helpcode", "utf-8"), _0x2d659d = JSON.parse(_0x2d659d);else {
          $.log("没有检测到任何助力码！！！\n");
        }
      }
    }
    _0x364a20();
  });
}
function _0x4fa21d(_0x28d1ac, _0x1bb2b9 = {}) {
  return !_0x1bb2b9.version && (_0x1bb2b9.version = "9.2.4.2"), _0x1bb2b9.monitor_source = "plant_app_plant_index", _0x1bb2b9.monitor_refer = "", new Promise(async _0x20bbfe => {
    await $.wait(2000);
    const _0x177028 = {
      "url": _0xe85a22 + "?functionId=" + _0x28d1ac + "&body=" + escape(JSON.stringify(_0x1bb2b9)) + "&appid=ld",
      "headers": {
        "Cookie": _0x2e5723,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 20000
    };
    $.get(_0x177028, (_0x3aac22, _0x2fb00c, _0x20857d) => {
      try {
        _0x3aac22 ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(_0x3aac22)) : _0x20857d = JSON.parse(_0x20857d);
      } catch (_0x10d861) {
        $.logErr(_0x10d861, _0x2fb00c);
      } finally {
        _0x20bbfe(_0x20857d);
      }
    });
  });
}
function _0x3bb83a() {
  return new Promise(_0x4e012f => {
    const _0x3f9d53 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x2e5723,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x3f9d53, (_0x8571ab, _0x8d98fd, _0x1d5a3a) => {
      try {
        if (_0x1d5a3a) {
          _0x1d5a3a = JSON.parse(_0x1d5a3a);
          if (_0x1d5a3a.islogin === "1") {} else _0x1d5a3a.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x54dda4) {
        console.log(_0x54dda4);
      } finally {
        _0x4e012f();
      }
    });
  });
}
async function _0x5689c9(_0x5540f4, _0x38f42c = {}, _0x1ccb31 = 0) {
  $.reqnum % 5 == 0 && (console.log("\n等待" + _0x4d94e9 / 1000 + "秒......\n"), _0x1ccb31 = _0x4d94e9);
  $.reqnum++;
  _0x38f42c.version = "9.2.4.3";
  _0x38f42c.monitor_source = "plant_m_plant_index";
  let _0xd2dfed = {
      "appId": "d246a",
      "functionId": "plantBeanIndex",
      "body": _0x38f42c,
      "appid": "signed_wh5",
      "clientVersion": $.UA.split(";")[2],
      "client": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    },
    _0x508c5d = await _0x4ca228.getbody(_0xd2dfed),
    _0x3f9c99 = _0xe85a22 + "?" + _0x508c5d;
  return await $.wait(_0x1ccb31), new Promise(async _0x256bc8 => {
    $.get(_0x328f66(_0x3f9c99), (_0x381140, _0x29ce4b, _0x283910) => {
      try {
        if (_0x381140) console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log("function_id:" + _0x5540f4), $.logErr(_0x381140);else _0x283910.indexOf("data") > -1 ? _0x283910 = JSON.parse(_0x283910) : (_0x283910 = JSON.parse(_0x283910), console.log(_0x283910.errorMessage));
      } catch (_0x45a727) {
        $.logErr(_0x45a727, _0x29ce4b);
      } finally {
        _0x256bc8(_0x283910);
      }
    });
  });
}
function _0x328f66(_0x5142f5) {
  return {
    "url": _0x5142f5,
    "headers": {
      "Cookie": _0x2e5723,
      "Accept": "*/*",
      "User-Agent": $.UA,
      "Referer": "https://plantearth.m.jd.com/plantBean/index",
      "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 20000
  };
}
function _0xf3f68b(_0x4b464d, _0x2275c2) {
  const _0x395a9b = new RegExp("(^|&)" + _0x2275c2 + "=([^&]*)(&|$)", "i"),
    _0x522629 = _0x4b464d.match(_0x395a9b);
  if (_0x522629 != null) return unescape(_0x522629[2]);
  return null;
}
function _0x5a0982() {
  getstr = function (_0x1d1199) {
    let _0x517e13 = "",
      _0x5817c4 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let _0x391a72 = 0; _0x391a72 < _0x1d1199; _0x391a72++) {
      let _0x2a5034 = Math.round(Math.random() * (_0x5817c4.length - 1));
      _0x517e13 += _0x5817c4.substring(_0x2a5034, _0x2a5034 + 1);
    }
    return _0x517e13;
  };
  let _0x5d55e2 = Buffer.from(getstr(16), "utf8").toString("base64"),
    _0x644d8f = getstr(48);
  return ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": Date.now(),
    "ridx": -1,
    "cipher": {
      "sv": "EG==",
      "ad": _0x5d55e2,
      "od": _0x644d8f,
      "ov": "Ctq=",
      "ud": _0x5d55e2
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jingdong.app.mall"
  })), "jdapp;android;11.2.0;;;appBuild/98413;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046033 Mobile Safari/537.36";
}
function _0x49b8c1(_0x936c56) {
  if (typeof _0x936c56 == "string") try {
    return JSON.parse(_0x936c56);
  } catch (_0x42e87e) {
    return console.log(_0x42e87e), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}