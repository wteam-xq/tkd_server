/*
author: wteamxq
createDate: 2015-03-08
desc: 文件操作相关库
 */
var fs = require('fs');

var fileManage = {
	deleteImg: function(imgList){
		var url = '',
			i, len;
		len = imgList.length;
		for(i = 0; i < len; i++){
			url = imgList[i];
			fs.unlink(url);
		}
	}
};

module.exports = fileManage;
