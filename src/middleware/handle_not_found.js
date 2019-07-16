import * as errors from '../utils/errors';

export default function(req, res, next) {
    return next(errors.NotFound());
}