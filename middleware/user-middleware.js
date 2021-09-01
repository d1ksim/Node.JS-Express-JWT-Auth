import { query } from "../db/index.js";
import { apiError } from "../exceptions/api-error.js";

class userMiddleware {
    static async getUserEmailByToken(refreshToken) {
        const { rows } = await query('SELECT * FROM tokens WHERE token_refresh = $1', [refreshToken]);
        if (!rows[0]) {
            throw apiError.BadRequest('Данный токен не найден');
        }
        return rows[0].user_email;
    }
}

export { userMiddleware };