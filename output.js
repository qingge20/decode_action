//Sun Sep 15 2024 16:43:45 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x412daa = $.isNode() ? require("./jdCookie.js") : "",
  _0x250849 = $.isNode() ? require("./sendNotify") : "",
  _0x3de244 = require("./function/dylans"),
  _0x19fc6b = require("fs");
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
let _0x5dd29a = [],
  _0x2149cb = "",
  _0x1da92c = [],
  _0x10eaf7 = [];
if ($.isNode()) {
  Object.keys(_0x412daa).forEach(_0x1e1d0a => {
    _0x5dd29a.push(_0x412daa[_0x1e1d0a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x5dd29a = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x236500 => _0x236500.cookie)].filter(_0x5c06d6 => !!_0x5c06d6);
}
!(async () => {
  if (!_0x5dd29a[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前版本：20240905");
  console.log("问题建议：https://t.me/dylan_jdpro");
  console.log("\nTips:助力后在执行新农场任务领取助力奖励！！！");
  await _0x2bd770();
  await _0x430768(_0x5dd29a.length);
  await _0x218564();
})().catch(_0x40dcf8 => {
  return $.logErr(_0x40dcf8);
}).finally(() => {
  return $.done();
});
async function _0x218564() {
  try {
    let _0x35d783 = 0;
    for (let _0x30728a of _0x10eaf7) {
      $.sucnum = 0;
      console.log("\n去助力 " + _0x30728a);
      for (let _0x574d96 = _0x35d783; _0x574d96 < _0x5dd29a.length; _0x574d96++) {
        _0x2149cb = _0x5dd29a[_0x574d96];
        if (_0x2149cb) {
          $.UserName = decodeURIComponent(_0x2149cb.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2149cb.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
          $.index = _0x574d96 + 1;
          $.hotFlag = false;
          $.nickName = "";
          $.isLogin = true;
          $.outFlag = false;
          $.isban = false;
          $.hasRisk = false;
          $.suc = false;
          $.self = false;
          console.log("\n=============开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "============");
          _0x34d47d();
          if (!$.isLogin) {
            const _0x457375 = {
              "open-url": "https://bean.m.jd.com/bean/signIndex.action"
            };
            $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x457375);
            $.isNode() && (await _0x250849.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
            continue;
          }
          let _0x1f38cf = await _0x8c20e8("miniTask_ddFarmJump", _0x30728a);
          if (_0x1f38cf.subCode == 0) {
            $.suc = true;
            $.sucnum++;
            console.log("助力成功！" + $.sucnum);
            if ($.sucnum >= 5) {
              _0x35d783 = _0x574d96 + 1;
              break;
            }
          } else {
            if (_0x1f38cf.subCode == 2004 || _0x1f38cf.subCode == 2005) {
              console.log(_0x1f38cf.message);
              $.suc = true;
            } else {
              if (_0x1f38cf.subCode == 2003) {
                console.log(_0x1f38cf.message);
                $.self = true;
              } else {
                if (_0x1f38cf.subCode == 2007) {
                  console.log(_0x1f38cf.subCode, _0x1f38cf.message);
                  _0x35d783 = _0x574d96;
                  break;
                } else {
                  console.log(_0x1f38cf.subCode, _0x1f38cf.message);
                }
              }
            }
          }
          if ($.outFlag) {
            break;
          }
        }
        await $.wait(parseInt(Math.random() * 500 + 2000, 10));
      }
      if ($.index == _0x5dd29a.length) {
        break;
      }
    }
  } catch (_0x586dda) {
    console.log(_0x586dda);
  }
}
async function _0x8c20e8(_0x652814, _0x5745cb) {
  if ($.outFlag || $.isban) {
    return;
  }
  let _0x3ea15a = "",
    _0x301777,
    _0x487b79,
    _0x2ffa2c = "post",
    _0x233d72 = "https://api.m.jd.com/",
    _0x4cde76 = "signed_wh5";
  switch (_0x652814) {
    case "miniTask_ddFarmJump":
      const _0x1409fe = {
        taskId: "6297",
        inviteCode: _0x5745cb,
        taskType: "WECHAT_SHARE"
      };
      _0x3ea15a = _0x1409fe;
      _0x487b79 = "miniTask_ddFarmJump";
      break;
    case "jx_party_task_list":
      const _0x11ba61 = {
        lbsHide: "0",
        remindHide: "0"
      };
      _0x3ea15a = _0x11ba61;
      _0x487b79 = "jx_party_task_list";
      break;
    case "apTaskList":
      _0x233d72 = "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22Fl1LmxG_f0poD7w1ycZqnw%22%7D&t=1715170975269&appid=activities_platform&client=android&clientVersion=6.24.0&loginType=2&loginWQBiz=wegame&h5st=null&build=22779&screen=393*873&networkType=wifi&eufv=1&cthr=1";
      _0x2ffa2c = "get";
      break;
    case "jx_party_mapalbum":
      _0x3ea15a = {};
      _0x487b79 = "jx_party_mapalbum";
      break;
    case "jx_party_lottery":
      const _0x468173 = {
        uemps: "0-0-999",
        areaInfo: "0_0_0_0",
        latitude: 0,
        longitude: 0,
        deviceInfo: "{\"sdkToken\":\"\",\"jsToken\":\"\"}",
        unpl: "",
        qdPageId: "MO-J2011-1",
        mdClickId: "Babel_dev_other_11lotterystart"
      };
      _0x3ea15a = _0x468173;
      _0x301777 = "a525b";
      _0x487b79 = "jx_party_lottery";
      break;
    case "jx_party_do_task":
      const _0x50bf3b = {
        itemId: $.itemId,
        actionType: 0,
        taskType: 1,
        assignmentId: $.assignmentId,
        extraType: $.extraType
      };
      _0x3ea15a = _0x50bf3b;
      _0x301777 = "a525b";
      _0x487b79 = "jx_party_do_task";
      break;
    default:
      console.log("错误" + _0x652814);
  }
  if (_0x301777) {
    let _0x4f8be7 = {
      appId: _0x301777,
      functionId: _0x487b79,
      body: _0x3ea15a,
      appid: _0x4cde76,
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      t: Date.now(),
      code: 1,
      xcr: $.fg,
      ua: $.UA
    };
    $.fg == 1 && ($.fg = 0);
    _0x3ea15a = await _0x3de244.getbody(_0x4f8be7);
    if (!_0x3ea15a) {
      return;
    }
  } else {
    if (_0x3ea15a) {
      _0x3ea15a = "loginType=2&clientType=wxapp&client=android&clientVersion=9.20.270&build=&appid=hot_channel&functionId=" + _0x487b79 + "&body=" + encodeURIComponent(JSON.stringify(_0x3ea15a));
    }
  }
  let _0xea8118 = _0x1a71a4(_0x233d72, _0x3ea15a);
  return new Promise(async _0x4a63b9 => {
    $["d" + _0x2ffa2c](_0xea8118, async (_0x338b3d, _0x28f387, _0x4890f1) => {
      try {
        _0x338b3d ? console.log("" + $.toStr(_0x338b3d, _0x338b3d)) : _0x4890f1 = _0x905670(_0x652814, _0x4890f1);
      } catch (_0xc74ca3) {
        console.log(_0xc74ca3, _0x28f387);
      } finally {
        _0x4a63b9(_0x4890f1);
      }
    });
  });
}
switch ($.type) {
  case "nb":
    const _0x271ad1 = {
      nb: nb
    };
    _0xf1f6le = _0x271ad1;
    break;
}
async function _0x905670(_0x522a9b, _0xe0172d) {
  let _0x14ef67 = "";
  try {
    _0x14ef67 = JSON.parse(_0xe0172d);
  } catch (_0x58e2c2) {
    console.log(_0x522a9b + " 执行任务异常");
  }
  try {
    switch (_0x522a9b) {
      case "miniTask_ddFarmJump":
        return _0x14ef67;
        if (_0x14ef67.subCode == 0) {
          console.log("助力成功！" + $.sucnum);
          $.suc = true;
          $.sucnum++;
        } else {
          if (_0x14ef67.subCode == 2004 || _0x14ef67.subCode == 2005) {
            console.log(_0x14ef67.message);
            $.suc = true;
          } else {
            if (_0x14ef67.subCode == 2003) {
              console.log(_0x14ef67.message);
              $.self = true;
            } else {
              console.log(_0x14ef67.subCode, _0x14ef67.message);
            }
          }
        }
      case "sign":
        return _0x14ef67;
        _0x14ef67.success ? (_0x14ef67.data?.["signInCoin"] && console.log("获得 " + _0x14ef67.data.signInCoin + " 签到金 💰️"), _0x14ef67.data?.["bsignInPrizeDrawVO"]?.["prizeValue"] > 0 && console.log("获得 " + _0x14ef67.data.bsignInPrizeDrawVO.prizeValue + " 红包 🧧")) : console.log(_0x14ef67.errMsg);
      case "bSignInHome":
        if (_0x14ef67.success) {
          console.log("当前签到金：" + _0x14ef67.data.signInCoin);
          $.signflag = _0x14ef67.data.signInFlag;
        }
        break;
      case "apTaskDrawAward":
        if (_0x14ef67.success) {
          for (let _0x2ae05e of _0x14ef67.data) {
            console.log("获得" + _0x2ae05e.awardGivenNumber + "签到金 💰️");
          }
        } else {
          console.log(_0x14ef67.errMsg);
        }
        break;
      case "apStartTaskTime":
      case "apDoLimitTimeTask":
        break;
      default:
        console.log(_0x522a9b + " -> " + _0xe0172d);
    }
    if (typeof _0x14ef67 == "object") {
      if (_0x14ef67.errorMessage) {
        if (_0x14ef67.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (_0x5eaf9d) {
    console.log(_0x522a9b + " " + _0x5eaf9d);
  }
}
function _0x1a71a4(_0x268815, _0xe09620) {
  const _0x1a159b = {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    Referer: "https://servicewechat.com/wx91d27dbf599dff74/760/page-frame.html",
    Cookie: _0x2149cb,
    "User-Agent": $.UA
  };
  const _0x5dd365 = {
    url: _0x268815,
    headers: _0x1a159b,
    timeout: 30000,
    ...(_0xe09620 ? {
      body: _0xe09620
    } : {})
  };
  return _0x5dd365;
}
async function _0x34d47d() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x1a41c1(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function _0x1a41c1(_0x468cba) {
  _0x468cba = _0x468cba || 32;
  let _0x2a12e7 = "abcdef0123456789",
    _0x9b5512 = _0x2a12e7.length,
    _0x3a3ad2 = "";
  for (i = 0; i < _0x468cba; i++) {
    _0x3a3ad2 += _0x2a12e7.charAt(Math.floor(Math.random() * _0x9b5512));
  }
  return _0x3a3ad2;
}
function _0x40d4de(_0x4ffcd5) {
  if (typeof _0x4ffcd5 == "string") {
    try {
      return JSON.parse(_0x4ffcd5);
    } catch (_0x5043ff) {
      console.log(_0x5043ff);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function _0x446928() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0xca90ed => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    let _0x5cc036 = {
      venderId: "" + $.joinVenderId + "",
      shopId: "" + $.joinVenderId + "",
      bindByVerifyCodeFlag: 1,
      registerExtend: {},
      writeChildFlag: 0,
      channel: 406
    };
    $.shopactivityId == "" && delete _0x5cc036.activityId;
    const _0x433ac5 = {
      appId: "27004",
      fn: "bindWithVender",
      body: _0x5cc036,
      apid: "shopmember_m_jd_com",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: $.UA
    };
    _0x5cc036 = await dyy.getbody(_0x433ac5);
    const _0x552c22 = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: _0x2149cb,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": $.UA
    };
    const _0x44ccfe = {
      url: "https://api.m.jd.com/client.action?" + _0x5cc036 + "&uuid=88888",
      headers: _0x552c22,
      timeout: 30000
    };
    $.dget(_0x44ccfe, async (_0x56340c, _0x19c2a7, _0x48fb5c) => {
      try {
        _0x48fb5c = _0x48fb5c && _0x48fb5c.match(/jsonp_.*?\((.*?)\);/) && _0x48fb5c.match(/jsonp_.*?\((.*?)\);/)[1] || _0x48fb5c;
        let _0xb14b4e = $.toObj(_0x48fb5c, _0x48fb5c);
        if (_0xb14b4e && typeof _0xb14b4e == "object") {
          if (_0xb14b4e && _0xb14b4e.success === true) {
            console.log("    " + _0xb14b4e.message);
            $.errorJoinShop = _0xb14b4e.message;
            if (_0xb14b4e.result && _0xb14b4e.result.giftInfo) {
              for (let _0x20a753 of _0xb14b4e.result.giftInfo.giftList) {
                console.log("入会获得:" + _0x20a753.discountString + _0x20a753.prizeName + _0x20a753.secondLineDesc);
              }
            }
          } else {
            _0xb14b4e && typeof _0xb14b4e == "object" && _0xb14b4e.message ? ($.errorJoinShop = _0xb14b4e.message, console.log("" + (_0xb14b4e.message || ""))) : console.log(_0x48fb5c);
          }
        } else {
          console.log(_0x48fb5c);
        }
      } catch (_0x4c68b2) {
        $.logErr(_0x4c68b2, _0x19c2a7);
      } finally {
        _0xca90ed();
      }
    });
  });
}
async function _0x244de4() {
  return new Promise(async _0x4885a6 => {
    const _0x1b15a3 = {
      venderId: $.joinVenderId,
      payUpShop: true,
      queryVersion: "10.5.2",
      appid: "ef79a",
      needSecurity: true,
      bizId: "shop_view_app",
      channel: 406
    };
    let _0x32a513 = _0x1b15a3;
    const _0x3bc644 = {
      appId: "ef79a",
      fn: "getShopOpenCardInfo",
      body: _0x32a513,
      apid: "jd_shop_member",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    _0x32a513 = await dyy.getbody(_0x3bc644);
    const _0x3e3dfb = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: _0x2149cb,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    const _0x3381d7 = {
      url: "https://api.m.jd.com/client.action?" + _0x32a513 + "&uuid=88888",
      headers: _0x3e3dfb,
      timeout: 60000
    };
    $.get(_0x3381d7, async (_0x154198, _0x40d14a, _0x1ebfb5) => {
      try {
        _0x1ebfb5 = _0x1ebfb5 && _0x1ebfb5.match(/jsonp_.*?\((.*?)\);/) && _0x1ebfb5.match(/jsonp_.*?\((.*?)\);/)[1] || _0x1ebfb5;
        let _0x597108 = $.toObj(_0x1ebfb5, _0x1ebfb5);
        _0x597108 && typeof _0x597108 == "object" ? _0x597108 && _0x597108.success == true && (console.log("去加入 -> " + (_0x597108.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x597108.result[0].interestsRuleList && _0x597108.result[0].interestsRuleList[0] && _0x597108.result[0].interestsRuleList[0].interestsInfo && _0x597108.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x1ebfb5);
      } catch (_0x347045) {
        $.logErr(_0x347045, _0x40d14a);
      } finally {
        _0x4885a6();
      }
    });
  });
}
function _0x342024(_0x10166f, _0x4b0ca1) {
  return Math.floor(Math.random() * (_0x4b0ca1 - _0x10166f)) + _0x10166f;
}
function _0x40c5a2(_0x41e86f = +new Date()) {
  var _0x62b49a = new Date(_0x41e86f + 28800000);
  return _0x62b49a.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}
function _0x430768(_0x47ac77) {
  return new Promise(async _0x45465d => {
    if ($.shareCodesArr.length != 0) {
      if (_0x10eaf7[_0x47ac77 - 1]) {
        _0x10eaf7 = $.shareCodesArr[$.index - 1].split("@");
      } else {
        const _0x121117 = _0x47ac77 > _0x1da92c.length ? _0x1da92c.length - 1 : _0x47ac77 - 1;
        _0x10eaf7 = _0x1da92c[_0x121117].split("@");
      }
    }
    console.log("您提供了" + _0x10eaf7.length + "个农场助力码\n");
    console.log("将要助力的好友" + JSON.stringify(_0x10eaf7));
    _0x45465d();
  });
}
function _0x2bd770() {
  return new Promise(_0x278c8c => {
    $.shareCodesArr = [];
    if ($.isNode()) {
      if (process.env.NEWFRUITCODES) {
        _0x10eaf7 = process.env.NEWFRUITCODES.split("&");
      } else {
        process.env.NEWFRUITSHARECODES && (process.env.NEWFRUITSHARECODES.indexOf("\n") > -1 ? _0x1da92c = process.env.NEWFRUITSHARECODES.split("\n") : _0x1da92c = process.env.NEWFRUITSHARECODES.split("&"));
      }
    }
    if ($.isNode()) {
      Object.keys(_0x1da92c).forEach(_0x2fc413 => {
        _0x1da92c[_0x2fc413] && $.shareCodesArr.push(_0x1da92c[_0x2fc413]);
      });
    }
    let _0x358f48 = _0x19fc6b.existsSync("./fruit_helpcode_new");
    if (process.env.NEWFRUITSHARECODES) {
      $.log("使用日志搜集的助力码\n");
    } else {
      if (process.env.NEWFRUITCODES) {
        $.log("使用变量指定的助力码\n");
      } else {
        if (_0x1da92c.length == 0 && _0x358f48) {
          $.log("使用本地缓存的助力码\n");
          _0x10eaf7 = _0x19fc6b.readFileSync("./fruit_helpcode_new", "utf-8");
          try {
            _0x10eaf7 = JSON.parse(_0x10eaf7);
          } catch {
            console.log("本地缓存的助力码格式有误，请检查！");
            console.log(_0x10eaf7 + _0x10eaf7.length);
            _0x10eaf7 = [];
          }
        } else {
          $.log("没有检测到任何助力码！！！\n");
        }
      }
    }
    _0x278c8c();
  });
}
function _0x420651() {
  return new Promise(_0x532d8f => {
    const _0x4c2735 = {
      Cookie: _0x2149cb,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x4f2ebc = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x4c2735,
      timeout: 10000
    };
    $.get(_0x4f2ebc, (_0x1f0bba, _0x43b488, _0x41c9ed) => {
      try {
        if (_0x41c9ed) {
          _0x41c9ed = JSON.parse(_0x41c9ed);
          if (!(_0x41c9ed.islogin === "1")) {
            if (_0x41c9ed.islogin === "0") {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x3a3703) {
        console.log(_0x3a3703);
      } finally {
        _0x532d8f();
      }
    });
  });
}