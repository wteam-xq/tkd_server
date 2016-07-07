var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    _ = require('underscore');

var HeroSchema = new mongoose.Schema({
  // 所属势力
  country: String,
  // 所属包
  packageType: String,
  // 头像
  ico: String,
  // 头像图片对应名字
  icoName: String,
  // 武将名
  name: String,
  // 武将称号
  nickName:String,
  // Online 战功
  onlineTask: String,
  // 武将技能
  power: [{powerCont:String}],
  // 问答数组
  aqList:[{Q:String, A:String, exception: String}],
  // 身份局攻略
  idStrategy: String,
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

HeroSchema.pre('save', function(next){
  var hero = this;
  if (user.isNew){
    hero.meta.createAt = hero.meta.updateAt = Date.now();
  }else{
    hero.meta.updateAt = Date.now();
  } 
  next();
})


HeroSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort({'name': 'asc'})
      .exec(cb);
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id}).exec(cb);
  },
  findByName: function(name, cb){
    return this
      .find({name: name}).exec(cb);
  },
  createInfo: function(hero, cb){
    return this
      .create(hero, cb);
  },
  updateInfo: function(id, heroObj, cb){
    var heroModel = this;
    // 调用 save 进行更新
    if (!id){
      cb({error: 'id格式不对！'}, 500);
    }
    var _hero = null;
    heroModel.findById(id, function(err, hero){
      if (err){
        cb(err, 500);
        return
      }
      _hero = _.extend(hero, heroObj);
      hero.save(function(error, hero){
        if (error){
          cb(error, 500);
        }
        cb(null, 1);
      });
    });

  },
  deleteInfo: function(id, cb){
    var conditions = {_id: id};
    return this
      .remove(conditions, cb);
  }
};

// 第一参数为 模型名， 第二参数为模型骨架 第三参数对应为 数据库表名
var Hero = mongoose.model('tkdHero', HeroSchema, 'tkdHeros');

module.exports = Hero