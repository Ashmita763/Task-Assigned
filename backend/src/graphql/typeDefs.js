const typeDefs = `

  // Registers the Int scalar so we can use it for the expert experience field.
  scalar Int


  // ==========================================
  // USER TYPE
  // ==========================================
  // Defines the data that can be returned for a user.
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!

    // NEW:
    // Stores the current approval status of an expert.
    //
    // Possible values:
    // "pending"  -> waiting for admin approval
    // "approved" -> admin approved the expert
    // "rejected" -> admin rejected the application
    //
    // Students can have this as null.
    expertStatus: String
  }


  // ==========================================
  // LOGIN RESPONSE
  // ==========================================
  // Returned when a user successfully logs in.
  // Contains the JWT token and user information.
  
  type AuthPayload {
    token: String!
    user: User!
  }


  // ==========================================
  // GENERAL MUTATION RESPONSE
  // ==========================================
  // Used by mutations that only need to return
  // success/failure information and a message.
  type MutationResult {
    success: Boolean!
    message: String!
  }


  // ==========================================
  // REGISTRATION RESPONSE
  // ==========================================
  // Used when registering a new user.
  //
  // In addition to success/message, we return
  // the newly created user's information.
  //
  // This is important for Expert registration
  // because React needs to know the expertStatus.
  type RegisterResult {
    success: Boolean!
    message: String!
    user: User
  }


  // ==========================================
  // QUERIES
  // ==========================================
  type Query {

    // Returns the currently logged-in user.
    me: User
  }


  // ==========================================
  // MUTATIONS
  // ==========================================
  type Mutation {


    // ========================================
    // REGISTER
    // ========================================
    // Creates a new student or expert account.
    //
    // Student-specific fields:
    // - educationalLevel
    // - faculty
    //
    // Expert-specific fields:
    // - expertise
    // - qualification
    // - experience
    //
    // The role determines which type of account
    // is being created.
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


    // ========================================
    // VERIFY REGISTRATION OTP
    // ========================================
    // Verifies the OTP sent during registration.
    verifyRegistrationOtp(
      email: String!
      otp: String!
    ): RegisterResult


    // ========================================
    // LOGIN
    // ========================================
    // Logs the user in and returns:
    //
    // - JWT token
    // - User information
    //
    // expertStatus will be included for experts.
    login(
      email: String!
      password: String!
    ): AuthPayload


    // ========================================
    // FORGOT PASSWORD
    // ========================================
    // Sends a password-reset OTP/email.
    forgotPassword(
      email: String!
    ): MutationResult


    // ========================================
    // VERIFY OTP
    // ========================================
    // Verifies the OTP used for password recovery.
    verifyOtp(
      email: String!
      otp: String!
    ): RegisterResult


    // ========================================
    // RESET PASSWORD
    // ========================================
    // Changes the user's password after OTP
    // verification.
    resetPassword(
      email: String!
      otp: String!
      newPassword: String!
    ): RegisterResult
  }

`;

module.exports = typeDefs;
