var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
// 数据库保存用户登录信息
var session = require('express-session'),
    mongoStore = require('connect-mongo')(session);
// 图片上传模块
var buyboy = require('connect-busboy');
var dbOptions = require('./dbConfig');
// 路由模块
var routes = require('./routes/index'),
    admin = require('./routes/admin');

// 生成express对象 
var app = express();
// 链接数据库
var db = mongoose.connect(dbOptions.url);
// 连接数据库（数据库设置了密码）
// var dbUrl='mongodb://' + dbOptions.username+':'+dbOptions.password+'@'+dbOptions.host+':'+dbOptions.port+'/'+options.dbName;
// mongoose.connect(dbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 上传文件依赖文件
app.use(buyboy());
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(dbOptions.cookieSecret));
// maxAge session存在的时长，单位：毫秒; 此处设置成保存24小时
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:24 * 60 * 60 * 1000},
    secret: dbOptions.cookieSecret,
    store: new mongoStore({
        db: dbOptions.dbName,
        url: dbOptions.url
    })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// 用户登录信息记录
app.use(function(req, res, next) {
    if (req.session && req.session.user){
        app.locals.user = req.session.user
    }
    next(); 
});

// 路由管理器
app.use('/', routes);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
