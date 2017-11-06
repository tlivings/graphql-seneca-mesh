'use strict';

const Seneca = require('seneca');

const pattern = { query: 'book' };

const service = Seneca({log: 'debug'}).add(pattern, function (message, reply) {
    reply(null, {
        id: 1,
        name: 'The Hobbit'
    });

});

service.use('mesh', {
    isbase: false,
    pin: pattern
});
