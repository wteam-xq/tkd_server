var express = require('express'),
    router = express.Router(),
    userCtrol = require('../control/userCtrl'),
    UEControl = require('../control/UECtrl'),
    tkdControl = require('../control/tkdCtrl'),
    resumeControl = require('../control/resumeCtrl');

router.get('/test', userCtrol.testList);
//检查用户是否已登录
router.get('/*', checkLogin);
// 后台首页菜单
router.get('/', userCtrol.adminIndex);
router.get('/index', userCtrol.adminIndex);
/*三国杀后台列表页*/
router.get('/tkd', tkdControl.tkdList);
router.get('/tkd/index', tkdControl.tkdList);
router.get('/tkd/cardDetailList', tkdControl.cardDetailList);

// 规则添加、规则更新
router.post('/tkd/ruleAdd', tkdControl.ruleAdd);
router.post('/tkd/ruleUpdate', tkdControl.ruleUpdate);
// 根据ID查找规则
router.get('/tkd/getRuleById', tkdControl.getRuleById);
// 根据ID删除规则
router.post('/tkd/rule/delete', tkdControl.deleteRuleById);

// 卡牌添加、卡牌更新
router.post('/tkd/cardAdd', tkdControl.cardAdd);
router.post('/tkd/cardUpdate', tkdControl.cardUpdate);
// 根据ID查找卡牌
router.get('/tkd/getCardById', tkdControl.getCardById);
// 根据ID删除卡牌
router.post('/tkd/card/delete', tkdControl.deleteCardById);
// 卡牌详情添加、卡牌详情更新
router.post('/tkd/addCardDetail', tkdControl.addCardDetail);
// 根据ID删除卡牌详情
router.post('/tkd/card_detail/delete', tkdControl.deleteCardDetail);
// 更新卡牌详情
router.post('/tkd/updateCardDetail', tkdControl.updateCardDetal);

// 新增武将势力

// 新增武将包

// 上传图标
router.post('/upload/ico', tkdControl.uploadIco);
/*个人简历后台列表页*/
router.get('/resume', resumeControl.resumeIndex);
router.get('/resume/index', resumeControl.resumeIndex);
/* 用户组后台列表页 */
router.get('/users', userCtrol.userList);
// 查询用户(暂根据邮箱查询)
router.get('/user/search', userCtrol.searchUser);
// 添加用户. 
router.route('/user/add')
.post(userCtrol.addUserPost);
// 更新用户 
router.route('/user/update')
.get(userCtrol.updateUser)
.post(userCtrol.updateUserPost);
// 删除用户
router.post('/user/delete', userCtrol.deleteUser);
// UE编辑器后台路由
router.route('/ue/uploads')
.get(UEControl.index)
.post(UEControl.index);
//检查用户是否已登录
function checkLogin(req, res, next){
  // 用户登录不检查
  if (req.session && req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
}
module.exports = router;
