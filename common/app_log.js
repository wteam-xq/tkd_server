var fs = require('fs');
var logPath = "public/server_log/log.txt";

var appLog = {
	writeErrorLog: function(fileStr, errorStr){
		var This = this;
		var writeStr = this.getSystemTime() + " " + fileStr + " : " + errorStr + "\n";
		fs.appendFile(logPath, writeStr,'utf8',function(err){
		    if(err){
		        console.log(err);
		    }
		});
	},
	// 获取系统时间
	getSystemTime: function(){
		var sys_y, sys_month, sys_d,
			sys_h, sys_m, sys_s, result = "";
		var toDay = new Date();
		sys_y = toDay.getFullYear();
		sys_month = this.doubleCount(toDay.getMonth() + 1);
		sys_d = this.doubleCount(toDay.getDate());
		sys_h = this.doubleCount(toDay.getHours());
		sys_m = this.doubleCount(toDay.getMinutes());
		sys_s = this.doubleCount(toDay.getSeconds());

		result += sys_y + "-" + sys_month + "-" + sys_d + " ";
		result += sys_h + ":" + sys_m + ":" + sys_s;
		return result;
	},
	// 保证数字两位显示
	doubleCount: function(str){
		var targetNum = parseInt(str, 10),
			result = 0;
		if ( !isNaN(targetNum) && targetNum > 10 ) {
			result = targetNum;
		} else {
			result = "0" + targetNum;
		}
		return result;
	}
};

module.exports = appLog;
