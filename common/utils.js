/*
author: wteamxq
createDate: 2016-01-05
desc: 本项目的通用工具类
 */
var utilsObj = null;

utilsObj = {
	// 截取固定长度字符串，后缀“...”; 
	cutOutStr: function(str, length){
		var result = "";
		if (!str || str.length <= length) {
			result = str;
		} else {
			result = str.substring(0, length);
			result += "...";
		}
		return result;
	}
};

module.exports = utilsObj;