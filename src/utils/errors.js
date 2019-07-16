class NotFound extends Error {
    constructor(msg) {
        super(msg);
        this.msg = msg || 'Not Found';
        this.status = 404;
        Error.captureStackTrace(this);        
    }
}

class Forbidden extends Error {
    constructor(msg) {
        super(msg);
        this.msg = msg || 'Forbidden';
        this.status = 403;
        Error.captureStackTrace(this);
    }
}

class Unauthorized extends Error {
    constructor(msg) {
        super(msg);
        this.msg = msg || 'Unauthorized';
        this.status = 401;
        Error.captureStackTrace(this);
    }
}

class BadRequest extends Error {
    constructor(msg) {
        super(msg);
        this.msg = msg || 'Bad Request';
        this.status = 400;
        Error.captureStackTrace(this);
    }
}

export {
    NotFound,
    Forbidden,
    Unauthorized,
    BadRequest,
};

