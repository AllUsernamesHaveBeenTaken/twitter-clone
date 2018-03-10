export default `
    scalar Date

    type Status {
        message: String!
    }

    type Auth {
        token: String!
    }

    type User {
        _id: ID!
        user: String
        email: String!
        firstname: String
        lastname: String
        avatar: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Me {
        _id: ID!
        user: String
        email: String!
        firstname: String
        lastname: String
        avatar: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Tweet {
        _id: ID!
        text: String!
        user: User!
        favoriteCoun: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        getTweet(_id: ID!): Tweet
        getTweets: [Tweet]
        getUserTweets: [Tweet]        
        me : Me
    }

    type Mutation {
        createTweet(text: String!): Tweet
        updateTweet(_id: ID!, text: String): Tweet
        deleteTweet(_id: ID!): Status

        signup(email: String!, fullname: String!, password: String!, avatar: String, username: String): Auth
        login(email: String!, password: String!): Auth
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;
