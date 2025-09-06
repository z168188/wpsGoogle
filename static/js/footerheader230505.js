$(function(){
  var keyID = Infoc.queryString('keyID') || 90759;
  var sfrom = Infoc.queryString('sfrom') || 206;
  var TFT = Infoc.queryString('TFT') || '1';

  // 头尾
  var logoRecord = {
    headerHtmlAFun: function (link, img) {
      return [
        '<a href="' + link + '" class="logo left" target="_blank">',
        '<img src="' + img + '" alt="" srcset="" style="height: 38px;">',
        '</a>'
      ].join('')
    },
    headerHtmlFun: function (img) {
      return '<img src="' + img + '" alt="" class="left">'
    },
    bind: function(TFT) {
      $.ajax({
        dataType:'json',
        type:'GET',
        url:'//www.ijinshan.com/jsonapi/footer_header.html.json',
        success: function (json) {
          if (json) {
            // 底部处理
            var footerData = json.footer
            var footerRecord = 0
            if (footerData && footerData.length > 0) {
              for (var i = 0; i < footerData.length; i++) {
                var liFooterData = footerData[i]
                if (TFT == liFooterData.title) {
                  footerRecord ++ 
                  var footerHtml = ''
                  if($('#J_seoFooter').length > 0){
                    footerHtml = '<p>' + liFooterData.desc + '</p>'
                    $('#J_seoFooter').html(footerHtml)
                  } else {
                    footerHtml = [
                      '<div id="J_seoFooter">',
                      '<p>' + liFooterData.desc + '</p>',
                      '</div>'
                    ].join('')
                    $('body').append(footerHtml)
                  }
                }
              }
            }
            // 头部处理
            var headerData = json.header
            if (headerData && headerData.length > 0) {
              for (var i = 0; i < headerData.length; i++) {
                var liHeaderData = headerData[i]
                if (TFT == liHeaderData.title) {
                  var headerHtml = ''
                  if($('#J_seoHeader').length > 0) {
                    if (liHeaderData.link) {
                      headerHtml = logoRecord.headerHtmlAFun(liHeaderData.link, liHeaderData.img)
                    } else {
                      headerHtml = logoRecord.headerHtmlFun(liHeaderData.img)
                    }
                    // $('#J_seoHeader').html(headerHtml)
                  } else {

                    headerHtml = [
                      '<div id="J_seoHeader">',
                      logoRecord.headerHtmlAFun(liHeaderData.link, liHeaderData.img),
                      logoRecord.headerHtmlFun(liHeaderData.img),
                      '</div>'
                    ].join('')
                    // $('body').prepend(headerHtml)
                  }
                }
              }
            }
          }
        },
        error: function (error) {
        }
      });
    },
    /* TFT=jisu(极速下载)1
    TFT=tianji(天极传媒)2
    TFT=hainiao(海鸟科技)3
    TFT=blank(空白)4
    TFT=kalina(卡丽纳)5
    TFT=yima(毅马科技)6
    TFT=xingning(煋凝网络)7
    TFT= 或者别的值或者不填(极速下载) */
    init: function () {

      var defintTFTString = 'jisu'
      if (window.location.pathname.indexOf('/shadu/mgr3/') >= 0) {
        TFT = Infoc.queryString('TFT') || '4';
        defintTFTString = 'blank'
      }
      if (TFT === '4') return
      var TFTString
      switch(TFT){
        case '1':
          TFTString = 'jisu'
          break;
        case '2':
          TFTString = 'tianji'
          break;
        case '3':
          TFTString = 'hainiao'
          break;
        case '4':
          TFTString = 'blank'
          break;
        case '5':
          TFTString = 'kalina'
          break;
        case '6':
          TFTString = 'yima'
          break;
        case '7':
          TFTString = 'xingning'
          break;
        default:
          TFTString = defintTFTString
      }
      if (TFTString === 'blank') return
      this.bind(TFTString)
    }
  };
  var headerRight = {
    execute: function () {
      var searchWord = $.trim($('#J_search').val());
      if (searchWord && searchWord.length > 0) {
        var url = '/footerHeaderSearchResult.html?keyID=' + keyID + '&sfrom=' + sfrom + '&TFT=' + TFT + '&word=' + searchWord + '';
        window.open(url, "_blank");     
      }
    },
    setSortData: function () {
      var navData = [{
        name: '装机必备',
        id: '399'
      }, {
        name: '社交软件',
        id: '13'
      }, {
        name: '图片软件',
        id: '29'
      }, {
        name: '音乐软件',
        id: '21'
      }, {
        name: '网盘推荐',
        id: '734'
      }]
      var navHtml = ''
      for (let i = 0; i < navData.length; i++) {
        const ele = navData[i];
        navHtml += '<a href="/many/f' + ele.id + '.html?sfrom=166&DTS=1&keyID=91640&TFT=' + TFT + '" target="_blank" class="nav-item">' + ele.name + '</a>'
      }
      $('#J_navList').html(navHtml);
    },
    init: function () {
      if (TFT == 1 || TFT == 2) {
        headerRight.setSortData()

        $('#J_headerRightLogo').hide()
        $('#J_navSearch').show()
        
        $('#J_searchBtn').click(function () {
          headerRight.execute()
        });
        $('#J_search').keypress(function (event) {
          if (event.keyCode == 13) {
            headerRight.execute();
          }
        });
        
      } else {
        $('#J_navSearch').hide()
        $('#J_headerRightLogo').show()
      }
    },
  }
  logoRecord.init()
  headerRight.init()
})