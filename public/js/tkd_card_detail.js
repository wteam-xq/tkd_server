// 卡牌列表脚本
$(function(){

  var $childPanel = $('#childPanel'), 
      // 提示弹出层
      $confirmDialog = $('#removeConfirm'),
      // 弹出框提示
      $removeTips = $('#removeips'),
      $subPanel = $('#subPanel'),
      cardTypeId = $childPanel.find('#cardTypeId').val(),
      // 卡牌详情列表面板
      $detailCardPanel = $subPanel.find('.card_detial_list_panel'),
      // 导航条
      $toTkd = $('#toTkd'),
      // 存储待删除ID隐藏域
      $selectedId = $subPanel.find('#selectId'),
      $adminCrumb = $('#adminCrumb');
  var $addPanel = $childPanel.find('.add_detail_card_panel'),
      $updatePanel = $childPanel.find('.update_detail_card_panel');

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
          // 删除卡牌按钮
          $removeBtn = $subPanel.find('.remove_card_detail'),
          $removeSubmit = $('#removeSubmit'),
          // 新增卡牌详情按钮
          $addDetailBtn = $subPanel.find('#addDetailBtn'),
          // 更新卡牌详情按钮
          $updateDetailBtn = $subPanel.find('.card_detail_update'),
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
      // 确认删除卡牌
      $removeBtn.on('click', showConfirmPanel);
      $removeSubmit.on('click', confirmRemoveCard);
      // 点击更新卡牌详情按钮
      $updateDetailBtn.on('click', showUpdateDetailPanel);
      // QA删除按钮点击事件
      $childPanel.on('click', '.qa-close-btn', removeQAItem);
      // QA新增按钮点击事件
      $childPanel.find('.add-qa').on('click', addQAItem);
    }
  };
  // 新增QA组
  function addQAItem(e){
    var $target = $(e.target),
        $formGroup = null;
    var _html = '<div class="qa-wrap"><div class="q form-group"><label class="col-md-1 control-label">[Q]</label><div class="col-md-10"><input type="text" name="card_q" class="card_q form-control"/></div></div><div class="a form-group"><label class="col-md-1 control-label">[A]</label><div class="col-md-10"><input type="text" name="card_a" class="card_a form-control"/></div></div><a href="####" title="点击删除QA项" class="qa-close-btn admin-sprite-bg"></a></div>';

    $formGroup =  $target.parents('.form-group');
    $formGroup.before(_html);
  }
  // 新增QA组(包含内容)
  function addQAContentItem($wrap, aqList){
    var i , len = aqList.length,
        aqItem = null,
        _html = '<div class="qa-wrap"><div class="q form-group"><label class="col-md-1 control-label">[Q]</label><div class="col-md-10"><input type="text" name="card_q" class="card_q form-control"/></div></div><div class="a form-group"><label class="col-md-1 control-label">[A]</label><div class="col-md-10"><input type="text" name="card_a" class="card_a form-control"/></div></div><a href="####" title="点击删除QA项" class="qa-close-btn admin-sprite-bg"></a></div>';
    var $addQaBtn = $wrap.find('.add-qa'),
        $qaWrap = null,
        $addQaWrap = $addQaBtn.parents('.form-group');
    for(i = 0; i < len; i++){
      $qaWrap = $(_html);
      aqItem = aqList[i];
      $qaWrap.find('.card_q').val(aqItem['Q']);
      $qaWrap.find('.card_a').val(aqItem['A']);
      $addQaWrap.before($qaWrap);
    }
  }
  // 删除QA组事件
  function removeQAItem(e){
    var $target = $(e.target),
        $qaWrap = $target.parents('.qa-wrap');
    e.preventDefault();
    $qaWrap.remove();
  }
  // 新增卡牌详情
  function showAddDetailPanel(){
    $detailCardPanel.hide();
    $childPanel.show();
    $addPanel.removeClass('unvisible');
    // 导航条出现
    $adminCrumb.find('.active:first').html('添加详情卡牌');
  }
  // 更新卡牌详情
  function showUpdateDetailPanel(){
    var $this = $(this),
        getDetailUrl = '/tkd/getCardDetailById',
        $detailForm = $updatePanel.find('form'),
        _id = $this.attr('data-id');

    $detailCardPanel.hide();
    $childPanel.show();
    $updatePanel.removeClass('unvisible');
    // 导航条出现
    $adminCrumb.find('.active:first').html('更新详情卡牌');
    // 异步请求后端该卡牌详情数据
    // console.log('卡牌详情id:' + _id + ' 卡牌类型ID：' + cardTypeId);
    $.get(getDetailUrl, {"id": _id, "typeId": cardTypeId}, function(data){
      var detailObj = data.data,
          $uploadTips = $detailForm.find('.upload-tips');
      if (data.error){
        $('#removeTips').html('查询卡牌详情异常:' + data.error + '  请稍后重试。');
      }else{
        // 删除完后刷新页面
        // console.log('卡牌详情数据：' + JSON.stringify(data));
        $detailForm.find('.title').val(detailObj.title);
        $detailForm.find('.content').val(detailObj.htmlCont);
        $detailForm.find('.icoPath').val(detailObj.ico);
        $detailForm.find('.icoName').val(detailObj.icoName);
        $uploadTips.html(detailObj.icoName);
        $uploadTips.removeClass('unvisible');
        // 设置卡牌详情ID
        $detailForm.find('.card_detail_id').val(detailObj._id);
        // 显示QA内容
        if(detailObj.aqList && detailObj.aqList.length > 0){
          $detailForm.find('.qa-wrap').remove();
          addQAContentItem($detailForm, detailObj.aqList);
        }
      }
    }, 'json');
  }
  // 返回列表卡牌页面
  function backSubPanel(){
    $childPanel.hide();
    $addPanel.addClass('unvisible');
    $updatePanel.addClass('unvisible');
    $detailCardPanel.show();
    // 导航条出现
    $adminCrumb.find('.active:first').html('卡牌详情列表');
  }
  // 提交新增卡牌请求
  function commitCardDetail(){
    var $this = $(this),
        $commitForm = $this.prevAll('form'),
        _title = $commitForm.find('.title').val(),
        _content = $commitForm.find('.content').val(),
        _ico_path = $commitForm.find('.icoPath').val(),
        _type_id = cardTypeId,
        $tips = $commitForm.find('.alert');
    var $qaWrap = null,
        $qaInput = null,
        qaList = [];
    $qaWrap = $commitForm.find('.qa-wrap');
    $qaInput = $commitForm.find('.card_detail_qa');
    $qaWrap.each(function(i){
      var $this = $(this),
          qaObj = null,
          $q, $a;
      $q = $this.find('.q');
      $a = $this.find('.a');
      qaObj = {"Q":$q.find('input').val(), "A":$a.find('input').val()};
      qaList.push(qaObj);
    });
    $qaInput.val(JSON.stringify(qaList));
    // 提交字段是否齐全校验
    if (!_title){
      showTips('标题不能为空！', $tips);
      return false;
    }else if (!_content){
      showTips('内容不能为空！', $tips);
      return false;
    }else if(!_ico_path){
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
  // 显示确认删除提示
  function showConfirmPanel(){
    var $this = $(this),
        _id = $this.attr('data-id');

    $selectedId.val(_id);
    // 改变提示内容
    $removeTips.html('确定要删除该卡牌吗？');
    $confirmDialog.modal({backdrop:'static'});
  }
  // 确认删除卡牌
  function confirmRemoveCard(){
    // 异步请求
    var $this = $(this),
        _id = $selectedId.val(),
        delete_url = '/admin/tkd/card_detail/delete';

    $.post(delete_url, {"id": _id, "typeId": cardTypeId}, function(data){
      if (data.error){
        $('#removeTips').html('删除异常:' + data.error + '  请刷新重试。');
      }else{
        // 删除完后刷新页面
        window.location.reload();
      }
    }, 'json');
  }

  tkdCardDetailObj.init();
});