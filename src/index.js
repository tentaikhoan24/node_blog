const path = require('path');
const fs = require('fs');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const route = require('./routes');
const app = express();
const port = process.env.PORT;
const database = require('./config/database');
const createErrors = require('http-errors');
require('dotenv').config();

//Connect to database
database.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

//override method
app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('common',{
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

// Custom middleware
app.use(SortMiddleware);

//Temple engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers:{
    sum: (a, b) => a + b,

    sortable: (field, sort)=>{
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi-elevator',
        asc: 'oi-sort-ascending',
        desc: 'oi-sort-descending',
      };
 
      const types={
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      };
      
      const icon = icons[sortType];
      const type = types[sort.type];

      return `<a href="?_sort&column=${field}&type=${type}">
                <span class="oi ${icon}">
                </span>
              </a>`
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


//routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})