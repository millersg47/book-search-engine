import { gql } from "@apollo/client";

export const GET_ME = gql`
  query user($_id: int) {
    username
    email
    bookCount
    savedBooks
  }
`;
