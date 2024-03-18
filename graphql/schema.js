// schema.js

const {gql} = require('apollo-server');

const typedefs= gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String!, author: String!): Book!
    deleteBook(id: ID!): Book
    addUser(username: String!, email: String!, password: String!): User!
    updateUser(id: ID!, username: String!, email: String!, password: String!): User!
    deleteUser(id: ID!): User
    login(email: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
  }
`
module.exports=typedefs;