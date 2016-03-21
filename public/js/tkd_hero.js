// 武将列表脚本
$(function(){
  // 页面dom
  var $mainMenu = $('#mainMenu'),
      $subPanel = $('#subPanel');
  var $countryBtn = null,
      $packageBtn = null,
      $addHeroBtn = null;

  var HeroObj = null;
  HeroObj = {
    // 是否首次显示势力界面（定义事件）
    firstShowCountry: true,
    init: function(){
      $countryBtn = $('#countryBtn');
      $packageBtn = $('#packageBtn');
      $addHeroBtn = $('#addHeroBtn');
      this.initEvt();
    },
    initEvt: function(){
      $countryBtn.on('click', showCountryPanel);
      $packageBtn.on('click', showPackagePanel);
      $addHeroBtn.on('click', showAddHeroPanel);
    }
  };
  HeroObj.init();
  // 显示势力管理子页面
  function showCountryPanel(){
    var $countryPanel = $subPanel.find('.coutry_update_panel'),
        $addCountry = $countryPanel.find('.add_country'),
        $submitBtn = $countryPanel.find('.commit_btn'),
        $backMainBtn = $countryPanel.find('.back_main');
    if (HeroObj.firstShowCountry){
      $submitBtn.on('click', submitCountryModify);
      $backMainBtn.on('click', backMainPanel);
      $addCountry.on('click', showAddCountryModal);
      HeroObj.firstShowCountry = false;
    }
    $countryPanel.removeClass('dn');
    $subPanel.removeClass('dn');
    $mainMenu.addClass('dn');
  }
  function submitCountryModify(){

  }
  function backMainPanel(){
    $subPanel.addClass('dn');
    $mainMenu.removeClass('dn');
  }
  // 显示包管理子页面
  function showPackagePanel(){

  }
  // 显示新增武将子页面
  function showAddHeroPanel(){

  }
  // 显示更新武将子页面
  function showUpdateHeroPanel(){

  }
  // 显示弹层（调用通用模块）
  function showAddCountryModal(){
    $.confirmModal({
      id: 'countryModal',
      title: '新增势力',
      confirmCb: function($confirmModal){
        var newName = $confirmModal.find('#modal_val').val();
        $confirmModal.remove();
        // 展示新添加的势力
        alert(newName);
      }
    });
  }
});