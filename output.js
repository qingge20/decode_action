//Wed Oct 09 2024 12:25:48 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const urlPrefixes = {
  "/prod/cc/interactsaas": /interactsaas/,
  "/crm-proya/apps/interact": /crm-proya/,
  "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc/,
  "prod/cc/cjwx": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc\/cjwx/,
  "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/interact/,
  "/prod/cc/interaction/v1": /interaction/
};
let hdbTypes = ["hdb-isv.isvjcloud.com", "jingyun-rc.isvjcloud.com"],
  jinggengTypes = ["jinggeng-isv.isvjcloud.com"],
  jinggengcjTypes = ["jinggengjcq-isv.isvjcloud.com", "mpdz-act-dz.isvjcloud.com"],
  keywords = ["pps", "utm_campaign", "utm_term", "utm_source", "utm_medium", "teamId", "mpin", "shareUuid", "signUuid", "inviterNick", "inviter", "InviteUuid", "inviterNickName", "sharer", "inviterImg", "nickName", "nick", "friendUuid", "helpUuid", "shareuserid4minipg", "bizExtString", "invitePin", "pps", "cookie", "friendid", "bizExtString", "bizExtString", "koikey", "pps", "inviter_id", "invitePin", "portrait", "sid", "shareUserId", "_ts", "pps", "pps", "pps", "DEBUG", "shareOpenId", "jxsid", "ad_od", "token", "pps", "encryptOpenId", "gx", "gxd", "accessToken"],
  _currentTime = Date.now(),
  proxies = [];
for (let i = 0; i < 20; i++) {
  try {
    if (!process.env["M_WX_PROXY_URL" + (i || "")]) continue;
    proxies.push({
      "index": i + 1,
      "url": process.env["M_WX_PROXY_URL" + (i || "")],
      "close": process.env["M_WX_PROXY_CLOSE" + (i || "")] || "",
      "type": parseInt(process.env["M_WX_PROXY_TYPE" + (i || "")] || 1)
    });
  } catch (IIllIii) {
    console.log("读取代理配置 出错", IIllIii);
  }
}
const version = "v3.5.0",
  axios = require("axios"),
  fs = require("fs"),
  tunnel = require("tunnel"),
  {
    format
  } = require("date-fns"),
  cheerio = require("cheerio"),
  notify = require("./sendNotify");
let jdCookieNode = require("./jdCookie.js");
const CryptoJS = require("crypto-js");
let base64 = require("base-64");
try {
  base64 = require("base-64");
} catch (III1i1l) {
  console.log("请安装base-64依赖");
}
let NodeRSA;
try {
  NodeRSA = require("node-rsa");
} catch (lIil1ll) {
  console.log("请安装node-rsa依赖");
}
const h5sts = require("./h5sts.js");
let cookies = [];
Object.keys(jdCookieNode).length > 0 && Object.keys(jdCookieNode).forEach(IiiiIll1 => {
  cookies.push(jdCookieNode[IiiiIll1]);
});
const JDAPP_USER_AGENTS = ["jdapp;android;10.0.2;9;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 9; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;9;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;9;" + uuid() + ";network/4g;Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36", "jdapp;android;10.0.2;9;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 9; 16T Build/PKQ1.190616.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A6000 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; GM1910 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Premium Edition Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36", "jdapp;android;10.0.2;11;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Premium Edition Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045513 Mobile Safari/537.36", "jdapp;android;10.0.2;10;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36", "jdapp;android;10.0.2;11;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K30 5G Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045511 Mobile Safari/537.36", "jdapp;iPhone;10.0.2;14.2;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.2;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;11.4;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79", "jdapp;android;10.0.2;10;;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.6;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.6;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.5;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.7;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;13.4;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.3;" + uuid() + ";network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;iPhone;10.0.2;14.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;android;10.0.2;8.1.0;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;android;10.0.2;8.0.0;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 8.0.0; HTC U-3w Build/OPR6.170623.013; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36", "jdapp;iPhone;10.0.2;14.0.1;" + uuid() + ";network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", "jdapp;android;10.0.2;8.1.0;" + uuid() + ";network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36"],
  $ = axios.create({
    "timeout": 20000
  });
$.defaults.headers.Accept = "*/*";
$.defaults.headers.Connection = "keep-alive";
$.defaults.headers["Accept-Language"] = "zh-CN,zh-Hans;q=0.9";
$.defaults.headers["Accept-Encoding"] = "gzip, deflate, br";
$.defaults.retry = 2;
$.defaults.retryDelay = 2000;
let resetRouterTimeInterval = process.env.M_WX_RESET_ROUTER_TIME_INTERVAL ? process.env.M_WX_RESET_ROUTER_TIME_INTERVAL * 1 : 60,
  status493 = false;
$.defaults.shouldRetry = async lili111 => {
  let llIilIiI = lili111.response?.["status"];
  if ([403, 407].includes(llIilIiI)) {
    return false;
  }
  if (llIilIiI === 493) return status493 = true, true;
  if (lili111.message.includes("timeout") || lili111.message.includes("TLS") || lili111.message.includes("ECONNRESET")) return true;
  if (lili111.message.includes("tunneling socket could not be established")) return needRouter = true, false;
  return true;
};
$.interceptors.request.use(function (lIillIi1) {
  if (lIillIi1.url.includes("QueryShopMemberInfoJson") || lIillIi1.url.includes("isvObfuscator") || lIillIi1.url.includes("getMyPing") || lIillIi1.url.includes("getTopAndNewActInfo") || lIillIi1.url.includes("initForFarm") || lIillIi1.url.includes("scan") || lIillIi1.url.includes("getShopHomeBaseInfo") || lIillIi1.url.includes("getShopOpenCardInfo") || lIillIi1.url.includes("initPetTown") || lIillIi1.url.includes("getFansFuseMemberDetail") || lIillIi1.url.includes("0/sign") || lIillIi1.url.includes("2/sign") || lIillIi1.url.includes("9/sign") || lIillIi1.url.includes("/h5stv3") || lIillIi1.url.includes("/sendMessage") || lIillIi1.url.includes("getShopHomeActivityInfo") || lIillIi1.url.includes("getShopHomeFloorInfo") || lIillIi1.url.includes("rmvCmdy") || lIillIi1.url.includes("uncheckcmdy")) return lIillIi1;
  return lIillIi1;
}, function (liliIl1) {
  return Promise.reject(liliIl1);
});
$.interceptors.response.use(function (l1Illll) {
  if (l1Illll.config.url.includes("QueryShopMemberInfoJson") || l1Illll.config.url.includes("isvObfuscator") || l1Illll.config.url.includes("activityContent") || l1Illll.config.url.includes("initForFarm") || l1Illll.config.url.includes("scan") || l1Illll.config.url.includes("getShopHomeBaseInfo") || l1Illll.config.url.includes("getShopOpenCardInfo") || l1Illll.config.url.includes("initPetTown") || l1Illll.config.url.includes("getFansFuseMemberDetail") || l1Illll.config.url.includes("0/sign") || l1Illll.config.url.includes("2/sign") || l1Illll.config.url.includes("memberBringActPage") || l1Illll.config.url.includes("9/sign") || l1Illll.config.url.includes("/h5stv3") || l1Illll.config.url.includes("/getMyPing") || l1Illll.config.url.includes("/getSimpleActInfoVo") || l1Illll.config.url.includes("getShopHomeActivityInfo") || l1Illll.config.url.includes("getShopHomeFloorInfo") || l1Illll.config.url.includes("whx_getMShopOutlineInfo") || l1Illll.config.url.includes("rmvCmdy") || l1Illll.config.url.includes("/sendMessage") || l1Illll.config.url.includes("/getGameInfo") || l1Illll.config.url.includes("/login") || l1Illll.config.url.includes("/checkOpenCard") || l1Illll.config.url.includes("/jiugongge/activity") || l1Illll.config.url.includes("/taskInfo") || l1Illll.config.url.includes("/organizeTeam/activity") || l1Illll.config.url.includes("/basicInfo") || l1Illll.config.url.includes("uncheckcmdy")) return status493 = l1Illll.status === 493, l1Illll;
  return status493 = l1Illll.status === 493, l1Illll;
}, function (llil1lli) {
  let l1I1Ill1 = llil1lli.config;
  if (!l1I1Ill1 || !l1I1Ill1.retry) return Promise.reject(llil1lli);
  if (!l1I1Ill1.shouldRetry || typeof l1I1Ill1.shouldRetry != "function") return Promise.reject(llil1lli);
  if (!l1I1Ill1.shouldRetry(llil1lli)) return Promise.reject(llil1lli);
  l1I1Ill1.__retryCount = l1I1Ill1.__retryCount || 0;
  if (l1I1Ill1.__retryCount >= l1I1Ill1.retry) return Promise.reject(llil1lli);
  l1I1Ill1.__retryCount += 1;
  let I11IlI1i = new Promise(function (iiI1II1i) {
    setTimeout(function () {
      iiI1II1i();
    }, l1I1Ill1.retryDelay || 1);
  });
  return I11IlI1i.then(function () {
    return axios(l1I1Ill1);
  });
});
function uuid(iii1iI1I = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return iii1iI1I.replace(/[xy]/g, function (li11IlII) {
    const i1lIlll = 16 * Math.random() | 0,
      I1ill1ii = "x" === li11IlII ? i1lIlll : 3 & i1lIlll | 8;
    return I1ill1ii.toString(36);
  });
}
class Env {
  constructor(I1lIiliI) {
    this.name = I1lIiliI;
    this.username = "";
    this.cookie = "";
    this.wskey = "";
    this.wskeys = new Map();
    this.originCookies = cookies;
    this.cookies = cookies;
    this.index = "";
    this.ext = [];
    this.msg = [];
    this.delimiter = "";
    this.filename = "";
    this.ticket = "";
    this.appId = "";
    this.algo = {};
    this.bot = false;
    this.openCount = 0;
    this.expire = false;
    this.breakBefore = false;
    this.skipNum = 0;
    this.accounts = {};
    this.accountAddressList = [];
    this.domain = "";
    this.activityUrl = "";
    this.activityId = "";
    this.activityType = "";
    this.tickets = new Map();
    this.addressIndex = 1;
    this.shopName = "";
    this.needOpenCard = false;
    this.urlPrefix = "";
    this.proxyEnable = false;
    this.superVersion = version;
    this.version = "";
    this.shopName = "";
    this.venderId = "";
    this.shopId = "";
    this.ownerUuid = "";
    this.exit = true;
    this.rule = "";
    this.masterNum = masterNum;
    this.prizeList = [];
    this.hdbTypes = hdbTypes;
    this.jinggengcjTypes = jinggengcjTypes;
    this.jinggengTypes = jinggengTypes;
    this.defenseUrls = [];
    this.runAll = false;
    this.currAddrUsername = "";
  }
  async ["run"](lili11ll = {
    "wait": [1000, 2000],
    "bot": false,
    "delimiter": "",
    "o2o": false,
    "random": false,
    "once": false,
    "wskey": false,
    "mod": 1,
    "multCenter": false,
    "blacklist": [],
    "whitelist": []
  }) {
    try {
      Promise.resolve().then(() => this.forceQuit());
      this.filename = process.argv[1];
      console.log(this.now() + " " + this.name + " " + this.filename + " 开始运行...");
      console.log("TG频道:https://t.me/Wall_E_Group");
      console.log("当前token:\"" + this.desensitizeString(apiToken) + "\"");
      console.log("sign地址:" + this.desensitizeString(apiSignUrl));
      if (this.activityUrl && !this.version) throw new Error("请更新代码");
      console.log("当前版本:" + (this.version || "v1.0.0") + ",依赖版本:" + (this.superVersion || "v1.0.0"));
      if (process.env.M_SYS_INFO === "1") {
        console.log("-----------------系统参数-----------------");
        for (let iIli1liI in process.env) {
          if (!iIli1liI.startsWith("M_") || iIli1liI.includes("URL") || iIli1liI.includes("TOKEN") || iIli1liI.includes("ARGV")) continue;
          console.log(iIli1liI + "=\"" + process.env[iIli1liI] + "\"");
        }
        console.log("-----------------系统参数-----------------");
      }
      this.__start = this.timestamp();
      let lli11ii = "";
      try {
        if (mode) {
          lli11ii = this.readFileSync("/home/magic/Work/wools/doc/account.json");
        } else {
          if (fs.existsSync("utils/account.json")) lli11ii = this.readFileSync("utils/account.json");else fs.existsSync("/jd/config/account.json") ? lli11ii = this.readFileSync("/jd/config/account.json") : lli11ii = this.readFileSync("account.json");
        }
        lli11ii && JSON.parse(lli11ii).forEach(illiII1 => {
          this.accounts[illiII1.pt_pin] = illiII1;
          illiII1?.["address"] && this.accountAddressList.push(illiII1?.["address"]);
        });
      } catch (iI1IiliI) {
        console.log("account.json读取异常", iI1IiliI);
        this.msg.push("account.json读取异常");
      }
      await this.config();
      lili11ll?.["delimiter"] && (this.delimiter = lili11ll?.["delimiter"]);
      lili11ll?.["bot"] && (this.bot = lili11ll.bot);
      console.log("原始ck长度", cookies.length);
      if (lili11ll?.["blacklist"]?.["length"] > 0) for (const IIlliii of this.__as(lili11ll.blacklist)) {
        delete cookies[IIlliii - 1];
      }
      this.buildActInfo();
      console.log("排除黑名单后ck长度", cookies.length);
      wxWhitelist.length > 0 && wxWhitelistNotSupportFile.filter(I1iIIIlI => this.filename.includes(I1iIIIlI)).length === 0 && this.filename.includes("_wx_") && (console.log("支持全局无线ck长度:" + wxWhitelist), console.log("支持全局无线ck长度:" + wxWhitelistNotSupportFile), lili11ll.whitelist = wxWhitelist);
      if (lili11ll?.["whitelist"]?.["length"] > 0) {
        let Ii11il1 = [];
        for (const iiiIliI of this.__as(lili11ll.whitelist)) {
          iiiIliI - 1 < cookies.length && Ii11il1.push(cookies[iiiIliI - 1]);
        }
        cookies = Ii11il1;
      }
      console.log("设置白名单后ck长度", cookies.length);
      this.delBlackCK();
      console.log("排除PIN黑名单后ck长度", cookies.length);
      if (fs.existsSync("./ck")) {
        for (let IiI1I11I of fs.readdirSync("./ck")) {
          if (IiI1I11I.includes(".txt")) {
            let iIIl1I1i = fs.readFileSync("./ck/" + IiI1I11I, "utf-8");
            iIIl1I1i = iIIl1I1i.replace(/\r/g, "");
            iIIl1I1i = iIIl1I1i.replace(/\n/g, "&");
            let II11iI11 = iIIl1I1i.split("&");
            for (let I1liIiI1 = 0; I1liIiI1 < II11iI11.length; I1liIiI1++) {
              cookies.push(II11iI11[I1liIiI1]);
            }
            console.log("读取" + IiI1I11I + "后ck长度", cookies.length);
          }
        }
      }
      lili11ll?.["random"] && (cookies = this.randomArray(cookies));
      if (lili11ll?.["wskey"]) {
        try {
          let iIilIlli = fs.existsSync(wskeyFile) ? this.readFileSync(wskeyFile).split("\n") : process.env?.["JD_WSCK"]?.["split"]("&") || [];
          for (let lliIl1I of iIilIlli) {
            !lliIl1I.endsWith(";") && (lliIl1I += ";");
            if (lliIl1I.startsWith("pin")) this.wskeys.set(lliIl1I.match(/pin=([^; ]+)(?=;?)/)[1], lliIl1I.match(/(pin=.*?;wskey=.*?;)/)[1]);else lliIl1I.startsWith("wskey") && this.wskeys.set(lliIl1I.match(/pin=([^; ]+)(?=;?)/)[1], lliIl1I.match(/(pin=.*?;wskey=.*?;)/)[1]);
          }
          console.log("当前wskey共计" + this.wskeys.size + "个");
        } catch (iIiIil) {
          console.log("wkeys读取异常", iIiIil);
          this.msg.push("wkeys读取异常");
        }
      }
      await this.auth();
      wxProxySmart === 2 && !/(M店铺刮奖|M关注有礼)/.test(this.name) && (await this.routerProxy());
      await this.verify();
      this.cookies = cookies;
      if (lili11ll?.["before"]) for (let I1Ili1li = 0; I1Ili1li < this.cookies.length; I1Ili1li++) {
        if (!this.cookies[I1Ili1li]) continue;
        if (this.breakBefore) {
          break;
        }
        let iIllil1I = this.cookies[I1Ili1li];
        this.cookie = iIllil1I;
        let liiIil1l = iIllil1I.match(/pt_pin=(.+?);/) && iIllil1I.match(/pt_pin=(.+?);/)[1];
        this.username = decodeURIComponent(liiIil1l);
        this.wskey = this.wskeys.get(liiIil1l);
        $.defaults.headers.Cookie = this.cookie;
        this.index = I1Ili1li + 1;
        try {
          let I11l1iIl = await this.before();
          if (I11l1iIl) {
            this.ext.push(Object.assign({
              "username": this.username,
              "index": this.index,
              "cookie": this.cookie
            }, I11l1iIl));
          }
        } catch (iII1lil) {
          console.log(iII1lil);
        }
        lili11ll?.["wait"]?.["length"] > 0 && this.index !== cookies.length && !this.breakBefore && (await this.wait(lili11ll?.["wait"][0], lili11ll?.["wait"][1]));
      }
      let lIII1III = false;
      IliI11li: for (let Iilll11 = 0; Iilll11 < this.cookies.length; Iilll11++) {
        if (!this.cookies[Iilll11]) continue;
        if (this.expire) {
          break;
        }
        let iI1liliI = this.cookies[Iilll11];
        this.cookie = iI1liliI;
        let I11Illl = iI1liliI.match(/pt_pin=(.+?);/) && iI1liliI.match(/pt_pin=(.+?);/)[1];
        this.username = decodeURIComponent(I11Illl);
        this.index = Iilll11 + 1;
        if (lili11ll?.["once"] && this.index !== lili11ll.once) {
          lIII1III = true;
          continue;
        }
        if (this.skipNum > 0 && this.skipNum-- > 0) {
          this.log("跳过当前ck skipNum=" + this.skipNum);
          continue;
        }
        this.wskey = this.wskeys.get(I11Illl);
        $.defaults.headers.Cookie = this.cookie;
        !lili11ll?.["before"] ? this.ext.push({
          "username": this.username,
          "index": this.index,
          "cookie": this.cookie
        }) : "";
        !(this.activityUrl.includes("prod/cc") || this.activityUrl.includes("interact") || this.activityUrl.includes("crm-proya")) && (this.index > 1 ? this.appId === "wx" ? await this._algo() : "" : "");
        status493 = false;
        for (let ll1li11 = 0; ll1li11 < 3; ll1li11++) {
          try {
            await this.logic();
            if (lili11ll?.["o2o"] && this.msg.length > 5) {
              await this.send();
              testMode ? this.log(this.msg.join("\n")) : "";
              this.msg = [];
            }
            if (lIII1III) break IliI11li;
            break;
          } catch (il1IiI1l) {
            this.log("捕获异常", il1IiI1l.message);
            try {
              if (this.isProxy(il1IiI1l?.["message"])) {
                await this.routerProxy();
                continue;
              } else {
                if (il1IiI1l?.["response"]?.["status"] === 493 || il1IiI1l?.["message"]?.["includes"]("493")) {
                  await this.router();
                  continue;
                }
              }
              if (il1IiI1l?.["response"]?.["status"] === 403) {
                this.msg.push("IP 403 403 403");
                continue;
              }
              if (status493) {
                this.msg.push("beta测试");
                continue;
              }
              break;
            } catch (Ii1lIli1) {
              this.log(Ii1lIli1);
            }
          }
        }
        lili11ll?.["wait"]?.["length"] > 0 && this.index !== cookies.length && !this.expire && (await this.wait(lili11ll?.["wait"][0], lili11ll?.["wait"][1]));
      }
      try {
        if (this.msg.length > 0) {
          this.msg.push("");
        }
        this.actName && this.msg.push("活动名称:" + this.actName);
        this.shopName && this.msg.push("#" + this.shopName);
        if (this.shopId && this.venderId && !this.shopName) {
          this.msg.push("#" + (await this.getShopName()));
        }
        if (this.shopId && this.venderId) {
          this.msg.push("店铺信息:" + this.shopId + "_" + this.venderId);
        }
        if (this.actStartTime || this.actEndTime) {
          this.actStartTime && !("" + this.actStartTime).includes("-") && (this.actStartTime = this.formatDate(this.actStartTime, "yyyy-MM-dd HH:mm:ss"));
          if (this.actEndTime && !("" + this.actEndTime).includes("-")) {
            this.actEndTime = this.formatDate(this.actEndTime, "yyyy-MM-dd HH:mm:ss");
          }
          this.msg.push("活动时间:" + (this.actStartTime || "") + "至" + (this.actEndTime || ""));
        }
        await this.after();
        (this.shopId || this.userId || this.venderId) && (this.msg.push(""), this.msg.push("https://shop.m.jd.com/shop/home?shopId=" + (this.shopId || this.userId || this.venderId || "")));
      } catch (lliiiIl) {
        this.log("after error" + lliiiIl.message);
      }
      console.log(this.now() + " " + this.name + " 运行结束,耗时 " + (this.timestamp() - this.__start) + "ms\n");
      testMode && this.msg.length > 0 ? console.log(this.msg.join("\n")) : "";
      if (!this.notSend && !lili11ll?.["o2o"]) {
        await this.send();
      }
    } finally {
      process.exit(0);
    }
  }
  async ["forceQuit"](ii1iillI = 3) {
    if (process.env?.["M_TIMEOUT_QUIT"]) {
      while ((Date.now() - _currentTime) / 1000 / 60 < ii1iillI) {
        console.log("进程监控中...");
        await this.wait(30 * 1000);
      }
      this.log("进程超时，强制退出");
      process.exit(0);
    }
  }
  async ["config"]() {}
  ["isProxy"](IliliIll = "493") {
    if (wxProxyEnable === 1 && this.index === 1) {
      return;
    }
    return this.isNeedRouter(IliliIll);
  }
  ["isNeedRouter"](i1i1l1II) {
    const iI1i1I1 = new RegExp(proxyRegx);
    return iI1i1I1.test(i1i1l1II) && (this.domain.includes("isvjcloud") || this.proxyEnable);
  }
  ["delBlackCK"]() {
    let iliIiIll = [];
    i1llIl1I: for (let iIlIiI1 = 0; iIlIiI1 < cookies.length; iIlIiI1++) {
      if (cookies[iIlIiI1]) {
        let illI1iIl = cookies[iIlIiI1],
          lllIiI1i = illI1iIl.match(/pt_pin=(.+?);/) && illI1iIl.match(/pt_pin=(.+?);/)[1];
        if (this.activityUrl.includes("isvjcloud") && blockPinRegx) for (let lIIlIIlI of blockPinRegx.split(";")) {
          let IIl1iI = lIIlIIlI.split("@"),
            liIlliIi = this.activityUrl.match(new RegExp(IIl1iI[0]));
          if (liIlliIi && IIl1iI[1].split("|").includes(lllIiI1i)) {
            this.log("匹配到黑名单 " + lIIlIIlI + " " + lllIiI1i);
            continue i1llIl1I;
          }
        }
        if (blackPinConfig[this.domain]?.["includes"](lllIiI1i)) continue;
        if (blackPinConfig["*"]?.["includes"](lllIiI1i)) continue;
        iliIiIll.push(illI1iIl);
      }
    }
    cookies = iliIiIll;
  }
  ["me"]() {
    return this.ext[this.index - 1];
  }
  ["__as"](Ii11iili) {
    let II11iIii = [];
    for (let l11liil1 of Ii11iili) {
      if (typeof l11liil1 !== "string") {
        II11iIii.push(l11liil1);
        continue;
      }
      for (let i1llIiI1 of l11liil1.split(",")) {
        if (typeof i1llIiI1 === "string") {
          if (i1llIiI1.includes("-")) {
            let illll1l = i1llIiI1.split("-")[0] * 1,
              i1Il = i1llIiI1.split("-")[1] * 1;
            if (i1Il - illll1l === 1) {
              II11iIii.push(illll1l);
              II11iIii.push(i1Il);
            } else {
              for (let illi1IiI = illll1l; illi1IiI <= i1Il; illi1IiI++) {
                II11iIii.push(illi1IiI);
              }
            }
          } else {
            II11iIii.push(i1llIiI1 * 1);
          }
        } else II11iIii.push(i1llIiI1);
      }
    }
    return II11iIii;
  }
  ["deleteCookie"]() {
    return delete this.cookies[this.index - 1], {};
  }
  ["groupBy"](lillI11i, li1iiiI) {
    const Ili1IIl1 = {};
    return lillI11i.forEach(function (ilI1iIii) {
      const IlililI1 = li1iiiI(ilI1iIii);
      Ili1IIl1[IlililI1] = Ili1IIl1[IlililI1] || [];
      Ili1IIl1[IlililI1].push(ilI1iIii);
    }), Ili1IIl1;
  }
  async ["send"]() {
    this.msg?.["length"] > 0 && (this.msg.push("\n时间：" + this.now() + " 时长：" + ((this.timestamp() - this.__start) / 1000).toFixed(2) + "s"), this.bot ? await notify.sendNotify("/" + this.name, this.msg.join(this.delimiter || "")) : await notify.sendNotify(this.name, this.msg.join("\n")));
  }
  async ["verify"]() {
    let lIIiilI1 = this.filename;
    function iil1IIIl(i1IlIl1i) {
      return i1IlIl1i.trim().match(/([a-z_])*$/)[0];
    }
    let iIIiiIli = "109M95O106F120V95B",
      iIIiiiii = "99M102F100O",
      Iii11Iil = "109H99V",
      iiiIiIll = "102N97I99D116T111G114A121B",
      IliiiII1 = "112C112U",
      iIiiilI1 = "109N95G106B100K95U",
      il1I1 = "119V120M",
      lIIi1I1i = /[A-Z]/;
    iIIiiIli.concat(iIIiiiii).split(lIIi1I1i).map(I1iIIlll => +I1iIIlll).filter(iiiI1i1l => iiiI1i1l > 0).forEach(llII1i1i => iIIiiiii += String.fromCharCode(llII1i1i));
    iIIiiIli.concat(Iii11Iil).split(lIIi1I1i).map(I1i1li1 => +I1i1li1).filter(lI11iIlI => lI11iIlI > 0).forEach(IiIi1ill => Iii11Iil += String.fromCharCode(IiIi1ill));
    iIIiiIli.concat(iiiIiIll).split(lIIi1I1i).map(llil11i1 => +llil11i1).filter(i1llii11 => i1llii11 > 0).forEach(iII11I1i => iiiIiIll += String.fromCharCode(iII11I1i));
    iIIiiIli.concat(IliiiII1).split(lIIi1I1i).map(ilI11liI => +ilI11liI).filter(i11lII => i11lII > 0).forEach(iIliIIi1 => IliiiII1 += String.fromCharCode(iIliIIi1));
    iIiiilI1.concat(il1I1).split(lIIi1I1i).map(li1lllll => +li1lllll).filter(iIi11I => iIi11I > 0).forEach(ll11i1ll => il1I1 += String.fromCharCode(ll11i1ll));
    this.appId = lIIiilI1 ? this.name.slice(0, 1) === String.fromCharCode(77) ? lIIiilI1.includes(iil1IIIl(iIIiiiii)) ? "10032" : lIIiilI1.includes(iil1IIIl(Iii11Iil)) ? "10028" : lIIiilI1.includes(iil1IIIl(iiiIiIll)) ? "10001" : lIIiilI1.includes(iil1IIIl(IliiiII1)) ? "10038" : lIIiilI1.includes(iil1IIIl(il1I1)) ? "wx" : "" : "" : "";
    this.appId ? this.algo = await this._algo() : "";
  }
  async ["auth"]() {
    if (this.activityUrl) {
      let IIl11i1I = "no";
      try {
        let {
          data: lIIiI1II
        } = await this.request("http://43.138.16.15:7705/auth", {
          "Cookie": "authority",
          "token": apiToken,
          "_vs": this.superVersion,
          "_cs": this.cookies?.["length"] || 0
        }, {
          "data": this.activityUrl,
          "_ph": this.filename,
          "_pd": IIl11i1I
        });
        lIIiI1II.data?.["notity"] && this.msg.push(lIIiI1II.data?.["notity"]);
        if (lIIiI1II.status !== 0) {
          this.msg.push(lIIiI1II.msg);
          throw new Error(lIIiI1II.msg);
        }
        this.ownerUuid = lIIiI1II.data?.["ownerUuid"] || "";
      } catch (IIli11i) {
        this.msg.length > 0 && (await this.send());
        throw new Error("authority false");
      }
    }
  }
  async ["wait"](lIIliilI, IIIIIlll) {
    if (lIIliilI <= 0) {
      return;
    }
    return IIIIIlll ? new Promise(i1IlIi1i => setTimeout(i1IlIi1i, this.random(lIIliilI, IIIIIlll))) : new Promise(ll1llII1 => setTimeout(ll1llII1, lIIliilI));
  }
  ["putMsg"](l1iI1Ii1) {
    _currentTime = Date.now();
    l1iI1Ii1 += "";
    this.log(l1iI1Ii1);
    let iI1ilIiI = [[" ", ""], ["优惠券", "券"], ["东券", "券"], ["元京东E卡", "元E卡"], ["店铺", ""], ["恭喜", ""], ["获得", ""]];
    for (let lI11Ill1 of iI1ilIiI) {
      l1iI1Ii1 = l1iI1Ii1.replace(lI11Ill1[0], lI11Ill1[1]);
    }
    l1iI1Ii1?.["includes"]("期间下单") && (this.expire = true);
    if (this.bot) {
      this.msg.push(l1iI1Ii1);
    } else {
      let ll1iii = (this.accounts[this.username]?.["remarks"] || this.username) + this.index;
      if (this.msg.length > 0 && this.msg.filter(iIiiIll1 => iIiiIll1.includes(ll1iii)).length > 0) for (let lIliii1l = 0; lIliii1l < this.msg.length; lIliii1l++) {
        if (this.msg[lIliii1l].includes(ll1iii)) {
          this.msg[lIliii1l] = this.msg[lIliii1l].split(" ")[0] + "" + [this.msg[lIliii1l].split(" ")[1], l1iI1Ii1].join(",");
          break;
        }
      } else this.msg.push("【" + ll1iii + "】" + l1iI1Ii1);
    }
  }
  ["getRemarks"](IliiiIII) {
    return this.accounts[IliiiIII]?.["remarks"] || IliiiIII;
  }
  ["md5"](ilI1ll1i) {
    return CryptoJS.MD5(ilI1ll1i).toString();
  }
  ["hmacSHA256"](ll1lli, l1iiiIIi) {
    return CryptoJS.HmacSHA256(ll1lli, l1iiiIIi).toString();
  }
  ["encryptCrypto"](I1Iili1, li11lIIl, IlI1ilil, IIlliIl, Ii1ll1I, IIli11II) {
    return CryptoJS[I1Iili1].encrypt(CryptoJS.enc.Utf8.parse(IIlliIl), CryptoJS.enc.Utf8.parse(Ii1ll1I), {
      "mode": CryptoJS.mode[li11lIIl],
      "padding": CryptoJS.pad[IlI1ilil],
      "iv": CryptoJS.enc.Utf8.parse(IIli11II)
    }).ciphertext.toString(CryptoJS.enc.Hex);
  }
  ["decryptCrypto"](IliiiIIi, Iil1lII1, IllI1I1i, I1I1i, i1II1Il, I11Il) {
    return CryptoJS[IliiiIIi].decrypt({
      "ciphertext": CryptoJS.enc.Hex.parse(I1I1i)
    }, CryptoJS.enc.Utf8.parse(i1II1Il), {
      "mode": CryptoJS.mode[Iil1lII1],
      "padding": CryptoJS.pad[IllI1I1i],
      "iv": CryptoJS.enc.Utf8.parse(I11Il)
    }).toString(CryptoJS.enc.Utf8);
  }
  ["rsaEncrypt"](II11Il1l, llIiI1i, IIIilII) {
    II11Il1l = "-----BEGIN PUBLIC KEY-----\n" + II11Il1l + "\n-----END PUBLIC KEY-----";
    let il11i = new NodeRSA(II11Il1l);
    return il11i.setOptions(llIiI1i), il11i.encrypt(IIIilII, "base64");
  }
  ["log"](...Il1I11i1) {
    _currentTime = Date.now();
    this.s ? console.log(...Il1I11i1) : console.log(this.now("HH:mm:ss.SSS") + " cookie" + this.index + " " + (this.accounts[this.username]?.["remarks"] || this.desensitizeString(this.username)), ...Il1I11i1);
  }
  ["desensitizeString"](i1ilIiiI) {
    if (process.env?.["M_LOG_DESENSITIZE"]) return i1ilIiiI || "";
    if (!i1ilIiiI) return "";
    if (i1ilIiiI.length <= 4) return i1ilIiiI;
    const I1i1iIl = i1ilIiiI,
      liiiiili = I1i1iIl.substring(0, 2),
      I1Il1l11 = I1i1iIl.substring(I1i1iIl.length - 2),
      ll1l111I = Math.max(0, 8 - liiiiili.length - I1Il1l11.length),
      iIII1I1I = "*".repeat(ll1l111I);
    return (liiiiili + iIII1I1I + I1Il1l11).padEnd(6, "*");
  }
  ["union"](III1IIll, i11iiii1) {
    return Array.from(new Set([...III1IIll.map(l11l1iii => l11l1iii + ""), ...i11iiii1.map(ilI1Iil1 => ilI1Iil1 + "")]));
  }
  ["intersection"](l1Ii1II1, IiiIilII) {
    const llIlliI = l1Ii1II1.map(II1I11 => II1I11 + "").filter(ii1111 => IiiIilII.map(iiIl1i1l => iiIl1i1l + "").includes(ii1111)),
      lll11IiI = IiiIilII.map(i1ll11i1 => i1ll11i1 + "").filter(lIi111Il => l1Ii1II1.map(l1iIlii1 => l1iIlii1 + "").includes(lIi111Il));
    return llIlliI.concat(lll11IiI);
  }
  ["different"](i1lIIlIi, IilllI) {
    const l1illi1 = i1lIIlIi.map(lI1liI1 => lI1liI1 + "").filter(liiilIli => !IilllI.map(Iii11lil => Iii11lil + "").includes(liiilIli)),
      iIlIilii = IilllI.map(IIII1II1 => IIII1II1 + "").filter(l1l1il1I => !i1lIIlIi.map(iIiIi1i1 => iIiIi1i1 + "").includes(l1l1il1I));
    return l1illi1.concat(iIlIilii);
  }
  ["build"](Ilii1i1l) {
    if (Ilii1i1l.match(/&callback=(jsonpCBK(.*))&/)) {
      let i11i11Il = Ilii1i1l.match(/&callback=(jsonpCBK(.*))&/);
      Ilii1i1l = Ilii1i1l.replace(i11i11Il[1], this.randomCallback(i11i11Il[2].length || 0));
    }
    let IiI1l1ii = decodeURIComponent(this.getQueryString(Ilii1i1l, "_stk") || "");
    if (IiI1l1ii) {
      let IIllIli1,
        il11iIi1,
        II11lIl1 = "",
        IiI1iIIl = this.now("yyyyMMddHHmmssSSS").toString(),
        lIiIliIl = this.algo.tk,
        iliIllii = this.algo.fp,
        iili1lil = this.algo.em;
      if (lIiIliIl && iliIllii && iili1lil) il11iIi1 = iili1lil(lIiIliIl, iliIllii, IiI1iIIl, this.appId, CryptoJS).toString(CryptoJS.enc.Hex);else {
        const IiIIiiii = "5gkjB6SpmC9s";
        lIiIliIl = "tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc";
        iliIllii = "9686767825751161";
        il11iIi1 = CryptoJS.SHA512("" + lIiIliIl + iliIllii + IiI1iIIl + this.appId + IiIIiiii, lIiIliIl).toString(CryptoJS.enc.Hex);
      }
      IiI1l1ii.split(",").map((il1IliiI, IiIIIl) => {
        II11lIl1 += il1IliiI + ":" + this.getQueryString(Ilii1i1l, il1IliiI) + (IiIIIl === IiI1l1ii.split(",").length - 1 ? "" : "&");
      });
      IIllIli1 = encodeURIComponent(["".concat(IiI1iIIl), "".concat(iliIllii), "".concat(this.appId), "".concat(lIiIliIl), "".concat(CryptoJS.HmacSHA256(II11lIl1, il11iIi1.toString()).toString(CryptoJS.enc.Hex))].join(";"));
      if (Ilii1i1l.match(/[?|&]h5st=(.*?)&/)) {
        Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/[?|&]h5st=(.*?)&/)[1], "H5ST").replace(/H5ST/, IIllIli1);
      }
      let lI1IiIl = [/[?|&]_time=(\d+)/, /[?|&]__t=(\d+)/, /[?|&]_ts=(\d+)/, /[?|&]_=(\d+)/, /[?|&]t=(\d+)/, /[?|&]_cfd_t=(\d+)/];
      for (let lIl1Ii1l of lI1IiIl) {
        Ilii1i1l.match(lIl1Ii1l) && (Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(lIl1Ii1l)[1], Date.now()));
      }
      let iIlliIl = this._tk();
      if (Ilii1i1l.match(/strPgUUNum=(.*?)&/)) {
        Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/strPgUUNum=(.*?)&/)[1], iIlliIl.tk);
        Ilii1i1l.match(/strPhoneID=(.*?)&/) && (Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/strPhoneID=(.*?)&/)[1], iIlliIl.id));
        Ilii1i1l.match(/strPgtimestamp=(.*?)&/) && (Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/strPgtimestamp=(.*?)&/)[1], iIlliIl.ts));
      }
      Ilii1i1l.match(/jxmc_jstoken=(.*?)&/) && (Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/jxmc_jstoken=(.*?)&/)[1], iIlliIl.tk), Ilii1i1l.match(/phoneid=(.*?)&/) && (Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/phoneid=(.*?)&/)[1], iIlliIl.id)), Ilii1i1l.match(/timestamp=(.*?)&/) && (Ilii1i1l = Ilii1i1l.replace(Ilii1i1l.match(/timestamp=(.*?)&/)[1], iIlliIl.ts)));
    }
    return Ilii1i1l;
  }
  ["getQueryString"](Ii1l1ii1, Iliilill) {
    let IiliIi = new RegExp("(^|[&?])" + Iliilill + "=([^&]*)(&|$)"),
      li1i1iIl = Ii1l1ii1.match(IiliIi);
    if (li1i1iIl != null) return unescape(li1i1iIl[2]);
    return "";
  }
  ["unique"](i1IlI1lI) {
    return Array.from(new Set(i1IlI1lI));
  }
  async ["logic"]() {
    console.log("default logic");
  }
  async ["before"]() {
    return -1;
  }
  async ["after"]() {
    return -1;
  }
  ["tryLock"](lIlil, Iii111I1) {
    try {
      return fs.accessSync("/jd/log/lock/" + Iii111I1 + "_" + lIlil), false;
    } catch (Ii1I11II) {
      return true;
    }
  }
  ["setLock"](III11I1I, lIlilliI) {
    try {
      try {
        fs.accessSync("/jd/log/lock");
      } catch (il1lIliI) {
        fs.mkdirSync("/jd/log/lock");
      }
      return fs.mkdirSync("/jd/log/lock/" + lIlilliI + "_" + III11I1I), false;
    } catch (iI11iili) {
      return true;
    }
  }
  ["match"](ill11l1l, iilli1l1) {
    ill11l1l = ill11l1l instanceof Array ? ill11l1l : [ill11l1l];
    for (let i1i11l of ill11l1l) {
      const liI11l = i1i11l.exec(iilli1l1);
      if (liI11l) {
        const II1i11Il = liI11l.length;
        if (II1i11Il === 1) return liI11l;else {
          if (II1i11Il === 2) {
            return liI11l[1];
          } else {
            const liIli1Il = [];
            for (let ilIllIil = 1; ilIllIil < II1i11Il; ilIllIil++) {
              liIli1Il.push(liI11l[ilIllIil]);
            }
            return liIli1Il;
          }
        }
      }
    }
    return "";
  }
  ["matchAll"](Ii1l11, ilii) {
    Ii1l11 = Ii1l11 instanceof Array ? Ii1l11 : [Ii1l11];
    let iIil1lI1,
      IiIi1ll1 = [];
    for (let llllIIll of Ii1l11) {
      while ((iIil1lI1 = llllIIll.exec(ilii)) != null) {
        let llI1iIi = iIil1lI1.length;
        if (llI1iIi === 1) {
          IiIi1ll1.push(iIil1lI1);
        } else {
          if (llI1iIi === 2) IiIi1ll1.push(iIil1lI1[1]);else {
            let IlIli1iI = [];
            for (let IiIl11il = 1; IiIl11il < llI1iIi; IiIl11il++) {
              IlIli1iI.push(iIil1lI1[IiIl11il]);
            }
            IiIi1ll1.push(IlIli1iI);
          }
        }
      }
    }
    return IiIi1ll1;
  }
  async ["countdown"](l1lllIi1 = 1, llIii1il = 200) {
    let lilil1i1 = new Date();
    if (l1lllIi1 === 1 && lilil1i1.getMinutes() < 50 || l1lllIi1 === 2 && lilil1i1.getMinutes() < 25 || l1lllIi1 === 3 && lilil1i1.getMinutes() < 10 || l1lllIi1 === 4 && lilil1i1.getMinutes() < 5) return;
    let Ii1Illl = llIii1il;
    if (l1lllIi1 !== 9) {
      switch (l1lllIi1) {
        case 1:
          lilil1i1.setHours(lilil1i1.getHours() + 1), lilil1i1.setMinutes(0);
          break;
        case 2:
          lilil1i1.setMinutes(30);
          break;
        case 3:
          lilil1i1.setMinutes(15);
          break;
        case 4:
          lilil1i1.setMinutes(10);
          break;
        default:
          console.log("不支持");
      }
      lilil1i1.setSeconds(0);
      lilil1i1.setMilliseconds(0);
      Ii1Illl = lilil1i1.getTime() - Date.now() - llIii1il;
    }
    Ii1Illl > 0 && (console.log("需要等待时间" + Ii1Illl / 1000 + " 秒"), await this.wait(Ii1Illl));
  }
  ["readFileSync"](IliI11iI) {
    try {
      return fs.readFileSync(IliI11iI).toString();
    } catch (ilii1ii1) {
      return console.log(IliI11iI, "文件不存在进行创建"), this.writeFileSync(IliI11iI, ""), "";
    }
  }
  ["writeFileSync"](lliIii1l, II1ii1Il) {
    fs.writeFileSync(lliIii1l, II1ii1Il);
  }
  ["random"](lIl1ll, IIIliIII) {
    return Math.min(Math.floor(lIl1ll + Math.random() * (IIIliIII - lIl1ll)), IIIliIII);
  }
  async ["taskToDo"](Ii1llIIl) {
    Ii1llIIl.data.taskList.filter(iIIli1 => ![8, 15, 13].includes(iIIli1.taskType * 1)).length === 0 && this.log("没有任务");
    let liiil11i = Ii1llIIl.data.taskList;
    for (let i11lIili of liiil11i.filter(IliIIl1l => IliIIl1l.status === 0 && (IliIIl1l.completeCount < IliIIl1l.finishNum || IliIIl1l.completeCount < IliIIl1l.maxNum)) || []) {
      try {
        if ([1, 2, 4, 10, 12, 14].includes(i11lIili.taskType)) {
          await this.api("/api/basic/task/toDo", {
            "skuId": "",
            "taskId": i11lIili.taskId
          });
        } else {
          if ([3, 5, 6, 7, 9].includes(i11lIili.taskType)) {
            let iiI1II11 = i11lIili.skuInfoVO.filter(ilIllIi1 => ilIllIi1.status === 0);
            for (let i1Ill1l = 0; i1Ill1l < iiI1II11.length && (i1Ill1l < i11lIili.finishNum || i1Ill1l < i11lIili.maxNum); i1Ill1l++) {
              await this.api("/api/basic/task/toDo", {
                "skuId": iiI1II11[i1Ill1l].skuId,
                "taskId": i11lIili.taskId
              });
            }
          }
        }
      } catch (IlIiIii) {
        this.log(IlIiIii.message, JSON.stringify(i11lIili));
      }
    }
  }
  async ["notify"](IIlllIl, l1I1lili) {
    return notify.sendNotify(IIlllIl, l1I1lili);
  }
  async ["get"](i1lIill1, IIllllil) {
    return i1lIill1 = this.appId ? this.build(i1lIill1) : i1lIill1, new Promise((iiliIiiI, lIillii) => {
      $.get(i1lIill1, {
        "headers": IIllllil
      }).then(IlIiIIIi => iiliIiiI(this.handler(IlIiIIIi) || IlIiIIIi)).catch(lilIiI1 => lIillii(lilIiI1));
    });
  }
  async ["post"](iIi1il1I, lIIIiil, il11IIIi) {
    return iIi1il1I = this.appId ? this.build(iIi1il1I) : iIi1il1I, new Promise((lIlillll, il111ilI) => {
      $.post(iIi1il1I, lIIIiil, {
        "headers": il11IIIi
      }).then(IIIIi1ll => lIlillll(this.handler(IIIIi1ll) || IIIIi1ll)).catch(i1111Iii => il111ilI(i1111Iii));
    });
  }
  async ["request"](Illl1111, i11i1lIi, IiI1I1li) {
    return new Promise((i1Ii1llI, Il1liilI) => {
      let iii1liI = setTimeout(() => {
          console.log("超时异常进行重试");
          Il1liilI(new Error("Request timeout"));
        }, 50000),
        iI111I11 = i11i1lIi?.["headers"] ? i11i1lIi : {
          "headers": i11i1lIi
        };
      (IiI1I1li ? $.post(Illl1111, IiI1I1li, iI111I11) : $.get(Illl1111, iI111I11)).then(l1llIl => {
        clearTimeout(iii1liI);
        this.__lt(l1llIl);
        i1Ii1llI(l1llIl);
      }).catch(I11li11 => {
        clearTimeout(iii1liI);
        Il1liilI(I11li11);
      });
    });
  }
  ["__lt"](lIlIi1i) {
    let lllIl1l1 = lIlIi1i?.["headers"]["set-cookie"] || lIlIi1i?.["headers"]["Set-Cookie"] || [],
      iIiIIIlI = typeof lllIl1l1 != "object" ? lllIl1l1.split(",") : lllIl1l1;
    for (let ilili1il of iIiIIIlI) {
      let illii1i1 = ilili1il.split(";")[0].trim().split("=");
      this.tickets.set(illii1i1[0], illii1i1[1]);
    }
    this.ticket = "";
    for (let [Iil111li, ll11I1] of this.tickets.entries()) {
      this.ticket += Iil111li + "=" + ll11I1 + ";";
    }
  }
  ["handler"](i1I1111) {
    let Ii1llIl1 = i1I1111?.["data"] || i1I1111?.["body"] || i1I1111;
    if (!Ii1llIl1) return;
    if (typeof Ii1llIl1 === "string") {
      if (Ii1llIl1.startsWith("<") || Ii1llIl1.startsWith("(function")) {
        return Ii1llIl1;
      } else {
        Ii1llIl1 = Ii1llIl1.replace(/[\n\r| ]/g, "");
        if (Ii1llIl1.includes("try{jsonpCB")) {
          Ii1llIl1 = Ii1llIl1.replace(/try{jsonpCB.*\({/, "{").replace(/}\)([;])?}catch\(e\){}/, "}");
        } else {
          if (Ii1llIl1.includes("jsonpCB")) {
            let iiilliiI = Ii1llIl1.replace(/[\n\r]/g, "").replace(/jsonpCB.*\({/, "{");
            Ii1llIl1 = iiilliiI.substring(0, iiilliiI.length - 1);
          } else Ii1llIl1.match(/try{.*\({/) ? Ii1llIl1 = Ii1llIl1.replace(/try{.*\({/, "{").replace(/}\)([;])?}catch\(e\){}/, "}") : Ii1llIl1 = /.*?({.*}).*/g.exec(Ii1llIl1)?.[1] || "{}";
        }
        return JSON.parse(Ii1llIl1);
      }
    }
    return Ii1llIl1;
  }
  ["randomNum"](l11IlIli) {
    l11IlIli = l11IlIli || 32;
    let ilIIlIl = "0123456789",
      ii1l111l = ilIIlIl.length,
      iIill1I1 = "";
    for (let Ili1ii1 = 0; Ili1ii1 < l11IlIli; Ili1ii1++) {
      iIill1I1 += ilIIlIl.charAt(Math.floor(Math.random() * ii1l111l));
    }
    return iIill1I1;
  }
  ["randomString"](I1Ili111) {
    return this.uuid();
  }
  ["randomPattern"](iliiI1II, llil1il1 = "abcdef0123456789") {
    let iIii1iI1 = "";
    for (let iIli11ii of iliiI1II) {
      if (iIli11ii == "x") iIii1iI1 += llil1il1.charAt(Math.floor(Math.random() * llil1il1.length));else iIli11ii == "X" ? iIii1iI1 += llil1il1.charAt(Math.floor(Math.random() * llil1il1.length)).toUpperCase() : iIii1iI1 += iIli11ii;
    }
    return iIii1iI1;
  }
  ["randomCallback"](li11llIl = 1) {
    let iI1iliil = "abcdefghigklmnopqrstuvwsyz",
      l1lilil = iI1iliil.length,
      IiI1IlIi = "";
    for (let i1ll1li = 0; i1ll1li < li11llIl; i1ll1li++) {
      IiI1IlIi += iI1iliil.charAt(Math.floor(Math.random() * l1lilil));
    }
    return "jsonpCBK" + IiI1IlIi.toUpperCase();
  }
  ["randomArray"](liiiIIli, I1i1II1i) {
    I1i1II1i = I1i1II1i || liiiIIli.length;
    let I11l1Ill = liiiIIli.slice(0),
      III1II1i = liiiIIli.length,
      iii1IlI1 = III1II1i - I1i1II1i,
      iilIli1l,
      lIlI11l;
    while (III1II1i-- > iii1IlI1) {
      lIlI11l = Math.floor((III1II1i + 1) * Math.random());
      iilIli1l = I11l1Ill[lIlI11l];
      I11l1Ill[lIlI11l] = I11l1Ill[III1II1i];
      I11l1Ill[III1II1i] = iilIli1l;
    }
    return I11l1Ill.slice(iii1IlI1);
  }
  ["now"](iii11I1) {
    return format(Date.now(), iii11I1 || "yyyy-MM-dd HH:mm:ss.SSS");
  }
  ["formatDate"](I1ii1lii, ilI1lI1) {
    return format(typeof I1ii1lii === "object" ? I1ii1lii : new Date(typeof I1ii1lii === "string" ? I1ii1lii * 1 : I1ii1lii), ilI1lI1 || "yyyy-MM-dd");
  }
  ["formatDateTime"](llIi1li1, iiI1IllI) {
    return format(typeof llIi1li1 === "object" ? llIi1li1 : new Date(typeof llIi1li1 === "string" ? llIi1li1 * 1 : llIi1li1), iiI1IllI || "yyyy-MM-dd HH:mm:ss");
  }
  ["parseDate"](iiliiII) {
    return new Date(Date.parse(iiliiII.replace(/-/g, "/")));
  }
  ["timestamp"]() {
    return new Date().getTime();
  }
  ["uuid"](lli1iII1 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    return lli1iII1.replace(/[xy]/g, function (Ii1l1Ill) {
      const iI1Ill11 = 16 * Math.random() | 0,
        iilll11i = "x" === Ii1l1Ill ? iI1Ill11 : 3 & iI1Ill11 | 8;
      return iilll11i.toString(36);
    });
  }
  async ["unfollow"](iI1I1I11 = this.shopId) {
    let iillilIl = {
        "authority": "api.m.jd.com",
        "accept": "*/*",
        "origin": "https://shop.m.jd.com",
        "referer": "https://shop.m.jd.com/",
        "user-agent": this.UA,
        "Cookie": this.cookie
      },
      lliiil1i = {
        "shopId": iI1I1I11,
        "follow": false
      },
      ili1II1i = "https://api.m.jd.com/client.action?functionId=whx_followShop&appid=shop_view&body=" + encodeURIComponent(JSON.stringify(lliiil1i)),
      Il1IIIil = await this.get(ili1II1i, iillilIl);
    return Il1IIIil;
  }
  async ["getShopInfo"](i1iIIIii = this.venderId, iiliIIii = this.shopId) {
    try {
      if (openCardMode.includes("wh5")) {
        let lllIIIl1 = {
            "authority": "api.m.jd.com",
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "origin": "https://shop.m.jd.com",
            "referer": "https://shop.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42"
          },
          iiIiI11i = "https://api.m.jd.com/client.action?functionId=whx_getMShopOutlineInfo&appid=shop_view&clientVersion=11.0.0&client=wh5&body=" + encodeURIComponent(JSON.stringify({
            "shopId": iiliIIii
          })),
          {
            status: iilIlii,
            data: iIilIi1l
          } = await this.request(iiIiI11i, lllIIIl1);
        return iIilIi1l.data?.["shopInfo"];
      } else {
        let lliII1 = await this.sign("getShopHomeBaseInfo", {
            "source": "app-shop",
            "latWs": "0",
            "lngWs": "0",
            "displayWidth": "1098.000000",
            "sourceRpc": "shop_app_home_home",
            "lng": "0",
            "lat": "0",
            "venderId": i1iIIIii,
            "navigationAbTest": "1"
          }),
          iIiiiiII = {
            "J-E-H": "",
            "Connection": "keep-alive",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Referer": "",
            "J-E-C": "",
            "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
            "Accept": "*/*",
            "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)"
          },
          lIiIlll1 = "https://api.m.jd.com/client.action?functionId=" + lliII1.fn,
          {
            status: lIli11lI,
            data: Iii1III
          } = await this.request(lIiIlll1, iIiiiiII, lliII1.sign);
        return Iii1III.result?.["shopInfo"];
      }
    } catch (iII1I11i) {
      return console.log(iII1I11i), {};
    }
  }
  async ["getShopBaseInfo"](lllI1il1 = this.venderId, Ii1II1iI = this.shopId) {
    let IIllI11 = "";
    if (lllI1il1) IIllI11 = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&venderId=" + lllI1il1 + "&_=" + this.timestamp();else Ii1II1iI && (IIllI11 = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&shopId=" + Ii1II1iI + "&_=" + this.timestamp());
    let l1Iliii1 = await this.request(IIllI11, {
      "authority": "chat1.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": this.cookie,
      "User-Agent": this.ua(),
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate",
      "referer": "https://mall.jd.com/shopBrandMember-" + (lllI1il1 || Ii1II1iI) + ".html"
    });
    const llllI1lI = JSON.parse(l1Iliii1?.["data"]?.["replace"](/^jQuery\d+\(/, "")?.["replace"](/\);$/, "") || "{}");
    return {
      "shopId": llllI1lI.shopId,
      "venderId": llllI1lI.venderId,
      "shopName": llllI1lI.seller
    };
  }
  async ["getShopName"](i1l11Iil = this.venderId, Iil1iIli = this.shopId) {
    this.shopName = (await this.getShopBaseInfo())?.["shopName"];
    if (!this.shopName) {
      let liiII1Il = await this.getShopInfo(i1l11Iil, Iil1iIli);
      this.shopName = liiII1Il?.["shopName"];
    }
    return this.shopName || "未知";
  }
  async ["sendTGMsg"](II1llIII) {
    await this.sendMessage(process.env.TG_USER_ID, II1llIII);
  }
  async ["sendMessage"](ll11i1I1 = process.env.TG_USER_ID, i1l111il, il1lliII = 1, Ii1iII = process.env.TG_BOT_TOKEN) {
    if (mode) return;
    let ll1lili1 = "https://api.telegram.org/bot" + Ii1iII + "/sendMessage",
      iIl1iIil = {
        "chat_id": ll11i1I1,
        "text": i1l111il,
        "disable_web_page_preview": true
      },
      i1I1ii11 = {
        "Content-Type": "application/json",
        "Cookie": "10089"
      };
    process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT && ($.defaults.proxy = false, $.defaults.httpsAgent = tunnel.httpsOverHttp({
      "proxy": {
        "host": process.env.TG_PROXY_HOST,
        "port": process.env.TG_PROXY_PORT * 1
      }
    }));
    let {
      data: l1IIIi1i
    } = await this.request(ll1lili1, i1I1ii11, iIl1iIil);
    if (l1IIIi1i?.["description"]?.["includes"]("long")) {
      await this.sendMessage(ll11i1I1, i1l111il.substring(0, 300), ++il1lliII);
      return;
    }
    !l1IIIi1i?.["ok"] && il1lliII < 5 && ($.log("重试中", i1l111il), await $.wait(1000, 2000), await this.sendMessage(ll11i1I1, i1l111il, ++il1lliII));
  }
  ["ua"](l1IIilI = "jd") {
    return JDAPP_USER_AGENTS[this.random(0, JDAPP_USER_AGENTS.length)];
  }
  async ["wxStop"](i11liiii) {
    let llIilIlI = false;
    for (let lllIllil of stopKeywords) {
      if (lllIllil && i11liiii?.["includes"](lllIllil)) {
        llIilIlI = true;
        this.expire = true;
        break;
      }
    }
    return llIilIlI;
  }
  async ["wxAddressStop"](l1I1ill1) {
    return l1I1ill1 && l1I1ill1.match(new RegExp("(" + addressStopKeywords.join("|") + ")")) != null;
  }
  async ["wxAddressStopRule"](IiI11liI = this.rule) {
    try {
      if (!IiI11liI && this.urlPrefix) {
        let Ill1I1ll = await this.api("/api/active/getRule", {});
        Ill1I1ll?.["resp_code"] === 0 && (IiI11liI = Ill1I1ll?.["data"]);
      }
    } catch (i1IIi1lI) {
      console.log(i1IIi1lI);
    }
    return IiI11liI && IiI11liI.match(new RegExp("(" + addressStopKeywordsRule.join("|") + ")")) != null;
  }
  ["_tk"]() {
    let llliIlii = function (I1iiiili) {
        let iiii1i = "abcdefghijklmnopqrstuvwxyz1234567890",
          Ilili1iI = "";
        for (let iiiIilIl = 0; iiiIilIl < I1iiiili; iiiIilIl++) {
          Ilili1iI += iiii1i[Math.floor(iiii1i.length * Math.random())];
        }
        return Ilili1iI;
      }(40),
      I1iil1I = Date.now().toString(),
      lII1I11l = this.md5("" + decodeURIComponent(this.username) + I1iil1I + llliIlii + "tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy");
    return {
      "ts": I1iil1I,
      "id": llliIlii,
      "tk": lII1I11l
    };
  }
  async ["_algo"](iIIlllli = 0) {
    if (this.appId === "wx") {
      this.tickets = new Map();
      let I1i1iIII = {
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
        "Accept-Language": "zh-cn",
        "Cookie": this.cookie
      };
      try {
        if (this.domain.includes("lzkj") || this.domain.includes("lzdz") || this.domain.includes("cjhy")) {
          await this.request("https://" + this.domain + "/wxTeam/activity?activityId=" + this.activityId, I1i1iIII);
        } else await this.request(this.activityUrl, I1i1iIII);
      } catch (iI1Iii1i) {
        if (iIIlllli < 3) {
          if (this.isProxy(iI1Iii1i.message)) {
            await this.routerProxy(iIIlllli);
            this.msg.push("493启用代理重试" + iIIlllli);
            this.log("493去重试，第" + iIIlllli + "次重试...");
          } else iI1Iii1i.message?.["includes"]("493") && (await this.router());
          return await this._algo(++iIIlllli);
        }
      }
      return "";
    } else {
      let l1i111Il = function () {
          let I1llIll = "0123456789",
            i11liil1 = 13,
            l1iIIili = "";
          for (; i11liil1--;) {
            l1iIIili += I1llIll[Math.random() * I1llIll.length | 0];
          }
          return (l1iIIili + Date.now()).slice(0, 16);
        }(),
        ll1iili1 = await this.post("https://cactus.jd.com/request_algo?g_ty=ajax", JSON.stringify({
          "version": "1.0",
          "fp": l1i111Il,
          "appId": this.appId,
          "timestamp": this.timestamp(),
          "platform": "web",
          "expandParams": ""
        }), {
          "Authority": "cactus.jd.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
          "Content-Type": "application/json",
          "Origin": "https://st.jingxi.com",
          "Referer": "https://st.jingxi.com/"
        });
      return {
        "fp": l1i111Il.toString(),
        "tk": ll1iili1?.["data"]?.["result"]?.["tk"] || ll1iili1?.["result"]?.["tk"],
        "em": new Function("return " + (ll1iili1?.["data"]?.["result"]?.["algo"] || ll1iili1?.["result"]?.["algo"]))()
      };
    }
  }
  async ["routerProxy"](l1l1ll = 0) {
    if (wxProxyEnable === 1) return;
    if (!proxies.find(II1liiIi => !II1liiIi.close)) {
      this.log("所有代理已关闭");
      this.expire = true;
      this.proxy = null;
      return;
    }
    this.proxy = proxies.filter(I11i1lll => !I11i1lll.close)[0];
    this.log("开始从M_WX_PROXY_URL" + (this.proxy.index - 1 || "") + "获取代理");
    let I1llliII = await this.getProxyByUrl(this.proxy);
    !I1llliII && (await this.routerProxy());
  }
  async ["getProxyByUrl"](li1IiiII) {
    let II1lil11 = li1IiiII.url;
    var i1IIlill = false;
    try {
      $.defaults.proxy = false;
      $.defaults.httpsAgent = false;
      $.defaults.httpAgent = false;
      let II1ilI11 = await $.get(II1lil11);
      if (II1lil11.includes("=json")) {
        let llIi1l1I = JSON.stringify(II1ilI11.data),
          ilIilllI = II1ilI11.data.data;
        II1ilI11.data.data?.["list"] && (ilIilllI = II1ilI11.data.data.list);
        if (ilIilllI) {
          if (ilIilllI[0]?.["port"]) i1IIlill = true, this.log("获取到的IP:" + ilIilllI[0].ip + ":" + ilIilllI[0].port), await this.setProxy(ilIilllI[0].ip + ":" + ilIilllI[0].port);else {
            const I1IIIlll = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
              ii1lI111 = llIi1l1I.match(I1IIIlll);
            ii1lI111 ? (this.log("获取到的IP:" + ii1lI111[0]), i1IIlill = true, await this.setProxy(ii1lI111[0])) : (proxies.filter(IlliiIil => IlliiIil.index = li1IiiII.index)[0].close = true, this.log(JSON.stringify(llIi1l1I)));
          }
        } else proxies.filter(I1iII1l1 => I1iII1l1.index = li1IiiII.index)[0].close = true, this.log(JSON.stringify(llIi1l1I));
      } else {
        let I11lliIi = II1ilI11.data.toString().replace("\r\n", "").replace("\n", ""),
          I1I11I1l = I11lliIi?.["includes"]("@") ? I11lliIi.split("@")[0] : "";
        const Ilil1iI = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
          lll1liIl = I11lliIi.match(Ilil1iI);
        if (lll1liIl) this.log("获取到的IP:" + lll1liIl[0]), i1IIlill = true, await this.setProxy(lll1liIl[0], I1I11I1l);else {
          proxies.filter(l1Il1iIl => l1Il1iIl.index = li1IiiII.index)[0].close = true;
          this.log(JSON.stringify(I11lliIi));
        }
      }
    } catch (ii1llIii) {
      this.log("M_WX_PROXY_URL" + (li1IiiII.index - 1 || "") + "代理获取异常，切换下一个");
      proxies.filter(l11illli => l11illli.index = li1IiiII.index)[0].close = true;
    }
    return i1IIlill;
  }
  async ["setProxy"](IIiiIii1, liliIi1 = "") {
    let iI11Ilil = IIiiIii1.split(":");
    $.defaults.proxy = false;
    let IiiiII = {
      "host": iI11Ilil[0],
      "port": iI11Ilil[1]
    };
    if (liliIi1) {
      IiiiII.proxyAuth = liliIi1;
    }
    $.defaults.httpsAgent = tunnel.httpsOverHttp({
      "proxy": IiiiII
    });
    $.defaults.httpAgent = tunnel.httpsOverHttp({
      "proxy": IiiiII
    });
  }
  async ["router"]() {
    if (reRouterEnable === 1) return;
    !fs.existsSync("magic.lock") && fs.writeFileSync("magic.lock", Date.now().toString());
    let i1lI11li = fs.readFileSync("magic.lock").toString() * 1;
    if ((Date.now() - i1lI11li) / 1000 > resetRouterTimeInterval) {
      fs.writeFileSync("magic.lock", Date.now().toString());
      await notify.sendNotify("M自动重新拨号", this.filename);
      await notify.sendNotify(reRouterMsg, "");
      await this.wait(3 * 1000, 5 * 1000);
    }
  }
  async ["isvObfuscator"](I1I1ll11 = enableCacheToken, I1lIiII1 = isvObfuscatorRetry, liI11i1i = this.cookie) {
    let IIlliil = decodeURIComponent(liI11i1i.match(/pt_pin=(.+?);/) && liI11i1i.match(/pt_pin=(.+?);/)[1]);
    if (I1I1ll11 === 1) {
      !fs.existsSync("tokens") && fs.mkdirSync("tokens");
      let ilIlilI = JSON.parse(this.readFileSync("tokens/" + IIlliil + ".json") || "{}");
      if (ilIlilI && ilIlilI.token && ilIlilI?.["expireTime"] > this.timestamp()) {
        return this.log("缓存获取 isvToken"), this.Token = ilIlilI.token, this.isvToken = ilIlilI.token, {
          "code": "0",
          "token": ilIlilI.token
        };
      }
    }
    let I1lII1li = "body=%7B%22url%22%3A%22https%3A%2F%2Fcjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=b024526b380d35c9e3&client=apple&clientVersion=10.0.10&st=1646999134786&sv=111&sign=fd9417f9d8e872da6c55102bd69da99f";
    try {
      let iI1i1I = await this.sign("isvObfuscator", {
        "id": "",
        "url": "https://" + this.domain
      });
      iI1i1I.sign && (I1lII1li = iI1i1I.sign);
      let Illlll1 = "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        Il1I1il = {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Cookie": liI11i1i,
          "User-Agent": "JD4iPhone/168069 (iPhone; iOS 13.7; Scale/3.00)"
        };
      this.log("实时获取 isvToken");
      let {
        data: ii1lIIl
      } = await this.request(Illlll1, Il1I1il, I1lII1li);
      if (I1I1ll11 && ii1lIIl?.["code"] === "0" && ii1lIIl.token) {
        if (I1I1ll11) {
          let i11Iilil = {
            "expireTime": this.timestamp() + this.random(tokenCacheMin, tokenCacheMax) * 60 * 1000,
            "token": ii1lIIl.token
          };
          this.writeFileSync("tokens/" + IIlliil + ".json", JSON.stringify(i11Iilil));
        }
      } else {
        if (ii1lIIl?.["code"] === "3" && ii1lIIl?.["errcode"] === 264) {
          this.putMsg("CK已失效");
          throw new Error("CK已失效");
        }
      }
      return this.isvToken = ii1lIIl.token, this.Token = ii1lIIl.token, ii1lIIl;
    } catch (IillllIl) {
      this.log(IillllIl.message);
      if (I1lIiII1 > 0 && this.isProxy(IillllIl.message)) {
        return this.log("第" + (isvObfuscatorRetry - I1lIiII1) + "去重试isvObfuscator接口,等待" + isvObfuscatorRetryWait + "秒"), await this.routerProxy(), await this.isvObfuscator(I1I1ll11, --I1lIiII1);
      }
    }
    this.Token = "";
    throw new Error("获取Token失败");
    return {
      "code": "1",
      "token": ""
    };
  }
  async ["getSimpleActInfoVo"](lliIIil1 = "customer/getSimpleActInfoVo", l1iI1lI = 1) {
    if (this.venderId && this.shopId && this.activityType) {
      await this.initPinToken();
      return;
    }
    let I11li1I1 = await this.api(lliIIil1, l1iI1lI === 1 ? "activityId=" + this.activityId : l1iI1lI);
    if (!I11li1I1?.["result"] || !I11li1I1?.["data"]) {
      this.putMsg("手动确认");
      this.expire = true;
      throw new Error("活动已结束");
    }
    this.venderId = I11li1I1.data?.["venderId"] || this.venderId;
    this.shopId = I11li1I1.data?.["shopId"] || this.shopId;
    this.activityType = I11li1I1.data?.["activityType"] || this.activityType;
    await this.initPinToken();
  }
  async ["initPinToken"]() {
    try {
      if (this.activityUrl.includes("activityType")) {
        if (!notInitPinTokenRegex.test(this.activityUrl)) {
          if (this.defenseUrls && this.defenseUrls.length === 0) {
            let i1lI11Il = await this.api("api/user-info/getDefenseUrls", "");
            this.defenseUrls = i1lI11Il.data.map(iI1Ill1 => iI1Ill1.interfaceName);
          }
        }
        await this.api("api/user-info/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&shopId=" + this.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      } else {
        if (this.defenseUrls && this.defenseUrls.length === 0) {
          let IiliiI1I = await this.api("customer/getDefenseUrls", "");
          this.defenseUrls = IiliiI1I.data;
        }
        await this.api("customer/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&venderId=" + this.venderId + "&shopId=" + this.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      }
    } catch (lIiIiil1) {
      console.log(lIiIiil1);
    }
  }
  async ["getMyPing"](IlilIIll = "customer/getMyPing", I11II1ll = 0) {
    try {
      let iIIllIil = await this.api(IlilIIll, "userId=" + this.venderId + "&token=" + this.Token + "&pin=&fromType=APP&riskType=0");
      this.Pin = "";
      if (!iIIllIil.result) {
        if (iIIllIil.errorMessage.includes("请联系商家")) {
          this.expire = true;
          this.putMsg("商家token过期");
          throw new Error(iIIllIil.errorMessage);
        }
        if (I11II1ll < 3 && !iIIllIil.errorMessage?.["includes"]("活动太火爆")) this.putMsg("重试pin获取"), await this.getMyPing(IlilIIll, ++I11II1ll);else {
          this.putMsg(iIIllIil.result.errorMessage);
          return;
        }
      }
      let Illi1lii = iIIllIil.data.secretPin;
      this.nickname = iIIllIil.data.nickname;
      this.Pin = this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(Illi1lii)) : encodeURIComponent(Illi1lii);
    } catch (iI1Il1ll) {
      this.putMsg(iI1Il1ll?.["message"]);
      this.nickname = this.username;
      let lIiiI1II = this.tickets.get("AUTH_C_USER");
      this.Pin = lIiiI1II || encodeURIComponent(lIiiI1II) || this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(lIiiI1II)) : encodeURIComponent(lIiiI1II);
    }
  }
  async ["accessLog"](ll1Iill1 = "" + (this.domain.includes("cjhy") ? "common/accessLog" : "common/accessLogWithAD")) {
    await this.api(ll1Iill1, "venderId=" + this.venderId + "&code=" + this.activityType + "&pin=" + this.Pin + "&activityId=" + this.activityId + "&pageUrl=" + encodeURIComponent(this.activityUrl) + "&subType=app&adSource=");
  }
  async ["sign"](IIiiI1l, liil1i1l = {}) {
    let ll1I1IIi = {},
      iiIlill = {
        "fn": IIiiI1l,
        "body": liil1i1l
      },
      i1ll11il = {
        "token": apiToken,
        "Cookie": 123
      };
    const IIIl11i = $.defaults.httpsAgent,
      iIIlll1I = $.defaults.httpsAgent;
    $.defaults.httpsAgent = false;
    $.defaults.httpAgent = false;
    try {
      let {
        data: III1lIli
      } = await this.request(signMode.includes("server") ? "http://172.17.0.1:17840/sign" : apiSignUrl, i1ll11il, iiIlill);
      return {
        "fn": III1lIli.fn,
        "sign": III1lIli.body
      };
    } catch (I11i11il) {
      console.log("sign解析接口失效: " + I11i11il.message);
    } finally {
      $.defaults.httpsAgent = IIIl11i;
      $.defaults.httpAgent = iIIlll1I;
    }
    return ll1I1IIi;
  }
  async ["login"](ilIIi1 = this.Token) {
    if (hdbTypes.includes(this.domain)) {
      let II11IIIl = await this.api("/front/fans/login", {
        "source": "01",
        "token": ilIIi1
      });
      if (II11IIIl.code == "200") {
        this.log("登录成功 " + II11IIIl.result.grade);
        this.aesBuyerNick = II11IIIl.result.aesBuyerNick;
        II11IIIl.result.grade < 0 && /partitionTeam/.test(this.activityUrl) && (await this.openCard());
        if (this.index > this.masterNum && II11IIIl.result.grade > 0 && /inviteJoin/.test(this.activityUrl)) {
          throw new Error("已经是会员无法助力");
        }
        await this.api("/front/activity/reportPVUV", {
          "source": "01",
          "token": ilIIi1
        });
        await this.loadFrontAct();
      } else {
        this.putMsg("登录失败");
        throw new Error(II11IIIl.message);
      }
    } else {
      let l1iilIli = await this.api("/api/user-info/login", {
        "status": "0",
        "activityId": this.activityId,
        "tokenPin": ilIIi1,
        "source": "01",
        "shareUserId": ""
      });
      if (l1iilIli.resp_code !== 0) {
        this.putMsg("登录失败");
        throw new Error(l1iilIli.message);
      }
      this.isvToken = ilIIi1;
      this.Token = l1iilIli.data.token;
      try {
        this.venderId = l1iilIli.data.venderId || l1iilIli.data.joinInfo.openCardUrl.split("venderId=")[1].split("&")[0];
      } catch (iilIIIl) {
        this.venderId = l1iilIli.data.venderId || l1iilIli.data.shopId;
      }
      this.shopId = l1iilIli.data.shopId;
      this.shopName = l1iilIli.data.shopName;
      this.joinCode = l1iilIli.data.joinInfo.joinCodeInfo.joinCode;
      this.joinDes = l1iilIli.data.joinInfo.joinCodeInfo.joinDes;
      this.log("登录成功 " + this.joinCode + " " + this.joinDes);
      let il1ilIil = await this.api("/api/active/basicInfo", {
        "activityId": this.activityId
      });
      this.actStartTime = il1ilIil.data.startTime;
      this.actEndTime = il1ilIil.data.endTime;
      this.actName = il1ilIil.data.actName;
      (!this.prizeList || this.prizeList.length <= 0) && (await this.getPrizeList());
      this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(iiIl1III => ![2].includes(iiIl1III.prizeType) && iiIl1III.leftNum !== 0).length === 0 && (this.putMsg("垃圾活动"), this.expire = true);
      if (this.actStartTime > this.timestamp()) {
        this.putMsg("活动未开始");
        this.expire = true;
        throw new Error("活动未开始");
      }
      if (this.timestamp() > this.actEndTime) {
        this.putMsg("活动已结束");
        this.expire = true;
        throw new Error("活动已结束");
      }
      if (this.expire) throw new Error("垃圾活动");
      this.isMember = ["1001", "1004"].includes(this.joinCode);
      try {
        await this.api("/api/task/followShop/follow", {});
      } catch (IlliIllI) {}
      await this.initPinToken();
      if (!this.isMember && openCardTypes.includes(this.activityType)) {
        await this.openCard();
        this.isMember = true;
        return;
      }
      !this.isMember && this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(IllIlliI => [1, 3].includes(IllIlliI.prizeType) && IllIlliI.leftNum !== 0).length > 0 && ["10023", "10024", "10040", "10036", "10068", "10002"].includes(this.activityType) && (await this.openCard(), this.isMember = true);
      if (!this.isMember) {
        this.putMsg("" + this.joinDes);
        throw new Error(this.joinDes);
      }
    }
  }
  async ["getPrizeList"]() {
    let lliIll1i = await this.api("/api/prize/drawPrize", {});
    if (lliIll1i.resp_code !== 0) {
      this.log("获取奖品是失败");
      return;
    }
    this.prizeList = lliIll1i.data?.["prizeInfo"] || [];
  }
  async ["loadFrontAct"]() {
    let iiII111i = await this.api("/front/activity/loadFrontAct", {});
    if (iiII111i.code == "200") {
      this.actStartTime = iiII111i.result.activity.startTime;
      this.actEndTime = iiII111i.result.activity.endTime;
      this.rule = iiII111i.result.activity.remark;
      this.shopName = iiII111i.result.activity.shopTitle;
      this.useGrade = iiII111i.result.activity.useGrade;
      this.shopId = iiII111i.result.user.shopId;
      this.venderId = iiII111i.result.user.venderId;
      this.memberStatus = iiII111i.result.user.memberStatus;
      this.actName = iiII111i.result.activity.actName;
      if (this.actStartTime > this.timestamp()) {
        this.putMsg("活动未开始");
        this.expire = true;
        throw new Error("活动未开始");
      }
      if (this.actEndTime < this.timestamp()) {
        this.putMsg("活动已结束");
        this.expire = true;
        throw new Error("活动已结束");
      }
      iiII111i.result.activity.isNeedFavourite && !iiII111i.result.isFavouriteShop && (await this.reportActionLog({
        "actionType": "favouriteShop"
      }));
    } else {
      this.putMsg("loadFrontAct失败");
      throw new Error(iiII111i.message);
    }
    if (!this.prizeList || this.prizeList.length <= 0) {
      let iIi1lIlI = await this.api("/front/activity/loadFrontAward", {});
      if (iIi1lIlI.succ) {
        this.prizeList = iIi1lIlI.result || [];
        this.activity = iiII111i.result;
        if (this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(li111lll => !["JD_D_COUPON"].includes(li111lll.awardType)).length === 0) {
          this.expire = true;
          this.putMsg("垃圾活动");
          throw new Error("垃圾活动");
        }
      }
    }
  }
  async ["reportActionLog"](il1II11i) {
    await this.wait(3000, 5000);
    let llI1ii = await this.api("/front/activity/reportActionLog", il1II11i);
    llI1ii.code == "200" ? this.log(il1II11i?.["actionType"] + "操作成功") : this.putMsg(llI1ii.message);
  }
  ["v"](iiili11l) {
    let l1Ili1i1 = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
    var iIIIi1I = iiili11l.nowTime + parseInt(this.tickets.get("te"));
    iiili11l.nowTime = iIIIi1I;
    debugger;
    for (var IIII11li = this.tickets.get("pToken") + iIIIi1I, iiIiilil = IIII11li.substring(0, IIII11li.length - 5), Il11liIl = "", il1IIIlI = 0; il1IIIlI < iiIiilil.length; il1IIIlI++) {
      var iII1IIll = iiIiilil.charCodeAt(il1IIIlI);
      Il11liIl += l1Ili1i1[iII1IIll % 10][il1IIIlI];
    }
    for (var IIi11iiI = Il11liIl.length, iIill1Il = Math.floor(IIi11iiI / 24), IlI1iil = "", III1l1I = 0; III1l1I < 24; III1l1I++) {
      var i11lIII = (III1l1I + 1) * iIill1Il;
      23 === III1l1I && (i11lIII = IIi11iiI);
      for (var IIiII1Il = Il11liIl.substring(III1l1I * iIill1Il, i11lIII), iIlIl1i1 = [], llI1IiIl = 0; llI1IiIl < IIiII1Il.length; llI1IiIl++) {
        iIlIl1i1.push(IIiII1Il.charCodeAt(llI1IiIl));
      }
      var lli1liI = iIlIl1i1.reduce(function (Ii1II11, iIl1i1lI) {
          return Ii1II11 + iIl1i1lI;
        }, 0),
        IIIilII1 = Math.floor(lli1liI / iIlIl1i1.length);
      IlI1iil += String.fromCharCode(IIIilII1);
    }
    var lliiI1II = function (il1li1ll) {
        il1li1ll = il1li1ll.split("").reverse().join("");
        for (var i11llili = new Uint8Array(12), iIIi11l = new TextEncoder().encode(il1li1ll), i1i1iIlI = 0; i1i1iIlI < iIIi11l.length; i1i1iIlI += 2) {
          var iiI1ll1 = iIIi11l[i1i1iIlI] << 5 | 255 & iIIi11l[i1i1iIlI + 1];
          iiI1ll1 %= 63;
          i11llili[i1i1iIlI >> 1] = iiI1ll1;
        }
        for (var I1i1IiIi = "", I11I11l = 0; I11I11l < i11llili.length; I11I11l++) {
          I1i1IiIi += (i11llili[I11I11l] + 256).toString(2).slice(1);
        }
        for (var iIlil1lI = "", iIlIIiIl = "", IilIIII1 = 0; IilIIII1 < 16; IilIIII1++) {
          if (0 !== IilIIII1) {
            for (var lllII1ll = 6 * IilIIII1, ll1II1iI = I1i1IiIi.substring(lllII1ll, lllII1ll + 6), liI1iI1l = parseInt(ll1II1iI, 2), i11iIl1l = iIlIIiIl.split(""), illI1lii = 0; illI1lii < i11iIl1l.length; illI1lii++) {
              "1" === i11iIl1l[illI1lii] && (liI1iI1l = 63 & (liI1iI1l >> 6 - illI1lii | liI1iI1l << illI1lii));
            }
            iIlIIiIl = (63 & liI1iI1l).toString(2).padStart(6, "0");
          } else iIlIIiIl = I1i1IiIi.substring(0, 6);
          iIlil1lI += iIlIIiIl;
        }
        for (var lilIi11I = 0; lilIi11I < 12; lilIi11I++) {
          var II11IIl1 = 8 * lilIi11I;
          i11llili[lilIi11I] = parseInt(iIlil1lI.substring(II11IIl1, II11IIl1 + 8), 2);
        }
        return base64.encode(String.fromCharCode.apply(null, i11llili));
      }(Il11liIl = IlI1iil),
      iilIlll = CryptoJS.enc.Utf8.parse(lliiI1II),
      iIllIlii = CryptoJS.enc.Utf8.parse("");
    return CryptoJS.AES.encrypt(JSON.stringify(iiili11l), iilIlll, {
      "iv": iIllIlii,
      "mode": CryptoJS.mode.ECB,
      "padding": CryptoJS.pad.Pkcs7
    }).toString();
  }
  async ["api"](liII11, iIIl1lil, iiIIl1lI = this.Token, ll11il1l = this.ticket, ii111II1 = 0) {
    let lI1I11II = iIIl1lil;
    try {
      liII11 = ("/" + liII11).replace("//", "/");
      this.urlPrefix = this.urlPrefix ? ("/" + this.urlPrefix).replace("//", "/") : "";
      let i1ilIi1i = "https://" + this.domain + this.urlPrefix + liII11,
        l11I111I = {
          "Host": this.domain,
          "Accept": "application/json, text/plain, text/javascript, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": iIIl1lil ? typeof iIIl1lil == "string" ? "application/x-www-form-urlencoded;charset=utf-8" : "application/json;charset=utf-8" : "application/x-www-form-urlencoded;charset=utf-8",
          "Origin": "https://" + this.domain,
          "Cookie": this.activityUrl.match(new RegExp(["prod/cc", "interact", "crm-proya", ...hdbTypes, ...jinggengcjTypes].join("|"))) ? "" : "IsvToken=" + iiIIl1lI + ";" + ll11il1l,
          "Referer": this.activityUrl + "&sid=" + this.randomString() + "&un_area=" + this.randomPattern("xx_xxxx_xxxx_xxxxx"),
          "User-Agent": this.UA
        };
      iiIIl1lI?.["startsWith"]("ey") && (l11I111I.token = iiIIl1lI);
      if (hdbTypes.includes(this.domain)) {
        iIIl1lil = this.hdbBody(liII11, iIIl1lil, l11I111I);
      }
      jinggengcjTypes.includes(this.domain) && (iIIl1lil = this.jinggengjcqBody(liII11, iIIl1lil));
      if (this.defenseUrls && this.defenseUrls.includes(liII11)) {
        if (this.activityUrl.includes("interactsaas")) {
          iIIl1lil.nowTime = this.timestamp();
          iIIl1lil.actId = this.activityId;
          iIIl1lil.consumePoints = iIIl1lil.consumePoints || 0;
        } else {
          const IIiIiI1I = new URLSearchParams(iIIl1lil);
          iIIl1lil = {};
          for (const [l1l1IIi, ll1l1liI] of IIiIiI1I.entries()) {
            iIIl1lil[l1l1IIi] = ll1l1liI;
          }
          iIIl1lil.nowTime = this.timestamp();
          iIIl1lil.actId = this.activityId;
          debugger;
        }
        l11I111I.Cookie = "IsvToken=" + this.isvToken + ";" + this.ticket + "isBasicJson=true;";
        let lIiiIIil = this.v(iIIl1lil);
        iIIl1lil = {
          "ecyText": lIiiIIil
        };
      }
      let {
        data: i11lli1l
      } = await this.request(i1ilIi1i, l11I111I, iIIl1lil);
      if (this.defenseUrls && this.defenseUrls.includes(liII11) && (!i11lli1l || i11lli1l.length === 0) && ii111II1 < 5) return await this.initPinToken(), await this.api(liII11, lI1I11II, iiIIl1lI, ll11il1l, ++ii111II1);
      if (!i11lli1l) return i11lli1l;
      let lIi1II1 = JSON.stringify(i11lli1l);
      if (lIi1II1?.["includes"]("AUTH.FAILED.BLACK")) {
        return this.putMsg("AUTH BLACK"), i11lli1l;
      }
      if (lIi1II1?.["includes"]("请稍后重试") && jinggengcjTypes.includes(this.domain)) {
        return i11lli1l;
      }
      if (new RegExp(reTryRegx).test(lIi1II1) && ii111II1 < 5) {
        return this.log("重试" + ii111II1), await this.api(liII11, lI1I11II, iiIIl1lI, ll11il1l, ++ii111II1);
      }
      if ((lIi1II1.includes("您点的太快了") || lIi1II1.includes("操作过于频繁")) && ii111II1 < 5) {
        return this.log("重试" + ii111II1), await this.wait(3000, 5000), await this.api(liII11, lI1I11II, iiIIl1lI, ll11il1l, ++ii111II1);
      }
      if (lIi1II1.includes("请求的数字签名不匹配")) return this.log("签名错误"), await this.login(this.isvToken), await this.api(liII11, lI1I11II, iiIIl1lI, ll11il1l, ++ii111II1);
      if (lIi1II1.includes("会员等级不")) {
        if (iiIIl1lI?.["startsWith"]("ey") && ii111II1 < 3) return this.log("等级不足重试" + ii111II1), await this.login(this.isvToken), await this.wait(3000, 5000), await this.api(liII11, lI1I11II, this.Token, ll11il1l, ++ii111II1);else {
          this.putMsg("等级不足");
          throw new Error("等级不足");
        }
      }
      return (lIi1II1.includes("商家token过期") || lIi1II1.includes("商家订购过期")) && (this.putMsg("商家token过期"), this.expire = true), i11lli1l;
    } catch (IiilIl) {
      if (ii111II1 > 3) throw new Error(IiilIl.message);
      if (this.defenseUrls && this.defenseUrls.includes(liII11) && [500].includes(IiilIl.response?.["status"])) return this.log("重试"), await this.initPinToken(), await this.api(liII11, lI1I11II, iiIIl1lI, ll11il1l, ++ii111II1);
      if (this.isProxy(IiilIl.message)) return await this.routerProxy(ii111II1), await this.api(liII11, lI1I11II, iiIIl1lI, ll11il1l, ++ii111II1);else throw new Error(IiilIl.message);
    }
  }
  ["jinggengjcqBody"](i1iII1li, IIli1l11) {
    let Iiiilili = i1iII1li.match(/dm\/front(.+)\?/)[1];
    delete IIli1l11.method;
    let iii11Ii = {
        "actId": this.activityId,
        ...IIli1l11,
        "method": Iiiilili,
        "userId": this.userId,
        "buyerNick": this.buyerNick || ""
      },
      lilli1II = this.mpdzSign(iii11Ii),
      ii11I1 = "94854284";
    const iliIlii = {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "appkey": ii11I1,
          "m": "POST",
          "oba": lilli1II.sign,
          "timestamp": lilli1II.timeStamp,
          "userId": this.userId
        },
        "admJson": {
          "actId": this.activityId,
          ...IIli1l11,
          "method": Iiiilili,
          "userId": this.userId,
          "buyerNick": this.buyerNick || ""
        }
      }
    };
    return Iiiilili?.["indexOf"]("missionInviteList") > -1 && delete iliIlii.params.admJson.actId, JSON.stringify(iliIlii);
  }
  ["mpdzSign"](I1I1lI1l) {
    let IiiIIi1i = "6cc5dbd8900e434b94c4bdb0c16348ed",
      llillIIi = "c1614da9ac68",
      lIIl1iIi = new Date().valueOf(),
      ll1iiI1l = encodeURIComponent(JSON.stringify(I1I1lI1l)),
      IiiIl1I = new RegExp("'", "g"),
      llllli = new RegExp("~", "g");
    ll1iiI1l = ll1iiI1l.replace(IiiIl1I, "%27");
    ll1iiI1l = ll1iiI1l.replace(llllli, "%7E");
    let l1iIIIii = "f" + llillIIi + "D" + ll1iiI1l + "c" + lIIl1iIi + IiiIIi1i,
      lIiIIi1I = CryptoJS.MD5(l1iIIIii.toLowerCase()).toString();
    return {
      "sign": lIiIIi1I,
      "timeStamp": lIIl1iIi
    };
  }
  ["hdbBody"](il111iil, Ill11Il1, i1i1ll1i) {
    let IIiIII11 = this.aesBuyerNick,
      iiIl1i11 = Date.now(),
      I1IiII1I = {
        "appJsonParams": {
          "id": this.activityId,
          "userId": this.venderId,
          "shopId": this.shopId || this.venderId,
          ...Ill11Il1,
          "buyerNick": IIiIII11,
          "method": il111iil
        },
        "sysParams": {
          "sysmethod": JSON.stringify(il111iil).replace(/[^\u4e00-\u9fa5\w]/g, ""),
          "timestamp": iiIl1i11,
          "actid": this.activityId
        }
      };
    Ill11Il1 && (Ill11Il1 = I1IiII1I);
    !IIiIII11 && (delete Ill11Il1.appJsonParams.buyerNick, delete Ill11Il1.sysParams.buyernick);
    this.tickets.get("_sk") ? i1i1ll1i._sk = this.tickets.get("_sk") : "";
    this.tickets.get("zxhd_aes_buyer_nick") ? i1i1ll1i._dzf = this.tickets.get("zxhd_aes_buyer_nick") : "";
    let l11lil = "actid" + this.activityId + "buyernick" + (IIiIII11 || "undefined") + "sysmethod" + JSON.stringify(il111iil).replace(/[^\u4e00-\u9fa5\w]/g, "") + "timestamp" + iiIl1i11,
      IIilli1I = i1i1ll1i._sk || "1111";
    return Ill11Il1.sysParams.sign = CryptoJS.HmacSHA256(l11lil, IIilli1I).toString(CryptoJS.enc.Hex), Ill11Il1;
  }
  async ["selectAddress"](IiIl11Ii) {
    let iliI11il,
      IiIlI111 = M_WX_ADDRESS_MODE.toUpperCase();
    this.log("当前填地址模式: " + M_WX_ADDRESS_MODE.toUpperCase());
    ["PIN"].includes(IiIlI111) && (iliI11il = this.accounts[IiIl11Ii]?.["address"] || this.accounts[encodeURIComponent(IiIl11Ii)]?.["address"]);
    if (iliI11il) {
      return iliI11il;
    }
    ["CC", "CCWAV"].includes(IiIlI111) && (iliI11il = this.accounts["默认地址" + this.addressIndex]?.["address"]);
    if (iliI11il) {
      return iliI11il;
    }
    let i1iIi11I = [];
    for (let lIIIIil in this.accounts) {
      this.accounts[lIIIIil]?.["address"] && i1iIi11I.push(this.accounts[lIIIIil].address);
    }
    if (["RANGE"].includes(IiIlI111)) {
      let iIIiIIli = Math.min(parseInt(M_WX_ADDRESS_RANGE?.["split"]("-")?.[1] || i1iIi11I.length), i1iIi11I.length);
      this.addressIndex > iIIiIIli && (this.addressIndex = 1);
      iliI11il = i1iIi11I[this.addressIndex - 1];
    }
    if (iliI11il) {
      return iliI11il;
    }
    if (M_WX_ADDRESS_MODE_LOWER || ["RANDOM"].includes(IiIlI111)) {
      debugger;
      return i1iIi11I[this.random(1, i1iIi11I.length) - 1];
    }
  }
  async ["saveAddress"](lI11IlI1 = this.addressId, I1111l1I = this.prizeName, iiIIll1l = this.Pin, lIlIIIII = this.username, IlI1lllI = "") {
    if (await this.wxAddressStop(I1111l1I)) {
      this.putMsg("命中关键词，不填写地址！");
      return;
    }
    if (await this.wxAddressStopRule()) {
      this.putMsg("命中规则，不填地址beta！");
      return;
    }
    this.currAddrUsername && this.currAddrUsername !== lIlIIIII && this.addressIndex++;
    this.currAddrUsername = lIlIIIII;
    let I1iillI1 = await this.selectAddress(lIlIIIII);
    if (!I1iillI1) {
      this.putMsg("没有找到地址信息");
      return;
    }
    (M_WX_ADDRESS_LOG || mode) && this.log("当前地址详情" + JSON.stringify(I1iillI1));
    let i11lIiIi = this.shopName;
    if (!i11lIiIi) {
      try {
        i11lIiIi = await this.getShopName();
      } catch (il11ilil) {
        console.log("addr" + il11ilil);
      }
    }
    try {
      if (jinggengcjTypes.includes(this.domain)) {
        let i1l1l11i = await this.api("/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + (this.buyerNick || "") + "&user_id=10299171", {
          "receiverName": I1iillI1.receiver,
          "receiverMobile": I1iillI1.phone,
          "receiverProvince": I1iillI1.province,
          "receiverCity": I1iillI1.city,
          "receiverDistrict": I1iillI1.county,
          "receiverAddress": I1iillI1.address,
          "logId": lI11IlI1
        });
        console.log(i1l1l11i);
      } else {
        if (this.domain.includes("jinggeng")) {
          let IIi1IIIi = I1iillI1.province.replace("市", "").replace("省", "") + " " + I1iillI1.city.replace("市", "") + " " + I1iillI1.county + I1iillI1.address,
            i1Iii1il = await this.api("/ql/front/postBuyerInfo", "receiverName=" + encodeURIComponent(I1iillI1.receiver) + "&mobile=" + I1iillI1.phone + "&address=" + encodeURIComponent(IIi1IIIi) + "&log_id=" + lI11IlI1 + "&user_id=" + this.userId);
          console.log(i1Iii1il);
          i1Iii1il.succ ? (this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + I1111l1I + "," + lIlIIIII + "," + I1iillI1.phone + "," + I1iillI1.address + "," + this.name + "," + i11lIiIi + "," + this.activityUrl + "\n")) : this.putMsg(i1Iii1il.msg);
        } else {
          if (this.activityUrl.includes("interact") || this.activityUrl.includes("prod/cc") || this.activityUrl.includes("crm-proya")) {
            let liIil1ii = await this.api("/api/my/prize/update", {
              "realName": I1iillI1.receiver,
              "mobile": I1iillI1.phone,
              "address": I1iillI1.address,
              "orderCode": this.addressId,
              "province": I1iillI1.province,
              "city": I1iillI1.city,
              "county": I1iillI1.county
            });
            console.log(liIil1ii);
            liIil1ii?.["data"] !== "2" ? (this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + I1111l1I + "," + lIlIIIII + "," + I1iillI1.phone + "," + I1iillI1.address + "," + this.name + "," + i11lIiIi + "," + this.activityUrl + "\n")) : this.putMsg("超一小时或其他报错，请手动进活动确认");
          } else {
            let IIi1lIIi = await this.api("wxAddress/save", "venderId=" + this.venderId + "&pin=" + iiIIll1l + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(I1111l1I) + "&receiver=" + encodeURIComponent(I1iillI1.receiver) + "&phone=" + I1iillI1.phone + "&province=" + encodeURIComponent(I1iillI1.province) + "&city=" + encodeURIComponent(I1iillI1.city) + "&address=" + encodeURIComponent(I1iillI1.address) + "&generateId=" + lI11IlI1 + "&postalCode=" + I1iillI1.postalCode + "&areaCode=" + encodeURIComponent(I1iillI1.areaCode) + "&county=" + encodeURIComponent(I1iillI1.county));
            if (!IIi1lIIi?.["result"]) {
              if (IIi1lIIi.errorMessage.includes("您必须在中奖一小时内填写中奖地址")) return;
            }
            IIi1lIIi?.["result"] ? (this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + I1111l1I + "," + lIlIIIII + "," + I1iillI1.phone + "," + I1iillI1.address + "," + this.name + "," + i11lIiIi + "," + this.activityUrl + "\n")) : (IIi1lIIi = await this.api("wxAddress/save", "venderId=" + this.shopId + "&pin=" + iiIIll1l + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(I1111l1I) + "&receiver=" + encodeURIComponent(I1iillI1.receiver) + "&phone=" + I1iillI1.phone + "&province=" + encodeURIComponent(I1iillI1.province) + "&city=" + encodeURIComponent(I1iillI1.city) + "&address=" + encodeURIComponent(I1iillI1.address) + "&generateId=" + lI11IlI1 + "&postalCode=" + I1iillI1.postalCode + "&areaCode=" + encodeURIComponent(I1iillI1.areaCode) + "&county=" + encodeURIComponent(I1iillI1.county)), IIi1lIIi?.["result"] ? (this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + I1111l1I + "," + lIlIIIII + "," + I1iillI1.phone + "," + I1iillI1.address + "," + this.name + "," + i11lIiIi + "," + this.activityUrl + "\n")) : this.putMsg("" + IIi1lIIi?.["errorMessage"]));
          }
        }
      }
    } catch (illIlIil) {
      console.log(illIlIil);
    }
  }
  async ["carData"]() {
    let iill1lll = "https://wq.jd.com/deal/mshopcart/uncheckcmdy?sceneval=2&g_login_type=1&g_ty=ajax",
      l1I1lliI = "commlist=&pingouchannel=0&all=1&scene=0&locationid=&type=0&templete=1&reg=1&version=20190418&traceid=&tabMenuType=4&sceneval=2",
      IlliI1II = {
        "Accept": "application/json",
        "Origin": "https://p.m.jd.com",
        "Cookie": this.cookie,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "wq.jd.com",
        "User-Agent": "jdpingou;5.5.2;;session/9;brand/apple",
        "Referer": "https://p.m.jd.com/",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9"
      },
      {
        data: IIIli1
      } = await this.request(iill1lll, IlliI1II, l1I1lliI);
    return IIIli1.errId === "0" ? IIIli1 : "";
  }
  async ["carRmv"](II1Illii = []) {
    let IIlill11 = [],
      iI1II1ll = await this.carData();
    if (iI1II1ll) for (let i111lll1 of iI1II1ll.cart.venderCart) {
      for (let ilIl1i1l of i111lll1.sortedItems) {
        for (let l1IIIIii of ilIl1i1l.polyItem.products) {
          if (II1Illii.length > 0 && II1Illii.includes(l1IIIIii.mainSku.id.toString()) || II1Illii.length === 0) {
            const lIiIlIi = ilIl1i1l.polyItem?.["promotion"]?.["pid"];
            lIiIlIi ? IIlill11.push(l1IIIIii.mainSku.id + ",,1," + l1IIIIii.mainSku.id + ",11," + ilIl1i1l.polyItem.promotion.pid + ",0,skuUuid:" + l1IIIIii.skuUuid + "@@useUuid:0") : IIlill11.push(l1IIIIii.mainSku.id + ",,1," + l1IIIIii.mainSku.id + ",1,,0,skuUuid:" + l1IIIIii.skuUuid + "@@useUuid:0");
          }
        }
      }
    }
    if (IIlill11.length === 0) {
      return;
    }
    this.log("即将删除" + IIlill11.length + "件商品");
    let iIIiIiii = "https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax",
      lII1i1I = "pingouchannel=0&commlist=" + encodeURIComponent(IIlill11.join("$")) + "&type=0&checked=0&locationid=&templete=1&reg=1&scene=0&version=20190418&traceid=&tabMenuType=4&sceneval=2",
      lili11l1 = {
        "Accept": "application/json",
        "Origin": "https://p.m.jd.com",
        "Cookie": this.cookie,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "wq.jd.com",
        "User-Agent": "jdpingou;5.5.2;;session/9;brand/apple",
        "Referer": "https://p.m.jd.com/",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9"
      },
      {
        data: ililI111
      } = await this.request(iIIiIiii, lili11l1, lII1i1I);
    return ililI111.errId === "0" ? ililI111 : {};
  }
  async ["openCardInfo"](lIl1111l = this.venderId, IiIlili = this.cookie, liIIlIii = 0) {
    try {
      if (openCardMode.includes("wh5")) {
        let lI1I1Ill = {
            "venderId": lIl1111l,
            "payUpShop": true,
            "channel": 406
          },
          Ili11l = "https://api.m.jd.com/getShopOpenCardInfo?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(lI1I1Ill)) + "&uuid=88888&clientVersion=9.2.0&client=wh5&" + (await this.h5st());
        return await this.get(Ili11l, {
          "authority": "api.m.jd.com",
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://shopmember.m.jd.com",
          "referer": "https://shopmember.m.jd.com/",
          "user-agent": this.UA,
          "Cookie": this.cookie
        });
      } else {
        let i1l11l1I = "https://api.m.jd.com/client.action?appid=jd_shop_member&" + (await this.h5st({
          "venderId": lIl1111l,
          "channel": 401
        }, "getShopOpenCardInfo"));
        return await this.get(i1l11l1I, {
          "Accept": "*/*",
          "Connection": "close",
          "Referer": "https://shopmember.m.jd.com/shopcard/?",
          "Accept-Encoding": "gzip, deflate, br",
          "Host": "api.m.jd.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
          "Accept-Language": "zh-cn",
          "Cookie": IiIlili
        });
      }
    } catch (I1Ii1iI1) {
      this.log(I1Ii1iI1.message);
      if (liIIlIii < 3 && I1Ii1iI1.message.includes("status code 403")) return this.isProxy(I1Ii1iI1.message) ? (await this.routerProxy(liIIlIii), await this.wait(1000, 2000)) : await this.router(), await this.openCardInfo(lIl1111l, IiIlili, ++liIIlIii);
      return {};
    }
  }
  async ["isOpenCard"](iil11iI = this.venderId, IliI1Ill = this.cookie, I1il11Ii = 0) {
    try {
      let ili111I1 = "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo",
        lI1l1iiI = {
          "venderId": iil11iI
        },
        iIi1Iii = "body=" + encodeURIComponent(JSON.stringify(lI1l1iiI)) + "&uuid=2be5d035ec2c47e682c883a13e02cdb6&client=apple&clientVersion=9.4.0",
        {
          data: liliiiil
        } = await this.request(ili111I1, {
          "Host": "api.m.jd.com",
          "User-Agent": "User-Agent: JD4iPhone/167814 (iPhone; iOS 14.4; Scale/3.00)",
          "Content-Type": "application/x-www-form-urlencoded",
          "Origin": "https://api.m.jd.com",
          "Cookie": IliI1Ill
        }, iIi1Iii);
      return liliiiil?.["result"]?.["userInfo"]?.["openCardStatus"] === 1 && this.log(iil11iI + " 已经是会员"), await this.wait(1000), liliiiil?.["result"]?.["userInfo"]?.["openCardStatus"] === 1;
    } catch (i11i1I1I) {
      this.log(i11i1I1I.message);
      if (I1il11Ii < 3 && i11i1I1I.message.includes("status code 403")) return this.isProxy(i11i1I1I.message) ? (await this.routerProxy(I1il11Ii), await this.wait(1000, 2000)) : await this.router(), await this.isOpenCard(iil11iI, IliI1Ill, ++I1il11Ii);
      return false;
    }
  }
  async ["openCard"](lIilii11 = this.venderId, ll111I = 406, iIIIIii1 = "", I1II11l = 0) {
    try {
      if (I1II11l > 3) return;
      let IliiiIil = {
        "venderId": lIilii11,
        "shopId": this.shopId || lIilii11,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": ll111I
      };
      if (iIIIIii1) {
        Object.assign(IliiiIil, {
          "activityId": iIIIIii1
        });
      }
      let l1iI1il1 = "https://api.m.jd.com/client.action",
        lil111li = {
          "authority": "api.m.jd.com",
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://shopmember.m.jd.com",
          "referer": "https://shopmember.m.jd.com/",
          "user-agent": this.UA,
          "Cookie": this.cookie
        };
      this.openCount++;
      IliiiIil = "appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + encodeURIComponent(JSON.stringify(IliiiIil)) + "&client=H5&clientVersion=9.2.0&" + (await this.h5st());
      let illi1l1 = await this.post(l1iI1il1, IliiiIil, lil111li);
      this.log("开卡结果:" + illi1l1?.["message"]);
      if ([0, 9003].includes(illi1l1?.["busiCode"] * 1)) return illi1l1;
      if ([508, 510, 201, 9002].includes(illi1l1?.["busiCode"] * 1)) throw new Error(illi1l1?.["message"]);
      if ((illi1l1?.["message"]?.["includes"]("火爆") || illi1l1?.["message"]?.["includes"]("失败")) && I1II11l < 3) return await this.openCard(lIilii11, ll111I, iIIIIii1, ++I1II11l);
      return illi1l1;
    } catch (I1iIiIlI) {
      ++I1II11l;
      if (I1II11l < 3 && I1iIiIlI.message.includes("status code 403")) {
        return this.isProxy(I1iIiIlI.message) ? (await this.routerProxy(I1II11l), await this.wait(1000, 2000)) : await this.router(), await this.openCard(lIilii11, ll111I, iIIIIii1, I1II11l);
      } else throw new Error(I1iIiIlI?.["message"]);
    }
  }
  async ["getShopMemberInfo"](i11iIIIi = this.cookie, llliIili = this.shopId, Iii1ll1I = this.venderId) {
    try {
      let i1II1I1 = await this.sign("getFansFuseMemberDetail", {
          "shopId": llliIili,
          "venderId": Iii1ll1I,
          "channel": 102,
          "queryVersion": "10.5.2"
        }),
        iliIl11 = {
          "J-E-H": "",
          "Connection": "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Referer": "",
          "J-E-C": "",
          "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
          "Accept": "*/*",
          "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)",
          "Cookie": i11iIIIi
        },
        l11II11l = "https://api.m.jd.com/client.action?functionId=" + i1II1I1.fn,
        {
          status: il1iIl1,
          data: IiIlIi1I
        } = await this.request(l11II11l, iliIl11, i1II1I1.sign);
      return IiIlIi1I.data[0].memberInfo;
    } catch (li1IilI1) {
      return console.log(li1IilI1), {};
    }
  }
  async ["h5st"](iilII1iI, II11ill = "bindWithVender", I11IlI1I = 0) {
    return h5sts.random();
  }
  ["getAwardText"](iiIi1iil) {
    let Il11IlI1 = "";
    if (iiIi1iil.awardType == "JD_GOODS") Il11IlI1 = iiIi1iil.awardName + " " + iiIi1iil.awardDenomination * 1 + "元";else {
      if (iiIi1iil.awardType == "JD_POINT") Il11IlI1 = iiIi1iil.awardDenomination * 1 + "积分";else {
        if (iiIi1iil.awardType == "JD_COUPON" || iiIi1iil.awardType == "JD_D_COUPON") {
          Il11IlI1 = iiIi1iil.awardDenomination * 1 + "元券";
        } else {
          if (iiIi1iil.awardType == "JD_BEAN" || iiIi1iil.awardType == "JD_MARKET") Il11IlI1 = iiIi1iil.awardDenomination * 1 + "豆";else {
            if (iiIi1iil.awardType == "JD_E_CARD") Il11IlI1 = iiIi1iil.assetsName;else {
              if (iiIi1iil.awardType == "JD_AIQIYI") Il11IlI1 = iiIi1iil.assetsName;else {
                if (iiIi1iil.awardType == "JD_REDBAG" || iiIi1iil.awardType == "JD_RED_BAG") Il11IlI1 = iiIi1iil.awardDenomination * 1 + "元红包";else {
                  Il11IlI1 = iiIi1iil.awardName;
                  debugger;
                }
              }
            }
          }
        }
      }
    }
    return Il11IlI1;
  }
  async ["getOpenCardPath"](IIil1IIi = this.activityUrl) {
    let lI1iIil1 = await this.get(IIil1IIi, {});
    const lIi1ii1i = cheerio.load(cheerio.load(lI1iIil1).html());
    let i1I1liIi = "";
    lIi1ii1i("script[src]").each((llIlIIll, I1i1ii11) => {
      const IIilI11i = lIi1ii1i(I1i1ii11).attr("src");
      let il1I11Ii = IIilI11i.match(/\/\/.*\/js\/index\.\w+\.js/);
      il1I11Ii && il1I11Ii.length > 0 && (i1I1liIi = il1I11Ii[0]);
    });
    lI1iIil1 = await this.get("https:" + i1I1liIi, {});
    let ll1ill1 = lI1iIil1.match(/dingzhi\/([a-zA-Z]+)\/union\/saveTask/);
    return ll1ill1[1];
  }
  async ["apiBatch"](lllI11I, llIII1l1 = {}) {
    let i1Ii1IiI = llIII1l1?.["batchSize"] || 2,
      i1Iil1i = llIII1l1?.["execCount"] || 0,
      IiIlIlII = llIII1l1?.["filterFunc"] || null,
      lli1IllI = llIII1l1?.["processFunc"] || null;
    const IlI11II1 = [];
    for (let iI1IIil1 = 0; iI1IIil1 < i1Iil1i; iI1IIil1++) {
      for (let l1IIliiI = 0; l1IIliiI < lllI11I.length; l1IIliiI += i1Ii1IiI) {
        const liiiIII1 = lllI11I.slice(l1IIliiI, l1IIliiI + i1Ii1IiI),
          i1iIlilI = Promise.all(liiiIII1.map(async i1li1il => {
            try {
              const IiliIIii = await i1li1il();
              if (IiliIIii !== null && (!IiIlIlII || IiIlIlII(IiliIIii))) return lli1IllI ? lli1IllI(IiliIIii) : IiliIIii;
              return null;
            } catch (liIil111) {
              return console.error("任务 " + i1li1il + " 执行出错：" + liIil111), null;
            }
          }));
        IlI11II1.push(i1iIlilI);
      }
    }
    const ll1ll1i = (await Promise.all(IlI11II1)).flat();
    let ii1IIiiI = ll1ll1i.filter(l1IIiiII => l1IIiiII !== null);
    return lli1IllI && (ii1IIiiI = ii1IIiiI.map(iIli1iIi => {
      try {
        return lli1IllI(iIli1iIi);
      } catch (lIIlll11) {
        return console.error("处理结果 " + iIli1iIi + " 出错：" + lIIlll11), null;
      }
    }).filter(IIi1l1I1 => IIi1l1I1 !== null)), ii1IIiiI;
  }
  ["getActivityId"](il1Ii1l1 = this.activityUrl) {
    const iIii1l = new URLSearchParams(new URL(il1Ii1l1).search),
      IllIIll1 = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let IlIII11I = "";
    for (let l1lI1i11 of IllIIll1) {
      IlIII11I = iIii1l.get(l1lI1i11);
      if (IlIII11I) {
        break;
      }
    }
    return !IlIII11I && (IlIII11I = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, il1Ii1l1)), this.activityId = IlIII11I, this.activityId;
  }
  ["filterUrl"](Il1II1il) {
    if (Il1II1il === null) return null;
    const i11i1ill = new URLSearchParams(new URL(Il1II1il).search),
      iIiI111l = [];
    for (const [il1iIIl1, II1i1i] of i11i1ill.entries()) {
      if (keywords.includes(il1iIIl1)) continue;
      iIiI111l.push(il1iIIl1 + "=" + II1i1i);
    }
    if (iIiI111l.length > 0) return Il1II1il.split("?")[0] + "?" + iIiI111l.join("&");
    return Il1II1il;
  }
  ["buildActInfo"]() {
    if (!this.activityUrl) return;
    this.activityUrl = this.filterUrl(this.activityUrl);
    this.activityUrl = this.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, this.activityUrl);
    this.activityUrl = this?.["activityUrl"]?.["replace"](/(isvjd|lzkjdz|cjhydz|lzkjdzisv|cjhydzisv)/g, II1i11li => {
      switch (II1i11li) {
        case "isvjd":
          return "isvjcloud";
        case "lzkjdz":
          return "lzkj";
        case "cjhydz":
          return "cjhy";
        case "lzkjdzisv":
          return "lzkj-isv";
        case "cjhydzisv":
          return "cjhy-isv";
        default:
          return II1i11li;
      }
    }) || "";
    this.domain = this.match(/https?:\/\/([^/]+)/, this.activityUrl);
    this.activityId = this.getActivityId(this.activityUrl);
    while (this.activityId.startsWith("https")) {
      this.activityUrl = this.activityId;
      this.activityId = this.getActivityId(this.activityUrl);
    }
    this.activityType = this.getQueryString(this.activityUrl, "activityType");
    this.venderId = this.getQueryString(this.activityUrl, "user_id") || this.getQueryString(this.activityUrl, "userId") || this.match(/\/m\/(\d+)\//, this.activityUrl) || this.getQueryString(this.activityUrl, "venderId");
    this.userId = this.venderId;
    this?.["activityUrl"] && (this.urlPrefix = Object.keys(urlPrefixes).find(III1iIi1 => this.activityUrl.match(urlPrefixes[III1iIi1])) || "");
    console.log("活动链接 " + this.activityUrl + " " + this.activityType + " " + this.venderId);
  }
  async ["complete"]() {
    !this.runAll && this.index >= this.masterNum && (this.putMsg("全部完成"), this.expire = true);
  }
  ["getAwardPrizeInfo"](IIillIl1) {
    const l1IliIi = IIillIl1.awardType === "JD_BEAN" || IIillIl1.awardType === "JD_MARKET",
      il1ll11l = parseInt(IIillIl1.awardDenomination);
    return {
      "isBean": l1IliIi,
      "prizeNum": il1ll11l
    };
  }
  ["formatDateString"](ii1liiII) {
    if (ii1liiII.match(/\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2}/)) {
      return ii1liiII.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日(\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
    }
    return ii1liiII;
  }
  async ["getRuleSETime"](l1I1ii1I = this.rule) {
    debugger;
    if (this.actStartTime) {
      return;
    }
    const l1llilli = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}|\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}|\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2})/g,
      iIIll1l = l1I1ii1I.match(l1llilli);
    if (iIIll1l) {
      const iIi1lIIi = this.formatDateString(iIIll1l[0]),
        iii111 = this.formatDateString(iIIll1l[1]);
      this.actStartTime = new Date(iIi1lIIi).getTime();
      this.actEndTime = new Date(iii111).getTime();
    } else {
      debugger;
      console.log("未找到活动时间！");
    }
  }
}
module.exports = {
  "http": $,
  "Env": Env,
  "CryptoJS": CryptoJS,
  "notify": notify,
  "fs": fs,
  "cheerio": cheerio,
  "NodeRSA": NodeRSA
};