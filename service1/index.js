'use strict';

const Seneca = require('seneca');

const pattern = { query: 'author' };

const service = Seneca({log: 'debug'}).add(pattern, function (message, reply) {
    reply(null, {
        id: 1,
        name: 'J.R.R Tolkien'
    });
});

service.use('mesh', {
    isbase: false,
    pin: pattern
});
