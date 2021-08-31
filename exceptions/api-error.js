class apiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthError() {
        return new apiError(401, 'Пользователь не авторизирован');
    }

    static BadRequest(message, errors = []) {
        return new apiError(400, message, errors);
    }
}

export { apiError };