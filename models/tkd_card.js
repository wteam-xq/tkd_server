var mongoose = require('mongoose'),
    fileManage = require('../common/fileManage.js'),
    path = require('path'),
    _ = require('underscore');

// 创建卡牌的数据库模型骨架
var TkdCardSchema = new mongoose.Schema({
  title: String,
  desc: String,
  ico: String,
  icoName: String,
  cardList: [{
    htmlCont: String, 
    aqList:[{Q:String, A:String}],
    title:String, 
    anchorId:String, 
    ico:String, 
    icoName:String}],
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

// 保存（更新）卡牌前调用
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
  // 查找卡牌类型列表， 根据标题升序
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
  // 根据_id 查找卡牌类型
  findById: function(id, cbf){
    return this
      .findOne({_id: id}).exec(cbf);
  },
  // 根据规则标题查找卡牌类型
  findByTitle: function(title, cbf){
    return this
      .find({title: title}).exec(cbf);
  },
  // 创建卡牌类型
  createInfo: function(card, cbf){
    return this
      .create(card, cbf);
  },
  // 更新卡牌类型
  updateInfo: function(id, cardObj, cbf){
    var cardModel = this;
    // 调用 save 进行更新
    if (id == undefined || id == ''){
      cbf({error: 'id格式不对！'}, 500);
    }
    var _card = null;
    cardModel.findById(id, function(err, card){
      if (err){
        cbf(err, 500);
        return
      }
      _card = _.extend(card, cardObj);
      card.save(function(error, _card){
        if (error){
          cbf(error, 500);
        }
        cbf(null, 1);
      });
    });
  },
  // 删除卡牌类型
  deleteInfo: function(id, cbf){
    var conditions = {_id: id};
    return this
      .remove(conditions, cbf);
  },
  // 新增卡牌详情
  addCardDetail: function(cardDetailObj, cbf){
    // 卡牌类型ID
    var typeId = cardDetailObj.typeId,
        _card = null,
        cardModel = this;
        
    // 往卡牌类型插入新数据
    cardModel.findById(typeId, function(err, card){
      if (err){
        cbf(err, 500);
        return
      }
      _card = card.cardList.push(cardDetailObj);
      card.save(function(error, _card){
        if (error){
          cbf(error, 500);
        }
        cbf(null, 1);
      });
    });
  },
  // 删除卡牌详情
  removeCardDetail: function(opt, cbf){
    // 卡牌类型ID
    var typeId = opt.typeId,
        detailId = opt.id,
        _card = null,
        cardModel = this,
        cardDetailList = [],
        i,
        findSuccess = false,
        cardDetailObj = null;
        
    // 往卡牌类型插入新数据
    cardModel.findById(typeId, function(err, card){
      if (err){
        cbf(err, 500);
        return
      }
      _card = card;
      cardDetailList = _card.cardList;
      for(i = 0; i < cardDetailList.length; i++){
        cardDetailObj = cardDetailList[i];
        if (cardDetailObj._id == detailId) {
          _card.cardList.splice(i,1);
          // 删除成功后，删除对应图片
          fileManage.deleteImg([path.dirname(__dirname) + '/public' + cardDetailObj.ico]);
          findSuccess = true;
          break;
        }
      }
      if (findSuccess) {
        card.save(function(error, _card){
          if (error){
            cbf(error, 500);
          }
          cbf(null, 1);
        });
      } else {
        cbf(null, 0);
      }
    });
  },
  // 更新卡牌详情
  updateCardDetail: function(opt, cbf){
    // 卡牌类型ID
    var typeId = opt.typeId,
        detailId = opt.id,
        _detailObj = opt.detailObj,
        cardModel = this,
        cardDetailList = [],
        i,
        findSuccess = false,
        cardDetailObj = null;
        
    // 往卡牌类型插入新数据
    cardModel.findById(typeId, function(err, card){
      if (err){
        cbf(err, 500);
        return
      }
      _card = card;
      cardDetailList = _card.cardList;
      for(i = 0; i < cardDetailList.length; i++){
        cardDetailObj = cardDetailList[i];
        if (cardDetailObj._id == detailId) {
          findSuccess = true;
          cardDetailObj.htmlCont = _detailObj.htmlCont;
          cardDetailObj.title = _detailObj.title;
          cardDetailObj.anchorId = _detailObj.anchorId;
          cardDetailObj.ico = _detailObj.ico;
          cardDetailObj.icoName = _detailObj.icoName;
          if(_detailObj.aqList){
            cardDetailObj.aqList = _detailObj.aqList;
          }
          break;
        }
      }
      if (findSuccess) {
        card.save(function(error, _card){
          if (error){
            cbf(error, 500);
          }
          cbf(null, 1);
        });
      } else {
        cbf(null, 0);
      }
    });
  },
  // 根据id查找卡牌详情
  findCardDetailById: function(opt, cbf){
    // 卡牌类型ID
    var typeId = opt.typeId,
        detailId = opt.id,
        _detailObj = null,
        cardModel = this,
        cardDetailList = [],
        i,
        findSuccess = false,
        cardDetailObj = null;
        
    // 往卡牌类型插入新数据
    cardModel.findById(typeId, function(err, card){
      if (err){
        cbf(err, 500);
        return
      }
      cardDetailList = card.cardList;
      for(i = 0; i < cardDetailList.length; i++){
        cardDetailObj = cardDetailList[i];
        if (cardDetailObj._id == detailId) {
          findSuccess = true;
          _detailObj = cardDetailList[i];
          break;
        }
      }
      if (findSuccess) {
        cbf(null, _detailObj);
      } else {
        cbf(null, 0);
      }
    });
  }
};
// 第一参数为 模型名， 第二参数为模型骨架 第三参数对应为 数据库表名
var Card = mongoose.model('tkdcard', TkdCardSchema, 'tkdcard');

module.exports = Card