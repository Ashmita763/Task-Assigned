import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//
// CONSTANTS
// 

const TOKEN_KEY = "auth_token";

const GRAPHQL_URL = "http://localhost:3000/graphql";

// =====================================================
// CREATE AUTH CONTEXT
// =====================================================

const AuthContext = createContext();

// =====================================================
// GRAPHQL REQUEST HELPER
// =====================================================

const graphqlRequest = async (query, variables = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    const firstError = data.errors[0];

    const message =
      firstError?.message ||
      firstError?.extensions?.code ||
      `GraphQL request failed (${response.status})`;

    throw new Error(message);
  }

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return data.data;
};

// =====================================================
// AUTH PROVIDER
// =====================================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===================================================
  // RESTORE LOGIN SESSION
  // ==================================================

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
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

        if (data?.me) {
          setUser(data.me);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
        }
      } catch (error) {
        console.error("Session restore error:", error);

        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ===================================================
  // REGISTER
  // ===================================================

  const register = async ({
    name,
    email,
    phone,
    role,
    educationalLevel,
    faculty,
    expertise,
    qualification,
    experience,
    password,
  }) => {
    try {
      const query = `
        mutation Register(
          $name: String!
          $email: String!
          $phone: String!
          $role: String!
          $educationalLevel: String
          $faculty: String
          $expertise: String
          $qualification: String
          $experience: Int
          $password: String!
        ) {
          register(
            name: $name
            email: $email
            phone: $phone
            role: $role
            educationalLevel: $educationalLevel
            faculty: $faculty
            expertise: $expertise
            qualification: $qualification
            experience: $experience
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
        phone,
        role,
        educationalLevel: educationalLevel || null,
        faculty: faculty || null,
        expertise: expertise || null,
        qualification: qualification || null,
        experience:
          experience !== "" &&
          experience !== undefined &&
          experience !== null
            ? Number(experience)
            : null,
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
          data?.register?.message || "Registration failed.",
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

  // ===================================================
  // VERIFY REGISTRATION OTP
  // ===================================================

  const verifyRegistrationOtp = async (email, otp) => {
    try {
      const query = `
        mutation VerifyRegistrationOtp(
          $email: String!
          $otp: String!
        ) {
          verifyRegistrationOtp(
            email: $email
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
          error.message ||
          "Server error. Please try again.",
      };
    }
  };

  const resendRegistrationOtp = async (email) => {
    try {
      const query = `
        mutation ResendRegistrationOtp($email: String!) {
          resendRegistrationOtp(email: $email) {
            success
            message
          }
        }
      `;

      const data = await graphqlRequest(query, { email });
      return {
        success: Boolean(data?.resendRegistrationOtp?.success),
        message:
          data?.resendRegistrationOtp?.message ||
          "Could not send a verification code.",
      };
    } catch (error) {
      console.error("Resend registration OTP error:", error);
      return {
        success: false,
        message: error.message || "Server error. Please try again.",
      };
    }
  };

  // ===================================================
  // LOGIN
  // ===================================================

  const login = async (email, password) => {
    try {
      const query = `
        mutation Login(
          $email: String!
          $password: String!
        ) {
          login(
            email: $email
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

      if (data?.login?.token && data?.login?.user) {
        localStorage.setItem(
          TOKEN_KEY,
          data.login.token
        );

        setUser(data.login.user);

        return {
          success: true,
          message: "Login successful.",
          user: data.login.user,
        };
      }

      return {
        success: false,
        message: "Login failed.",
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.message ||
          "Server error. Please try again.",
      };
    }
  };

  // ------------------------------------------
  // LOGOUT
  // ------------------------------------------

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  // ===================================================
  // FORGOT PASSWORD
  // ===================================================

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

      const data = await graphqlRequest(query, {
        email,
      });

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
          error.message ||
          "Server error. Please try again.",
      };
    }
  };

  // ===================================================
  // VERIFY FORGOT PASSWORD OTP
  // ===================================================

  const verifyOtp = async (email, otp) => {
    try {
      const query = `
        mutation VerifyOtp(
          $email: String!
          $otp: String!
        ) {
          verifyOtp(
            email: $email
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
          error.message ||
          "Server error. Please try again.",
      };
    }
  };

  // ===================================================
  // RESET PASSWORD
  // ===================================================

  const resetPassword = async (
    email,
    otp,
    newPassword
  ) => {
    try {
      const query = `
        mutation ResetPassword(
          $email: String!
          $otp: String!
          $newPassword: String!
        ) {
          resetPassword(
            email: $email
            otp: $otp
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
          error.message ||
          "Server error. Please try again.",
      };
    }
  };

  // ===================================================
  // PROVIDER VALUE
  // ===================================================

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
        resendRegistrationOtp,
        verifyOtp,
        resetPassword,

        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;