const {Router} = require('express');
const router = Router();

router.get('/',(req, res) => {
  res.render('index', {
    title: 'Страница заказов',
    isHome: true
  });
});


module.exports = router;
