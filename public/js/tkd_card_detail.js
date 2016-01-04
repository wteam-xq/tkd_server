// 卡牌列表脚本
$(function(){

  var $childPanel = $('#childPanel'), 
      // 提示弹出层
      $confirmDialog = $('#removeConfirm'),
      $subPanel = $('#subPanel'),
      // 卡牌详情列表面板
      $detailCardPanel = $subPanel.find('.card_detial_list_panel'),
      // 导航条
      $toTkd = $('#toTkd'),
      $adminCrumb = $('#adminCrumb');

  var tkdCardDetailObj = null;

  tkdCardDetailObj = {
    init: function(){
      this.initEvt();
      // bootstrap 居中
      $confirmDialog.on('shown.bs.modal', function(){
        var $this = $(this),
            $modalDialog = $this.find('.modal-dialog'),
            mTop = ( $(document).height() - $modalDialog.height() )/2;
        $modalDialog.css({'margin': mTop + 'px auto'});
      });
      // 显示面表屑
      $adminCrumb.removeClass('unvisible');
    },
    initEvt: function(){
      var This = this,
          // 卡牌详情页返回按钮
          $addDetailBack = $childPanel.find('.back_sub_panel'),
          // 新增卡牌详情按钮
          $addDetailBtn = $subPanel.find('#addDetailBtn'),
          // 提交新增卡牌按钮
          $commitDetailBtn = $childPanel.find('.commit_btn'),
          // 赋予上传事件
          $fileDom = $('.upload-file');

      // 初始化上传事件
      fileUploadUtil.fileUploadInit($fileDom);
      // 显示卡牌编辑面板
      $addDetailBtn.on('click', showAddDetailPanel);
      // 返回卡牌详情列表
      $addDetailBack.on('click', backSubPanel);
      $commitDetailBtn.on('click', commitCardDetail);
      $toTkd.on('click', backCardTypeList);
    }
  };
  // 新增卡牌详情
  function showAddDetailPanel(){
    $detailCardPanel.hide();
    $childPanel.show();
    // 导航条出现
    $adminCrumb.find('.active:first').html('添加详情卡牌');
  }
  // 返回列表卡牌页面
  function backSubPanel(){
    $childPanel.hide();
    $detailCardPanel.show();
    // 导航条出现
    $adminCrumb.find('.active:first').html('卡牌详情列表');
  }
  // 提交新增卡牌请求
  function commitCardDetail(){
    var $this = $(this),
        $commitForm = $this.parents('form'),
        _title = $commitForm.find('.title').val(),
        _content = $commitForm.find('.content').val(),
        _ico_path = $commitForm.find('.icoPath').val(),
        _type_id = $childPanel.find('#cardTypeId').val(),
        $tips = $commitForm.find('.alert');

    // 提交字段是否齐全校验
    if (_title == ''){
      showTips('标题不能为空！', $tips);
      return false;
    }else if (_content == ''){
      showTips('内容不能为空！', $tips);
      return false;
    }else if(_ico_path == ''){
      showTips('图标不能为空！', $tips);
      return false;
    }else if(!_type_id) {
      showTips('卡牌类型不能为空！', $tips);
      return false;
    }else{
      $commitForm.find('.card_type_id').val(_type_id);
      $commitForm.submit();
    }
  }
  // 显示提示内容
  function showTips(tips, $tips){
    $tips.html(tips);
    $tips.removeClass('hidden');
    $(window).scrollTop(0);
  }
  // 返回卡牌类型列表页
  function backCardTypeList(){
    window.location.href = "/admin/tkd?tkd_type=card";
  }

  tkdCardDetailObj.init();
});