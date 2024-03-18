// index.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
// const connectDB = require('./db');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

const mongoose = require('mongoose');
const { MongoUrl } = require('./config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

// Connect to MongoDB
connectDB();

// Apply authentication middleware
app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user from the request object if available
    const user = req.user || null;
    return { user };
  },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
