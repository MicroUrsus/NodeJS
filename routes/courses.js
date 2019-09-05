const {Router} = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/',async (req, res) => {
  const courses = await Course.getAll();

  res.render('courses', {
    title: 'Список курсов',
    isCourses: true,
    courses
  });
});

router.get('/:id', async (req, res) => {
  const course = await Course.getByID(req.params.id);
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
  const course = await Course.getByID(req.params.id);
  res.render('course-edit', {
    title: `Редактировать курс ${course.title}`,
    course
  });
});

router.post('/edit', async (req, res) => {
  const course = await Course.update(req.body);
  res.redirect('/courses');
});


module.exports = router;
