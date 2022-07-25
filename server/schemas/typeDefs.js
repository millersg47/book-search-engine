const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
_id: ID 
username: String
email: String
password: String
savedBooks: 
}

type Book {
}

type Query {
singleUser(_id: ID!): User
}

type Mutation{

}
`;

module.exports = typeDefs;
