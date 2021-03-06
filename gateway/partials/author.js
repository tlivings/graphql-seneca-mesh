'use strict';

const types = `
    # An author.
    type Author {
        id: ID!
        # The author name.
        name: String
    }
    extend type Query {
        # Seach for an author by id.
        author(id: ID!) : Author
    }
    extend type Mutation {
        # Create a new book.
        author(name: String!) : Author
    }
`;

//TODO: Query and Mutations will be auto generated by parsing the types AST
const resolvers = {
    Query: {
        author(_, { id }, { act }) {
            return act({ query: 'author' }, { id });
        }
    },
    Mutation: {
        author(_, { name }, { act }) {
            return act({ mutation: 'author' }, { name });
        }
    }
};

module.exports = { types, resolvers };
