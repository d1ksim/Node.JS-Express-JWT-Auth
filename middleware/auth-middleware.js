import { apiError } from "../exceptions/api-error.js";

function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(apiError.unauthError());
        }
    } catch (e) {
        return next(apiError.unauthError());
    }
}

export { authMiddleware };