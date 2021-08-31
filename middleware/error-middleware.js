import { apiError } from "../exceptions/api-error.js";

function errorMiddleware(err, req, res, next) {
    if (err instanceof apiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}

export { errorMiddleware };