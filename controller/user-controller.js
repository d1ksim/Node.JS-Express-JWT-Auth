import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import {userService} from "../services/user-service.js";

class userController {
    static async signup(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return console.log('error');
        }

        const { email, password } = req.body;
        const token = await userService.signup(email, password);

        res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.status(200).json(token);
    }
    static async signin(req, res, next) {
        const { email, password } = req.body;
        const token = await userService.signin(email, password);

        res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.status(200).json(token);
    }
    static async logout(req, res, next) {

    }
}

export {userController};