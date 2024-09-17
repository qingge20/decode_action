//Tue Sep 17 2024 17:08:09 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const activityUrl = process.env.LUCK_DRAW_URL || "",
  joinMember = process.env.LUCK_DRAW_OPENCARD === "true",
  isNotify = process.env.LUCK_DRAW_NOTIFY === "true",
  concMode = process.env.LUCK_DRAW_CONC === "true",
  concThreads = process.env.LUCK_DRAW_CONC_THREADS || "3";
let concTimeout = process.env.LUCK_DRAW_CONC_TIMEOUT || "60000",
  concMaxRetryTimes = process.env.LUCK_DRAW_CONC_RETRY || "0";
const drawInterval = process.env.LUCK_DRAW_INTERVAL || "";
let maxMissTimes = process.env.LUCK_DRAW_MAX_MISS || "";
const forbiddenQuit = !(process.env.LUCK_DRAW_FORBIDDEN_QUIT === "false"),
  lzkjPinFilter = (process.env.LUCK_DRAW_LZKJ_PIN_FILTER || "").split("@"),
  cjhyPinFilter = (process.env.LUCK_DRAW_CJHY_PIN_FILTER || "").split("@"),
  lzkjShopFilter = (process.env.LUCK_DRAW_LZKJ_SHOP_FILTER || "").split(","),
  cjhyShopFilter = (process.env.LUCK_DRAW_CJHY_SHOP_FILTER || "").split(",");
let cookie = "",
  activityCookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(ii1il1il => jdCookie[ii1il1il]).filter(ll1I1I => ll1I1I);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!activityUrl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const l11lI11i = common.parseUrl(activityUrl);
  if (!l11lI11i) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = activityUrl;
  $.activityId = common.getUrlParameter(activityUrl, "activityId");
  $.hostname = l11lI11i?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      $.activityMode = "cjhy";
    } else $.hostname.includes("lzkj") && ($.activityMode = "lzkj", $.hostname = "lzkj-isv.isvjd.com");
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  l11lI11i?.["pathname"]["includes"]("lzclient") && ($.activityUrl = $.baseUrl + "/wxDrawActivity/activity/activity?activityId=" + $.activityId);
  try {
    concMaxRetryTimes = parseInt(concMaxRetryTimes) > 0 ? parseInt(concMaxRetryTimes) : 0;
  } catch {
    concMaxRetryTimes = 0;
  }
  try {
    const II1Ii1I = parseInt(concTimeout);
    concTimeout = II1Ii1I;
  } catch {
    concTimeout = 60000;
  }
  try {
    maxMissTimes = parseInt(maxMissTimes);
  } catch {
    maxMissTimes = 0;
  }
  $.drawIntervalTimes = $.activityMode === "cjhy" ? 1000 : 500;
  if (drawInterval) {
    try {
      const il11i1i = parseInt(drawInterval) * 1000;
      $.drawIntervalTimes = il11i1i;
    } catch {
      console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
  }
  switch ($.activityMode) {
    case "lzkj":
      $.shopFilter = lzkjShopFilter, $.pinFilter = lzkjPinFilter;
      break;
    case "cjhy":
      $.shopFilter = cjhyShopFilter, $.pinFilter = cjhyPinFilter;
      break;
  }
  notify.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  if (!concMode) for (let I11iIiIl = 0; I11iIiIl < cookiesArr.length; I11iIiIl++) {
    $.index = I11iIiIl + 1;
    cookie = cookiesArr[I11iIiIl];
    originCookie = cookiesArr[I11iIiIl];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    if ($.pinFilter.length > 0 && ($.pinFilter.includes($.UserName) || $.pinFilter.includes(encodeURIComponent($.UserName)))) {
      console.log("已设置跳过运行当前账号");
      continue;
    }
    $.UA = common.genUA($.UserName);
    $.UUID = common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    await Main();
    common.unsetCookie();
    if ($.runEnd) break;
    if ($.outFlag) {
      if (forbiddenQuit) {
        break;
      } else $.outFlag = false;
    }
  } else console.log("🔀 已开启并发模式，当前设置线程数为 " + concThreads), await concMain();
  isNotify && notify.getMessage() && (notify.appendContent("\n【活动地址】" + $.activityUrl), await notify.push());
})().catch(iIllii => $.logErr(iIllii)).finally(() => $.done());
async function Main() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.pinToken = "";
    $.LZ_AES_PIN = "";
    activityCookie = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    activityCookie = "";
    await getFirstLZCK($.activityUrl);
    await $.wait(500);
    if ($.runEnd) return;
    activityCookie && ($.skipRun = false);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) return;
    if (!$.venderId) {
      await sendRequest("getSimpleActInfoVo");
      if (!$.venderId) {
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        $.message.fix("未能获取店铺信息");
        $.runEnd = true;
        return;
      }
      if (!$.activityType) {
        console.log("getSimpleActInfoVo 未能获取活动类型");
        $.message.fix("未能获取活动类型");
        $.runEnd = true;
        return;
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
          return;
      }
      if ($.shopFilter.length > 0 && ($.shopFilter.includes($.venderId) || $.shopFilter.includes($.shopId))) {
        console.log("店铺 " + $.venderId + " 已被加入黑名单，结束运行");
        $.message.fix("店铺已被加入黑名单");
        $.runEnd = true;
        return;
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          $.drawApiPath = "/wxDrawActivity/start";
          break;
        case 26:
          $.drawApiPath = "/wxPointDrawActivity/start";
          break;
        case 124:
          $.drawApiPath = "/wxScratchActive/start";
          break;
        case 125:
          $.drawApiPath = "/wxPointBlindBox/start";
          break;
        case 128:
          $.drawApiPath = "/wxGashaponActive/start";
          break;
        case 129:
          $.drawApiPath = "/wxDollGrabbing/start";
          break;
      }
    }
    $.token = await getToken(originCookie, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if ($.activityMode === "cjhy" && wuxianDefense.isDefenseApi($.drawApiPath)) {
      await sendRequest("initPinToken");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
    } else {
      await sendRequest("getMyPing");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.secretPin) {
        console.log("未能获取用户鉴权信息！");
        $.message.fix("未能获取用户鉴权信息");
        return;
      }
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = $.secretPin;
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
    }
    switch ($.activityMode) {
      case "lzkj":
        await sendRequest("accessLogWithAD");
        break;
      case "cjhy":
        await sendRequest("accessLog");
        break;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    if (joinMember) {
      await sendRequest("getOpenCardStatus");
      if ($.outFlag || $.skipRun) return;
      if (!$.isMember) {
        const il1llIll = await common.joinShopMember($.venderId);
        il1llIll && (console.log("加入店铺会员成功"), $.isMember = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await sendRequest("activityContent");
    if (!$.activityContent) {
      console.log("未能获取到活动信息");
      $.message.fix("未能获取活动信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
    const lII1ii11 = $.activityContent?.["dayMaxDraw"];
    lII1ii11 && $.canDrawTimes > lII1ii11 && ($.canDrawTimes = lII1ii11);
    const l1l1IiIl = $.activityContent.content,
      illillii = $.activityContent?.["needFollow"] || false,
      IIII1ili = $.activityContent?.["hasFollow"] || false;
    if (!$.hasPrintActInfo) {
      $.hasPrintActInfo = true;
      let I11iI1Ii = "";
      for (let iiIIillI = 0; iiIIillI < l1l1IiIl.length; iiIIillI++) {
        const l1I1IIli = l1l1IiIl[iiIIillI].name,
          I1ill1li = l1l1IiIl[iiIIillI].type,
          IlIl1l1l = l1l1IiIl[iiIIillI].id;
        if (IlIl1l1l === 0 || I1ill1li === 0) {
          I11iI1Ii += "谢谢参与";
          break;
        } else I11iI1Ii += "" + l1I1IIli + (I1ill1li === 8 ? "[专享价]" : I1ill1li === 7 ? "[实物]" : ""), iiIIillI !== l1l1IiIl.length - 1 && (I11iI1Ii += "，");
      }
      await sendRequest("shopInfo");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log(($.shopName ? "店铺名称：#" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + I11iI1Ii + "\n");
      notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n【活动奖品】" + I11iI1Ii);
      let l1I1lli1 = $.activityContent?.["startTime"],
        iiililii = $.activityContent?.["endTime"];
      if ((!l1I1lli1 || !iiililii) && $.activityContent?.["rule"]) try {
        const l1l1l = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
          IIi111ii = $.activityContent.rule.match(l1l1l);
        IIi111ii && IIi111ii.length === 3 && (l1I1lli1 = new Date(IIi111ii[1]).getTime(), iiililii = new Date(IIi111ii[2]).getTime());
      } catch {}
      const lllIIili = Date.now();
      if (iiililii && lllIIili > iiililii) {
        const Ii1l11il = $.time("yyyy-MM-dd HH:mm", iiililii);
        console.log("活动已于 " + Ii1l11il + " 结束，下次早点来吧~");
        $.message.fix("活动已结束，结束时间：" + Ii1l11il);
        $.runEnd = true;
        return;
      }
      if (l1I1lli1 && lllIIili < l1I1lli1) {
        const ilI1I1ll = $.time("yyyy-MM-dd HH:mm", l1I1lli1);
        console.log("活动将在 " + ilI1I1ll + " 开始，晚点再来吧~");
        $.message.fix("活动尚未开始，开始时间：" + ilI1I1ll);
        $.runEnd = true;
        return;
      }
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        illillii && !IIII1ili && (await sendRequest("followShop"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await sendRequest("followShop");
        break;
    }
    if ($.needJoinMember || $.outFlag) return;
    if ($.canDrawTimes === 0) switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        await sendRequest("getGiveContent"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
        if ($.followTaskInfo) {
          const lIiiIIll = $.followTaskInfo?.["skuIdsList"],
            l1liIli = $.followTaskInfo?.["followTimes"],
            illllII = $.followTaskInfo?.["hasGetGiveTimes"],
            ii11Iiii = $.followTaskInfo?.["giveTimes"],
            llI1ilI = $.followTaskInfo?.["maxGiveTimes"],
            l1lIiIii = Math.trunc(lIiiIIll.length / l1liIli * ii11Iiii);
          if (illllII < llI1ilI && illllII < l1lIiIii) {
            let IlIIiiI = (llI1ilI - illllII) * l1liIli;
            for (let lIil1ilI = 0; lIil1ilI < lIiiIIll.length; lIil1ilI++) {
              $.skuId = lIiiIIll[lIil1ilI];
              await sendRequest("followGoods");
              $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
              if (lIil1ilI === IlIIiiI - 1) break;
            }
            $.activityContent = "";
            await sendRequest("activityContent");
            if (!$.activityContent) {
              console.log("未能获取到活动信息");
              $.message.fix("未能获取活动信息");
              return;
            }
            $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
            const i11IIi1I = $.activityContent?.["dayMaxDraw"] || 0;
            $.canDrawTimes > i11IIi1I && ($.canDrawTimes = i11IIi1I);
            $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
            console.log("");
          }
        }
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        break;
    }
    if ($.canDrawTimes <= 0) {
      switch ($.activityType) {
        case 13:
          console.log("今天没有抽奖机会了，明天再来吧~"), $.message.fix("今日已无抽奖机会");
          break;
        case 3:
        case 4:
        case 11:
        case 12:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          console.log("没有抽奖机会了~"), $.message.fix("抽奖机会不足");
          break;
      }
      return;
    }
    $.drawTimes = 0;
    $.drawStop = false;
    $.drawMissTimes = 0;
    for (let lilIi1I = 1; $.canDrawTimes--; lilIi1I++) {
      $.drawError = "";
      await sendRequest("start");
      if ($.drawError) {
        $.drawError.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.activityMode === "cjhy" && ($.drawError.indexOf("擦肩") > -1 || $.drawError.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if (maxMissTimes && $.drawMissTimes >= maxMissTimes) break;
        if ($.drawStop || $.needJoinMember || $.runEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        console.log("\n抽奖次数过多，剩余" + $.canDrawTimes + "次机会，下次再继续吧~");
        $.message.insert("抽奖次数过多下次再抽，剩余" + $.canDrawTimes + "次机会");
        break;
      }
      await $.wait($.drawIntervalTimes);
    }
  } catch (lI11llIi) {
    console.log("❌ 脚本运行遇到了错误\n" + lI11llIi);
  }
}
async function concMain() {
  activityCookie = "";
  await getFirstLZCK($.activityUrl);
  if ($.runEnd) return;
  activityCookie && ($.skipRun = false);
  if ($.skipRun) {
    console.log("获取 LZ_TOKEN 失败！");
    notify.appendContent("获取[LZ_TOKEN]失败\n");
    return;
  }
  await sendRequest("getSimpleActInfoVo");
  if (!$.venderId || !$.activityType) {
    console.log("getSimpleActInfoVo 未能获取店铺信息");
    notify.appendContent("未能获取店铺信息\n");
    return;
  }
  switch ($.activityType) {
    case 3:
    case 4:
    case 11:
    case 12:
    case 13:
    case 26:
    case 124:
    case 125:
    case 128:
    case 129:
      break;
    default:
      console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
      return;
  }
  if ($.shopFilter.length > 0 && ($.shopFilter.includes($.venderId) || $.shopFilter.includes($.shopId))) {
    console.log("店铺 " + $.venderId + " 已被加入黑名单，结束运行");
    return;
  }
  switch ($.activityType) {
    case 3:
    case 4:
    case 11:
    case 12:
    case 13:
      $.drawApiPath = "/wxDrawActivity/start";
      break;
    case 26:
      $.drawApiPath = "/wxPointDrawActivity/start";
      break;
    case 124:
      $.drawApiPath = "/wxScratchActive/start";
      break;
    case 125:
      $.drawApiPath = "/wxPointBlindBox/start";
      break;
    case 128:
      $.drawApiPath = "/wxGashaponActive/start";
      break;
    case 129:
      $.drawApiPath = "/wxDollGrabbing/start";
      break;
  }
  await sendRequest("shopInfo");
  console.log("");
  await common.concTask(concThreads, cookiesArr, async (I1iiIi, iIIIlil1) => {
    const lIlIliIi = decodeURIComponent(common.getCookieValue(I1iiIi, "pt_pin")),
      II1ii11i = notify.create(iIIIlil1, lIlIliIi);
    if ($.pinFilter.length > 0 && ($.pinFilter.includes(lIlIliIi) || $.pinFilter.includes(encodeURIComponent(lIlIliIi)))) {
      II1ii11i.fix("已设置跳过运行当前账号");
      console.log(II1ii11i.getInlineContent());
      return;
    }
    const iI1iliiI = common.genUA(lIlIliIi);
    let IIl1i11I = "",
      li1ili = "",
      IIIi111I = "",
      l1i1iIiI = "",
      iiIl1i1l = "",
      ll11l1Ii = "",
      Ii1llI1i = "",
      I1I11Ii1 = false,
      IiilIIiI = false,
      iIiIlI1l = false;
    await I11IliIi();
    if (!ll11l1Ii) {
      II1ii11i.fix("获取[LZ_COOKIE]失败");
      console.log(II1ii11i.getInlineContent());
      return;
    }
    IIl1i11I = await getToken(I1iiIi, $.baseUrl);
    if (!IIl1i11I) {
      II1ii11i.fix("获取[Token]失败");
      console.log(II1ii11i.getInlineContent());
      return;
    }
    if ($.activityMode === "cjhy" && wuxianDefense.isDefenseApi($.drawApiPath)) {
      await I1Iii1il("initPinToken");
      if (!IIIi111I) {
        II1ii11i.fix("获取[pinToken]失败");
        console.log(II1ii11i.getInlineContent());
        return;
      }
    } else await I1Iii1il("getMyPing");
    if (!li1ili) {
      II1ii11i.fix("未能获取用户鉴权信息");
      console.log(II1ii11i.getInlineContent());
      return;
    }
    switch ($.activityMode) {
      case "lzkj":
        Ii1llI1i = li1ili;
        break;
      case "cjhy":
        Ii1llI1i = encodeURIComponent(li1ili);
        break;
    }
    switch ($.activityMode) {
      case "lzkj":
        await I1Iii1il("accessLogWithAD");
        break;
      case "cjhy":
        await I1Iii1il("accessLog");
        break;
    }
    let l1IIi1I = true;
    if (joinMember) {
      await I1Iii1il("getOpenCardStatus");
      if (IiilIIiI) {
        console.log(II1ii11i.getInlineContent());
        return;
      }
      if (!l1IIi1I) {
        const iiil1liI = await common.joinShopMember($.venderId, I1iiIi);
        iiil1liI && (II1ii11i.insert("加入店铺会员成功"), l1IIi1I = true);
      }
    }
    let lIIIlIl = "",
      i1l1llI = 0;
    await I1Iii1il("activityContent");
    if (iIiIlI1l) return console.log(II1ii11i.getInlineContent()), {
      "runEnd": true
    };
    if (!lIIIlIl) {
      II1ii11i.fix("未能获取活动信息");
      console.log(II1ii11i.getInlineContent());
      return;
    }
    i1l1llI = lIIIlIl?.["canDrawTimes"] || 0;
    const ill1il1l = lIIIlIl?.["dayMaxDraw"];
    ill1il1l && i1l1llI > ill1il1l && (i1l1llI = ill1il1l);
    const IilII1ii = lIIIlIl.content,
      liI11li1 = lIIIlIl?.["needFollow"] || false,
      lIil1i1I = lIIIlIl?.["hasFollow"] || false;
    if (!$.hasPrintActInfo) {
      $.hasPrintActInfo = true;
      let IliII1Il = "";
      for (let l1iiII11 = 0; l1iiII11 < IilII1ii.length; l1iiII11++) {
        const i11l11i = IilII1ii[l1iiII11].name,
          iI1ill1l = IilII1ii[l1iiII11].type,
          iI1l1i1i = IilII1ii[l1iiII11].id;
        if (iI1l1i1i === 0 || iI1ill1l === 0) {
          IliII1Il += "谢谢参与";
          break;
        } else IliII1Il += "" + i11l11i + (iI1ill1l === 8 ? "[专享价]" : iI1ill1l === 7 ? "[实物]" : ""), l1iiII11 !== IilII1ii.length - 1 && (IliII1Il += "，");
      }
      console.log("\n" + ($.shopName ? "店铺名称：#" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + IliII1Il + "\n");
      notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n【活动奖品】" + IliII1Il);
      let IiiiI1II = lIIIlIl?.["startTime"],
        illi1II = lIIIlIl?.["endTime"];
      if ((!IiiiI1II || !illi1II) && lIIIlIl?.["rule"]) try {
        const i1IiIIl1 = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
          IiIIi11i = lIIIlIl.rule.match(i1IiIIl1);
        IiIIi11i && IiIIi11i.length === 3 && (IiiiI1II = new Date(IiIIi11i[1]).getTime(), illi1II = new Date(IiIIi11i[2]).getTime());
      } catch {}
      const li1liiII = Date.now();
      if (illi1II && li1liiII > illi1II) {
        const ii111lI1 = $.time("yyyy-MM-dd HH:mm", illi1II);
        return console.log("活动已于 " + ii111lI1 + " 结束，下次早点来吧~"), II1ii11i.fix("活动已结束，结束时间：" + ii111lI1), {
          "runEnd": true
        };
      }
      if (IiiiI1II && li1liiII < IiiiI1II) {
        const ll1iIl = $.time("yyyy-MM-dd HH:mm", IiiiI1II);
        return console.log("活动将在 " + ll1iIl + " 开始，晚点再来吧~"), II1ii11i.fix("活动尚未开始，开始时间：" + ll1iIl), {
          "runEnd": true
        };
      }
      if ($.pinFilter.length > 0 && ($.pinFilter.includes(lIlIliIi) || $.pinFilter.includes(encodeURIComponent(lIlIliIi)))) {
        II1ii11i.fix("已设置跳过运行当前账号");
        console.log(II1ii11i.getInlineContent());
        return;
      }
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        liI11li1 && !lIil1i1I && (await I1Iii1il("followShop"));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await I1Iii1il("followShop");
        break;
    }
    if (I1I11Ii1 || IiilIIiI) {
      console.log(II1ii11i.getInlineContent());
      return;
    }
    let Il1111I1 = "";
    if (i1l1llI === 0) {
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          let il1lIll1 = "";
          await I1Iii1il("getGiveContent");
          if (il1lIll1) {
            const iil1lIiI = il1lIll1?.["skuIdsList"],
              iIil1Ill = il1lIll1?.["followTimes"],
              I1iIIiI1 = il1lIll1?.["hasGetGiveTimes"],
              iil1li = il1lIll1?.["giveTimes"],
              liIIIII = il1lIll1?.["maxGiveTimes"],
              i1iii1I1 = Math.trunc(iil1lIiI.length / iIil1Ill * iil1li);
            if (I1iIIiI1 < liIIIII && I1iIIiI1 < i1iii1I1) {
              let iIlIIli1 = (liIIIII - I1iIIiI1) * iIil1Ill;
              for (let i1lII1I1 = 0; i1lII1I1 < iil1lIiI.length; i1lII1I1++) {
                Il1111I1 = iil1lIiI[i1lII1I1];
                await I1Iii1il("followGoods");
                if (i1lII1I1 === iIlIIli1 - 1) break;
              }
              lIIIlIl = "";
              await I1Iii1il("activityContent");
              i1l1llI = lIIIlIl?.["canDrawTimes"] || 0;
              const lIiiil = lIIIlIl?.["dayMaxDraw"] || 0;
              i1l1llI > lIiiil && (i1l1llI = lIiiil);
            }
          }
          break;
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
      }
    }
    if (i1l1llI <= 0) {
      switch ($.activityType) {
        case 13:
          II1ii11i.fix("今日已无抽奖机会");
          break;
        case 3:
        case 4:
        case 11:
        case 12:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          II1ii11i.fix("抽奖机会不足");
          break;
      }
      console.log(II1ii11i.getInlineContent());
      return;
    }
    let l11lil = 0,
      lllIII11 = 0,
      IlI1ilII = false,
      IIl1lli1 = "";
    for (let Ill1i1 = 1; i1l1llI--; Ill1i1++) {
      IIl1lli1 = "";
      await I1Iii1il("start");
      if (IIl1lli1) {
        IIl1lli1.indexOf("火爆") > -1 && (i1l1llI += 1);
        $.activityMode === "cjhy" && (IIl1lli1.indexOf("擦肩") > -1 || IIl1lli1.indexOf("缓存") > -1) && (i1l1llI += 1);
        if (maxMissTimes && lllIII11 >= maxMissTimes) break;
        if (IlI1ilII || I1I11Ii1) break;
        if (iIiIlI1l) {
          return console.log(II1ii11i.getInlineContent()), {
            "runEnd": true
          };
        }
      }
      if (i1l1llI <= 0) break;
      if (l11lil >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        II1ii11i.insert("抽奖次数过多下次再抽，剩余" + i1l1llI + "次机会");
        break;
      }
    }
    console.log(II1ii11i.getInlineContent());
    async function iIiII1Il(ill11lii, IiiIi1I1) {
      switch (ill11lii) {
        case "getMyPing":
        case "initPinToken":
          if (IiiIi1I1.result === true && IiiIi1I1.data) li1ili = IiiIi1I1.data?.["secretPin"];else {
            if (IiiIi1I1.errorMessage) {
              II1ii11i.fix(ill11lii + " " + IiiIi1I1.errorMessage);
            }
          }
          break;
        case "getOpenCardStatus":
          if (IiiIi1I1.result === true || IiiIi1I1.isOk) {
            if (IiiIi1I1.data) {
              if (IiiIi1I1.data.hasOwnProperty("openCard")) l1IIi1I = IiiIi1I1.data.openCard;else IiiIi1I1.data.hasOwnProperty("openedCard") && (l1IIi1I = IiiIi1I1.data.openedCard);
              if (typeof l1IIi1I === "number") l1IIi1I = l1IIi1I === 1;else typeof l1IIi1I === "undefined" && (l1IIi1I = false);
            } else IiiIi1I1.hasOwnProperty("openCard") ? l1IIi1I = IiiIi1I1.openCard : l1IIi1I = true;
          } else IiiIi1I1.errorMessage ? IiiIi1I1.errorMessage.includes("擦肩") && !IiiIi1I1?.["data"] ? (IiilIIiI = true, II1ii11i.fix("账号已黑")) : II1ii11i.fix(IiiIi1I1.errorMessage) : (l1IIi1I = false, console.log("❓" + ill11lii + " " + JSON.stringify(IiiIi1I1)));
          break;
        case "activityContent":
          if (IiiIi1I1.result === true && IiiIi1I1.data) lIIIlIl = IiiIi1I1.data;else {
            if (IiiIi1I1.errorMessage) {
              for (let IIIIilI of ["未开始", "结束", "不存在", "不在"]) {
                if (IiiIi1I1.errorMessage.includes(IIIIilI)) {
                  II1ii11i.fix(IiiIi1I1.errorMessage);
                  iIiIlI1l = true;
                  break;
                }
              }
              II1ii11i.fix(IiiIi1I1.errorMessage);
            } else console.log("❓" + ill11lii + " " + JSON.stringify(IiiIi1I1));
          }
          break;
        case "followShop":
          if (IiiIi1I1.result === true) {} else IiiIi1I1.errorMessage ? (["会员", "开卡"].some(iliIilII => IiiIi1I1.errorMessage.includes(iliIilII)) && (I1I11Ii1 = true, II1ii11i.fix("活动仅限店铺会员参与")), IiilIIiI = true) : console.log("❓" + ill11lii + " " + JSON.stringify(IiiIi1I1));
          break;
        case "getGiveContent":
          if (IiiIi1I1.result === true && IiiIi1I1.data) followTaskInfo = IiiIi1I1.data?.["follow"];else {
            if (IiiIi1I1.errorMessage) {} else console.log("❓" + ill11lii + " " + JSON.stringify(IiiIi1I1));
          }
          break;
        case "followGoods":
          if (IiiIi1I1.result === true) {} else {
            if (IiiIi1I1.errorMessage) {} else console.log("❓" + ill11lii + " " + JSON.stringify(IiiIi1I1));
          }
          break;
        case "start":
          if (IiiIi1I1.result === true && IiiIi1I1.data) {
            l11lil += 1;
            i1l1llI = IiiIi1I1.data.canDrawTimes;
            const lI1iIII1 = IiiIi1I1.data.drawInfo;
            if (lI1iIII1) switch (lI1iIII1.type) {
              case 4:
                switch ($.activityType) {
                  case 3:
                  case 4:
                  case 11:
                  case 12:
                  case 13:
                    i1l1llI += 1;
                    break;
                  case 26:
                  case 124:
                  case 125:
                  case 128:
                  case 129:
                    II1ii11i.insert("空气💨");
                    break;
                }
                break;
              case 6:
                II1ii11i.insert(lI1iIII1.name + "🐶");
                break;
              case 7:
                const ii11I1ll = IiiIi1I1.data.addressId,
                  iI1111l1 = lI1iIII1.name;
                let iIilI1I1 = "🎉 恭喜获得实物，奖品名称：" + iI1111l1 + "，参考价值：" + lI1iIII1.priceInfo + "(元)";
                if (lI1iIII1.showImage) iIilI1I1 += "\n预览图片：" + lI1iIII1.showImage;
                console.log(iIilI1I1);
                const ii11lIIl = {
                    "baseUrl": $.baseUrl,
                    "cookie": ll11l1Ii,
                    "ua": iI1iliiI,
                    "activityId": $.activityId,
                    "activityType": $.activityType,
                    "venderId": [$.venderId, $.shopId],
                    "secretPin": li1ili,
                    "prizeName": iI1111l1,
                    "generateId": ii11I1ll
                  },
                  Il1I1iil = await wuxian_savePrize(ii11lIIl);
                !isNotify && Il1I1iil && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + iIIIlil1 + "】\n抽中实物 " + iI1111l1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                II1ii11i.insert(iI1111l1 + "(" + (Il1I1iil ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 8:
                II1ii11i.insert("专享价🗑️");
                break;
              case 9:
                II1ii11i.insert(lI1iIII1.name + "🎟️");
                break;
              case 13:
              case 14:
              case 15:
                !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + iIIIlil1 + "】\n抽中 " + lI1iIII1.name + "\n\n" + $.activityUrl));
                II1ii11i.insert(lI1iIII1.name + "🎁");
                break;
              case 16:
                II1ii11i.insert(lI1iIII1.priceInfo + "红包🧧");
                break;
              default:
                lI1iIII1.name.includes("券") ? II1ii11i.insert("优惠券🗑️") : II1ii11i.insert(lI1iIII1.name);
                break;
            } else lllIII11 += 1, II1ii11i.insert("空气💨");
          } else IiiIi1I1.errorMessage ? (IIl1lli1 = IiiIi1I1.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(Iil1Iil1 => IIl1lli1.includes(Iil1Iil1)) && (IlI1ilII = true, II1ii11i.insert(IIl1lli1)), ["未开始", "结束", "不存在", "不在"].some(l1ilIIi => IIl1lli1.includes(l1ilIIi)) && (iIiIlI1l = true, II1ii11i.fix(IIl1lli1)), ["会员", "开卡"].some(li1iIlli => IIl1lli1.includes(li1iIlli)) && (I1I11Ii1 = true, II1ii11i.fix(IIl1lli1)), !["火爆", "擦肩", "缓存", "数据忙"].some(ilII1iIl => IIl1lli1.includes(ilII1iIl)) && !IlI1ilII && !I1I11Ii1 && II1ii11i.insert(IIl1lli1 || "")) : console.log("❓" + ill11lii + " " + JSON.stringify(IiiIi1I1));
          break;
      }
    }
    async function I1Iii1il(I1iIi1lI) {
      let IIi1iiI1 = $.baseUrl,
        IIIIiiIi = null,
        iiIIl111 = null,
        ilIl111i = null,
        l1Iiilli = "POST";
      switch (I1iIi1lI) {
        case "getMyPing":
          IIi1iiI1 += "/customer/getMyPing", IIIIiiIi = {
            "token": IIl1i11I,
            "fromType": "APP",
            "userId": $.venderId
          };
          break;
        case "initPinToken":
          l1Iiilli = "GET", IIi1iiI1 += "/customer/initPinToken", ilIl111i = {
            "status": "1",
            "activityId": $.activityId,
            "jdToken": IIl1i11I,
            "source": "01",
            "venderId": $.venderId,
            "uuid": common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
            "clientTime": Date.now()
          };
          break;
        case "accessLog":
          IIi1iiI1 += "/common/accessLog", IIIIiiIi = {
            "venderId": $.venderId,
            "code": $.activityType,
            "pin": Ii1llI1i,
            "activityId": $.activityId,
            "pageUrl": $.activityUrl,
            "subType": "app",
            "adSource": ""
          };
          break;
        case "accessLogWithAD":
          IIi1iiI1 += "/common/accessLogWithAD", IIIIiiIi = {
            "venderId": $.venderId,
            "code": $.activityType,
            "pin": Ii1llI1i,
            "activityId": $.activityId,
            "pageUrl": $.activityUrl,
            "subType": "app"
          };
          break;
        case "getOpenCardStatus":
          switch ($.activityType) {
            case 3:
            case 4:
            case 11:
            case 12:
            case 13:
              switch ($.activityMode) {
                case "lzkj":
                  IIi1iiI1 += "/wxCommonInfo/getActMemberInfo", IIIIiiIi = {
                    "activityId": $.activityId,
                    "venderId": $.venderId,
                    "pin": Ii1llI1i
                  };
                  break;
                case "cjhy":
                  IIi1iiI1 += "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", IIIIiiIi = {
                    "venderId": $.venderId,
                    "buyerPin": Ii1llI1i,
                    "activityType": $.activityType
                  };
                  break;
              }
              break;
            case 26:
              switch ($.activityMode) {
                case "lzkj":
                  IIi1iiI1 += "/crmCard/common/coupon/getOpenCardStatus", IIIIiiIi = {
                    "venderId": $.venderId,
                    "pin": Ii1llI1i
                  };
                  break;
                case "cjhy":
                  IIi1iiI1 += "/common/joinConfig/check", IIIIiiIi = {
                    "venderId": $.venderId,
                    "pin": Ii1llI1i,
                    "activityType": $.activityType,
                    "activityId": $.activityId
                  };
                  break;
              }
              break;
            case 124:
            case 125:
            case 128:
            case 129:
              IIi1iiI1 += "/common/joinConfig/check", IIIIiiIi = {
                "venderId": $.venderId,
                "pin": Ii1llI1i,
                "activityType": $.activityType,
                "activityId": $.activityId
              };
              break;
          }
          break;
        case "activityContent":
          switch ($.activityType) {
            case 3:
            case 4:
            case 11:
            case 12:
            case 13:
              IIi1iiI1 += "/wxDrawActivity/activityContent";
              break;
            case 26:
              IIi1iiI1 += "/wxPointDrawActivity/activityContent";
              break;
            case 124:
              IIi1iiI1 += "/wxScratchActive/activityContent";
              break;
            case 125:
              IIi1iiI1 += "/wxPointBlindBox/activityContent";
              break;
            case 128:
              IIi1iiI1 += "/wxGashaponActive/activityContent";
              break;
            case 129:
              IIi1iiI1 += "/wxDollGrabbing/activityContent";
              break;
          }
          IIIIiiIi = {
            "activityId": $.activityId,
            "pin": Ii1llI1i
          };
          break;
        case "shopInfo":
          IIi1iiI1 += "/wxDrawActivity/shopInfo", IIIIiiIi = {
            "activityId": $.activityId
          };
          break;
        case "followShop":
          switch ($.activityMode) {
            case "lzkj":
              IIi1iiI1 += "/wxActionCommon/followShop", IIIIiiIi = {
                "userId": $.venderId,
                "buyerNick": Ii1llI1i,
                "activityId": $.activityId,
                "activityType": $.activityType
              };
              break;
            case "cjhy":
              IIi1iiI1 += "/wxActionCommon/newFollowShop", IIIIiiIi = {
                "venderId": $.venderId,
                "buyerPin": Ii1llI1i,
                "activityId": $.activityId,
                "activityType": $.activityType
              };
              break;
          }
          break;
        case "getGiveContent":
          IIi1iiI1 += "/wxDrawActivity/getGiveContent", IIIIiiIi = {
            "pin": Ii1llI1i,
            "activityId": $.activityId
          };
          break;
        case "followGoods":
          IIi1iiI1 += "/wxDrawActivity/follow", IIIIiiIi = {
            "activityId": $.activityId,
            "pin": Ii1llI1i,
            "skuId": Il1111I1
          };
          break;
        case "start":
          IIi1iiI1 += $.drawApiPath, IIIIiiIi = {
            "activityId": $.activityId,
            "pin": Ii1llI1i
          };
          break;
      }
      const lIl1li1I = $.activityMode === "cjhy" && wuxianDefense.isDefenseApi(IIi1iiI1.replace($.baseUrl, "").split("?")[0]);
      lIl1li1I && (IIIIiiIi?.["pin"] && (IIIIiiIi.pin = encodeURIComponent(li1ili)), iiIIl111 = {
        "ecyText": wuxianDefense.encrypt({
          "actId": $.activityId,
          ...IIIIiiIi
        }, IIIi111I, l1i1iIiI)
      });
      const Il1lilII = {
        "url": IIi1iiI1,
        "method": l1Iiilli,
        "headers": {
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
          "Connection": "keep-alive",
          "Content-Type": lIl1li1I ? "application/json" : "application/x-www-form-urlencoded",
          "Cookie": ll11l1Ii.trim(),
          "Host": $.hostname,
          "Origin": $.origin,
          "Referer": $.activityUrl,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": iI1iliiI,
          "X-Requested-With": "XMLHttpRequest"
        },
        "params": ilIl111i,
        "data": lIl1li1I ? iiIIl111 : IIIIiiIi,
        "timeout": 60000
      };
      l1Iiilli === "GET" && (delete Il1lilII.data, delete Il1lilII.headers["Content-Type"]);
      const ilIliIl = 1 + concMaxRetryTimes;
      let lIill11i = 0,
        Il1i1IiI = null;
      while (lIill11i < ilIliIl) {
        const IlII11Il = await common.request(Il1lilII);
        if (!IlII11Il.success) {
          Il1i1IiI = I1iIi1lI + " 请求失败 ➜ " + IlII11Il.error;
          lIill11i++;
          IlII11Il.status && IlII11Il.status === 500 && lIl1li1I && (Il1lilII.data = {
            "ecyText": wuxianDefense.encrypt({
              "actId": $.activityId,
              ...IIIIiiIi
            }, IIIi111I, l1i1iIiI)
          });
          continue;
        }
        if (["accessLog", "accessLogWithAD"].includes(I1iIi1lI)) break;
        if (!IlII11Il.data) {
          Il1i1IiI = I1iIi1lI + " 请求失败 ➜ 无响应数据";
          lIill11i++;
          lIl1li1I && (Il1lilII.data = {
            "ecyText": wuxianDefense.encrypt({
              "actId": $.activityId,
              ...IIIIiiIi
            }, IIIi111I, l1i1iIiI)
          });
          continue;
        }
        const l1lIiiII = common.getResponseCookie(IlII11Il, ll11l1Ii);
        switch (I1iIi1lI) {
          case "getMyPing":
            iiIl1i1l = common.getCookieValue(l1lIiiII, "LZ_AES_PIN");
            break;
          case "initPinToken":
            iiIl1i1l = common.getCookieValue(l1lIiiII, "LZ_AES_PIN"), IIIi111I = common.getCookieValue(l1lIiiII, "pToken"), l1i1iIiI = common.getCookieValue(l1lIiiII, "te");
            break;
        }
        ["getMyPing", "followGoods", "start"].includes(I1iIi1lI) && (ll11l1Ii = l1lIiiII);
        !common.getCookieValue(ll11l1Ii, "LZ_AES_PIN") && iiIl1i1l && (ll11l1Ii += "LZ_AES_PIN=" + iiIl1i1l + "; ");
        !common.getCookieValue(ll11l1Ii, "pToken") && IIIi111I && (ll11l1Ii += "pToken=" + IIIi111I + "; ");
        !common.getCookieValue(ll11l1Ii, "AUTH_C_USER") && li1ili && (ll11l1Ii += "AUTH_C_USER=" + li1ili + "; ");
        !common.getCookieValue(ll11l1Ii, "te") && l1i1iIiI && (ll11l1Ii += "te=" + l1i1iIiI + "; ");
        iIiII1Il(I1iIi1lI, IlII11Il.data);
        break;
      }
      if (lIill11i >= ilIliIl) {
        !["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(I1iIi1lI) && II1ii11i.fix(Il1i1IiI);
      }
    }
    async function I11IliIi() {
      ll11l1Ii = "";
      const i1iil111 = {
          "url": $.activityUrl,
          "method": "GET",
          "headers": {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "cross-site",
            "Referer": $.activityUrl,
            "User-Agent": $.UA
          },
          "timeout": concTimeout
        },
        iliI111l = 1;
      let IIIiIlil = 0;
      while (IIIiIlil < iliI111l) {
        const I1i1Iili = await common.request(i1iil111);
        if (!I1i1Iili.success) {
          IIIiIlil++;
          continue;
        }
        if (!I1i1Iili.data) {
          IIIiIlil++;
          continue;
        }
        ll11l1Ii = common.getResponseCookie(I1i1Iili, ll11l1Ii);
        break;
      }
    }
  });
  console.log("\n并发运行完毕");
}
async function handleResponse(l1iiIl, Illl11I) {
  try {
    switch (l1iiIl) {
      case "getMyPing":
        if (Illl11I.result === true && Illl11I.data) $.secretPin = Illl11I.data?.["secretPin"], $.nickname = Illl11I.data?.["nickname"];else Illl11I.errorMessage ? (console.log(l1iiIl + " " + Illl11I.errorMessage), $.message.fix(Illl11I.errorMessage)) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "initPinToken":
        if (Illl11I.result === true && Illl11I.data) $.secretPin = Illl11I.data?.["secretPin"], $.nickname = Illl11I.data?.["nickname"];else Illl11I.errorMessage ? (console.log(l1iiIl + " " + Illl11I.errorMessage), $.message.fix(Illl11I.errorMessage)) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "getSimpleActInfoVo":
        if (Illl11I.result === true && Illl11I.data) $.venderId = Illl11I.data?.["venderId"], $.shopId = Illl11I.data?.["shopId"], $.activityType = Illl11I.data?.["activityType"];else Illl11I.errorMessage ? console.log(l1iiIl + " " + Illl11I.errorMessage) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "getOpenCardStatus":
        if (Illl11I.result === true || Illl11I.isOk) {
          if (Illl11I.data) {
            if (Illl11I.data.hasOwnProperty("openCard")) $.isMember = Illl11I.data.openCard;else Illl11I.data.hasOwnProperty("openedCard") && ($.isMember = Illl11I.data.openedCard);
            if (typeof $.isMember === "number") $.isMember = $.isMember === 1;else typeof $.isMember === "undefined" && ($.isMember = false);
          } else Illl11I.hasOwnProperty("openCard") ? $.isMember = Illl11I.openCard : $.isMember = true;
        } else Illl11I.errorMessage ? Illl11I.errorMessage.includes("擦肩") && !Illl11I?.["data"] ? ($.skipRun = true, $.message.fix("账号已黑"), console.log("账号已黑，下次别跑了~")) : console.log(l1iiIl + " " + Illl11I.errorMessage) : ($.isMember = false, console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I)));
        break;
      case "activityContent":
        if (Illl11I.result === true && Illl11I.data) {
          $.activityContent = Illl11I.data;
        } else {
          if (Illl11I.errorMessage) {
            for (let i11I1l11 of ["未开始", "结束", "不存在", "不在"]) {
              if (Illl11I.errorMessage.includes(i11I1l11)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(l1iiIl + " " + Illl11I.errorMessage);
            $.message.fix(Illl11I.errorMessage);
          } else console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        }
        break;
      case "shopInfo":
        if (Illl11I.result === true && Illl11I.data) $.shopName = Illl11I?.["data"]?.["shopName"];else Illl11I.errorMessage ? console.log("" + (Illl11I.errorMessage || "")) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "followShop":
        if (Illl11I.result === true) {} else Illl11I.errorMessage ? (["会员", "开卡"].some(l1IIIII => Illl11I.errorMessage.includes(l1IIIII)) && ($.needJoinMember = true, $.message.fix("活动仅限店铺会员参与")), console.log("" + (Illl11I.errorMessage || ""))) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "getGiveContent":
        if (Illl11I.result === true && Illl11I.data) $.followTaskInfo = Illl11I.data?.["follow"];else Illl11I.errorMessage ? console.log("" + (Illl11I.errorMessage || "")) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "followGoods":
        if (Illl11I.result === true) console.log("做 \"关注商品\" 任务 >> 任务完成");else Illl11I.errorMessage ? console.log("做 \"关注商品\" 任务 >> 任务失败（" + Illl11I.errorMessage + "）") : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
      case "start":
        if (Illl11I.result === true && Illl11I.data) {
          $.drawTimes += 1;
          $.canDrawTimes = Illl11I.data.canDrawTimes;
          const liIiI1II = Illl11I.data.drawInfo;
          if (liIiI1II) switch (liIiI1II.type) {
            case 4:
              switch ($.activityType) {
                case 3:
                case 4:
                case 11:
                case 12:
                case 13:
                  console.log("🔁 再来一次"), $.canDrawTimes += 1;
                  break;
                case 26:
                case 124:
                case 125:
                case 128:
                case 129:
                  console.log("💨 空气"), $.message.insert("空气💨");
                  break;
              }
              break;
            case 6:
              console.log("🎉 " + liIiI1II.name + " 🐶"), $.message.insert(liIiI1II.name + "🐶");
              break;
            case 7:
              const IIlll11I = Illl11I.data.addressId,
                lIIilIli = liIiI1II.name;
              console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + lIIilIli), console.log("参考价值：" + liIiI1II.priceInfo + "（元）");
              if (liIiI1II.showImage) console.log("预览图片：" + liIiI1II.showImage);
              const lllIiIIl = {
                  "baseUrl": $.baseUrl,
                  "cookie": activityCookie,
                  "ua": $.UA,
                  "activityId": $.activityId,
                  "activityType": $.activityType,
                  "venderId": [$.venderId, $.shopId],
                  "secretPin": $.secretPin,
                  "prizeName": lIIilIli,
                  "generateId": IIlll11I
                },
                llI1111I = await wuxian_savePrize(lllIiIIl);
              !isNotify && llI1111I && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + lIIilIli + "，已成功自动登记收货地址\n\n" + $.activityUrl));
              $.message.insert(lIIilIli + "(" + (llI1111I ? "已填地址" : "未填地址") + ")🎁");
              break;
            case 8:
              console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
              break;
            case 9:
              console.log("🗑️ " + liIiI1II.name + " 🎟️"), $.message.insert(liIiI1II.name + "🎟️");
              break;
            case 13:
            case 14:
            case 15:
              console.log("🎉 恭喜获得" + liIiI1II.name + " 🎁");
              !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + liIiI1II.name + "\n\n" + $.activityUrl));
              $.message.insert(liIiI1II.name + "🎁");
              break;
            case 16:
              console.log("🎉 " + liIiI1II.priceInfo + " 🧧"), $.message.insert(liIiI1II.priceInfo + "红包🧧");
              break;
            default:
              liIiI1II.name.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + liIiI1II.name), $.message.insert("" + liIiI1II.name));
              break;
          } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
        } else Illl11I.errorMessage ? ($.drawError = Illl11I.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(iiIiiI1I => $.drawError.includes(iiIiiI1I)) && ($.drawStop = true, console.log($.drawError), $.message.insert($.drawError)), ["未开始", "结束", "不存在", "不在"].some(lIl11lI => $.drawError.includes(lIl11lI)) && ($.runEnd = true, $.message.fix($.drawError)), ["会员", "开卡"].some(iiIl1lI => $.drawError.includes(iiIl1lI)) && ($.needJoinMember = true, console.log($.drawError), $.message.fix($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(Iiili => $.drawError.includes(Iiili)) && !$.drawStop && !$.needJoinMember && console.log($.drawError || "")) : console.log("❓" + l1iiIl + " " + JSON.stringify(Illl11I));
        break;
    }
  } catch (l11iiII1) {
    console.log("❌ 未能正确处理 " + l1iiIl + " 请求响应 " + (l11iiII1.message || l11iiII1));
  }
}
async function sendRequest(Il1IiIl) {
  if ($.runEnd || $.outFlag) return;
  let iilIII11 = $.baseUrl,
    I1Il1lIl = null,
    Il1I1ili = null,
    lii11Iii = null,
    ili1IllI = "POST";
  switch (Il1IiIl) {
    case "getMyPing":
      iilIII11 += "/customer/getMyPing", I1Il1lIl = {
        "token": $.token,
        "fromType": "APP",
        "userId": $.venderId
      };
      break;
    case "getSimpleActInfoVo":
      iilIII11 += "/customer/getSimpleActInfoVo", I1Il1lIl = {
        "activityId": $.activityId
      };
      break;
    case "initPinToken":
      ili1IllI = "GET", iilIII11 += "/customer/initPinToken", lii11Iii = {
        "status": "1",
        "activityId": $.activityId,
        "jdToken": $.token,
        "source": "01",
        "venderId": $.venderId,
        "uuid": $.UUID,
        "clientTime": Date.now()
      };
      break;
    case "accessLog":
      iilIII11 += "/common/accessLog", I1Il1lIl = {
        "venderId": $.venderId,
        "code": $.activityType,
        "pin": $.formatPin,
        "activityId": $.activityId,
        "pageUrl": $.activityUrl,
        "subType": "app",
        "adSource": ""
      };
      break;
    case "accessLogWithAD":
      iilIII11 += "/common/accessLogWithAD", I1Il1lIl = {
        "venderId": $.venderId,
        "code": $.activityType,
        "pin": $.formatPin,
        "activityId": $.activityId,
        "pageUrl": $.activityUrl,
        "subType": "app"
      };
      break;
    case "getOpenCardStatus":
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          switch ($.activityMode) {
            case "lzkj":
              iilIII11 += "/wxCommonInfo/getActMemberInfo", I1Il1lIl = {
                "activityId": $.activityId,
                "venderId": $.venderId,
                "pin": $.formatPin
              };
              break;
            case "cjhy":
              iilIII11 += "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", I1Il1lIl = {
                "venderId": $.venderId,
                "buyerPin": $.formatPin,
                "activityType": $.activityType
              };
              break;
          }
          break;
        case 26:
          switch ($.activityMode) {
            case "lzkj":
              iilIII11 += "/crmCard/common/coupon/getOpenCardStatus", I1Il1lIl = {
                "venderId": $.venderId,
                "pin": $.formatPin
              };
              break;
            case "cjhy":
              iilIII11 += "/common/joinConfig/check", I1Il1lIl = {
                "venderId": $.venderId,
                "pin": $.formatPin,
                "activityType": $.activityType,
                "activityId": $.activityId
              };
              break;
          }
          break;
        case 124:
        case 125:
        case 128:
        case 129:
          iilIII11 += "/common/joinConfig/check", I1Il1lIl = {
            "venderId": $.venderId,
            "pin": $.formatPin,
            "activityType": $.activityType,
            "activityId": $.activityId
          };
          break;
      }
      break;
    case "activityContent":
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          iilIII11 += "/wxDrawActivity/activityContent";
          break;
        case 26:
          iilIII11 += "/wxPointDrawActivity/activityContent";
          break;
        case 124:
          iilIII11 += "/wxScratchActive/activityContent";
          break;
        case 125:
          iilIII11 += "/wxPointBlindBox/activityContent";
          break;
        case 128:
          iilIII11 += "/wxGashaponActive/activityContent";
          break;
        case 129:
          iilIII11 += "/wxDollGrabbing/activityContent";
          break;
      }
      I1Il1lIl = {
        "activityId": $.activityId,
        "pin": $.formatPin
      };
      break;
    case "shopInfo":
      iilIII11 += "/wxDrawActivity/shopInfo", I1Il1lIl = {
        "activityId": $.activityId
      };
      break;
    case "followShop":
      switch ($.activityMode) {
        case "lzkj":
          iilIII11 += "/wxActionCommon/followShop", I1Il1lIl = {
            "userId": $.venderId,
            "buyerNick": $.formatPin,
            "activityId": $.activityId,
            "activityType": $.activityType
          };
          break;
        case "cjhy":
          iilIII11 += "/wxActionCommon/newFollowShop", I1Il1lIl = {
            "venderId": $.venderId,
            "buyerPin": $.formatPin,
            "activityId": $.activityId,
            "activityType": $.activityType
          };
          break;
      }
      break;
    case "getGiveContent":
      iilIII11 += "/wxDrawActivity/getGiveContent", I1Il1lIl = {
        "pin": $.formatPin,
        "activityId": $.activityId
      };
      break;
    case "followGoods":
      iilIII11 += "/wxDrawActivity/follow", I1Il1lIl = {
        "activityId": $.activityId,
        "pin": $.formatPin,
        "skuId": $.skuId
      };
      break;
    case "start":
      iilIII11 += $.drawApiPath, I1Il1lIl = {
        "activityId": $.activityId,
        "pin": $.formatPin
      };
      break;
    default:
      console.log("❌ 未知请求 " + Il1IiIl);
      return;
  }
  const IIIi11I1 = $.activityMode === "cjhy" && wuxianDefense.isDefenseApi(iilIII11.replace($.baseUrl, "").split("?")[0]);
  IIIi11I1 && (I1Il1lIl?.["pin"] && (I1Il1lIl.pin = encodeURIComponent($.secretPin)), Il1I1ili = {
    "ecyText": wuxianDefense.encrypt({
      "actId": $.activityId,
      ...I1Il1lIl
    }, $.pinToken, $.te)
  });
  const I11Ilill = {
    "url": iilIII11,
    "method": ili1IllI,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": IIIi11I1 ? "application/json" : "application/x-www-form-urlencoded",
      "Cookie": activityCookie.trim(),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA || "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/121.0.0.0",
      "X-Requested-With": "XMLHttpRequest"
    },
    "params": lii11Iii,
    "data": IIIi11I1 ? Il1I1ili : I1Il1lIl,
    "timeout": 30000
  };
  ili1IllI === "GET" && (delete I11Ilill.data, delete I11Ilill.headers["Content-Type"]);
  const ll1i1il1 = 5;
  let ilI1lli = 0,
    lI1l1iil = null,
    li1IiiI = false;
  while (ilI1lli < ll1i1il1) {
    ilI1lli > 0 && (await $.wait(1000));
    const I1ilIllI = await common.request(I11Ilill);
    if (!I1ilIllI.success) {
      lI1l1iil = Il1IiIl + " 请求失败 ➜ " + I1ilIllI.error;
      ilI1lli++;
      if (I1ilIllI.status) {
        if (I1ilIllI.status === 500 && IIIi11I1) I11Ilill.data = {
          "ecyText": wuxianDefense.encrypt({
            "actId": $.activityId,
            ...I1Il1lIl
          }, $.pinToken, $.te)
        };else [403, 493].includes(I1ilIllI.status) && (li1IiiI = true);
      }
      continue;
    }
    if (["accessLog", "accessLogWithAD"].includes(Il1IiIl)) break;
    if (!I1ilIllI.data) {
      lI1l1iil = Il1IiIl + " 请求失败 ➜ 无响应数据";
      ilI1lli++;
      IIIi11I1 && (I11Ilill.data = {
        "ecyText": wuxianDefense.encrypt({
          "actId": $.activityId,
          ...I1Il1lIl
        }, $.pinToken, $.te)
      });
      continue;
    }
    const iI1l1Iii = common.getResponseCookie(I1ilIllI, activityCookie);
    let liI1Ii1 = "";
    switch (Il1IiIl) {
      case "getMyPing":
        liI1Ii1 = common.getCookieValue(iI1l1Iii, "LZ_AES_PIN");
        liI1Ii1 ? $.LZ_AES_PIN = liI1Ii1 : (console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true);
        break;
      case "initPinToken":
        const iililli = common.getCookieValue(iI1l1Iii, "pToken");
        if (iililli) $.pinToken = iililli;else {
          console.log("获取 pinToken 失败！");
          $.message.fix("获取[pinToken]失败");
          $.skipRun = true;
          break;
        }
        liI1Ii1 = common.getCookieValue(iI1l1Iii, "LZ_AES_PIN");
        if (liI1Ii1) $.LZ_AES_PIN = liI1Ii1;else {
          console.log("获取 LZ_AES_PIN 失败！");
          $.message.fix("获取[LZ_AES_PIN]失败");
          $.skipRun = true;
          break;
        }
        const IillIli1 = common.getCookieValue(iI1l1Iii, "te");
        IillIli1 && ($.te = IillIli1);
        break;
    }
    ["getMyPing", "followGoods", "start"].includes(Il1IiIl) && (activityCookie = iI1l1Iii);
    liI1Ii1 = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !liI1Ii1 && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const llII1iIl = common.getCookieValue(activityCookie, "pToken");
    if (!llII1iIl && $.pinToken) {
      activityCookie += "pToken=" + $.pinToken + "; ";
    }
    const ll1liIil = common.getCookieValue(activityCookie, "AUTH_C_USER");
    !ll1liIil && $.secretPin && (activityCookie += "AUTH_C_USER=" + $.secretPin + "; ");
    const llII = common.getCookieValue(activityCookie, "te");
    !llII && $.te && (activityCookie += "te=" + $.te + "; ");
    await handleResponse(Il1IiIl, I1ilIllI.data);
    li1IiiI = false;
    break;
  }
  ilI1lli >= ll1i1il1 && (console.log(lI1l1iil), li1IiiI && !["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(Il1IiIl) && ($.outFlag = true, $.message && $.message.fix(lI1l1iil)));
}
async function getFirstLZCK(iIii111I) {
  $.skipRun = true;
  const III1Iili = {
      "url": iIii111I,
      "method": "GET",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Referer": iIii111I,
        "User-Agent": $.UA
      },
      "timeout": 30000
    },
    i1iii11i = 3;
  let IiIiIIll = 0,
    IIli11il = null,
    II1l1lli = false;
  while (IiIiIIll < i1iii11i) {
    IiIiIIll > 0 && (await $.wait(1000));
    const lI11II = await common.request(III1Iili);
    if (!lI11II.success) {
      IIli11il = "getFirstLZCK 请求失败 ➜ " + lI11II.error;
      IiIiIIll++;
      lI11II.status && [403, 493].includes(lI11II.status) && (II1l1lli = true);
      continue;
    }
    if (!lI11II.data) {
      IIli11il = "getFirstLZCK 请求失败 ➜ 无响应数据";
      IiIiIIll++;
      continue;
    }
    lI11II.data.match(/(活动已经结束)/) && lI11II.data.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在"), $.message && $.message.insert("活动已结束或不存在"));
    activityCookie = common.getResponseCookie(lI11II);
    $.skipRun = false;
    break;
  }
  IiIiIIll >= i1iii11i && (console.log(IIli11il), II1l1lli && ($.outFlag = true, $.message && $.message.insert(IIli11il)));
}