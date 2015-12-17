#### 本地部署（mac 操作系统）
mac 上除了安装、配置mongodb数据库不同外， 其他步骤与window基本相同；

* 确保系统已安装 git 以及 node 环境;(mac 安装git node直接百度 mac git/ mac node即可没什么难度)

* mac终端进入某一目录（建议放置工程的工作目录，例如：Users/userName/mygit）:
```Bash
git clone https://github.com/wteam-xq/tkd_server 
```

* 安装mongodb，生成tkdDb数据库、生成users、tkdtkdrules等表
  * [mac下安装mongodb](http://jingyan.baidu.com/article/6fb756ecbfe474241858fb3b.html)
  * [其他教程](http://blog.csdn.net/lxd875697126/article/details/37660449)

##### mongodb 详细安装步骤:
* 第一步：
	* 到官网下载tgz文件，或者直接按以下链接下载：（国内访问官网大部分时候很卡）
	* 下载地址： http://downloads.mongodb.org/osx/mongodb-osx-x86_64-2.6.3.tgz
 
* 第二步：
	* 打开终端并到下载目录页，输入以下指令解压：
	* 解压缩文件：tar -zxvf mongodb-osx-x86_64-2.6.3.tgz
 
* 第三步：
	* 将解压出来的文件夹重命名并剪切到其他任意文件夹，本人将其改名为“mongodb”然后放置在“applications”文件夹下；（mac 剪切： 先把要剪切的文件按CMD+C复制，然后，到目的位置，按下OPTION+CMD+V粘粘，就会发现复制的源文件已经被剪切过来了。）
	* 在 mongodb 文件夹下创建文件夹 data
 
* 第四步：
	* 在data文件夹下创建文件夹db
	* [文件夹结构 mongodb/data/db]
 
* 第五步：指定数据存放位置
	* 终端进入mongodb/bin目录：
	* 执行命令：./mongod --dbpath /User/yourName/.../mongodb/data/db
	* (本人执行的命令： ./mongod --dbpath ../data/db)
	* //切记是 ./mongod ，网上有的说是mongod 但是我试过是错误的
 
* 第六步：启动mongod
	* 终端进入上述"mongodb/bin"目录，使用命令“./mongod”启动mongoDB server，启动后注意不要关闭终端
 
* 第七步：启动mongo
	* 另外打开一个终端窗口【快捷键 command+T 】，
	* 同样为了方便起见，终端再次进入"mongodb/bin"目录，运行命令"./mongo"
	* 这时可以看到mongoDB的控制台在终端上出现了，这时就可以使用任意mongoDB的命令操作mongoDB数据了，就和使用mysql命令行操作mysql一样；
 
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
* 以上创建表指令后续将去除， 改成导入mongodb数据库实现；


* 打开终端进入工程目录，执行命令： sudo npm install（如已安装[淘宝npm镜像](http://npm.taobao.org/)建议使用： sudo cnpm install）安装npm依赖模块(写入文件默认需要管理员权限)
```Bash
sudo npm install
```
* 打开终端进入工程目录，执行命令： npm start（或 node bin/www）启动项目
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

