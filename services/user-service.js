import { query } from "../db/index.js";
import bcrypt from "bcryptjs";
import { tokenService } from "./token-service.js";

class userService {
    static async signup(email, password) {
        const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (rows[0]) {
            return console.log('Данный пользователь существует');
        }
        const hashPassword = await bcrypt.hash(password, 15);
        await query('INSERT INTO users (user_email, user_password) VALUES ($1, $2)', [email, hashPassword]);

        return await tokenService.generateTokens(email);
    }
    static async signin(email, password) {
        const { rows } = await query('SELECT * FROM users WHERE user_email = $1', [email]);

        if (!rows[0]) {
            return console.log('User not found');
        }

        const passwordIsValid = await bcrypt.compare(password, rows[0].user_password);
        if (!passwordIsValid) {
            return console.log('Password is invalid');
        }

        return await tokenService.generateTokens(email);
    }
}

export { userService };