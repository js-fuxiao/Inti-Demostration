

  var inti_info;
  var h_login_info;
  var h_log_info;
  var hc_outlet_info;
  var hc_charg_info;
  var hc_solar_info;
  var hi_battery_info;
  var hi_net_info;
  var hi_pv_info;
  var hi_ac_info;
  var hi_remote_info;
  var hi_switching_info;
  var hi_outlet_info;
  var hi_usb_info;
  var hi_charge_info;
  var hi_inverter_info;
  var hi_mppt_info;
  var hi_db_info;
  var hi_schedule_info;
  var hi_special_info;
  var h_language_info;





$(function(){


   // ブラウザ言語の取得
  function browserLanguage() {
    try {
      return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2)
    }
    catch(e) {
      return undefined;
    }
  }

    var language = browserLanguage();
  if (browserLanguage().indexOf("ja") != -1) {
    load_japanise();
    $("#operation-language > select").val("Japanise");
  }
  else if (browserLanguage().indexOf("zh") != -1) {
    load_chinese();
    $("#operation-language > select").val("Chinese");
  }
  else if (browserLanguage().indexOf("cn") != -1) {
    load_chinese();
    $("#operation-language > select").val("Chinese");
  } else {
    load_english();
    $("#operation-language > select").val("English");
  }


//  var lang = browserLanguage();

// alert(lang);

//  load_japanise();

  $('#operation-language > select').change(function() {

    var language = $('#operation-language > select').val();

    switch( language ){
      case 'Japanise':
        load_japanise();
        break;
      case 'English':
        load_english();
        break;
      case 'Chinese':
        load_chinese();
        break;
    }
  });


   h_language_info =(function(param){return param[0].replace(/\n|\r/g,"");})
/*--------------------- HTML ---------------------*/`
<dl id="info_inti">
  <dt>使用言語指定</dt>
  <dd>使用する言語を選択してください
  </dd>
</dl>
`;/*------------------------------------------------*/

  $('#explanation > div').html(inti_info);

  $('#login-start').hover(function() {
    $('#explanation > div').html(h_login_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#operation-language').hover(function() {
    $('#explanation > div').html(h_language_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#log-area').hover(function() {
    $('#explanation > div').html(h_log_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#chart_outlet').hover(function() {
    $('#explanation > div').html(hc_outlet_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#chart_charg').hover(function() {
    $('#explanation > div').html(hc_charg_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#chart_solar').hover(function() {
    $('#explanation > div').html(hc_solar_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#battery_icon').hover(function() {
    $('#explanation > div').html(hi_battery_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#inet_icon').hover(function() {
    $('#explanation > div').html(hi_net_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#pv_icon').hover(function() {
    $('#explanation > div').html(hi_pv_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#ac_icon').hover(function() {
    $('#explanation > div').html(hi_ac_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#remote_icon').hover(function() {
    $('#explanation > div').html(hi_remote_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#switching_icon').hover(function() {
    $('#explanation > div').html(hi_switching_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#outlet_icon').hover(function() {
    $('#explanation > div').html(hi_outlet_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#usb_icon').hover(function() {
    $('#explanation > div').html(hi_usb_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#charger_icon').hover(function() {
    $('#explanation > div').html(hi_charge_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#inverter_icon').hover(function() {
    $('#explanation > div').html(hi_inverter_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#mppt_icon').hover(function() {
    $('#explanation > div').html(hi_mppt_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#db_icon').hover(function() {
    $('#explanation > div').html(hi_db_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#schedule_icon').hover(function() {
    $('#explanation > div').html(hi_schedule_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });

  $('#special_icon').hover(function() {
    $('#explanation > div').html(hi_special_info);
  }, function() {
    $('#explanation > div').html(inti_info);
  });
});
















// アイコンのリンク処理
$(function(){
  $('.jump').click(function() {
    window.location.href = $(this).attr('href');
    return false;
  });

  $('.make_actib').click(function() {
    $(this).addClass('active');
  });

  $('.lost_actib').click(function() {
    $(this).removeClass('active');
  });

  $('.togg_actib').click(function() {
    $(this).toggleClass('active');
  });


/* アイコンクリック動作 */

  $('#schedule_icon').click(function() {
    close_page();
    $('#schedule-area').css('z-index', '17');
    open_page();
  });

  $('#inet_icon').click(function() {
    close_page();
    $('#net-area').css('z-index', '17');
    open_page();
  });

  $('#pv_icon').click(function() {
    close_page();
    $('#pv-area').css('z-index', '17');
    open_page();
  });

  $('#switching_icon').click(function() {
    close_page();
    $('#switch-area').css('z-index', '17');
    open_page();
  });

  $('#charger_icon').click(function() {
    close_page();
    $('#charger-area').css('z-index', '17');
    open_page();
  });

  $('#mppt_icon').click(function() {
    close_page();
    $('#mppt-area').css('z-index', '17');
    open_page();
  });

  $('#battery_icon').click(function() {
    close_page();
    $('#battery-area').css('z-index', '17');
    open_page();
  });

  $('#outlet_icon').click(function() {
    close_page();
    $('#snd_ac-area').css('z-index', '17');
    open_page();
  });

  $('#inverter_icon').click(function() {
    close_page();
    $('#snd_ac-area').css('z-index', '17');
    open_page();
  });

  $('#special_icon').click(function() {
    close_page();
    $('#ad-area').css('z-index', '17');
    open_page();
  });


  $('#go-home').click(function() {
    $('#chart-area').css('left', '0');
    $('#diagram-area').css('right', '0');
    $('#operation-others').css('top', '100%');
    $('#log').css('bottom', '0');
  });


  function open_page() {
    $('#chart-area').css('left', '-200px');
    $('#diagram-area').css('right', '-100vw');
    $('#operation-others').css('top', '0');
    $('#log').css('bottom', '-100%');
  };

  function close_page() {
    $('#schedule-area').css('z-index', '16');
    $('#net-area').css('z-index', '16');
    $('#pv-area').css('z-index', '16');
    $('#switch-area').css('z-index', '16');
    $('#charger-area').css('z-index', '16');
    $('#mppt-area').css('z-index', '16');
    $('#battery-area').css('z-index', '16');
    $('#snd_ac-area').css('z-index', '16');
    $('#ad-area').css('z-index', '16');
  };
});






/****
     スケジュール処理
                         ****/

$(function() {
  $('#schedule_save').click(function() {
    $('#sch1').css('grid-column', '200 / span 400');

  });
});

$(function(){

	jQuery("#schedule").click(function(e){
		alert(e.target.id);
		alert(e.target.className);
	});
});




/* ここから、ポップアップ(sign in)のスクリプト */
$(function() {
  $('#login-start').click(function() {
    $('#login').css('visibility', 'visible');
    $('#login').css('top',   '0');
    $('#all_overlay').css('opacity', 1);
  });
});

$(function() {
  $('#btn-login, #btn-cancel').click(function() {
// alert('アラートでたよ！');
    $('#login').css('top', '-100%');
    $('#all_overlay').css('opacity', 0);
  });
});


/* ここから、ログページのスクリプト */
$(function() {
  $('#log').click(function() {
    $('#log-page').css('bottom', '0');
    $('#log-page').css('right',   '0');
    $('#log').css('bottom', '-100%');
  });
});

$(function() {
  $('#log-page > div').click(function() {
    $('#log-page').css('bottom', '-95vh');
    $('#log-page').css('right',   '-85vw');
    $('#log').css('bottom', '0');
  });
});




/* A/D調整ポイント追加ポップアップのスクリプト */
$(function() {
  $('#ad_addition').click(function() {
    $('#add_point-area').css('z-index', '18');
    $('#add_point-area > div').css('left', 'calc(50% - 62px)');
    $('#add_adpoint').val('');
    setTimeout(function(){
      $('#add_adpoint').focus();
    },700);
  });


  $("#add_adpoint").keypress(function(e){
    if(e.which == 13){
      $("#add_point-btn").click();
    }
  });


  $('#add_point-btn').click(function() {
    $('#add_point-area > div').css('left', '-280px');
    $('input').focus();
    setTimeout(function(){
      $('#add_point-area').css('z-index', '1');
    },400);
  });
});





/* インフォメーション処理のスクリプト */



