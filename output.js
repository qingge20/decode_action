//Wed Oct 09 2024 12:37:27 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let mode = __dirname.includes("magic"),
  testMode = process.env.M_TEST_MODE?.["includes"]("on") ? true : mode,
  wxProxyEnable = parseInt(process.env.M_WX_PROXY_ENABLE || "2"),
  wxProxySmart = parseInt(process.env.M_WX_PROXY_SMART || "2"),
  reRouterEnable = parseInt(process.env.M_RE_ROUTER_ENABLE || "2"),
  reRouterMsg = process.env.M_RE_ROUTER_MSG || "重拨",
  openCardMode = process.env.M_OPEN_CARD_MODE || "wh5",
  proxyRegx = process.env.M_WX_PROXY_ENABLE_REGEXP ? process.env.M_WX_PROXY_ENABLE_REGEXP : "(Request failed with status code 504)|(Request failed with status code 403)|disconnected|(Request failed with status code 493)|certificate|timeout|ECONNREFUSED|ETIMEDOUT|(tunneling socket could not be established)",
  reTryRegx = "(哎呀活动火爆，请稍后再试|活动太火爆了|服务器数据忙|奖品与您擦肩而过了哟)",
  tokenCacheMin = parseInt(process.env?.["M_WX_TOKEN_CACHE_MIN"] || 5),
  tokenCacheMax = parseInt(process.env?.["M_WX_TOKEN_CACHE_MAX"] || 10),
  enableCacheToken = parseInt(process.env?.["M_WX_ENABLE_CACHE_TOKEN"] || 1),
  isvObfuscatorRetry = parseInt(process.env?.["M_WX_ISVOBFUSCATOR_RETRY"] || 2),
  isvObfuscatorRetryWait = parseInt(process.env?.["M_WX_ISVOBFUSCATOR_RETRY_WAIT"] || 2),
  signMode = process.env.M_SIGN_MODE ? process.env.M_SIGN_MODE : "local",
  apiToken = process.env.M_API_TOKEN ? process.env.M_API_TOKEN : "",
  apiSignUrl = process.env.M_API_SIGN_URL ? process.env.M_API_SIGN_URL : "http://api.nolanstore.cc/sign",
  wskeyFile = process.env.M_WSKEY_FILE ? process.env.M_WSKEY_FILE : mode ? "/home/magic/Work/wools/doc/config.sh" : "",
  blackPinConfig = {
    "cjhy-isv.isvjcloud.com": process.env.M_WX_CJ_BLACK_COOKIE_PIN ? process.env.M_WX_CJ_BLACK_COOKIE_PIN : "",
    "cjhydz-isv.isvjcloud.com": process.env.M_WX_CJ_BLACK_COOKIE_PIN ? process.env.M_WX_CJ_BLACK_COOKIE_PIN : "",
    "lzkj-isv.isvjcloud.com": process.env.M_WX_LZ_BLACK_COOKIE_PIN ? process.env.M_WX_LZ_BLACK_COOKIE_PIN : "",
    "lzkjdz-isv.isvjcloud.com": process.env.M_WX_LZ_BLACK_COOKIE_PIN ? process.env.M_WX_LZ_BLACK_COOKIE_PIN : "",
    "*": process.env.M_WX_BLACK_COOKIE_PIN ? process.env.M_WX_BLACK_COOKIE_PIN : ""
  },
  stopKeywords = ["来晚了", "已发完", "参数缺失或无效", "超出活动计划时间", "奖品发送失败", "发放完", "全部被领取", "余额不足", "已结束", "活动已经结束", "未开始"];
process.env.M_WX_STOP_KEYWORD ? process.env.M_WX_STOP_KEYWORD.split(/[@,&|]/).forEach(l11ll1I1 => stopKeywords.push(l11ll1I1)) : "";
let M_WX_ADDRESS_MODE = process.env?.["M_WX_ADDRESS_MODE"] || "RANDOM",
  M_WX_ADDRESS_RANGE = process.env?.["M_WX_ADDRESS_RANGE"] || "1-9999",
  M_WX_ADDRESS_MODE_LOWER = parseInt(process.env?.["M_WX_ADDRESS_MODE_LOWER"] || 0),
  M_WX_ADDRESS_LOG = parseInt(process.env?.["M_WX_ADDRESS_LOG"] || 0),
  addressStopKeywords = ["京豆", "红包", "券", "再来一次", "客服"],
  addressStopKeywordsRule = ["下单满", "签收后", "收到货后", "成功购买任意", "必须购买店铺内"];
process.env.M_WX_ADDRESS_STOP_KEYWORD ? process.env.M_WX_ADDRESS_STOP_KEYWORD.split(/[@,&|]/).forEach(ililil => addressStopKeywords.push(ililil)) : "";
process.env.M_WX_ADDRESS_STOP_KEYWORD_RULE ? process.env.M_WX_ADDRESS_STOP_KEYWORD_RULE.split(/[@,&|]/).forEach(i1llIIII => addressStopKeywordsRule.push(i1llIIII)) : "";
let wxWhitelist = [];
process.env.M_WX_WHITELIST ? process.env.M_WX_WHITELIST.split(/[@,&|]/).forEach(Ili1il11 => wxWhitelist.push(Ili1il11.includes("-") ? Ili1il11 : Ili1il11 * 1)) : [];
let wxWhitelistNotSupportFile = ["Invite", "invite", "collectCard", "unPackDraw", "team", "microDz", "share", "opencard"];
process.env.M_WX_WHITELIST_NOT_SUPPORT_FILE ? process.env.M_WX_WHITELIST_NOT_SUPPORT_FILE.split(/[@,&|]/).forEach(iil1lIl => wxWhitelistNotSupportFile.push(iil1lIl)) : "";
let blockPinRegx = process.env.M_WX_BLOCK_PIN_REGX || "",
  openCardTypes = ["10033", "10043", "10052", "10068"];
process.env.M_WX_OPEN_CARD_TYPES ? process.env.M_WX_OPEN_CARD_TYPES.split(/[@,&|]/).forEach(ll1ii1l => openCardTypes.push(ll1ii1l)) : "";
let masterNum = parseInt(process.env.M_WX_LEADER_NUM || "9999");
const notInitPinTokenRegex = /(lorealjdcampaign-rc.isvjcloud.com|interaction\/v1)/,
  urlPrefixes = {
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
  } catch (IiiliIIi) {
    console.log("读取代理配置 出错", IiiliIIi);
  }
}
const version = "v3.7.0",
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
} catch (IliiIII1) {
  console.log("请安装base-64依赖");
}
let NodeRSA;
try {
  NodeRSA = require("node-rsa");
} catch (IIiillil) {
  console.log("请安装node-rsa依赖");
}
const h5sts = require("./h5sts.js");
let cookies = [];
Object.keys(jdCookieNode).length > 0 && Object.keys(jdCookieNode).forEach(l1liII11 => {
  cookies.push(jdCookieNode[l1liII11]);
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
$.defaults.shouldRetry = async iI1Iii => {
  let I1l1i1l1 = iI1Iii.response?.["status"];
  if ([403, 407].includes(I1l1i1l1)) return false;
  if (I1l1i1l1 === 493) {
    return status493 = true, true;
  }
  if (iI1Iii.message.includes("timeout") || iI1Iii.message.includes("TLS") || iI1Iii.message.includes("ECONNRESET")) return true;
  if (iI1Iii.message.includes("tunneling socket could not be established")) return needRouter = true, false;
  return true;
};
$.interceptors.request.use(function (iIl1iI1i) {
  if (iIl1iI1i.url.includes("QueryShopMemberInfoJson") || iIl1iI1i.url.includes("isvObfuscator") || iIl1iI1i.url.includes("getMyPing") || iIl1iI1i.url.includes("getTopAndNewActInfo") || iIl1iI1i.url.includes("initForFarm") || iIl1iI1i.url.includes("scan") || iIl1iI1i.url.includes("getShopHomeBaseInfo") || iIl1iI1i.url.includes("getShopOpenCardInfo") || iIl1iI1i.url.includes("initPetTown") || iIl1iI1i.url.includes("getFansFuseMemberDetail") || iIl1iI1i.url.includes("0/sign") || iIl1iI1i.url.includes("2/sign") || iIl1iI1i.url.includes("9/sign") || iIl1iI1i.url.includes("/h5stv3") || iIl1iI1i.url.includes("/sendMessage") || iIl1iI1i.url.includes("getShopHomeActivityInfo") || iIl1iI1i.url.includes("getShopHomeFloorInfo") || iIl1iI1i.url.includes("rmvCmdy") || iIl1iI1i.url.includes("uncheckcmdy")) return iIl1iI1i;
  return iIl1iI1i;
}, function (iIil1ili) {
  return Promise.reject(iIil1ili);
});
$.interceptors.response.use(function (Iiii111l) {
  if (Iiii111l.config.url.includes("QueryShopMemberInfoJson") || Iiii111l.config.url.includes("isvObfuscator") || Iiii111l.config.url.includes("activityContent") || Iiii111l.config.url.includes("initForFarm") || Iiii111l.config.url.includes("scan") || Iiii111l.config.url.includes("getShopHomeBaseInfo") || Iiii111l.config.url.includes("getShopOpenCardInfo") || Iiii111l.config.url.includes("initPetTown") || Iiii111l.config.url.includes("getFansFuseMemberDetail") || Iiii111l.config.url.includes("0/sign") || Iiii111l.config.url.includes("2/sign") || Iiii111l.config.url.includes("memberBringActPage") || Iiii111l.config.url.includes("9/sign") || Iiii111l.config.url.includes("/h5stv3") || Iiii111l.config.url.includes("/getMyPing") || Iiii111l.config.url.includes("/getSimpleActInfoVo") || Iiii111l.config.url.includes("getShopHomeActivityInfo") || Iiii111l.config.url.includes("getShopHomeFloorInfo") || Iiii111l.config.url.includes("whx_getMShopOutlineInfo") || Iiii111l.config.url.includes("rmvCmdy") || Iiii111l.config.url.includes("/sendMessage") || Iiii111l.config.url.includes("/getGameInfo") || Iiii111l.config.url.includes("/login") || Iiii111l.config.url.includes("/checkOpenCard") || Iiii111l.config.url.includes("/jiugongge/activity") || Iiii111l.config.url.includes("/taskInfo") || Iiii111l.config.url.includes("/organizeTeam/activity") || Iiii111l.config.url.includes("/basicInfo") || Iiii111l.config.url.includes("uncheckcmdy")) return status493 = Iiii111l.status === 493, Iiii111l;
  return status493 = Iiii111l.status === 493, Iiii111l;
}, function (lIIiI1l) {
  let ilii1Iil = lIIiI1l.config;
  if (!ilii1Iil || !ilii1Iil.retry) {
    return Promise.reject(lIIiI1l);
  }
  if (!ilii1Iil.shouldRetry || typeof ilii1Iil.shouldRetry != "function") return Promise.reject(lIIiI1l);
  if (!ilii1Iil.shouldRetry(lIIiI1l)) {
    return Promise.reject(lIIiI1l);
  }
  ilii1Iil.__retryCount = ilii1Iil.__retryCount || 0;
  if (ilii1Iil.__retryCount >= ilii1Iil.retry) return Promise.reject(lIIiI1l);
  ilii1Iil.__retryCount += 1;
  let I1liIiiI = new Promise(function (iIliili1) {
    setTimeout(function () {
      iIliili1();
    }, ilii1Iil.retryDelay || 1);
  });
  return I1liIiiI.then(function () {
    return axios(ilii1Iil);
  });
});
function uuid(I1I1lli1 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return I1I1lli1.replace(/[xy]/g, function (lll1llli) {
    const IillliI = 16 * Math.random() | 0,
      l1ili1II = "x" === lll1llli ? IillliI : 3 & IillliI | 8;
    return l1ili1II.toString(36);
  });
}
class Env {
  constructor(i1illil1) {
    this.name = i1illil1;
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
  async ["run"](ii1iIIiI = {
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
        for (let ili1lliI in process.env) {
          if (!ili1lliI.startsWith("M_") || ili1lliI.includes("URL") || ili1lliI.includes("TOKEN") || ili1lliI.includes("ARGV")) {
            continue;
          }
          console.log(ili1lliI + "=\"" + process.env[ili1lliI] + "\"");
        }
        console.log("-----------------系统参数-----------------");
      }
      this.__start = this.timestamp();
      let I1Ii1lil = "";
      try {
        if (mode) I1Ii1lil = this.readFileSync("/home/magic/Work/wools/doc/account.json");else {
          if (fs.existsSync("utils/account.json")) I1Ii1lil = this.readFileSync("utils/account.json");else {
            if (fs.existsSync("/jd/config/account.json")) {
              I1Ii1lil = this.readFileSync("/jd/config/account.json");
            } else {
              I1Ii1lil = this.readFileSync("account.json");
            }
          }
        }
        if (I1Ii1lil) {
          JSON.parse(I1Ii1lil).forEach(liIII1l => {
            this.accounts[liIII1l.pt_pin] = liIII1l;
            liIII1l?.["address"] && this.accountAddressList.push(liIII1l?.["address"]);
          });
        }
      } catch (illIilI1) {
        console.log("account.json读取异常", illIilI1);
        this.msg.push("account.json读取异常");
      }
      await this.config();
      ii1iIIiI?.["delimiter"] && (this.delimiter = ii1iIIiI?.["delimiter"]);
      ii1iIIiI?.["bot"] && (this.bot = ii1iIIiI.bot);
      console.log("原始ck长度", cookies.length);
      if (ii1iIIiI?.["blacklist"]?.["length"] > 0) for (const liI1iiiI of this.__as(ii1iIIiI.blacklist)) {
        delete cookies[liI1iiiI - 1];
      }
      this.buildActInfo();
      console.log("排除黑名单后ck长度", cookies.length);
      if (wxWhitelist.length > 0 && wxWhitelistNotSupportFile.filter(illIll1i => this.filename.includes(illIll1i)).length === 0 && this.filename.includes("_wx_")) {
        console.log("支持全局无线ck长度:" + wxWhitelist);
        console.log("支持全局无线ck长度:" + wxWhitelistNotSupportFile);
        ii1iIIiI.whitelist = wxWhitelist;
      }
      if (ii1iIIiI?.["whitelist"]?.["length"] > 0) {
        let IIlilllI = [];
        for (const iiIi1l1I of this.__as(ii1iIIiI.whitelist)) {
          iiIi1l1I - 1 < cookies.length && IIlilllI.push(cookies[iiIi1l1I - 1]);
        }
        cookies = IIlilllI;
      }
      console.log("设置白名单后ck长度", cookies.length);
      this.delBlackCK();
      console.log("排除PIN黑名单后ck长度", cookies.length);
      if (fs.existsSync("./ck")) for (let iI1iiIiI of fs.readdirSync("./ck")) {
        if (iI1iiIiI.includes(".txt")) {
          let lI1lI1ll = fs.readFileSync("./ck/" + iI1iiIiI, "utf-8");
          lI1lI1ll = lI1lI1ll.replace(/\r/g, "");
          lI1lI1ll = lI1lI1ll.replace(/\n/g, "&");
          let lII1i11i = lI1lI1ll.split("&");
          for (let iI11il1i = 0; iI11il1i < lII1i11i.length; iI11il1i++) {
            cookies.push(lII1i11i[iI11il1i]);
          }
          console.log("读取" + iI1iiIiI + "后ck长度", cookies.length);
        }
      }
      ii1iIIiI?.["random"] && (cookies = this.randomArray(cookies));
      if (ii1iIIiI?.["wskey"]) try {
        let l1IIiiI1 = fs.existsSync(wskeyFile) ? this.readFileSync(wskeyFile).split("\n") : process.env?.["JD_WSCK"]?.["split"]("&") || [];
        for (let liiIIIi of l1IIiiI1) {
          !liiIIIi.endsWith(";") && (liiIIIi += ";");
          if (liiIIIi.startsWith("pin")) this.wskeys.set(liiIIIi.match(/pin=([^; ]+)(?=;?)/)[1], liiIIIi.match(/(pin=.*?;wskey=.*?;)/)[1]);else liiIIIi.startsWith("wskey") && this.wskeys.set(liiIIIi.match(/pin=([^; ]+)(?=;?)/)[1], liiIIIi.match(/(pin=.*?;wskey=.*?;)/)[1]);
        }
        console.log("当前wskey共计" + this.wskeys.size + "个");
      } catch (lI1liI1) {
        console.log("wkeys读取异常", lI1liI1);
        this.msg.push("wkeys读取异常");
      }
      await this.auth();
      wxProxySmart === 2 && !/(M店铺刮奖|M关注有礼)/.test(this.name) && (await this.routerProxy());
      await this.verify();
      this.cookies = cookies;
      if (ii1iIIiI?.["before"]) {
        for (let ii1IIii1 = 0; ii1IIii1 < this.cookies.length; ii1IIii1++) {
          if (!this.cookies[ii1IIii1]) continue;
          if (this.breakBefore) break;
          let ilii1l11 = this.cookies[ii1IIii1];
          this.cookie = ilii1l11;
          let iiI1ll1I = ilii1l11.match(/pt_pin=(.+?);/) && ilii1l11.match(/pt_pin=(.+?);/)[1];
          this.username = decodeURIComponent(iiI1ll1I);
          this.wskey = this.wskeys.get(iiI1ll1I);
          $.defaults.headers.Cookie = this.cookie;
          this.index = ii1IIii1 + 1;
          try {
            let llliilII = await this.before();
            if (llliilII) {
              this.ext.push(Object.assign({
                "username": this.username,
                "index": this.index,
                "cookie": this.cookie
              }, llliilII));
            }
          } catch (iiIlilI1) {
            console.log(iiIlilI1);
          }
          if (ii1iIIiI?.["wait"]?.["length"] > 0 && this.index !== cookies.length && !this.breakBefore) {
            await this.wait(ii1iIIiI?.["wait"][0], ii1iIIiI?.["wait"][1]);
          }
        }
      }
      let IIiI11il = false;
      lllliIiI: for (let Il11I1Il = 0; Il11I1Il < this.cookies.length; Il11I1Il++) {
        if (!this.cookies[Il11I1Il]) {
          continue;
        }
        if (this.expire) {
          break;
        }
        let iiIi1lll = this.cookies[Il11I1Il];
        this.cookie = iiIi1lll;
        let iI1ilI1 = iiIi1lll.match(/pt_pin=(.+?);/) && iiIi1lll.match(/pt_pin=(.+?);/)[1];
        this.username = decodeURIComponent(iI1ilI1);
        this.index = Il11I1Il + 1;
        if (ii1iIIiI?.["once"] && this.index !== ii1iIIiI.once) {
          IIiI11il = true;
          continue;
        }
        if (this.skipNum > 0 && this.skipNum-- > 0) {
          this.log("跳过当前ck skipNum=" + this.skipNum);
          continue;
        }
        this.wskey = this.wskeys.get(iI1ilI1);
        $.defaults.headers.Cookie = this.cookie;
        !ii1iIIiI?.["before"] ? this.ext.push({
          "username": this.username,
          "index": this.index,
          "cookie": this.cookie
        }) : "";
        if (!(this.activityUrl.includes("prod/cc") || this.activityUrl.includes("interact") || this.activityUrl.includes("crm-proya"))) {
          this.index > 1 ? this.appId === "wx" ? await this._algo() : "" : "";
        }
        status493 = false;
        for (let l1iiIIII = 0; l1iiIIII < 3; l1iiIIII++) {
          try {
            await this.logic();
            ii1iIIiI?.["o2o"] && this.msg.length > 5 && (await this.send(), testMode ? this.log(this.msg.join("\n")) : "", this.msg = []);
            if (IIiI11il) {
              break lllliIiI;
            }
            break;
          } catch (lIIl1il) {
            this.log("捕获异常", lIIl1il.message);
            try {
              if (this.isProxy(lIIl1il?.["message"])) {
                await this.routerProxy();
                continue;
              } else {
                if (lIIl1il?.["response"]?.["status"] === 493 || lIIl1il?.["message"]?.["includes"]("493")) {
                  await this.router();
                  continue;
                }
              }
              if (lIIl1il?.["response"]?.["status"] === 403) {
                this.msg.push("IP 403 403 403");
                continue;
              }
              if (status493) {
                this.msg.push("beta测试");
                continue;
              }
              break;
            } catch (iIiiliiI) {
              this.log(iIiiliiI);
            }
          }
        }
        ii1iIIiI?.["wait"]?.["length"] > 0 && this.index !== cookies.length && !this.expire && (await this.wait(ii1iIIiI?.["wait"][0], ii1iIIiI?.["wait"][1]));
      }
      try {
        this.msg.length > 0 && this.msg.push("");
        this.actName && this.msg.push("活动名称:" + this.actName);
        this.shopName && this.msg.push("#" + this.shopName);
        this.shopId && this.venderId && !this.shopName && this.msg.push("#" + (await this.getShopName()));
        this.shopId && this.venderId && this.msg.push("店铺信息:" + this.shopId + "_" + this.venderId);
        if (this.actStartTime || this.actEndTime) {
          if (this.actStartTime && !("" + this.actStartTime).includes("-")) {
            this.actStartTime = this.formatDate(this.actStartTime, "yyyy-MM-dd HH:mm:ss");
          }
          if (this.actEndTime && !("" + this.actEndTime).includes("-")) {
            this.actEndTime = this.formatDate(this.actEndTime, "yyyy-MM-dd HH:mm:ss");
          }
          this.msg.push("活动时间:" + (this.actStartTime || "") + "至" + (this.actEndTime || ""));
        }
        await this.after();
        if (this.shopId || this.userId || this.venderId) {
          this.msg.push("");
          this.msg.push("https://shop.m.jd.com/shop/home?shopId=" + (this.shopId || this.userId || this.venderId || ""));
        }
      } catch (IIlIl1li) {
        this.log("after error" + IIlIl1li.message);
      }
      console.log(this.now() + " " + this.name + " 运行结束,耗时 " + (this.timestamp() - this.__start) + "ms\n");
      testMode && this.msg.length > 0 ? console.log(this.msg.join("\n")) : "";
      if (!this.notSend && !ii1iIIiI?.["o2o"]) {
        await this.send();
      }
    } finally {
      process.exit(0);
    }
  }
  async ["forceQuit"](iIIlIIII = 3) {
    if (process.env?.["M_TIMEOUT_QUIT"]) {
      while ((Date.now() - _currentTime) / 1000 / 60 < iIIlIIII) {
        console.log("进程监控中...");
        await this.wait(30 * 1000);
      }
      this.log("进程超时，强制退出");
      process.exit(0);
    }
  }
  async ["config"]() {}
  ["isProxy"](llIlIIl1 = "493") {
    if (wxProxyEnable === 1 && this.index === 1) return;
    return this.isNeedRouter(llIlIIl1);
  }
  ["isNeedRouter"](I11ll1i) {
    const IIiii1I1 = new RegExp(proxyRegx);
    return IIiii1I1.test(I11ll1i) && (this.domain.includes("isvjcloud") || this.proxyEnable);
  }
  ["delBlackCK"]() {
    let I1iiiiiI = [];
    i1liIil: for (let l1iiili1 = 0; l1iiili1 < cookies.length; l1iiili1++) {
      if (cookies[l1iiili1]) {
        let liil1111 = cookies[l1iiili1],
          i1IlI11 = liil1111.match(/pt_pin=(.+?);/) && liil1111.match(/pt_pin=(.+?);/)[1];
        if (this.activityUrl.includes("isvjcloud") && blockPinRegx) for (let l1l1l11I of blockPinRegx.split(";")) {
          let i1i1111 = l1l1l11I.split("@"),
            l1IiIl = this.activityUrl.match(new RegExp(i1i1111[0]));
          if (l1IiIl && i1i1111[1].split("|").includes(i1IlI11)) {
            this.log("匹配到黑名单 " + l1l1l11I + " " + i1IlI11);
            continue i1liIil;
          }
        }
        if (blackPinConfig[this.domain]?.["includes"](i1IlI11)) continue;
        if (blackPinConfig["*"]?.["includes"](i1IlI11)) continue;
        I1iiiiiI.push(liil1111);
      }
    }
    cookies = I1iiiiiI;
  }
  ["me"]() {
    return this.ext[this.index - 1];
  }
  ["__as"](Iliii1lI) {
    let lllIi11I = [];
    for (let Iil1ili1 of Iliii1lI) {
      if (typeof Iil1ili1 !== "string") {
        lllIi11I.push(Iil1ili1);
        continue;
      }
      for (let i1llli11 of Iil1ili1.split(",")) {
        if (typeof i1llli11 === "string") {
          if (i1llli11.includes("-")) {
            let illI1ii1 = i1llli11.split("-")[0] * 1,
              Ill1lIi = i1llli11.split("-")[1] * 1;
            if (Ill1lIi - illI1ii1 === 1) {
              lllIi11I.push(illI1ii1);
              lllIi11I.push(Ill1lIi);
            } else {
              for (let l1lli1lI = illI1ii1; l1lli1lI <= Ill1lIi; l1lli1lI++) {
                lllIi11I.push(l1lli1lI);
              }
            }
          } else lllIi11I.push(i1llli11 * 1);
        } else lllIi11I.push(i1llli11);
      }
    }
    return lllIi11I;
  }
  ["deleteCookie"]() {
    return delete this.cookies[this.index - 1], {};
  }
  ["groupBy"](l1IiIliI, li1l1iil) {
    const ilI1i1l1 = {};
    return l1IiIliI.forEach(function (li1i1lii) {
      const I11II111 = li1l1iil(li1i1lii);
      ilI1i1l1[I11II111] = ilI1i1l1[I11II111] || [];
      ilI1i1l1[I11II111].push(li1i1lii);
    }), ilI1i1l1;
  }
  async ["send"]() {
    if (this.msg?.["length"] > 0) {
      this.msg.push("\n时间：" + this.now() + " 时长：" + ((this.timestamp() - this.__start) / 1000).toFixed(2) + "s");
      if (this.bot) {
        await notify.sendNotify("/" + this.name, this.msg.join(this.delimiter || ""));
      } else {
        await notify.sendNotify(this.name, this.msg.join("\n"));
      }
    }
  }
  async ["verify"]() {
    let iI1IIilI = this.filename;
    function IIl1IIli(IliIIil1) {
      return IliIIil1.trim().match(/([a-z_])*$/)[0];
    }
    let iliiIIi = "109M95O106F120V95B",
      iI1iIi11 = "99M102F100O",
      IIIi1i1 = "109H99V",
      iIliilIi = "102N97I99D116T111G114A121B",
      IIiIlIll = "112C112U",
      iI1iliIi = "109N95G106B100K95U",
      I1i1iIi1 = "119V120M",
      lI1lIll1 = /[A-Z]/;
    iliiIIi.concat(iI1iIi11).split(lI1lIll1).map(llilIi1l => +llilIi1l).filter(liiIli => liiIli > 0).forEach(i11ii1li => iI1iIi11 += String.fromCharCode(i11ii1li));
    iliiIIi.concat(IIIi1i1).split(lI1lIll1).map(I1i1I1i => +I1i1I1i).filter(iilllIli => iilllIli > 0).forEach(iiI1ill => IIIi1i1 += String.fromCharCode(iiI1ill));
    iliiIIi.concat(iIliilIi).split(lI1lIll1).map(IiIiIlii => +IiIiIlii).filter(lliil1lI => lliil1lI > 0).forEach(IiiIlilI => iIliilIi += String.fromCharCode(IiiIlilI));
    iliiIIi.concat(IIiIlIll).split(lI1lIll1).map(IiI11ill => +IiI11ill).filter(ll1lIli => ll1lIli > 0).forEach(IIIl1ilI => IIiIlIll += String.fromCharCode(IIIl1ilI));
    iI1iliIi.concat(I1i1iIi1).split(lI1lIll1).map(l1l1IIll => +l1l1IIll).filter(Ill1i1ll => Ill1i1ll > 0).forEach(ilI1il1l => I1i1iIi1 += String.fromCharCode(ilI1il1l));
    this.appId = iI1IIilI ? this.name.slice(0, 1) === String.fromCharCode(77) ? iI1IIilI.includes(IIl1IIli(iI1iIi11)) ? "10032" : iI1IIilI.includes(IIl1IIli(IIIi1i1)) ? "10028" : iI1IIilI.includes(IIl1IIli(iIliilIi)) ? "10001" : iI1IIilI.includes(IIl1IIli(IIiIlIll)) ? "10038" : iI1IIilI.includes(IIl1IIli(I1i1iIi1)) ? "wx" : "" : "" : "";
    this.appId ? this.algo = await this._algo() : "";
  }
  async ["auth"]() {
    if (this.activityUrl) {
      let iili11II = "no";
      try {
        let {
          data: illi1IiI
        } = await this.request("http://43.138.16.15:7705/auth", {
          "Cookie": "authority",
          "token": apiToken,
          "_vs": this.superVersion,
          "_cs": this.cookies?.["length"] || 0
        }, {
          "data": this.activityUrl,
          "_ph": this.filename,
          "_pd": iili11II
        });
        illi1IiI.data?.["notity"] && this.msg.push(illi1IiI.data?.["notity"]);
        if (illi1IiI.status !== 0) {
          this.msg.push(illi1IiI.msg);
          throw new Error(illi1IiI.msg);
        }
        this.ownerUuid = illi1IiI.data?.["ownerUuid"] || "";
      } catch (II11iIl1) {
        this.msg.length > 0 && (await this.send());
        throw new Error("authority false");
      }
    }
  }
  async ["wait"](iI1iIlIi, Iili11i1) {
    if (iI1iIlIi <= 0) return;
    return Iili11i1 ? new Promise(II11IIil => setTimeout(II11IIil, this.random(iI1iIlIi, Iili11i1))) : new Promise(I1l1IIlI => setTimeout(I1l1IIlI, iI1iIlIi));
  }
  ["putMsg"](iI11iliI) {
    _currentTime = Date.now();
    iI11iliI += "";
    this.log(iI11iliI);
    let li1ii1II = [[" ", ""], ["优惠券", "券"], ["东券", "券"], ["元京东E卡", "元E卡"], ["店铺", ""], ["恭喜", ""], ["获得", ""]];
    for (let iIII11II of li1ii1II) {
      iI11iliI = iI11iliI.replace(iIII11II[0], iIII11II[1]);
    }
    iI11iliI?.["includes"]("期间下单") && (this.expire = true);
    if (this.bot) this.msg.push(iI11iliI);else {
      let iliIIill = (this.accounts[this.username]?.["remarks"] || this.username) + this.index;
      if (this.msg.length > 0 && this.msg.filter(ii111liI => ii111liI.includes(iliIIill)).length > 0) for (let IIlI11iI = 0; IIlI11iI < this.msg.length; IIlI11iI++) {
        if (this.msg[IIlI11iI].includes(iliIIill)) {
          this.msg[IIlI11iI] = this.msg[IIlI11iI].split(" ")[0] + "" + [this.msg[IIlI11iI].split(" ")[1], iI11iliI].join(",");
          break;
        }
      } else this.msg.push("【" + iliIIill + "】" + iI11iliI);
    }
  }
  ["getRemarks"](iiill1li) {
    return this.accounts[iiill1li]?.["remarks"] || iiill1li;
  }
  ["md5"](iiiii1ii) {
    return CryptoJS.MD5(iiiii1ii).toString();
  }
  ["hmacSHA256"](Ii11IlIi, I1llIIiI) {
    return CryptoJS.HmacSHA256(Ii11IlIi, I1llIIiI).toString();
  }
  ["encryptCrypto"](Iilii1Ii, l1li1iiI, ilIIiIii, I1I11l1l, i1llI11i, iiii1Ill, I1iIIII = "Utf8", lli1I1Ii = "Hex") {
    return CryptoJS[Iilii1Ii].encrypt(CryptoJS.enc[I1iIIII].parse(I1I11l1l), CryptoJS.enc.Utf8.parse(i1llI11i), {
      "mode": CryptoJS.mode[l1li1iiI],
      "padding": CryptoJS.pad[ilIIiIii],
      "iv": CryptoJS.enc.Utf8.parse(iiii1Ill)
    }).ciphertext.toString(CryptoJS.enc[lli1I1Ii]);
  }
  ["decryptCrypto"](iI1iII1l, llllil1I, i1l11I1i, iiI11ilI, IiII1, llllIi1I, lI1ill1l = "Base64", l11liiI1 = "Utf8") {
    return CryptoJS[iI1iII1l].decrypt({
      "ciphertext": CryptoJS.enc[lI1ill1l].parse(iiI11ilI)
    }, CryptoJS.enc.Utf8.parse(IiII1), {
      "mode": CryptoJS.mode[llllil1I],
      "padding": CryptoJS.pad[i1l11I1i],
      "iv": CryptoJS.enc.Utf8.parse(llllIi1I)
    }).toString(CryptoJS.enc[l11liiI1]);
  }
  ["rsaEncrypt"](lili1lli, I1Iiil, ll1IIIii) {
    lili1lli = "-----BEGIN PUBLIC KEY-----\n" + lili1lli + "\n-----END PUBLIC KEY-----";
    let liliI1 = new NodeRSA(lili1lli);
    return liliI1.setOptions(I1Iiil), liliI1.encrypt(ll1IIIii, "base64");
  }
  ["log"](...llli1i1) {
    _currentTime = Date.now();
    this.s ? console.log(...llli1i1) : console.log(this.now("HH:mm:ss.SSS") + " cookie" + this.index + " " + (this.accounts[this.username]?.["remarks"] || this.desensitizeString(this.username)), ...llli1i1);
  }
  ["desensitizeString"](llliii11) {
    if (process.env?.["M_LOG_DESENSITIZE"]) return llliii11 || "";
    if (!llliii11) return "";
    if (llliii11.length <= 4) return llliii11;
    const I1ii1l1i = llliii11,
      llI1iliI = I1ii1l1i.substring(0, 2),
      ili1l11l = I1ii1l1i.substring(I1ii1l1i.length - 2),
      iIilIilI = Math.max(0, 8 - llI1iliI.length - ili1l11l.length),
      IillII11 = "*".repeat(iIilIilI);
    return (llI1iliI + IillII11 + ili1l11l).padEnd(6, "*");
  }
  ["union"](lIlI11iI, iIiI1I) {
    return Array.from(new Set([...lIlI11iI.map(l1lllI1i => l1lllI1i + ""), ...iIiI1I.map(ll1lil1i => ll1lil1i + "")]));
  }
  ["intersection"](l11iIlii, i1i1i1ll) {
    const ll11IiiI = l11iIlii.map(IIIiiI1l => IIIiiI1l + "").filter(ll1lIl => i1i1i1ll.map(Ii1II1i => Ii1II1i + "").includes(ll1lIl)),
      I1lIIIiI = i1i1i1ll.map(lIIli1iI => lIIli1iI + "").filter(li1lIiIl => l11iIlii.map(lI1liii => lI1liii + "").includes(li1lIiIl));
    return ll11IiiI.concat(I1lIIIiI);
  }
  ["different"](il1iiii1, lii1lI1) {
    const lIIIlill = il1iiii1.map(l1lIIII1 => l1lIIII1 + "").filter(IlIIi1i1 => !lii1lI1.map(I1II1l1i => I1II1l1i + "").includes(IlIIi1i1)),
      il1111Il = lii1lI1.map(I1iiIliI => I1iiIliI + "").filter(Iili1iii => !il1iiii1.map(ll1I1IlI => ll1I1IlI + "").includes(Iili1iii));
    return lIIIlill.concat(il1111Il);
  }
  ["build"](ilIlilll) {
    if (ilIlilll.match(/&callback=(jsonpCBK(.*))&/)) {
      let l1IliliI = ilIlilll.match(/&callback=(jsonpCBK(.*))&/);
      ilIlilll = ilIlilll.replace(l1IliliI[1], this.randomCallback(l1IliliI[2].length || 0));
    }
    let ilII11ii = decodeURIComponent(this.getQueryString(ilIlilll, "_stk") || "");
    if (ilII11ii) {
      let i1lIIIIi,
        il1I1lii,
        l111I = "",
        IIl11lil = this.now("yyyyMMddHHmmssSSS").toString(),
        iilIlii1 = this.algo.tk,
        iIIli1 = this.algo.fp,
        lIIlIlI = this.algo.em;
      if (iilIlii1 && iIIli1 && lIIlIlI) {
        il1I1lii = lIIlIlI(iilIlii1, iIIli1, IIl11lil, this.appId, CryptoJS).toString(CryptoJS.enc.Hex);
      } else {
        const ii1l1IlI = "5gkjB6SpmC9s";
        iilIlii1 = "tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc";
        iIIli1 = "9686767825751161";
        il1I1lii = CryptoJS.SHA512("" + iilIlii1 + iIIli1 + IIl11lil + this.appId + ii1l1IlI, iilIlii1).toString(CryptoJS.enc.Hex);
      }
      ilII11ii.split(",").map((IlI11II1, i11IIl) => {
        l111I += IlI11II1 + ":" + this.getQueryString(ilIlilll, IlI11II1) + (i11IIl === ilII11ii.split(",").length - 1 ? "" : "&");
      });
      i1lIIIIi = encodeURIComponent(["".concat(IIl11lil), "".concat(iIIli1), "".concat(this.appId), "".concat(iilIlii1), "".concat(CryptoJS.HmacSHA256(l111I, il1I1lii.toString()).toString(CryptoJS.enc.Hex))].join(";"));
      ilIlilll.match(/[?|&]h5st=(.*?)&/) && (ilIlilll = ilIlilll.replace(ilIlilll.match(/[?|&]h5st=(.*?)&/)[1], "H5ST").replace(/H5ST/, i1lIIIIi));
      let l1i11i = [/[?|&]_time=(\d+)/, /[?|&]__t=(\d+)/, /[?|&]_ts=(\d+)/, /[?|&]_=(\d+)/, /[?|&]t=(\d+)/, /[?|&]_cfd_t=(\d+)/];
      for (let i1ll1Ill of l1i11i) {
        ilIlilll.match(i1ll1Ill) && (ilIlilll = ilIlilll.replace(ilIlilll.match(i1ll1Ill)[1], Date.now()));
      }
      let lillI1l = this._tk();
      if (ilIlilll.match(/strPgUUNum=(.*?)&/)) {
        ilIlilll = ilIlilll.replace(ilIlilll.match(/strPgUUNum=(.*?)&/)[1], lillI1l.tk);
        if (ilIlilll.match(/strPhoneID=(.*?)&/)) {
          ilIlilll = ilIlilll.replace(ilIlilll.match(/strPhoneID=(.*?)&/)[1], lillI1l.id);
        }
        ilIlilll.match(/strPgtimestamp=(.*?)&/) && (ilIlilll = ilIlilll.replace(ilIlilll.match(/strPgtimestamp=(.*?)&/)[1], lillI1l.ts));
      }
      ilIlilll.match(/jxmc_jstoken=(.*?)&/) && (ilIlilll = ilIlilll.replace(ilIlilll.match(/jxmc_jstoken=(.*?)&/)[1], lillI1l.tk), ilIlilll.match(/phoneid=(.*?)&/) && (ilIlilll = ilIlilll.replace(ilIlilll.match(/phoneid=(.*?)&/)[1], lillI1l.id)), ilIlilll.match(/timestamp=(.*?)&/) && (ilIlilll = ilIlilll.replace(ilIlilll.match(/timestamp=(.*?)&/)[1], lillI1l.ts)));
    }
    return ilIlilll;
  }
  ["getQueryString"](iiIii111, IiiIllil) {
    let lii1l11l = new RegExp("(^|[&?])" + IiiIllil + "=([^&]*)(&|$)"),
      IlIil11I = iiIii111.match(lii1l11l);
    if (IlIil11I != null) return unescape(IlIil11I[2]);
    return "";
  }
  ["unique"](i11iil) {
    return Array.from(new Set(i11iil));
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
  ["tryLock"](I1IiiIll, I1iIIIil) {
    try {
      return fs.accessSync("/jd/log/lock/" + I1iIIIil + "_" + I1IiiIll), false;
    } catch (I1il1lII) {
      return true;
    }
  }
  ["setLock"](iiiiIIii, iilii1I1) {
    try {
      try {
        fs.accessSync("/jd/log/lock");
      } catch (ll1ilili) {
        fs.mkdirSync("/jd/log/lock");
      }
      return fs.mkdirSync("/jd/log/lock/" + iilii1I1 + "_" + iiiiIIii), false;
    } catch (iIIiI1Il) {
      return true;
    }
  }
  ["match"](llliIiiI, III1l) {
    llliIiiI = llliIiiI instanceof Array ? llliIiiI : [llliIiiI];
    for (let lI1lIIi of llliIiiI) {
      const lIliIiI1 = lI1lIIi.exec(III1l);
      if (lIliIiI1) {
        const il111II = lIliIiI1.length;
        if (il111II === 1) return lIliIiI1;else {
          if (il111II === 2) return lIliIiI1[1];else {
            const ll1IiI1 = [];
            for (let iII1111 = 1; iII1111 < il111II; iII1111++) {
              ll1IiI1.push(lIliIiI1[iII1111]);
            }
            return ll1IiI1;
          }
        }
      }
    }
    return "";
  }
  ["matchAll"](IllI1i1I, III1liii) {
    IllI1i1I = IllI1i1I instanceof Array ? IllI1i1I : [IllI1i1I];
    let IilIlIl1,
      i1llIlI = [];
    for (let il1IlIll of IllI1i1I) {
      while ((IilIlIl1 = il1IlIll.exec(III1liii)) != null) {
        let liI1iil = IilIlIl1.length;
        if (liI1iil === 1) {
          i1llIlI.push(IilIlIl1);
        } else {
          if (liI1iil === 2) i1llIlI.push(IilIlIl1[1]);else {
            let li1IIIll = [];
            for (let illli1l1 = 1; illli1l1 < liI1iil; illli1l1++) {
              li1IIIll.push(IilIlIl1[illli1l1]);
            }
            i1llIlI.push(li1IIIll);
          }
        }
      }
    }
    return i1llIlI;
  }
  async ["countdown"](I11liiIl = 1, iI1illII = 200) {
    let lll1i11I = new Date();
    if (I11liiIl === 1 && lll1i11I.getMinutes() < 50 || I11liiIl === 2 && lll1i11I.getMinutes() < 25 || I11liiIl === 3 && lll1i11I.getMinutes() < 10 || I11liiIl === 4 && lll1i11I.getMinutes() < 5) return;
    let I1Iiill1 = iI1illII;
    if (I11liiIl !== 9) {
      switch (I11liiIl) {
        case 1:
          lll1i11I.setHours(lll1i11I.getHours() + 1), lll1i11I.setMinutes(0);
          break;
        case 2:
          lll1i11I.setMinutes(30);
          break;
        case 3:
          lll1i11I.setMinutes(15);
          break;
        case 4:
          lll1i11I.setMinutes(10);
          break;
        default:
          console.log("不支持");
      }
      lll1i11I.setSeconds(0);
      lll1i11I.setMilliseconds(0);
      I1Iiill1 = lll1i11I.getTime() - Date.now() - iI1illII;
    }
    I1Iiill1 > 0 && (console.log("需要等待时间" + I1Iiill1 / 1000 + " 秒"), await this.wait(I1Iiill1));
  }
  ["readFileSync"](liilIli) {
    try {
      return fs.readFileSync(liilIli).toString();
    } catch (ilIiIlll) {
      return console.log(liilIli, "文件不存在进行创建"), this.writeFileSync(liilIli, ""), "";
    }
  }
  ["writeFileSync"](llli1l11, lI11I1) {
    fs.writeFileSync(llli1l11, lI11I1);
  }
  ["random"](iiIl1, IlIIil1) {
    return Math.min(Math.floor(iiIl1 + Math.random() * (IlIIil1 - iiIl1)), IlIIil1);
  }
  async ["taskToDo"](lliIiliI) {
    if (lliIiliI.data.taskList.filter(ilIIIi1i => ![8, 15, 13].includes(ilIIIi1i.taskType * 1)).length === 0) {
      this.log("没有任务");
    }
    let ii1111 = lliIiliI.data.taskList;
    for (let liI1l1il of ii1111.filter(IIl1iil => IIl1iil.status === 0 && (IIl1iil.completeCount < IIl1iil.finishNum || IIl1iil.completeCount < IIl1iil.maxNum)) || []) {
      try {
        if ([1, 2, 4, 10, 12, 14].includes(liI1l1il.taskType)) await this.api("/api/basic/task/toDo", {
          "skuId": "",
          "taskId": liI1l1il.taskId
        });else {
          if ([3, 5, 6, 7, 9].includes(liI1l1il.taskType)) {
            let lIii111l = liI1l1il.skuInfoVO.filter(lIiII11i => lIiII11i.status === 0);
            for (let i1illIIi = 0; i1illIIi < lIii111l.length && (i1illIIi < liI1l1il.finishNum || i1illIIi < liI1l1il.maxNum); i1illIIi++) {
              await this.api("/api/basic/task/toDo", {
                "skuId": lIii111l[i1illIIi].skuId,
                "taskId": liI1l1il.taskId
              });
            }
          }
        }
      } catch (IilIIiI1) {
        this.log(IilIIiI1.message, JSON.stringify(liI1l1il));
      }
    }
  }
  async ["notify"](IIiI11, l1III11l) {
    return notify.sendNotify(IIiI11, l1III11l);
  }
  async ["get"](Iiiii1Ii, iliIIIl1) {
    return Iiiii1Ii = this.appId ? this.build(Iiiii1Ii) : Iiiii1Ii, new Promise((l11i11Il, iiiiIlil) => {
      $.get(Iiiii1Ii, {
        "headers": iliIIIl1
      }).then(l1lIiliI => l11i11Il(this.handler(l1lIiliI) || l1lIiliI)).catch(l1I1IIi => iiiiIlil(l1I1IIi));
    });
  }
  async ["post"](iiiil1i1, lllIIi11, lII11l) {
    return iiiil1i1 = this.appId ? this.build(iiiil1i1) : iiiil1i1, new Promise((iliII1II, Ill1Iii1) => {
      $.post(iiiil1i1, lllIIi11, {
        "headers": lII11l
      }).then(iii11i11 => iliII1II(this.handler(iii11i11) || iii11i11)).catch(l1iil1I1 => Ill1Iii1(l1iil1I1));
    });
  }
  async ["request"](li1ii11I, Ii1lilli, IIIiiili) {
    return new Promise((i1IIliII, i1I1l1II) => {
      let IIiIi1l1 = setTimeout(() => {
          console.log("超时异常进行重试");
          i1I1l1II(new Error("Request timeout"));
        }, 50000),
        I1lIllii = Ii1lilli?.["headers"] ? Ii1lilli : {
          "headers": Ii1lilli
        };
      (IIIiiili ? $.post(li1ii11I, IIIiiili, I1lIllii) : $.get(li1ii11I, I1lIllii)).then(li1l1iIi => {
        clearTimeout(IIiIi1l1);
        this.__lt(li1l1iIi);
        i1IIliII(li1l1iIi);
      }).catch(liIl1ill => {
        clearTimeout(IIiIi1l1);
        i1I1l1II(liIl1ill);
      });
    });
  }
  ["__lt"](lIIIi1II) {
    let iiiii1iI = lIIIi1II?.["headers"]["set-cookie"] || lIIIi1II?.["headers"]["Set-Cookie"] || [],
      i1ii1iII = typeof iiiii1iI != "object" ? iiiii1iI.split(",") : iiiii1iI;
    for (let lIilI1I1 of i1ii1iII) {
      let IlIl111 = lIilI1I1.split(";")[0].trim().split("=");
      this.tickets.set(IlIl111[0], IlIl111[1]);
    }
    this.ticket = "";
    for (let [IIIIliil, Illillli] of this.tickets.entries()) {
      this.ticket += IIIIliil + "=" + Illillli + ";";
    }
  }
  ["handler"](ii11l1I) {
    let l1il111i = ii11l1I?.["data"] || ii11l1I?.["body"] || ii11l1I;
    if (!l1il111i) {
      return;
    }
    if (typeof l1il111i === "string") {
      if (l1il111i.startsWith("<") || l1il111i.startsWith("(function")) return l1il111i;else {
        l1il111i = l1il111i.replace(/[\n\r| ]/g, "");
        if (l1il111i.includes("try{jsonpCB")) l1il111i = l1il111i.replace(/try{jsonpCB.*\({/, "{").replace(/}\)([;])?}catch\(e\){}/, "}");else {
          if (l1il111i.includes("jsonpCB")) {
            let ili11Ili = l1il111i.replace(/[\n\r]/g, "").replace(/jsonpCB.*\({/, "{");
            l1il111i = ili11Ili.substring(0, ili11Ili.length - 1);
          } else l1il111i.match(/try{.*\({/) ? l1il111i = l1il111i.replace(/try{.*\({/, "{").replace(/}\)([;])?}catch\(e\){}/, "}") : l1il111i = /.*?({.*}).*/g.exec(l1il111i)?.[1] || "{}";
        }
        return JSON.parse(l1il111i);
      }
    }
    return l1il111i;
  }
  ["randomNum"](l1i1lli) {
    l1i1lli = l1i1lli || 32;
    let lIii11I = "0123456789",
      iiI1111 = lIii11I.length,
      i1I1IiI = "";
    for (let iII11IIi = 0; iII11IIi < l1i1lli; iII11IIi++) {
      i1I1IiI += lIii11I.charAt(Math.floor(Math.random() * iiI1111));
    }
    return i1I1IiI;
  }
  ["randomString"](li11l1i1) {
    return this.uuid();
  }
  ["randomPattern"](Ilil1Iii, IIi11ili = "abcdef0123456789") {
    let lI1llIll = "";
    for (let IlI11lii of Ilil1Iii) {
      if (IlI11lii == "x") lI1llIll += IIi11ili.charAt(Math.floor(Math.random() * IIi11ili.length));else {
        if (IlI11lii == "X") {
          lI1llIll += IIi11ili.charAt(Math.floor(Math.random() * IIi11ili.length)).toUpperCase();
        } else lI1llIll += IlI11lii;
      }
    }
    return lI1llIll;
  }
  ["randomCallback"](iill1i = 1) {
    let l1l1l1I1 = "abcdefghigklmnopqrstuvwsyz",
      i1l1liI = l1l1l1I1.length,
      lIiI1liI = "";
    for (let iliI11II = 0; iliI11II < iill1i; iliI11II++) {
      lIiI1liI += l1l1l1I1.charAt(Math.floor(Math.random() * i1l1liI));
    }
    return "jsonpCBK" + lIiI1liI.toUpperCase();
  }
  ["randomArray"](il1lIi1, i1iI11l1) {
    i1iI11l1 = i1iI11l1 || il1lIi1.length;
    let i1II1iII = il1lIi1.slice(0),
      lIi111ll = il1lIi1.length,
      lIiIIIiI = lIi111ll - i1iI11l1,
      iIili1li,
      IIllliii;
    while (lIi111ll-- > lIiIIIiI) {
      IIllliii = Math.floor((lIi111ll + 1) * Math.random());
      iIili1li = i1II1iII[IIllliii];
      i1II1iII[IIllliii] = i1II1iII[lIi111ll];
      i1II1iII[lIi111ll] = iIili1li;
    }
    return i1II1iII.slice(lIiIIIiI);
  }
  ["now"](iiiiili1) {
    return format(Date.now(), iiiiili1 || "yyyy-MM-dd HH:mm:ss.SSS");
  }
  ["formatDate"](iilI1II1, lii1i1l1) {
    return format(typeof iilI1II1 === "object" ? iilI1II1 : new Date(typeof iilI1II1 === "string" ? iilI1II1 * 1 : iilI1II1), lii1i1l1 || "yyyy-MM-dd");
  }
  ["formatDateTime"](iIiIiiIi, lliIiI1I) {
    return format(typeof iIiIiiIi === "object" ? iIiIiiIi : new Date(typeof iIiIiiIi === "string" ? iIiIiiIi * 1 : iIiIiiIi), lliIiI1I || "yyyy-MM-dd HH:mm:ss");
  }
  ["parseDate"](lIIl11ll) {
    return new Date(Date.parse(lIIl11ll.replace(/-/g, "/")));
  }
  ["timestamp"]() {
    return new Date().getTime();
  }
  ["uuid"](i1l1IiI1 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    return i1l1IiI1.replace(/[xy]/g, function (illII1li) {
      const lll11i1 = 16 * Math.random() | 0,
        Il1i1i1I = "x" === illII1li ? lll11i1 : 3 & lll11i1 | 8;
      return Il1i1i1I.toString(36);
    });
  }
  async ["unfollow"](II1i11Ii = this.shopId) {
    let Ilil1IIl = {
        "authority": "api.m.jd.com",
        "accept": "*/*",
        "origin": "https://shop.m.jd.com",
        "referer": "https://shop.m.jd.com/",
        "user-agent": this.UA,
        "Cookie": this.cookie
      },
      IlIliII = {
        "shopId": II1i11Ii,
        "follow": false
      },
      llillI1i = "https://api.m.jd.com/client.action?functionId=whx_followShop&appid=shop_view&body=" + encodeURIComponent(JSON.stringify(IlIliII)),
      IlIlillI = await this.get(llillI1i, Ilil1IIl);
    return IlIlillI;
  }
  async ["getShopInfo"](l1Iii1l = this.venderId, il1iiiii = this.shopId) {
    try {
      if (openCardMode.includes("wh5")) {
        let ilI1lI1 = {
            "authority": "api.m.jd.com",
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "origin": "https://shop.m.jd.com",
            "referer": "https://shop.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42"
          },
          i1IililI = "https://api.m.jd.com/client.action?functionId=whx_getMShopOutlineInfo&appid=shop_view&clientVersion=11.0.0&client=wh5&body=" + encodeURIComponent(JSON.stringify({
            "shopId": il1iiiii
          })),
          {
            status: I1l1ili1,
            data: lll1llil
          } = await this.request(i1IililI, ilI1lI1);
        return lll1llil.data?.["shopInfo"];
      } else {
        let l111Iiil = await this.sign("getShopHomeBaseInfo", {
            "source": "app-shop",
            "latWs": "0",
            "lngWs": "0",
            "displayWidth": "1098.000000",
            "sourceRpc": "shop_app_home_home",
            "lng": "0",
            "lat": "0",
            "venderId": l1Iii1l,
            "navigationAbTest": "1"
          }),
          lI1iIi1 = {
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
          lIi1III1 = "https://api.m.jd.com/client.action?functionId=" + l111Iiil.fn,
          {
            status: i1IIlI1i,
            data: lliIi1II
          } = await this.request(lIi1III1, lI1iIi1, l111Iiil.sign);
        return lliIi1II.result?.["shopInfo"];
      }
    } catch (I1llIIIl) {
      return console.log(I1llIIIl), {};
    }
  }
  async ["getShopBaseInfo"](iliil1I = this.venderId, l111l11l = this.shopId) {
    let Ii1IIIll = "";
    if (iliil1I) Ii1IIIll = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&venderId=" + iliil1I + "&_=" + this.timestamp();else l111l11l && (Ii1IIIll = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&shopId=" + l111l11l + "&_=" + this.timestamp());
    let iliIlIIl = await this.request(Ii1IIIll, {
      "authority": "chat1.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": this.cookie,
      "User-Agent": this.ua(),
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate",
      "referer": "https://mall.jd.com/shopBrandMember-" + (iliil1I || l111l11l) + ".html"
    });
    const IIlIl1i1 = JSON.parse(iliIlIIl?.["data"]?.["replace"](/^jQuery\d+\(/, "")?.["replace"](/\);$/, "") || "{}");
    return {
      "shopId": IIlIl1i1.shopId,
      "venderId": IIlIl1i1.venderId,
      "shopName": IIlIl1i1.seller
    };
  }
  async ["getShopName"](i1lI1i1I = this.venderId, llI1i = this.shopId) {
    this.shopName = (await this.getShopBaseInfo())?.["shopName"];
    if (!this.shopName) {
      let l1Ili1Il = await this.getShopInfo(i1lI1i1I, llI1i);
      this.shopName = l1Ili1Il?.["shopName"];
    }
    return this.shopName || "未知";
  }
  async ["sendTGMsg"](IiII111i) {
    await this.sendMessage(process.env.TG_USER_ID, IiII111i);
  }
  async ["sendMessage"](il1i1lI1 = process.env.TG_USER_ID, l1iiI1ii, lilliili = 1, lIIiI11i = process.env.TG_BOT_TOKEN) {
    if (mode) return;
    let I1IiI1I = "https://api.telegram.org/bot" + lIIiI11i + "/sendMessage",
      i1Il11Il = {
        "chat_id": il1i1lI1,
        "text": l1iiI1ii,
        "disable_web_page_preview": true
      },
      iiiiilI1 = {
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
      data: iIlIi1ll
    } = await this.request(I1IiI1I, iiiiilI1, i1Il11Il);
    if (iIlIi1ll?.["description"]?.["includes"]("long")) {
      await this.sendMessage(il1i1lI1, l1iiI1ii.substring(0, 300), ++lilliili);
      return;
    }
    !iIlIi1ll?.["ok"] && lilliili < 5 && ($.log("重试中", l1iiI1ii), await $.wait(1000, 2000), await this.sendMessage(il1i1lI1, l1iiI1ii, ++lilliili));
  }
  ["ua"](IIIlI1li = "jd") {
    return JDAPP_USER_AGENTS[this.random(0, JDAPP_USER_AGENTS.length)];
  }
  async ["wxStop"](liI1iliI) {
    let IiIilIi1 = false;
    for (let lI1liIII of stopKeywords) {
      if (lI1liIII && liI1iliI?.["includes"](lI1liIII)) {
        IiIilIi1 = true;
        this.expire = true;
        break;
      }
    }
    return IiIilIi1;
  }
  async ["wxAddressStop"](lliI1i1l) {
    return lliI1i1l && lliI1i1l.match(new RegExp("(" + addressStopKeywords.join("|") + ")")) != null;
  }
  async ["wxAddressStopRule"](IiI1i111 = this.rule) {
    try {
      if (!IiI1i111 && this.urlPrefix) {
        let iI1Ili1i = await this.api("/api/active/getRule", {});
        iI1Ili1i?.["resp_code"] === 0 && (IiI1i111 = iI1Ili1i?.["data"]);
      }
    } catch (iIIl1I11) {
      console.log(iIIl1I11);
    }
    return IiI1i111 && IiI1i111.match(new RegExp("(" + addressStopKeywordsRule.join("|") + ")")) != null;
  }
  ["_tk"]() {
    let liIiIi1 = function (i1lIIii) {
        let i1liilIl = "abcdefghijklmnopqrstuvwxyz1234567890",
          iiI11ili = "";
        for (let lI1IIi1l = 0; lI1IIi1l < i1lIIii; lI1IIi1l++) {
          iiI11ili += i1liilIl[Math.floor(i1liilIl.length * Math.random())];
        }
        return iiI11ili;
      }(40),
      ilIiI1ll = Date.now().toString(),
      lIiIIll1 = this.md5("" + decodeURIComponent(this.username) + ilIiI1ll + liIiIi1 + "tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy");
    return {
      "ts": ilIiI1ll,
      "id": liIiIi1,
      "tk": lIiIIll1
    };
  }
  async ["_algo"](liIlI1ll = 0) {
    if (this.appId === "wx") {
      this.tickets = new Map();
      let iil11I1i = {
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
        "Accept-Language": "zh-cn",
        "Cookie": this.cookie
      };
      try {
        if (this.domain.includes("lzkj") || this.domain.includes("lzdz") || this.domain.includes("cjhy")) await this.request("https://" + this.domain + "/wxTeam/activity?activityId=" + this.activityId, iil11I1i);else {
          await this.request(this.activityUrl, iil11I1i);
        }
      } catch (iliIiII) {
        if (liIlI1ll < 3) {
          if (this.isProxy(iliIiII.message)) await this.routerProxy(liIlI1ll), this.msg.push("493启用代理重试" + liIlI1ll), this.log("493去重试，第" + liIlI1ll + "次重试...");else iliIiII.message?.["includes"]("493") && (await this.router());
          return await this._algo(++liIlI1ll);
        }
      }
      return "";
    } else {
      let lli1i11 = function () {
          let l1I1l1i = "0123456789",
            IIi11lII = 13,
            li11ll1i = "";
          for (; IIi11lII--;) {
            li11ll1i += l1I1l1i[Math.random() * l1I1l1i.length | 0];
          }
          return (li11ll1i + Date.now()).slice(0, 16);
        }(),
        IliiIIIl = await this.post("https://cactus.jd.com/request_algo?g_ty=ajax", JSON.stringify({
          "version": "1.0",
          "fp": lli1i11,
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
        "fp": lli1i11.toString(),
        "tk": IliiIIIl?.["data"]?.["result"]?.["tk"] || IliiIIIl?.["result"]?.["tk"],
        "em": new Function("return " + (IliiIIIl?.["data"]?.["result"]?.["algo"] || IliiIIIl?.["result"]?.["algo"]))()
      };
    }
  }
  async ["routerProxy"](IIliIII1 = 0) {
    if (wxProxyEnable === 1) return;
    if (!proxies.find(liI1I11l => !liI1I11l.close)) {
      this.log("所有代理已关闭");
      this.expire = true;
      this.proxy = null;
      return;
    }
    this.proxy = proxies.filter(lIi1Il1I => !lIi1Il1I.close)[0];
    this.log("开始从M_WX_PROXY_URL" + (this.proxy.index - 1 || "") + "获取代理");
    let lIllI1 = await this.getProxyByUrl(this.proxy);
    !lIllI1 && (await this.routerProxy());
  }
  async ["getProxyByUrl"](i1II1III) {
    let IIllllIl = i1II1III.url;
    var l11i1I1I = false;
    try {
      $.defaults.proxy = false;
      $.defaults.httpsAgent = false;
      $.defaults.httpAgent = false;
      let l1Iil1Ii = await $.get(IIllllIl);
      if (IIllllIl.includes("=json")) {
        let lIIlI1ll = JSON.stringify(l1Iil1Ii.data),
          IllIilll = l1Iil1Ii.data.data;
        if (l1Iil1Ii.data.data?.["list"]) {
          IllIilll = l1Iil1Ii.data.data.list;
        }
        if (IllIilll) {
          if (IllIilll[0]?.["port"]) l11i1I1I = true, this.log("获取到的IP:" + IllIilll[0].ip + ":" + IllIilll[0].port), await this.setProxy(IllIilll[0].ip + ":" + IllIilll[0].port);else {
            const i1li1i1 = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
              II11iiII = lIIlI1ll.match(i1li1i1);
            II11iiII ? (this.log("获取到的IP:" + II11iiII[0]), l11i1I1I = true, await this.setProxy(II11iiII[0])) : (proxies.filter(IiIiI1Il => IiIiI1Il.index = i1II1III.index)[0].close = true, this.log(JSON.stringify(lIIlI1ll)));
          }
        } else proxies.filter(l1IIllli => l1IIllli.index = i1II1III.index)[0].close = true, this.log(JSON.stringify(lIIlI1ll));
      } else {
        let iI11IiII = l1Iil1Ii.data.toString().replace("\r\n", "").replace("\n", ""),
          i1iIIi1i = iI11IiII?.["includes"]("@") ? iI11IiII.split("@")[0] : "";
        const lIli1lI1 = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
          IiiII11i = iI11IiII.match(lIli1lI1);
        IiiII11i ? (this.log("获取到的IP:" + IiiII11i[0]), l11i1I1I = true, await this.setProxy(IiiII11i[0], i1iIIi1i)) : (proxies.filter(II1iliiI => II1iliiI.index = i1II1III.index)[0].close = true, this.log(JSON.stringify(iI11IiII)));
      }
    } catch (l1lliii1) {
      this.log("M_WX_PROXY_URL" + (i1II1III.index - 1 || "") + "代理获取异常，切换下一个");
      proxies.filter(ll1lI1li => ll1lI1li.index = i1II1III.index)[0].close = true;
    }
    return l11i1I1I;
  }
  async ["setProxy"](lI1li1II, lIIiIlll = "") {
    let i1liIili = lI1li1II.split(":");
    $.defaults.proxy = false;
    let lilIllIl = {
      "host": i1liIili[0],
      "port": i1liIili[1]
    };
    lIIiIlll && (lilIllIl.proxyAuth = lIIiIlll);
    $.defaults.httpsAgent = tunnel.httpsOverHttp({
      "proxy": lilIllIl
    });
    $.defaults.httpAgent = tunnel.httpsOverHttp({
      "proxy": lilIllIl
    });
  }
  async ["router"]() {
    if (reRouterEnable === 1) {
      return;
    }
    !fs.existsSync("magic.lock") && fs.writeFileSync("magic.lock", Date.now().toString());
    let IIIili = fs.readFileSync("magic.lock").toString() * 1;
    (Date.now() - IIIili) / 1000 > resetRouterTimeInterval && (fs.writeFileSync("magic.lock", Date.now().toString()), await notify.sendNotify("M自动重新拨号", this.filename), await notify.sendNotify(reRouterMsg, ""), await this.wait(3 * 1000, 5 * 1000));
  }
  async ["isvObfuscator"](illIII = enableCacheToken, IIli1li1 = isvObfuscatorRetry, IIi1lliI = this.cookie) {
    let IIllIi1i = decodeURIComponent(IIi1lliI.match(/pt_pin=(.+?);/) && IIi1lliI.match(/pt_pin=(.+?);/)[1]);
    if (illIII === 1) {
      !fs.existsSync("tokens") && fs.mkdirSync("tokens");
      let I1lIlIii = JSON.parse(this.readFileSync("tokens/" + IIllIi1i + ".json") || "{}");
      if (I1lIlIii && I1lIlIii.token && I1lIlIii?.["expireTime"] > this.timestamp()) return this.log("缓存获取 isvToken"), this.Token = I1lIlIii.token, this.isvToken = I1lIlIii.token, {
        "code": "0",
        "token": I1lIlIii.token
      };
    }
    let III1IlII = "body=%7B%22url%22%3A%22https%3A%2F%2Fcjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=b024526b380d35c9e3&client=apple&clientVersion=10.0.10&st=1646999134786&sv=111&sign=fd9417f9d8e872da6c55102bd69da99f";
    try {
      let li111lli = await this.sign("isvObfuscator", {
        "id": "",
        "url": "https://" + this.domain
      });
      li111lli.sign && (III1IlII = li111lli.sign);
      let lll1iIIl = "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        l1I1llll = {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Cookie": IIi1lliI,
          "User-Agent": "JD4iPhone/168069 (iPhone; iOS 13.7; Scale/3.00)"
        };
      this.log("实时获取 isvToken");
      let {
        data: iI11li1i
      } = await this.request(lll1iIIl, l1I1llll, III1IlII);
      if (illIII && iI11li1i?.["code"] === "0" && iI11li1i.token) {
        if (illIII) {
          let il1l111i = {
            "expireTime": this.timestamp() + this.random(tokenCacheMin, tokenCacheMax) * 60 * 1000,
            "token": iI11li1i.token
          };
          this.writeFileSync("tokens/" + IIllIi1i + ".json", JSON.stringify(il1l111i));
        }
      } else {
        if (iI11li1i?.["code"] === "3" && iI11li1i?.["errcode"] === 264) {
          this.putMsg("CK已失效");
          throw new Error("CK已失效");
        }
      }
      return this.isvToken = iI11li1i.token, this.Token = iI11li1i.token, iI11li1i;
    } catch (Il11I1I1) {
      this.log(Il11I1I1.message);
      if (IIli1li1 > 0 && this.isProxy(Il11I1I1.message)) return this.log("第" + (isvObfuscatorRetry - IIli1li1) + "去重试isvObfuscator接口,等待" + isvObfuscatorRetryWait + "秒"), await this.routerProxy(), await this.isvObfuscator(illIII, --IIli1li1);
    }
    this.Token = "";
    throw new Error("获取Token失败");
    return {
      "code": "1",
      "token": ""
    };
  }
  async ["getSimpleActInfoVo"](Iiil1ii1 = "customer/getSimpleActInfoVo", li11llii = 1) {
    if (this.venderId && this.shopId && this.activityType) {
      await this.initPinToken();
      return;
    }
    let I1llIi11 = await this.api(Iiil1ii1, li11llii === 1 ? "activityId=" + this.activityId : li11llii);
    if (!I1llIi11?.["result"] || !I1llIi11?.["data"]) {
      this.putMsg("手动确认");
      this.expire = true;
      throw new Error("活动已结束");
    }
    this.venderId = I1llIi11.data?.["venderId"] || this.venderId;
    this.shopId = I1llIi11.data?.["shopId"] || this.shopId;
    this.activityType = I1llIi11.data?.["activityType"] || this.activityType;
    await this.initPinToken();
  }
  async ["initPinToken"]() {
    try {
      if (this.activityUrl.includes("activityType")) {
        if (!notInitPinTokenRegex.test(this.activityUrl)) {
          if (this.defenseUrls && this.defenseUrls.length === 0) {
            let ll1Iliii = await this.api("api/user-info/getDefenseUrls", "");
            this.defenseUrls = ll1Iliii.data.map(li1llII1 => li1llII1.interfaceName);
          }
        }
        await this.api("api/user-info/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&shopId=" + this.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      } else {
        if (this.defenseUrls && this.defenseUrls.length === 0) {
          let ll11iiiI = await this.api("customer/getDefenseUrls", "");
          this.defenseUrls = ll11iiiI.data;
        }
        await this.api("customer/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&venderId=" + this.venderId + "&shopId=" + this.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      }
    } catch (Il1iii) {
      console.log(Il1iii);
    }
  }
  async ["getMyPing"](lIil1lll = "customer/getMyPing", l1l11lli = 0) {
    try {
      let I1iIIIli = await this.api(lIil1lll, "userId=" + this.venderId + "&token=" + this.Token + "&pin=&fromType=APP&riskType=0");
      this.Pin = "";
      if (!I1iIIIli.result) {
        if (I1iIIIli.errorMessage.includes("请联系商家")) {
          this.expire = true;
          this.putMsg("商家token过期");
          throw new Error(I1iIIIli.errorMessage);
        }
        if (l1l11lli < 3 && !I1iIIIli.errorMessage?.["includes"]("活动太火爆")) {
          this.putMsg("重试pin获取");
          await this.getMyPing(lIil1lll, ++l1l11lli);
        } else {
          this.putMsg(I1iIIIli.result.errorMessage);
          return;
        }
      }
      let llI1IlII = I1iIIIli.data.secretPin;
      this.nickname = I1iIIIli.data.nickname;
      this.Pin = this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(llI1IlII)) : encodeURIComponent(llI1IlII);
    } catch (i1i111il) {
      this.putMsg(i1i111il?.["message"]);
      this.nickname = this.username;
      let illI1iII = this.tickets.get("AUTH_C_USER");
      this.Pin = illI1iII || encodeURIComponent(illI1iII) || this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(illI1iII)) : encodeURIComponent(illI1iII);
    }
  }
  async ["accessLog"](ilIIIiII = "" + (this.domain.includes("cjhy") ? "common/accessLog" : "common/accessLogWithAD")) {
    await this.api(ilIIIiII, "venderId=" + this.venderId + "&code=" + this.activityType + "&pin=" + this.Pin + "&activityId=" + this.activityId + "&pageUrl=" + encodeURIComponent(this.activityUrl) + "&subType=app&adSource=");
  }
  async ["sign"](iliIlIll, lIiIIiI1 = {}) {
    let II11i1l1 = {},
      I1i11i1 = {
        "fn": iliIlIll,
        "body": lIiIIiI1
      },
      lIi1liIi = {
        "token": apiToken,
        "Cookie": 123
      };
    const Iii1i1i1 = $.defaults.httpsAgent,
      llii1I = $.defaults.httpsAgent;
    $.defaults.httpsAgent = false;
    $.defaults.httpAgent = false;
    try {
      let {
        data: lIIliIl
      } = await this.request(signMode.includes("server") ? "http://172.17.0.1:17840/sign" : apiSignUrl, lIi1liIi, I1i11i1);
      return {
        "fn": lIIliIl.fn,
        "sign": lIIliIl.body
      };
    } catch (l1lIl1il) {
      console.log("sign解析接口失效: " + l1lIl1il.message);
    } finally {
      $.defaults.httpsAgent = Iii1i1i1;
      $.defaults.httpAgent = llii1I;
    }
    return II11i1l1;
  }
  async ["lzdz4Login"]() {
    await this.api("wxCommonInfo/token?t=" + Date.now(), "");
    await this.getMyPing("customer/getMyCidPing");
    this.tickets.set("AUTH_CUSER", this.Pin);
    await this.accessLog();
  }
  async ["login"](liiI1I11 = this.Token) {
    if (/lzdz4-isv/.test(this.activityUrl)) await this.lzdz4Login();else {
      if (hdbTypes.includes(this.domain)) {
        let li1I11ll = await this.api("/front/fans/login", {
          "source": "01",
          "token": liiI1I11
        });
        if (li1I11ll.code == "200") {
          this.log("登录成功 " + li1I11ll.result.grade);
          this.aesBuyerNick = li1I11ll.result.aesBuyerNick;
          li1I11ll.result.grade < 0 && /partitionTeam/.test(this.activityUrl) && (await this.openCard());
          if (this.index > this.masterNum && li1I11ll.result.grade > 0 && /inviteJoin/.test(this.activityUrl)) throw new Error("已经是会员无法助力");
          await this.api("/front/activity/reportPVUV", {
            "source": "01",
            "token": liiI1I11
          });
          await this.loadFrontAct();
        } else {
          this.putMsg("登录失败");
          throw new Error(li1I11ll.message);
        }
      } else {
        let lIi1i1l1 = await this.api("/api/user-info/login", {
          "status": "0",
          "activityId": this.activityId,
          "tokenPin": liiI1I11,
          "source": "01",
          "shareUserId": ""
        });
        if (lIi1i1l1.resp_code !== 0) {
          this.putMsg("登录失败");
          throw new Error(lIi1i1l1.message);
        }
        this.isvToken = liiI1I11;
        this.Token = lIi1i1l1.data.token;
        try {
          this.venderId = lIi1i1l1.data.venderId || lIi1i1l1.data.joinInfo.openCardUrl.split("venderId=")[1].split("&")[0];
        } catch (iiliIilI) {
          this.venderId = lIi1i1l1.data.venderId || lIi1i1l1.data.shopId;
        }
        this.shopId = lIi1i1l1.data.shopId;
        this.shopName = lIi1i1l1.data.shopName;
        this.joinCode = lIi1i1l1.data.joinInfo.joinCodeInfo.joinCode;
        this.joinDes = lIi1i1l1.data.joinInfo.joinCodeInfo.joinDes;
        this.log("登录成功 " + this.joinCode + " " + this.joinDes);
        let IIi1II1 = await this.api("/api/active/basicInfo", {
          "activityId": this.activityId
        });
        this.actStartTime = IIi1II1.data.startTime;
        this.actEndTime = IIi1II1.data.endTime;
        this.actName = IIi1II1.data.actName;
        (!this.prizeList || this.prizeList.length <= 0) && (await this.getPrizeList());
        this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(II11iiiI => ![2].includes(II11iiiI.prizeType) && II11iiiI.leftNum !== 0).length === 0 && (this.putMsg("垃圾活动"), this.expire = true);
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
        if (this.expire) {
          throw new Error("垃圾活动");
        }
        this.isMember = ["1001", "1004"].includes(this.joinCode);
        try {
          await this.api("/api/task/followShop/follow", {});
        } catch (ll11i1Il) {}
        await this.initPinToken();
        if (!this.isMember && openCardTypes.includes(this.activityType)) {
          await this.openCard();
          this.isMember = true;
          return;
        }
        !this.isMember && this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(I1lIl111 => [1, 3].includes(I1lIl111.prizeType) && I1lIl111.leftNum !== 0).length > 0 && ["10023", "10024", "10040", "10036", "10068", "10002"].includes(this.activityType) && (await this.openCard(), this.isMember = true);
        if (!this.isMember) {
          this.putMsg("" + this.joinDes);
          throw new Error(this.joinDes);
        }
      }
    }
  }
  async ["getPrizeList"]() {
    let Iil1I1I = await this.api("/api/prize/drawPrize", {});
    if (Iil1I1I.resp_code !== 0) {
      this.log("获取奖品是失败");
      return;
    }
    this.prizeList = Iil1I1I.data?.["prizeInfo"] || [];
  }
  async ["loadFrontAct"]() {
    let iIiiii = await this.api("/front/activity/loadFrontAct", {});
    if (iIiiii.code == "200") {
      this.actStartTime = iIiiii.result.activity.startTime;
      this.actEndTime = iIiiii.result.activity.endTime;
      this.rule = iIiiii.result.activity.remark;
      this.shopName = iIiiii.result.activity.shopTitle;
      this.useGrade = iIiiii.result.activity.useGrade;
      this.shopId = iIiiii.result.user.shopId;
      this.venderId = iIiiii.result.user.venderId;
      this.memberStatus = iIiiii.result.user.memberStatus;
      this.actName = iIiiii.result.activity.actName;
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
      iIiiii.result.activity.isNeedFavourite && !iIiiii.result.isFavouriteShop && (await this.reportActionLog({
        "actionType": "favouriteShop"
      }));
    } else {
      this.putMsg("loadFrontAct失败");
      throw new Error(iIiiii.message);
    }
    if (!this.prizeList || this.prizeList.length <= 0) {
      let lliIlIiI = await this.api("/front/activity/loadFrontAward", {});
      if (lliIlIiI.succ) {
        this.prizeList = lliIlIiI.result || [];
        this.activity = iIiiii.result;
        if (this.prizeList && this.prizeList.length > 0 && this.prizeList.filter(li11lllI => !["JD_D_COUPON"].includes(li11lllI.awardType)).length === 0) {
          this.expire = true;
          this.putMsg("垃圾活动");
          throw new Error("垃圾活动");
        }
      }
    }
  }
  async ["reportActionLog"](Il1ilii1) {
    await this.wait(3000, 5000);
    let li11liI = await this.api("/front/activity/reportActionLog", Il1ilii1);
    if (li11liI.code == "200") {
      this.log(Il1ilii1?.["actionType"] + "操作成功");
    } else this.putMsg(li11liI.message);
  }
  ["v"](iIi1i1ii) {
    let liI1Ii1l = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
    var l1ii1II1 = iIi1i1ii.nowTime + parseInt(this.tickets.get("te"));
    iIi1i1ii.nowTime = l1ii1II1;
    debugger;
    for (var l1IIiIlI = this.tickets.get("pToken") + l1ii1II1, lI1lIill = l1IIiIlI.substring(0, l1IIiIlI.length - 5), l1Iilil1 = "", Iii1i1II = 0; Iii1i1II < lI1lIill.length; Iii1i1II++) {
      var IIlll1i1 = lI1lIill.charCodeAt(Iii1i1II);
      l1Iilil1 += liI1Ii1l[IIlll1i1 % 10][Iii1i1II];
    }
    for (var liIiliil = l1Iilil1.length, iIiliIil = Math.floor(liIiliil / 24), llil11ll = "", I1iliIli = 0; I1iliIli < 24; I1iliIli++) {
      var l1IIiIl1 = (I1iliIli + 1) * iIiliIil;
      23 === I1iliIli && (l1IIiIl1 = liIiliil);
      for (var ll1i11il = l1Iilil1.substring(I1iliIli * iIiliIil, l1IIiIl1), lillil1l = [], i111I1 = 0; i111I1 < ll1i11il.length; i111I1++) {
        lillil1l.push(ll1i11il.charCodeAt(i111I1));
      }
      var IiiI1III = lillil1l.reduce(function (iiIlIliI, IIl1I1i1) {
          return iiIlIliI + IIl1I1i1;
        }, 0),
        Ill1IlIl = Math.floor(IiiI1III / lillil1l.length);
      llil11ll += String.fromCharCode(Ill1IlIl);
    }
    var i1llliil = function (lllill1i) {
        lllill1i = lllill1i.split("").reverse().join("");
        for (var liiliii = new Uint8Array(12), ll11ll = new TextEncoder().encode(lllill1i), llllII11 = 0; llllII11 < ll11ll.length; llllII11 += 2) {
          var IilIllI = ll11ll[llllII11] << 5 | 255 & ll11ll[llllII11 + 1];
          IilIllI %= 63;
          liiliii[llllII11 >> 1] = IilIllI;
        }
        for (var IilIlI1I = "", iIllIliI = 0; iIllIliI < liiliii.length; iIllIliI++) {
          IilIlI1I += (liiliii[iIllIliI] + 256).toString(2).slice(1);
        }
        for (var liI1ili = "", Ill1111 = "", lIi1Iii = 0; lIi1Iii < 16; lIi1Iii++) {
          if (0 !== lIi1Iii) {
            for (var iIilliI1 = 6 * lIi1Iii, iIli1l1 = IilIlI1I.substring(iIilliI1, iIilliI1 + 6), Il1lIl1l = parseInt(iIli1l1, 2), I1iliiii = Ill1111.split(""), Iiiil1I1 = 0; Iiiil1I1 < I1iliiii.length; Iiiil1I1++) {
              "1" === I1iliiii[Iiiil1I1] && (Il1lIl1l = 63 & (Il1lIl1l >> 6 - Iiiil1I1 | Il1lIl1l << Iiiil1I1));
            }
            Ill1111 = (63 & Il1lIl1l).toString(2).padStart(6, "0");
          } else Ill1111 = IilIlI1I.substring(0, 6);
          liI1ili += Ill1111;
        }
        for (var lIIl11 = 0; lIIl11 < 12; lIIl11++) {
          var iliilIl1 = 8 * lIIl11;
          liiliii[lIIl11] = parseInt(liI1ili.substring(iliilIl1, iliilIl1 + 8), 2);
        }
        return base64.encode(String.fromCharCode.apply(null, liiliii));
      }(l1Iilil1 = llil11ll),
      IiIIi1I1 = CryptoJS.enc.Utf8.parse(i1llliil),
      iIlillil = CryptoJS.enc.Utf8.parse("");
    return CryptoJS.AES.encrypt(JSON.stringify(iIi1i1ii), IiIIi1I1, {
      "iv": iIlillil,
      "mode": CryptoJS.mode.ECB,
      "padding": CryptoJS.pad.Pkcs7
    }).toString();
  }
  async ["api"](ilI11i1, Illl1l1, IilIiiII = this.Token, ill1lil = this.ticket, l1I1il1I = 0) {
    let i1i11lII = Illl1l1;
    try {
      ilI11i1 = ("/" + ilI11i1).replace("//", "/");
      this.urlPrefix = this.urlPrefix ? ("/" + this.urlPrefix).replace("//", "/") : "";
      let illIil1I = "https://" + this.domain + this.urlPrefix + ilI11i1,
        l1l1lII = {
          "Host": this.domain,
          "Accept": "application/json, text/plain, text/javascript, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": Illl1l1 ? typeof Illl1l1 == "string" ? "application/x-www-form-urlencoded;charset=utf-8" : "application/json;charset=utf-8" : "application/x-www-form-urlencoded;charset=utf-8",
          "Origin": "https://" + this.domain,
          "Cookie": this.activityUrl.match(new RegExp(["prod/cc", "interact", "crm-proya", ...hdbTypes, ...jinggengcjTypes].join("|"))) ? "" : "IsvToken=" + IilIiiII + ";" + ill1lil,
          "Referer": this.activityUrl + "&sid=" + this.randomString() + "&un_area=" + this.randomPattern("xx_xxxx_xxxx_xxxxx"),
          "User-Agent": this.UA
        };
      IilIiiII?.["startsWith"]("ey") && (l1l1lII.token = IilIiiII);
      hdbTypes.includes(this.domain) && (Illl1l1 = this.hdbBody(ilI11i1, Illl1l1, l1l1lII));
      jinggengcjTypes.includes(this.domain) && (Illl1l1 = this.jinggengjcqBody(ilI11i1, Illl1l1));
      if (this.defenseUrls && this.defenseUrls.includes(ilI11i1)) {
        if (this.activityUrl.includes("interactsaas")) Illl1l1.nowTime = this.timestamp(), Illl1l1.actId = this.activityId, Illl1l1.consumePoints = Illl1l1.consumePoints || 0;else {
          const iI1IIlI1 = new URLSearchParams(Illl1l1);
          Illl1l1 = {};
          for (const [Ii11IllI, i11iIllI] of iI1IIlI1.entries()) {
            Illl1l1[Ii11IllI] = i11iIllI;
          }
          Illl1l1.nowTime = this.timestamp();
          Illl1l1.actId = this.activityId;
          debugger;
        }
        l1l1lII.Cookie = "IsvToken=" + this.isvToken + ";" + this.ticket + "isBasicJson=true;";
        let IilI11i = this.v(Illl1l1);
        Illl1l1 = {
          "ecyText": IilI11i
        };
      }
      if (/lzdz4-isv/.test(this.activityUrl)) for (let I1II1Ii of Object.keys(this.tickets)) {
        l1l1lII[I1II1Ii.replace("_", "").toLowerCase()] = this.tickets.get(I1II1Ii);
      }
      let {
        data: li11I11
      } = await this.request(illIil1I, l1l1lII, Illl1l1);
      if (this.defenseUrls && this.defenseUrls.includes(ilI11i1) && (!li11I11 || li11I11.length === 0) && l1I1il1I < 5) return await this.initPinToken(), await this.api(ilI11i1, i1i11lII, IilIiiII, ill1lil, ++l1I1il1I);
      if (!li11I11) {
        return li11I11;
      }
      let lIiiiIi = JSON.stringify(li11I11);
      if (/还是去买买买吧/.test(lIiiiIi)) {
        this.putMsg("火爆账号[" + this.username + "]");
        throw new Error("还是去买买买吧");
      }
      if (lIiiiIi?.["includes"]("AUTH.FAILED.BLACK")) return this.putMsg("AUTH BLACK"), li11I11;
      if (lIiiiIi?.["includes"]("请稍后重试") && jinggengcjTypes.includes(this.domain)) return li11I11;
      if (new RegExp(reTryRegx).test(lIiiiIi) && l1I1il1I < 5) return this.log("重试" + l1I1il1I), await this.api(ilI11i1, i1i11lII, IilIiiII, ill1lil, ++l1I1il1I);
      if ((lIiiiIi.includes("您点的太快了") || lIiiiIi.includes("操作过于频繁")) && l1I1il1I < 5) return this.log("重试" + l1I1il1I), await this.wait(3000, 5000), await this.api(ilI11i1, i1i11lII, IilIiiII, ill1lil, ++l1I1il1I);
      if (lIiiiIi.includes("请求的数字签名不匹配")) return this.log("签名错误"), await this.login(this.isvToken), await this.api(ilI11i1, i1i11lII, IilIiiII, ill1lil, ++l1I1il1I);
      if (lIiiiIi.includes("会员等级不")) {
        if (IilIiiII?.["startsWith"]("ey") && l1I1il1I < 3) return this.log("等级不足重试" + l1I1il1I), await this.login(this.isvToken), await this.wait(3000, 5000), await this.api(ilI11i1, i1i11lII, this.Token, ill1lil, ++l1I1il1I);else {
          this.putMsg("等级不足");
          throw new Error("等级不足");
        }
      }
      return (lIiiiIi.includes("商家token过期") || lIiiiIi.includes("商家订购过期")) && (this.putMsg("商家token过期"), this.expire = true), li11I11;
    } catch (liil1ii) {
      if (l1I1il1I > 3) throw new Error(liil1ii.message);
      if (this.defenseUrls && this.defenseUrls.includes(ilI11i1) && [500].includes(liil1ii.response?.["status"])) return this.log("重试"), await this.initPinToken(), await this.api(ilI11i1, i1i11lII, IilIiiII, ill1lil, ++l1I1il1I);
      if (this.isProxy(liil1ii.message)) {
        return await this.routerProxy(l1I1il1I), await this.api(ilI11i1, i1i11lII, IilIiiII, ill1lil, ++l1I1il1I);
      } else {
        throw new Error(liil1ii.message);
      }
    }
  }
  ["jinggengjcqBody"](ill1lli, lIl1i1i1) {
    let IIlI1l = ill1lli.match(/dm\/front(.+)\?/)[1];
    delete lIl1i1i1.method;
    let i1iI1iii = {
        "actId": this.activityId,
        ...lIl1i1i1,
        "method": IIlI1l,
        "userId": this.userId,
        "buyerNick": this.buyerNick || ""
      },
      l1Ii1Ill = this.mpdzSign(i1iI1iii),
      IIiliiii = "94854284";
    const IiI1IliI = {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "appkey": IIiliiii,
          "m": "POST",
          "oba": l1Ii1Ill.sign,
          "timestamp": l1Ii1Ill.timeStamp,
          "userId": this.userId
        },
        "admJson": {
          "actId": this.activityId,
          ...lIl1i1i1,
          "method": IIlI1l,
          "userId": this.userId,
          "buyerNick": this.buyerNick || ""
        }
      }
    };
    return IIlI1l?.["indexOf"]("missionInviteList") > -1 && delete IiI1IliI.params.admJson.actId, JSON.stringify(IiI1IliI);
  }
  ["mpdzSign"](iliil1ii) {
    let II1iliI1 = "6cc5dbd8900e434b94c4bdb0c16348ed",
      il1111lI = "c1614da9ac68",
      Ii11I1I = new Date().valueOf(),
      i11IIlI = encodeURIComponent(JSON.stringify(iliil1ii)),
      Ili11iI1 = new RegExp("'", "g"),
      Il11iIl1 = new RegExp("~", "g");
    i11IIlI = i11IIlI.replace(Ili11iI1, "%27");
    i11IIlI = i11IIlI.replace(Il11iIl1, "%7E");
    let Ii1i1il1 = "f" + il1111lI + "D" + i11IIlI + "c" + Ii11I1I + II1iliI1,
      lii1lI11 = CryptoJS.MD5(Ii1i1il1.toLowerCase()).toString();
    return {
      "sign": lii1lI11,
      "timeStamp": Ii11I1I
    };
  }
  ["hdbBody"](iii1IIIl, lllIliii, il1lIl1) {
    let IllllIi = this.aesBuyerNick,
      I1I11Iil = Date.now(),
      li1li1il = {
        "appJsonParams": {
          "id": this.activityId,
          "userId": this.venderId,
          "shopId": this.shopId || this.venderId,
          ...lllIliii,
          "buyerNick": IllllIi,
          "method": iii1IIIl
        },
        "sysParams": {
          "sysmethod": JSON.stringify(iii1IIIl).replace(/[^\u4e00-\u9fa5\w]/g, ""),
          "timestamp": I1I11Iil,
          "actid": this.activityId
        }
      };
    lllIliii && (lllIliii = li1li1il);
    !IllllIi && (delete lllIliii.appJsonParams.buyerNick, delete lllIliii.sysParams.buyernick);
    this.tickets.get("_sk") ? il1lIl1._sk = this.tickets.get("_sk") : "";
    this.tickets.get("zxhd_aes_buyer_nick") ? il1lIl1._dzf = this.tickets.get("zxhd_aes_buyer_nick") : "";
    let l1l1lIl1 = "actid" + this.activityId + "buyernick" + (IllllIi || "undefined") + "sysmethod" + JSON.stringify(iii1IIIl).replace(/[^\u4e00-\u9fa5\w]/g, "") + "timestamp" + I1I11Iil,
      I111il1l = il1lIl1._sk || "1111";
    return lllIliii.sysParams.sign = CryptoJS.HmacSHA256(l1l1lIl1, I111il1l).toString(CryptoJS.enc.Hex), lllIliii;
  }
  async ["selectAddress"](iliIiIii) {
    let liI1I1Il,
      ili11I1l = M_WX_ADDRESS_MODE.toUpperCase();
    this.log("当前填地址模式: " + M_WX_ADDRESS_MODE.toUpperCase());
    ["PIN"].includes(ili11I1l) && (liI1I1Il = this.accounts[iliIiIii]?.["address"] || this.accounts[encodeURIComponent(iliIiIii)]?.["address"]);
    if (liI1I1Il) return liI1I1Il;
    ["CC", "CCWAV"].includes(ili11I1l) && (liI1I1Il = this.accounts["默认地址" + this.addressIndex]?.["address"]);
    if (liI1I1Il) return liI1I1Il;
    let Ili1l1 = [];
    for (let lililI11 in this.accounts) {
      this.accounts[lililI11]?.["address"] && Ili1l1.push(this.accounts[lililI11].address);
    }
    if (["RANGE"].includes(ili11I1l)) {
      let llilI1ii = Math.min(parseInt(M_WX_ADDRESS_RANGE?.["split"]("-")?.[1] || Ili1l1.length), Ili1l1.length);
      this.addressIndex > llilI1ii && (this.addressIndex = 1);
      liI1I1Il = Ili1l1[this.addressIndex - 1];
    }
    if (liI1I1Il) {
      return liI1I1Il;
    }
    if (M_WX_ADDRESS_MODE_LOWER || ["RANDOM"].includes(ili11I1l)) {
      debugger;
      return Ili1l1[this.random(1, Ili1l1.length) - 1];
    }
  }
  async ["saveAddress"](lIi1l1I = this.addressId, iliII11l = this.prizeName, i1il1I1l = this.Pin, liI1il1l = this.username, I1Ii11ii = "") {
    if (await this.wxAddressStop(iliII11l)) {
      this.putMsg("命中关键词，不填写地址！");
      return;
    }
    if (await this.wxAddressStopRule()) {
      this.putMsg("命中规则，不填地址beta！");
      return;
    }
    this.currAddrUsername && this.currAddrUsername !== liI1il1l && this.addressIndex++;
    this.currAddrUsername = liI1il1l;
    let Il1IIl11 = await this.selectAddress(liI1il1l);
    if (!Il1IIl11) {
      this.putMsg("没有找到地址信息");
      return;
    }
    (M_WX_ADDRESS_LOG || mode) && this.log("当前地址详情" + JSON.stringify(Il1IIl11));
    let lI11lII = this.shopName;
    if (!lI11lII) try {
      lI11lII = await this.getShopName();
    } catch (il11iiI) {
      console.log("addr" + il11iiI);
    }
    try {
      if (jinggengcjTypes.includes(this.domain)) {
        let I1iil1lI = await this.api("/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + (this.buyerNick || "") + "&user_id=10299171", {
          "receiverName": Il1IIl11.receiver,
          "receiverMobile": Il1IIl11.phone,
          "receiverProvince": Il1IIl11.province,
          "receiverCity": Il1IIl11.city,
          "receiverDistrict": Il1IIl11.county,
          "receiverAddress": Il1IIl11.address,
          "logId": lIi1l1I
        });
        console.log(I1iil1lI);
      } else {
        if (this.domain.includes("jinggeng")) {
          let i1lIl1li = Il1IIl11.province.replace("市", "").replace("省", "") + " " + Il1IIl11.city.replace("市", "") + " " + Il1IIl11.county + Il1IIl11.address,
            lll1111i = await this.api("/ql/front/postBuyerInfo", "receiverName=" + encodeURIComponent(Il1IIl11.receiver) + "&mobile=" + Il1IIl11.phone + "&address=" + encodeURIComponent(i1lIl1li) + "&log_id=" + lIi1l1I + "&user_id=" + this.userId);
          console.log(lll1111i);
          if (lll1111i.succ) this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + iliII11l + "," + liI1il1l + "," + Il1IIl11.phone + "," + Il1IIl11.address + "," + this.name + "," + lI11lII + "," + this.activityUrl + "\n");else {
            this.putMsg(lll1111i.msg);
          }
        } else {
          if (this.activityUrl.includes("interact") || this.activityUrl.includes("prod/cc") || this.activityUrl.includes("crm-proya")) {
            let i11IIIl1 = await this.api("/api/my/prize/update", {
              "realName": Il1IIl11.receiver,
              "mobile": Il1IIl11.phone,
              "address": Il1IIl11.address,
              "orderCode": this.addressId,
              "province": Il1IIl11.province,
              "city": Il1IIl11.city,
              "county": Il1IIl11.county
            });
            console.log(i11IIIl1);
            if (i11IIIl1?.["data"] !== "2") {
              this.putMsg("已填地址");
              await fs.appendFileSync("gifts.csv", this.now() + "," + iliII11l + "," + liI1il1l + "," + Il1IIl11.phone + "," + Il1IIl11.address + "," + this.name + "," + lI11lII + "," + this.activityUrl + "\n");
            } else this.putMsg("超一小时或其他报错，请手动进活动确认");
          } else {
            let iiilIl = await this.api("wxAddress/save", "venderId=" + this.venderId + "&pin=" + i1il1I1l + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(iliII11l) + "&receiver=" + encodeURIComponent(Il1IIl11.receiver) + "&phone=" + Il1IIl11.phone + "&province=" + encodeURIComponent(Il1IIl11.province) + "&city=" + encodeURIComponent(Il1IIl11.city) + "&address=" + encodeURIComponent(Il1IIl11.address) + "&generateId=" + lIi1l1I + "&postalCode=" + Il1IIl11.postalCode + "&areaCode=" + encodeURIComponent(Il1IIl11.areaCode) + "&county=" + encodeURIComponent(Il1IIl11.county));
            if (!iiilIl?.["result"]) {
              if (iiilIl.errorMessage.includes("您必须在中奖一小时内填写中奖地址")) return;
            }
            if (iiilIl?.["result"]) {
              this.putMsg("已填地址");
              await fs.appendFileSync("gifts.csv", this.now() + "," + iliII11l + "," + liI1il1l + "," + Il1IIl11.phone + "," + Il1IIl11.address + "," + this.name + "," + lI11lII + "," + this.activityUrl + "\n");
            } else {
              iiilIl = await this.api("wxAddress/save", "venderId=" + this.shopId + "&pin=" + i1il1I1l + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(iliII11l) + "&receiver=" + encodeURIComponent(Il1IIl11.receiver) + "&phone=" + Il1IIl11.phone + "&province=" + encodeURIComponent(Il1IIl11.province) + "&city=" + encodeURIComponent(Il1IIl11.city) + "&address=" + encodeURIComponent(Il1IIl11.address) + "&generateId=" + lIi1l1I + "&postalCode=" + Il1IIl11.postalCode + "&areaCode=" + encodeURIComponent(Il1IIl11.areaCode) + "&county=" + encodeURIComponent(Il1IIl11.county));
              iiilIl?.["result"] ? (this.putMsg("已填地址"), await fs.appendFileSync("gifts.csv", this.now() + "," + iliII11l + "," + liI1il1l + "," + Il1IIl11.phone + "," + Il1IIl11.address + "," + this.name + "," + lI11lII + "," + this.activityUrl + "\n")) : this.putMsg("" + iiilIl?.["errorMessage"]);
            }
          }
        }
      }
    } catch (IiIlIi1i) {
      console.log(IiIlIi1i);
    }
  }
  async ["carData"]() {
    let lIll1i11 = "https://wq.jd.com/deal/mshopcart/uncheckcmdy?sceneval=2&g_login_type=1&g_ty=ajax",
      llIIlIli = "commlist=&pingouchannel=0&all=1&scene=0&locationid=&type=0&templete=1&reg=1&version=20190418&traceid=&tabMenuType=4&sceneval=2",
      II1IlIii = {
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
        data: l11il1li
      } = await this.request(lIll1i11, II1IlIii, llIIlIli);
    return l11il1li.errId === "0" ? l11il1li : "";
  }
  async ["carRmv"](llIlli1l = []) {
    let l1IIiiII = [],
      ii1lIlI = await this.carData();
    if (ii1lIlI) {
      for (let Il1iIiI of ii1lIlI.cart.venderCart) {
        for (let ilIlII11 of Il1iIiI.sortedItems) {
          for (let l1I1I of ilIlII11.polyItem.products) {
            if (llIlli1l.length > 0 && llIlli1l.includes(l1I1I.mainSku.id.toString()) || llIlli1l.length === 0) {
              const i111li11 = ilIlII11.polyItem?.["promotion"]?.["pid"];
              if (i111li11) {
                l1IIiiII.push(l1I1I.mainSku.id + ",,1," + l1I1I.mainSku.id + ",11," + ilIlII11.polyItem.promotion.pid + ",0,skuUuid:" + l1I1I.skuUuid + "@@useUuid:0");
              } else {
                l1IIiiII.push(l1I1I.mainSku.id + ",,1," + l1I1I.mainSku.id + ",1,,0,skuUuid:" + l1I1I.skuUuid + "@@useUuid:0");
              }
            }
          }
        }
      }
    }
    if (l1IIiiII.length === 0) return;
    this.log("即将删除" + l1IIiiII.length + "件商品");
    let l1II1il = "https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax",
      lIi1i11i = "pingouchannel=0&commlist=" + encodeURIComponent(l1IIiiII.join("$")) + "&type=0&checked=0&locationid=&templete=1&reg=1&scene=0&version=20190418&traceid=&tabMenuType=4&sceneval=2",
      I1il1il1 = {
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
        data: liiI1Il
      } = await this.request(l1II1il, I1il1il1, lIi1i11i);
    return liiI1Il.errId === "0" ? liiI1Il : {};
  }
  async ["openCardInfo"](iI1ii1Il = this.venderId, ilIl1 = this.cookie, IIII1li1 = 0) {
    try {
      if (openCardMode.includes("wh5")) {
        let II1ll1Ii = {
            "venderId": iI1ii1Il,
            "payUpShop": true,
            "channel": 406
          },
          iIiil = "https://api.m.jd.com/getShopOpenCardInfo?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(II1ll1Ii)) + "&uuid=88888&clientVersion=9.2.0&client=wh5&" + (await this.h5st());
        return await this.get(iIiil, {
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
        let I11llili = "https://api.m.jd.com/client.action?appid=jd_shop_member&" + (await this.h5st({
          "venderId": iI1ii1Il,
          "channel": 401
        }, "getShopOpenCardInfo"));
        return await this.get(I11llili, {
          "Accept": "*/*",
          "Connection": "close",
          "Referer": "https://shopmember.m.jd.com/shopcard/?",
          "Accept-Encoding": "gzip, deflate, br",
          "Host": "api.m.jd.com",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
          "Accept-Language": "zh-cn",
          "Cookie": ilIl1
        });
      }
    } catch (lliI1Ii1) {
      this.log(lliI1Ii1.message);
      if (IIII1li1 < 3 && lliI1Ii1.message.includes("status code 403")) {
        return this.isProxy(lliI1Ii1.message) ? (await this.routerProxy(IIII1li1), await this.wait(1000, 2000)) : await this.router(), await this.openCardInfo(iI1ii1Il, ilIl1, ++IIII1li1);
      }
      return {};
    }
  }
  async ["isOpenCard"](Ili11il = this.venderId, i1i1I1lI = this.cookie, l1l = 0) {
    try {
      let iIlIiiIl = "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo",
        llIl1lIi = {
          "venderId": Ili11il
        },
        lil1IlIi = "body=" + encodeURIComponent(JSON.stringify(llIl1lIi)) + "&uuid=2be5d035ec2c47e682c883a13e02cdb6&client=apple&clientVersion=9.4.0",
        {
          data: llli11I
        } = await this.request(iIlIiiIl, {
          "Host": "api.m.jd.com",
          "User-Agent": "User-Agent: JD4iPhone/167814 (iPhone; iOS 14.4; Scale/3.00)",
          "Content-Type": "application/x-www-form-urlencoded",
          "Origin": "https://api.m.jd.com",
          "Cookie": i1i1I1lI
        }, lil1IlIi);
      return llli11I?.["result"]?.["userInfo"]?.["openCardStatus"] === 1 && this.log(Ili11il + " 已经是会员"), await this.wait(1000), llli11I?.["result"]?.["userInfo"]?.["openCardStatus"] === 1;
    } catch (iIiIII1l) {
      this.log(iIiIII1l.message);
      if (l1l < 3 && iIiIII1l.message.includes("status code 403")) return this.isProxy(iIiIII1l.message) ? (await this.routerProxy(l1l), await this.wait(1000, 2000)) : await this.router(), await this.isOpenCard(Ili11il, i1i1I1lI, ++l1l);
      return false;
    }
  }
  async ["openCard"](i11IIl1I = this.venderId, IIlii1il = 406, lI11IIl1 = "", li1Il1iI = 0) {
    try {
      if (li1Il1iI > 3) return;
      let iIiIi1ii = {
        "venderId": i11IIl1I,
        "shopId": this.shopId || i11IIl1I,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": IIlii1il
      };
      lI11IIl1 && Object.assign(iIiIi1ii, {
        "activityId": lI11IIl1
      });
      let iI1l11l1 = "https://api.m.jd.com/client.action",
        Iiil11Il = {
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
      iIiIi1ii = "appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + encodeURIComponent(JSON.stringify(iIiIi1ii)) + "&client=H5&clientVersion=9.2.0&" + (await this.h5st());
      let lII1illl = await this.post(iI1l11l1, iIiIi1ii, Iiil11Il);
      this.log("开卡结果:" + lII1illl?.["message"]);
      if ([0, 9003].includes(lII1illl?.["busiCode"] * 1)) return lII1illl;
      if ([508, 510, 201, 9002].includes(lII1illl?.["busiCode"] * 1)) {
        throw new Error(lII1illl?.["message"]);
      }
      if ((lII1illl?.["message"]?.["includes"]("火爆") || lII1illl?.["message"]?.["includes"]("失败")) && li1Il1iI < 3) return await this.openCard(i11IIl1I, IIlii1il, lI11IIl1, ++li1Il1iI);
      return lII1illl;
    } catch (iiiIllI1) {
      ++li1Il1iI;
      if (li1Il1iI < 3 && iiiIllI1.message.includes("status code 403")) return this.isProxy(iiiIllI1.message) ? (await this.routerProxy(li1Il1iI), await this.wait(1000, 2000)) : await this.router(), await this.openCard(i11IIl1I, IIlii1il, lI11IIl1, li1Il1iI);else {
        throw new Error(iiiIllI1?.["message"]);
      }
    }
  }
  async ["getShopMemberInfo"](lIiI11Ii = this.cookie, ilIlIlIi = this.shopId, i1lI1i1l = this.venderId) {
    try {
      let II11I11i = await this.sign("getFansFuseMemberDetail", {
          "shopId": ilIlIlIi,
          "venderId": i1lI1i1l,
          "channel": 102,
          "queryVersion": "10.5.2"
        }),
        ill1I1II = {
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
          "Cookie": lIiI11Ii
        },
        liI1111 = "https://api.m.jd.com/client.action?functionId=" + II11I11i.fn,
        {
          status: lii1lIlI,
          data: i1lllili
        } = await this.request(liI1111, ill1I1II, II11I11i.sign);
      return i1lllili.data[0].memberInfo;
    } catch (I111IlIi) {
      return console.log(I111IlIi), {};
    }
  }
  async ["h5st"](iillliiI, lli1l11I = "bindWithVender", I11lill = 0) {
    return h5sts.random();
  }
  ["getAwardText"](iiIIIiII) {
    let IIii1ll = "";
    if (iiIIIiII.awardType == "JD_GOODS") {
      IIii1ll = iiIIIiII.awardName + " " + iiIIIiII.awardDenomination * 1 + "元";
    } else {
      if (iiIIIiII.awardType == "JD_POINT") {
        IIii1ll = iiIIIiII.awardDenomination * 1 + "积分";
      } else {
        if (iiIIIiII.awardType == "JD_COUPON" || iiIIIiII.awardType == "JD_D_COUPON") IIii1ll = iiIIIiII.awardDenomination * 1 + "元券";else {
          if (iiIIIiII.awardType == "JD_BEAN" || iiIIIiII.awardType == "JD_MARKET") IIii1ll = iiIIIiII.awardDenomination * 1 + "豆";else {
            if (iiIIIiII.awardType == "JD_E_CARD") IIii1ll = iiIIIiII.assetsName;else {
              if (iiIIIiII.awardType == "JD_AIQIYI") IIii1ll = iiIIIiII.assetsName;else {
                if (iiIIIiII.awardType == "JD_REDBAG" || iiIIIiII.awardType == "JD_RED_BAG") IIii1ll = iiIIIiII.awardDenomination * 1 + "元红包";else {
                  IIii1ll = iiIIIiII.awardName;
                  debugger;
                }
              }
            }
          }
        }
      }
    }
    return IIii1ll;
  }
  async ["getOpenCardPath"](lill1Ii = this.activityUrl) {
    let i11iil1 = await this.get(lill1Ii, {});
    const i1Iil11l = cheerio.load(cheerio.load(i11iil1).html());
    let IlIi1lII = "";
    i1Iil11l("script[src]").each((IiI1il1, iI1i11II) => {
      const lI11llli = i1Iil11l(iI1i11II).attr("src");
      let lIil1II = lI11llli.match(/\/\/.*\/js\/index\.\w+\.js/);
      lIil1II && lIil1II.length > 0 && (IlIi1lII = lIil1II[0]);
    });
    i11iil1 = await this.get("https:" + IlIi1lII, {});
    let i1l1I1i = i11iil1.match(/dingzhi\/([a-zA-Z]+)\/union\/saveTask/);
    return i1l1I1i[1];
  }
  async ["apiBatch"](i1l1illi, ilIIliii = {}) {
    let iI1IlIlI = ilIIliii?.["batchSize"] || 2,
      lllIlIIi = ilIIliii?.["execCount"] || 0,
      l1l11l1i = ilIIliii?.["filterFunc"] || null,
      lIlIiil = ilIIliii?.["processFunc"] || null;
    const ll1I11ii = [];
    for (let l1IiIlll = 0; l1IiIlll < lllIlIIi; l1IiIlll++) {
      for (let iI1Il11i = 0; iI1Il11i < i1l1illi.length; iI1Il11i += iI1IlIlI) {
        const iI1lIli = i1l1illi.slice(iI1Il11i, iI1Il11i + iI1IlIlI),
          i11i1liI = Promise.all(iI1lIli.map(async ii1il1 => {
            try {
              const lii1IiiI = await ii1il1();
              if (lii1IiiI !== null && (!l1l11l1i || l1l11l1i(lii1IiiI))) return lIlIiil ? lIlIiil(lii1IiiI) : lii1IiiI;
              return null;
            } catch (ilIii1i1) {
              return console.error("任务 " + ii1il1 + " 执行出错：" + ilIii1i1), null;
            }
          }));
        ll1I11ii.push(i11i1liI);
      }
    }
    const lIIilliI = (await Promise.all(ll1I11ii)).flat();
    let li11ii1 = lIIilliI.filter(i11lIil => i11lIil !== null);
    if (lIlIiil) {
      li11ii1 = li11ii1.map(li1ii1i => {
        try {
          return lIlIiil(li1ii1i);
        } catch (llllll1I) {
          return console.error("处理结果 " + li1ii1i + " 出错：" + llllll1I), null;
        }
      }).filter(iiililI1 => iiililI1 !== null);
    }
    return li11ii1;
  }
  ["getActivityId"](liiIi111 = this.activityUrl) {
    const lI1iII1 = new URLSearchParams(new URL(liiIi111).search),
      I1illI1l = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let I1Ii1llI = "";
    for (let i1lI1ll1 of I1illI1l) {
      I1Ii1llI = lI1iII1.get(i1lI1ll1);
      if (I1Ii1llI) break;
    }
    return !I1Ii1llI && (I1Ii1llI = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, liiIi111)), this.activityId = I1Ii1llI, this.activityId;
  }
  ["filterUrl"](i1IlII) {
    if (i1IlII === null) return null;
    const ii11Ii1l = new URLSearchParams(new URL(i1IlII).search),
      lIiil1I = [];
    for (const [ilIl1Il, l1liilI1] of ii11Ii1l.entries()) {
      if (keywords.includes(ilIl1Il)) {
        continue;
      }
      lIiil1I.push(ilIl1Il + "=" + l1liilI1);
    }
    if (lIiil1I.length > 0) return i1IlII.split("?")[0] + "?" + lIiil1I.join("&");
    return i1IlII;
  }
  ["buildActInfo"]() {
    if (!this.activityUrl) {
      return;
    }
    this.activityUrl = this.filterUrl(this.activityUrl);
    this.activityUrl = this.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, this.activityUrl);
    this.activityUrl = this?.["activityUrl"]?.["replace"](/(isvjd|lzkjdz|cjhydz|lzkjdzisv|cjhydzisv)/g, I1ll1IIi => {
      switch (I1ll1IIi) {
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
          return I1ll1IIi;
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
    this?.["activityUrl"] && (this.urlPrefix = Object.keys(urlPrefixes).find(iiIIii1i => this.activityUrl.match(urlPrefixes[iiIIii1i])) || "");
    console.log("活动链接 " + this.activityUrl + " " + this.activityType + " " + this.venderId);
  }
  async ["complete"]() {
    !this.runAll && this.index >= this.masterNum && (this.putMsg("全部完成"), this.expire = true);
  }
  ["getAwardPrizeInfo"](iIiiIilI) {
    const lil1I1II = iIiiIilI.awardType === "JD_BEAN" || iIiiIilI.awardType === "JD_MARKET",
      l1i11ili = parseInt(iIiiIilI.awardDenomination);
    return {
      "isBean": lil1I1II,
      "prizeNum": l1i11ili
    };
  }
  ["formatDateString"](ii1i1ii1) {
    if (ii1i1ii1.match(/\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2}/)) {
      return ii1i1ii1.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日(\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
    }
    return ii1i1ii1;
  }
  async ["getRuleSETime"](l1liliII = this.rule) {
    debugger;
    if (this.actStartTime) return;
    const Il1Ii1ll = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}|\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}|\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2})/g,
      IlliiiII = l1liliII.match(Il1Ii1ll);
    if (IlliiiII) {
      const l1II1i1 = this.formatDateString(IlliiiII[0]),
        Ilil1ill = this.formatDateString(IlliiiII[1]);
      this.actStartTime = new Date(l1II1i1).getTime();
      this.actEndTime = new Date(Ilil1ill).getTime();
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