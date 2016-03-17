// 存储小数据
var mongoose = require('mongoose'),
    _ = require('underscore');

// tkd其他的数据库模型骨架
var TkdOtherSchema = new mongoose.Schema({
  countryList: [{name:String}],
  packageList: [{name:String}]
});

// 数据模型方法(实际调用时， this 指向的是model对象)
TkdOtherSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .exec(cb);
  },
  // 首次更新时先调用该创建方法
  createInfo: function(other, cb){
    return this
      .create(other, cb);
  },
  // 根据类型， 更新表数据
  updateInfo: function(type, otherObj, cb){
    
  },
  deleteInfo: function(type, cb){
    
  }
};
// 第一参数为 模型名， 第二参数为模型骨架 第三参数对应为 数据库表名
var TkdOther = mongoose.model('tkdOther', TkdOtherSchema, 'tkdOthers');

module.exports = TkdOther
