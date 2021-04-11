var express = require('express');
var router = express.Router();
var controller = require('../controllers/postController')

router.route('/')
    .get(controller.list)
    .post(controller.create)

router.route('/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.remove)

router.route('/:id/likes')
    .get(controller.likes)

router.route('/:id/comments')
    .get(controller.comments)
module.exports = router