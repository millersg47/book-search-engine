const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
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

    saveBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: bookId } },
          { new: true }
        );
      }
    },
    removeBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: bookId } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
