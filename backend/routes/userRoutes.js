const express = require("express");
const userController = require("./../controllers/userController")
const authController = require("./../controllers/authController")
const router = express.Router();

router
    .post('/signup', authController.signup);
router
    .post('/login', authController.login);
router
.post('/auth',authController.jwtVerify);

// router
//     .route('/')
//     .get(userController.getAllUsers)
//     .post(userController.addNewUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
router
    .route('/')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;