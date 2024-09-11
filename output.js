//Wed Sep 11 2024 17:56:26 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x3e0296 = $.isNode() ? require("./sendNotify") : "",
  _0x38d911 = $.isNode() ? require("./jdCookie.js") : "",
  _0x4df7de = require("./function/dylans"),
  _0xfb5daf = require("./USER_AGENTS"),
  _0x4e13bb = require("./function/dylib");
let _0x20f31b = true,
  _0x3d968b = [],
  _0x1c25a6 = [],
  _0x189a51 = [],
  _0x112971 = [],
  _0x2ef566 = {},
  _0x5b4791 = [],
  _0x3f21ca = "",
  _0x1f4426 = "",
  _0x2bd057 = "",
  _0x21478f = "",
  _0x405ea0;
const _0x46d00e = process.env.JDZHB2NUM || "9999";
const _0x2fb77f = process.env.JDZHB2LTNUM || "-1",
  _0x4e36ff = process.env.JDZHB2DELAY || "1",
  _0x5f005b = process.env.TXDELAY || "5",
  _0x409084 = process.env.HLDELAY || "1",
  _0x5bd159 = process.env.TXIVAL || "1",
  _0x54538e = process.env.JDZHB2TORED || false,
  _0x17dcaf = process.env.JDZHB2TOPPIN || "",
  _0x54c12c = process.env.TXSILENT || false;
const _0x8b1b2f = process.env.ZZHB2CODE || "",
  _0x5c7d4d = process.env.CXJLJQ_COUNT || "10",
  _0x5616aa = process.env.TX_MODE || "0",
  _0x1c1e4b = process.env.CXJHELP_NODRAW || false,
  _0x5d665e = process.env.NOTX ? process.env.NOTX : false;
if (process.env.DY_PROXY) {
  try {
    _0x2ef566 = require("./function/proxy.js");
    $.dget = _0x2ef566.intoRequest($.get.bind($));
    $.dpost = _0x2ef566.intoRequest($.post.bind($));
  } catch {
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
if ($.isNode()) {
  Object.keys(_0x38d911).forEach(_0x410f1b => {
    _0x5b4791.push(_0x38d911[_0x410f1b]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x5b4791 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x45006e($.getdata("CookiesJD") || "[]").map(_0x284fc6 => _0x284fc6.cookie)].filter(_0x8e2127 => !!_0x8e2127);
}
!(async () => {
  if (!_0x5b4791[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.log("\n❗❗❗每天1次助力次数，0点刷新❗❗❗");
  $.log("\n当前版本：20240822");
  console.log("执行流程，车头开团--助力車頭--車頭抽獎--車頭提現");
  console.log("TG频道：https://t.me/dylan_jdpro");
  $.log("\n环境变量清单（可选项）：");
  $.log("  指定PIN车头：不指定默认CK1  JDZHB2TOPPIN='jdpin'\n  指定助力CODE：都去助力TA  ZZHB2CODE='xxx'\n  多少助力停止：默认9999个  JDZHB2NUM='100'\n  抽奖次数：默认抽完  JDZHB2LTNUM='200'\n  抽奖间隔：默认1秒  JDZHB2DELAY='3'\n  提现间隔：默认5秒  TXDELAY='3'\n  助力间隔：默认1秒  HLDELAY='3'\n  提现模式：默认提当前，设置1查列表提现，TX_MODE='1'\n  提现范围：默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包：JDZHB2TORED='true'\n  支持代理API： DY_PROXY='apiurl'\n  垃圾券数量：默认10次，CXJLJQ_COUNT='20'\n  关闭抽奖：默认助力完车头自动抽奖，CXJHELP_NODRAW='true'\n  关闭提现：NOTX='true'\n");
  let _0x2561c8 = await _0x4b1223();
  if (_0x17dcaf) {
    console.log("\n已指定PIN：" + _0x17dcaf);
    let _0x5bddd5 = _0x5b4791.findIndex(_0x206670 => _0x206670.includes(_0x17dcaf));
    if (_0x5bddd5 == -1) {
      console.log("运行的CK中没找到指定的PIN，停止执行");
      return;
    }
    _0x1f4426 = _0x5b4791[_0x5bddd5];
  } else {
    console.log("\n未指定PIN默认CK1车头");
    _0x1f4426 = _0x5b4791[0];
  }
  _0x3f21ca = _0x1f4426;
  $.UserName = decodeURIComponent(_0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.UA = _0xfb5daf.UARAM ? _0xfb5daf.UARAM() : _0xfb5daf.USER_AGENT;
  console.log("\n————————————————————车头开团——————————————————————————");
  console.log("账号：" + ($.nickName || $.UserName));
  await _0x488c47();
  if (!$.isLogin) {
    const _0x20ee80 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x20ee80);
    $.isNode() && (await _0x3e0296.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
    return;
  }
  await _0x539068(1);
  await $.wait(1000);
  if (_0x2561c8.length != 0) {
    let _0xc881db = _0x2561c8[Math.floor(Math.random() * _0x2561c8.length)];
    console.log("车头去助力 -> 作者");
    $.UserName = decodeURIComponent(_0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0xfb5daf.UARAM ? _0xfb5daf.UARAM() : _0xfb5daf.USER_AGENT;
    let _0x49832 = await _0x4e13bb.jddToken($.UA);
    if (_0x49832) {
      $.apitoken = _0x49832.token;
    }
    await _0x29dd61(_0xc881db);
    await $.wait(2000);
  }
  console.log("——————————————————————————————————————————————————————");
  console.log("\n\n———————————开始助力车头(助力间隔" + _0x409084 + "秒)—————————————");
  if (_0x8b1b2f) {
    console.log("\n已指定助力CODE,那抛弃车头去助力TA");
    _0x3d968b = [];
    _0x3d968b.push(_0x8b1b2f);
  }
  _0x405ea0 = 0;
  for (let _0x3b594d of _0x3d968b) {
    if (_0x5b4791.length === 1) {
      console.log("");
      break;
    }
    console.log("\n去助力-> " + _0x3b594d);
    $.suc = 0;
    for (let _0xb6463c = _0x405ea0; _0xb6463c < _0x5b4791.length; _0xb6463c++) {
      if (_0x5b4791[_0xb6463c]) {
        _0x3f21ca = _0x5b4791[_0xb6463c];
        $.UserName = decodeURIComponent(_0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0xb6463c + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = _0xfb5daf.UARAM ? _0xfb5daf.UARAM() : _0xfb5daf.USER_AGENT;
        let _0x499d67 = await _0x4e13bb.jddToken($.UA);
        if (_0x499d67) {
          $.apitoken = _0x499d67.token;
        }
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await _0x29dd61(_0x3b594d);
        _0x2ef566.swip && (await _0x2ef566.swip());
        if ($.suc >= Number(_0x46d00e)) {
          $.log("已达目标助力数，跳出！");
          _0x405ea0 = _0xb6463c + 1;
          break;
        }
        await $.wait(_0x409084 * 1000);
      }
    }
    if ($.index === _0x5b4791.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }
  if (_0x1c1e4b == "true") {
    console.log("\n已设置不自动抽奖提现");
    return;
  }
  console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
  _0x2fb77f > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x2fb77f);
  let _0x47fe1b = new Date();
  _0x47fe1b.setDate(_0x47fe1b.getDate() - _0x5bd159);
  _0x3f21ca = _0x1f4426;
  $.UserName = decodeURIComponent(_0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f21ca.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.fail = 0;
  _0x1c25a6 = [];
  _0x189a51 = [];
  txjscore = [];
  $.txj = true;
  $.fg = 1;
  $.txfull = false;
  $.nocashnum = 0;
  $.end = false;
  $.hotflag = false;
  $.toredfailnum = 0;
  $.txjsuc = false;
  $.banip = false;
  $.xcrflag = 1;
  $.leftAmount = 0;
  $.txsuc = [];
  $.UA = _0xfb5daf.UARAM ? _0xfb5daf.UARAM() : _0xfb5daf.USER_AGENT;
  $.uuid = _0x4e13bb.UUID();
  let _0x4643bb = await _0x4e13bb.jddToken($.UA);
  if (_0x4643bb) {
    $.apitoken = _0x4643bb.token;
  }
  let _0x4b7b33 = await _0x539068(0);
  await $.wait(1000);
  if (_0x4b7b33.code != "0") {
    return;
  }
  $.log("本轮已抽奖次数：" + _0x4b7b33.data.drawPrizeNum);
  $.log("本轮剩余抽奖次数：" + $.times);
  if (_0x4b7b33.data.cashVo) {
    if (_0x4b7b33.data?.["cashVo"]?.["state"] === 1) {
      $.log("本轮提现金进度：" + _0x4b7b33.data.cashVo.amount + "/" + _0x4b7b33.data.cashVo.totalAmount + "(-" + _0x4b7b33.data.cashVo.leftAmount + ")");
    } else {
      _0x4b7b33.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x4b7b33.data.cashVo.totalAmount + " 🤑"), $.txj = false, $.txjsuc = true);
    }
  } else {
    $.txj = false;
  }
  $.log("本轮结束时间： " + _0x34ce70(new Date(Date.now() + _0x4b7b33.data.countDownTime)));
  for (let _0x432e4d = 0; _0x432e4d < (_0x2fb77f > -1 && _0x2fb77f < $.times ? _0x2fb77f : $.times); _0x432e4d++) {
    process.stdout.write("\n第" + (_0x432e4d + 1) + "次抽奖结果：");
    for (let _0x33c845 of Array(1)) {
      await _0x1faf4e(_0x33c845 + 1);
      if (!$.hotflag) {
        break;
      }
      await $.wait(Math.random() * 500 + _0x4e36ff * 1000);
    }
    if ($.banip || !$.isLogin) {
      break;
    }
    if ($.end) {
      console.log("\n本轮结束了，开启新一轮");
      let _0x577975 = await _0x539068(0);
      _0x577975.code == 0 && $.log("开启成功，结束时间： " + _0x34ce70(new Date(Date.now() + _0x577975.data.countDownTime)));
    }
    $.txj && (await _0x27fe00());
    await $.wait(Math.random() * 500 + _0x4e36ff * 1000);
    if ($.fail >= _0x5c7d4d) {
      $.log("连续垃圾券，不继续抽了");
      break;
    }
  }
  _0x189a51.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x189a51.reduce((_0xca7e86, _0x1baaf7) => _0xca7e86 + _0x1baaf7 * 100, 0) / 100 + "元");
  _0x1c25a6.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x1c25a6.reduce((_0x5b5a9a, _0x3fecf3) => _0x5b5a9a + _0x3fecf3 * 100, 0) / 100 + "元");
  if (txjscore.length !== 0) {
    let _0x1530b3 = txjscore.reduce((_0x25449e, _0x562444) => _0x25449e + _0x562444 * 100, 0) / 100,
      _0x2f609e = (_0x1530b3 / (_0x2fb77f > -1 ? Math.min.apply(null, [_0x2fb77f, $.times]) : $.times)).toFixed(4);
    $.log("\n\n本次抽奖获得提现金 " + _0x1530b3 + "个,还差 " + $.leftAmount + "个, 平均 " + _0x2f609e + "个/抽" + ($.leftAmount > 0 && $.leftAmount < "1.00" ? "，预计还需" + parseInt($.leftAmount / _0x2f609e) + "抽" : ""));
  }
  if (_0x5d665e != "true") {
    if (new Date().getHours() < 6 && _0x54c12c) {
      return;
    }
    $.log("\n——————————————开始提现（间隔" + _0x5f005b + "秒）————————————————");
    $.log("\n当前提现模式：" + (_0x5616aa == "1" ? _0x5bd159 + "天内历史" : "本次所抽现金"));
    $.log("上限转红包：" + (_0x54538e ? "开启" : "关闭(续期♻️)"));
    $.toredsuc = [];
    $.failtxlist = [];
    $.banip = false;
    if (_0x5616aa == "1") {
      for (let _0x662bf5 = 0; _0x662bf5 < 500; _0x662bf5++) {
        if ($.nocashnum > 2 || $.toredfailnum > 4 || $.banip) {
          break;
        }
        process.stdout.write("\n" + (_0x662bf5 + 1) + "页：");
        let _0x3b8292 = await _0x3af119(_0x662bf5 + 1);
        _0x3b8292 == "" && (await $.wait(5000), await _0x3af119(_0x662bf5 + 1));
        if (!$.baglist || $.baglist.length === 0) {
          break;
        }
        for (let _0x10e937 of $.baglist) {
          if (Math.max.apply(null, [new Date(_0x10e937.createTime), new Date(_0x10e937.startTime)]) < _0x47fe1b || $.toredfailnum > 4) {
            $.nocashnum = 5;
            break;
          }
          if (_0x10e937.prizeType == 4) {
            $.txfail = false;
            if (_0x10e937.state == 0 || _0x10e937.state == 2) {
              process.stdout.write("" + Number(_0x10e937.amount));
              let _0x207384 = await _0x266cf9(_0x10e937, Number(_0x10e937.amount));
              $.txfail && (await $.wait(5000), _0x207384 = await _0x266cf9(_0x10e937, Number(_0x10e937.amount)));
              if ($.txfail) {
                $.failtxlist.push(_0x10e937);
              }
              if (_0x207384.data?.["message"]?.["includes"]("上限") && _0x54538e == "true" && $.toredfailnum < 5) {
                await _0xddfa29(_0x10e937, Number(_0x10e937.amount));
              }
              await $.wait(_0x5f005b * 1000);
            } else {
              _0x10e937.state == 8;
            }
          }
        }
        await $.wait(3000);
      }
      $.banip = false;
      while ($.failtxlist.length > 0 && $.toredfailnum < 5) {
        console.log("\n" + $.failtxlist.length);
        for (let _0x601b3a = 0; _0x601b3a < $.failtxlist.length;) {
          let _0x283fa4 = $.failtxlist[_0x601b3a];
          if (_0x283fa4.prizeType == 4) {
            $.txfail = false;
            process.stdout.write("" + Number(_0x283fa4.amount));
            let _0xb8172d = await _0x266cf9(_0x283fa4, Number(_0x283fa4.amount));
            $.txfail && (await $.wait(5000), _0xb8172d = await _0x266cf9(_0x283fa4, Number(_0x283fa4.amount)));
            if ($.txfail) {
              _0x601b3a++;
            } else {
              $.failtxlist.splice(_0x601b3a, 1);
            }
            if (_0xb8172d.data.message.includes("上限") && _0x54538e == "true" && $.toredfailnum < 5) {
              await _0xddfa29(_0x283fa4, Number(_0x283fa4.amount));
            }
            await $.wait(_0x5f005b * 1000);
          }
        }
      }
    } else {
      for (let _0x2bf026 = 0; _0x2bf026 < 1; _0x2bf026++) {
        if ($.nocashnum > 2 || $.toredfailnum > 4) {
          break;
        }
        while (_0x112971.length > 0) {
          console.log("\n" + _0x112971.length);
          for (let _0x2c62cd = 0; _0x2c62cd < _0x112971.length;) {
            let _0x219b55 = _0x112971[_0x2c62cd];
            if (_0x219b55.prizeType == 4) {
              $.txfail = false;
              process.stdout.write("" + Number(_0x219b55.amount));
              let _0x4032f6 = await _0x266cf9(_0x219b55, Number(_0x219b55.amount));
              $.txfail && (await $.wait(5000), _0x4032f6 = await _0x266cf9(_0x219b55, Number(_0x219b55.amount)));
              if ($.txfail) {
                _0x2c62cd++;
              } else {
                _0x112971.splice(_0x2c62cd, 1);
              }
              if (_0x4032f6.data?.["message"]?.["includes"]("上限") && _0x54538e == "true" && $.toredfailnum < 5) {
                await _0xddfa29(_0x219b55, Number(_0x219b55.amount));
              }
              await $.wait(_0x5f005b * 1000);
            }
          }
          await $.wait(2000);
        }
      }
    }
    $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x4cc8ae, _0x481dea) => _0x4cc8ae + _0x481dea * 100, 0) / 100 + "元");
    $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x4628ac, _0x18ba5e) => _0x4628ac + _0x18ba5e * 100, 0) / 100 + "元");
  } else {
    $.log("\n\n⚠已设置不提现！");
  }
  _0x112971 = [];
  await $.wait(2000);
})().catch(_0x13791c => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x13791c + "!", "");
}).finally(() => {
  $.done();
});
async function _0x539068(_0x3a79f4) {
  const _0x2daf49 = {
    linkId: "wDNvX5t2N52cWEM8cLOa0g",
    inviter: ""
  };
  let _0x158aec = _0x2daf49,
    _0x2c8125 = {
      appId: "eb67b",
      functionId: "inviteFissionHome",
      fn: "inviteFissionHome",
      body: _0x158aec,
      appid: "activities_platform",
      apid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      ver: $.UA.split(";")[2],
      client: "ios",
      cl: "ios",
      user: $.UserName,
      t: Date.now(),
      code: 1,
      xcr: $.xcrflag,
      ua: $.UA
    };
  _0x158aec = await _0x4df7de.getbody(_0x2c8125);
  if (!_0x158aec) {
    return;
  }
  return new Promise(async _0x530430 => {
    $.dpost(_0x2699a3(_0x158aec), async (_0x330a6c, _0xc688e3, _0xd43b5f) => {
      try {
        if (_0x330a6c) {
          console.log("" + JSON.stringify(_0x330a6c));
          console.log("homeinfo请求失败，请检查网路重试");
        } else {
          _0xd43b5f = JSON.parse(_0xd43b5f);
          if (_0xd43b5f.code == 0) {
            $.times = _0xd43b5f.data.prizeNum;
            if (_0x3a79f4) {
              console.log("我的助力码：" + _0xd43b5f.data.inviter);
            }
            _0x3d968b.push(_0xd43b5f.data.inviter);
          } else {
            console.log(_0xd43b5f.errMsg);
          }
        }
      } catch (_0xd68445) {
        $.logErr(_0xd68445, _0xc688e3);
      } finally {
        _0x530430(_0xd43b5f);
      }
    });
  });
}
async function _0x27fe00() {
  const _0x1a05c8 = {
    linkId: "wDNvX5t2N52cWEM8cLOa0g"
  };
  let _0x2ab2cc = _0x1a05c8,
    _0x513c3e = {
      appId: "b8469",
      functionId: "inviteFissionReceive",
      fn: "inviteFissionReceive",
      body: _0x2ab2cc,
      appid: "activities_platform",
      apid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      ver: $.UA.split(";")[2],
      client: "ios",
      cl: "ios",
      user: $.UserName,
      t: Date.now(),
      code: 1,
      xcr: $.xcrflag,
      ua: $.UA
    };
  $.xcrflag == 1 && ($.xcrflag = 0);
  _0x2ab2cc = await _0x4df7de.getbody(_0x513c3e);
  if (!_0x2ab2cc) {
    return;
  }
  return new Promise(async _0x34db33 => {
    $.dpost(_0x2699a3(_0x2ab2cc), async (_0xbbf17c, _0xded2a0, _0x48e1d7) => {
      try {
        if (_0xbbf17c) {
          console.log("" + JSON.stringify(_0xbbf17c));
          console.log("receive请求失败，请检查网路重试");
          _0xbbf17c.includes("403") && ($.banip = true);
        } else {
          _0x48e1d7 = JSON.parse(_0x48e1d7);
          if (_0x48e1d7.code == 0) {
            process.stdout.write("----提现金" + _0x48e1d7.data.amount + "(+" + _0x48e1d7.data.receiveList[0].amount + ")");
            txjscore.push(_0x48e1d7.data.receiveList[0].amount);
            if (_0x48e1d7.data?.["state"] == 3) {
              process.stdout.write("----恭喜达成");
              if (_0x48e1d7.data.cashRecord) {
                let _0x26940e = _0x48e1d7.data.cashRecord;
                process.stdout.write(" 提现" + Number(_0x26940e.amount) + "元");
                await _0x266cf9(_0x26940e, Number(_0x26940e.amount));
              }
              $.txj = false;
              $.txjsuc = true;
            }
            $.leftAmount = _0x48e1d7.data.leftAmount;
          } else {
            if (_0x48e1d7.code == 80208) {
              process.stdout.write("----送的抽奖次数没有提现金");
            } else {
              if (_0x48e1d7.code == 80209) {
                process.stdout.write("----完成标识");
                $.txj = false;
              } else {
                console.log(JSON.stringify(_0x48e1d7));
              }
            }
          }
        }
      } catch (_0x4dabea) {
        $.logErr(_0x4dabea, _0xded2a0);
      } finally {
        _0x34db33(_0x48e1d7);
      }
    });
  });
}
async function _0x1faf4e(_0x17c01e) {
  const _0x3df478 = {
    linkId: "wDNvX5t2N52cWEM8cLOa0g"
  };
  let _0x141d32 = _0x3df478,
    _0x453d4a = {
      appId: "c02c6",
      functionId: "inviteFissionDrawPrize",
      fn: "inviteFissionDrawPrize",
      body: _0x141d32,
      appid: "activities_platform",
      apid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      ver: $.UA.split(";")[2],
      client: "ios",
      cl: "ios",
      user: $.UserName,
      t: Date.now(),
      code: 1,
      xcr: $.xcrflag,
      ua: $.UA
    };
  $.xcrflag == 1 && ($.xcrflag = 0);
  _0x141d32 = await _0x4df7de.getbody(_0x453d4a);
  if (!_0x141d32) {
    return;
  }
  return new Promise(async _0x2dfc7b => {
    $.dpost(_0x2699a3(_0x141d32), async (_0x3d6731, _0x53ca6f, _0x5656c8) => {
      try {
        if (_0x3d6731) {
          console.log("" + JSON.stringify(_0x3d6731));
          console.log("lottery请求失败，请检查网路重试");
          _0x3d6731.includes("403") && ($.banip = true);
        } else {
          _0x5656c8 = JSON.parse(_0x5656c8);
          if (_0x5656c8.code == 0) {
            const _0x28a585 = _0x5656c8.data.prizeType;
            if (!_0x28a585) {
              fail++;
            }
            switch (_0x28a585) {
              case 1:
                process.stdout.write("垃.圾.券⚫");
                $.txjsuc && $.fail++;
                $.fail++;
                $.hotflag = false;
                break;
              case 4:
                let _0x33b352 = parseFloat(_0x5656c8.data.prizeValue).toFixed(2);
                process.stdout.write(_0x33b352 + "现金💰️");
                _0x1c25a6.push(_0x33b352);
                const _0x206c90 = {
                  prizeValue: _0x5656c8.data.prizeValue,
                  id: _0x5656c8.data.id,
                  poolBaseId: _0x5656c8.data.poolBaseId,
                  prizeGroupId: _0x5656c8.data.prizeGroupId,
                  prizeBaseId: _0x5656c8.data.prizeBaseId,
                  prizeType: _0x5656c8.data.prizeType,
                  amount: _0x5656c8.data.amount
                };
                _0x112971.push(_0x206c90);
                $.fail = 0;
                $.hotflag = false;
                break;
              case 2:
                let _0x1850be = parseFloat(_0x5656c8.data.prizeValue).toFixed(2);
                process.stdout.write(_0x1850be + "红包🧧");
                _0x189a51.push(_0x1850be);
                $.fail = 0;
                $.hotflag = false;
                break;
              default:
                $.hotflag = false;
                console.log(JSON.stringify(_0x5656c8.data));
            }
          } else {
            if (_0x5656c8.errMsg.includes("火爆")) {
              process.stdout.write("未中奖 ");
              $.hotflag = true;
            } else {
              if (_0x5656c8.errMsg.includes("结束")) {
                $.end = true;
                $.hotflag = false;
                console.log(_0x5656c8.errMsg);
              } else {
                _0x5656c8.errMsg.includes("未登录") ? ($.isLogin = false, $.hotflag = false, console.log(_0x5656c8.errMsg)) : ($.hotflag = false, console.log(_0x5656c8.errMsg));
              }
            }
          }
        }
      } catch (_0x32aa5a) {
        $.logErr(_0x32aa5a, _0x53ca6f);
      } finally {
        _0x2dfc7b(_0x5656c8);
      }
    });
  });
}
async function _0x3af119(_0x48b90d) {
  const _0x332c59 = {
    pageNum: _0x48b90d,
    pageSize: 100,
    linkId: "wDNvX5t2N52cWEM8cLOa0g",
    business: "fission"
  };
  let _0x41e46d = _0x332c59,
    _0x3d1913 = {
      appId: "f2b1d",
      functionId: "superRedBagList",
      fn: "superRedBagList",
      body: _0x41e46d,
      appid: "activities_platform",
      apid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      ver: $.UA.split(";")[2],
      client: "ios",
      cl: "ios",
      user: $.UserName,
      t: Date.now(),
      code: 1,
      xcr: $.xcrflag,
      ua: $.UA
    };
  $.xcrflag == 1 && ($.xcrflag = 0);
  _0x41e46d = await _0x4df7de.getbody(_0x3d1913);
  if (!_0x41e46d) {
    return;
  }
  const _0x4d3361 = {
    url: "https://api.m.jd.com/api",
    body: _0x41e46d + "&loginType=2&loginWQBiz=wegame&uuid=" + $.uuid + "&build=169088&screen=414*736&networkType=wifi&d_brand=iPhone&d_model=iPhone10,2&lang=zh_CN&osVersion=&partner=-1&cthr=1",
    headers: {},
    ciphers: _0x4e13bb.cpstr
  };
  _0x4d3361.headers.Accept = "application/json, text/plain, */*";
  _0x4d3361.headers["x-rp-client"] = "h5_1.0.0";
  _0x4d3361.headers["Accept-Language"] = "zh-cn";
  _0x4d3361.headers["Accept-Encoding"] = "gzip, deflate, br";
  _0x4d3361.headers["Content-Type"] = "application/x-www-form-urlencoded";
  _0x4d3361.headers.Origin = "https://pro.m.jd.com";
  _0x4d3361.headers["User-Agent"] = $.UA;
  _0x4d3361.headers.Referer = "https://pro.m.jd.com/";
  _0x4d3361.headers["x-referer-page"] = "https://pro.m.jd.com/";
  _0x4d3361.headers["request-from"] = "native";
  _0x4d3361.headers.Cookie = _0x3f21ca;
  return new Promise(async _0x1b84ef => {
    $.dpost(_0x4d3361, async (_0x1d44ff, _0x9828c9, _0x463caa) => {
      try {
        _0x1d44ff ? (console.log("" + JSON.stringify(_0x1d44ff)), console.log(" API请求失败，请检查网路重试"), _0x1d44ff.includes("403") && ($.banip = true), _0x463caa = "") : (_0x463caa = JSON.parse(_0x463caa), _0x463caa.code == 0 ? $.baglist = _0x463caa.data.items : console.log(_0x463caa.errMsg));
      } catch (_0x23a9b8) {
        $.logErr(_0x23a9b8, _0x9828c9);
      } finally {
        _0x1b84ef(_0x463caa);
      }
    });
  });
}
async function _0x29dd61(_0x25d533) {
  const _0x8a9411 = {
    linkId: "wDNvX5t2N52cWEM8cLOa0g",
    isJdApp: true,
    inviter: _0x25d533
  };
  let _0x229d2c = _0x8a9411,
    _0x2c4059 = {
      appId: "c5389",
      functionId: "inviteFissionhelp",
      fn: "inviteFissionhelp",
      body: _0x229d2c,
      appid: "activities_platform",
      apid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      ver: $.UA.split(";")[2],
      client: "ios",
      cl: "ios",
      user: $.UserName,
      t: Date.now(),
      code: 1,
      xcr: 1,
      ua: $.UA
    };
  _0x229d2c = await _0x4df7de.getbody(_0x2c4059);
  if (!_0x229d2c) {
    return;
  }
  return new Promise(async _0x5769d6 => {
    $.dpost(_0x2699a3(_0x229d2c), async (_0x45cdd6, _0x38ca48, _0x20f4c6) => {
      try {
        if (_0x45cdd6) {
          console.log("" + JSON.stringify(_0x45cdd6));
          console.log("help请求失败，请检查网路重试");
          _0x45cdd6.includes("403") && ($.banip = true);
        } else {
          _0x20f4c6 = JSON.parse(_0x20f4c6);
          if (_0x20f4c6.code == 0) {
            if (!_0x20f4c6.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }
            if (_0x20f4c6.data.helpResult == 1) {
              $.suc++;
              console.log("结果：助力成功 ✅ " + ($.suc || ""));
            } else {
              if (_0x20f4c6.data.helpResult == 6) {
                console.log("结果：已经助力过TA！");
              } else {
                if (_0x20f4c6.data.helpResult == 3) {
                  console.log("结果：没有次数！");
                } else {
                  if (_0x20f4c6.data.helpResult == 2) {
                    $.log("结果：太火爆了 💣");
                    $.hot = true;
                  } else {
                    if (_0x20f4c6.data.helpResult == 4) {
                      $.log("结果：没有助力次数！");
                    } else {
                      _0x20f4c6.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log("结果：" + _0x20f4c6.data?.["helpResult"]);
                    }
                  }
                }
              }
            }
          } else {
            console.log(_0x20f4c6.errMsg);
          }
        }
      } catch (_0x210995) {
        $.logErr(_0x210995, _0x38ca48);
      } finally {
        _0x5769d6(_0x20f4c6);
      }
    });
  });
}
async function _0x266cf9(_0x2b04e5, _0x290405) {
  let _0xc4cd70 = "functionId=apCashWithDraw&body={\"linkId\":\"wDNvX5t2N52cWEM8cLOa0g\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x2b04e5.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x2b04e5.poolBaseId + ",\"prizeGroupId\":" + _0x2b04e5.prizeGroupId + ",\"prizeBaseId\":" + _0x2b04e5.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  const _0x3bfbd2 = {
    Host: "api.m.jd.com",
    Origin: "https://pro.m.jd.com",
    Referer: "https://pro.m.jd.com/",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    Cookie: _0x3f21ca
  };
  const _0x22a356 = {
    url: "https://api.m.jd.com/api",
    body: _0xc4cd70,
    headers: _0x3bfbd2
  };
  return new Promise(async _0x16c7a1 => {
    $.dpost(_0x22a356, async (_0x556d36, _0x5bee82, _0x4923a0) => {
      try {
        if (_0x556d36) {
          console.log("" + JSON.stringify(_0x556d36));
          console.log("apCashWithDraw请求失败，请检查网路重试");
          _0x556d36.includes("403") && ($.banip = true);
        } else {
          _0x4923a0 = JSON.parse(_0x4923a0);
          if (_0x4923a0.code == 0) {
            if (_0x4923a0.data.message.indexOf("待发放") > -1) {
              process.stdout.write("" + (!$.txfail ? "❌" : "❌ "));
              $.txfail = true;
            } else {
              if (_0x4923a0.data.message.includes("上限")) {
                !_0x54538e && process.stdout.write("♻️ ");
                $.txfull = true;
                $.txfail = false;
              } else {
                _0x4923a0.data.message.includes("提现") ? (process.stdout.write("✔️ "), $.txsuc.push(_0x290405), $.txfail = false) : console.log(_0x4923a0.data.message);
              }
            }
          } else {
            console.log(_0x4923a0.errMsg);
          }
        }
      } catch (_0x50e83c) {
        $.logErr(_0x50e83c, _0x5bee82);
      } finally {
        _0x16c7a1(_0x4923a0 || "");
      }
    });
  });
}
async function _0xddfa29(_0x389ab0, _0x27a586) {
  let _0x14289d = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x389ab0.id + ",\"business\":\"fission\",\"poolId\":" + _0x389ab0.poolBaseId + ",\"prizeGroupId\":" + _0x389ab0.prizeGroupId + ",\"prizeId\":" + _0x389ab0.prizeBaseId + ",\"linkId\":\"wDNvX5t2N52cWEM8cLOa0g\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  const _0x27dcbc = {
    Host: "api.m.jd.com",
    Origin: "https://pro.m.jd.com",
    Referer: "https://pro.m.jd.com/",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    Cookie: _0x3f21ca
  };
  const _0x9f90c9 = {
    url: "https://api.m.jd.com/api",
    body: _0x14289d,
    headers: _0x27dcbc
  };
  return new Promise(async _0x44da81 => {
    $.dpost(_0x9f90c9, async (_0x40901d, _0x47c8fb, _0x3ef9c4) => {
      try {
        if (_0x40901d) {
          console.log("" + JSON.stringify(_0x40901d));
          console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
          _0x40901d.includes("403") && ($.banip = true);
        } else {
          _0x3ef9c4 = JSON.parse(_0x3ef9c4);
          if (_0x3ef9c4.code == 0) {
            _0x3ef9c4.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x27a586)) : (process.stdout.write("❎ "), $.toredfailnum++);
          } else {
            _0x3ef9c4.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x3ef9c4.errMsg);
          }
        }
      } catch (_0x41c59c) {
        $.logErr(_0x41c59c, _0x47c8fb);
      } finally {
        _0x44da81(_0x3ef9c4);
      }
    });
  });
}
function _0x2699a3(_0x1db7d5) {
  const _0x18da0a = {
    url: "https://api.m.jd.com/api?&loginType=2&loginWQBiz=wegame&" + _0x1db7d5 + "&x-api-eid-token=" + $.apitoken,
    headers: {}
  };
  _0x18da0a.headers.Accept = "application/json, text/plain, */*";
  _0x18da0a.headers["x-rp-client"] = "h5_1.0.0";
  _0x18da0a.headers["Content-type"] = "application/x-www-form-urlencoded";
  _0x18da0a.headers["User-Agent"] = $.UA;
  _0x18da0a.headers["x-referer-page"] = "https://pro.m.jd.com/mall/active/B2Y13x641hwWfpsoRenCzfbz4jR/index.html";
  _0x18da0a.headers.Origin = "https://pro.m.jd.com";
  _0x18da0a.headers["X-Requested-With"] = "com.jingdong.app.mall";
  _0x18da0a.headers.Referer = "https://pro.m.jd.com/mall/active/B2Y13x641hwWfpsoRenCzfbz4jR/index.html";
  _0x18da0a.headers["Accept-Encoding"] = "gzip, deflate, br";
  _0x18da0a.headers["Accept-language"] = "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7";
  _0x18da0a.headers.Cookie = _0x3f21ca;
  return _0x18da0a;
}
function _0x488c47() {
  return new Promise(_0x2d36f0 => {
    const _0x1de782 = {
      Cookie: _0x3f21ca,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x378d8f = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x1de782,
      timeout: 10000
    };
    $.get(_0x378d8f, (_0x27ebb2, _0x48b13d, _0x258002) => {
      try {
        if (_0x258002) {
          _0x258002 = JSON.parse(_0x258002);
          if (!(_0x258002.islogin === "1")) {
            _0x258002.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x4a039c) {
        console.log(_0x4a039c);
      } finally {
        _0x2d36f0();
      }
    });
  });
}
function _0x53c2b9() {
  return new Promise(_0x1f7115 => {
    !_0x20f31b ? $.msg($.name, "", "" + _0x2bd057) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x2bd057);
    _0x1f7115();
  });
}
function _0xdb3f63(_0x33e063) {
  try {
    if (typeof JSON.parse(_0x33e063) == "object") {
      return true;
    }
  } catch (_0x235d2e) {
    console.log(_0x235d2e);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x4b1223() {
  const _0xc9203e = {
    url: "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/zzhb2",
    timeout: 30000
  };
  return new Promise(_0x141f81 => {
    $.get(_0xc9203e, async (_0x540297, _0x4e9637, _0x5f1a34) => {
      try {
        if (_0x540297) {
          console.log("\n服务连接失败，终止执行！");
          process.exit(111);
        } else {
          if (_0x5f1a34) {
            _0x5f1a34 = JSON.parse(_0x5f1a34);
            if (_0x5f1a34.code === 200) {
              _0x21478f = _0x5f1a34.data;
            }
          }
        }
      } catch (_0x514104) {
        $.logErr(_0x514104, _0x4e9637);
      } finally {
        _0x141f81(_0x21478f);
      }
    });
  });
}
function _0x34ce70(_0x353676) {
  const _0x5b915e = _0x353676.getFullYear(),
    _0x51eb44 = ("0" + (_0x353676.getMonth() + 1)).slice(-2),
    _0x50bc5d = ("0" + _0x353676.getDate()).slice(-2),
    _0x5dbbf0 = ("0" + _0x353676.getHours()).slice(-2);
  const _0x1d1aeb = ("0" + _0x353676.getMinutes()).slice(-2);
  const _0x2c413e = ("0" + _0x353676.getSeconds()).slice(-2);
  return _0x5b915e + "/" + _0x51eb44 + "/" + _0x50bc5d + " " + _0x5dbbf0 + ":" + _0x1d1aeb + ":" + _0x2c413e;
}
function _0x45006e(_0x492782) {
  if (typeof _0x492782 == "string") {
    try {
      return JSON.parse(_0x492782);
    } catch (_0x427a3d) {
      console.log(_0x427a3d);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
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
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
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
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}