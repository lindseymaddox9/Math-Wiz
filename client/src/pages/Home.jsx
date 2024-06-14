import React, {useState} from 'react';
import {useQuery, useMutation, from} from '@apollo/client';
import { GET_FLASHCARDS } from '../utils/queries';
import { SUBMIT_ANSWER } from '../utils/mutations';

const Home = () => {
  const {loading, error, data, refetch}= useQuery(GET_FLASHCARDS);
  const[submitAnswer]=useMutation(SUBMIT_ANSWER)
  const [currentCard, setCurrentCard]= useState(null);
  const[userAnswer, setUserAnswer]= useState('');
  const[isFlipped, setIsFlipped]= useState(false)
  
  const flipCard=() =>{
    setIsFlipped(!isFlipped)
  }

  const handleNextCard=()=>{
    
  }

  return (
    <main>
      home
    </main>
  );
};

export default Home;
