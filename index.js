const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');


const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const aboutRoutes = require('./routes/about');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

const db_p ='k6hMU23Aaq68QdYT';
const db_url = `mongodb+srv://root:${db_p}@cluster0-s10rv.mongodb.net/shop`;

const store = new MongoStore ({
  collection: 'sessions',
  uri: db_url
});



app.engine(`hbs`,hbs.engine);
app.set(`view engine`, `hbs`);
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true}));
app.use(session({
  secret: 'some secret value',
  resave:false,
  saveUninitialized: false,
  store
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/',homeRoutes);
app.use('/add',addRoutes);
app.use('/courses',coursesRoutes);
app.use('/about',aboutRoutes);
app.use('/card',cardRoutes);
app.use('/orders',ordersRoutes);
app.use('/auth',authRoutes);

const PORT = process.env.PORT || 5555;

async function start() {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useFindAndModify: false
    });

    app.listen(PORT, ()=> {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();




