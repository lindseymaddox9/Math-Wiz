import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useScore } from '../context/ScoreContext';

const GENERATE_MULTIPLICATION_PROBLEM = gql`
    mutation mathRandom($userId: ID!) {
        generateMath(userId: $userId) {
            num1
            num2
        }
    }`;

const SUBMIT_ANSWER = gql`
    mutation SubmitAnser($userId: ID!, $question: String!, $userAnswer: Int!) {
        submitAnswer(userId: $userId, question: $question, userAnswer: $userAnswer) {
            points}
    }`;

const MultiplicationGame = ({ userId }) => {
    const [num1, setNum1] = useState(null);
    const [num2, setNum2] = useState(null);
    const [answer, setAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(15);
    const { score, setScore } = useScore();
    const [message, setMessage] = useState('');

    const [generateMultiplicationProblem] = useMutation(GENERATE_MULTIPLICATION_PROBLEM, {
        onCompleted: data => {
            setNum1(data.generateMultiplicationProblem.num1);
            setNum2(data.generateMultiplicationProblem.num2);
            setTimeLeft(15);
            setAnswer('');
            setMessage('');
        }
    });

    const [submitAnswer] = useMutation(SUBMIT_ANSWER, {
        onCompleted: data => {
            if (data.submitAnswer.points > 0) {
                setScore(score + data.submitAnswer.points);
                setMessage('Correct!');
            } else {
                setMessage('Incorrect!');
            }
            generateMultiplicationProblem({ variables: { userId } });
            }
        });

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
            } else {
                submitAnswer({ variables: { userId, question: `${num1} x ${num2}`, userAnswer: parseInt(answer) } });
            }
        }, 
        [timeLeft, num1, num2, answer, submitAnswer, userId]);
        
        const handleSubmit = (event) => {
            event.preventDefault();
            submitAnswer({ variables: { userId, question: `${num1} x ${num2}`, userAnswer: parseInt(answer) } });
        };
    
    return (
        <div>
            <h2>Multiplication Game</h2>
            <p>Score: {score}</p>
            {num1 !== null && num2 !== null && (
                <>
                <p>
                    {num1} x {num2}
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    autoFocus
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>Time left: {timeLeft} seconds</p>
                <p>{message}</p>
                </>
            )}
            </div>
        );
    };
        
export default MultiplicationGame;
