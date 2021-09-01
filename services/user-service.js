import { query } from "../db/index.js";
import bcrypt from "bcryptjs";
import { tokenService } from "./token-service.js";
import { apiError } from "../exceptions/api-error.js";

class userService {
    static async signup(email, password) {
        const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (rows[0]) {
            throw apiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 15);
        await query('INSERT INTO users (user_email, user_password) VALUES ($1, $2)', [email, hashPassword]);
        return await tokenService.generateTokens(email);
    }

    static async signin(email, password) {
        const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (!rows[0]) {
            throw apiError.BadRequest('User not found');
        }

        const passwordIsValid = await bcrypt.compare(password, rows[0].user_password);
        if (!passwordIsValid) {
            throw apiError.BadRequest('Password is invalid');
        }
        return await tokenService.generateTokens(email);
    }

    static async editProfile(email, params, data) {
        try {
            await query(`UPDATE users SET ${params} = $1 WHERE user_email = $2`, [data, email]);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export { userService };