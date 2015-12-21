// 规则列表脚本
$(function(){

  // 主页面
  var $main_menu = $('#mainmenu'),
    // 二级页面
    $sub_panel = $('#subPanel'),
    // 导航条
    $admin_crumb = $('#adminCrumb'),
    $to_tkd = $('#toTkd'),
    // 存储待删除ID隐藏域
    $selected_id = $main_menu.find('#selectId'),
    // 弹出框
    $confirm_dialog = $main_menu.find('.modal'),
    // 弹出框提示
    $remove_tips = $('#removeTips'),
    // 增加记录 是否清空原内容标志位
    add_reset = false;

  // 初始化函数
  init();

  // 初始化
  function init(){
    // 公共dom事件
    publicDomEvent();
    // 规则事件
    ruleDomEvent();
  }

  // 公共dom事件
  function publicDomEvent(){
    // 删除 确认弹出框
    var $remove_submit = $('#removeSubmit');
    var $remove_cancel = $('#removeCancel');

    // 弹出框删除项请求
    $remove_submit.on('click', function(){
      // 异步请求
      var $this = $(this);
      var _id = $selected_id.val();
      var _type = $selected_id.attr('data-type');
      var delete_url = '';

      // 删除类型
      switch(_type){
        case 'rule':
          delete_url = '/admin/tkd/rule/delete';
          break;
        case 'card':
          delete_url = '/admin/tkd/card/delete';
          break;
        case 'heros':
          delete_url = '/admin/tkd/heros/delete';
          break;
        case 'strategy':
          delete_url = '/admin/tkd/strategy/delete';
          break;
        default:
          delete_url = '/admin/tkd/rule/delete';
      }

      $.post(delete_url, {id: _id}, function(data){
        if (data.error){
          $('#removeTips').html('删除异常:' + data.error + '  请刷新重试。');
        }else{
          window.location.href = '/admin/tkd';
        }
      }, 'json');
    });

    // 删除弹出框“取消”按钮点击
    $remove_cancel.on('click', function(){
      $selected_id.val('');
      $selected_id.attr('data-type', '');
    });

    // bootstrap 居中
    $confirm_dialog.on('shown.bs.modal', function(){
      var $this = $(this);
      var $modal_dialog = $this.find('.modal-dialog');
      var m_top = ( $(document).height() - $modal_dialog.height() )/2;
      $modal_dialog.css({'margin': m_top + 'px auto'});
    });
    // 二级页面返回一级页面按钮点击
    $sub_panel.find('.back-main').on('click', function(){
      var $this = $(this);
      $sub_panel.find('.row').hide();
      $main_menu.show();
      // 导航条隐藏
      $admin_crumb.hide();
    });
    // 路径导航条事件
    $to_tkd.on('click', function(){
      $sub_panel.find('.back-main').trigger('click');
    });
    
    // 赋予上传事件
    var $file_dom = $sub_panel.find('.upload-file');
    fileUploadUtil.fileUploadInit($file_dom);
    // fileUploadConfig($file_dom);
  }

  // 规则dom事件
  function ruleDomEvent(){
    // 规则页面
    var $rule_cont = $('#rule');
    var $remove_btn = $rule_cont.find('.removeRule');
    // 规则增加按钮
    var $rule_add_btn = $('#rule-add'); 
    // 百度编辑器初始化
    $Ue = UE.getEditor('add-content');
    $Ue2 = UE.getEditor('update-content');

    // 删除规则
    $remove_btn.on('click', function(){
      var $this = $(this);
      var _id = $this.attr('data-id');
      $selected_id.val(_id);
      $selected_id.attr('data-type', 'rule');
      // 改变提示内容
      $remove_tips.html('确定要删除该规则吗？');
      $confirm_dialog.modal({backdrop:'static'});
    });
    // 增加规则按钮点击
    $rule_add_btn.on('click', function(){
      var $this = $(this),
          $add_panel = $sub_panel.find('.rule-add-panel');

      $sub_panel.find('.row').hide();
      $sub_panel.show();
      $add_panel.show();
      $main_menu.hide();
      // 导航条出现
      $admin_crumb.find('.active:first').html('添加规则');
      $admin_crumb.show();
      // 如果已经提交成功过， 清空编辑页
      if (add_reset){
        rulePageReset($add_panel);
      }
    });
    // 更新规则按钮点击
    $main_menu.find('.rule-update').on('click', function(){
      var $this = $(this);
      var _id = $this.attr('data-id');
      var $update_panel = $sub_panel.find('.rule-update-panel');
      $sub_panel.find('.row').hide();
      $sub_panel.show();
      $update_panel.show();
      $main_menu.hide();
      // 导航条出现
      $admin_crumb.find('.active:first').html('更新规则');
      $admin_crumb.show();
      // 清除编辑记录
      rulePageReset($update_panel);
      // 填充规则数据
      fillRulePage($update_panel, _id);
    });

    // 提交新增规则请求
    var $commit_add = $sub_panel.find('div.rule-add-panel').find('.commitBtn');
    // 提交更新规则请求
    var $commit_update = $sub_panel.find('div.rule-update-panel').find('.commitBtn');
    $commit_add.on('click', function(){
      var $this = $(this),
          $add_panel = $this.parents('div.row');
      submitRule($add_panel, 'add');
    });

    $commit_update.on('click', function(){
      var $this = $(this);
      var $update_panel = $this.parents('div.row');
      submitRule($update_panel, 'update');
    });

    // 规则提交校验
    function submitRule($rule_panel, _type){
      var $panel_form = $rule_panel.find('form');
      var $ueContent = $rule_panel.find('.ueContent');
      var $ueTxt = $rule_panel.find('.ueTxt');
      var _title = $panel_form.find('.title').val();
      var _desc = $panel_form.find('.desc').val();
      var _ico_path = $panel_form.find('.icoPath').val();
      var $tips = $panel_form.find('.alert');
      var _content, _content_txt;

      if (_type == 'add'){
        _content = $Ue.getContent();
        _content_txt = $Ue.getContentTxt();
      }else if(_type == 'update'){
        _content = $Ue2.getContent();
        _content_txt = $Ue2.getContentTxt();
      }

      $ueContent.val(_content);
      $ueTxt.val(_content_txt);
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
      }else if (_content_txt == ''){
        showTips('详情不能为空！', $tips);
        return false;
      }else{
        $panel_form.submit();
      }
    }

    // 规则编辑页重置
    function rulePageReset($rule_panel){
      var $upload_tips = $rule_panel.find('.upload-tips');
      var $upload_pro = $rule_panel.find('.upload-pro');
      var $title = $rule_panel.find('.title');
      var $desc = $rule_panel.find('.desc');
      $title.val('');
      $desc.val('');
      $upload_tips.empty().hide();
      $upload_pro.hide();
      $upload_pro.find('.progress-bar').css('width', '0%').html('');
      $Ue2.execCommand('cleardoc');
    }

    // 填充规则页面数据
    function fillRulePage($rule_panel, _id){
      var $tips = $rule_panel.find('.alert');
      var $title = $rule_panel.find('.title');
      var $desc = $rule_panel.find('.desc');
      var $upload_tips = $rule_panel.find('.upload-tips');
      var $ico_path = $rule_panel.find('.icoPath');
      var $ico_name = $rule_panel.find('.icoName');
      var $rule_id = $rule_panel.find('.ruleId');

      // 异步获取数据
      $.get('tkd/getRuleById', {id: _id},  function(res){
        // 数据库规则内容
        var _title, _desc, _ico_name, _ico_path, _ue_html, _data, _id;

        if (res.error){
          showTips(res.error, $tips);
        }else{
          _data = res.data;
          _title = _data.title?_data.title:'';
          _desc = _data.desc?_data.desc:'';
          _ico_path = _data.ico?_data.ico:'';
          _ico_name = _data.icoName?_data.icoName:'';
          _ue_html = _data.htmlCont?_data.htmlCont:'';
          _id = _data._id?_data._id:'';
          
          $title.val(_title);
          $desc.val(_desc);
          $ico_path.val(_ico_path);
          $ico_name.val(_ico_name);
          $upload_tips.show().html(_ico_name);
          $rule_id.val(_id);
          // 设置编辑器内容
          $Ue2.setContent(_ue_html);
        }
      });

    }

    // 新增、更新提示显示
    function showTips(tips, $tips){
      $tips.html(tips);
      $tips.removeClass('hidden');
      $(window).scrollTop(0);
    }
  }

});