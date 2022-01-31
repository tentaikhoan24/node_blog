const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./courses');
const userRouter = require('./user');

const createErrors = require('http-errors');
const { renderSync } = require('node-sass');


function route(app) {
  app.use('/user', userRouter);
  app.use('/courses', courseRouter);
  app.use('/news', newsRouter);
  app.use('/', siteRouter);
  app.use((req, res, next) => {
    next(createErrors.NotFound('This path dose not exist'));
  })
  app.use((err, req, res, next) => {
    res.json({ 
      status: err.status || 500,
      message: err.message
    })
  })
}

module.exports = route;
