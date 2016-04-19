var crypto = require('crypto'),
  User = require('../models/user.js');


module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: '主页',
      user:req.session.user,
      success:req.flash('suuess').toString(),
      error:req.flash('error').toString()
    });
  });
  app.get('/reg', function (req, res) {
    res.render('reg.ejs', {
      title: '注册',
      user:req.session.user,
      success:req.flash('suuess').toString(),
      error:req.flash('error').toString()
    });
  });
  app.post('/reg', function (req, res) {
    var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
    // 校验用户两次输入的密码是否一致
    if (password_re != password) {
      req.flas('error', '两次输入的密码不一致');
      return res.redirect('/reg');//返回注册页
    }
    // 生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
    });
    // 检测用户名是否已经存在
    User.get(newUser.name, function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      if (user) {
        req.flash('error', '用户名已存在!');
        return res.redirect('/reg');// 返回注册页
      }
      // 如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', 'err');
          return res.redirect('/reg');//注册失败返回主页
        }
        req.session.user = newUser;//用户信息存入session
        req.flash('success', '注册成功');
        res.redirect('/');//注册成功后返回主页
      });
    });
  });
  /**
   * 注意：我们把用户信息存储在了 session 里，以后就可以通过 req.session.user 读取用户信息。
   */



  app.get('/login', function (req, res) {
    res.render('login.ejs', {
      title: '登陆',
      user:req.session.user,
      success:req.flash('success').toString(),
      error:req.flash('error').toString()
    });
  });
  app.post('/login', function (req, res) {
    // 生成密码的md5 值
    var md5 = crypto.createHash('md5'),
      password=md5.update(req.body.password).digest('hex');
    // 检查用户是否存在
    User.get(req.body.name,function (err, user) {
      if(!user){
        req.flash('error','用户不存在!');
        return res.redirect('/login');//用户不存在则跳转到登陆页
      }
      // 检查密码是否一致
      if(user.password!=password){
        req.flash('error','密码错误!');
        return res.redirect('/login');//密码错误则跳转到登陆页
      }
      // 用户名和密码都匹配后，将用户信息存入session
      req.session.user=user;
      req.flash('success','登陆成功');
      res.redirect('/');//登陆成功后跳转到首页
    })
  });
  app.get('/post', function (req, res) {
    res.render('post.ejs', {title: '发表'});
  });
  app.post('/post', function (req, res) {

  });
  app.get('/logout', function (req, res) {
    req.session.user=null;
    req.flash('success','登出成功!');
    res.redirect('/');//登出成功后跳转到首页
  })
};