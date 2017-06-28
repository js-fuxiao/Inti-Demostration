
/* レイアウト（画面サイズ）関係
=================================================================== */
function heightSetting(){
  var h = $(window).height();  // 画面全体の高さ
  var w = $(window).width();   // 画面全体の幅
  var mh;
  var mw;
// まずmain (動的部分のコンテナ) の高さを計算
// 全体から topnav header footer の 30,90,30px
// を引く 30+90+30=150px
  mh = h-150
  $('#main').css({height: mh+'px'});
// accordion の高さ計算
// main から更に sideber-header sideber-footter の
// 50,30px を引く 150+50+30 = 230px
        mh = h-230
    $('#accordion').css({height: mh+'px'});
// equipment の高さを計算
// main から更に graph の 30px を引く
// 150+30=180px
        mh = h-180
    $('.equipment').css({height: mh+'px'});
// variously の高さ計算
// equipment から更に equipment-heraer の 120px を引く
// 180+120=300px
//        mh = h-300
//    $('#variously').css({height: mh+'px'});

// main は auto なので、まず contents から幅を計算
// 全体から sidebar の 250px を引く
        mw = w-250
    $('#contents').css({width: mw+'px'});

// graph-i-v （PVのV-I曲線グラフ） の幅計を計算
// contents から更に mini-panel と panel-established の
// 200,200 更にマージン 10px 10pxを引く
// 250+200+200+10=670px
// ※ 合わない　疑問
        mw = w-680
    $('#graph-i-v').css({width: mw+'px'});
}

// 画面サイズが変更された場合、サイズ計算を行う
$(window).resize(function() {
  heightSetting();
});
// 立ち上げ後、画面サイズ計算を行う
$(function () {
  heightSetting();
});




/* アコーディオンタイプ、ナビゲーション
=================================================================== */

// 起動度 ACCORDION ナビゲーションがクリックされると起動
$(function() {
    $("#accordion .navi a").click(accordion);
});

// クリックされた部分のアクティブをトグルで反転
// クリックされた以外の項目を含めて、300mSのアニメーションで開閉
function accordion() {
  $(this).toggleClass("active").next().slideToggle(300);
}

// 目的画面の初期処理
// 一旦、全て消して、最初の画面を表示
$(function(){
  $('.equipment').hide();   // 全部消す
  $('.navi').removeClass('choice');
  $('.variously').hide();   // 全部消す
  $('.navi ul li a').removeClass('choice');

  $('#pv-charger').show();   // 指定箇所のみ表示

  var target = $('.navi').eq(3);  // 3番目（MPPT)を指定
  $(target).addClass('choice');


  $('#photovoltaics-panel').show();   // 指定箇所をチョイス状態に
  $(target).children('ul').find('a').eq(0).addClass('choice');

// 画面指定項目をクリックした時の処理
  $(".navi ul li a").on('click', function(sel) {  // クリックされた時
    sel.preventDefault();           // 元々の機能をキャンセルし
    var target = $(this).attr('href');  // 指定されたIDが存在するかどうか調べ
    if(! $(target).length) return false; // 存在しなければ終了

    if($(this).hasClass('choice')) return; // 元々チョイスされている場所なら終了

    if(! $(this).parents('.navi').hasClass('choice')){ // チョイスされている場所を探す
      var parts = $(this).parents('.navi').find('a').attr('href');
      if(! $(parts).length) return false; // チョイスされていなければ終了
 
      $('.navi').removeClass('choice'); // チョイスされている場所をクリア
      $(this).parents('.navi').addClass('choice'); // クリックされた場所をチョイスする
      $('.equipment').hide(); // 一旦、全ての装置画面を消す
      $(parts).show();  // クリックされた装置画面を表示する
    }


    $('.variously').hide(); // 全ての項目画面を消す
    $(target).show();  // クリックされた項目画面を表示

    $('.navi ul li a').removeClass('choice'); // ナビゲーションのチョイスを全て消す
    $(this).addClass('choice'); // クリックされた場所をチョイス済みにする
  });
});



/* ラジオボタン
=================================================================== */
$(function(){
  var radio = $('div.radio-group');
  $('input', radio).css({'opacity': '0'})
  //checkedだったら最初からチェックする
  .each(function(){
    if ($(this).attr('checked') == 'checked') {
      $(this).next().addClass('checked');
    }
  });
  //クリックした要素にクラス割り当てる
  $('label', radio).click(function() {
    $(this).parent().parent().each(function() {
      $('label',this).removeClass('checked');	
    });
    $(this).addClass('checked');
  });
});


/* Ajax による通信処理
=================================================================== */

// 0.5秒に１度、inti にアクセスさせる
$(function(){
  indication();
  setInterval("indication()", 500);
});

// Ajax で XML データーを取得する
// 成功すれば inti_info の中にデーターを入れて、replace(inti_info); を呼び出す
function indication(){
  $.ajax({
    url: 'cgi/Inti_info.cgi',
    type: 'GET',
    dataType:'xml',
    success: function(inti_info) { replace(inti_info); },
//    error: function(inti_info) { alert('error!!!'); }
//    error: function(data) {  console.log('error!!!'); }
  });
}
/*
function indication(){
  $.ajax({
    url: 'cgi-bin/Inti_info.cgi',
    type: 'GET',
    dataType:'xml',
  }).done(function(data){
    replace(data);
  }).fail(function(data){
    alert('error!!!');
  });
}
*/

function replace(inti_info){
// 表示のためのターゲットクラス、IDの配列を宣言
// インバーター
// istat
  var istat       = [ '.istat_d',       '.istat_v'];
// imon
  var imon_acv    = [ '.imon_acv_d',  '.imon_acv_v'  ];
  var imon_aci    = [ '.imon_aci_d',  '.imon_aci_v'  ];
  var imon_batv   = [ '.imon_batv_d', '.imon_batv_v' ];
  var imon_bati   = [ '.imon_bati_d', '.imon_bati_v' ];
  var imon_hv     = [ '.imon_hv_d',   '.imon_hv_v'   ];

  var iprm_acv_g  = [ '.iprm_acv_g_d',  '.iprm_acv_g_v'  ];
  var iprm_acv_o  = [ '.iprm_acv_o_d',  '.iprm_acv_o_v'  ];
  var iprm_aci_g  = [ '.iprm_aci_g_d',  '.iprm_aci_g_v'  ];
  var iprm_aci_o  = [ '.iprm_aci_o_d',  '.iprm_aci_o_v'  ];
  var iprm_batv_g = [ '.iprm_batv_g_d', '.iprm_batv_g_v' ];
  var iprm_batv_o = [ '.iprm_batv_o_d', '.iprm_batv_o_v' ];
  var iprm_bati_g = [ '.iprm_bati_g_d', '.iprm_bati_g_v' ];
  var iprm_bati_o = [ '.iprm_bati_o_d', '.iprm_bati_o_v' ];
  var iprm_hv_g   = [ '.iprm_hv_g_d',   '.iprm_hv_g_v'   ];
  var iprm_hv_o   = [ '.iprm_hv_o_d',   '.iprm_hv_o_v'   ];

// 太陽光発電 MPPT チャージコントローラー
// scan
  var scan        = [ '.scan_d',        '.scan_v'];
// scnexe
  var scnexe      = [ '.scnexe_d',      '.scnexe_v'];
// mstat
  var mstat       = [ '.mstat_d',       '.mstat_v'];
// mmon
  var mmon_pvv    = [ '.mmon_pvv_d',    '.mmon_pvv_v' ];
  var mmon_pvi    = [ '.mmon_pvi_d',    '.mmon_pvi_v' ];
  var mmon_batv   = [ '.mmon_batv_d',   '.mmon_batv_v' ];
  var mmon_bati   = [ '.mmon_bati_d',   '.mmon_bati_v' ];
  var mmon_temp   = [ '.mmon_temp_d',   '.mmon_temp_v' ];
  var mmon_load   = [ '.mmon_load_d',   '.mmon_load_v' ];
// mprm
  var mprm_pvv_g =  [ '.mprm_pvv_g_d',  '.mprm_pvv_g_v' ];
  var mprm_pvv_o =  [ '.mprm_pvv_o_d',  '.mprm_pvv_o_v' ];
  var mprm_pvi_g =  [ '.mprm_pvi_g_d',  '.mprm_pvi_g_v' ];
  var mprm_pvi_o =  [ '.mprm_pvi_o_d',  '.mprm_pvi_o_v' ];
  var mprm_batv_g = [ '.mprm_batv_g_d', '.mprm_batv_g_v' ];
  var mprm_batv_o = [ '.mprm_batv_o_d', '.mprm_batv_o_v' ];
  var mprm_bati_g = [ '.mprm_bati_g_d', '.mprm_bati_g_v' ];
  var mprm_bati_o = [ '.mprm_bati_o_d', '.mprm_bati_o_v' ];
  var mprm_temp_g = [ '.mprm_temp_g_d', '.mprm_temp_g_v' ];
  var mprm_temp_o = [ '.mprm_temp_o_d', '.mprm_temp_o_v' ];
  var mprm_load_g = [ '.mprm_load_g_d', '.mprm_load_g_v' ];
  var mprm_load_o = [ '.mprm_load_o_d', '.mprm_load_o_v' ];
// mbat
  var mbat        = [ '.mbat_d',        '.mbat_v' ];
// mubat
  var mubat       = [ '.mubat_d',       '.mubat_v' ];
// mbtspc
  var mbtspc1_max = [ '.mbtspc1_max_d', '.mbtspc1_max_v' ];
  var mbtspc1_up  = [ '.mbtspc1_up_d',  '.mbtspc1_up_v' ];
  var mbtspc1_low = [ '.mbtspc1_low_d', '.mbtspc1_low_v' ];
  var mbtspc1_min = [ '.mbtspc1_min_d', '.mbtspc1_min_v' ];
  var mbtspc1_imax= [ '.mbtspc1_imax_d','.mbtspc1_imax_v' ];
  var mbtspc2_max = [ '.mbtspc2_max_d', '.mbtspc2_max_v' ];
  var mbtspc2_up  = [ '.mbtspc2_up_d',  '.mbtspc2_up_v' ];
  var mbtspc2_low = [ '.mbtspc2_low_d', '.mbtspc2_low_v' ];
  var mbtspc2_min = [ '.mbtspc2_min_d', '.mbtspc2_min_v' ];
  var mbtspc2_imax= [ '.mbtspc2_imax_d','.mbtspc2_imax_v' ];
  var mbtspc3_max = [ '.mbtspc3_max_d', '.mbtspc3_max_v' ];
  var mbtspc3_up  = [ '.mbtspc3_up_d',  '.mbtspc3_up_v' ];
  var mbtspc3_low = [ '.mbtspc3_low_d', '.mbtspc3_low_v' ];
  var mbtspc3_min = [ '.mbtspc3_min_d', '.mbtspc3_min_v' ];
  var mbtspc3_imax= [ '.mbtspc3_imax_d','.mbtspc3_imax_v' ];
  var mbtspc4_max = [ '.mbtspc4_max_d', '.mbtspc4_max_v' ];
  var mbtspc4_up  = [ '.mbtspc4_up_d',  '.mbtspc4_up_v' ];
  var mbtspc4_low = [ '.mbtspc4_low_d', '.mbtspc4_low_v' ];
  var mbtspc4_min = [ '.mbtspc4_min_d', '.mbtspc4_min_v' ];
  var mbtspc4_imax= [ '.mbtspc4_imax_d','.mbtspc4_imax_v' ];
// mlmt
  var mlmt_pvv    = [ '.mlmt_pvv_d',  '.mlmt_pvv_v' ];
  var mlmt_pvi    = [ '.mlmt_pvi_d',  '.mlmt_pvi_v' ];
  var mlmt_batv   = [ '.mlmt_batv_d', '.mlmt_batv_v' ];
  var mlmt_bati   = [ '.mlmt_bati_d', '.mlmt_bati_v' ];
  var mlmt_load   = [ '.mlmt_load_d', '.mlmt_load_v' ];
// mmod
  var mmod        = [ '.mmod_d',  '.mmod_v' ];
// mload
  var mload       = [ '.mload_d', '.mload_v' ];
// mlotim
  var mldtim1t    = [ '.mldtim1t_d', '.mldtim1t_v' ];
  var mldtim1s    = [ '.mldtim1s_d', '.mldtim1s_v' ];
  var mldtim2t    = [ '.mldtim2t_d', '.mldtim2t_v' ];
  var mldtim2s    = [ '.mldtim2s_d', '.mldtim2s_v' ];
  var mldtim3t    = [ '.mldtim3t_d', '.mldtim3t_v' ];
  var mldtim3s    = [ '.mldtim3s_d', '.mldtim3s_v' ];
  var mldtim4t    = [ '.mldtim4t_d', '.mldtim4t_v' ];
  var mldtim4s    = [ '.mldtim4s_d', '.mldtim4s_v' ];
//mldexe
  var mldexe      = [ '.mldexe_d', '.mldexe_v' ];



// 出力切り替えスイッチ

// sstat
  var sstat      =  [ '.sstat_d',       '.sstat_v'];
// ssw
  var ssw        =  [ '.ssw_d',         '.ssw_v'];
// smon
  var smon_ac     = [ '.smon_ac_d',     '.smon_ac_v' ];
  var smon_inv    = [ '.smon_inv_d',    '.smon_inv_v' ];
  var smon_out    = [ '.smon_out_d',    '.smon_out_v' ];
  var smon_ct     = [ '.smon_ct_d',     '.smon_ct_v' ];

// sprm
  var sprm_ac_g   = [ '.sprm_ac_g_d',   '.sprm_ac_g_v' ];
  var sprm_ac_o   = [ '.sprm_ac_o_d',   '.sprm_ac_o_v' ];
  var sprm_inv_g  = [ '.sprm_inv_g_d',  '.sprm_inv_g_v' ];
  var sprm_inv_o  = [ '.sprm_inv_o_d',  '.sprm_inv_o_v' ];
  var sprm_out_g  = [ '.sprm_out_g_d',  '.sprm_out_g_v' ];
  var sprm_out_o  = [ '.sprm_out_o_d',  '.sprm_out_o_v' ];
  var sprm_ct_g   = [ '.sprm_ct_g_d',   '.sprm_ct_g_v' ];
  var sprm_ct_o   = [ '.sprm_ct_o_d',   '.sprm_ct_o_v' ];

  // 引数 inti_info の中の Inti_Information 内部（全部）を取り出し
  // Section　部分(コマンド）を個別に抜き出す
  // その回数、それぞれに以下の処理を行う
  $("Inti_Information",inti_info).find("Section").each(function(index, elein){

  // 以下、if 文で、受け取ったコマンドが処理対象かどうかを確認の上
  // Type(第一引数)を確認し、マッチしていれば、格納場所と共に setValues
  // 関数に渡す

        // インバーター

    if($(elein).attr("Name")=='ISTAT'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, istat);
      });
    }

    if($(elein).attr("Name")=='IMON'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='AC-1'){
          setValues(values, imon_acv);
          iPrmAcV = setValue(values);
        };
        if($(values).attr("Name")=='AC-2'){
          setValues(values, imon_aci);
          iPrmAcI = setValue(values);
        };
        if($(values).attr("Name")=='BAT-1'){
          setValues(values, imon_batv);
          iPrmBatV = setValue(values);
        };
        if($(values).attr("Name")=='BAT-2'){
          setValues(values, imon_bati);
          iPrmBatI = setValue(values);
        };
        if($(values).attr("Name")=='HV-1'){
          setValues(values, imon_hv);
          iPrmHv = setValue(values);
        };
      });
    }
    if($(elein).attr("Name")=='IPRM'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='AC-V-1' ){
          setValues(values, iprm_acv_g);
          iPrmAcV_g = setValue(values);
        };
        if($(values).attr("Name")=='AC-V-2' ){
          setValues(values, iprm_acv_o);
          iPrmAcV_o = setValue(values);
        };
        if($(values).attr("Name")=='AC-I-1' ){
          setValues(values, iprm_aci_g);
          iPrmAcI_g = setValue(values);
        };
        if($(values).attr("Name")=='AC-I-2' ){
          setValues(values, iprm_aci_o);
          iPrmAcI_o = setValue(values);
        };
        if($(values).attr("Name")=='BAT-V-1'){
          setValues(values, iprm_batv_g);
          iPrmBatV_g = setValue(values);
        };
        if($(values).attr("Name")=='BAT-V-2'){
          setValues(values, iprm_batv_o);
          iPrmBatV_o = setValue(values);
        };
        if($(values).attr("Name")=='BAT-I-1'){
          setValues(values, iprm_bati_g);
          iPrmBatI_g = setValue(values);
        };
        if($(values).attr("Name")=='BAT-I-2'){
          setValues(values, iprm_bati_o);
          iPrmBatI_o = setValue(values);
        };
        if($(values).attr("Name")=='HV-1'  ){
          setValues(values, iprm_hv_g);
          iPrmHv_g = setValue(values);
        };
        if($(values).attr("Name")=='HV-2'  ){
          setValues(values, iprm_hv_o);
          iPrmHv_o = setValue(values);
        };
      });
    }

        // 太陽光発電 MPPT チャージコントローラー
    if($(elein).attr("Name")=='SCAN'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, scan);
      });
    }
    if($(elein).attr("Name")=='SCNEXE'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='ITVAL-1')setValues(values, scnexe);
      });
    }
    if($(elein).attr("Name")=='MSTAT'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, mstat);
      });
    }
    if($(elein).attr("Name")=='MMON'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='PV-1'){
          setValues(values, mmon_pvv);
          mPrmPvV = setValue(values);
        };
        if($(values).attr("Name")=='PV-2'){
          setValues(values, mmon_pvi);
          mPrmPvI = setValue(values);
        };
        if($(values).attr("Name")=='BAT-1'){
          setValues(values, mmon_batv);
          mPrmBatV = setValue(values);
        };
        if($(values).attr("Name")=='BAT-2'){
          setValues(values, mmon_bati);
          mPrmBatI = setValue(values);
        };
        if($(values).attr("Name")=='TMP-1'){
          setValues(values, mmon_temp);
          mPrmTemp = setValue(values);
        };
        if($(values).attr("Name")=='LOAD-1'){
          setValues(values, mmon_load);
          mPrmLoad = setValue(values);
        };
      });
    }
    if($(elein).attr("Name")=='MPRM'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='PV-V-1' ){
          setValues(values, mprm_pvv_g);
          mPrmPvV_g = setValue(values);
        };
        if($(values).attr("Name")=='PV-V-2' ){
          setValues(values, mprm_pvv_o);
          mPrmPvV_o = setValue(values);
        };
        if($(values).attr("Name")=='PV-I-1' ){
          setValues(values, mprm_pvi_g);
          mPrmPvI_g = setValue(values);
        };
        if($(values).attr("Name")=='PV-I-2' ){
          setValues(values, mprm_pvi_o);
          mPrmPvI_o = setValue(values);
        };
        if($(values).attr("Name")=='BAT-V-1'){
          setValues(values, mprm_batv_g);
          mPrmBatV_g = setValue(values);
        };
        if($(values).attr("Name")=='BAT-V-2'){
          setValues(values, mprm_batv_o);
          mPrmBatV_o = setValue(values);
        };
        if($(values).attr("Name")=='BAT-I-1'){
          setValues(values, mprm_bati_g);
          mPrmBatI_g = setValue(values);
        };
        if($(values).attr("Name")=='BAT-I-2'){
          setValues(values, mprm_bati_o);
          mPrmBatI_o = setValue(values);
        };
        if($(values).attr("Name")=='TMP-1'  ){
          setValues(values, mprm_temp_g);
          mPrmTemp_g = setValue(values);
        };
        if($(values).attr("Name")=='TMP-2'  ){
          setValues(values, mprm_temp_o);
          mPrmTemp_o = setValue(values);
        };
        if($(values).attr("Name")=='LOAD-1' ){
          setValues(values, mprm_load_g);
          mPrmLoad_g = setValue(values);
        };
        if($(values).attr("Name")=='LOAD-2' ){
          setValues(values, mprm_load_o);
          mPrmLoad_o = setValue(values);
        };
      });
    }
    if($(elein).attr("Name")=='MBAT'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, mbat);
      });
    }
    if($(elein).attr("Name")=='MUBAT'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, mubat);
      });
    }
    if($(elein).attr("Name")=='MBTSPC'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='SPEC1-1')setValues(values, mbtspc1_max);
        if($(values).attr("Name")=='SPEC1-2')setValues(values, mbtspc1_up);
        if($(values).attr("Name")=='SPEC1-3')setValues(values, mbtspc1_low);
        if($(values).attr("Name")=='SPEC1-4')setValues(values, mbtspc1_min);
        if($(values).attr("Name")=='SPEC1-5')setValues(values, mbtspc1_imax);
        if($(values).attr("Name")=='SPEC2-1')setValues(values, mbtspc2_max);
        if($(values).attr("Name")=='SPEC2-2')setValues(values, mbtspc2_up);
        if($(values).attr("Name")=='SPEC2-3')setValues(values, mbtspc2_low);
        if($(values).attr("Name")=='SPEC2-4')setValues(values, mbtspc2_min);
        if($(values).attr("Name")=='SPEC2-5')setValues(values, mbtspc2_imax);
        if($(values).attr("Name")=='SPEC3-1')setValues(values, mbtspc3_max);
        if($(values).attr("Name")=='SPEC3-2')setValues(values, mbtspc3_up);
        if($(values).attr("Name")=='SPEC3-3')setValues(values, mbtspc3_low);
        if($(values).attr("Name")=='SPEC3-4')setValues(values, mbtspc3_min);
        if($(values).attr("Name")=='SPEC3-5')setValues(values, mbtspc3_imax);
        if($(values).attr("Name")=='SPEC4-1')setValues(values, mbtspc4_max);
        if($(values).attr("Name")=='SPEC4-2')setValues(values, mbtspc4_up);
        if($(values).attr("Name")=='SPEC4-3')setValues(values, mbtspc4_low);
        if($(values).attr("Name")=='SPEC4-4')setValues(values, mbtspc4_min);
        if($(values).attr("Name")=='SPEC4-5')setValues(values, mbtspc4_imax);
      });
    }
    if($(elein).attr("Name")=='MLMT'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='PV-1'  )setValues(values, mlmt_pvv);
        if($(values).attr("Name")=='PV-2'  )setValues(values, mlmt_pvi);
        if($(values).attr("Name")=='BAT-1' )setValues(values, mlmt_batv);
        if($(values).attr("Name")=='BAT-2' )setValues(values, mlmt_bati);
        if($(values).attr("Name")=='LOAD-1')setValues(values, mlmt_load);
      });
    }
    if($(elein).attr("Name")=='MMOD'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, mmod);
      });
    }
    if($(elein).attr("Name")=='MLOAD'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, mload);
      });
    }
    if($(elein).attr("Name")=='MLDTIM'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='TIM1-1')setValues(values, mldtim1t);
        if($(values).attr("Name")=='TIM1')setValues(values, mldtim1s);
        if($(values).attr("Name")=='TIM2-1')setValues(values, mldtim2t);
        if($(values).attr("Name")=='TIM2')setValues(values, mldtim2s);
        if($(values).attr("Name")=='TIM3-1')setValues(values, mldtim3t);
        if($(values).attr("Name")=='TIM3')setValues(values, mldtim3s);
        if($(values).attr("Name")=='TIM4-1')setValues(values, mldtim4t);
        if($(values).attr("Name")=='TIM4')setValues(values, mldtim4s);
      });
    }
    if($(elein).attr("Name")=='MLDEXE'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, mldexe);
      });
    }
    // 出力切り替えスイッチ
    if($(elein).attr("Name")=='SSTAT'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, sstat);
      });
    }
    if($(elein).attr("Name")=='SSW'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='STAT')setValues(values, ssw);
      });
    }
    if($(elein).attr("Name")=='SMON'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='AC-1'){
          setValues(values, smon_ac);
          sPrm_Ac = setValue(values, "sPrm_Ac");
        };
        if($(values).attr("Name")=='INV-1'){
          setValues(values, smon_inv);
          sPrmInv = setValue(values, "sPrmInv");
        };
        if($(values).attr("Name")=='OUT-1'){
          setValues(values, smon_out);
          sPrmOut = setValue(values, "sPrmOut");
        };
        if($(values).attr("Name")=='CT-1'){
          setValues(values, smon_ct);
          sPrmCt = setValue(values, "sPrmCt");
        };
      });
    }
    if($(elein).attr("Name")=='SPRM'){
      $(elein).find("Type").each(function(index, values) {
        if($(values).attr("Name")=='AC-1'){
          setValues(values, sprm_ac_g);
          sPrmAc_g = setValue(values);
        };
        if($(values).attr("Name")=='AC-2'){
          setValues(values, sprm_ac_o);
          sPrmAc_o = setValue(values);
        };
        if($(values).attr("Name")=='INV-1'){
          setValues(values, sprm_inv_g);
          sPrm_inv_g = setValue(values);
        };
        if($(values).attr("Name")=='INV-2'){
          setValues(values, sprm_inv_o);
          sPrmInv_o = setValue(values);
        };
        if($(values).attr("Name")=='OUT-1'){
          setValues(values, sprm_out_g);
          sPrmOut_g = setValue(values);
        };
        if($(values).attr("Name")=='OUT-2'){
          setValues(values, sprm_out_o);
          sPrmOut_o = setValue(values);
        };
        if($(values).attr("Name")=='CT-1'){
          setValues(values, sprm_ct_g);
          sPrmCt_g = setValue(values);
        };
        if($(values).attr("Name")=='CT-2'){
          setValues(values, sprm_ct_o);
          sPrmCt_o = setValue(values);
        };
      });
    }
  });
}

 // 受け取ったデーターを実際に text() で表示を行う
function setValues(values, value){
  // kind を確認し、Numerical であれば、数値として格納処理を行う
  if($(values).attr("kind")=='Numerical'){
    $(value[0]).text($(values).find("Description").text());
    $(value[1]).text(''+eval( $(values).find("Value").text())
                       /eval( $(values).find("Scale").text())
                             +$(values).find("Unit").text());
  }
  // kind を確認し、String であれば、文字として格納処理を行う
  if($(values).attr("kind")=='String'){
    $(value[0]).text($(values).find("Description").text());
    $(value[1]).text($(values).find("Value").text());
  }
}
  // モニター以外に使用するため、値のみ取り出す
function setValue(values){
  return ''+eval( $(values).find("Value").text())
           /eval( $(values).find("Scale").text());
}


function puttext(){
  $.post( 'cgi-bin/Inti_cmd.cgi', "MMON")
}
/*
function puttext(){
  $.ajax({
    url: 'cgi-bin/Inti_cmd.cgi',
    type: 'POST',
    data: "MMON",
//    success: function(data) {  (data); },
//    error: function(data) {  alert('error!!!'); }
//    error:function(data){
//       alert('Exeption:'+exception);
//    }
  });
}
*/
/*
function indication(){
  $.ajax({
    url: 'cgi-bin/Inti_info.cgi',
    type: 'GET',
    dataType:'xml',
  }).done(function(data){
    replace(data);
  }).fail(function(data){
    alert('error!!!');
  });
}
*/
//document.write(inti_info);



/* パラメーター設定ツール
=================================================================== */
var Measurement = [];
var paramGain = 100;
var paramOffset = 0;
var pamToolData = {        // グラフデータ
  labels: [],
    datasets: [{
    label: "Standard value",
    data: []
  }, {
    label: "Measure value",
    data: []
  }]
};

var pamErrorData = {        // グラフデータ
  labels: [],
  datasets: [{
    label: "Measure error",
    data: []
  }]
};

$(function(){
  var i=0;
  var cnt;
  var unit;
  var TargetPage;
  var sourceValue;
  var sourceGain;
  var sourceOffset;

// ============ 初期、非表示部分処理
  $('.prm_cmp').hide();


// ============ 項目指定処理
// == inverter
  $("#iset_ac_v1").on('click', function() {
    unit = " V";
    SetParamGraph(0,5,130,"V","iPramGr","iPrmErrGr");
   // スタート値、ステップ値、最終値、単位 グラフ表示位置　エラーグラフ表示位置 処理対象　処理対象の現行ゲイン　処理対象現行オフセット

    TargetPage   = "iAcV";
    sourceGain   = iPrmAcV_g;
    sourceOffset = iPrmAcV_o;
  });

  $("#iset_ac_i1").on('click', function() {
    unit = " A";
    SetParamGraph(0,2,20,"A","iPramGr","iPrmErrGr");
    TargetPage   = "iAcI";
    sourceGain   = iPrmAcI_g;
    sourceOffset = iPrmAcI_o;
  });

  $("#iset_ac_v2").on('click', function() {
    unit = " V";
    SetParamGraph(0,10,250,"V","iPramGr","iPrmErrGr");
    TargetPage   = "iAcV";
    sourceGain   = iPrmAcV_g;
    sourceOffset = iPrmAcV_o;
  });

  $("#iset_ac_i2").on('click', function() {
    unit = " A";
    SetParamGraph(0,0.5,10,"A","iPramGr","iPrmErrGr");
    TargetPage   = "iAcI";
    sourceGain   = iPrmAcI_g;
    sourceOffset = iPrmAcI_o;
  });

  $("#iset_bat_v").on('click', function() {
    unit = " V";
    SetParamGraph(30,2,60,"V","iPramGr","iPrmErrGr");
    TargetPage   = "iBatV";
    sourceGain   = iPrmBatV_g;
    sourceOffset = iPrmBatV_o;
  });

  $("#iset_bat_i").on('click', function() {
    unit = " A";
    SetParamGraph(0,2,40,"A","iPramGr","iPrmErrGr");
    TargetPage   = "iBatI";
    sourceGain   = iPrmBatI_g;
    sourceOffset = iPrmBatI_o;
  });

  $("#iset_hv1").on('click', function() {
    unit = " V";
    SetParamGraph(0,10,250,"V","iPramGr","iPrmErrGr");
    TargetPage   = "iHv";
    sourceGain   = iPrmHv_g;
    sourceOffset = iPrmHv_o;
  });

  $("#iset_hv2").on('click', function() {
    unit = " V";
    SetParamGraph(0,20,500,"V","iPramGr","iPrmErrGr");
    TargetPage   = "iHv";
    sourceGain   = iPrmHv_g;
    sourceOffset = iPrmHv_o;
  });

// == mppt
  $("#mset_pv_v").on('click', function() {
    unit = " V";
    SetParamGraph(0,5,100,"V","mPramGr","mPrmErrGr");
    TargetPage   = "mPvV";
    sourceGain   = mPrmPvV_g;
    sourceOffset = mPrmPvV_o;
  });

  $("#mset_pv_i").on('click', function() {
    unit = " A";
    SetParamGraph(0,2,30,"A","mPramGr","mPrmErrGr");
    TargetPage   = "mPvI";
    sourceGain   = mPrmPvI_g;
    sourceOffset = mPrmPvI_o;
  });

  $("#mset_bat_v").on('click', function() {
    unit = " V";
    SetParamGraph(15,5,60,"V","mPramGr","mPrmErrGr");
    TargetPage   = "mBatV";
    sourceGain   = mPrmBatV_g;
    sourceOffset = mPrmBatV_o;
  });

  $("#mset_bat_i").on('click', function() {
    unit = " A";
    SetParamGraph(0,2,30,"A","mPramGr","mPrmErrGr");
    TargetPage   = "mBatI";
    sourceGain   = mPrmBatI_g;
    sourceOffset = mPrmBatI_o;
  });

  $("#mset_tmp").on('click', function() {
    unit = " ℃";
    SetParamGraph(0,5,60,"℃","mPramGr","mPrmErrGr");
    TargetPage   = "mTemp";
    sourceGain   = mPrmTemp_g;
    sourceOffset = mPrmTemp_o;
  });

  $("#mset_load").on('click', function() {
    unit = " A";
    SetParamGraph(0,2,30,"A","mPramGr","mPrmErrGr");
    TargetPage   = "mLoad";
    sourceGain   = mPrmLoad_g;
    sourceOffset = mPrmLoad_o;
  });

// == output

  $("#sset_ac").on('click', function() {
    unit = " V";
    SetParamGraph(0,10,250,"V","sPramGr","sPrmErrGr");
    TargetPage   = "sAc";
    sourceGain   = sPrmAc_g;
    sourceOffset = sPrmAc_o;
  });

  $("#sset_inv").on('click', function() {
    unit = " V";
    SetParamGraph(0,10,250,"V","sPramGr","sPrmErrGr");
    TargetPage   = "sInv";
    sourceGain   = sPrmInv_g;
    sourceOffset = sPrmInv_o;
  });

  $("#sset_out").on('click', function() {
    unit = " V";
    SetParamGraph(0,10,250,"V","sPramGr","sPrmErrGr");
    TargetPage   = "sOut";
    sourceGain   = sPrmOut_g;
    sourceOffset = sPrmOut_o;
  });

  $("#sset_ct").on('click', function() {
    unit = " A";
    SetParamGraph(0,2,30,"A","sPramGr","sPrmErrGr");
    TargetPage   = "sCt";
    sourceGain   = sPrmCt_g;
    sourceOffset = sPrmCt_o;
  });

// ============ 測定処理
  $(".GrTagt").on('click', function() {
//    Measurement[i] = pamToolData.datasets[0].data[i]*1.2 +5;
    switch ( TargetPage ){
      case "iAcV" : sourceValue = iPrmAcV;  break;
      case "iAcI" : sourceValue = iPrmAcI;  break;
      case "iBatV": sourceValue = iPrmBatV; break;
      case "iBatI": sourceValue = iPrmBatI; break;
      case "iHv"  : sourceValue = iPrmHv;   break;
      case "mPvV" : sourceValue = mPrmPvV;  break;
      case "mPvI" : sourceValue = mPrmPvI;  break;
      case "mBatV": sourceValue = mPrmBatV; break;
      case "mBatI": sourceValue = mPrmBatI; break;
      case "mTemp": sourceValue = mPrmTemp; break;
      case "mLoad": sourceValue = mPrmLoad; break;
      case "sAc"  : sourceValue = sPrmAc;   break;
      case "sInv" : sourceValue = sPrmInv;  break;
      case "sOut" : sourceValue = sPrmOut;  break;
      case "sCt"  : sourceValue = sPrmCt;   break;
    }
    Measurement[i] = ((sourceValue * 100)/sourceGain)-sourceOffset;

    SetMeasurement();
    i++;
    $('.GrTagt').text("Measure " + pamToolData.datasets[0].data[i] + unit);
    window.toolLine.update();
    window.toolBar.update();
  });

// ============ リセット処理
  $(".GrCmpRst").on('click', function() {
    $('.prm_cmp').hide();
    $('.prm_set').show();
    i = 0;
  });

  $(".resPrm").on('click', function() {
    $('.prm_cmp').hide();
    $('.prm_set').show();
    i = 0;
  });


// ============ 測定完了処理
  $(".GrCmpFin").on('click', function() {
    $('.prmAdjustment').show();
    $('.prmDesignated').hide();
    $('.prmGainBt').text(paramGain);
    $('.prmOffsetBt').text(paramOffset);
  });

// ============ ゲイン・オフセット調整処理
  $(".OffsetUp").on('click', function() {
    paramOffset++;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmOffsetBt').text(paramOffset);
  });

  $(".OffsetUp10").on('click', function() {
    paramOffset = paramOffset+10;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmOffsetBt').text(paramOffset);
  });

  $(".OfsetDown").on('click', function() {
    paramOffset--;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmOffsetBt').text(paramOffset);
  });

  $(".OfsetDown10").on('click', function() {
    paramOffset = paramOffset-10;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmOffsetBt').text(paramOffset);
  });

  $(".GainUp").on('click', function() {
    paramGain++;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmGainBt').text(paramGain);
  });

  $(".GainUp10").on('click', function() {
    paramGain = paramGain+10;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmGainBt').text(paramGain);
  });

  $(".GainDown").on('click', function() {
    paramGain--;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmGainBt').text(paramGain);
  });

  $(".GainDown10").on('click', function() {
    paramGain = paramGain-10;
    SetMeasurement();
    window.toolLine.update();
    window.toolBar.update();
    $('.prmGainBt').text(paramGain);
  });
});

// ============ イニシャライズ・グラフ作成・表示
function SetParamGraph( stVal, stepVal, maxVal, valUnit, placePara, placeErr, sourceValue, sourceGain, sourceOffset ) {

// グラフ、初期データ作成
  graphDataInit(stVal, stepVal, maxVal, valUnit);
// 表示、非表示処理
  $('.prm_set').hide();
  $('.prm_cmp').show();
  $('.prmAdjustment').hide();
  $('.prmDesignated').show();

// 測定値指示ボタン表示
  $('.GrTagt').text("Measure " + pamToolData.datasets[0].data[0] + valUnit);
// グラフ作成
  var chrMpptPvV = document.getElementById(placePara).getContext("2d");

// グラフ表示
  window.toolLine = new Chart(chrMpptPvV, {
    type: 'line',
    data: pamToolData,
    options: {
      title:{
        display:true,
        text:'Configuration parameter tool'
      },
      tooltips: {
        enabled: true,
      }
    }
  });

  var graphPrmErr = document.getElementById(placeErr).getContext("2d");

  window.toolBar = new Chart(graphPrmErr, {
    type: 'bar',
    data: pamErrorData,
    options: {
      title:{
        display:true,
        text:'parameter error graph'
      },
      tooltips: {
        enabled: true,
      },
      elements: {
        rectangle: {
          borderWidth: 2,
  //        borderColor: 'rgb(0, 255, 0)',
          borderSkipped: 'bottom'
        }
      }
    }
  });

};

// ============ 測定値計算・代入
function SetMeasurement() {
  var cnt;
  var max = $(Measurement).length;

//  console.log(max);
  for(cnt=0; cnt < max; cnt++){
    pamToolData.datasets[1].data[cnt] = 
        (( Measurement[cnt] + paramOffset) * paramGain)/100;

    pamErrorData.datasets[0].data[cnt] =
        pamToolData.datasets[1].data[cnt] - pamToolData.datasets[0].data[cnt];
  }
}

// ============ グラフデータ初期化
function graphDataInit(start, step, max, unit) {
  var cnt;
  var i=0;

          // 以前のデータ破棄
  Measurement = [];
  pamToolData.labels = [];
//  pamToolData.datasets[0].label = "Standard value";
//  pamToolData.datasets[1].label = "Measure value";
  pamToolData.datasets[0].data = [];
  pamToolData.datasets[1].data = [];
  pamErrorData.labels = [];
//  pamErrorData.datasets[0].label = "Measure error"
  pamErrorData.datasets[0].data = [];

          // データー作成
  for(cnt=start; cnt <= max; cnt=cnt+step){
    pamToolData.labels[i] = cnt+unit;
    pamErrorData.labels[i] = cnt+unit;
    pamToolData.datasets[0].data[i] = cnt;
    pamToolData.datasets[1].data[i] = "NaN";
    i++;
//    console.log(Measurement);
  }
    paramGain = 100;
    paramOffset = 0;
}



var lineChartData = {
  labels: ["15V", "20V", "25V", "30V", "35V", "40V", "45V", "50V"],
  datasets: [{
    label: "My First dataset",
    data: [15, 20, 25, 30, 35, 40, 45, 50]
  }, {
    label: "My Second dataset",
    data: [20, 23, 28, 32, 37, 39, 46]
  }]
};

window.onload = function() {
  var chartEl = document.getElementById("chart1");
  window.myLine = new Chart(chartEl, {
    type: 'line',
    data: lineChartData,
    options: {
      title:{
        display:true,
        text:'ここにタイトルを書く'
      },
      tooltips: {
        enabled: true,
       // custom: customTooltips
      }
    }
  });
};


