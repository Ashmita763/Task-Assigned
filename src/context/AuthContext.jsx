import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Key used to store the JWT token in localStorage
const TOKEN_KEY = "auth_token";

// Create authentication context
const AuthContext = createContext();

// GraphQL backend URL
const GRAPHQL_URL = "http://localhost:3000/graphql";


// 
// GRAPHQL REQUEST HELPER
// 

const graphqlRequest = async (query, variables = {}) => {

  // Get saved JWT token
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    "Content-Type": "application/json",
  };

  // Send token to backend if user is logged in
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Send request to GraphQL server
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  // Handle GraphQL errors
  if (data.errors) {
    const firstError = data.errors[0];

    const message =
      typeof firstError === "string"
        ? firstError
        : firstError?.message || firstError?.extensions?.code;

    throw new Error(
      message || `GraphQL request failed (${response.status})`
    );
  }

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return data.data;
};


// 
// AUTH PROVIDER
// 

export const AuthProvider = ({ children }) => {

  // Store the currently logged-in user
  const [user, setUser] = useState(null);

  // Used while checking the existing login session
  const [loading, setLoading] = useState(true);


  // 
  // RESTORE LOGIN SESSION
  // 

  useEffect(() => {

    const restoreSession = async () => {

      // Check whether a JWT token already exists
      const token = localStorage.getItem(TOKEN_KEY);

      // No token means the user is not logged in
      if (!token) {
        setLoading(false);
        return;
      }

      try {

        // Ask backend for the current user
        const meQuery = `
          query {
            me {
              id
              name
              email
              role
            }
          }
        `;

        const data = await graphqlRequest(meQuery);

        // Restore the user if the token is valid
        if (data?.me) {
          setUser(data.me);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
        }

      } catch (error) {

        console.error("Session restore error:", error);

        // Remove invalid/expired token
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);

      } finally {

        // Authentication check is finished
        setLoading(false);
      }
    };

    restoreSession();

  }, []);


  // 
  // REGISTER
  // 

  const register = async (name, email, password) => {

    try {

      const query = `
        mutation Register(
          $name: String!,
          $email: String!,
          $password: String!
        ) {
          register(
            name: $name,
            email: $email,
            password: $password
          ) {
            success
            message
          }
        }
      `;

      const data = await graphqlRequest(query, {
        name,
        email,
        password,
      });

      if (data?.register?.success) {
        return {
          success: true,
          message:
            data.register.message ||
            "OTP sent for verification. Check your email.",
        };
      }

      return {
        success: false,
        message:
          data?.register?.message || "Registration failed",
      };

    } catch (error) {

      console.error("Register error:", error);

      return {
        success: false,
        message:
          error.message || "Server error. Please try again.",
      };
    }
  };


  // 
  // VERIFY REGISTRATION OTP
  // 

  const verifyRegistrationOtp = async (email, otp) => {

    try {

      const query = `
        mutation VerifyRegistrationOtp(
          $email: String!,
          $otp: String!
        ) {
          verifyRegistrationOtp(
            email: $email,
            otp: $otp
          ) {
            success
            message
          }
        }
      `;

      const data = await graphqlRequest(query, {
        email,
        otp,
      });

      if (data?.verifyRegistrationOtp?.success) {
        return {
          success: true,
          message:
            data.verifyRegistrationOtp.message ||
            "Email verified successfully. You can now login.",
        };
      }

      return {
        success: false,
        message:
          data?.verifyRegistrationOtp?.message ||
          "Email verification failed.",
      };

    } catch (error) {

      console.error(
        "Verify registration OTP error:",
        error
      );

      return {
        success: false,
        message:
          error.message || "Server error. Please try again.",
      };
    }
  };


  // 
  // LOGIN
  // 

  const login = async (email, password) => {

    try {

      const query = `
        mutation Login(
          $email: String!,
          $password: String!
        ) {
          login(
            email: $email,
            password: $password
          ) {
            token
            user {
              id
              name
              email
              role
            }
          }
        }
      `;

      const data = await graphqlRequest(query, {
        email,
        password,
      });

      if (data?.login?.token) {

        // Save JWT token
        localStorage.setItem(
          TOKEN_KEY,
          data.login.token
        );

        // Store logged-in user
        setUser(data.login.user);

        return {
          success: true,
          message: "Login successful.",
          user: data.login.user,
        };
      }

      return {
        success: false,
        message: "Login failed",
      };

    } catch (error) {

      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.message || "Server error. Please try again.",
      };
    }
  };


  // 
  // LOGOUT
  // 

  const logout = () => {

    // Remove JWT token
    localStorage.removeItem(TOKEN_KEY);

    // Clear logged-in user
    setUser(null);
  };


  // 
  // FORGOT PASSWORD
  // 

  const forgotPassword = async (email) => {

    try {

      const query = `
        mutation ForgotPassword($email: String!) {
          forgotPassword(email: $email) {
            success
            message
          }
        }
      `;

      const data = await graphqlRequest(query, { email });

      if (data?.forgotPassword?.success) {
        return {
          success: true,
          message:
            data.forgotPassword.message ||
            "OTP sent successfully.",
        };
      }

      return {
        success: false,
        message:
          data?.forgotPassword?.message ||
          "Unable to send OTP.",
      };

    } catch (error) {

      console.error("Forgot password error:", error);

      return {
        success: false,
        message:
          error.message || "Server error. Please try again.",
      };
    }
  };


  // 
  // VERIFY OTP
  // 

  const verifyOtp = async (email, otp) => {

    try {

      const query = `
        mutation VerifyOtp(
          $email: String!,
          $otp: String!
        ) {
          verifyOtp(
            email: $email,
            otp: $otp
          ) {
            success
            message
          }
        }
      `;

      const data = await graphqlRequest(query, {
        email,
        otp,
      });

      if (data?.verifyOtp?.success) {
        return {
          success: true,
          message:
            data.verifyOtp.message ||
            "OTP verified successfully. You can now reset your password.",
        };
      }

      return {
        success: false,
        message:
          data?.verifyOtp?.message ||
          "OTP verification failed.",
      };

    } catch (error) {

      console.error("Verify OTP error:", error);

      return {
        success: false,
        message:
          error.message || "Server error. Please try again.",
      };
    }
  };


  // 
  // RESET PASSWORD
  // 

  const resetPassword = async (
    email,
    otp,
    newPassword
  ) => {

    try {

      const query = `
        mutation ResetPassword(
          $email: String!,
          $otp: String!,
          $newPassword: String!
        ) {
          resetPassword(
            email: $email,
            otp: $otp,
            newPassword: $newPassword
          ) {
            success
            message
          }
        }
      `;

      const data = await graphqlRequest(query, {
        email,
        otp,
        newPassword,
      });

      if (data?.resetPassword?.success) {
        return {
          success: true,
          message:
            data.resetPassword.message ||
            "Password reset successfully.",
        };
      }

      return {
        success: false,
        message:
          data?.resetPassword?.message ||
          "Password reset failed.",
      };

    } catch (error) {

      console.error("Reset password error:", error);

      return {
        success: false,
        message:
          error.message || "Server error. Please try again.",
      };
    }
  };


  // 
  // PROVIDE AUTH DATA TO THE WHOLE APP
  // 

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        register,
        login,
        logout,

        forgotPassword,
        verifyRegistrationOtp,
        verifyOtp,
        resetPassword,

        // true when user exists, false when user is null
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook used by components to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthProvider;

