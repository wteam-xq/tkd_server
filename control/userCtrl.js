var userCtrol = {
}
//  用户组数据库model
var User = require('../models/user');
// 日期格式化
var moment = require('moment');

// 后台接口原数据显示
userCtrol.testList = function(req, res) {
  User.fetch(function(err, users){
    if (err){
      res.json({error: '查询异常'});
    }else{
      res.json(users);
    }
  });
}

// 后台首页菜单
userCtrol.adminIndex = function(req, res) {
  res.render('admin/index', { title: 'admin_index'});
}

/**************************用户组************************************/
// 查询用户列表
userCtrol.userList = function(req, res) {
  User.fetch(function(err, users){
    if (err){
      console.log('查询异常');
    }else{
      res.render('admin/user_list', { 
        title: 'admin' ,
        users: users
      });
    }
  });
};

// 提交新增用户请求
userCtrol.addUserPost = function(req, res, next) {
  var userObj = {};
  userObj = {
    name: req.body.name,
    age: req.body.age,
    job: req.body.job,
    hobby: req.body.hobby,
    password: req.body.pas,
    email: req.body.email
  };
  
  User.createInfo(userObj, function(err, user){
    if (err){
      console.log('新增用户信息错误');
    }else{
      if (user && user.name){
        res.redirect('/admin/users');
      }
    }
  });
}

// 修改用户信息
userCtrol.updateUser = function(req, res) {
  var id = req.query.id;

  User.findById(id, function(err, user){
    if (err){
      res.json({error: '根据Id查找用户信息，出错'});
    }else{
      // 日期格式化
      var _date_str = moment(user.meta.updateAt).format('YYYY-MM-DD HH:mm:ss');
      var tempUser = {updateAt: _date_str, user: user};
      res.json(tempUser);
    }
  });
}
userCtrol.updateUserPost = function(req, res) {
  var id = req.body.id;
  var userObj = {
    name: req.body.name,
    age: req.body.age,
    job: req.body.job,
    hobby: req.body.hobby,
    password: req.body.pas,
    email: req.body.email
  };
  User.updateInfo(id, userObj, function(err, updateCount){
    if (err){
      console.log(err.error, '   错误码：' + updateCount);
      res.redirect('/admin/users');
    }else{
      res.redirect('/admin/users');
    }
  });
}

// 删除用户
userCtrol.deleteUser = function(req, res) {
  var id = req.body.id;
  User.deleteInfo(id, function(err, updateCount){
    if (err){
      res.json({error:err});
    }else{
      res.json({success: true});
    }
  });
}

// 查询用户(暂时为通过邮箱查询)
userCtrol.searchUser = function(req, res) {
  var email = req.query.email;
  User.findByEmail(email, function(err, user){
    if (err){
      res.json({error:err});
    }else{
      res.json(user);
    }
  });
}

/**************************用户组end************************************/

module.exports = userCtrol