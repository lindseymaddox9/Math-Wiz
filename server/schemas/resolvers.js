const { User, Score } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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

    getFlashcards: async ()=>{
      try{
      return Flashcard.find();
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
  },
};

module.exports = resolvers;
