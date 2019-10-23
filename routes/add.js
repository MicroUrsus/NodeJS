const {Router} = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Добавление курсов',
    isAdd: true
  });
});

let x = `https://4.bp.blogspot.com/-Ln4-lygomaA/W32QjXN9QFI/AAAAAAAAHrw/bcgryg588rk8awCYdiAiaWcKoq4g7sONACLcBGAs/s1600/nodejs-512.png
https://miro.medium.com/max/894/1*DOJsfgBEBqzudQeakxGBbw.jpeg
https://www.primefaces.org/presskit/primereact-logo.png
`



router.post('/', auth, async (req, res) => {
  //const course = new Course(req.body.title, req.body.price, req.body.img);
  const course = new Course ({
    title: req.body.title,
    price : req.body.price,
    img: req.body.img,
    userId: req.user._id
  });
  try {
    await course.save();
    res.redirect('courses');

  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
