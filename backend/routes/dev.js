const controller = require('../controller/dev');
const router = require('express').Router();

router.get('/version', controller.version);


// router.post('/register', controller.handleRegister);

// app.post("/register", (req, res) =>{ register.handleRegister(req, res, db, bcrypt)});

module.exports = router;

