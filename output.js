//Wed Oct 09 2024 12:50:17 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
$.activityUrl = "https://lzdz1-isv.isvjd.com/m/707261/dza2d3c5aac6d64cdfa884e3f117bf/?adsource=others&sid=cc7675f19a23651653bb8d4ce1be9d5w&un_area=19_1607_4773_62127";
mode && ($.activityUrl = "https://lzdz1-isv.isvjd.com/m/707261/dza2d3c5aac6d64cdfa884e3f117bf/?adsource=others&sid=cc7675f19a23651653bb8d4ce1be9d5w&un_area=19_1607_4773_62127");
$.domain = $.activityUrl.match(/https?:\/\/([^/]+)/) && $.activityUrl.match(/https?:\/\/([^/]+)/)[1] || "";
$.activityId = $.match(/\/(dz[a-zA-Z0-9]{28,32})/, $.activityUrl) || $.getQueryString($.activityUrl, "activityId");
$.venderId = $.match(/\/m\/(\d+)\//, $.activityUrl) || $.getQueryString($.activityUrl, "venderId");
$.log("活动id: " + $.activityId + " 活动url: " + $.activityUrl);
let answerMap = new Map();
$.version = "v1.1.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let lllliIl1 = await $.isvObfuscator();
  if (lllliIl1.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = lllliIl1?.["token"];
  await $.getMyPing("customer/getMyCidPing");
  if (!$.Pin) {
    return;
  }
  await $.api("wxCommonInfo/token", "");
  await $.api("wxCommonInfo/getSystemConfigForNew", "activityId=" + $.activityId + "&activityType=99&pin=" + $.Pin);
  await $.api("common/" + ($.domain.includes("cjhy") ? "accessLog" : "accessLogWithAD"), "venderId=" + $.venderId + "&code=99&pin=" + $.Pin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=");
  let ii111Ill = encodeURIComponent($.nickname);
  await $.api("/dingzhi/taskact/common/init", "activityId=" + $.activityId + "&pin=" + $.Pin + "&dzActivityType=0");
  let i1I11lli = await $.api("/dingzhi/snapdragon/superbrandday/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&pinImg=" + $.touxiang + "&nick=" + ii111Ill + "&shareUuid=");
  $.actorUuid = i1I11lli.data.actorUuid;
  !i1I11lli.data.improveStatus && (await $.api("/dingzhi/snapdragon/superbrandday/improve", "activityId=" + $.activityId + "&pin=" + $.Pin + "&actorUuid=" + $.actorUuid));
  if (i1I11lli.data.answerStatus) {
    $.log("已经没有答题机会");
    return;
  }
  if (!i1I11lli.data.openCard) {
    await $.openCard();
    await $.wait(3000, 5000);
  }
  await $.api("/dingzhi/taskact/common/drawContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
  for (let IiIIiiIi = 0; IiIIiiIi < 5; IiIIiiIi++) {
    let IIilii1l = await $.api("/dingzhi/snapdragon/superbrandday/getQuestionList", "activityId=" + $.activityId + "&pin=" + $.Pin + "&actorUuid=" + $.actorUuid);
    if (IIilii1l.result) {
      if (!answerMap.size) {
        let l11lllI = await $.request("http://" + (mode ? "127.0.0.1" : "119.91.23.232") + ":7705/answer_list", {
          "Cookie": "123"
        });
        if (l11lllI.status === 200) {
          answerMap = new Map(Object.entries(l11lllI.data.data));
        }
      }
      for (let iIiili11 = 0; iIiili11 < IIilii1l.data.questionList.length; iIiili11++) {
        let ilIIIiIl = iIiili11 + 1,
          liil1Il = IIilii1l.data.questionList[iIiili11].questionId + "",
          l11iIll = IIilii1l.data.questionList[iIiili11].content + "",
          Il1IliI = IIilii1l.data.questionList[iIiili11].choiceA + "",
          lilIiii1 = IIilii1l.data.questionList[iIiili11].choiceB + "",
          IiiiiilI = answerMap.get(liil1Il) ? answerMap.get(liil1Il) : "B",
          il11IlI1 = await $.api("/dingzhi/snapdragon/superbrandday/answerQuestion", "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + $.Pin + "&index=" + ilIIIiIl + "&questionId=" + liil1Il + "&answer=" + IiiiiilI);
        await $.wait(2000, 4000);
        if (il11IlI1.data?.["booAnswer"]) {
          $.log(" " + liil1Il + " " + IiiiiilI + " " + l11iIll + " A:" + Il1IliI + " B:" + lilIiii1 + " 答对了");
          !answerMap.get(liil1Il) && (await $.request("http://" + (mode ? "127.0.0.1" : "119.91.23.232") + ":7705/update_answer", {
            "Cookie": "123"
          }, {
            "k": liil1Il,
            "v": IiiiiilI
          }), answerMap.set(liil1Il, IiiiiilI));
        } else $.log(" " + liil1Il + " " + IiiiiilI + " " + l11iIll + "  A:" + Il1IliI + " B:" + lilIiii1 + " 答错了"), await $.request("http://" + (mode ? "127.0.0.1" : "119.91.23.232") + ":7705/update_answer", {
          "Cookie": "123"
        }, {
          "k": liil1Il,
          "v": IiiiiilI === "A" ? "B" : "A"
        }), answerMap.set(liil1Il, IiiiiilI === "A" ? "B" : "A");
        if (il11IlI1.data?.["score"] > 0) for (let I1Ii11Ii = 0; I1Ii11Ii < 5; I1Ii11Ii++) {
          let IIli1iI = await $.api("/dingzhi/snapdragon/superbrandday/draw", "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + $.Pin);
          $.log(IIli1iI);
          if (IIli1iI.result) {
            if (IIli1iI.data.wdsrvo.drawOk) {
              $.putMsg(IIli1iI.data.wdsrvo.name);
            }
            break;
          } else {
            if (IIli1iI.errorMessage.includes("稍后再试")) {
              $.log(IIli1iI.errorMessage);
              continue;
            } else {
              $.log(IIli1iI.errorMessage);
              break;
            }
          }
        }
      }
      break;
    } else {
      if (IIilii1l.errorMessage.includes("稍后再试")) {
        $.log(IIilii1l.errorMessage);
        continue;
      } else {
        $.log(IIilii1l.errorMessage);
        break;
      }
    }
  }
};