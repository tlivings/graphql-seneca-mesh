'use strict';

const Apollo = require('apollo-server-hapi');
const Merge = require('./lib/merge');
const Seneca = require('seneca');

const register = async function (server, { partials }, next) {

    const mesh = Seneca({log: 'debug'}).use('mesh', { isbase: true });

    const schema = Merge(partials);

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
                  context: { act, request }
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

    next();
};

register.attributes = {
    name: 'graphql-server',
    version: '1.0.0'
};

module.exports = register;
