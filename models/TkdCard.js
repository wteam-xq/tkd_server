var mongoose = require('mongoose'),
    _ = require('underscore');

// 创建规则的数据库模型骨架
var TkdCardSchema = new mongoose.Schema({
  title: String,
  desc: String,
  ico: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
});

// 保存（更新）规则前调用
TkdCardSchema.pre('save', function(next){
  var card = this;
  if (card.isNew){
    card.meta.createAt = card.meta.updateAt = Date.now();
  }else{
    card.meta.updateAt = Date.now();
  } 
  next();
})

// 数据模型方法(实际调用时， this 指向的是model对象)
TkdCardSchema.statics = {
  // 查找规则列表， 根据标题升序
  fetch: function(opt, cbf){
    return this
      .find({})
      .skip(opt.skipCount)
      .limit(opt.pageSize)
      .sort({'title': 'asc'})
      .exec(cbf);
  },
  fetchAll: function(cbf){
    return this
      .find({})
      .sort({'title': 'asc'})
      .exec(cbf);
  },
  // 根据_id 查找规则
  findById: function(id, cbf){
    return this
      .findOne({_id: id}).exec(cbf);
  },
  // 根据规则标题查找规则
  findByTitle: function(title, cbf){
    return this
      .find({title: title}).exec(cbf);
  },
  // 创建规则
  createInfo: function(rule, cbf){
    return this
      .create(rule, cbf);
  },
  // 更新规则
  updateInfo: function(id, ruleObj, cbf){
    var ruleModel = this;
    // 调用 save 进行更新
    if (id == undefined || id == ''){
      cbf({error: 'id格式不对！'}, 500);
    }
    var _rule = null;
    ruleModel.findById(id, function(err, rule){
      if (err){
        cbf(err, 500);
        return
      }
      _rule = _.extend(rule, ruleObj);
      rule.save(function(error, rule){
        if (error){
          cbf(error, 500);
        }
        cbf(null, 1);
      });
    });
  },
  // 删除规则
  deleteInfo: function(id, cbf){
    var conditions = {_id: id};
    return this
      .remove(conditions, cbf);
  }
};
// 第一参数为 模型名， 第二参数为模型骨架 第三参数对应为 数据库表名
var Card = mongoose.model('tkdcard', TkdCardSchema, 'tkdcard');

module.exports = Card