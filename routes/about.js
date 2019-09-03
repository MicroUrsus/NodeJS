const {Router} = require('express');
const router = Router();

router.get('/',(req, res) => {
  res.render('about', {
    title: 'О курсах',
    isAbout: true
  });
});

module.exports = router;
