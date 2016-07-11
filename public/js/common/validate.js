var ValidateObj = {
    //校验特殊字符& < > " ' / \ = %
    /**
     * 校验特殊字符校验
     *
     */
    hasSpecialChar : function(value) {
        var specialReg = /[&<>"'\/\\=%]/gi;

        return specialReg.test(value);
    },
    /**
     * 去掉参数值前后的空格
     */
    trimSpace : function(value) {
        return value.toString().trim();
    },
    /**
     * 是否全都是数字
     * value:输入的值
     */
    isAllNumber : function(value) {
        var result = false, numberReg = /^\d+$/gi;

        if (numberReg.test(value) === true) {
            result = true;
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
     *  判断字符串中文是否大于指定个数
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