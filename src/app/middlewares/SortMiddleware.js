module.exports = function SortMiddleware(req, res, next){
    // Create new object
    res.locals._sort = {
        enabled: false,
        type: 'default',
    }

    if(req.query.hasOwnProperty('_sort')){
        // Override object
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        })
    }

    next();
}