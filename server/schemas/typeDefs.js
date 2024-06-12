//FixMe: Do we need Getflashcards(are we doing it on the fly or predefined) & get score for query [lines 31&32 type query]
//ASK:about line 33 type query (scores)
const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    score: [Int]! #score at bottom when user is logged in
  }

  type Flashcard {
    _id: ID
    question: String
    answer: Int
  }

  type Score {
    _id: ID
    user: User
    score: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User  
    getFlashcards: [Flashcard]
    getScore(userId:ID!): [Score] #TODO: Add highscore @ end
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
