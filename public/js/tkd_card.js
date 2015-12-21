// 卡牌列表脚本
$(function(){

  // 主页面
  var $mainMenu = $('#mainmenu'),
      // 二级页面
      $subPanel = $('#subPanel'),
      // 新增卡牌面板
      $addCardPanel = $subPanel.find('.card_add_panel'),
      // 导航条
      $adminCrumb = $('#admin-crumb'),
      $toTkd = $('#to-tkd'),
      // 新增卡牌按钮
      $addCardBtn = $('#addCardBtn'),
      // 返回主页面按钮
      $backMain = $subPanel.find('.back-main');
  
  // 显示提示内容
  function showTips(tips, $tips){
    $tips.html(tips);
    $tips.removeClass('hidden');
    $(window).scrollTop(0);
  }

  var tkdCardObj = {
    init: function(){
      this.initEvt();
    },
    initEvt: function(){
      var This = this,
          $commitAddBtn,
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
      // 新增卡牌事件
      $commitAddBtn = $subPanel.find('.commit_btn');
      $commitAddBtn.on('click', function(){
        This.addCardCommit();
      });
    },
    showNewCardPanel: function(){
      var $this = $(this),
          $addPanel = $subPanel.find('.card_add_panel');

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
    },
    addCardCommit: function(){
      var $panelForm = $addCardPanel.find('form'),
          _title = $panelForm.find('.title').val(),
          _desc = $panelForm.find('.desc').val(),
          _ico_path = $panelForm.find('.icoPath').val(),
          $tips = $panelForm.find('.alert');

      // 提交字段是否齐全校验
      if (_title == ''){
        showTips('标题不能为空！', $tips);
        return false;
      }else if (_desc == ''){
        showTips('简介不能为空！', $tips);
        return false;
      }else if(_ico_path == ''){
        showTips('图标不能为空！', $tips);
        return false;
      }else{
        $panelForm.submit();
      } 
    }
  };

  tkdCardObj.init();
});