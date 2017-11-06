'use strict';

const LodashMerge = require('lodash.merge');
const AddEmptyRootTypes = require('./add_empty.js');
const GraphQLTools = require('graphql-tools');

const merge = function (fragments) {
    const types = [];
    const resolvers = [];

    for (const fragment of fragments) {
        resolvers.push(fragment.resolvers);
        Array.isArray(fragment.types) ? types.push(...fragment.types) : types.push(fragment.types);
    }

    AddEmptyRootTypes(types, resolvers);

    const mergedResolvers = LodashMerge({}, ...resolvers);

    return GraphQLTools.makeExecutableSchema({ typeDefs: types, resolvers: mergedResolvers });
};

module.exports = merge;
