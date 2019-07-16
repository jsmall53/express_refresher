import config from 'c0nfig';
import { validateToken } from '../v1/token';
import * as errors from '../utils/errors';
// const version = config.apiVersion;
// const validateToken = require(`../v${version}/token`);

const authCookieName = config.auth.cookieName;

export default function (req, res, next) {
    let token = req.headers['x-access-token'] ||
                req.query.accessToken || 
                (authCookieName && req.cookies[authCookieName]);

    if (!token) {
        return next(new errors.Unauthorized('Access token missing'));
    }
    const email = validateToken(token);
    if (!email) {
        return next(new errors.Unauthorized('Unauthorized user'));
    }
    req.email = email;
    next();
}