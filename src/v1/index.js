import express from 'express';

import version from './version';
import users from './users';

export default function() {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        res.json(version);
        next();
    });

    router.use('/users', users());

    return router;
}
