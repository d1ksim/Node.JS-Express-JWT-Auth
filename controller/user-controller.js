import { validationResult } from "express-validator";
import { userService } from "../services/user-service.js";
import { apiError } from "../exceptions/api-error.js";
import { userMiddleware } from "../middleware/user-middleware.js";
import {query} from "../db/index.js";

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
        try {
            res.clearCookie('refreshToken');
        } catch (e) {
            next(e);
        }
    }

    static async getUserInfo(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const user_email = await userMiddleware.getUserEmailByToken(refreshToken);

            const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [user_email]);
            if (!rows[0]) {
                throw apiError.BadRequest(`Данный пользователь не найден`);
            }

            res.status(200).json(rows[0]);
        } catch (e) {
            next(e);
        }
    }

    static async editProfile(req, res, next) {
        try {
            /*
                params - параметр БД который мы изменяем(пр. user_avatar).
                data - новые данные.
            */
            const { params, data } = req.body;
            const { refreshToken } = req.cookies;

            const user_email = await userMiddleware.getUserEmailByToken(refreshToken);
            const status = await userService.editProfile(user_email, params, data);

            if (!status) {
                throw apiError.BadRequest('Сбой в работе метода editProfile');
            }
            return res.status(200).json({status: status});
        } catch (e) {
            next(e);
        }
    }
}

export { userController };