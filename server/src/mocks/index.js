import faker from 'faker';
import Tweet from '../models/Tweet';
import User from '../models/User';

const TWEETS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
  try {
    await Tweet.remove();
    await User.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        username: faker.internet.userName(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randromuser.me/api/women/${i}.jpg`,
        password: 'azerty'
      });

      await Array.from({ length: TWEETS_TOTAL }).forEach(
        async () => await Tweet.create({ text: faker.lorem.sentence(), user: user._id })
      );
    });
  } catch (error) {
    throw error;
  }
};
