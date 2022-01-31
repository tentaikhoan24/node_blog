const Course = require('../models/Course');

class CourseController {
  show(req, res, next) {
    // [GET] /courses/:slug
    Course.findOne({ slug: req.params.slug })
      .then((course) => res.render('courses/show', course))
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }
  
  // [PSST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${formData.videoID}/hqdefault.jpg`;
    const course = new Course(formData);
    course.save().then(res.redirect('/')).catch();
  }

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById({ _id: req.params.id })
      .then((courses) => {
        res.render('courses/edit', courses);
      })
      .catch(next);
  }

  //[PUT] /courses/:id/edit
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/user/stored/courses'))
      .catch(next);
  }

  //[PUT] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('/user/trash/courses'))
      .catch(next);
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] /courses/:id/force
  destroyForce(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[POST] /courses/stored-handle-form-actions
  storedHandleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({_id: {$in: req.body.courseIds}})
        .then(() => res.redirect('back'))
        .catch(next);
        break;
      default:
        res.json({message: 'Action is invalid!!!'})
    }
  }

  // [POST] /courses/trash-handle-form-actions
  trashHandleFormActions(req, res, next){
    switch (req.body.action) {
      case 'restore':
        Course.restore({_id: {$in : req.body.courseIds}})
        .then(()=> res.redirect('back'))
        .catch(next);
        break;
      case 'delete':
        Course.deleteMany({_id: {$in : req.body.courseIds}})
        .then(()=> res.redirect('back'))
        .catch(next);
        break;
      default:
        res.json({message: 'Action is invalid'})
    }
  }
}

module.exports = new CourseController();
