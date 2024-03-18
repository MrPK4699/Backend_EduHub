# Backend_Idea_clan 

This is the backend for the Idea Clan application, which provides a GraphQL API for managing books and users, as well as implementing authentication features.

## Usage

1. Start the server:

npm start

2. The server will be running at `http://localhost:3000`. You can access the GraphQL Playground at this URL to test the API.

## Endpoints

The API provides the following endpoints:

- `/graphql`: The GraphQL endpoint for executing queries and mutations.

## GraphQL Schema

The GraphQL schema defines the following types and operations:

- Types:
  - Book: Represents a book with ID, title, and author fields.
  - User: Represents a user with ID, username, and email fields.
  - AuthPayload: Represents the authentication payload with a token field.

- Queries:
  - books: Retrieves all books.
  - book(id): Retrieves a single book by ID.
  - users: Retrieves all users.
  - user(id): Retrieves a single user by ID.

- Mutations:
  - addBook(title, author): Adds a new book.
  - updateBook(id, title, author): Updates an existing book.
  - deleteBook(id): Deletes a book.
  - addUser(username, email, password): Adds a new user.
  - updateUser(id, username, email, password): Updates an existing user.
  - deleteUser(id): Deletes a user.
  - login(email, password): Logs in a user and returns a JWT token.
  - register(username, email, password): Registers a new user and returns a JWT token.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.