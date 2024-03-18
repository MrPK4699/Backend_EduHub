// resolvers.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');
const { jwtSecret } = require('../config/config');

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find();
    },
    book: async (_, { id }) => {
      return await Book.findById(id);
    },
    users: async () => {
      return await User.find();
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    }
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const book = new Book({ title, author });
      await book.save();
      return book;
    },
    updateBook: async (_, { id, title, author }) => {
      return await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndDelete(id);
    },
    addUser: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    updateUser: async (_, { id, username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.findByIdAndUpdate(id, { username, email, password: hashedPassword }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      return { token };
    },
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      return { token };
    }
  }
};

module.exports = resolvers;
