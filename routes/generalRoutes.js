const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');

router.get('/index', generalController.getIndex);
router.get('/login', generalController.getLogin);
router.post('/login', generalController.postLogin);
router.get('/register', generalController.getRegister);
router.get('/logout', generalController.getLogout);
router.post('/register', generalController.postRegister);
router.get('/', generalController.getIndex);

router.get('/reset_password', generalController.getResetUser);
router.post('/reset_password', generalController.postResetUser);



module.exports = router;
