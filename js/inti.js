
// グローバル変数
// インフォメーション・多国語文書
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

// グラフデータの実態
    var chart_ad;
    var chart_err;
    var chart_batt_pas;
    var chart_charg_observ;
    var chart_charg_result;
    var chart_charg_observ;
    var chart_mppt_pas;
    var chart_sw_pas;
    var chart_sndac_pas;
    var chart_pv_pas;


// グローバル関数

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





// PV画面
$(function(){
    var chart_iv;
    var pv_series = 5;
    var pc_parallel = 5;

    var i;

　　　　　// アイコンクリック
    $('#pv_icon').click(function() {
        close_page();
        $('#pv-area').css('z-index', '17');
        open_page();
        $("#pv_add_s").val( pv_series );
        $("#pv_add_p").val( pc_parallel );
        pv_si_pr_disp();

//        setTimeout(function(){
//            draw_chart_iv();
//            draw_pv_passage();
//        },1000);
    });

　　　　　// シリアル・パラレル変更時
    $('#pv_add_s').change(function() {
        pv_series   = $("#pv_add_s").val();
        pv_si_pr_disp();
    });
    $('#pv_add_s').click(function() {
        pv_series   = $("#pv_add_s").val();
        pv_si_pr_disp();
    });
    $('#pv_add_p').change(function() {
        pc_parallel = $("#pv_add_p").val();
        pv_si_pr_disp();
    });
    $('#pv_add_p').click(function() {
        pc_parallel = $("#pv_add_p").val();
        pv_si_pr_disp();
    });



    function pv_si_pr_disp() {
        for( i = 10 ; i > 0 ; i--){
            if( pc_parallel >= i ){
                $('#serial_parallel-area > div:nth-child('+ i + ')')
                    .css('display','flex');
            }else{
                $('#serial_parallel-area > div:nth-child('+ i + ')')
                    .css('display','none');
            }
            if( pv_series >= i ){
                $('#serial_parallel-area > div > div:nth-child('+ (2*i) + ')')
                    .css('display','block');
                $('#serial_parallel-area > div > div:nth-child('+ (2*i-1)+ ')')
                    .css('display','block');
            }else{
                $('#serial_parallel-area > div > div:nth-child('+ (2*i) + ')')
                    .css('display','none');
                $('#serial_parallel-area > div > div:nth-child('+ (2*i-1)+ ')')
                    .css('display','none');
            }
        }
    };

});



//
//  ホーム画面
//



//  ホーム画面のドーナッツチャートプログラム


$(function () {

    setInterval(function(){
        var val = 70 + (Math.round( Math.random()*60) - 30);
        $('#chart_outlet .set-percent').text( val );
        $('#chart_outlet .show-number').text( val );
        val = 30 + (Math.round( Math.random()*60) - 30);
        $('#chart_charg .set-percent').text( val );
        $('#chart_charg .show-number').text( val );
        val = 50 + (Math.round( Math.random()*60) - 30);
        $('#chart_solar .set-percent').text( val );
        $('#chart_solar .show-number').text( val );
        home_charts();
    },3000);



    // home_charts を表示
    function home_charts() {

        var $content = $('#chart-area'),
            $charts = $content.find('.chart');
        // 円チャートごとの処理
        $charts.each(function(){
            var deg,degRight, degLeft;
            var $chart = $(this),
                // 「マスク」を保存
                $circleLeft = $chart.find('.left .circle-mask-inner')
                    .css({ transform: 'rotate(' + degLeft + 'deg)' }),
                $circleRight = $chart.find('.right .circle-mask-inner')
                    .css({ transform: 'rotate(' + degRight + 'deg)' }),
                // パーセンテージ値を取得
                $percentNumber = $chart.find('.percent-number'),
                percentData = $percentNumber.text(),
                $setPercent = $chart.find('.set-percent'),
                setData = $setPercent.text();
            // 角度のアニメーション
            $({ percent: $percentNumber.text() })
                     .delay(100).animate({ percent: setData }, {
                duration: 1500, 
                progress: function () {
                    var now = this.percent,
                    deg = now * 360 / 100;
                    degRight = Math.min(Math.max(deg, 0), 180);
                    degLeft  = Math.min(Math.max(deg - 180, 0), 180);
                    $circleRight.css({ transform: 'rotate(' + degRight + 'deg)' });
                    $circleLeft.css({ transform: 'rotate(' + degLeft + 'deg)' });
                    $percentNumber.text(Math.floor(now));
                }
            });
        });
    }
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


});






/****
     スケジュール処理
                         ****/

$(function() {
    $('#schedule_save').click(function() {
        $('#sch1').css('grid-column', '200 / span 400');

    });

    $("#schedule").click(function(e){
//        console.log(e.target.className);
        if(e.target.className.match(/empty/)){
            add_schedule( e.target.className );
//            alert(e.target.className);
        }
    });



/* ここから、ポップアップのスクリプト */

    function add_schedule( set_cls ) {

        $('#add_schedule-area').css('z-index', '18');
        if(set_cls.match(/ac1/)){
          $('#add_schedule-area .driven_ac1')
              .css('left', 'calc(50% - 62px)');
        }
        if(set_cls.match(/inv/)){
          $('#add_schedule-area .driven_inverter')
              .css('left', 'calc(50% - 62px)');
        }
        if(set_cls.match(/chg/)){
          $('#add_schedule-area .driven_charger')
              .css('left', 'calc(50% - 62px)');
        }
        if(set_cls.match(/usb/)){
          $('#add_schedule-area .driven_usb')
              .css('left', 'calc(50% - 62px)');
        }
    };

  $('#add_schedule-area .complet').click(function(e) {
    var kind, low_am;
    if(e.target.className.match(/ac1/)){
      kind = 'ac1';
      area = '.driven_ac1';
      low_am = 4;
      low_pm = 11;
    }
    if(e.target.className.match(/inv/)){
      kind = 'inv';
      area = '.driven_inverter';
      low_am = 5;
      low_pm = 12;
    }
    if(e.target.className.match(/chg/)){
      kind = 'chg';
      area = '.driven_charger';
      low_am = 6;
      low_pm = 13;
    }
    if(e.target.className.match(/usb/)){
      kind = 'usb';
      area = '.driven_usb';
      low_am = 7;
      low_pm = 14;
    }

//        console.log(e.target.className);
    var op_time = $('#add_schedule-area '+area+' input.opening_time').val(),
        cl_time = $('#add_schedule-area '+area+' input.closing_time').val();
    op_time = op_time.replace(":", "");
    cl_time = cl_time.replace(":", "");

    var terget = new_schedule( op_time, kind );


    $( terget ).ready(function() {
      $(terget).data('op_time', op_time);
      $(terget).data('cl_time', cl_time);
  // ここから表示
      if( op_time < 1200 ){
        $(terget).css('grid-row', low_am + ' / span 1');
        if( cl_time <= 1200 ){
          new_bar( terget, op_time, cl_time );
        } else {
          new_bar( terget, op_time, '1200' );
          terget = new_schedule( op_time + '_2nd', kind );
          $(terget).css('grid-row', low_pm + ' / span 1');
          cl_time -= 1200;
          new_bar( terget, '0', cl_time );
        }
      } else {
        op_time -= 1200;
        cl_time -= 1200;
        $(terget).css('grid-row', low_pm + ' / span 1');
        new_bar( terget, op_time, cl_time );
      }
    });

  //ポップアップを閉じる
    $('#add_schedule-area > div').css('left', '-280px');
    setTimeout(function(){
      $('#add_schedule-area').css('z-index', '1');
    },400);
  });

  $('#add_schedule-area .delet').click(function() {
    $('#add_schedule-area > div').css('left', '-280px');
    setTimeout(function(){
      $('#add_schedule-area').css('z-index', '1');
    },400);
  });

  $('#add_schedule-area .cancell').click(function() {
    $('#add_schedule-area > div').css('left', '-280px');
    setTimeout(function(){
      $('#add_schedule-area').css('z-index', '1');
    },400);
  });




  function new_schedule( op_time, kind ) {
    var new_schedule = '<div class="filled '+ kind +' '+ op_time +'"></div>';
    $('#schedule .empty.usb-2').after(new_schedule);
    return ('#schedule .' + op_time + '.' + kind);
  };

  function new_bar( terget, op_time, cl_time ) {
      $(terget).css('background-color', '#ecc');
      var op_glid = (op_time / 100)*60+(op_time % 100),
          cl_glid = ((cl_time / 100)*60+(cl_time % 100)) - op_glid;
      $(terget).css('grid-column', (op_glid + 5) + '/ span '+ cl_glid);
  };
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




    var rdm;

    var columns_ad = [
                ['x1'],
                ['input_value'],
                ['measured_value']
            ]
    var columns_err = [
                ['x2'],
                ['Err'],
            ]


    $('#add_point-btn').click(function() {
        var set_bal = parseInt($('#new_point input').val());
        if(!isNaN(set_bal)){
            columns_ad[0].push(set_bal);
            columns_ad[1].push(set_bal);
            columns_err[0].push(set_bal);

            rdm = Math.random() * 11;
            rdm += parseInt($('#new_point input').val())-5;
            columns_ad[2].push(rdm);

            rdm -= set_bal;
            columns_err[1].push(rdm);

            chart_ad.load({
                columns: columns_ad
            });
            chart_err.load({
                columns: columns_err
            });
        }
    });







});





