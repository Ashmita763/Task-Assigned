const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type MutationResult {
    success: Boolean!
    message: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): MutationResult
    verifyRegistrationOtp(email: String!, otp: String!): MutationResult
    login(email: String!, password: String!): AuthPayload
    forgotPassword(email: String!): MutationResult
    verifyOtp(email: String!, otp: String!): MutationResult
    resetPassword(email: String!, otp: String!, newPassword: String!): MutationResult
  }
`;

module.exports = typeDefs;