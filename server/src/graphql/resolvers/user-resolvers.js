import User from '../../models/User';
import { requireAuth } from '../../services/auth';
import FavoriteTweet from '../../models/FavoriteTweet';

export default {
  signup: async (_, { fullname, ...rest }) => {
    try {
      const [firstname, ...lastname] = fullname.split(' ');
      const user = await User.create({ firstname, lastname, ...rest });
      await FavoriteTweet.create({ userId: user._id });

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User does not excist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('The password dot not match!');
      }

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      return me;
    } catch (error) {
      throw error;
    }
  }
};
