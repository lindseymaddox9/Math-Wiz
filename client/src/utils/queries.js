import { gql } from '@apollo/client';

export const GET_FLASHCARDS = gql`
query GetFlashcards{
getFlashcards{
_id
question
answer
 }
}

`;
