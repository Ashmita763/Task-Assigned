const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    expertStatus: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type MutationResult {
    success: Boolean!
    message: String!
  }

  type RegisterResult {
    success: Boolean!
    message: String!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    register(
      name: String!
      email: String!
      phone: String
      role: String
      educationalLevel: String
      faculty: String
      expertise: String
      qualification: String
      experience: Int
      password: String!
    ): RegisterResult

    verifyRegistrationOtp(
      email: String!
      otp: String!
    ): RegisterResult

    resendRegistrationOtp(email: String!): MutationResult

    login(
      email: String!
      password: String!
    ): AuthPayload

    forgotPassword(
      email: String!
    ): MutationResult

    verifyOtp(
      email: String!
      otp: String!
    ): RegisterResult

    resetPassword(
      email: String!
      otp: String!
      newPassword: String!
    ): RegisterResult
  }

`;

module.exports = typeDefs;
