function defaultHandler(err) {
    let status = err.status || 500;
    let errors = Array.isArray(err) ? err : [err];
    
    if (status === 500) {
        console.error(err.stack);
        errors = [{message : 'Internal Server Error'}];
    }

    return { status, errors };
}

export default function(err, req, res, next) {
    let errorHandler = defaultHandler;
    let {status, errors } = errorHandler(err);
    res.status(status).json({ errors });
}