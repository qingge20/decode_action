//Mon Dec 16 2024 13:49:33 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const 我尼玛_0x4e93d9 = $.isNode() ? require("./sendNotify") : "",
  我尼玛_0x1843ab = $.isNode() ? require("./jdCookie.js") : "",
  我尼玛_0xac1eba = $.isNode() ? require("jsdom") : "",
  我尼玛_0x27207a = require("./function/dylano"),
  我尼玛_0x297ad9 = require("./USER_AGENTS");
let 我尼玛_0x435d38 = [],
  我尼玛_0x3d9552 = "",
  我尼玛_0x51433d,
  我尼玛_0x56bc8e = "";
if ($.isNode()) {
  var 我尼玛_0x2a1980 = new Buffer.from("64796C616E", "Hex").toString("utf8");
  Object.keys(我尼玛_0x1843ab).forEach(_0x5c822f => {
    我尼玛_0x435d38.push(我尼玛_0x1843ab[_0x5c822f]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  我尼玛_0x435d38 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...我尼玛_0x3bf1a3($.getdata("CookiesJD") || "[]").map(_0x5cc3bc => _0x5cc3bc.cookie)].filter(_0x91dc5d => !!_0x91dc5d);
}
let 我尼玛_0x33dab4 = "",
  我尼玛_0x4b1424 = "";
$.isNode() && process.env.WP_APP_TOKEN_ONE && (我尼玛_0x33dab4 = process.env.WP_APP_TOKEN_ONE);
let 我尼玛_0x17622b = __filename;
const 我尼玛_0x4c3301 = "https://api.m.jd.com/";
!(async () => {
  if (!我尼玛_0x435d38[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n当前版本：20230217");
  console.log("TG频道：https://t.me/dylan_jdpro");
  for (let _0xa4b086 = 0; _0xa4b086 < 我尼玛_0x435d38.length; _0xa4b086++) {
    if (我尼玛_0x435d38[_0xa4b086]) {
      我尼玛_0x3d9552 = 我尼玛_0x435d38[_0xa4b086];
      $.UserName = decodeURIComponent(我尼玛_0x3d9552.match(/pt_pin=([^; ]+)(?=;?)/) && 我尼玛_0x3d9552.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xa4b086 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.token = undefined;
      我尼玛_0x51433d = "";
      $.tryCount = 0;
      我尼玛_0x4b1424 = "";
      $.UA = 我尼玛_0x297ad9.UARAM ? 我尼玛_0x297ad9.UARAM() : 我尼玛_0x297ad9.USER_AGENT;
      await 我尼玛_0x5265ef();
      console.log("\n---------------开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "----------------\n");
      if (!$.isLogin) {
        const _0x55657d = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x55657d);
        $.isNode() && (await 我尼玛_0x4e93d9.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await 我尼玛_0x3c58cb();
      if (我尼玛_0x4b1424 && $.isNode() && 我尼玛_0x33dab4 && 我尼玛_0x17622b.includes(我尼玛_0x2a1980)) {
        try {
          await 我尼玛_0x4e93d9.sendNotifybyWxPucher("一键价保", 我尼玛_0x4b1424, "" + $.UserName);
        } catch (_0x2025be) {
          console.log("\n一对一推送失败，请替换sendnotify文件!!!");
        }
      }
      await 我尼玛_0x2c954d();
      await $.wait(5000);
    }
  }
  if (我尼玛_0x56bc8e) {
    if ($.isNode()) {
      await 我尼玛_0x4e93d9.sendNotify("" + $.name, "" + 我尼玛_0x56bc8e);
    }
  }
})().catch(_0x3a9882 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3a9882 + "!", "");
}).finally(() => {
  $.done();
});
async function 我尼玛_0x2c7fd9() {
  let _0x586ef9 = 0;
  do {
    $.jab && ($.token = $.jab.getToken() || "");
    ($.jab && $.token || !$.jab) && (await 我尼玛_0x3c58cb());
    _0x586ef9++;
  } while (_0x586ef9 < 3 && !$.token && $.jab);
  await 我尼玛_0x2c954d();
}
async function 我尼玛_0x3c58cb() {
  const _0x26af97 = {
    sid: "",
    type: "25",
    forcebot: ""
  };
  const _0x598375 = {
    appId: "d2f64",
    fn: "siteppM_skuOnceApply",
    body: _0x26af97,
    apid: "siteppM",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  let _0x497960 = _0x598375;
  _0x497960 = await 我尼玛_0x27207a.getbody(_0x497960);
  if (!_0x497960) {
    return;
  }
  let _0x2a7c94 = _0x497960.split("h5st")[1],
    _0x640f7b = _0x497960.match(/t=(\d+)&/)[1];
  return new Promise(async _0x3ec78a => {
    $.post(我尼玛_0x214754("siteppM_skuOnceApply", _0x26af97, _0x2a7c94, _0x640f7b), async (_0x282583, _0x37934c, _0xf0e106) => {
      try {
        if (_0x282583) {
          console.log(JSON.stringify(_0x282583));
          console.log("siteppM_skuOnceApply 请求失败，请检查网路重试");
        } else {
          if (我尼玛_0x1dff19(_0xf0e106)) {
            _0xf0e106 = JSON.parse(_0xf0e106);
            if (_0xf0e106.flag) {
              _0xf0e106.succAmount && _0xf0e106.succAmount != 0 ? (console.log("价保成功：回血" + _0xf0e106.succAmount + "元 🤑"), 我尼玛_0x51433d += "价保成功：回血" + _0xf0e106.succAmount + "元 🤑\n", 我尼玛_0x4b1424 = "价保成功，回血" + _0xf0e106.succAmount + "元 🤑\n") : console.log("没有可保价的订单 😂");
            } else {
              console.log("保价失败：" + _0xf0e106.responseMessage);
              if ($.tryCount < 3) {
                console.log("重试 " + ($.tryCount + 1) + "} 次...");
                await $.wait(10000);
                $.tryCount++;
                await 我尼玛_0x3c58cb();
              }
            }
          }
        }
      } catch (_0xb6570e) {
        $.logErr(_0xb6570e, _0x37934c);
      } finally {
        _0x3ec78a(_0xf0e106);
      }
    });
  });
}
function 我尼玛_0x13993e() {
  const _0xee4c1e = {
    sid: "",
    type: "25",
    forcebot: "",
    num: 15
  };
  return new Promise(_0x4790ed => {
    $.post(我尼玛_0x214754("siteppM_appliedSuccAmount", _0xee4c1e), (_0x5d20b9, _0x26d5c9, _0x4b4d07) => {
      try {
        _0x5d20b9 ? (console.log(JSON.stringify(_0x5d20b9)), console.log($.name + " siteppM_appliedSuccAmount API请求失败，请检查网路重试")) : 我尼玛_0x1dff19(_0x4b4d07) && (_0x4b4d07 = JSON.parse(_0x4b4d07), _0x4b4d07.flag ? (console.log("保价成功：返还" + _0x4b4d07.succAmount + "元"), 我尼玛_0x51433d += "保价成功：返还" + _0x4b4d07.succAmount + "元\n") : console.log("保价失败：没有可保价的订单"));
      } catch (_0x4081c2) {
        $.logErr(_0x4081c2, _0x26d5c9);
      } finally {
        _0x4790ed(_0x4b4d07);
      }
    });
  });
}
async function 我尼玛_0x5472d3() {
  if ($.signWaap) {
    return;
  }
  const {
      JSDOM: _0x3857c0
    } = 我尼玛_0xac1eba,
    _0x5c7589 = {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      referrer: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
    };
  let _0x5732c5 = new 我尼玛_0xac1eba.ResourceLoader(_0x5c7589),
    _0x48d076 = new 我尼玛_0xac1eba.VirtualConsole();
  const _0x37e602 = {
    url: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    referrer: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    runScripts: "dangerously",
    resources: _0x5732c5,
    includeNodeLocations: true,
    storageQuota: 10000000,
    pretendToBeVisual: true,
    virtualConsole: _0x48d076
  };
  const _0x263d5d = new _0x3857c0("<body>\n  <script src=\"https:////static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n  <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.0.js\"></script>\n  <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n  <script src=\"https://js-nocaptcha.jd.com/statics/js/main.min.js\"></script>\n  </body>", _0x37e602);
  let _0x1041fb = 0;
  do {
    _0x1041fb += 1;
    await $.wait(1000);
    try {
      if (_0x263d5d.window.JAB) {
        const _0x474dd3 = {
          bizId: "jdjiabao",
          initCaptcha: false
        };
        $.jab = new _0x263d5d.window.JAB(_0x474dd3);
      } else {
        $.jab = undefined;
      }
      $.signWaap = _0x263d5d.window.signWaap;
    } catch (_0x46d6cb) {}
  } while (!$.signWaap && _0x1041fb < 4);
}
function 我尼玛_0x36a650(_0x993232) {
  return new Promise(_0x2447f0 => {
    const _0x7f9e9d = {
      url: _0x993232,
      timeout: 10000
    };
    $.get(_0x7f9e9d, async (_0xef2b0, _0x4b58e2, _0x2449e1) => {
      let _0x184fc5 = null;
      try {
        if (_0xef2b0) {
          console.log("⚠️网络请求失败");
        } else {
          _0x184fc5 = _0x2449e1;
        }
      } catch (_0xaa0b8f) {
        $.logErr(_0xaa0b8f, _0x4b58e2);
      } finally {
        _0x2447f0(_0x184fc5);
      }
    });
  });
}
function 我尼玛_0x2c954d() {
  return new Promise(_0x3265d5 => {
    我尼玛_0x51433d && (我尼玛_0x56bc8e += "【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n" + 我尼玛_0x51433d + ($.index !== 我尼玛_0x435d38.length ? "\n\n" : "\n\n"));
    _0x3265d5();
  });
}
function 我尼玛_0x214754(_0x199035, _0x430cec, _0x2a7dee = "", _0x5df97f = Date.now()) {
  const _0xa43593 = {
    Host: "api.m.jd.com",
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "https://msitepp-fm.jd.com",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "User-Agent": $.UA,
    Referer: "https://msitepp-fm.jd.com/",
    "Accept-Encoding": "gzip, deflate, br",
    Cookie: 我尼玛_0x3d9552
  };
  return {
    url: 我尼玛_0x4c3301 + "api?appid=siteppM&functionId=" + _0x199035 + "&forcebot=&t=" + _0x5df97f,
    body: "body=" + encodeURIComponent(JSON.stringify(_0x430cec)) + "&h5st" + _0x2a7dee,
    headers: _0xa43593
  };
}
function 我尼玛_0x5265ef() {
  return new Promise(_0x482135 => {
    const _0x4b72ba = {
      Cookie: 我尼玛_0x3d9552,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x55258e = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x4b72ba,
      timeout: 10000
    };
    $.get(_0x55258e, (_0xa2554f, _0x562686, _0x16f61b) => {
      try {
        if (_0x16f61b) {
          _0x16f61b = JSON.parse(_0x16f61b);
          if (!(_0x16f61b.islogin === "1")) {
            _0x16f61b.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x39f7f4) {
        console.log(_0x39f7f4);
      } finally {
        _0x482135();
      }
    });
  });
}
function 我尼玛_0x1dff19(_0x3897b0) {
  try {
    if (typeof JSON.parse(_0x3897b0) == "object") {
      return true;
    }
  } catch (_0x89ec28) {
    console.log(_0x89ec28);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function 我尼玛_0x3bf1a3(_0x59f98c) {
  if (typeof _0x59f98c == "string") {
    try {
      return JSON.parse(_0x59f98c);
    } catch (_0x5b98b) {
      console.log(_0x5b98b);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}