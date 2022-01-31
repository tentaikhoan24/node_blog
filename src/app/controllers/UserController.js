const Courses = require('../models/Course');

class UserController{
    // [GET] /user/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Courses.find({}).lean();
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }
        
        Promise.all(([courseQuery, Courses.countDocumentsDeleted()]))
            .then(([courses, deletedCount])=>{
                res.render('user/stored-courses',{
                    courses,
                    deletedCount
                })
            })
            .catch(next);
    }

    // [GET] /user/trash/courses
    trashCourses(req, res, next) {
        Courses.findDeleted({})
            .lean()
            .then(courses=>{res.render('user/trash-courses', {courses})})
            .catch(next);
    }
}


module.exports = new UserController();
