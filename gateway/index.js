'use strict';

const Steerage = require('steerage');
const Path = require('path');
const Hapi = require('hapi');

const start = async function () {
    const server = new Hapi.Server();

    await server.register({
        register: Steerage,
        options: {
            config: Path.join(__dirname, 'config.json')
        }
    });

    await server.start();

    return server;
};

start().then((server) => {
    for (let connection of server.connections) {
        console.log(`${connection.settings.labels} server running at ${connection.info.uri}`);
    }
}).catch((error) => {
    console.log(error);
});
