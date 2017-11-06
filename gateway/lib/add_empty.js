'use strict';

/*
This file is just used to detect if the registered types include any "extend type Query", "extend type Mutation"
or "extend type Subscription" root type statements, and if so adds "empty" root types so these can be added.
*/

function rootTypeRegex(rootType) {
    return new RegExp(`\\bextend\\s+type\\s+${rootType}\\s*{([\\S\\s]*?)}`, 'gim');
}

function rootTypeDef(rootType) {
    return `
    # The root-level ${rootType.toLowerCase()} object
    type ${rootType} {
        # This null attribute just makes it easy to join multiple schemas. It is a no-op and is not intended to be used.
        _null: String @deprecated
    }`;
}

function rootTypeResolver(rootType) {
    return {
        [rootType]: {
            _null: function() { return ''; }
        }
    };
}

function addRootGraphqlTypeIfNecessary(rootTypeName, types, resolvers) {
    const originalLength = types.length;
    for (let i = 0; i < originalLength; i++) { //we append to types below, so can't use for let x of array loop
        if (types[i].match(rootTypeRegex(rootTypeName))) {
            types.push(rootTypeDef(rootTypeName));
            resolvers.push(rootTypeResolver(rootTypeName));
            break;
        }
    }

}

function addEmptyRootTypes(types, resolvers) {
    addRootGraphqlTypeIfNecessary('Query', types, resolvers);
    addRootGraphqlTypeIfNecessary('Mutation', types, resolvers);
    addRootGraphqlTypeIfNecessary('Subscription', types, resolvers);
}

module.exports = addEmptyRootTypes;
