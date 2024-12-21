//Sat Dec 21 2024 13:57:11 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x2382b4 = $.isNode() ? require("./jdCookie.js") : "",
  _0xd98d2a = $.isNode() ? require("./sendNotify") : "",
  _0x390098 = $.isNode() ? require("jsdom") : "";
const _0x54a5fc = require("./function/dylib");
let _0xe3b2d6 = [],
  _0x897963 = "",
  _0x1adb83 = 0,
  _0x10a7e2 = {};
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    _0x10a7e2 = require("./function/proxy.js");
    $.dget = _0x10a7e2.intoRequest($.get.bind($));
    $.dpost = _0x10a7e2.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
if ($.isNode()) {
  Object.keys(_0x2382b4).forEach(_0x35036b => {
    _0xe3b2d6.push(_0x2382b4[_0x35036b]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0xe3b2d6 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x5c9662 => _0x5c9662.cookie)].filter(_0x5e3e5c => !!_0x5e3e5c);
}
let _0x3d7148 = process.env.FISH_CODE || "",
  _0x33e852 = {};
!(async () => {
  if (!_0xe3b2d6[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前版本：202408023");
  console.log("问题建议：https://t.me/dylan_jdpro");
  console.log("FISH_CODE 默认前两个车头，指定助力码，多个&分割");
  _0x3d7148 != "" && console.log("\n指定助力模式 " + _0x3d7148);
  for (let _0x41b5ca = 0; _0x41b5ca < _0xe3b2d6.length; _0x41b5ca++) {
    _0x897963 = _0xe3b2d6[_0x41b5ca];
    originCookie = _0xe3b2d6[_0x41b5ca];
    if (_0x897963) {
      $.UserName = decodeURIComponent(_0x897963.match(/pt_pin=([^; ]+)(?=;?)/) && _0x897963.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x41b5ca + 1;
      $.hotFlag = false;
      $.nickName = "";
      $.isLogin = true;
      $.outFlag = false;
      $.isban = false;
      $.hasRisk = false;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      _0x28ee88();
      await _0x1871c3();
      if (!$.isLogin) {
        const _0x50137b = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x50137b);
        if ($.isNode()) {
          await _0xd98d2a.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await _0x448ed0();
      if ($.index % 5 == 0) {
        _0x10a7e2.swip && (await _0x10a7e2.swip());
      }
      if ($.sucnum >= 10) {
        console.log("助力次数已满");
        break;
      }
      if ($.outFlag) {
        break;
      }
    }
  }
})().catch(_0x3bf128 => {
  return $.logErr(_0x3bf128);
}).finally(() => {
  return $.done();
});
async function _0x448ed0() {
  try {
    $.inviteCode = "";
    $.finishHelpNum = 0;
    $.getid = {};
    await _0x3845e9();
    JSON.stringify($.getid) == "{}" && ($.getid.jstub = "BW6T4437AB2RMXKMPMWZOV3PBU6KWRQV2GIOLTKZKUEYGJ44RCKTUZXGZQ7N553SU4HPEDYDHP7B6SWDOVCGYDKRQTC3NGZC2OCTQ5Q", $.getid.sdkToken = "", $.getid.token = "4NZZKHI4EJTZ5OP4Y7S7B4WZBA243SHJSMLKFKPWIX4G27GYSEZU2XJKGBOQERJIDIIWEUF7ILI2M");
    $.getid.fp = _0x54a5fc.uuid(32);
    if (_0x3d7148 == "") {
      if ($.index <= 2) {
        await _0x1c0d02("queryInviterHelpInfo");
        $.inviteCode == "" && console.log("获取助力码失败，结束");
        console.log("已有助力次数 " + $.finishHelpNum);
        if ($.finishHelpNum < 10) {
          console.log("入列助力码 => " + $.inviteCode + "\n");
          _0x33e852[$.inviteCode] = {};
          _0x33e852[$.inviteCode].num = $.finishHelpNum;
          _0x33e852[$.inviteCode].full = false;
        }
      }
    } else {
      _0x3d7148 = _0x3d7148.split("&");
      _0x3d7148.forEach((_0x35b53e, _0x1e3c8a) => {
        const _0x4596ac = {
          num: 0,
          full: 0
        };
        _0x33e852[_0x35b53e] = _0x4596ac;
      });
    }
    let _0x487e8b = Object.keys(_0x33e852).slice(0, 2);
    for (let _0x33b023 of _0x487e8b) {
      $.inviteCode = _0x33b023;
      console.log("去助力 => " + $.inviteCode);
      await _0x1c0d02("completeFissionHelp4JKL");
      await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
    }
    await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
  } catch (_0x15b91b) {
    console.log(_0x15b91b);
  }
}
async function _0x1c0d02(_0x161f57) {
  if ($.outFlag || $.isban) {
    return;
  }
  const _0x4c3759 = {
    eid: $.getid.eid,
    fp: $.getid.fp,
    sdkToken: "",
    token: $.getid.token,
    jstub: $.getid.jstub,
    os: "android",
    osv: "12"
  };
  let _0x4ed382 = "",
    _0x15885a,
    _0x4c5fee,
    _0x534f5f = "post",
    _0x1f8325 = "https://ms.jr.jd.com/gw2/generic/mkWeapons/h5/m/" + _0x161f57 + "?_t=" + Date.now();
  switch (_0x161f57) {
    case "queryInviterHelpInfo":
      _0x4ed382 = "reqData={\"clientType\":\"jdjr\",\"clientVersion\":\"6.9.02\",\"deviceInfo\":\"" + JSON.stringify(_0x4c3759);
      break;
    case "completeFissionHelp4JKL":
      let _0x2e8f0e = $.ar2.nonce(),
        _0x35d24a = {
          clientType: "jdjr",
          clientVersion: "6.9.02",
          fissionCode: "20230816150Q0dyd",
          inviteCode: $.inviteCode,
          deviceInfo: JSON.stringify(_0x4c3759)
        },
        _0x228182 = $.ar2.sign(JSON.stringify(_0x35d24a), _0x2e8f0e);
      _0x4ed382 = "reqData=" + JSON.stringify({
        signData: JSON.stringify(_0x35d24a),
        nonce: _0x2e8f0e,
        signature: _0x228182,
        clientType: "jdjr",
        clientVersion: "6.9.02",
        fissionCode: "20230816150Q0dyd",
        inviteCode: $.inviteCode,
        deviceInfo: JSON.stringify(_0x4c3759)
      });
      break;
    case "jx_party_do_task":
      const _0xc6e26 = {
        itemId: $.itemId,
        actionType: 0,
        taskType: 1,
        assignmentId: $.assignmentId,
        extraType: $.extraType
      };
      _0x4ed382 = _0xc6e26;
      _0x15885a = "a525b";
      _0x4c5fee = "jx_party_do_task";
      break;
    default:
      console.log("错误" + _0x161f57);
  }
  let _0x560c3d = _0x29b10b(_0x1f8325, _0x4ed382);
  return new Promise(async _0xd9741e => {
    $["d" + _0x534f5f](_0x560c3d, async (_0x162eb3, _0x50cd6c, _0x1b65ac) => {
      try {
        if (_0x162eb3) {
          if (_0x50cd6c && typeof _0x50cd6c.statusCode != "undefined") {
            if (_0x50cd6c.statusCode == 493) {
              if (_0x1adb83 < 6) {
                _0x1adb83++;
                await _0x1c0d02(_0x161f57);
                return;
              }
              console.log("ip可能被限制，过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(_0x162eb3, _0x162eb3));
        } else {
          if (_0x1b65ac.includes("doctype") && _0x1adb83 < 6) {
            _0x1adb83++;
            await _0x1c0d02(_0x161f57);
            return;
          }
          _0x1adb83 = 0;
          _0x1ac0d1(_0x161f57, _0x1b65ac);
        }
      } catch (_0xb0499e) {
        console.log(_0xb0499e, _0x50cd6c);
      } finally {
        _0xd9741e();
      }
    });
  });
}
switch ($.type) {
  case "nb":
    const _0x432bf9 = {
      nb: nb
    };
    _0xf1f6le = _0x432bf9;
    break;
}
async function _0x1ac0d1(_0x389cf9, _0xbd2175) {
  let _0x50d622 = "";
  try {
    _0x50d622 = JSON.parse(_0xbd2175);
  } catch (_0x4cbb90) {
    console.log(_0x389cf9 + " 执行任务异常");
  }
  try {
    switch (_0x389cf9) {
      case "queryInviterHelpInfo":
        _0x50d622.success ? _0x50d622.resultData.code == "0000" ? ($.inviteCode = _0x50d622.resultData.data.inviteCode, $.finishHelpNum = _0x50d622.resultData.data.finishHelpNum || 0) : console.log(_0x50d622.resultData.message) : console.log(_0x50d622.resultMsg);
        break;
      case "completeFissionHelp4JKL":
        if (_0x50d622.success) {
          if (_0x50d622.resultData.code == "0000") {
            console.log("   助力成功 " + ++_0x33e852[$.inviteCode].num);
            _0x33e852[$.inviteCode] >= 10 && delete _0x33e852[$.inviteCode];
          } else {
            if (_0x50d622.resultData.code == "0010") {
              console.log("   已助力过TA");
            } else {
              if (_0x50d622.resultData.code == "0011") {
                console.log("   今日已无助力次数！");
              } else {
                if (_0x50d622.resultData.code == "0008") {
                  console.log("   助力目标被风控，请确认！");
                } else {
                  if (_0x50d622.resultData.message.includes("上限")) {
                    console.log("   目标已达到日邀上限");
                    delete _0x33e852[$.inviteCode];
                  } else {
                    console.log(_0x50d622.resultData.code, _0x50d622.resultData.message);
                  }
                }
              }
            }
          }
        } else {
          console.log(_0x50d622.resultMsg);
        }
        break;
      case "bSignInHome":
        if (_0x50d622.success) {
          console.log("当前签到金：" + _0x50d622.data.signInCoin);
          $.signflag = _0x50d622.data.signInFlag;
        }
        break;
      case "apTaskDrawAward":
        if (_0x50d622.success) {
          for (let _0xd17aa3 of _0x50d622.data) {
            console.log("获得" + _0xd17aa3.awardGivenNumber + "签到金 💰️");
          }
        } else {
          console.log(_0x50d622.errMsg);
        }
        break;
      case "apStartTaskTime":
      case "apDoLimitTimeTask":
        break;
      default:
        console.log(_0x389cf9 + " -> " + _0xbd2175);
    }
    typeof _0x50d622 == "object" && _0x50d622.errorMessage && _0x50d622.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x15e044) {
    console.log(_0x389cf9 + " " + _0x15e044);
  }
}
function _0x1198da(_0x5ec404) {
  let _0xb2b8af = "";
  try {
    for (var _0xe8be1 = 0; _0xe8be1 < _0x5ec404; _0xe8be1++) {
      _0xb2b8af += "123456789abcdef".charAt(Math.floor(62 * Math.random()));
    }
  } catch (_0x1fba3) {}
  return _0xb2b8af;
}
function _0x29b10b(_0x9f1d31, _0x30401f) {
  const _0x3c7017 = {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "https://u.jr.jd.com",
    Referer: "https://u.jr.jd.com/",
    Cookie: _0x897963,
    "User-Agent": $.UA
  };
  const _0x44e65e = {
    url: _0x9f1d31,
    headers: _0x3c7017,
    timeout: 30000,
    ...(_0x30401f ? {
      body: _0x30401f
    } : {})
  };
  return _0x44e65e;
}
async function _0x28ee88() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x367295(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x367295(_0x23aed8) {
  _0x23aed8 = _0x23aed8 || 32;
  let _0xedc420 = "abcdef0123456789",
    _0x10439c = _0xedc420.length,
    _0x49c41b = "";
  for (i = 0; i < _0x23aed8; i++) {
    _0x49c41b += _0xedc420.charAt(Math.floor(Math.random() * _0x10439c));
  }
  return _0x49c41b;
}
function _0x230c22(_0x1dad75) {
  if (typeof _0x1dad75 == "string") {
    try {
      return JSON.parse(_0x1dad75);
    } catch (_0x5dd3ab) {
      console.log(_0x5dd3ab);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function _0x19918f() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x55ef51 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    let _0x17287e = {
      venderId: "" + $.joinVenderId + "",
      shopId: "" + $.joinVenderId + "",
      bindByVerifyCodeFlag: 1,
      registerExtend: {},
      writeChildFlag: 0,
      channel: 406
    };
    $.shopactivityId == "" && delete _0x17287e.activityId;
    const _0x2a9765 = {
      appId: "27004",
      fn: "bindWithVender",
      body: _0x17287e,
      apid: "shopmember_m_jd_com",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: $.UA
    };
    _0x17287e = await dyy.getbody(_0x2a9765);
    const _0x37734a = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: _0x897963,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": $.UA
    };
    const _0x459935 = {
      url: "https://api.m.jd.com/client.action?" + _0x17287e + "&uuid=88888",
      headers: _0x37734a,
      timeout: 30000
    };
    $.dget(_0x459935, async (_0x8f5fb2, _0xb005b1, _0x4846cc) => {
      try {
        _0x4846cc = _0x4846cc && _0x4846cc.match(/jsonp_.*?\((.*?)\);/) && _0x4846cc.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4846cc;
        let _0x580cdb = $.toObj(_0x4846cc, _0x4846cc);
        if (_0x580cdb && typeof _0x580cdb == "object") {
          if (_0x580cdb && _0x580cdb.success === true) {
            console.log("    " + _0x580cdb.message);
            $.errorJoinShop = _0x580cdb.message;
            if (_0x580cdb.result && _0x580cdb.result.giftInfo) {
              for (let _0x217b6b of _0x580cdb.result.giftInfo.giftList) {
                console.log("入会获得:" + _0x217b6b.discountString + _0x217b6b.prizeName + _0x217b6b.secondLineDesc);
              }
            }
          } else {
            _0x580cdb && typeof _0x580cdb == "object" && _0x580cdb.message ? ($.errorJoinShop = _0x580cdb.message, console.log("" + (_0x580cdb.message || ""))) : console.log(_0x4846cc);
          }
        } else {
          console.log(_0x4846cc);
        }
      } catch (_0x39731d) {
        $.logErr(_0x39731d, _0xb005b1);
      } finally {
        _0x55ef51();
      }
    });
  });
}
async function _0x27bb79() {
  return new Promise(async _0x4911de => {
    const _0x1f98d1 = {
      venderId: $.joinVenderId,
      payUpShop: true,
      queryVersion: "10.5.2",
      appid: "ef79a",
      needSecurity: true,
      bizId: "shop_view_app",
      channel: 406
    };
    let _0x59c0ee = _0x1f98d1;
    const _0x23c435 = {
      appId: "ef79a",
      fn: "getShopOpenCardInfo",
      body: _0x59c0ee,
      apid: "jd_shop_member",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    _0x59c0ee = await dyy.getbody(_0x23c435);
    const _0x365ccc = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: _0x897963,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    const _0x1499c5 = {
      url: "https://api.m.jd.com/client.action?" + _0x59c0ee + "&uuid=88888",
      headers: _0x365ccc,
      timeout: 60000
    };
    $.get(_0x1499c5, async (_0x4a58b0, _0x17c2a3, _0xa4539c) => {
      try {
        _0xa4539c = _0xa4539c && _0xa4539c.match(/jsonp_.*?\((.*?)\);/) && _0xa4539c.match(/jsonp_.*?\((.*?)\);/)[1] || _0xa4539c;
        let _0x5c3c97 = $.toObj(_0xa4539c, _0xa4539c);
        if (_0x5c3c97 && typeof _0x5c3c97 == "object") {
          _0x5c3c97 && _0x5c3c97.success == true && (console.log("去加入 -> " + (_0x5c3c97.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x5c3c97.result[0].interestsRuleList && _0x5c3c97.result[0].interestsRuleList[0] && _0x5c3c97.result[0].interestsRuleList[0].interestsInfo && _0x5c3c97.result[0].interestsRuleList[0].interestsInfo.activityId || "");
        } else {
          console.log(_0xa4539c);
        }
      } catch (_0x234b93) {
        $.logErr(_0x234b93, _0x17c2a3);
      } finally {
        _0x4911de();
      }
    });
  });
}
function _0x476708(_0x41f452, _0x201cb4) {
  return Math.floor(Math.random() * (_0x201cb4 - _0x41f452)) + _0x41f452;
}
function _0x5f0644(_0x1c6b3b = +new Date()) {
  var _0x14b16b = new Date(_0x1c6b3b + 28800000);
  return _0x14b16b.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}
async function _0x3845e9() {
  const {
    JSDOM: _0x5ca2a3
  } = _0x390098;
  let _0x5999f0 = new _0x390098.ResourceLoader({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      referer: "https://u.jr.jd.com/"
    }),
    _0x555634 = new _0x390098.VirtualConsole();
  const _0x58a57c = {
    url: "https://u.jr.jd.com/uc-fe-wxgrowing/18-quan-yi-day/index.html",
    referer: "https://u.jr.jd.com/",
    userAgent: "Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.2.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.2.301 Mobile Safari/537.36",
    runScripts: "dangerously",
    resources: _0x5999f0,
    includeNodeLocations: true,
    storageQuota: 10000000,
    pretendToBeVisual: true,
    virtualConsole: _0x555634
  };
  const _0x2fa5c6 = new _0x5ca2a3("<body>\n  <script src=\"https://jrsecstatic.jdpay.com/jr-sec-dev-static/aar2.min.js\"></script>\n  <script src=\"https://m.jr.jd.com/common/jssdk/jrbridge/2.0.9/jrbridge.js\"></script>\n  <script src=\"https://jrsecstatic.jdpay.com/jr-sec-dev-static/cryptico.min.js\"></script>\n  <script src=\"//gia.jd.com/m.html\"></script>\n  <script src=\"//gias.jd.com/js/m.js\"></script>\n  </body>", _0x58a57c);
  await $.wait(1500);
  try {
    $.getid = _0x2fa5c6.window.getJdEid();
    _0x2fa5c6.window.AAR2.init();
    $.ar2 = new _0x2fa5c6.window.AAR2();
    $.cry = _0x2fa5c6.window.cryptico;
  } catch (_0x539abb) {
    $.log("\n请求失败，换个时间再试试！！！");
    process.exit(11);
  }
}
function _0x1871c3() {
  return new Promise(_0xf1ccec => {
    const _0x349357 = {
      Cookie: _0x897963,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x37cc71 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x349357,
      timeout: 10000
    };
    $.get(_0x37cc71, (_0x5c78e0, _0x5119cb, _0x562dd7) => {
      try {
        if (_0x562dd7) {
          _0x562dd7 = JSON.parse(_0x562dd7);
          if (!(_0x562dd7.islogin === "1")) {
            _0x562dd7.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x37afbd) {
        console.log(_0x37afbd);
      } finally {
        _0xf1ccec();
      }
    });
  });
}