'use strict';

const Seneca = require('seneca');
const Hapi = require('hapi');
const Apollo = require('apollo-server-hapi');
const Merge = require('./lib/merge');

const mesh = Seneca({log: 'debug'}).use('mesh', { isbase: true });

const start = async function ({ port, partials = [] } = {}) {
    const server = new Hapi.Server();

    server.connection({ port: 8000 });

    const schema = Merge([require('./lib/partials/book'), require('./lib/partials/author')]);

    const act = function (a, b) {
        return new Promise((resolve, reject) => {
            mesh.act(a, b, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    };

    await server.register([{
        register: Apollo.graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: (request) => {
                return {
                  schema,
                  context: { act, request },
                  formatError: (err) => { console.log(err.stack); return err }
                };
            },
            route: {
              cors: true
            }
        }
    }, {
        register: Apollo.graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            }
        }
    }]);

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
