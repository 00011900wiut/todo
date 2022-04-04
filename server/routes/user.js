const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get('/', user_controller.view);
router.post('/', user_controller.find);
router.get('/adduser', user_controller.form);
router.post('/adduser', user_controller.create);

module.exports = router;