const Course = require('../models/Course');

class SiteController {
  home(req, res) {
    Course.find({})
    .lean()
    .then(courses => {
      res.render('home',{
        courses})
    })
    .catch();
  }

  search(req, res) {
    return res.render('search');
  }
}

module.exports = new SiteController();
