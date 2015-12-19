// 卡牌列表脚本
$(function(){

  // 主页面
  var $mainMenu = $('#mainmenu'),
      // 二级页面
      $subPanel = $('#subPanel'),
      // 导航条
      $adminCrumb = $('#admin-crumb'),
      $toTkd = $('#to-tkd'),
      // 新增卡牌按钮
      $addCardBtn = $('#addCardBtn'),
      // 返回主页面按钮
      $backMain = $subPanel.find('.back-main');

  var tkdCardObj = {
    init: function(){
      this.initEvt();
    },
    initEvt: function(){
      var This = this,
          $fileDom;

      $addCardBtn.on('click', function(){
        This.showNewCardPanel();
      });
      // 二级页面返回一级页面按钮点击
      $backMain.on('click', function(){
        This.backMainPanel();
      });
      // 赋予上传事件
      $fileDom = $subPanel.find('.upload-file');
      fileUploadUtil.fileUploadInit($fileDom);
    },
    showNewCardPanel: function(){
      var $this = $(this),
          $addPanel = $subPanel.find('.card-add-panel');

      $subPanel.find('.row').hide();
      $subPanel.show();
      $addPanel.show();
      $mainMenu.hide();
      // 导航条出现
      $adminCrumb.find('.active:first').html('添加规则');
      $adminCrumb.show();
    },
    backMainPanel: function(){
      $subPanel.find('.row').hide();
      $mainMenu.show();
      // 导航条隐藏
      $adminCrumb.hide();
    }
  };

  tkdCardObj.init();
});