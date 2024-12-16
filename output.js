//Mon Dec 16 2024 14:17:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x5ae6bf = $.isNode() ? require("./jdCookie.js") : "",
  _0x496694 = $.isNode() ? require("./sendNotify") : "",
  _0x4151d1 = require("./function/dylanx.js");
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
const _0x471cc1 = require("./USER_AGENTS");
Exchange = true;
let _0x494dbd = [],
  _0x20a857 = "";
function _0x37f928(_0xe0a032, _0x5721d9) {
  try {
    return _0xe0a032();
  } catch (_0x108f0e) {
    return undefined;
  }
}
if ($.isNode()) {
  Object.keys(_0x5ae6bf).forEach(_0x580834 => {
    _0x494dbd.push(_0x5ae6bf[_0x580834]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x494dbd = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x55ab33($.getdata("CookiesJD") || "[]").map(_0x2fa07a => _0x2fa07a.cookie)].filter(_0x2d36b8 => !!_0x2d36b8);
message = "";
!(async () => {
  if (!_0x494dbd[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  let _0x13c4a7 = ["3081a5203b974323bbc06fa621c874d7", "65c835b2cc1b44918bcad9adfbdb2816", "4ff8b32e6b2e4dc1ba1f546f9363e09c", "a17e04ef07fd42de82f1014acd78a03a", "988211503df847ddafa6abe61d22bffd"];
  $.shareUuid = _0x13c4a7[Math.floor(Math.random() * _0x13c4a7.length)];
  for (let _0x52a9f9 = 0; _0x52a9f9 < 10; _0x52a9f9++) {
    _0x20a857 = _0x494dbd[_0x52a9f9];
    if (_0x20a857) {
      $.UserName = decodeURIComponent(_0x20a857.match(/pt_pin=([^; ]+)(?=;?)/) && _0x20a857.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x52a9f9 + 1;
      $.cando = true;
      $.cow = "";
      $.openCard = true;
      $.isLogin = true;
      $.needhelp = true;
      $.foodNum = 0;
      $.nickName = "";
      $.drawresult = "";
      $.exchange = 0;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x496694.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = _0x471cc1.UARAM ? _0x471cc1.UARAM("", _0x20a857) : _0x471cc1.USER_AGENT;
      await _0x33e271();
      await _0x8587dd();
      await _0x7c0353();
      await _0x1c8f1a();
      await _0x33719d();
      await _0x45d389();
      await _0x460a2b();
      if ($.cando) {
        await _0x374dbf($.shareuuid);
        await _0xcdf94();
        let _0xc968e8 = Math.floor($.foodNum / 1000);
        console.log("可兑换 " + _0xc968e8 + " 次 20京🐶");
        for (q = 0; q < 1 && Exchange; q++) {
          await _0x18f860(13);
        }
        !Exchange && console.log("你设置的不兑换东西,请自行进去活动兑换");
        taskList = [...$.taskList, ...$.taskList2];
        for (j = 0; j < taskList.length; j++) {
          task = taskList[j];
          console.log(task.taskname);
          if (task.taskid == "interact") {
            for (l = 0; l < 20 - task.curNum; l++) {
              await _0x12722e(task.taskid, task.params);
              await $.wait(5000);
            }
            console.log("互动完成");
          } else {
            if (task.taskid == "scansku") {} else {
              if (task.taskid !== "add2cart") {}
            }
          }
        }
        await _0xcdf94();
        for (k = 0; k < $.drawchance; k++) {
          await _0x164ac7();
          await $.wait(1000);
        }
        message += "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n" + $.cow + " 兑换京🐶 " + $.exchange + "  " + $.drawresult + "\n";
        await $.wait(10 * 1000);
      } else $.msg($.name, " 跑不起来~手动进活动看看吧");
    }
  }
  if (message.length != 0) {
    if ($.isNode()) {} else $.msg($.name, "", "星系牧场" + message);
  }
})().catch(_0x2ffdbb => $.logErr(_0x2ffdbb)).finally(() => $.done());
function _0x476a9b(_0x4627cb) {
  if (!_0x37f928(() => _0x4627cb.headers["set-cookie"])) return;
  let _0x92772f = {},
    _0x27b3d6 = {},
    _0x1fed8f = _0x20a857.split(";");
  for (let _0x474698 of _0x1fed8f) {
    const _0x2db0fb = _0x474698.split("=");
    _0x92772f[_0x2db0fb[0]] = _0x474698.replace(_0x2db0fb[0] + "=", "");
  }
  for (let _0x531adf of _0x4627cb.headers["set-cookie"]) {
    const _0x47589e = _0x531adf.split(";")[0],
      _0x78424b = _0x47589e.split("=");
    _0x92772f[_0x78424b[0]] = _0x47589e.replace(_0x78424b[0] + "=", "");
  }
  const _0x5e5180 = {
    ..._0x27b3d6,
    ..._0x92772f
  };
  _0x20a857 = "";
  for (let _0xb4759a in _0x5e5180) {
    _0xb4759a && (_0x20a857 = _0x20a857 + (_0xb4759a + "=" + _0x5e5180[_0xb4759a] + ";"));
  }
}
function _0x105eac(_0x1ae4b5, _0x58423b) {
  return {
    "url": "https://api.m.jd.com/client.action?functionId=" + _0x1ae4b5,
    "body": _0x58423b,
    "headers": {
      "Host": "api.m.jd.com",
      "accept": "*/*",
      "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x20a857
    }
  };
}
function _0x33e271() {
  let _0x4cb44d = {
    "url": "https://api.m.jd.com/client.action?functionId=genToken",
    "body": "&body=%7B%22to%22%3A%22https%3A%5C/%5C/lzdz-isv.isvjcloud.com%5C/dingzhi%5C/qqxing%5C/pasture%5C/activity?activityId%3D90121061401%22%2C%22action%22%3A%22to%22%7D&build=167588&client=apple&clientVersion=9.4.4&d_brand=apple&d_model=iPhone9%2C2&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=1805a3ab499eebc088fd9ed1c67f5eaf350856d4&osVersion=12.0&partner=apple&rfs=0000&scope=11&screen=1242%2A2208&sign=73af724a6be5f3cb89bf934dfcde647f&st=1624887881842&sv=111",
    "headers": {
      "Host": "api.m.jd.com",
      "accept": "*/*",
      "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x20a857
    }
  };
  return new Promise(_0x26d928 => {
    $.dpost(_0x4cb44d, async (_0x23680c, _0x55cbc6, _0x5f4a82) => {
      _0x476a9b(_0x55cbc6);
      try {
        _0x23680c ? (console.log($.name + " API请求失败，请检查网路重试"), console.log("" + JSON.stringify(_0x23680c))) : (_0x5f4a82 = JSON.parse(_0x5f4a82), $.isvToken = _0x5f4a82.tokenKey, _0x20a857 += "IsvToken=" + _0x5f4a82.tokenKey);
      } catch (_0xd8042e) {
        $.logErr(_0xd8042e, _0x55cbc6);
      } finally {
        _0x26d928(_0x5f4a82);
      }
    });
  });
}
async function _0x7c0353() {
  let _0x4d1515 = {
    "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
    "body": await _0x4151d1.getbody("isvObfuscator", {
      "id": "",
      "url": "https://lzdz-isv.isvjcloud.com"
    }),
    "headers": {
      "Host": "api.m.jd.com",
      "accept": "*/*",
      "user-agent": "JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)",
      "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x20a857
    }
  };
  return new Promise(_0x2da135 => {
    $.dpost(_0x4d1515, async (_0x11d0ef, _0xa31fc7, _0x437b1e) => {
      _0x476a9b(_0xa31fc7);
      try {
        _0x11d0ef ? (console.log("" + JSON.stringify(_0x11d0ef)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x437b1e = JSON.parse(_0x437b1e), $.token2 = _0x437b1e.token);
      } catch (_0x548191) {
        $.logErr(_0x548191, _0xa31fc7);
      } finally {
        _0x2da135(_0x437b1e);
      }
    });
  });
}
function _0x8587dd() {
  return new Promise(_0x3a23f1 => {
    $.dget(_0x4a47f2("/dingzhi/qqxing/pasture/activity", "activityId=90121061401"), (_0x24f6a7, _0x44be28, _0x3dba05) => {
      _0x476a9b(_0x44be28);
      try {
        if (_0x24f6a7) console.log($.name + " API请求失败，请检查网路重试");else {}
      } catch (_0x2ece6e) {
        $.logErr(_0x2ece6e, _0x44be28);
      } finally {
        _0x3a23f1(_0x3dba05);
      }
    });
  });
}
function _0x1c8f1a() {
  let _0x57fb05 = _0x1e25e6("/dz/common/getSimpleActInfoVo", "activityId=90121061401");
  return new Promise(_0x343b61 => {
    $.dpost(_0x57fb05, async (_0x6fc757, _0x959f17, _0xbd1c29) => {
      _0x476a9b(_0x959f17);
      try {
        _0x6fc757 ? (console.log("" + JSON.stringify(_0x6fc757)), console.log($.name + " API请求失败，请检查网路重试")) : (_0xbd1c29 = JSON.parse(_0xbd1c29), _0xbd1c29.result && ($.shopid = _0xbd1c29.data.shopId));
      } catch (_0x154865) {
        $.logErr(_0x154865, _0x959f17);
      } finally {
        _0x343b61(_0xbd1c29);
      }
    });
  });
}
function _0x33719d() {
  let _0x2a5a4d = _0x1e25e6("/dingzhi/bd/common/getMyPing", "userId=" + $.shopid + "&token=" + encodeURIComponent($.token2) + "&fromType=APP&activityId=90121061401");
  return new Promise(_0x310849 => {
    $.dpost(_0x2a5a4d, async (_0x2a20be, _0x53113a, _0x5abbda) => {
      _0x476a9b(_0x53113a);
      try {
        _0x2a20be ? (console.log("" + JSON.stringify(_0x2a20be)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x5abbda = JSON.parse(_0x5abbda), _0x5abbda.data && _0x5abbda.data.secretPin && ($.pin = _0x5abbda.data.secretPin, $.nickname = _0x5abbda.data.nickname, console.log("欢迎回来~  " + $.nickname)));
      } catch (_0x5c2783) {
        $.logErr(_0x5c2783, _0x53113a);
      } finally {
        _0x310849(_0x5abbda);
      }
    });
  });
}
function _0x45d389() {
  let _0x275bbd = _0x1e25e6("/common/accessLogWithAD", "venderId=1000361242&code=99&pin=" + encodeURIComponent($.pin) + "&activityId=90121061401&pageUrl=https%3A%2F%2Flzdz-isv.isvjcloud.com%2Fdingzhi%2Fqqxing%2Fpasture%2Factivity%3FactivityId%3D90121061401%26lng%3D107.146945%26lat%3D33.255267%26sid%3Dcad74d1c843bd47422ae20cadf6fe5aw%26un_area%3D27_2442_2444_31912&subType=app&adSource=");
  return new Promise(_0x13a312 => {
    $.dpost(_0x275bbd, async (_0x25b9a4, _0x2f16d6, _0x62cdce) => {
      _0x476a9b(_0x2f16d6);
      try {
        if (_0x25b9a4) console.log("" + JSON.stringify(_0x25b9a4)), console.log($.name + " API请求失败，请检查网路重试");else {
          if ($.isNode()) for (let _0x31303f of _0x2f16d6.headers["set-cookie"]) {
            _0x20a857 = _0x20a857 + "; " + _0x31303f.split(";")[0] + ";";
          } else for (let _0x2cd1bc of _0x2f16d6.headers["Set-Cookie"].split(",")) {
            _0x20a857 = _0x20a857 + "; " + _0x2cd1bc.split(";")[0] + ";";
          }
        }
      } catch (_0x1815f0) {
        $.logErr(_0x1815f0, _0x2f16d6);
      } finally {
        _0x13a312(_0x62cdce);
      }
    });
  });
}
function _0x460a2b() {
  return new Promise(_0x78561a => {
    let _0xda5339 = "pin=" + encodeURIComponent($.pin),
      _0x22f566 = _0x1e25e6("/wxActionCommon/getUserInfo", _0xda5339);
    $.dpost(_0x22f566, async (_0xa00452, _0x4aa2ae, _0xd4ba1) => {
      _0x476a9b(_0x4aa2ae);
      try {
        if (_0xa00452) console.log($.name + " API请求失败，请检查网路重试");else {
          _0xd4ba1 = JSON.parse(_0xd4ba1);
          if (_0xd4ba1.data) {
            $.userId = _0xd4ba1.data.id;
            $.pinImg = _0xd4ba1.data.yunMidImageUrl;
            $.nick = _0xd4ba1.data.nickname;
          } else $.cando = false;
        }
      } catch (_0x3a9862) {
        $.logErr(_0x3a9862, _0x4aa2ae);
      } finally {
        _0x78561a(_0xd4ba1);
      }
    });
  });
}
function _0x374dbf() {
  return new Promise(_0x62d344 => {
    let _0x137f75 = "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&pinImg=" + $.pinImg + "&nick=" + encodeURIComponent($.nick) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareuuid;
    $.dpost(_0x1e25e6("/dingzhi/qqxing/pasture/activityContent", _0x137f75), async (_0x2299c6, _0xfa7495, _0x24aa73) => {
      _0x476a9b(_0xfa7495);
      try {
        _0x2299c6 ? console.log($.name + " API请求失败，请检查网路重试") : (_0x24aa73 = JSON.parse(_0x24aa73), _0x24aa73.result && (_0x24aa73.data.openCardStatus != 3 && console.log("当前未开卡,无法助力和兑换奖励哦"), $.shareuuid = _0x24aa73.data.uid, console.log("\n【（" + $.UserName + "）的" + $.name + "互助码】" + $.shareuuid + "\n")));
      } catch (_0x26e582) {
        $.logErr(_0x26e582, _0xfa7495);
      } finally {
        _0x62d344(_0x24aa73);
      }
    });
  });
}
function _0xcdf94() {
  let _0xd6e90c = _0x1e25e6("/dingzhi/qqxing/pasture/myInfo", "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&pinImg=" + $.pinImg + "&nick=" + $.nick + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareuuid);
  return new Promise(_0x5d0eb1 => {
    $.dpost(_0xd6e90c, async (_0x105bbe, _0x559bfe, _0x6669de) => {
      _0x476a9b(_0x559bfe);
      try {
        if (_0x105bbe) console.log("" + JSON.stringify(_0x105bbe)), console.log($.name + " API请求失败，请检查网路重试");else {
          _0x6669de = JSON.parse(_0x6669de);
          if (_0x6669de.result) {
            $.taskList = _0x6669de.data.task.filter(_0x2a87a1 => _0x2a87a1.maxNeed == 1 && _0x2a87a1.curNum == 0 || _0x2a87a1.taskid == "interact");
            $.taskList2 = _0x6669de.data.task.filter(_0x5484a3 => _0x5484a3.maxNeed != 1 && _0x5484a3.type == 0);
            $.draw = _0x6669de.data.bags.filter(_0x43085c => _0x43085c.bagId == "drawchance")[0];
            $.food = _0x6669de.data.bags.filter(_0x11c553 => _0x11c553.bagId == "food")[0];
            $.sign = _0x6669de.data.bags.filter(_0x20550d => _0x20550d.bagId == "signDay")[0];
            $.score = _0x6669de.data.score;
            let _0x11387e = _0x6669de.data.task.filter(_0x3618e1 => _0x3618e1.taskid == "share2help")[0];
            _0x11387e && _0x11387e.curNum == 20 && ($.needhelp = false);
            $.cow = "当前🐮🐮成长值：" + $.score + "  饲料：" + ($.food.totalNum - $.food.useNum) + "  抽奖次数：" + ($.draw.totalNum - $.draw.useNum) + "  签到天数：" + $.sign.totalNum;
            $.foodNum = $.food.totalNum - $.food.useNum;
            console.log($.cow);
            $.drawchance = $.draw.totalNum - $.draw.useNum;
          } else {
            $.cando = false;
            console.log(_0x6669de.errorMessage);
          }
        }
      } catch (_0x151c73) {
        $.logErr(_0x151c73, _0x559bfe);
      } finally {
        _0x5d0eb1(_0x6669de);
      }
    });
  });
}
function _0x1df2d2() {
  return new Promise(_0x3a54b4 => {
    let _0x2264fa = "type=4&activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=" + $.uuid + "&userUuid=" + $.uuid;
    $.dpost(_0x1e25e6("/dingzhi/qqxing/pasture/getproduct", _0x2264fa), async (_0x4f585d, _0x134340, _0x30d552) => {
      _0x476a9b(_0x134340);
      try {
        _0x4f585d ? console.log($.name + " API请求失败，请检查网路重试") : (_0x30d552 = JSON.parse(_0x30d552), _0x30d552.data && _0x30d552.data[0] && ($.pparam = _0x30d552.data[0].id, $.vid = _0x30d552.data[0].venderId));
      } catch (_0x2d5146) {
        $.logErr(_0x2d5146, _0x134340);
      } finally {
        _0x3a54b4(_0x30d552);
      }
    });
  });
}
function _0x193fdd(_0x4f52ff) {
  return new Promise(_0x592f6d => {
    let _0x53b942 = "jdActivityId=1404370&pin=" + encodeURIComponent($.pin) + "&actionType=5&venderId=" + _0x4f52ff + "&activityId=90121061401";
    $.dpost(_0x1e25e6("/interaction/write/writePersonInfo", _0x53b942), async (_0x5d725f, _0x25520a, _0x2bfe56) => {
      _0x476a9b(_0x25520a);
      try {
        _0x5d725f ? console.log($.name + " API请求失败，请检查网路重试") : (console.log("浏览：" + $.vid), console.log(_0x2bfe56));
      } catch (_0x6d87d5) {
        $.logErr(_0x6d87d5, _0x25520a);
      } finally {
        _0x592f6d(_0x2bfe56);
      }
    });
  });
}
function _0x18f860(_0x39f608) {
  return new Promise(_0x389dca => {
    let _0x5965c8 = "pid=" + _0x39f608 + "&activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=&userUuid=";
    $.dpost(_0x1e25e6("/dingzhi/qqxing/pasture/exchange?_", _0x5965c8), async (_0xa776d3, _0x19d839, _0xf7db68) => {
      _0x476a9b(_0x19d839);
      try {
        _0xa776d3 ? console.log($.name + " API请求失败，请检查网路重试") : (_0xf7db68 = JSON.parse(_0xf7db68), _0xf7db68.result ? (console.log("兑换 " + _0xf7db68.data.rewardName + "成功"), $.exchange += 20) : console.log(_0xf7db68.errorMessage, "\n"));
      } catch (_0x4f8842) {
        $.logErr(_0x4f8842, _0x19d839);
      } finally {
        _0x389dca(_0xf7db68);
      }
    });
  });
}
function _0x12722e(_0x46fadc, _0x5ec5c6) {
  let _0x593e94 = _0x1e25e6("/dingzhi/qqxing/pasture/doTask", "taskId=" + _0x46fadc + "&" + (_0x5ec5c6 ? "param=" + _0x5ec5c6 + "&" : "") + "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=" + $.uuid + "&userUuid=" + $.shareuuid);
  return new Promise(_0x4c04ab => {
    $.dpost(_0x593e94, async (_0x40b2c2, _0x1a2a2f, _0x2addd9) => {
      _0x476a9b(_0x1a2a2f);
      try {
        _0x40b2c2 ? (console.log("" + JSON.stringify(_0x40b2c2)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x2addd9 = JSON.parse(_0x2addd9), _0x2addd9.result ? _0x2addd9.data.food && console.log("操作成功,获得饲料： " + _0x2addd9.data.food + "  抽奖机会：" + _0x2addd9.data.drawChance + "  成长值：" + _0x2addd9.data.growUp) : console.log(_0x2addd9.errorMessage));
      } catch (_0x508b9c) {
        $.logErr(_0x508b9c, _0x1a2a2f);
      } finally {
        _0x4c04ab(_0x2addd9);
      }
    });
  });
}
function _0x164ac7() {
  let _0x385be1 = _0x1e25e6("/dingzhi/qqxing/pasture/luckydraw", "activityId=90121061401&pin=" + encodeURIComponent($.pin) + "&actorUuid=&userUuid=");
  return new Promise(_0x2e634d => {
    $.dpost(_0x385be1, async (_0x5d6ef2, _0x476c9e, _0x3f4ef8) => {
      _0x476a9b(_0x476c9e);
      try {
        _0x5d6ef2 ? (console.log("" + JSON.stringify(_0x5d6ef2)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x3f4ef8 = JSON.parse(_0x3f4ef8), _0x3f4ef8.result ? Object.keys(_0x3f4ef8.data).length == 0 ? console.log("抽奖成功,获得空气 ") : (console.log("恭喜你抽中 " + _0x3f4ef8.data.prize.rewardName), $.drawresult += "恭喜你抽中 " + _0x3f4ef8.data.prize.rewardName + " ") : console.log(_0x3f4ef8.errorMessage));
      } catch (_0xb5caf4) {
        $.logErr(_0xb5caf4, _0x476c9e);
      } finally {
        _0x2e634d(_0x3f4ef8);
      }
    });
  });
}
function _0x4a47f2(_0x2ba9bb, _0x42540e) {
  return {
    "url": "https://lzdz-isv.isvjcloud.com" + _0x2ba9bb + "?" + _0x42540e,
    "headers": {
      "Host": "lzdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "Referer": "https://lzdz-isv.isvjcloud.com",
      "user-agent": $.UA,
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x20a857
    }
  };
}
function _0x1e25e6(_0x11d234, _0x4a3aa5) {
  return {
    "url": "https://lzdz-isv.isvjcloud.com" + _0x11d234,
    "body": _0x4a3aa5,
    "headers": {
      "Host": "lzdz-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Referer": "https://lzdz-isv.isvjcloud.com",
      "user-agent": $.UA,
      "content-type": "application/x-www-form-urlencoded",
      "Cookie": _0x20a857
    }
  };
}
function _0x55ab33(_0x356169) {
  if (typeof _0x356169 == "string") {
    try {
      return JSON.parse(_0x356169);
    } catch (_0x544eb7) {
      return console.log(_0x544eb7), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}