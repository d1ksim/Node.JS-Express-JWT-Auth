import jwt from "jsonwebtoken";
import {query} from "../db/index.js";

class tokenService {
    static async generateTokens(user_email) {
        const payload = {
            email: user_email
        };
        const accessToken = jwt.sign(payload, 'fefr4g54yg4fd34tSD#R#@', {expiresIn: "24h"});
        const refreshToken = jwt.sign(payload, 'fjgfdHGBH7678HFHDJ89', {expiresIn: "30d"});

        await query('INSERT INTO tokens (user_email, token_access, token_refresh) VALUES ($1, $2, $3)', [user_email, accessToken, refreshToken]);

        return {
            accessToken,
            refreshToken
        }
    }

    static async generateRefreshToken(user_email, refreshToken) {
        try {
            const {rows} = await query('SELECT * FROM tokens WHERE user_email = $1', [user_email]);

            if (rows[0]) {
                await query('UPDATE tokens SET token_refresh = $1 WHERE user_email = $2', [refreshToken, user_email]);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export {tokenService};