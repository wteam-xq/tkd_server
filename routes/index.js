var express = require('express'),
    router = express.Router(),
    frontControl = require('../control/frontCtrl'),
    tkdControl = require('../control/tkdCtrl');

// 跨域解决方案（CORS）
router.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    next();
});

// 前端首页
router.get('/', frontControl.index);
router.get('/index', frontControl.index);
// 前端登录页
router.get('/login', frontControl.showLogin);
// 前端三国杀FAQ
router.get('/tkd', frontControl.showTkd);
// 前端简历页面
router.get('/resume', frontControl.showResume);
// 前端git_api页面
router.get('/git_api', frontControl.showGitApi);

router.get('/users/index', frontControl.index);
// 用户登录异步请求
router.route('/user/login')
.get(frontControl.login)
.post(frontControl.loginPost);
// 用户注销
// 用户登录异步请求
router.get('/user/logout', frontControl.logout);
// ajax 测试后台接口
router.get('/test_get', frontControl.testGet);
router.get('/ajax_page', frontControl.testGetPage);
router.post('/test_post', frontControl.testPost);

/**************************三国杀前端json router**************************/
// 三国杀规则列表
router.get('/tkd_rules', tkdControl.tkdRulesList);
router.get('/tkd_rule', tkdControl.getRuleById);
// 三国杀卡牌列表
router.get('/tkd_card', tkdControl.getCardById);
router.get('/tkd_cards', tkdControl.tkdCardList);
// 根据ID查找卡牌详情(id: 卡牌ID typeId： 卡牌类型ID)
router.get('/tkd/getCardDetailById', tkdControl.getCardDetailById);

module.exports = router;
