import jwt from "jsonwebtoken";
import {query} from "../db";

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

    async saveToken(id, refreshToken) {

    }
}

export {tokenService};