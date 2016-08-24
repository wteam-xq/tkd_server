
var gitApiCtrol = {
}

/**************************个人简历后台逻辑************************************/
// 个人简历
gitApiCtrol.gitApiIndex = function(req, res) {
  res.render('admin/git_api_index', {
      title: 'git_api首页',
      type: 'git_api'
    });
};


/**************************个人简历end**********************************/

module.exports = gitApiCtrol