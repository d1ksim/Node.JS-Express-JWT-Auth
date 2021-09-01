import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controller/user-controller.js";
import { tokenController } from "../controller/token-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

router.post('/user/signup',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 12}),
    userController.signup
);
router.post('/user/signin', userController.signin);
router.get('/user/logout', userController.logout);
router.get('/user/getUserInfo', authMiddleware, userController.getUserInfo);

router.post('/token/refresh', tokenController.refresh);

export { router };