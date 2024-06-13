const { User, Score } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

//code to create random multiplication problems between 0 and 12
const randomMath = () => {
  const num1 = Math.floor(Math.random() * 13);
  const num2 = Math.floor(Math.random() * 13);
  const question = `${num1} x ${num2}`;
  const answer = num1 * num2;
  return { question, answer };
};

const resolvers = {
  Query: {
    users: async () => {
      try{
      return User.find();
    }catch(error){
      throw new Error (error.message)
    }
    },

    user: async (parent, { username }) => {
      try{
      return User.findOne({ username });
      }catch(error){
        throw new Error (error.message)
      }
    },
    //generate flashcards with random multiplication problem
    getFlashcards: async ()=>{
      try {
        const flashcards = [];
        for (let i = 0; i < 10; i++) {
          flashcards.push(randomMath());
        }
      return flashcards;
    }catch(error){
      throw new Error (error.message)
    }
    },

    //fetch scores from db based on provided userId
    getScore: async (parent,{userId})=>{
      try{
      if (userId){//find method to search for scores in the score collection of db where user field matches userId
        return Score.find({user: userId}).populate('user');
      }else{
        return Score.find().populate('user');
      }
    }catch(error){
      throw new Error (error.message)
    }
    }
  },

  //MUTATIONS
  Mutation: {

    addUser: async (parent, { username, email, password }) => {
      try{
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    } catch(error){
      throw new Error (error.message);
    }
    },

    login: async (parent, { email, password }) => {
      try{
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    } catch(error){
      throw new Error (error.message);
    }
    },

    submitAnswer: async (parent, { userId, question, userAnswer }) => {
      try {
        const [num1, num2] = question.split(' x ').map(Number);
        const correctAnswer = num1 * num2;

        let points = 0;
        if(correctAnswer === userAnswer) {
          points = 10;
        }

        const userScore = await Score.findOne({ user: userId});
        if (userScore) {
          userScore.score += points;
          await userScore.save();
        } else {
          await Score.create({ user:userId, socre: points});
        }
        return points;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
};

module.exports = resolvers;
