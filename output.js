//Wed Oct 09 2024 12:48:34 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
$.version = "v1.0.0";
$.logic = async () => {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.log("活动id不存在");
    $.expire = true;
    return;
  }
  $.UA = $.ua();
  let _0x2084af = await $.isvObfuscator();
  if (_0x2084af.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = _0x2084af?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  if ($.prizeList.length == 0) {
    let _0xea64a6 = await $.api("mc/zeroTrial/wx/getActivityContent?activityId=" + $.activityId + "&pin=" + $.Pin, "");
    $.prizeList = _0xea64a6.data.zeroTrialGoodsOutVOList || [];
    $.actStartTime = _0xea64a6.data.startTime;
    $.actEndTime = _0xea64a6.data.endTime;
  }
  if ($.prizeList.length > 0) {
    let _0x25af07 = $.prizeList[$.random(0, $.prizeList.length - 1)],
      _0x5b9cd7 = await $.api("mc/zeroTrial/wx/applyTrial", "activityId=" + $.activityId + "&pin=" + $.Pin + "&goodsId=" + _0x25af07.goodsId + "&venderId=" + $.venderId + "&nickName=" + encodeURIComponent($.nickname));
    if (_0x5b9cd7.result) $.putMsg(_0x25af07.name), $.addressId = _0x5b9cd7.data, $.prizeName = _0x25af07.name, await $.saveAddress();else {
      $.putMsg(_0x5b9cd7.errorMessage);
      (_0x5b9cd7.errorMessage.includes("未开始") || _0x5b9cd7.errorMessage.includes("结束")) && ($.expire = true);
      return;
    }
  } else {
    $.putMsg("未获取到试用品");
    $.expire = true;
    return;
  }
};
$.after = async () => {
  for (let _0x3b8387 of $.prizeList) {
    $.msg.push(_0x3b8387.name + "，" + _0x3b8387.price + "元，共" + _0x3b8387.sendNum + "份");
  }
  $.msg.push("export M_WX_ZEROTRIAL_URL=\"" + $.activityUrl + "\"");
};
$.run().catch(_0x42dde9 => $.log(_0x42dde9));