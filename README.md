##1. 安装express生成器
> npm install express-generator -g

##2. 生成项目 
> express -e todolist
> cd todolist && npm install

##3. 安装bower命令行工具
```npm install -g bower```

> 一定要注意是全局安装，不要安装到本地，一定要-g参数

##4. 初始化bower配置文件
```bower init```

##5. 在项目下添加配置文件  .bowerrc
{"directory":"./public/lib"}
>如果没有此配置项，则将安装到`bower_components`目录下
> 注意文件名一定不能错，只能叫`.bowerrc`


#6. 依次安装前端框架
```
bower install jquery --save
bower install angular --save
bower install bootstrap --save
```
> 加--save的作用是把这个库添加到bower.json配置文件中的dependencies中
> 这样别人下载下来仓库的时候只要执行`bower install`就可以安装所有的依赖库了

> 如果报git的错误可能是因为在安装git的时候选择了第一项，也就是说只能在git-bash下使用git命令。
> 可以重新安装git,并选择第三项，也就是说可以在命令行中使用git命令

#6. 初始化git仓库
```git init```

#7.在github上新建一个空项目
> 一定是新的空项目

#8.添加并提交代码并推送到远程仓库
```
git add -A
git commit -m"init"
git remote add origin 远程仓库
git push -u origin master
```

#9.安装mongodb
```
npm install mongoose --save
```
