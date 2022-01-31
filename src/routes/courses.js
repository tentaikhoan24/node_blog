const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController')

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/stored-handle-form-actions', courseController.storedHandleFormActions);
router.post('/trash-handle-form-actions', courseController.trashHandleFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.get('/:id/edit', courseController.edit);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.destroyForce);
router.get('/:slug', courseController.show);

module.exports = router;
