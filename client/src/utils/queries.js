import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    username
    email
    bookCount
    savedBooks
  }
`;
