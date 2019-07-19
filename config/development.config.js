const host = require('network-address')();

module.exports = {
    port: process.env.PORT || process.env.NODE_PORT || 8081,
    host: host,
    apiVersion: process.env.API_VERSION || 1,
    appUrl: 'http://$(host):$(port)',
    apiUrl: '$(appUrl)/v$(appVersion)',
    bcrypt: {
        hashRounds: 10,
    },
    auth: {
        cookieName: 'auth_token',
        signKey: 'bm9kZS1leHByZXNzLXJlZnJlc2hlcg==',
        tokenTTL: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
};
