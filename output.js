//Sat Dec 21 2024 13:05:56 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x17290c = $.isNode() ? require("./jdCookie.js") : "",
  _0x5da102 = $.isNode() ? require("./sendNotify") : "";
let _0x44d48b = [],
  _0xcd9d6 = "",
  _0x4b9334 = {};
if (process.env.DY_PROXY) {
  const _0x330ce7 = process.env.PERMIT_API ? (process.env.PERMIT_API + "&test").split("&") : "";
  if (_0x330ce7 == "") try {
    require("https-proxy-agent");
    _0x4b9334 = require("./function/proxy.js");
    $.dget = _0x4b9334.intoRequest($.get.bind($));
    $.dpost = _0x4b9334.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  } else {
    if (_0x330ce7.filter(_0x5b95e9 => process.mainModule.filename.includes(_0x5b95e9)).length != 0) try {
      require("https-proxy-agent");
      _0x4b9334 = require("./function/proxy.js");
      $.dget = _0x4b9334.intoRequest($.get.bind($));
      $.dpost = _0x4b9334.intoRequest($.post.bind($));
    } catch {
      $.log("未安装https-proxy-agent依赖，无法启用代理");
      $.dget = $.get;
      $.dpost = $.post;
    } else $.dpost = $.post, $.dget = $.get;
  }
} else $.dpost = $.post, $.dget = $.get;
if ($.isNode()) {
  Object.keys(_0x17290c).forEach(_0x40bb13 => {
    _0x44d48b.push(_0x17290c[_0x40bb13]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x44d48b = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x2d21c1($.getdata("CookiesJD") || "[]").map(_0x3e1281 => _0x3e1281.cookie)].filter(_0x1ef4d0 => !!_0x1ef4d0);
let _0x468124 = {
  "except": process.env.XH_UNSUB_EXCEPT && process.env.XH_UNSUB_EXCEPT.split("@") || [],
  "isRun": process.env.JD_UNSUB === "true" || true,
  "isNotify": process.env.JD_UNSUB_NOTIFY === "true" || false,
  "goodPageSize": process.env.JD_UNSUB_GPAGESIZE * 1 || 20,
  "shopPageSize": process.env.JD_UNSUB_SPAGESIZE * 1 || 20,
  "goodsKeyWords": process.env.JD_UNSUB_GKEYWORDS && process.env.JD_UNSUB_GKEYWORDS.split("@") || [],
  "shopKeyWords": process.env.JD_UNSUB_SKEYWORDS && process.env.JD_UNSUB_SKEYWORDS.split("@") || [],
  "unSubscribeInterval": process.env.JD_UNSUB_INTERVAL * 1 || 2000,
  "printLog": process.env.JD_UNSUB_PLOG === "true" || true,
  "failTimes": process.env.JD_UNSUB_FAILTIMES || 3
};
const _0x564a4a = $.isNode() ? require("./function/dylib.js") : "",
  _0x1f7820 = require("./function/dylans.js");
!(async () => {
  if (_0x468124.isRun) {
    !_0x44d48b[0] && $.msg("【京东账号一】取关京东店铺商品失败", "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    console.log("Tips：容易403");
    await _0x52fd22();
    for (let _0x4c1ff2 = 0; _0x4c1ff2 < _0x44d48b.length; _0x4c1ff2++) {
      if (_0x44d48b[_0x4c1ff2]) {
        _0xcd9d6 = _0x44d48b[_0x4c1ff2];
        $.UserName = decodeURIComponent(_0xcd9d6.match(/pt_pin=([^; ]+)(?=;?)/) && _0xcd9d6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x4c1ff2 + 1;
        $.isLogin = true;
        $.nickName = "";
        console.log("\n****开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*****\n");
        if (_0x468124.except.includes($.UserName)) {
          console.log("跳过账号：" + ($.nickName || $.UserName));
          continue;
        }
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await _0x5da102.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        $.shopsKeyWordsNum = 0;
        $.failnum = 0;
        $.goodsKeyWordsNum = 0;
        $.unsubscribeGoodsNum = 0;
        $.unsubscribeShopsNum = 0;
        $.goodsTotalNum = 0;
        $.shopsTotalNum = 0;
        $.commIdList = "";
        $.shopIdList = "";
        $.endGoods = $.endShops = false;
        $.failTimes = 0;
        await _0x2f64cb();
        console.log("当前已关注商品：" + $.goodsTotalNum + "个");
        let _0x4be1a9 = parseInt($.goodsTotalNum / 10) + 1;
        if (_0x4be1a9 > 1) {
          console.log("获取商品ing...");
          for (let _0x48b1f2 = 2; _0x48b1f2 < _0x4be1a9 + 1; _0x48b1f2++) {
            await _0x2f64cb(_0x48b1f2);
            if ($.failnum > 3) break;
            await $.wait(2000);
          }
        }
        await $.wait(_0x468124.unSubscribeInterval);
        if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) {
          let _0x30c30f = $.commIdList.split(",").filter(_0x27cfec => !!_0x27cfec);
          $.log("\n开始取关商品...\n");
          for (let _0x26c943 = 0; _0x26c943 < 20; _0x26c943++) {
            if ($.failnum > 3) break;
            if (_0x30c30f.length === 0) break;
            $.log("第" + (_0x26c943 + 1) + "次取关商品->");
            let _0x5f2622 = _0x30c30f.splice(0, 20);
            _0x5f2622 = _0x5f2622.join(",");
            let _0x9299c3 = await _0x169bad(_0x5f2622);
            _0x9299c3 && ($.goodsTotalNum = $.goodsTotalNum - _0x5f2622.split(",").length);
            await $.wait(2000);
          }
        } else console.log("不执行取消收藏商品\n");
        await $.wait(_0x468124.unSubscribeInterval);
        await _0xf13689();
        await $.wait(_0x468124.unSubscribeInterval);
        if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await _0x57a086();else console.log("不执行取消收藏店铺\n");
        do {
          if (parseInt($.shopsTotalNum) === 0) break;else {
            if (parseInt($.shopsTotalNum) === parseInt($.shopsKeyWordsNum)) break;else {
              $.shopIdList = "";
              await _0xf13689();
              await $.wait(_0x468124.unSubscribeInterval);
              if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await _0x57a086();else console.log("不执行取消收藏店铺\n");
            }
          }
          if ($.failTimes >= _0x468124.failTimes || $.failnum > 3) {
            console.log("失败次数到达设定值，触发防死循环机制，该帐号已跳过");
            break;
          }
        } while (true);
        await _0x22cf45();
      }
    }
  } else $.log("\n默认不执行,请设置变量JD_UNSUB = 'true'");
})().catch(_0x2e3513 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2e3513 + "!", "");
}).finally(() => {
  $.done();
});
function _0x52fd22() {
  return new Promise(_0x4f8d2a => {
    if ($.isNode() && process.env.JD_UNSUB) {
      console.log("=====环境变量配置如下=====");
      console.log("except: " + typeof _0x468124.except + ", " + _0x468124.except);
      console.log("isNotify: " + typeof _0x468124.isNotify + ", " + _0x468124.isNotify);
      console.log("goodPageSize: " + typeof _0x468124.goodPageSize + ", " + _0x468124.goodPageSize);
      console.log("shopPageSize: " + typeof _0x468124.shopPageSize + ", " + _0x468124.shopPageSize);
      console.log("goodsKeyWords: " + typeof _0x468124.goodsKeyWords + ", " + _0x468124.goodsKeyWords);
      console.log("shopKeyWords: " + typeof _0x468124.shopKeyWords + ", " + _0x468124.shopKeyWords);
      console.log("unSubscribeInterval: " + typeof _0x468124.unSubscribeInterval + ", " + _0x468124.unSubscribeInterval);
      console.log("printLog: " + typeof _0x468124.printLog + ", " + _0x468124.printLog);
      console.log("failTimes: " + typeof _0x468124.failTimes + ", " + _0x468124.failTimes);
      console.log("=======================");
    }
    _0x4f8d2a();
  });
}
function _0x22cf45() {
  _0x468124.isNotify ? $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个") : $.log("【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个");
}
function _0x2bcd1e(_0x4caced, _0x24fd0f, _0x24f2a4) {
  let _0x491a20 = _0x4caced.indexOf(_0x24fd0f),
    _0x1dfde1 = _0x4caced.indexOf(_0x24f2a4, _0x491a20);
  if (_0x491a20 < 0 || _0x1dfde1 < _0x491a20) return "";
  return _0x4caced.substring(_0x491a20 + _0x24fd0f.length, _0x1dfde1);
}
async function _0x2f64cb(_0x333d8b = 1) {
  $.UA = "Mozilla/5.0 (Linux; Android 12; 22 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110053 MMWEBSDK/20230202 MMWEBID/8970 MicroMessenger/8.0.33.2320(0x28002151) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android";
  let _0x58dcdb = {
      "cp": _0x333d8b,
      "pageSize": 10,
      "category": "",
      "promote": 0,
      "cutPrice": 0,
      "coupon": 0,
      "stock": 0,
      "area": "0_0_0_0",
      "tenantCode": "jgminise",
      "bizModelCode": "6",
      "bizModeClientType": "WxMiniProgram",
      "externalLoginType": "1"
    },
    _0x1923e9 = {
      "appId": "c420a",
      "functionId": "queryFollowProduct",
      "body": _0x58dcdb,
      "appid": "jd-cphdeveloper-m",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
  _0x58dcdb = await _0x1f7820.getbody(_0x1923e9);
  if (!_0x58dcdb) return;
  let _0x2f3202 = {
    "url": "https://api.m.jd.com/api?loginType=2&" + _0x58dcdb,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://my.m.jd.com",
      "Referer": "https://my.m.jd.com/",
      "User-Agent": $.UA,
      "Cookie": _0xcd9d6
    },
    "ciphers": _0x564a4a.cpstr
  };
  return new Promise(async _0x543dd6 => {
    $.dget(_0x2f3202, async (_0x3edfc5, _0x3a3236, _0x4ac3d4) => {
      try {
        if (_0x3edfc5) {
          console.log(_0x3edfc5);
          if (_0x3edfc5.includes("403")) $.failnum++;
        } else {
          _0x4ac3d4 = JSON.parse(_0x4ac3d4);
          if (_0x4ac3d4.code === "0") {
            if (_0x4ac3d4.totalNum !== 0) {
              $.goodsTotalNum = parseInt(_0x4ac3d4.totalNum);
              $.goodsKeyWordsNum = 0;
              for (let _0x3bdc63 of _0x4ac3d4.followProductList) {
                if (_0x468124.goodsKeyWords.some(_0x5ebc88 => _0x3bdc63.commTitle.includes(_0x5ebc88))) {
                  _0x468124.printLog ? console.log(_0x3bdc63.commTitle + " ") : "";
                  _0x468124.printLog ? console.log("商品被过滤，含有关键词\n") : "";
                  $.goodsKeyWordsNum += 1;
                } else $.commIdList += _0x3bdc63.commId + ",", $.unsubscribeGoodsNum++;
              }
            } else $.endGoods = true, console.log("无商品需要取关\n");
          } else console.log(JSON.stringify(_0x4ac3d4)), $.failnum++;
        }
      } catch (_0x312278) {
        $.logErr(_0x312278, _0x3a3236);
      } finally {
        _0x543dd6(_0x4ac3d4);
      }
    });
  });
}
function _0x169bad(_0x20bbf4) {
  return new Promise(_0x201706 => {
    let _0x5da77d = {
      "commId": _0x20bbf4,
      "tenantCode": "jgminise",
      "bizModelCode": "6",
      "bizModeClientType": "WxMiniProgram",
      "externalLoginType": ""
    };
    const _0x8e055c = {
      "url": "https://api.m.jd.com/api?appid=jd-cphdeveloper-m&functionId=delFollowProduct&body=" + encodeURIComponent(JSON.stringify(_0x5da77d)) + "&loginType=2&g_login_type=2&g_tk=891942062&g_ty=ajax&appCode=msd95910c4",
      "headers": {
        "Host": "api.m.jd.com",
        "Origin": "https://my.m.jd.com",
        "Referer": "https://my.m.jd.com/",
        "User-Agent": $.UA,
        "Cookie": _0xcd9d6
      },
      "ciphers": _0x564a4a.cpstr
    };
    let _0x4fd978 = false;
    $.dget(_0x8e055c, (_0x5ab045, _0x5665a1, _0x2abce4) => {
      try {
        if (_0x5ab045) {
          console.log(_0x5ab045);
          if (_0x5ab045.includes("403")) $.failnum++;
        } else $.failnum = 0, _0x2abce4 = JSON.parse(_0x2abce4), _0x2abce4.errorCode === 0 ? (console.log("成功取关商品：" + _0x20bbf4.split(",").length + "个\n"), $.failTimes = 0, _0x4fd978 = true) : console.log("批量取关商品失败，失败次数：" + ++$.failTimes + "\n", JSON.stringify(_0x2abce4));
      } catch (_0xe2443b) {
        $.logErr(_0xe2443b, _0x5665a1);
      } finally {
        _0x201706(_0x4fd978);
      }
    });
  });
}
function _0xf13689() {
  return new Promise(_0x276b50 => {
    console.log("正在获取已关注的店铺...");
    const _0x389aaa = {
      "url": "https://api.m.jd.com/client.action?functionId=getFollowShop&body=%7B%22page%22%3A1%2C%22activityStatus%22%3A1%2C%22refresh%22%3Afalse%2C%22pageSize%22%3A20%2C%22channel%22%3A%22jg_shop%22%7D&t=" + Date.now() + "&appid=shop_m_jd_com&clientVersion=13.1.2&client=wh5&screen=1081*2401&loginType=2&loginWQBiz=mshop-smart",
      "headers": {
        "Cookie": _0xcd9d6,
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; XIAOMI; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220133 MMWEBSDK/20231202 MMWEBID/8970 MicroMessenger/8.0.47.2560(0x28002F51) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx91d27dbf599dff74",
        "Referer": "https://shop.m.jd.com/"
      },
      "ciphers": _0x564a4a.cpstr
    };
    $.dget(_0x389aaa, (_0x23cfa7, _0x5e1774, _0x37e97f) => {
      try {
        if (_0x23cfa7) {
          console.log(_0x23cfa7);
          if (_0x23cfa7.includes("403")) $.failnum++;
        } else {
          _0x37e97f = JSON.parse(_0x37e97f);
          if (_0x37e97f.code === "0") {
            $.shopsTotalNum = parseInt(_0x37e97f.result.totalCount);
            console.log("当前已关注店铺：" + $.shopsTotalNum + "个");
            const {
              floorSuperMarketShops = [],
              showShopList: _0x314ed9,
              floorClosedShops = []
            } = _0x37e97f.result;
            let _0x56def7 = [...new Set([...floorSuperMarketShops, ..._0x314ed9, ...floorClosedShops])];
            if (_0x56def7.length > 0) {
              $.shopsKeyWordsNum = 0;
              for (let _0x2fa20a of _0x56def7) {
                _0x468124.shopKeyWords.some(_0x47839c => _0x2fa20a.shopName.includes(_0x47839c)) ? (_0x468124.printLog ? console.log("店铺被过滤，含有关键词") : "", _0x468124.printLog ? console.log(_0x2fa20a.shopName + "\n") : "", $.shopsKeyWordsNum += 1) : ($.shopIdList += _0x2fa20a.shopId + ",", $.unsubscribeShopsNum++);
              }
            } else _0x56def7.length == 0 && $.shopsTotalNum != 0 ? $.shopsTotalNum = 0 : ($.endShops = true, console.log("无店铺可取消关注\n"));
          } else console.log("获取已关注店铺失败：" + JSON.stringify(_0x37e97f));
        }
      } catch (_0x1bc491) {
        $.logErr(_0x1bc491, _0x5e1774);
      } finally {
        _0x276b50(_0x37e97f);
      }
    });
  });
}
function _0x57a086() {
  return new Promise(_0x183fa7 => {
    console.log("正在执行批量取消关注店铺...");
    let _0x518ad1 = {
      "shopId": $.shopIdList,
      "follow": false,
      "sourceRpc": "shop_app_myollows_shop"
    };
    const _0x324414 = {
      "url": "https://api.m.jd.com/client.action?functionId=followShop&body=" + encodeURIComponent(JSON.stringify(_0x518ad1)) + "&t=1720937028813&appid=shop_m_jd_com&clientVersion=13.1.2&client=wh5&area=0&screen=1081*2401&loginType=2&loginWQBiz=mshop-smart",
      "headers": {
        "Cookie": _0xcd9d6,
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; XIAOMI; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220133 MMWEBSDK/20231202 MMWEBID/8970 MicroMessenger/8.0.47.2560(0x28002F51) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx91d27dbf599dff74",
        "Referer": "https://shop.m.jd.com/"
      },
      "ciphers": _0x564a4a.cpstr
    };
    $.dget(_0x324414, (_0x1fa3ed, _0x52af8b, _0x2a00f0) => {
      try {
        if (_0x1fa3ed) {
          console.log(_0x1fa3ed);
          if (_0x1fa3ed.includes("403")) $.failnum++;
        } else $.failnum = 0, _0x2a00f0 = JSON.parse(_0x2a00f0), _0x2a00f0.code === "0" ? (console.log("已成功取消关注店铺：" + $.unsubscribeShopsNum + "个\n"), $.failTimes = 0) : console.log("批量取消关注店铺失败，失败次数：" + ++$.failTimes + "\n");
      } catch (_0x5c6eac) {
        $.logErr(_0x5c6eac, _0x52af8b);
      } finally {
        _0x183fa7(_0x2a00f0);
      }
    });
  });
}
function _0x5cf33a() {
  return new Promise(async _0x5d4432 => {
    const _0x255f12 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": _0xcd9d6,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    };
    $.post(_0x255f12, (_0x50a862, _0x45092b, _0x48693a) => {
      try {
        if (_0x50a862) console.log("" + JSON.stringify(_0x50a862)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x48693a) {
            _0x48693a = JSON.parse(_0x48693a);
            if (_0x48693a.retcode === 13) {
              $.isLogin = false;
              return;
            }
            _0x48693a.retcode === 0 ? $.nickName = _0x48693a.base && _0x48693a.base.nickname || $.UserName : $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (_0xc11994) {
        $.logErr(_0xc11994, _0x45092b);
      } finally {
        _0x5d4432();
      }
    });
  });
}
function _0x2d21c1(_0x3a521e) {
  if (typeof _0x3a521e == "string") try {
    return JSON.parse(_0x3a521e);
  } catch (_0x1eecc6) {
    return console.log(_0x1eecc6), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}