import { gql } from "react-apollo";

export default gql`
  mutation signup(
    $fullname: String!
    $username: String!
    $email: String!
    $password: String!
    $avatar: String!
  ) {
    signup(
      fullname: $fullname
      username: $username
      email: $email
      password: $password
      avatar: $avatar
    ) {
      token
    }
  }
`;
