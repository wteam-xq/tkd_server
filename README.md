
### 三国杀faq 第三版（模块化开发／后台管理）

* 技术点： mongodb express bootstrap jquery

=======

#### 本地部署（win7 64bit, mac部署请点击:[mac_deploy](https://github.com/wteam-xq/tkd_server/blob/master/mac_deploy.md)）  

* 确保本地已安装 git 以及 node 环境
  * win7下安装git [git 安装教程地址](http://wenku.baidu.com/view/e7d838999b89680203d825ba)
  * ps：访问git、TortoiseGit安装包的网址可能需要翻墙， 如无法下载， 根据“msysgit” “TortoiseGit”搜索国内网站下载安装包。
  * window 下安装node [node 安装教程地址](http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html)

* 在某文件夹 右键-》“git bash” 运行以下命令行下载项目:
```Bash
git clone https://github.com/wteam-xq/tkd_server 
```
* 安装mongodb（最好配置成window服务），生成tkdDb数据库、生成users、tkdtkdrules等表
  * 手动安装mongodb, 下载地址： [mongodb下载](http://pan.baidu.com/s/1qWG5Lr2)
  * mongodb 配置以及设置成windows服务：[配置mongodb](http://blog.csdn.net/liusong0605/article/details/10574863)
  * mongodb shell 控制台使用: [mongodb 基本命令](http://www.cnblogs.com/xusir/archive/2012/12/24/2830957.html)

```Bash
mongo
MongoDB shell version: 2.6.5
connecting to: test

use tkdDb
switched to db tkdDb

db.createCollection("users")
{ "ok" : 1}
db.createCollection("tkdrules")
{ "ok" : 1}
db.createCollection("tkdcard")
{ "ok" : 1}

```

*ps: 如果配置 mongodb 成window服务 遇到“服务名无效” 的问题， 请单击左下角"开始"图标-》所有程序-》附件-》右键“命令提示符” 以管理员身份运行*

* 进入工程目录 打开cmd运行 npm install（如已安装[淘宝npm镜像](http://npm.taobao.org/)建议使用： cnpm install 安装node_modules的依赖模块
```Bash
npm install
```

* 工程目录下 打开cmd运行 npm start（或 node bin/www）启动项目
```Bash
npm start
```
```Bash
node bin/www
```

* 首次进入后台创建用户， 需修改以下文件： routes/admin.js
```javascript
//检查用户是否已登录(修改前)
router.get('/*', checkLogin);


//检查用户是否已登录（修改后）
//router.get('/*', checkLogin);
```
* 打开浏览器（建议 chrome）输入： `localhost:3001`访问网站


