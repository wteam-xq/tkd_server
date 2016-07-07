// 存储小数据（防止mongodb嵌套太深，如武将包管理、势力数据独立成一类）
var mongoose = require('mongoose'),
    _ = require('underscore');

// tkd其他的数据库模型骨架（任意数据类型）
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
  // 根据类型，更新表数据
  updateInfo: function(id, otherObj, cb){
    var TkdOtherModel = this;
    // 调用 save 进行更新
    if (!id){
      cb({error: 'id格式不对！'}, 500);
    }
    TkdOtherModel.findById(id, function(err, other){
      if (err){
        cb(err, 500);
        return
      }
      // 用 otherObj 数据覆盖 other
      _.extend(other, otherObj);
      other.save(function(error, other){
        if (error){
          cb(error, 500);
        }
        cb(null, 1);
      });
    });
  },
  // 删除指定类型数据：势力 或 包
  deleteInfo: function(id, cb){
    var conditions = {_id: id};
    return this
      .remove(conditions, cb);
  }
};
// 第一参数为 模型名， 第二参数为模型骨架 第三参数对应为 数据库表名
var TkdOther = mongoose.model('tkdOther', TkdOtherSchema, 'tkdOthers');

module.exports = TkdOther
