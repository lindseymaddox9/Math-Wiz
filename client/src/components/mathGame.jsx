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

