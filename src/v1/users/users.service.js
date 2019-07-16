import { generateToken } from '../token';
import * as errors from '../../utils/errors';
import * as userRepo from './users.repository';

async function findUserByEmail(req, res, next) {
    try {
        const email = req.email || req.body.email;
        console.log(`trying to find user iwth email: ${email}`);
        req.user = await userRepo.findByEmail(email);
        next();
    } catch (err) {
        next(err);
    }
}

async function signupUser(req, res, next) {
    try {
        if (req.user) {
            // TODO: this doesn't really make sense
            return next(new errors.BadRequest('Email is already registered'));
        }
        req.user = await userRepo.create(req.body);
        next();
    } catch (err) {
        next(err);
    }
}

async function loginUser(req, res, next) {
    try {
        if (!req.user) {
            return next();
        }
        const same = await userRepo.comparePassword(req.body.password, req.user.password);
        if (!same) {
            return next(new errors.BadRequest('Incorrect password for email address'))
        }
        next();
    } catch (err) {
        next(err);
    }
}

async function generateAccessToken(req, res, next) {
    try {
        if (!req.user){
            return next();
        }
        req.accessToken = await generateToken(req.user.email);
        next();
        console.log(req.accessToken);
    } catch (err) {
        next(err);
    }
}

function returnUser(req, res, next) {
    if (!req.user) {
        return next(
            new errors.NotFound('User with this email is not found'));
    }
    const user = userRepo.transformResponse(req.user);
    const data = req.accessToken ? { accessToken: req.accessToken, user } : user;
    res.json(data);
}

export {
    findUserByEmail,
    signupUser,
    loginUser,
    generateAccessToken,
    returnUser
};