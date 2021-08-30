import jwt from 'jsonwebtoken';

class userController {
    static generateAccessToken(user_email) {
        const payload = {
            email: user_email
        };
        return jwt.sign(payload, 'fefr4g54yg4fd34tSD#R#@', {expiresIn: "24h"});
    }
}

export {userController};