//Sat Aug 17 2024 13:44:44 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  {
    H5st,
    jsTk
  } = require("./utils/Rebels_H");
let red618_url = process.env.jd_818_url || "",
  redshareId = (process.env.jd_818_ids || "").split(/[,@\n]+/g).map(liIiiiII => liIiiiII.trim()).filter(Boolean),
  maxdraw = process.env.jd_818_maxdraw || "1",
  taskThreads = process.env.jd_818_threads || "1";
const runInterval = process.env.jd_818_interval || "2000",
  isNotify = (process.env.jd_818_notify || process.env.jd_818_Notify) === "true",
  pinFilter = (process.env.jd_818_pinFilter || "").split("@"),
  endTime = 1723996799000,
  maxThreads = 5;
let unionActId = "31182",
  actId,
  Referer,
  cookiesArr = Object.keys(jdCookie).map(i1I1i1il => jdCookie[i1I1i1il]).filter(IiiIi1iI => IiiIi1iI);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
const prize_map = {
  1: "[红包]",
  3: "[优惠券]",
  6: "[打折券]",
  17: "[立减券]",
  18: "[实物]",
  19: "[超市卡]"
};
!(async () => {
  notify.config({
    "title": $.name
  });
  await Main();
  if (isNotify && notify.getMessage()) {
    await notify.push();
  }
})().catch(lllIi1II => $.logErr(lllIi1II)).finally(() => $.done());
async function Main() {
  try {
    try {
      const l11Ill = parseInt(taskThreads);
      l11Ill > 0 && l11Ill !== 1 && (taskThreads = l11Ill);
    } catch {
      taskThreads = 1;
    }
    taskThreads = Math.min(taskThreads, maxThreads);
    $.waitTime = null;
    if (runInterval) {
      try {
        const lIIii1I = parseInt(runInterval);
        if (lIIii1I >= 0) {
          $.waitTime = lIIii1I;
        }
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }
    $.nowTime = Date.now();
    const iili1lI = $.time("yyyy-MM-dd HH:mm", endTime);
    if (endTime && $.nowTime > endTime) {
      console.log("活动已于 " + iili1lI + " 结束，下次早点来吧~");
      return;
    }
    console.log("==========" + $.name + "变量开启状态==========");
    console.log("间隔时长: [" + $.waitTime / 1000 + "秒]运行间隔时长");
    console.log("代理开关: [" + common.getProxyStatus() + "]");
    console.log("通知推送: [" + (isNotify ? "开启" : "关闭") + "]");
    console.log("账号过滤: [" + pinFilter.join(", ") + "]");
    console.log("==========" + $.name + "变量状态结束==========");
    console.log("");
    const Iii1111I = "jd_" + common.genRandomString(13, "0123456789abcdefghijklmnopqrstuvwxyz");
    $.UA = common.genUA(Iii1111I);
    if (/https:\/\/u\.jd\.com\/.+/.test(red618_url)) {
      if (red618_url.split("/").pop()) {
        red618_url = red618_url.split("/").pop().split("?").shift();
        if (red618_url.length !== 7) {
          console.log("链接后面的字符必须为7位字符");
          console.log("你填写的链接为：" + red618_url);
          console.log("请尽快修正，可尝试重启容器，默认继续运行");
          red618_url = "";
        }
      } else console.log("请填写正确的链接"), console.log("你填写的链接为：" + red618_url), console.log("请尽快修正，可尝试重启容器，默认继续运行"), red618_url = "";
    } else red618_url.length === 7 ? red618_url = red618_url : red618_url = "";
    authorCodeList = await getAuthorCodeList("https://updateteam.oss-cn-hangzhou.aliyuncs.com/red18.json");
    authorCodeList ? $.authorCode = authorCodeList[random(0, authorCodeList.length)] : console.log("无法获取邀请码");
    $.red618code = red618_url ? red618_url : $.authorCode;
    $.red618_url = "https://u.jd.com/" + $.red618code;
    red618_url && (console.log("邀请链接: " + $.red618_url), console.log("邀请码: " + $.red618code));
    console.log("");
    $.needRemoveCookieIndex = [];
    await common.concTask(taskThreads, cookiesArr, taskFnc);
    $.runEnd = false;
    $.needRemoveCookieIndex.length > 0 && (cookiesArr = cookiesArr.filter((lI1i1iii, lIl1Il1) => !$.needRemoveCookieIndex.includes(lIl1Il1 + 1)), $.needRemoveCookieIndex = []);
    const I1l111I1 = notify.getMessage();
    I1l111I1 && console.log("\n📣 运行结果\n" + I1l111I1.replace(/：/g, " ➜ "));
  } catch (I11llIII) {
    console.log("❌ 脚本运行遇到了错误\n" + I11llIII);
  }
}
async function taskFnc(lI1IilI, iil1l1I1) {
  if ($.runEnd) return {
    "runEnd": true
  };
  const l1l1Illi = decodeURIComponent(common.getCookieValue(lI1IilI, "pt_pin")),
    Ii1il1Il = "【账号" + iil1l1I1 + "】" + common.dataMasking(l1l1Illi, {
      "printWidth": 6
    }) + "：",
    l1IIiII = notify.create(iil1l1I1, l1l1Illi);
  if (pinFilter.length > 0 && (pinFilter.includes(l1l1Illi) || pinFilter.includes(encodeURIComponent(l1l1Illi)))) {
    l1IIiII.fix("已设置跳过运行当前账号");
    console.log(l1IIiII.getInlineContent());
    $.needRemoveCookieIndex.push(iil1l1I1);
    return;
  }
  const lIllil1 = await common.getLoginStatus(lI1IilI);
  if (!lIllil1 && typeof lIllil1 === "boolean") {
    console.log(Ii1il1Il + "账号无效");
    $.needRemoveCookieIndex.push(iil1l1I1);
    return;
  }
  let iIIiIII1 = false,
    i1Iiil11 = $.red618code,
    l1l1ilII,
    lliIiI11,
    I1i1ili1;
  const iIi1lI1l = common.genUA(l1l1Illi),
    liI1l1i = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1",
    lI1i11I = llilIli1 => llilIli1.split("").reduce((IllI1iil, iiliilI1) => {
      return IllI1iil = (IllI1iil << 5) - IllI1iil + iiliilI1.charCodeAt(0), IllI1iil & IllI1iil;
    }, 0),
    llill = [...new Set(redshareId)];
  llill.length > 0 ? l1l1ilII = llill[Math.floor(Math.random() * llill.length)] : l1l1ilII = "";
  Referer = "https://pro.m.jd.com/mall/active/3GriExsopKWEjptvv33rYCcDgUwK/index.html";
  for (let II1liII1 = 0; II1liII1 < maxdraw; II1liII1++) {
    let iIIl11l = IiiIillI();
    lliIiI11 = "__jda=" + iIIl11l.jda + ";__jdb=" + iIIl11l.jdb + ";__jdc=" + iIIl11l.jdc + ";__jdv=" + iIIl11l.jdv + ";shshshfpa=" + iIIl11l.shshshfpa + ";mba_sid=" + iIIl11l.mba_sid + ";mba_muid=" + iIIl11l.mba_muid + ";pre_seq=" + iIIl11l.pre_seq + ";pre_session=" + iIIl11l.pre_session + ";";
    ss = await llIII1i($.red618_url);
    if (ss) {
      let lliIl1il = ss?.["match"](/(https:\/\/u\.jd\.com\/jda[^']+)/);
      lliIl1il ? ($.hrl = lliIl1il[1], await iliIlilI(lliIl1il[1])) : (console.log(Ii1il1Il + "没有获取到跳转链接"), iIIiIII1 = true);
    } else {
      console.log(Ii1il1Il + "链接失败");
      iIIiIII1 = true;
    }
    let l1IiI1iI = await jsTk(iIi1lI1l, "https://pro.m.jd.com/mall/active/" + actId + "/index.html", {
      "bizId": "jd-babelh5",
      "v": "3.2.1.1",
      "qs": "stath=20&navh=44&tttparams=MiCEMF2eyJnTGF0IjoiMjkuNjA2OTI3IiwidW5fYXJlYSI6IjRfNTA5NTBfNTA5NTdfMCIsImRMYXQiOiIiLCJwcnN0YXRlIjoiMCIsImFkZHJlc3NJZCI6IjYyNzEwMzg4MDYiLCJsYXQiOiIiLCJwb3NMYXQiOiIyOS42MDY5MjciLCJwb3NMbmciOiIxMDYuNTY2NzEyIiwiZ3BzX2FyZWEiOiIwXzBfMF8wIiwibG5nIjoiIiwidWVtcHMiOiIwLTAtMCIsImdMbmciOiIxMDYuNTY2NzEyIiwibW9kZWwiOiJpUGhvbmU4LDIiLCJkTG5nIjoiIn70%3D&utm_source=kong&utm_term=626e4b23b76a4568aa45f7b551b5c4ef&d=kizfKM1&useNewLoad=1&uabt=384_3901_1_0-385_3902_1_0&utm_medium=jingfen&cu"
    });
    I1i1ili1 = l1IiI1iI.jsToken;
    await lilillIi("getCoupons");
    if (iIIiIII1 || $.runEnd) break;
    if ($.waitTime) await $.wait($.waitTime);
  }
  if ($.runEnd) return {
    "runEnd": true
  };
  if ($.waitTime) await $.wait($.waitTime);
  async function llIII1i(i1iI1iii) {
    const IIillIIi = await common.request({
        "url": i1iI1iii,
        "method": "GET",
        "headers": {
          "Cookie": lI1IilI,
          "User-Agent": liI1l1i
        },
        "proxy": null,
        "debug": false,
        "timeout": 30000
      }),
      liiilliI = IIillIIi.data;
    let iIliiill = IIillIIi && IIillIIi.headers && (IIillIIi.headers["set-cookie"] || IIillIIi.headers["Set-Cookie"] || "") || "";
    if (iIliiill) for (let i1lI1i1I of iIliiill) {
      let IlIII1Ii = i1lI1i1I.split(";")[0].trim();
      if (IlIII1Ii.split("=")[1]) {
        if (lliIiI11.indexOf(IlIII1Ii.split("=")[1]) == -1) lliIiI11 += IlIII1Ii.replace(/ /g, "") + "; ";
      }
    }
    return liiilliI;
  }
  async function iliIlilI(iii1iII1) {
    const lI11lili = await common.request({
      "url": iii1iII1 + ("&h5st=" + lI1i11I(liI1l1i)),
      "maxRedirects": 0,
      "method": "GET",
      "headers": {
        "Cookie": lliIiI11 + " " + lI1IilI,
        "User-Agent": liI1l1i,
        "Referer": $.red618_url
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    });
    let II111I1i = lI11lili.headers;
    if (II111I1i?.["location"]) {
      let lII1 = II111I1i.location;
      actId = lII1.match(/\/active\/(\w+)\/index/)?.[1];
      Referer = lII1;
    }
    let ill1l11l = lI11lili && lI11lili.headers && (lI11lili.headers["set-cookie"] || lI11lili.headers["Set-Cookie"] || "") || "";
    if (ill1l11l) for (let Il1III1i of ill1l11l) {
      let IlI1III1 = Il1III1i.split(";")[0].trim();
      if (IlI1III1.split("=")[1]) {
        if (lliIiI11.indexOf(IlI1III1.split("=")[1]) == -1) lliIiI11 += IlI1III1.replace(/ /g, "") + "; ";
      }
    }
    return lliIiI11;
  }
  function IiiIillI() {
    let iiIIl1ll = "123",
      iiIiIll1 = "1",
      l11iI1 = parseInt(Date.now() / 1000).toString(),
      liIiilIi = l11iI1 + parseInt(2147483647 * Math.random()).toString(),
      lli1lIiI = [iiIIl1ll, liIiilIi, l11iI1, l11iI1, l11iI1, iiIiIll1].join("."),
      Iill11l = [iiIIl1ll, iiIiIll1, [liIiilIi, iiIiIll1].join("|"), l11iI1].join("."),
      lI1IllII = iiIIl1ll,
      i11IliI1 = [iiIIl1ll, "direct", "-", "none", "-", Date.now().toString()].join("|");
    i11IliI1 = encodeURIComponent(i11IliI1);
    let lIII1II = l11l1Ill("xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx") + "-" + l11iI1,
      I1lIIIi = "239",
      lIIiiIll = [I1lIIIi, iiIiIll1].join("."),
      iIllliII = [liIiilIi, I1lIIIi, Date.now().toString()].join("."),
      lIll1il1 = (Math.round(5 * Math.random()) * 2 + 1).toString(),
      i1iIIIII = common.genRandomString(32, "abcdef0123456789") + "|278";
    return {
      "jda": lli1lIiI,
      "jdb": Iill11l,
      "jdc": lI1IllII,
      "jdv": i11IliI1,
      "shshshfpa": lIII1II,
      "mba_sid": lIIiiIll,
      "mba_muid": iIllliII,
      "pre_seq": lIll1il1,
      "pre_session": i1iIIIII
    };
  }
  function l11l1Ill(illIii1l, iiilIi1I = "abcdef0123456789") {
    let ll1iiI1 = "";
    for (let lI11Iili of illIii1l) {
      if (lI11Iili == "x") ll1iiI1 += iiilIi1I.charAt(Math.floor(Math.random() * iiilIi1I.length));else lI11Iili == "X" ? ll1iiI1 += iiilIi1I.charAt(Math.floor(Math.random() * iiilIi1I.length)).toUpperCase() : ll1iiI1 += lI11Iili;
    }
    return ll1iiI1;
  }
  async function IIiIIl11(iIIll1lI, iIIIIil) {
    try {
      switch (iIIll1lI) {
        case "getCoupons":
          if (iIIIIil.code == 0) {
            let I1IlIIIl = iIIIIil?.["data"]?.["couponList"] || [],
              iiilII1I = [];
            for (let I1liIlli of I1IlIIIl) {
              let iIIilI1i = "";
              switch (I1liIlli.type) {
                case 1:
                case 19:
                  {
                    iIIilI1i = prize_map[I1liIlli.type] + (I1liIlli.discount + "元");
                    break;
                  }
                case 3:
                case 17:
                  {
                    iIIilI1i = prize_map[I1liIlli.type] + I1liIlli.limitStr;
                    let I1liiil1 = I1liIlli.quota > 0 ? "满" + I1liIlli.quota : "无门槛";
                    iIIilI1i += "(" + I1liiil1 + "减" + I1liIlli.discount + ")";
                    break;
                  }
                case 6:
                  {
                    iIIilI1i = prize_map[I1liIlli.type] + I1liIlli.limitStr;
                    let iIil1l = I1liIlli.quota > 0 ? "满" + I1liIlli.quota : "无门槛";
                    iIIilI1i += "(" + iIil1l + "打" + I1liIlli.discount + "折)";
                    break;
                  }
                default:
                  {
                    iIIilI1i = prize_map[I1liIlli.type || "invalid"] || "[未知类型" + I1liIlli.type + "]";
                    console.log("" + Ii1il1Il + JSON.stringify(I1liIlli));
                    break;
                  }
              }
              iiilII1I.push(iIIilI1i);
            }
            console.log("" + Ii1il1Il + iiilII1I.join(", "));
            let IlilI1Ii = iiilII1I.map(l1ilI1l1 => {
              return l1ilI1l1.includes("[优惠券]") || l1ilI1l1.includes("[打折券]") || l1ilI1l1.includes("[立减卷]") ? "" : l1ilI1l1;
            }).filter(Boolean);
            l1IIiII.insert(IlilI1Ii.join(", "));
          } else {
            console.log(Ii1il1Il + "已经领取过");
            if (iIIIIil.msg?.["includes"]("领取上限")) {
              iIIiIII1 = true;
            }
          }
          break;
      }
    } catch (IiiiIl) {
      console.log("❌ 未能正确处理 " + iIIll1lI + " 请求响应 " + (IiiiIl.message || IiiiIl));
    }
  }
  async function lilillIi(i1iIilll) {
    if ($.runEnd) return;
    let liIilll1 = "",
      IlIIilll = null,
      lIli11lI = null,
      Ilil1Il1 = "POST",
      lIIi1I1 = {},
      I1ilii1i = {};
    switch (i1iIilll) {
      case "getCoupons":
        I1ilii1i = {
          "appId": "c822a",
          "functionId": "getCoupons",
          "appid": "u_hongbao",
          "clientVersion": common.getLatestAppVersion(),
          "client": "apple",
          "body": {
            "platform": 4,
            "unionActId": unionActId,
            "actId": actId,
            "d": i1Iiil11,
            "unionShareId": l1l1ilII,
            "type": 1,
            "qdPageId": "MO-J2011-1",
            "mdClickId": "jxhongbao_ck",
            "actType": 2
          },
          "version": "4.7",
          "ua": iIi1lI1l,
          "t": true
        }, lIIi1I1 = await H5st.getH5st(I1ilii1i), liIilll1 = "https://api.m.jd.com/api", IlIIilll = lIIi1I1.paramsData;
        break;
      default:
        console.log("❌ 未知请求 " + i1iIilll);
        return;
    }
    const iiIll1I = {
      "x-api-eid-token": I1i1ili1,
      "loginType": 2,
      "_": new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000,
      "d_model": "0-2-999",
      "osVersion": common.getLatestIOSVersion()
    };
    IlIIilll && (IlIIilll = {
      ...IlIIilll,
      ...iiIll1I
    });
    if (lIli11lI) {
      lIli11lI = {
        ...lIli11lI,
        ...iiIll1I
      };
    }
    const IllIIlii = {
      "url": liIilll1,
      "method": Ilil1Il1,
      "headers": {
        "accept": "*/*",
        "Accept-Language": "zh-cn",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Cookie": lliIiI11 + " " + lI1IilI,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": Referer,
        "Origin": "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": iIi1lI1l
      },
      "params": lIli11lI,
      "data": IlIIilll,
      "timeout": 30000
    };
    Ilil1Il1 === "GET" && (delete IllIIlii.data, delete IllIIlii.headers["Content-Type"]);
    const ii1liiIi = 1;
    let Il1l1l1 = 0,
      llI1l1Ii = null,
      IIll111I = false;
    while (Il1l1l1 < ii1liiIi) {
      const II1li1ii = await common.request(IllIIlii);
      if (!II1li1ii.success) {
        llI1l1Ii = "🚫 " + i1iIilll + " 请求失败 ➜ " + II1li1ii.error;
        Il1l1l1++;
        continue;
      }
      if (!II1li1ii.data) {
        llI1l1Ii = "🚫 " + i1iIilll + " 请求失败 ➜ 无响应数据";
        Il1l1l1++;
        continue;
      }
      IIiIIl11(i1iIilll, II1li1ii.data);
      IIll111I = false;
      break;
    }
    Il1l1l1 >= ii1liiIi && (console.log(llI1l1Ii), IIll111I && ($.outFlag = true));
  }
}
async function getAuthorCodeList(li1IiI1I) {
  const IIIiiIIi = await common.request({
      "url": li1IiI1I,
      "method": "GET",
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "proxy": null,
      "debug": false,
      "timeout": 30000
    }),
    Il1iIill = IIIiiIIi.data;
  return Il1iIill;
}
function random(ilIl1ilI, IiiIIl1l) {
  return Math.floor(Math.random() * (IiiIIl1l - ilIl1ilI)) + ilIl1ilI;
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
      return "POST" === e && (s = this.post), new Promise((e, i) => {
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
      if (i) try {
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
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
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
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
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
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
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
      } else s = this.setval(t, e);
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
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      });else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
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
      }, t => e(t));else if (this.isNode()) {
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
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
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
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}