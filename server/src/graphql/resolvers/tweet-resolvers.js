import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

import FavoriteTweet from '../../models/FavoriteTweet';

const TWEET_ADDED = 'tweetAdded';

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
      const promise1 = Tweet.find({}).sort({ createdAt: -1 });
      const promise2 = FavoriteTweet.findOne({ userId : user._id });
      const [tweets, favorites] = await Promise.all([promise1, promise2]);

      const tweetsToSend = tweets.reduce((arr, tweet) => {
        const tweetJSON = tweet.toJSON();
        if (favorites.tweets.some(t => t.equals(tweet._id))) {
          arr.push({
            ...tweetJSON,
            isFavorited: true
          })
        } else {
          arr.push({
            ...tweetJSON,
            isFavorited: false
          })
        }
        return arr;
      }, []);

      return tweetsToSend;
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
      const tweet = await Tweet.create({ ...args, user: user._id });
      
      pubsub.publish(TWEET_ADDED, {[TWEET_ADDED]: tweet});

      return tweet;
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
  },
  favoriteTweet: async (_, {_id}, {user}) => {
    try {
      await requireAuth(user);
      const favorites = await FavoriteTweet.findOne({ userId: user._id});
      
      return favorites.userFavoritedTweet(_id);
    } catch (error) {
      return error;
    }
  },
  tweetAdded: {
    subscribe: () => pubsub.asyncIterator(TWEET_ADDED)
  }
};
