'use strict';

const types = `
    type Book {
        id: ID!
        name: String
    }
    extend type Query {
        book(id: ID!) : Book
    }
`;

//TODO: Query and Mutations will be auto generated by parsing the types AST
const resolvers = {
    Query: {
        book(_, { id }, { act }) {
            return act({ query: 'book' }, { id });
        }
    }
};

module.exports = { types, resolvers };
