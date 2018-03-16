import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  getUserTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.find({ user: user._id }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },
  createTweet: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.create({ ...args, user: user._id });
    } catch (error) {
      throw error;
    }
  },
  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });
       if (!tweet) {
         throw new Error('Tweet not found!');
       }

       Object.entries(rest).forEach(([key, value]) => {
         tweet[key] = value;
       })
       return tweet.save();
    } catch (error) {
      throw error;
    }
  },
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      await Tweet.findByIdAndRemove(_id);
      return {
        message: `Succes! Deleted Tweet with id: ${_id}`
      };
    } catch (error) {
      throw error;
    }
  }
};
