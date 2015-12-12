### 开发计划
* 本周完成 后台迁移；myResume项目后台(tkd未完成后代部分)代码迁移至该项目；
* 找到新版本 UI， 在该UI； 根据该UI 完成个人首页；（必须杜绝乱引库）

* 后台需要将报错日志保存在硬盘中，而不是输出在控制台（console）;
* 学习如何导入、导出mongodb数据库；（使用指令或可视化工具）;
* 考虑改动数据库表结构，一个页面对应一个目录类的表；根据目录表获得详细表内容；
* 返回数组类型，应该都包括分页相关参数: pageNum:1; pageSize:10; totalPage:1;
* model.find().skip(start).limit(pageSize).exex(cbCbf);

### 开发日志
* 2015-12-9  将三国杀faq完成中的后台代码迁移；剔除无关代码。
* 2015-12-11 三国杀规则添加检索表；


### 遗留bug


### 小总结：
* 实战中少用最新技术， 例如: coffeeScript， 这货不可调试；
* 实战小技巧，nodejs 代码保存自动重启：[node-dev](https://www.npmjs.com/package/node-dev);
* 实战小技巧, nodejs 调试工具： (nodejs 调试还是比较麻烦的)
  * 1.[node-inspector](http://jingyan.baidu.com/article/dca1fa6fbd580ff1a44052de.html)
  * 2.如果你使用webStorm编辑器， 则可以[在IDE中调试](http://jingyan.baidu.com/article/73c3ce28eafb95e50343d9ee.html)