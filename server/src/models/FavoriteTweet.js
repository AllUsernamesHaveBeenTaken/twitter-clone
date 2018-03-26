import mongoose, { Schema } from 'mongoose';

import Tweet from './Tweet';
import { TWEET_FAVORITED } from '../graphql/resolvers/tweet-resolvers';
import { pubsub } from '../config/pubsub';

const FavoriteTweetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});

FavoriteTweetSchema.methods = {
    async userFavoritedTweet(tweetId) {
        if (this.tweets.some(tweet => tweet.equals(tweetId))) {
            this.tweets.pull(tweetId);
            await this.save();
    
            const tweet = await Tweet.decFavoriteCount(tweetId);
            const tweetJSON = tweet.toJSON(); 

            pubsub.publish(TWEET_FAVORITED, {[TWEET_FAVORITED]: {...tweetJSON}});
    
            return {
              isFavorited: false,
              ...tweetJSON
            }
          }
    
          const tweet = await Tweet.incFavoriteCount(tweetId);
          const tweetJSON = tweet.toJSON(); 
    
          this.tweets.push(tweetId);
          await this.save();

          pubsub.publish(TWEET_FAVORITED, {[TWEET_FAVORITED]: {...tweetJSON}});

          return {
            isFavorited: true,
            ...tweetJSON
          }
    }
}

FavoriteTweetSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('FavoriteTweet', FavoriteTweetSchema);