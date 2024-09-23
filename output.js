//Mon Sep 23 2024 16:01:17 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const activityUrl = process.env.jd_lzkj_draw_url || "",
  joinMember = process.env.jd_lzkj_draw_opencard === "true",
  isNotify = process.env.jd_lzkj_draw_Notify === "true",
  concMode = process.env.jd_lzkj_draw_conc === "true",
  concThreads = process.env.jd_lzkj_draw_concThreads || "3";
let concTimeout = process.env.jd_lzkj_draw_concTimeout || "60000",
  concMaxRetryTimes = process.env.jd_lzkj_draw_concRetry || "0";
const drawInterval = process.env.jd_lzkj_draw_Interval || "";
let maxMissTimes = process.env.jd_lzkj_draw_MaxMiss || "";
const pinFilter_interactsaas = (process.env.jd_lzkj_draw_pinFilter_interactsaas || "").split("@"),
  pinFilter_interaction_v1 = (process.env.jd_lzkj_draw_pinFilter_interaction_v1 || "").split("@");
let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(lI1liili => jdCookie[lI1liili]).filter(IiIlIi1l => IiIlIi1l);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!activityUrl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const I1llliiI = common.parseUrl(activityUrl);
  if (!I1llliiI) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = activityUrl;
  $.activityId = common.getUrlParameter(activityUrl, "activityId");
  $.activityType = common.getUrlParameter(activityUrl, "activityType");
  $.hostname = I1llliiI.hostname;
  $.pathname = I1llliiI.pathname;
  let iil1IlII = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) iil1IlII = "/apps/interact";else $.hostname.includes("lzkj") && (iil1IlII = $.pathname.replace(/\/index$/, ""));
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + iil1IlII;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityType || !iil1IlII || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  try {
    concMaxRetryTimes = parseInt(concMaxRetryTimes) > 0 ? parseInt(concMaxRetryTimes) : 0;
  } catch {
    concMaxRetryTimes = 0;
  }
  try {
    const IIii1ilI = parseInt(concTimeout);
    concTimeout = IIii1ilI;
  } catch {
    concTimeout = 60000;
  }
  try {
    maxMissTimes = parseInt(maxMissTimes);
  } catch {
    maxMissTimes = 0;
  }
  $.drawIntervalTimes = 500;
  if (drawInterval) {
    try {
      const il1II1ll = parseInt(drawInterval) * 1000;
      $.drawIntervalTimes = il1II1ll;
    } catch {
      $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
  }
  $.pinFilter = [];
  $.pathname.includes("/prod/cc/interaction/v1/") ? $.pinFilter = pinFilter_interaction_v1 : $.pinFilter = pinFilter_interactsaas;
  notify.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  if (!concMode) {
    for (let lIlI1IiI = 0; lIlI1IiI < cookiesArr.length; lIlI1IiI++) {
      $.index = lIlI1IiI + 1;
      cookie = cookiesArr[lIlI1IiI];
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
      $.JdEnvInfo = getJdEnvInfo($.UA, $.activityUrl);
      $.message = notify.create($.index, $.UserName);
      $.nickName = "";
      await Main();
      common.unsetCookie();
      if ($.outFlag || $.runEnd) break;
    }
  } else console.log("🔀 已开启并发模式，当前设置线程数为 " + concThreads), await concMain();
  isNotify && notify.getMessage() && (notify.appendContent("\n【活动地址】" + $.activityUrl), await notify.push());
})().catch(Illi1Iii => $.logErr(Illi1Iii)).finally(() => $.done());
async function Main() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await getToken(cookie, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await sendRequest("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1001":
          $.shopId && (await sendRequest("follow"), await $.wait(500));
          break;
        case "1004":
          await sendRequest("follow"), await $.wait(500), await sendRequest("login");
          if ($.runEnd || $.outFlag || $.skipRun) return;
          await $.wait(500);
          break;
        case "1005":
        case "1006":
          if (joinMember) {
            const iliIiili = await common.joinShopMember($.venderId);
            if (iliIiili) {
              console.log("加入店铺会员成功");
              await sendRequest("follow");
              await $.wait(500);
              await sendRequest("login");
              if ($.runEnd || $.outFlag || $.skipRun) return;
              await $.wait(500);
            } else {
              console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
              $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
              return;
            }
          } else {
            console.log("活动仅限店铺会员参与哦~");
            $.message.fix("活动仅限店铺会员参与");
            return;
          }
          break;
        default:
          console.log($.joinDes), $.message.fix($.joinDes);
          return;
      }
      if ($.runEnd || $.outFlag || $.skipRun) return;
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) return;
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.shopId) await common.followShop(true, $.shopId);
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await sendRequest("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.hasGetBasicInfo) {
      $.hasGetBasicInfo = true;
      await sendRequest("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10001":
        case "10004":
        case "10020":
        case "10021":
        case "10026":
        case "10031":
        case "10041":
        case "10042":
        case "10046":
        case "10054":
        case "10062":
        case "10063":
        case "10073":
        case "10080":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) return;
      await $.wait(500);
    }
    await sendRequest("drawPrize");
    await $.wait(500);
    if (!$.hasPrintActInfo && $.prizeInfo) {
      $.hasPrintActInfo = true;
      let ll1lI1I1 = false,
        i1i1ilI1 = "";
      for (let iIi1ilii = 0; iIi1ilii < $.prizeInfo.length; iIi1ilii++) {
        const II11IlI1 = $.prizeInfo[iIi1ilii],
          lllIi1li = II11IlI1.prizeName,
          Ii1lI1I1 = II11IlI1.leftNum,
          lIl111 = II11IlI1.prizeType;
        Ii1lI1I1 >= 1 && (ll1lI1I1 = true);
        i1i1ilI1 += "  " + lllIi1li + (lIl111 === 5 ? "[专享价]" : lIl111 === 3 ? "[实物]" : "") + "，" + (Ii1lI1I1 >= 1 ? "剩余" + Ii1lI1I1 + "份" : "已发完") + "\n";
      }
      const lllIlil = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        l1Iiil = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      console.log(($.shopName ? "店铺名称：#" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n开始时间：" + lllIlil + "\n结束时间：" + l1Iiil + "\n活动奖品：\n" + i1i1ilI1);
      notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n【开始时间】" + lllIlil + "\n【结束时间】" + l1Iiil + "\n【活动奖品】\n" + i1i1ilI1);
      switch ($.actStatus) {
        case 0:
          const li1Ii1ii = Date.now();
          if ($.actStartTime && li1Ii1ii < $.actStartTime) {
            console.log("活动将在 " + lllIlil + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + lllIlil);
            $.runEnd = true;
            break;
          }
          if ($.actEndTime && li1Ii1ii > $.actEndTime) {
            console.log("活动已于 " + l1Iiil + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + l1Iiil);
            $.runEnd = true;
            break;
          }
          break;
        case 1:
          console.log("活动将在 " + lllIlil + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + lllIlil), $.runEnd = true;
          break;
        case 2:
          console.log("活动已于 " + l1Iiil + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + l1Iiil), $.runEnd = true;
          break;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      !ll1lI1I1 && (console.log("奖品已全部发完了，下次早点来吧~"), $.message.fix("奖品已发完"), $.runEnd = true);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    $.memberLevelInsufficient = false;
    $.doTaskFailed = false;
    switch ($.activityType) {
      case "10020":
      case "10021":
      case "10031":
      case "10041":
      case "10042":
      case "10046":
      case "10054":
      case "10062":
      case "10063":
      case "10073":
        if ($.drawNumber <= 0) {
          if (["10020", "10021"].includes($.activityType)) await sendRequest("jiugongge_activity");else ["10054"].includes($.activityType) ? await sendRequest("upperSign_getTask") : await sendRequest("lotteryCenter_activity");
          await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) return;
          for (let I111lIl1 = 0; I111lIl1 < $.taskList.length; I111lIl1++) {
            if ($.memberLevelInsufficient || $.doTaskFailed) break;
            const II1iiil1 = $.taskList[I111lIl1],
              lilIilli = II1iiil1?.["status"] || 0,
              i1illiil = II1iiil1.taskType;
            if (lilIilli === 0) {
              if (II1iiil1.taskId) switch (i1illiil) {
                case 1:
                case 2:
                case 4:
                case 6:
                case 9:
                case 14:
                  $.taskId = II1iiil1.taskId, $.skuId = "", await sendRequest("toDo"), await $.wait(1000);
                  break;
                case 3:
                case 5:
                case 7:
                  $.taskId = II1iiil1.taskId;
                  const IlIIiI1I = II1iiil1.skuInfoVO || [];
                  for (let IIlil1li = 0; IIlil1li < IlIIiI1I.length; IIlil1li++) {
                    if (IlIIiI1I[IIlil1li].status !== 1) {
                      if ($.memberLevelInsufficient || $.doTaskFailed) break;
                      $.skuId = IlIIiI1I[IIlil1li].skuId;
                      await sendRequest("toDo");
                      await $.wait(1000);
                    }
                    if ($.doTaskFailed) break;
                  }
                  break;
                case 10:
                case 12:
                  const iIIlilli = II1iiil1?.["finishNum"],
                    iii11I1i = II1iiil1?.["shareCount"];
                  if (iii11I1i <= iIIlilli) {
                    $.taskId = II1iiil1.taskId;
                    $.skuId = "";
                    for (let iII1IiI = 0; iII1IiI < iIIlilli; iII1IiI++) {
                      if ($.memberLevelInsufficient || $.doTaskFailed) break;
                      await sendRequest("toDo");
                      await $.wait(1000);
                    }
                  }
                  break;
                case 15:
                  !$.shareUserId && ($.maxShareTimes = II1iiil1.finishNum || 1);
                  await sendRequest("getUserId"), await $.wait(1000);
                  break;
                case 8:
                case 13:
                case 22:
                  break;
                default:
                  break;
              }
            }
          }
          await sendRequest("drawPrize");
          await $.wait(500);
        }
        break;
      case "10001":
      case "10004":
        await sendRequest("sign_add"), await $.wait(500);
        break;
      case "10026":
      case "10080":
        break;
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    $.needRefreshPinToken && (await sendRequest("initPinToken"), $.needRefreshPinToken = false, await $.wait(500));
    $.drawMissTimes = 0;
    switch ($.activityType) {
      case "10001":
      case "10004":
      case "10020":
      case "10021":
      case "10031":
      case "10041":
      case "10042":
      case "10046":
      case "10054":
      case "10062":
      case "10063":
        if ($.drawNumber <= 0) {
          console.log("没有抽奖机会了~");
          $.message.fix("抽奖机会不足");
          return;
        }
        for (let llIIi1ii = 0; llIIi1ii < $.drawNumber; llIIi1ii++) {
          await sendRequest("draw");
          if (maxMissTimes && $.drawMissTimes >= maxMissTimes) break;
          await $.wait($.drawIntervalTimes);
          $.needRefreshPinToken && (await sendRequest("initPinToken"), $.needRefreshPinToken = false, await $.wait(500));
          if (llIIi1ii >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
      case "10026":
      case "10073":
      case "10080":
        await sendRequest("getPoints");
        if ($.runEnd || $.outFlag || $.skipRun) return;
        $.drawNumber && ["10073", "10080"].includes($.activityType) && ($.poorScore += $.drawNumber * $.consumePoints);
        const l11llli1 = parseInt($.poorScore / $.consumePoints);
        if (l11llli1 <= 0) {
          console.log("积分不足无法抽奖~");
          $.message.insert("积分不足");
          return;
        }
        await $.wait(500);
        for (let l1il1ili = 0; l1il1ili < l11llli1; l1il1ili++) {
          await sendRequest("draw");
          if (maxMissTimes && $.drawMissTimes >= maxMissTimes) break;
          await $.wait($.drawIntervalTimes);
          $.needRefreshPinToken && (await sendRequest("initPinToken"), $.needRefreshPinToken = false, await $.wait(500));
          if (l1il1ili >= 8) {
            console.log("\n抽奖太多次了，下次再继续吧~");
            $.message.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
    }
  } catch (il111IlI) {
    console.log("❌ 脚本运行遇到了错误\n" + il111IlI);
  }
}
async function concMain() {
  console.log("");
  await common.concTask(concThreads, cookiesArr, async (Ii11IiIi, I11l1llI) => {
    const iiliIIl1 = decodeURIComponent(common.getCookieValue(Ii11IiIi, "pt_pin")),
      IiilliI1 = notify.create(I11l1llI, iiliIIl1);
    if ($.pinFilter.length > 0 && ($.pinFilter.includes(iiliIIl1) || $.pinFilter.includes(encodeURIComponent(iiliIIl1)))) {
      IiilliI1.fix("已设置跳过运行当前账号");
      console.log(IiilliI1.getInlineContent());
      return;
    }
    const i11iiiiI = common.genUA(iiliIIl1),
      ill111il = common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
      lliiIiil = getJdEnvInfo(i11iiiiI, $.activityUrl);
    let IililIii = "",
      IIiIiI1 = "",
      li1Il1ll = "",
      i1ill11i = "",
      IIi1l11I = false,
      l1iiliII = false,
      lliIlIl1 = false;
    i1ill11i = await getToken(Ii11IiIi, $.baseUrl);
    if (!i1ill11i) {
      IiilliI1.fix("获取[Token]失败");
      console.log(IiilliI1.getInlineContent());
      return;
    }
    let lIl11Iii, iIIi1IIl, iil1lIi, ilIlI11;
    await IiIiili1("login");
    if (lliIlIl1 || l1iiliII) {
      console.log(IiilliI1.getInlineContent());
      if (lliIlIl1) return {
        "runEnd": true
      };
      return;
    }
    if (!IililIii) {
      IiilliI1.fix("未能获取用户鉴权信息");
      console.log(IiilliI1.getInlineContent());
      return;
    }
    if (iil1lIi) {
      switch (iil1lIi) {
        case "1001":
          if ($.shopId) {
            await IiIiili1("follow");
          }
          break;
        case "1004":
          await IiIiili1("follow"), await IiIiili1("login");
          if (lliIlIl1 || l1iiliII) {
            console.log(IiilliI1.getInlineContent());
            if (lliIlIl1) return {
              "runEnd": true
            };
            return;
          }
          break;
        case "1005":
        case "1006":
          if (joinMember) {
            const l1IIiiIl = await common.joinShopMember($.venderId, Ii11IiIi);
            if (l1IIiiIl) {
              IiilliI1.insert("加入店铺会员成功");
              await IiIiili1("follow");
              await IiIiili1("login");
              if (lliIlIl1 || l1iiliII) {
                console.log(IiilliI1.getInlineContent());
                if (lliIlIl1) return {
                  "runEnd": true
                };
                return;
              }
            } else {
              IiilliI1.fix("加入店铺会员失败，活动仅限店铺会员参与");
              console.log(IiilliI1.getInlineContent());
              return;
            }
          } else {
            IiilliI1.fix("活动仅限店铺会员参与");
            console.log(IiilliI1.getInlineContent());
            return;
          }
          break;
        default:
          IiilliI1.fix(ilIlI11), console.log(IiilliI1.getInlineContent());
          return;
      }
      if (lliIlIl1 || l1iiliII) {
        console.log(IiilliI1.getInlineContent());
        if (lliIlIl1) return {
          "runEnd": true
        };
        return;
      }
    } else {
      if (lliIlIl1 || l1iiliII) {
        console.log(IiilliI1.getInlineContent());
        if (lliIlIl1) return {
          "runEnd": true
        };
        return;
      }
      IiilliI1.fix("未能获取用户活动状态");
      console.log(IiilliI1.getInlineContent());
      return;
    }
    if ($.shopId) await common.followShop(true, $.shopId, Ii11IiIi);
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await IiIiili1("initPinToken");
      if (!IIiIiI1) {
        IiilliI1.fix("获取[pinToken]失败");
        console.log(IiilliI1.getInlineContent());
        return;
      }
    }
    if (lliIlIl1 || l1iiliII) {
      console.log(IiilliI1.getInlineContent());
      if (lliIlIl1) return {
        "runEnd": true
      };
      return;
    }
    let lllIllii, ll1IIl1l, IlllIIii, iiIIIiI1, II1ll1Il;
    if (!$.hasGetBasicInfo) {
      $.hasGetBasicInfo = true;
      await IiIiili1("basicInfo");
      if (lliIlIl1 || l1iiliII) {
        console.log(IiilliI1.getInlineContent());
        if (lliIlIl1) return {
          "runEnd": true
        };
        return;
      }
      switch ($.activityType) {
        case "10001":
        case "10004":
        case "10020":
        case "10021":
        case "10026":
        case "10031":
        case "10041":
        case "10042":
        case "10046":
        case "10054":
        case "10062":
        case "10063":
        case "10073":
        case "10080":
          break;
        case "":
          IiilliI1.fix("未能获取活动类型"), lliIlIl1 = true;
        default:
          IiilliI1.fix("活动类型（" + $.activityType + "）不受支持"), lliIlIl1 = true;
      }
      if (lliIlIl1) return console.log(IiilliI1.getInlineContent()), {
        "runEnd": true
      };
    }
    await IiIiili1("drawPrize");
    if (!$.hasPrintActInfo && II1ll1Il) {
      $.hasPrintActInfo = true;
      let lIIiIIl1 = false,
        liilIII = "";
      for (let iIlii1i = 0; iIlii1i < II1ll1Il.length; iIlii1i++) {
        const l11iili1 = II1ll1Il[iIlii1i],
          iii1Iiii = l11iili1.prizeName,
          IliIIiI = l11iili1.leftNum,
          l1liI1ii = l11iili1.prizeType;
        IliIIiI >= 1 && (lIIiIIl1 = true);
        liilIII += "  " + iii1Iiii + (l1liI1ii === 5 ? "[专享价]" : l1liI1ii === 3 ? "[实物]" : "") + "，" + (IliIIiI >= 1 ? "剩余" + IliIIiI + "份" : "已发完") + "\n";
      }
      const i1IilIl = $.time("yyyy-MM-dd HH:mm", lllIllii),
        IllIIili = $.time("yyyy-MM-dd HH:mm", ll1IIl1l);
      console.log("\n" + ($.shopName ? "店铺名称：#" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n开始时间：" + i1IilIl + "\n结束时间：" + IllIIili + "\n活动奖品：\n" + liilIII);
      notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n【开始时间】" + i1IilIl + "\n【结束时间】" + IllIIili + "\n【活动奖品】\n" + liilIII);
      switch (IlllIIii) {
        case 0:
          const I11ii1i = Date.now();
          if (lllIllii && I11ii1i < lllIllii) {
            IiilliI1.fix("活动尚未开始，开始时间：" + i1IilIl);
            lliIlIl1 = true;
            break;
          }
          if (ll1IIl1l && I11ii1i > ll1IIl1l) {
            IiilliI1.fix("活动已结束，结束时间：" + IllIIili);
            lliIlIl1 = true;
            break;
          }
          break;
        case 1:
          IiilliI1.fix("活动尚未开始，开始时间：" + i1IilIl), lliIlIl1 = true;
          break;
        case 2:
          IiilliI1.fix("活动已结束，结束时间：" + IllIIili), lliIlIl1 = true;
          break;
        default:
          IlllIIii && (IiilliI1.fix("未知活动状态 " + IlllIIii), lliIlIl1 = true);
          break;
      }
      !lIIiIIl1 && (IiilliI1.fix("奖品已发完"), lliIlIl1 = true);
    }
    if (lliIlIl1 || l1iiliII) {
      console.log(IiilliI1.getInlineContent());
      if (lliIlIl1) return {
        "runEnd": true
      };
      return;
    }
    let IllI111l = false,
      lii111l = false,
      IIllli1i = "",
      iliI11 = "",
      iiiilill = [];
    switch ($.activityType) {
      case "10020":
      case "10021":
      case "10031":
      case "10041":
      case "10042":
      case "10046":
      case "10054":
      case "10062":
      case "10063":
      case "10073":
        if (iiIIIiI1 <= 0) {
          if (["10020", "10021"].includes($.activityType)) await IiIiili1("jiugongge_activity");else ["10054"].includes($.activityType) ? await IiIiili1("upperSign_getTask") : await IiIiili1("lotteryCenter_activity");
          if (lliIlIl1 || l1iiliII) {
            console.log(IiilliI1.getInlineContent());
            if (lliIlIl1) return {
              "runEnd": true
            };
            return;
          }
          for (let li1iili1 = 0; li1iili1 < iiiilill.length; li1iili1++) {
            if (IllI111l || lii111l) break;
            const IIIl11II = iiiilill[li1iili1],
              IIIIlIIl = IIIl11II?.["status"] || 0,
              iIil1iii = IIIl11II.taskType;
            if (IIIIlIIl === 0) {
              if (IIIl11II.taskId) switch (iIil1iii) {
                case 1:
                case 2:
                case 4:
                case 6:
                case 9:
                case 14:
                  IIllli1i = IIIl11II.taskId, iliI11 = "", await IiIiili1("toDo");
                  break;
                case 3:
                case 5:
                case 7:
                  IIllli1i = IIIl11II.taskId;
                  const III1lI = IIIl11II.skuInfoVO || [];
                  for (let iI1ilIi1 = 0; iI1ilIi1 < III1lI.length; iI1ilIi1++) {
                    if (III1lI[iI1ilIi1].status !== 1) {
                      if (IllI111l || lii111l) break;
                      iliI11 = III1lI[iI1ilIi1].skuId;
                      await IiIiili1("toDo");
                    }
                  }
                  break;
                case 10:
                case 12:
                  const llIliiii = IIIl11II?.["finishNum"],
                    II1lIIIi = IIIl11II?.["shareCount"];
                  if (II1lIIIi <= llIliiii) {
                    IIllli1i = IIIl11II.taskId;
                    iliI11 = "";
                    for (let l1l111iI = 0; l1l111iI < llIliiii; l1l111iI++) {
                      if (IllI111l || lii111l) break;
                      await IiIiili1("toDo");
                    }
                  }
                  break;
                case 8:
                case 13:
                case 22:
                  break;
                default:
                  break;
              }
            }
          }
          await IiIiili1("drawPrize");
        }
        break;
      case "10001":
      case "10004":
        await IiIiili1("sign_add");
        break;
      case "10026":
      case "10080":
        break;
    }
    if (lliIlIl1 || l1iiliII) {
      console.log(IiilliI1.getInlineContent());
      if (lliIlIl1) return {
        "runEnd": true
      };
      return;
    }
    IIi1l11I && (await sendRequest("initPinToken"), IIi1l11I = false);
    let Il1iii1i = 0,
      iiIi11ll,
      I1l1lliI;
    switch ($.activityType) {
      case "10001":
      case "10004":
      case "10020":
      case "10021":
      case "10031":
      case "10041":
      case "10042":
      case "10046":
      case "10054":
      case "10062":
      case "10063":
        if (iiIIIiI1 <= 0) {
          IiilliI1.fix("抽奖机会不足");
          console.log(IiilliI1.getInlineContent());
          return;
        }
        for (let ilIIIl1I = 0; ilIIIl1I < iiIIIiI1; ilIIIl1I++) {
          await IiIiili1("draw");
          if (maxMissTimes && Il1iii1i >= maxMissTimes) break;
          IIi1l11I && (await sendRequest("initPinToken"), IIi1l11I = false);
          if (ilIIIl1I >= 8) {
            IiilliI1.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
      case "10026":
      case "10073":
      case "10080":
        await IiIiili1("getPoints");
        if (lliIlIl1 || l1iiliII) {
          console.log(IiilliI1.getInlineContent());
          if (lliIlIl1) return {
            "runEnd": true
          };
          return;
        }
        iiIIIiI1 && ["10073", "10080"].includes($.activityType) && (I1l1lliI += iiIIIiI1 * iiIi11ll);
        const ll1iIl = parseInt(I1l1lliI / iiIi11ll);
        if (ll1iIl <= 0) {
          IiilliI1.insert("积分不足");
          console.log(IiilliI1.getInlineContent());
          return;
        }
        for (let ilI1liI = 0; ilI1liI < ll1iIl; ilI1liI++) {
          await IiIiili1("draw");
          if (maxMissTimes && Il1iii1i >= maxMissTimes) break;
          IIi1l11I && (await sendRequest("initPinToken"), IIi1l11I = false);
          if (ilI1liI >= 8) {
            IiilliI1.insert("抽奖太多次了，下次再抽");
            break;
          }
        }
        break;
    }
    console.log(IiilliI1.getInlineContent());
    async function lllIllll(iIIlilii, IIiIIIll) {
      switch (iIIlilii) {
        case "login":
          if (IIiIIIll.resp_code === 0 && IIiIIIll.data) {
            IililIii = IIiIIIll?.["data"]?.["token"];
            lIl11Iii = IIiIIIll?.["data"]?.["joinInfo"];
            iIIi1IIl = lIl11Iii?.["openCardUrl"];
            if (!$.shopId) $.shopId = IIiIIIll?.["data"]?.["shopId"];
            if (!$.venderId) $.venderId = common.getUrlParameter(iIIi1IIl, "venderId");
            if (!$.shopName) $.shopName = IIiIIIll?.["data"]?.["shopName"];
            iil1lIi = lIl11Iii?.["joinCodeInfo"]?.["joinCode"];
            ilIlI11 = lIl11Iii?.["joinCodeInfo"]?.["joinDes"];
          } else IIiIIIll.resp_msg ? (IiilliI1.fix(IIiIIIll.resp_msg), l1iiliII = true) : console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          break;
        case "follow":
          if (IIiIIIll.resp_code === 0) {} else IIiIIIll.resp_msg ? (IiilliI1.fix(IIiIIIll.resp_msg), l1iiliII = true, ["未开始", "结束", "不存在", "不在"].some(iIIlii => IIiIIIll.resp_msg.includes(iIIlii)) && (lliIlIl1 = true)) : console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          break;
        case "initPinToken":
          if (IIiIIIll.resp_code === 0 && IIiIIIll.data) {
            IIiIIIll = JSON.parse(IIiIIIll.data);
            if (IIiIIIll.resp_code === 0 && IIiIIIll.data) IIiIiI1 = IIiIIIll?.["data"]?.["pinToken"], encryptPin = IIiIIIll?.["data"]?.["encryptPin"];else {
              if (IIiIIIll.resp_code === 1000) IiilliI1.fix(IIiIIIll.resp_msg), l1iiliII = true;else IIiIIIll.resp_msg ? (IiilliI1.fix(IIiIIIll.resp_msg), l1iiliII = true) : (console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll)), l1iiliII = true);
            }
          } else console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          break;
        case "basicInfo":
          if (IIiIIIll.resp_code === 0 && IIiIIIll.data) {
            lllIllii = IIiIIIll.data?.["startTime"];
            ll1IIl1l = IIiIIIll.data?.["endTime"];
            IlllIIii = IIiIIIll.data?.["actStatus"];
            if (!$.activityType) {
              $.activityType = String(IIiIIIll.data?.["actType"] || "");
            }
          } else IIiIIIll.resp_msg ? IiilliI1.fix(IIiIIIll.resp_msg) : console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          break;
        case "drawPrize":
          if (IIiIIIll.resp_code === 0) iiIIIiI1 = IIiIIIll?.["data"]?.["drawNumber"], II1ll1Il = IIiIIIll?.["data"]?.["prizeInfo"] || [];else {
            if (IIiIIIll.resp_msg) {
              console.log(iIIlilii + " " + IIiIIIll.resp_msg);
              if (["未开始", "结束", "不存在", "不在"].some(l111i11 => IIiIIIll.resp_msg.includes(l111i11))) {
                lliIlIl1 = true;
              }
              IiilliI1.fix(IIiIIIll.resp_msg);
            } else console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          }
          break;
        case "getPoints":
          if (IIiIIIll.resp_code === 0 && IIiIIIll.data) iiIi11ll = IIiIIIll.data?.["consumePoints"], I1l1lliI = IIiIIIll.data?.["poorScore"];else IIiIIIll.resp_msg ? (IiilliI1.fix(IIiIIIll.resp_msg), l1iiliII = true) : console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          break;
        case "jiugongge_activity":
        case "lotteryCenter_activity":
        case "upperSign_getTask":
          if (IIiIIIll.resp_code === 0) iiiilill = IIiIIIll?.["data"]?.["taskList"] || [];else {
            if (IIiIIIll.resp_code === 1000) IiilliI1.insert("获取任务失败");else IIiIIIll.resp_msg ? IiilliI1.insert(IIiIIIll.resp_msg) : console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          }
          break;
        case "sign_add":
          if (IIiIIIll.resp_code === 0) {
            IIiIIIll.data && IIiIIIll.data?.["score"] && (iiIIIiI1 += IIiIIIll.data?.["score"]);
          } else {
            if (IIiIIIll.resp_code === 50013 || IIiIIIll.resp_code === 50012) {} else {
              if (IIiIIIll.resp_msg) IiilliI1.insert(IIiIIIll.resp_msg);else {
                console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
              }
            }
          }
          break;
        case "toDo":
          if (IIiIIIll.resp_code === 0) {} else {
            if (IIiIIIll.resp_code === 50013 || IIiIIIll.resp_code === 50012) {} else {
              if (IIiIIIll.resp_msg) {
                if (["会员等级不足"].some(II1illi => IIiIIIll.resp_msg.includes(II1illi))) {
                  IllI111l = true;
                }
                ["未关注店铺", "public com."].some(IiI1IiI1 => IIiIIIll.resp_msg.includes(IiI1IiI1)) && (lii111l = true);
                !["public com."].some(IiiI1II1 => IIiIIIll.resp_msg.includes(IiiI1II1)) && IiilliI1.insert(IIiIIIll.resp_msg);
              } else console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
            }
          }
          break;
        case "draw":
          if (IIiIIIll.resp_code === 0) {
            if (IIiIIIll.data === "1") IiilliI1.insert("积分不足");else {
              if (IIiIIIll.data === "2") IiilliI1.insert("抽奖机会不足");else {
                const liIIiIl1 = IIiIIIll.data;
                if (liIIiIl1 && typeof liIIiIl1 === "object" && Object.keys(liIIiIl1).length > 0) switch (liIIiIl1.prizeType) {
                  case 1:
                    IiilliI1.insert(liIIiIl1.prizeName + "🐶");
                    break;
                  case 2:
                    IiilliI1.insert("优惠券🗑️");
                    break;
                  case 3:
                    const iili1li1 = IIiIIIll.data.addressId,
                      llI1ll1 = liIIiIl1.prizeName;
                    console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + llI1ll1);
                    if (liIIiIl1.showImg) console.log("预览图片：" + liIIiIl1.showImg);
                    const lIiI1iI = {
                        "baseUrl": $.baseUrl,
                        "newbaseUrl": $.newbaseUrl,
                        "cookie": Ii11IiIi,
                        "ua": i11iiiiI,
                        "token": IililIii,
                        "prizeName": llI1ll1,
                        "orderCode": iili1li1
                      },
                      iiliilii = await loreal_savePrize(lIiI1iI);
                    !isNotify && iiliilii && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + I11l1llI + "】\n抽中实物 " + llI1ll1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    IiilliI1.insert(llI1ll1 + "(" + (iiliilii ? "已填地址" : "未填地址") + ")🎁");
                    break;
                  case 4:
                  case 11:
                    IiilliI1.insert(liIIiIl1.prizeName + "🎟️");
                    break;
                  case 5:
                    IiilliI1.insert("专享价🗑️");
                    break;
                  case 6:
                    IiilliI1.insert(liIIiIl1.prizeName + "🧧");
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                    IiilliI1.insert(liIIiIl1.prizeName + "🎁");
                    !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + I11l1llI + "】\n抽中 " + liIIiIl1.prizeName + "\n\n" + $.activityUrl));
                    break;
                  case "":
                    Il1iii1i += 1, IiilliI1.insert("空气💨");
                    break;
                  default:
                    IiilliI1.insert(liIIiIl1?.["prizeName"] || "未知奖品");
                    break;
                } else Il1iii1i += 1, IiilliI1.insert("空气💨");
              }
            }
          } else IIiIIIll.resp_msg ? ["没有抽奖次数"].some(i1l1ii => IIiIIIll.resp_msg.includes(i1l1ii)) ? IiilliI1.insert("抽奖机会不足") : (["未开始", "结束", "不存在", "不在"].some(i11il1i1 => IIiIIIll.resp_msg.includes(i11il1i1)) && (lliIlIl1 = true), IiilliI1.fix(IIiIIIll.resp_msg)) : console.log("❓" + iIIlilii + " " + JSON.stringify(IIiIIIll));
          break;
      }
    }
    async function IiIiili1(llilIill) {
      let i1lIl1ii = $.newbaseUrl,
        i111II11 = null,
        lll11lI = null,
        i1Il1iii = null,
        IlIIII1l = "POST";
      switch (llilIill) {
        case "login":
          i1lIl1ii += "/api/user-info/login", i111II11 = {
            "status": "1",
            "activityId": $.activityId,
            "tokenPin": i1ill11i,
            "source": "01",
            "shareUserId": $.shareUserId || "",
            "uuid": ill111il,
            "client": "iOS",
            "clientVersion": common.getLatestAppVersion(),
            "osVersion": common.getLatestIOSVersion(),
            "model": "iPhone16,2",
            "userAgent": i11iiiiI
          };
          break;
        case "follow":
          i1lIl1ii += "/api/task/followShop/follow", i111II11 = {};
          break;
        case "initPinToken":
          IlIIII1l = "GET", i1lIl1ii += "/api/user-info/initPinToken", i1Il1iii = {
            "status": "1",
            "activityId": $.activityId,
            "jdToken": i1ill11i,
            "source": "01",
            "shareUserId": "",
            "uuid": ill111il,
            "clientTime": Date.now(),
            "shopId": $.shopId
          };
          break;
        case "basicInfo":
          i1lIl1ii += "/api/active/basicInfo", i111II11 = {
            "activityId": $.activityId
          };
          break;
        case "getPoints":
          i1lIl1ii += "/api/task/points/getPoints", i111II11 = {};
          break;
        case "jiugongge_activity":
          i1lIl1ii += "/api/task/jiugongge/activity", i111II11 = {
            "activityId": $.activityId
          };
          break;
        case "lotteryCenter_activity":
          i1lIl1ii += "/api/task/lotteryCenter/activity", i111II11 = {
            "activityId": $.activityId
          };
          break;
        case "upperSign_getTask":
          i1lIl1ii += "/api/task/upperSign/getTask", i111II11 = {
            "shareUserId": $.shareUserId || ""
          };
          break;
        case "sign_add":
          i1lIl1ii += "/api/task/sign/add", i111II11 = {};
          break;
        case "toDo":
          i1lIl1ii += "/api/basic/task/toDo", i111II11 = {
            "taskId": IIllli1i,
            "skuId": iliI11
          };
          break;
        case "drawPrize":
          i1lIl1ii += "/api/prize/drawPrize", i111II11 = {};
          break;
        case "draw":
          i1lIl1ii += "/api/prize/draw", i111II11 = {
            "consumePoints": iiIi11ll || 0
          };
          break;
      }
      const i1lI11l = IlIIII1l === "POST" && $.pathname.includes("/prod/cc/interactsaas") && wuxianDefense.isDefenseApi(i1lIl1ii.replace($.newbaseUrl, "").split("?")[0]);
      i1lI11l && (lll11lI = {
        "ecyText": wuxianDefense.encrypt({
          "actId": $.activityId,
          ...i111II11
        }, IIiIiI1, li1Il1ll)
      });
      const iIilIII = {
        "url": i1lIl1ii,
        "method": IlIIII1l,
        "headers": {
          "Accept": "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          "Connection": "keep-alive",
          "Content-Type": "application/json;charset=UTF-8",
          "Cookie": "IsvToken=" + i1ill11i + (IIiIiI1 ? ";pToken=" + IIiIiI1 : "") + (li1Il1ll ? ";te=" + li1Il1ll : ""),
          "Host": $.hostname,
          "Origin": $.origin,
          "Referer": $.activityUrl,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": i11iiiiI
        },
        "params": i1Il1iii,
        "data": i1lI11l ? lll11lI : i111II11,
        "timeout": 60000
      };
      lliiIiil && (iIilIII.headers.reserveEnvInfo = lliiIiil.data, iIilIII.headers.reserveJsVersion = lliiIiil.version);
      IililIii && (iIilIII.headers.token = IililIii);
      IlIIII1l === "GET" && (delete iIilIII.data, delete iIilIII.headers["Content-Type"]);
      const IIIIIIl = 1 + concMaxRetryTimes;
      let lii1Il = 0,
        l1IilI = null;
      while (lii1Il < IIIIIIl) {
        const l1liiiii = await common.request(iIilIII);
        if (!l1liiiii.success && l1liiiii.status !== 555) {
          l1IilI = llilIill + " 请求失败 ➜ " + l1liiiii.error;
          if (llilIill === "toDo") lii111l = true;
          lii1Il++;
          if (l1liiiii.status) {
            if (l1liiiii.status === 500 && i1lI11l) iIilIII.data = {
              "ecyText": wuxianDefense.encrypt({
                "actId": $.activityId,
                ...i111II11
              }, IIiIiI1, li1Il1ll)
            };else [403, 493].includes(l1liiiii.status) && (ipBlack = true);
          }
          continue;
        }
        if (!l1liiiii.data) {
          l1IilI = llilIill + " 请求失败 ➜ 无响应数据";
          lii1Il++;
          i1lI11l && (iIilIII.data = {
            "ecyText": wuxianDefense.encrypt({
              "actId": $.activityId,
              ...i111II11
            }, IIiIiI1, li1Il1ll)
          }, IIi1l11I = true);
          continue;
        }
        const Iii1i1Il = common.getResponseCookie(l1liiiii);
        switch (llilIill) {
          case "initPinToken":
            li1Il1ll = common.getCookieValue(Iii1i1Il, "te");
            break;
        }
        IIi1l11I = false;
        lllIllll(llilIill, l1liiiii.data);
        break;
      }
      lii1Il >= IIIIIIl && IiilliI1.fix(l1IilI);
    }
  });
  console.log("\n并发运行完毕");
}
async function handleResponse(I1111i11, I1I1iIl) {
  try {
    switch (I1111i11) {
      case "login":
        if (I1I1iIl.resp_code === 0 && I1I1iIl.data) {
          $.token = I1I1iIl?.["data"]?.["token"];
          $.joinInfo = I1I1iIl?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          if (!$.shopId) $.shopId = I1I1iIl?.["data"]?.["shopId"];
          if (!$.venderId) $.venderId = common.getUrlParameter($.openCardUrl, "venderId");
          if (!$.shopName) $.shopName = I1I1iIl?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
          $.shareUserId && ($.shareTimes += 1);
        } else I1I1iIl.resp_msg ? (console.log(I1111i11 + " " + I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg), $.skipRun = true) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "follow":
        if (I1I1iIl.resp_code === 0) {} else I1I1iIl.resp_msg ? (console.log(I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(iiII1lli => I1I1iIl.resp_msg.includes(iiII1lli)) && ($.runEnd = true)) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "initPinToken":
        if (I1I1iIl.resp_code === 0 && I1I1iIl.data) {
          I1I1iIl = JSON.parse(I1I1iIl.data);
          if (I1I1iIl.resp_code === 0 && I1I1iIl.data) $.pinToken = I1I1iIl?.["data"]?.["pinToken"], $.encryptPin = I1I1iIl?.["data"]?.["encryptPin"];else {
            if (I1I1iIl.resp_code === 1000) console.log(I1111i11 + " " + I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg), $.skipRun = true;else I1I1iIl.resp_msg ? (console.log(I1111i11 + " " + I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg), $.skipRun = true) : (console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl)), $.skipRun = true);
          }
        } else console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "basicInfo":
        if (I1I1iIl.resp_code === 0 && I1I1iIl.data) $.actStartTime = I1I1iIl.data?.["startTime"], $.actEndTime = I1I1iIl.data?.["endTime"], $.actStatus = I1I1iIl.data?.["actStatus"], !$.activityType && ($.activityType = String(I1I1iIl.data?.["actType"] || ""));else I1I1iIl.resp_msg ? (console.log(I1111i11 + " " + I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg)) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "drawPrize":
        if (I1I1iIl.resp_code === 0) $.drawNumber = I1I1iIl?.["data"]?.["drawNumber"], $.prizeInfo = I1I1iIl?.["data"]?.["prizeInfo"] || [];else I1I1iIl.resp_msg ? (console.log(I1111i11 + " " + I1I1iIl.resp_msg), ["未开始", "结束", "不存在", "不在"].some(iiiilII => I1I1iIl.resp_msg.includes(iiiilII)) && ($.runEnd = true), $.message.fix(I1I1iIl.resp_msg)) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "getPoints":
        if (I1I1iIl.resp_code === 0 && I1I1iIl.data) $.consumePoints = I1I1iIl.data?.["consumePoints"], $.poorScore = I1I1iIl.data?.["poorScore"];else I1I1iIl.resp_msg ? (console.log(I1111i11 + " " + I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg), $.skipRun = true) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "getUserId":
        if (I1I1iIl.resp_code === 0 && I1I1iIl.data) !$.shareUserIdArray && ($.shareUserIdArray = [], $.shareTimes = 0), $.shareUserIdArray.push(I1I1iIl.data?.["shareUserId"]), !$.shareUserId && ($.shareUserId = I1I1iIl.data?.["shareUserId"]), $.shareTimes >= $.maxShareTimes && ($.shareUserId = $.shareUserIdArray[0] || "", $.shareTimes = 0);else I1I1iIl.resp_msg ? (console.log(I1111i11 + " " + I1I1iIl.resp_msg), ["会员等级不足"].some(Iii1iili => I1I1iIl.resp_msg.includes(Iii1iili)) && ($.memberLevelInsufficient = true)) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
      case "jiugongge_activity":
      case "lotteryCenter_activity":
      case "upperSign_getTask":
        if (I1I1iIl.resp_code === 0) $.taskList = I1I1iIl?.["data"]?.["taskList"] || [];else {
          if (I1I1iIl.resp_code === 1000) console.log(I1111i11 + " 获取任务失败"), $.message.insert("获取任务失败");else I1I1iIl.resp_msg ? console.log(I1111i11 + " " + I1I1iIl.resp_msg) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        }
        break;
      case "sign_add":
        if (I1I1iIl.resp_code === 0) I1I1iIl.data && I1I1iIl.data?.["score"] && ($.drawNumber += I1I1iIl.data?.["score"]);else {
          if (I1I1iIl.resp_code === 50013 || I1I1iIl.resp_code === 50012) {} else I1I1iIl.resp_msg ? console.log(I1111i11 + " " + I1I1iIl.resp_msg) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        }
        break;
      case "toDo":
        if (I1I1iIl.resp_code === 0) {} else {
          if (I1I1iIl.resp_code === 50013 || I1I1iIl.resp_code === 50012) {} else {
            if (I1I1iIl.resp_msg) {
              ["会员等级不足"].some(I1II1lil => I1I1iIl.resp_msg.includes(I1II1lil)) && ($.memberLevelInsufficient = true);
              if (["未关注店铺", "public com."].some(lii1iIiI => I1I1iIl.resp_msg.includes(lii1iIiI))) {
                $.doTaskFailed = true;
              }
              ["public com."].some(iIiIillI => I1I1iIl.resp_msg.includes(iIiIillI)) ? console.log(I1111i11 + " 做任务异常") : console.log(I1111i11 + " " + I1I1iIl.resp_msg);
            } else console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
          }
        }
        break;
      case "draw":
        if (I1I1iIl.resp_code === 0) {
          if (I1I1iIl.data === "1") console.log("积分不足无法抽奖"), $.message.insert("积分不足");else {
            if (I1I1iIl.data === "2") console.log("抽奖机会不足"), $.message.insert("抽奖机会不足");else {
              const lIi1llii = I1I1iIl.data;
              if (lIi1llii) {
                switch (lIi1llii.prizeType) {
                  case 1:
                    console.log("🎉 " + lIi1llii.prizeName + " 🐶"), $.message.insert(lIi1llii.prizeName + "🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️");
                    break;
                  case 3:
                    const iiI1I1i1 = I1I1iIl.data.addressId,
                      Iii1ii1 = lIi1llii.prizeName;
                    console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + Iii1ii1);
                    if (lIi1llii.showImg) console.log("预览图片：" + lIi1llii.showImg);
                    const li1illli = {
                        "baseUrl": $.baseUrl,
                        "newbaseUrl": $.newbaseUrl,
                        "cookie": cookie,
                        "ua": $.UA,
                        "token": $.token,
                        "prizeName": Iii1ii1,
                        "orderCode": iiI1I1i1
                      },
                      II111lii = await loreal_savePrize(li1illli);
                    !isNotify && II111lii && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + Iii1ii1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    $.message.insert(Iii1ii1 + "(" + (II111lii ? "已填地址" : "未填地址") + ")🎁");
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + lIi1llii.prizeName + " 🎟️"), $.message.insert(lIi1llii.prizeName + "🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                    break;
                  case 6:
                    console.log("🎉 " + lIi1llii.prizeName + " 🧧"), $.message.insert(lIi1llii.prizeName + "🧧");
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + lIi1llii.prizeName + " 🎁"), $.message.insert(lIi1llii.prizeName + "🎁");
                    !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + lIi1llii.prizeName + "\n\n" + $.activityUrl));
                    break;
                  case "":
                    $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
                    break;
                  default:
                    console.log(lIi1llii);
                    break;
                }
              } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
            }
          }
        } else I1I1iIl.resp_msg ? ["没有抽奖次数"].some(ilIli11I => I1I1iIl.resp_msg.includes(ilIli11I)) ? (console.log("抽奖机会不足"), $.message.insert("抽奖机会不足")) : (["未开始", "结束", "不存在", "不在"].some(llIIi1ll => I1I1iIl.resp_msg.includes(llIIi1ll)) && ($.runEnd = true), console.log(I1111i11 + " " + I1I1iIl.resp_msg), $.message.fix(I1I1iIl.resp_msg)) : console.log("❓" + I1111i11 + " " + JSON.stringify(I1I1iIl));
        break;
    }
  } catch (i1IiIll1) {
    console.log("❌ 未能正确处理 " + I1111i11 + " 请求响应 " + (i1IiIll1.message || i1IiIll1));
  }
}
async function sendRequest(iIIiIiIi) {
  if ($.runEnd || $.outFlag) return;
  let I11iIill = $.newbaseUrl,
    IlI11il = null,
    II1I1lI = null,
    l1I11iIl = null,
    il1IIIlI = "POST";
  switch (iIIiIiIi) {
    case "login":
      I11iIill += "/api/user-info/login", IlI11il = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID,
        "client": "iOS",
        "clientVersion": common.getLatestAppVersion(),
        "osVersion": common.getLatestIOSVersion(),
        "model": "iPhone16,2",
        "userAgent": $.UA
      };
      break;
    case "follow":
      I11iIill += "/api/task/followShop/follow", IlI11il = {};
      break;
    case "initPinToken":
      il1IIIlI = "GET", I11iIill += "/api/user-info/initPinToken", l1I11iIl = {
        "status": "1",
        "activityId": $.activityId,
        "jdToken": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID,
        "clientTime": Date.now(),
        "shopId": $.shopId
      };
      break;
    case "basicInfo":
      I11iIill += "/api/active/basicInfo", IlI11il = {
        "activityId": $.activityId
      };
      break;
    case "getPoints":
      I11iIill += "/api/task/points/getPoints", IlI11il = {};
      break;
    case "getUserId":
      I11iIill += "/api/task/share/getUserId", IlI11il = {};
      break;
    case "jiugongge_activity":
      I11iIill += "/api/task/jiugongge/activity", IlI11il = {
        "activityId": $.activityId
      };
      break;
    case "lotteryCenter_activity":
      I11iIill += "/api/task/lotteryCenter/activity", IlI11il = {
        "activityId": $.activityId
      };
      break;
    case "upperSign_getTask":
      I11iIill += "/api/task/upperSign/getTask", IlI11il = {
        "shareUserId": $.shareUserId || ""
      };
      break;
    case "sign_add":
      I11iIill += "/api/task/sign/add", IlI11il = {};
      break;
    case "toDo":
      I11iIill += "/api/basic/task/toDo", IlI11il = {
        "taskId": $.taskId,
        "skuId": $.skuId
      };
      break;
    case "drawPrize":
      I11iIill += "/api/prize/drawPrize", IlI11il = {};
      break;
    case "draw":
      I11iIill += "/api/prize/draw", IlI11il = {
        "consumePoints": $.consumePoints || 0
      };
      break;
    default:
      console.log("❌ 未知请求 " + iIIiIiIi);
      return;
  }
  const Il1liil1 = il1IIIlI === "POST" && $.pathname.includes("/prod/cc/interactsaas") && wuxianDefense.isDefenseApi(I11iIill.replace($.newbaseUrl, "").split("?")[0]);
  Il1liil1 && (II1I1lI = {
    "ecyText": wuxianDefense.encrypt({
      "actId": $.activityId,
      ...IlI11il
    }, $.pinToken, $.te)
  });
  const illll1i1 = {
    "url": I11iIill,
    "method": il1IIIlI,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": "IsvToken=" + $.jdToken + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "params": l1I11iIl,
    "data": Il1liil1 ? II1I1lI : IlI11il,
    "timeout": 30000
  };
  $.JdEnvInfo && (illll1i1.headers.reserveEnvInfo = $.JdEnvInfo.data, illll1i1.headers.reserveJsVersion = $.JdEnvInfo.version);
  $.token && (illll1i1.headers.token = $.token);
  il1IIIlI === "GET" && (delete illll1i1.data, delete illll1i1.headers["Content-Type"]);
  const lli111il = 3;
  let iiIil1Il = 0,
    l111i1 = null,
    ii1i11lI = false;
  while (iiIil1Il < lli111il) {
    iiIil1Il > 0 && (await $.wait(1000));
    const ilI1i11I = await common.request(illll1i1);
    if (!ilI1i11I.success && ilI1i11I.status !== 555) {
      l111i1 = iIIiIiIi + " 请求失败 ➜ " + ilI1i11I.error;
      if (iIIiIiIi === "toDo") $.doTaskFailed = true;
      iiIil1Il++;
      if (ilI1i11I.status) {
        if (ilI1i11I.status === 500 && Il1liil1) illll1i1.data = {
          "ecyText": wuxianDefense.encrypt({
            "actId": $.activityId,
            ...IlI11il
          }, $.pinToken, $.te)
        };else [403, 493].includes(ilI1i11I.status) && (ii1i11lI = true);
      }
      continue;
    }
    if (!ilI1i11I.data) {
      l111i1 = iIIiIiIi + " 请求失败 ➜ 无响应数据";
      iiIil1Il++;
      Il1liil1 && (illll1i1.data = {
        "ecyText": wuxianDefense.encrypt({
          "actId": $.activityId,
          ...IlI11il
        }, $.pinToken, $.te)
      }, $.needRefreshPinToken = true);
      continue;
    }
    const ii1lIi11 = common.getResponseCookie(ilI1i11I);
    switch (iIIiIiIi) {
      case "initPinToken":
        const ll11iIll = common.getCookieValue(ii1lIi11, "te");
        ll11iIll && ($.te = ll11iIll);
        break;
    }
    $.needRefreshPinToken = false;
    await handleResponse(iIIiIiIi, ilI1i11I.data);
    ii1i11lI = false;
    break;
  }
  iiIil1Il >= lli111il && (console.log(l111i1), ii1i11lI && ($.outFlag = true, $.message && $.message.fix(l111i1)));
}