/*
author: wteamxq
createDate: 2016-01-05
desc: 本项目的通用工具类
 */
var utilsObj = null;

utilsObj = {
	/**
     * 截取固定长度字符串，后缀“...”
     */
	cutOutStr: function(str, length){
		var result = "";
		if (!str || str.length <= length) {
			result = str;
		} else {
			result = str.substring(0, length);
			result += "...";
		}
		return result;
	},
	/**
     * 输入值是否大于最大长度
     */
    isMoreThanMaxLength : function(value, num) {
        var result = false;

        if (value.toString().length > Number(num)) {
            result = true;
        }

        return result;
    },
    /**
     *  判断是否为手机号
     */
    isMobileNO: function(value){
        return /^1\d{10}$/.test(value);
    },
	/**
	*  判断字符串中文是否大于指定个数(除了26个字母外的所有字符当做一个中文)
	*/
	isMaxChinaLength: function(value, num){
	    var countDouble = 0, txtLen = 0,
	        result = false;
	    countDouble = num * 2;
	    for ( var i = 0; i < value.length; i++){
	        if (value.charCodeAt(i) > 0 && value.charCodeAt(i) < 128){
	            txtLen ++ ;
	        } else {
	            txtLen += 2 ;
	        }
	    }
	    if (txtLen > countDouble){
	        result = true;
	    } 
	    return result;
	}
};

module.exports = utilsObj;