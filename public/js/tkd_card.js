// 用户列表脚本
$(function(){

  // 主页面
  var $mainMenu = $('#mainmenu'),
      // 二级页面
      $subPanel = $('#subPanel'),
      // 导航条
      $adminCrumb = $('#admin-crumb'),
      $toTkd = $('#to-tkd'),
      // 新增卡牌按钮
      $addCardBtn = $('#addCardBtn');

  var tkdCardObj = {
    init: function(){
      this.initEvt();
    },
    initEvt: function(){
      var This = this;
      $addCardBtn.on('click', function(){
        This.showNewCardPanel();
      });
    },
    showNewCardPanel: function(){
      alert('弹出新建卡牌二级页面');
    }
  };

  tkdCardObj.init();

});