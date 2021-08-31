import { Router } from 'express';
import { query } from '../db/index.js';
import bcrypt from 'bcryptjs';
import { tokenService }  from "../services/token-service.js";

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
    /*
        В примере по node-postgres.com было написано const {id},
        Как понять когда писать в скобках а когда нет, или нет разницы кроме импортов?
    */
    const { email, password } = req.body;
    const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (rows[0]) {
        return res.status(400).json({message: 'Данный пользователь существует'});
    }
    const hashPassword = await bcrypt.hash(password, 15);
    await query('INSERT INTO users (user_email, user_password) VALUES ($1, $2)', [email, hashPassword]);

    const token = await tokenService.generateTokens(email);
    res.status(200).json({message: "Пользователь успешно создан", access_token: token});
});

authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (!rows[0]) {
        return res.status(400).json({message: 'Данного пользователя не существует'});
    }

    const passwordIsValid = await bcrypt.compare(password, rows[0].user_password);
    if (!passwordIsValid) {
        return res.status(400).json({message: 'Пароль не верный'});
    }

    const token = await tokenService.generateTokens(email);
    res.status(200).json({message: "Пользователь успешно авторизирован", access_token: token});
});

export { authRouter };