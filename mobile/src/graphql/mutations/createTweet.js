import { gql } from "react-apollo";

export default gql`
mutation createTweet($text: String!) {
    createTweet(text: $text) {
        favoriteCount
        _id
        createdAt
        text
        isFavorited
        user {
            avatar
            username
            firstname
            lastname
        }
    }       
}
`;