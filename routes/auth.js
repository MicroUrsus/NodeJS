const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError'),
  });
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const candidate = await User.findOne({email});

    if (candidate) {
      const isSame = await bcrypt.compare(password, candidate.password);

      if (isSame) {
        const user = candidate;
        req.session.user = user;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect('/');
        });
      } else {
        req.flash('loginError','неверный пароль');
        res.redirect('/auth/login#login');
      }

    } else {
      req.flash('loginError','пользователь не найден');
      res.redirect('/auth/login#login');
    }

  } catch (e) {
    console.log(e);
  }

});

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login');
  });
});

router.post('/register', async (req, res) => {
  try {
    const {email, name, password, repeat} = req.body;
    const candidate = await User.findOne({email});

    if (candidate) {
      req.flash('registerError','email занят');
      res.redirect('/auth/login#register');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email, name, password: hashPassword, card: {items: []}
      });
      await user.save();
      res.redirect('/auth/login#login');
    }


  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
