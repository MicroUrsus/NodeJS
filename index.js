const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const aboutRoutes = require('./routes/about');
const cardRoutes = require('./routes/card');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
const db_p ='k6hMU23Aaq68QdYT';
const db_url = `mongodb+srv://root:${db_p}@cluster0-s10rv.mongodb.net/test?retryWrites=true&w=majority`;

app.engine(`hbs`,hbs.engine);
app.set(`view engine`, `hbs`);
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true}));

app.use('/',homeRoutes);
app.use('/add',addRoutes);
app.use('/courses',coursesRoutes);
app.use('/about',aboutRoutes);
app.use('/card',cardRoutes);

const PORT = process.env.PORT || 5555;

async function start() {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true
    });
    app.listen(PORT, ()=> {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();




