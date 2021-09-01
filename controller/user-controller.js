import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import { userService } from "../services/user-service.js";
import { apiError } from "../exceptions/api-error.js";

class userController {
    static async signup(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw apiError.BadRequest('Неккоректно введены данные');
            }

            const {email, password} = req.body;
            const token = await userService.signup(email, password);

            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(token);
        } catch (e) {
            next(e);
        }
    }

    static async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await userService.signin(email, password);

            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(token);
        } catch (e) {
            next(e);
        }
    }

    static async logout(req, res, next) {
        res.clearCookie('refreshToken');
    }

    static async getUserInfo(req, res, next) {
        try {
            const { refreshToken } = req.cookies();
            console.log(refreshToken);
        } catch (e) {
            next(e);
        }
    }
}

export { userController };