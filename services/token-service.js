import jwt from "jsonwebtoken";
import {query} from "../db/index.js";

import { config } from 'dotenv';

config();

class tokenService {
    static async generateTokens(user_email) {
        const payload = {
            email: user_email
        };
        const accessToken = jwt.sign(payload, process.env.TOKEN_ACCESS_KEY, {expiresIn: "24h"});
        const refreshToken = jwt.sign(payload, process.env.TOKEN_REFRESH_KEY, {expiresIn: "30d"});

        await query('INSERT INTO tokens (user_email, token_access, token_refresh) VALUES ($1, $2, $3)', [user_email, accessToken, refreshToken]);

        return {
            accessToken,
            refreshToken
        }
    }

    static async generateRefreshToken(refreshToken) {
        try {
            const { rows } = await query('SELECT * FROM tokens WHERE token_refresh = $1', [refreshToken]);

            if (rows[0]) {
                await query('UPDATE tokens SET token_refresh = $1 WHERE token_refresh = $2', [refreshToken]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async validateAccessToken(accessToken) {

    }
}

export {tokenService};