const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    singleUser: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);
      res.json({ token, user });

      return user;
    },

    login: async (parent, { body }) => {
      const user = await Profile.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { _id, savedBooks }) => {
      const newBook = await User.findOneAndUpdate(
        { _id },
        { $addToSet: { savedBooks: params.bookId } },
        { new: true }
      );
      return newBook;
    },
    deleteBook: async (parent, { _id, savedBooks }) => {
      const deletedBook = await User.findOneAndUpdate(
        { _id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      return deletedBook;
    },
  },
};

module.exports = resolvers;
