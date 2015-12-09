var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require('underscore');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    unique: true, 
    type: String
  },
  age: Number,
  password: String,
  job: String,
  hobby: String,
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

UserSchema.pre('save', function(next){
  var user = this;
  if (user.isNew){
    user.meta.createAt = user.meta.updateAt = Date.now();
  }else{
    user.meta.updateAt = Date.now();
  } 
  user.password = hashStr(user.password);
  next();
})

// 字符加密处理
function hashStr(str){
  var _result = '';
  if (str != null && str != ''){
    //  同步加密 syn
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    var hash = bcrypt.hashSync(str, salt);
    _result = hash;
  }
  return _result;
}

UserSchema.statics = {
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
  findByEmail: function(email, cb){
    return this
      .findOne({email: email}).exec(cb);
  },
  createInfo: function(user, cb){
    return this
      .create(user, cb);
  },
  updateInfo: function(id, userObj, cb){
    var userModel = this;
    // 调用 save 进行更新
    if (id == undefined || id == ''){
      cb({error: 'id格式不对！'}, 500);
    }
    var _user = null;
    userModel.findById(id, function(err, user){
      if (err){
        cb(err, 500);
        return
      }
      _user = _.extend(user, userObj);
      user.save(function(error, user){
        if (error){
          cb(error, 500);
        }
        cb(null, 1);
      });
    });

    // var conditions = {_id: id};
    // var options = {};
    // var update = {$set: user};
    // return this
    //   .update(conditions, update, options, cb);
  },
  deleteInfo: function(id, cb){
    var conditions = {_id: id};
    return this
      .remove(conditions, cb);
  }
};
// 第一参数为 模型名， 第二参数为模型骨架 第三参数对应为 数据库表名
var User = mongoose.model('user', UserSchema, 'users');

module.exports = User