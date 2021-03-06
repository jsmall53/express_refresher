import config from 'c0nfig';
import crypto from 'crypto';
import moment from 'moment'

const { signKey, tokenTTL } = config.auth;

function generateToken(email) {
    const timestamp = moment();
    const message = `${email};${timestamp.valueOf()}`;
    // console.log('generating token');
    // TODO: change from 'sha1'
    const hmac = crypto.createHmac('sha1', signKey)
                       .update(message)
                       .digest('hex');
    const token = `${message};${hmac}`;
    const tokenBase64 = Buffer.from(token).toString('base64');
    // console.log('finished generating token');
    return tokenBase64;
}

function validateToken(token) {
    // const decoded = new Buffer(token, 'base64').toString();
    const decoded = Buffer.from(token, 'base64').toString();
    const parsed = decoded.split(';');

    if (parsed.length !== 3) {
        return false;
    }

    const [ email, timestamp, receivedHmac ] = parsed;
    const message = `${email};${timestamp}`;
    const computedHmac = crypto.createHmac('sha1', signKey)
                               .update(message)
                               .digest('hex');
    if (receivedHmac !== computedHmac) {
        return false;
    }
    const currentTimestamp = moment();
    const receivedTimestamp = moment(+timestamp);
    const tokenLife = currentTimestamp.diff(receivedTimestamp);
    if (tokenLife >= tokenTTL) {
        return false;
    }
    // console.log(`token validated: ${email}`);
    return email;
}

export {
    generateToken,
    validateToken,
};