const { User } = require("../models");

const resolvers = {
  Query: {
    singleUser: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);
      res.json({ token, user });

      return user;
    },
    saveBook: async (parent, { _id, savedBooks }) => {
      const newBook = await User.findOneAndUpdate(
        { _id },
        { $addToSet: { savedBooks: body } },
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
