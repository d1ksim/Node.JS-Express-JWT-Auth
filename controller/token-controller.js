import { tokenService } from "../services/token-service.js";

class tokenController {
    static async refresh(req, res, next) {
        const { email, refreshToken } = req.body;
        await tokenService.generateRefreshToken(email, refreshToken)
    }
}

export { tokenController };