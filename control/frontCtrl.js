var User = require('../models/User');
// 密码加密
var bcrypt = require('bcrypt-nodejs');
var webCtrol = {
}

webCtrol.showLogin = function(req, res){
  res.render('login', { 
    title: '用户登录' 
  });
}

// 用户登录, 用户邮箱、密码校验
webCtrol.login = function(req, res) {
  var _email = req.query.email;
  var _pas = req.query.pas;

  User.findByEmail(_email, function(err, user){
    if (err){
      res.json({error: '根据邮箱查找用户信息，出错'});
    }else if(user && user.password){
      // 密码比较
      var hash_pas = user.password;
      var com_result = bcrypt.compareSync(_pas, hash_pas);
      // 密码正确保存用户登录信息
      if (com_result){
        req.session.user = user;
      }
      res.json({result: com_result});
    }else{
      res.json({error: '用户不存在'});
    }
  });
}
webCtrol.loginPost = function(req, res) {
  var _email = req.body.email;
  var _pas = req.body.pas;

  var _opt = {
    email: _email,
    password: _pas
  };
  
  res.redirect('/admin');
}
webCtrol.logout = function(req, res){
  if (req.session && req.session.user){
    delete req.session.user
  }
  res.redirect('/index');
}
// 前端三国杀FAQ页面
webCtrol.showTkd = function(req, res){
  res.render('tkd', { 
    title: '三国杀FAQ'
  });
}
// 前端简历页面
webCtrol.showResume = function(req, res){
  res.render('resume', { 
    title: '三国杀FAQ'
  });
}
// 前端用户组页面
webCtrol.index = function(req, res){
  User.fetch(function(err, users){
    if (err){
      console.log('查询异常');
    }else{
      res.render('users', { 
        title: '用户组页面' ,
        users: users
      });
    }
  });
}

// ajax测试页面
webCtrol.testGetPage = function (req, res) {
  res.render('ajax', { 
    title: 'ajax测试页面'
  });
}
// ajax测试接口
webCtrol.testGet = function(req, res) {
  // 获取前端参数
  var _param = req.query.name || '';
  res.json({data: 'hello ' + _param});
}

webCtrol.testPost = function(req, res) {
  // 获取前端参数
  var _param = req.body.name || '';
  res.json({data: 'modify name success: ' + _param});
}

module.exports = webCtrol