
var resumeCtrol = {
}

/**************************个人简历后台逻辑************************************/
// 个人简历
resumeCtrol.resumeIndex = function(req, res) {
  res.render('admin/resume_index', {
      title: '个人简历列表页',
      type: 'resume'
    });
};


/**************************个人简历end**********************************/

module.exports = resumeCtrol