// 用户列表脚本
$(function(){
  // 公用方法， 邮箱校验
  function validEmail($tipsDom, str){
    var _result = false;
    if (!str || str == ''){
      $tipsDom.removeClass('hidden');
      $tipsDom.html('邮箱不能为空');
    }else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)){
      $tipsDom.removeClass('hidden');
      $tipsDom.html('邮箱格式不对');
    }else{
      _result = true;
    }
    return _result;
  }
  // 路径导航条
  var $admin_crumb = $('#admin-crumb');
  var $to_user = $('#to-user');

  var $remove_btn = $('.removeUser');
  var $remove_submit = $('#removeSubmit');
  var $remove_cancel = $('#removeCancel');
  // 存储待删除用户ID隐藏域
  var $selected_id = $('#selectId');
  // 删除确认弹出框
  var $confirm_dialog = $('#removeConfirm');

  $remove_btn.on('click', function(){
    var $this = $(this);
    var _id = $this.attr('data-id');
    $selected_id.val(_id);
    $confirm_dialog.modal({backdrop:'static'});
  });

  $remove_submit.on('click', function(){
    // 异步请求
    var $this = $(this);
    var _id = $selected_id.val();
    $.post('/admin/user/delete', {id: _id}, function(data){
      if (data.error){
        $('#removeTips').html('删除异常:' + data.error + '  请刷新重试。');
      }else{
        window.location.href = '/admin/users';
      }
    }, 'json');
  });
  $remove_cancel.on('click', function(){
    $selected_id.val('');
  });

  // 一级页面
  var $main_panel = $('#main-panel');
  // 二级页面
  var $sub_panel = $('#sub-panel');
  $main_panel.find('#add-user').on('click', function(){
    var $this = $(this);
    $sub_panel.find('.row').hide();
    $sub_panel.show();
    $sub_panel.find('.add-panel').show();
    $main_panel.hide();
    // 导航条出现
    $admin_crumb.find('.active:first').html('添加用户');
    $admin_crumb.show();
  });
  $sub_panel.find('.back-main').on('click', function(){
    var $this = $(this);
    $sub_panel.find('.row').hide();
    $main_panel.show();
    // 导航条隐藏
    $admin_crumb.hide();
  });
  // 更新按钮 
  $main_panel.find('.update-link').on('click', function(){
    var $this = $(this);
    var _id = $this.attr('data-id');
    var $ajax_tips = $this.next('span');
    var $update_panel = $sub_panel.find('.update-panel');
    var $add_tips = $update_panel.find('#update-tips');
    var $update_form = $update_panel.find('form');
    $this.hide();
    $ajax_tips.show();
    // 导航条出现
    $admin_crumb.find('.active:first').html('更新用户');
    $admin_crumb.show();

    // 异步请求， 获得用户信息
    $.get('user/update', {id: _id},  function(data){
      if (data && data.error){
        $add_tips.removeClass('hidden');
        $add_tips.html('查询异常:' + data.error + '  请刷新重试。');
      }else{
        $sub_panel.find('.row').hide();
        $sub_panel.show();
        $sub_panel.find('.update-panel').show();
        $main_panel.hide();

        $this.show();
        $ajax_tips.hide();
        var User = data.user;
        // 表单值设置
        $update_form.find('#id').val(User._id);
        $update_form.find('#name').val(User.name);
        $update_form.find('#email').val(User.email);
        $update_form.find('#age').val(User.age);
        $update_form.find('#job').val(User.job);
        $update_form.find('#hobby').val(User.hobby);
        $update_form.find('#last-update').html(data.updateAt);
      }
    });
  });


  // 用户添加校验
  var $commit_btn = $sub_panel.find('.commitBtn');
  $commit_btn.on('click', function(){
    var $this = $(this);
    var $user_form = $this.parents('form');
    var $add_tips = $user_form.prev('.alert');
    var _pass = $user_form.find('#pas').val();
    var _confirm_pas = $user_form.find('#confirmPas').val();
    var _email = $user_form.find('#email').val();
    // 按钮自身
    var $this = $(this);
    // 按钮类型 ： 新增、 更新
    var _type = '';

    var _flg = true;
    _flg = validEmail($add_tips, _email);
    if (!_flg){
      return false;
    }else if (!_pass || _pass == ''){
      $add_tips.removeClass('hidden');
      $add_tips.html('密码不能为空');
      _flg = false;
    }else if (_confirm_pas != _pass){
      $add_tips.removeClass('hidden');
      $add_tips.html('确认密码不匹配');
      _flg = false;
    }
    if (_flg){
      // 更新用户，不用判断
      _type = $this.attr('data-type');
      if (_type && _type == 'update'){
        $user_form.trigger('submit');
      }else{
        // 异步请求， 判断该邮箱是否被使用
        $.get('/admin/user/search', {email: _email},  function(data){
          if (data && data.error){
            $add_tips.removeClass('hidden');
            $add_tips.html('查询异常:' + data.error + '  请刷新重试。');
          }else{
            if (data && data._id){
              $add_tips.removeClass('hidden');
              $add_tips.html('邮箱已被使用，请重新填写');
            }else{
              $user_form.trigger('submit');
            }
          }
        });
      }
      
    }
  });
  
  // 用户登录提示
  var $login_btn = $('#loginBtn');
  $login_btn.on('click', function(){
    // 登录表单
    var $login_form = $('#loginForm');
    // 登录信息
    var $login_tips = $('#loginTips');
    var _email = $login_form.find('#email').val();
    var _pas = $login_form.find('#pas').val();
    var _flg = false;
    var _opt = {
      email: _email,
      pas: _pas
    };

    _flg = validEmail($login_tips, _email);
    if (!_flg){
      return false;
    }else if (!_pas || _pas == ''){
      $login_tips.removeClass('hidden');
      $login_tips.html('密码不能为空');
      return false;
    }
    var $loading_ico = $('#loading-ico');
    $loading_ico.show();
    // 异步请求, 校验密码
    $.get('/user/login', _opt, function(data){
      $loading_ico.hide();
      if (data.error){
        $login_tips.removeClass('hidden');
        $login_tips.html(data.error);
      }else{
        var _result = data.result;
        if (_result || _result == 'true'){
          $login_form.trigger('submit');
        }else{
          $login_tips.removeClass('hidden');
          $login_tips.html('用户密码错误！');
        }
      }
    });
  });// end click event

  // 路径导航条事件
  $to_user.on('click', function(){
    $sub_panel.find('.back-main').trigger('click');
  });

});