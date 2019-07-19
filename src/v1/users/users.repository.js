import bcrypt from 'bcrypt';
import config from 'c0nfig';
import usersdb from './users.db';

const { hashRounds } = config.bcrypt;

function create(doc) {
    return new Promise((resolve, reject) => {
        storePassword(doc.password, (err, hash) => {
            if (err) {
                return reject(err);
            }

            let user = Object.assign({}, doc, {
                password: hash,
                createdAt: Date.now(),
            });

            // console.log(`inserting user into database`);
            usersdb.insert(user, (err, saved) => {
                err ? reject(err) : resolve(saved);
            });
        });
    });
}

function findByEmail(email) {
    return new Promise((resolve, reject) => {
        usersdb.findOne({ email }, (err, user) => {
            err ? reject(err) : resolve(user);
        });
    });
}

function storePassword(password, callback) {
    bcrypt.genSalt(hashRounds, (err, salt) => {
        if (err) {
            return callback(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return callback(err);
            }
            callback(null, hash);
        });
    });
}

function comparePassword(toCompare, actual) {
    return new Promise((resolve, reject) => {
        if (!toCompare){
            return resolve(false);
        }
        bcrypt.compare(toCompare, actual, (err, same) => {
            return err ? reject(err) : resolve(same);
        });
    });
}

function transformResponse(user) {
    const { email, userName, firstName, lastName, role } = user;
    return Object.assign({}, { 
        email,
        userName,
        firstName,
        lastName,
        role,
    });
}

export {
    create,
    findByEmail,
    comparePassword,
    transformResponse,
};

