var express = require('express');
var router = express.Router();
var controller = require('../controllers/commentController')


router.route('/')
    .get(controller.list)
    .post(controller.create)

router.route('/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.remove)

    module.exports = router