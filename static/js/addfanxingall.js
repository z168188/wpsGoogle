﻿var jDownload = $('.J_downloadUrlAll');
var commonDown = $('.J_commonDown');

var keyID = Infoc.queryString('keyID') || 90759;
var sfrom = Infoc.queryString('sfrom') || 166;
var pathnameArr = window.location.pathname.split('/');
var pageName = pathnameArr[pathnameArr.length-1].split('.')[0].substring(1).toString();

function checkByRegs (regs, url) {
  if (!url) return false

  for (var i = 0; i < regs.length; i++) {
    if (regs[i].test(url)) {
      return true
    }
  }

  return false
}

function tianjiYM (url) {
  if (url.indexOf('softcdn12.mydown.com') !== -1 || url.indexOf('softcdn122.mydown.com') !== -1) {
    return false
  }
  return true
}

function handleDownloadUrl (url) {
  var domainRegs = [/.+\.mydown\.com$/, /.+\.tianjimedia\.com$/]
  if (checkByRegs(domainRegs, window.location.host) && tianjiYM(url)) {
    var reg = /^([https:|http:]*\/\/)(.*?)(\/.*)/
    var softcdnDomain = 'softcdn12.mydown.com'
    if (url.indexOf('dubapkg.cmcmcdn.com') !== -1) {
      softcdnDomain = 'softcdn12.mydown.com'
    }
    if (url.indexOf('soft-dl.v78q.com') !== -1) {
      softcdnDomain = 'softcdn122.mydown.com'
    }
    return url.replace(reg, function (originUrl, matchA, matchB, matchC) {
      return '//' + softcdnDomain + matchC
    })
  }
  return url
}

var addFanXingAll = {
  bind: function () {
    var self = this;
    // 下载地址，服务端异常时使用拼接地址
    var defaultLink = "//dubapkg.cmcmcdn.com/duba/" + sfrom + "/kinst_" + sfrom + "_f" + pageName + "_k" + keyID + ".exe";
    var channelLink = "//dubapkg.cmcmcdn.com/duba/" + sfrom + "/kinst_" + sfrom + "_f" + pageName + "_k" + keyID + "_ch1.exe";
    var serveKeyWord = '';
    try {
      // 服务端获取下载地址
      var data = JSON.stringify({
          "soft_id": parseInt(pageName), 
          "ch_id": parseInt(sfrom),
          "key_id": parseInt(keyID),
        });
        
      $.ajax({
        url: '//fullstar.zhhainiao.com/inst/dlurls/all/',
        type: 'POST',
        contentType:'application/json',
        data: data,
        timeout: 10000,
        success: function (res) {
          if(res && res.resp_common.ret == 0){
            var urls = res.urls,
                custom = urls.custom;
            if(urls.def && urls.def != ''){
              defaultLink = urls.def;
            }
            if(urls.ch && urls.ch != ''){
              channelLink = urls.ch;
            }

            if(custom.def && custom.def != ''){
              defaultLink = decodeURI(custom.def);
            }
            if(custom.ch && custom.ch != ''){
              channelLink = decodeURI(custom.ch);
            }
            if (res.keyword && res.keyword.word && res.keyword.word != '' ) {
              serveKeyWord = res.keyword.word
            }
          }
        },
        complete: function(xhr){ // 设置按钮下载链接
          self.setDownload(defaultLink, channelLink)
          self.keyWord(serveKeyWord)
        }
      });
    }catch (e) {
      jDownload.attr('href', defaultLink);
      if (channelLink && commonDown.length > 0) {
        commonDown.attr('href', channelLink)
      }
      self.bdVid()
    }
  },
  setDownload: function (defaultLink, channelLink) {
    defaultLink = handleDownloadUrl(defaultLink)
    jDownload.attr('href', defaultLink);
    if (channelLink && commonDown.length > 0) {
      channelLink = handleDownloadUrl(channelLink)
      commonDown.attr('href', channelLink)
    }
    this.bdVid()
  },
  bdVid: function () {
    // ocpc
    if (typeof bdVid != 'undefined' && bdVid !== '') {
      ocpcInfocFun.init()
      bdVidFun.init()
    }
  },
  keyWord: function(serveKeyWord) { // 添加关键词检测展示
    if (serveKeyWord != '' && typeof semTagList !== 'undefined' && semTagList.length > 0){
      for (let i = 0; i < semTagList.length; i++) {
        var ele = semTagList[i];
        if (serveKeyWord.indexOf(ele.mate) > -1){
          $('#J_keyMate .border').html(ele.finalShow)
          $('#J_keyMate .blue').html(ele.finalShowB)
          $('#J_keyMate').show()
          $('#J_card').hide()
          break;
        }
      }
    }
  },
};
addFanXingAll.bind()