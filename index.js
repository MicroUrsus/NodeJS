const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const User = require('./models/user');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const aboutRoutes = require('./routes/about');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
const db_p ='k6hMU23Aaq68QdYT';
const db_url = `mongodb+srv://root:${db_p}@cluster0-s10rv.mongodb.net/shop`;

app.engine(`hbs`,hbs.engine);
app.set(`view engine`, `hbs`);
app.set('views','views');

app.use(async (req, res, next)=>{
  try {
    const user = await User.findById('5d7206b95f1f532c54ef6053');
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }


});


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true}));

app.use('/',homeRoutes);
app.use('/add',addRoutes);
app.use('/courses',coursesRoutes);
app.use('/about',aboutRoutes);
app.use('/card',cardRoutes);
app.use('/orders',ordersRoutes);

const PORT = process.env.PORT || 5555;

async function start() {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'xx@xxx.ru',
        name: 'XXX',
        cart: {items:[]}
      });
      await user.save();
    }

    app.listen(PORT, ()=> {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();




