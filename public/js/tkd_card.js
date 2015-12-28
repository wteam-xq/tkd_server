// 卡牌列表脚本
$(function(){

  // 主页面
  var $mainMenu = $('#mainmenu'),
      // 二级页面
      $subPanel = $('#subPanel'),
      // 新增卡牌面板
      $addCardPanel = $subPanel.find('.card_add_panel'),
      // 更新卡牌面板
      $updateCardPanel = $subPanel.find('.card_update_panel'),
      // 导航条
      $adminCrumb = $('#adminCrumb'),
      $toTkd = $('#toTkd'),
      // 弹出框
      $confirmDialog = $mainMenu.find('.modal'),
      // 弹出框提示
      $removeTips = $('#removeips'),
      // 存储待删除ID隐藏域
      $selectedId = $mainMenu.find('#selectId'),
      // 返回主页面按钮
      $backMain = $subPanel.find('.back_main');
  
  // 显示提示内容
  function showTips(tips, $tips){
    $tips.html(tips);
    $tips.removeClass('hidden');
    $(window).scrollTop(0);
  }

  var tkdCardObj = {
    init: function(){
      this.initEvt();
      // bootstrap 居中
      $confirmDialog.on('shown.bs.modal', function(){
        var $this = $(this),
            $modalDialog = $this.find('.modal-dialog'),
            mTop = ( $(document).height() - $modalDialog.height() )/2;
        $modalDialog.css({'margin': mTop + 'px auto'});
      });
    },
    initEvt: function(){
      var This = this,
          // 删除卡牌按钮
          $removeBtn = $('#card').find('.remove_card_btn'),
          $removeSubmit = $('#removeSubmit'),
          // 新增卡牌按钮
          $addCardBtn = $('#add_card_btn'),
          $commitAddBtn,
          $commitUpdateBtn,
          $fileDom;

      $addCardBtn.on('click', function(){
        This.showNewCardPanel();
      });
      $removeBtn.on('click', showConfirmPanel);
      $removeSubmit.on('click', confirmRemoveCard);
      // 二级页面返回一级页面按钮点击
      $backMain.on('click', function(){
        This.backMainPanel();
      });
      $toTkd.on('click', function(){
        This.backMainPanel();
      });
      // 赋予上传事件
      $fileDom = $subPanel.find('.upload-file');
      fileUploadUtil.fileUploadInit($fileDom);
      // 新增卡牌事件
      $commitAddBtn = $addCardPanel.find('.commit_btn');
      $commitAddBtn.on('click', function(){
        submitCardCommit($addCardPanel);
      });
      // 提交更新卡牌请求
      $commitUpdateBtn = $updateCardPanel.find('.commit_btn');
      $commitUpdateBtn.on('click', function(){
        submitCardCommit($updateCardPanel);
      });
      // 弹出更新卡牌UI
      $mainMenu.find('.card-update').on('click', showUpdateCardPanel);
    },
    showNewCardPanel: function(){
      var $this = $(this);
      $subPanel.find('.row').hide();
      $subPanel.show();
      $addCardPanel.show();
      $mainMenu.hide();
      // 导航条出现
      $adminCrumb.find('.active:first').html('添加卡牌类型');
      $adminCrumb.show();
    },
    backMainPanel: function(){
      $subPanel.find('.row').hide();
      $mainMenu.show();
      // 导航条隐藏
      $adminCrumb.hide();
    }
  };

  // 弹出更新卡牌UI 
  function showUpdateCardPanel(){
    var $this = $(this),
        _id = $this.attr('data-id');

    $subPanel.find('.row').hide();
    $subPanel.show();
    $updateCardPanel.show();
    $mainMenu.hide();
    // 导航条出现
    $adminCrumb.find('.active:first').html('更新卡牌');
    $adminCrumb.show();
    // 清空上一面板数据
    cardPageReset($updateCardPanel);
    // 填充卡牌数据
    fillCardPage($updateCardPanel, _id);
  }
  // 清空卡牌面板
  function cardPageReset($cardPanel){
    var $uploadTips = $cardPanel.find('.upload-tips'),
        $uploadPro = $cardPanel.find('.upload-pro'),
        $title = $cardPanel.find('.title'),
        $desc = $cardPanel.find('.desc');
    $title.val('');
    $desc.val('');
    $uploadTips.empty().hide();
    $uploadPro.hide();
    $uploadPro.find('.progress-bar').css('width', '0%').html('');
  }
  // 填充卡牌数据
  function fillCardPage($cardPanel, _id){
    var $tips = $cardPanel.find('.alert'),
        $title = $cardPanel.find('.title'),
        $desc = $cardPanel.find('.desc'),
        $uploadTips = $cardPanel.find('.upload-tips'),
        $icoPath = $cardPanel.find('.icoPath'),
        $icoName = $cardPanel.find('.icoName'),
        $cardId = $cardPanel.find('.card_id');

    // 异步获取数据
    $.get('tkd/getCardById', {id: _id},  function(res){
      // 数据库规则内容
      var _title, _desc, _ico_name, _ico_path, _data, _id;

      if (res.error){
        showTips(res.error, $tips);
      }else{
        _data = res.data;
        _title = _data.title?_data.title:'';
        _desc = _data.desc?_data.desc:'';
        _ico_path = _data.ico?_data.ico:'';
        _ico_name = _data.icoName?_data.icoName:'';
        _id = _data._id?_data._id:'';
        
        $title.val(_title);
        $desc.val(_desc);
        $icoPath.val(_ico_path);
        $icoName.val(_ico_name);
        $uploadTips.show().html(_ico_name);
        $cardId.val(_id);
      }
    });
  }
  // 显示确认删除提示
  function showConfirmPanel(){
    var $this = $(this),
        _id = $this.attr('data-id');

    $selectedId.val(_id);
    $selectedId.attr('data-type', 'card');
    // 改变提示内容
    $removeTips.html('确定要删除该类型卡牌吗？');
    $confirmDialog.modal({backdrop:'static'});
  }
  // 确认删除卡牌
  function confirmRemoveCard(){
    // 异步请求
    var $this = $(this),
        _id = $selectedId.val(),
        delete_url = '/admin/tkd/card/delete';

    $.post(delete_url, {id: _id}, function(data){
      if (data.error){
        $('#removeTips').html('删除异常:' + data.error + '  请刷新重试。');
      }else{
        // 删除完后刷新页面
        window.location.reload();
      }
    }, 'json');
  }
  // 提交卡牌请求（更新、新增）
  function submitCardCommit($cardFormParent){
    var $panelForm = $cardFormParent.find('form'),
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

  tkdCardObj.init();
});