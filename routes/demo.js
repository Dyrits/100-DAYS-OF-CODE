const express = require('express');
const router = express.Router();

const controller = require('../controllers/demo');

router.get("/", controller.render.welcome);
router.get("/signup", controller.render.signup);
router.get("/login", controller.render.login);
router.get('/admin', controller.render.admin);
router.post('/signup', controller.$users.signup);
router.post('/login', () => {});
router.post('/logout', () => {});

module.exports = router;
