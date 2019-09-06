const {Router} = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('userId', 'email name')
      .select('price title img');
    console.log(courses);

    res.render('courses', {
      title: 'Список курсов',
      isCourses: true,
      courses
    });
  } catch (e) {
    console.log(e);
  }

});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course
  });

});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }
  try {
  const course = await Course.findById(req.params.id);
  res.render('course-edit', {
    title: `Редактировать курс ${course.title}`,
    course
  });
  } catch (e) {
    console.log(e);
  }
});

router.post('/edit', async (req, res) => {
  try {
    const {id} = req.body;
    delete req.body.id;
    const course = await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
  } catch (e) {
    console.log(e);
  }
});


router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id
    });
    res.redirect('/courses');
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
