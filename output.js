//Fri Sep 13 2024 13:23:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x26a768 = require("./jdCookie"),
  _0x14134a = require("./function/dylans"),
  _0x34d7a2 = require("./function/dylib");
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
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("JD_FCWB_InviterId // 指定助力码，不填默认助力账号一");
console.log("JD_FCWB_NUM // 指定人数，不填默认跑全部账号");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const _0x204401 = process.env.JD_FCWB_InviterId || "",
  _0x18aa8f = process.env.JD_FCWB_NUM;
let _0x14c9d5 = "Bn1VWXtvgTv5ewPoMR-X8A";
const _0x369758 = "1";
let _0x457f46 = parseInt(_0x369758) * 1000;
$.helpnum = 0;
$.FCWBEnd = false;
let _0x2b0a57 = "";
const _0x4f2ecd = Object.keys(_0x26a768).map(_0x1156b7 => _0x26a768[_0x1156b7]).filter(_0x4e441b => _0x4e441b);
!_0x4f2ecd[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("❖ 当前活动ID：" + _0x14c9d5);
  _0x18aa8f ? console.log("❖ 已填写指定人数变量，指定人数 [" + _0x18aa8f + "]") : console.log("❖ 未填写指定人数变量，默认全车助力");
  if (_0x204401) {
    let _0x43d108 = _0x204401.split("&");
    $.zdinviter = _0x43d108[0];
    $.zdinviteCode = _0x43d108[1];
    console.log("❖ 已填写指定助力变量，开始助力 [" + $.zdinviteCode + "]");
  } else {
    console.log("❖ 未填写指定助力变量，开始助力账号[1]");
  }
  for (let _0x333877 = 0; _0x333877 < _0x4f2ecd.length; _0x333877++) {
    $.index = _0x333877 + 1;
    _0x2b0a57 = _0x4f2ecd[_0x333877];
    $.UserName = decodeURIComponent(_0x2b0a57.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2b0a57.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0x34d7a2.getUA("", $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await _0x31d3d9();
    if ($.FCWBEnd || $.runEnd) {
      break;
    }
    await $.wait(parseInt(_0x457f46 * 1 + 1000, 10));
  }
})().catch(_0x58b325 => $.logErr(_0x58b325)).finally(() => $.done());
async function _0x31d3d9() {
  $.canWatering = true;
  $.hotproxy = false;
  try {
    {
      if (_0x204401) {
        await _0x243342($.zdinviteCode, $.zdinviter);
      } else {
        if ($.index == 1) {
          console.log("⏺️ 账号[1]获取助力信息");
          await _0x49128e();
          if ($.runEnd) {
            return;
          }
        } else {
          if (_0x18aa8f <= $.personNum) {
            console.log("✅ 已达到指定人数，退出！");
            $.FCWBEnd = true;
            return;
          }
          await _0x243342($.myinviteCode, $.markedPin);
        }
      }
    }
  } catch (_0x3a94d2) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x3a94d2);
  }
}
async function _0x49128e() {
  $.happyDigHome = "";
  $.happyDigHelpList = "";
  await _0x2e487e("happyDigHome");
  if ($.runEnd) {
    return;
  }
  await $.wait(parseInt(_0x457f46 * 1 + 1000, 10));
  await _0x2e487e("happyDigHelpList");
  await $.wait(parseInt(_0x457f46 * 1 + 1000, 10));
  $.happyDigHome?.["markedPin"] ? ($.myinviteCode = $.happyDigHome?.["inviteCode"], $.markedPin = $.happyDigHome?.["markedPin"], $.personNum = $.happyDigHelpList?.["personNum"] || 0, console.log("⏺️ 已有助力人数：" + $.personNum + "\n⏺️ 助力码：" + $.markedPin + "&" + $.myinviteCode)) : (console.log("⏺️ 未能正确获取到助力码，退出执行！"), $.runEnd = true);
}
async function _0x243342(_0x49eee4, _0x5fd94e) {
  $.inviteCode = _0x49eee4;
  $.inviter = _0x5fd94e;
  await _0x2e487e("happyDigHelp");
}
async function _0x1412f6(_0x38fdf5, _0x29c4e7) {
  try {
    switch (_0x38fdf5) {
      case "happyDigHelp":
        if (_0x29c4e7?.["code"] === 0 && _0x29c4e7?.["success"] === true) {
          $.happyDigHelp = _0x29c4e7;
          switch ($.happyDigHelp?.["success"]) {
            case false:
              console.log("❎ " + _0x29c4e7.errMsg);
              break;
            case true:
              if (_0x204401) {
                $.helpnum++;
                console.log("✅ 助力成功 [" + $.helpnum + "]");
                if (_0x18aa8f) {
                  if (_0x18aa8f <= $.helpnum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.FCWBEnd = true;
                    return;
                  }
                }
              } else {
                $.personNum++;
                console.log("✅ 助力成功 [" + $.personNum + "]");
                if (_0x18aa8f) {
                  if (_0x18aa8f <= $.personNum) {
                    console.log("✅ 当前助力已达到指定助力人数，退出！");
                    $.FCWBEnd = true;
                    return;
                  }
                }
              }
              break;
            default:
              {
                console.log("[未知助力状态]:[" + $.happyDigHelp + "]");
                $.hotproxy = true;
                break;
              }
          }
        } else {
          if (_0x29c4e7.data?.["bizMsg"]) {
            console.log("> " + _0x29c4e7.errMsg);
          } else {
            if (_0x29c4e7.errMsg) {
              console.log("> " + _0x29c4e7.errMsg);
            } else {
              if (_0x29c4e7.msg) {
                console.log("> " + _0x29c4e7.msg);
              } else {
                console.log("❓" + _0x38fdf5 + " " + JSON.stringify(_0x29c4e7));
              }
            }
          }
        }
        break;
      case "happyDigHome":
        if (_0x29c4e7?.["code"] === 0 && _0x29c4e7?.["success"] === true) {
          $.happyDigHome = _0x29c4e7.data;
        } else {
          if (_0x29c4e7.data?.["bizMsg"]) {
            console.log("> " + _0x29c4e7.data?.["bizMsg"] + "}");
          } else {
            if (_0x29c4e7.errMsg) {
              $.runEnd = true;
              console.log("> " + _0x29c4e7.errMsg);
            } else {
              _0x29c4e7.msg ? console.log("> " + _0x29c4e7.msg) : console.log("❓" + _0x38fdf5 + " " + JSON.stringify(_0x29c4e7));
            }
          }
        }
        break;
      case "happyDigHelpList":
        if (_0x29c4e7?.["code"] === 0 && _0x29c4e7?.["success"] === true) {
          $.happyDigHelpList = _0x29c4e7.data;
        } else {
          if (_0x29c4e7.data?.["bizMsg"]) {
            console.log("> " + _0x29c4e7.data?.["bizMsg"]);
          } else {
            if (_0x29c4e7.errMsg) {
              $.runEnd = true;
              console.log("> " + _0x29c4e7.errMsg);
            } else {
              _0x29c4e7.msg ? console.log("> " + _0x29c4e7.msg) : console.log("❓" + _0x38fdf5 + " " + JSON.stringify(_0x29c4e7));
            }
          }
        }
        break;
    }
  } catch (_0x63775) {
    console.log("❌ 未能正确处理 " + _0x38fdf5 + " 请求响应 " + (_0x63775.message || _0x63775));
  }
}
async function _0x2e487e(_0x5769e7) {
  if ($.runEnd) {
    return;
  }
  let _0x596996 = "get",
    _0x24bb9c = "https://api.m.jd.com/api",
    _0x2de894 = {};
  switch (_0x5769e7) {
    case "happyDigHome":
      appId = "ce6c2";
      const _0x3d9232 = {
        linkId: _0x14c9d5
      };
      _0x2de894 = _0x3d9232;
      break;
    case "happyDigHelpList":
      appId = "02f8d";
      const _0x1da75b = {
        pageNum: 1,
        pageSize: 50,
        linkId: _0x14c9d5
      };
      _0x2de894 = _0x1da75b;
      break;
    case "happyDigHelp":
      appId = "8dd95";
      const _0xd9ec63 = {
        linkId: _0x14c9d5,
        inviter: $.inviter,
        inviteCode: $.inviteCode
      };
      _0x2de894 = _0xd9ec63;
      break;
    default:
      console.log("❌ 未知请求 " + _0x5769e7);
      return;
  }
  const _0x57126d = {
    loginType: "2",
    loginWQBiz: "wegame",
    uuid: $.uuid,
    lang: "zh_CN"
  };
  const _0x57bf06 = _0x457f2a(_0x57126d);
  if (appId) {
    let _0x1fa3e6 = {
      appId: appId,
      functionId: _0x5769e7,
      body: _0x2de894,
      appid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
    _0x2de894 = await _0x14134a.getbody(_0x1fa3e6);
    _0x2de894 += "&" + _0x57bf06;
    if (!_0x2de894) {
      return;
    }
  } else {
    _0x2de894 && (_0x2de894 = "functionId=" + _0x5769e7 + "&body=" + encodeURIComponent(JSON.stringify(_0x2de894)) + "&t=" + Date.now() + "&appid=activities_platform&client=apple&clientVersion=" + $.UA.split(";")[2] + "&" + _0x57bf06);
  }
  const _0x5bd32b = {
    url: "" + _0x24bb9c + (_0x2de894 ? "?" + _0x2de894 : ""),
    method: _0x596996,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: _0x2b0a57,
      Host: "api.m.jd.com",
      Referer: "https://bnzf.jd.com/index?activityId=" + _0x14c9d5 + "&channel=wyw&utm_campaign=&utm_source=&utm_term=&utm_medium=&sid=&un_area=",
      Origin: "https://bnzf.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    timeout: 30000,
    ciphers: _0x34d7a2.cpstr
  };
  _0x596996 === "get" && (delete _0x5bd32b.data, delete _0x5bd32b.headers["Content-Type"]);
  return new Promise(async _0x2931b4 => {
    $["d" + _0x596996](_0x5bd32b, async (_0x3ff8ae, _0x500cdf, _0x4ffa8a) => {
      try {
        _0x3ff8ae ? console.log("" + $.toStr(_0x3ff8ae, _0x3ff8ae)) : _0x1412f6(_0x5769e7, JSON.parse(_0x4ffa8a));
      } catch (_0x334db2) {
        console.log(_0x334db2, _0x500cdf);
      } finally {
        _0x2931b4();
      }
    });
  });
}
function _0x457f2a(_0x5e3dc4) {
  return Object.entries(_0x5e3dc4).map(([_0x37879a, _0x98b547]) => encodeURIComponent(_0x37879a) + "=" + encodeURIComponent(_0x98b547)).join("&");
}