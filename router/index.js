import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controller/user-controller.js";

const router = Router();

router.post('/user/signup',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 12}),
    userController.signup
);
router.post('/user/signin', userController.signin);
router.get('/user/logout', userController.logout);
router.post('/token/refresh');

export { router };