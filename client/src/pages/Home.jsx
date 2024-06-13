import React, {useStatae} from 'react';
import {useQuery, useMutation, from} from '@apollo/client';
import { GET_FLASHCARDS } from '../utils/queries';
import { SUBMIT_ANSWER } from '../utils/mutations';

const Home = () => {
  const {loading, error, data, refetch}= useQuery(GET_FLASHCARDS);
  const[submitAnswer]=useMutation(SUBMIT_ANSWER)
  

  return (
    <main>
      home
    </main>
  );
};

export default Home;
