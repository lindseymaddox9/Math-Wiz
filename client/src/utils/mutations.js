import { gql } from '@apollo/client';

export const SUBMIT_ANSWER = gql`
mutation SubmitAnswer($userId:ID!, $question: String!, $userAnswer: Int){
submitAnswer(userId: $userId, question:$question, userAnswer: $userAnswer){
correct
score{
  _id
  user{
    _id
    username
    email
  }
  score
  }
  }
}
  
`;
