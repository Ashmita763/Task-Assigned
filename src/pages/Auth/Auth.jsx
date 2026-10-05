
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  // ===================================================
  // LOGIN / REGISTER STATE
  // ===================================================

  // true  = Login form
  // false = Registration form
  const [isLogin, setIsLogin] = useState(true);

  // ===================================================
  // REGISTRATION ROLE
  // ===================================================
  // IMPORTANT:
  // Admin is NOT included here.
  // Only Student and Expert can register.

  const [registerRole, setRegisterRole] = useState("student");

  // ===================================================
  // FORM STATES
  // ===================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Student fields
  const [educationalLevel, setEducationalLevel] = useState("");
  const [faculty, setFaculty] = useState("");

  // Expert fields
  const [expertise, setExpertise] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");

  // Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error message
  const [error, setError] = useState("");

  // React Router navigation
  const navigate = useNavigate();

  // Authentication functions from AuthContext
  const { login, register } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send email and password to AuthContext
      const result = await login(email, password);

      // Check whether login failed
      if (!result?.success) {
        if (
          result?.message ===
          "Please verify your email before logging in."
        ) {
          navigate("/verify-otp", {
            state: {
              email,
              mode: "register",
            },
          });
          return;
        }

        setError(result?.message || "Login failed.");
        return;
      }

      // Get role returned from backend
      const role = result?.user?.role?.trim().toLowerCase();


      if (role === "admin") {
        navigate("/admin");
        return;
      }

      // =================================================
      // EXPERT LOGIN
      // =================================================

      if (role === "expert") {
        navigate("/expert-dashboard");
        return;
      }

      // =================================================
      // STUDENT LOGIN
      // =================================================

      if (role === "student") {
        navigate("/dashboard");
        return;
      }

      // =================================================
      // INVALID ROLE
      // =================================================

      setError("Invalid user role.");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error?.message || "Something went wrong during login."
      );
    }
  };

  // ===================================================
  // REGISTER
  // ===================================================
  // Only Student and Expert can register.
  //
  // Admin registration is NOT available.

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // =================================================
    // EXTRA SECURITY CHECK
    // =================================================
    // Even though the UI does not provide an Admin
    // registration button, we also prevent an Admin
    // role from being submitted from this component.

    if (
      registerRole !== "student" &&
      registerRole !== "expert"
    ) {
      setError(
        "Only Student and Expert accounts can register."
      );
      return;
    }

    // =================================================
    // CONFIRM PASSWORD
    // =================================================

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // =================================================
    // PASSWORD VALIDATION
    // =================================================

    // Minimum 8 characters
    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    // Uppercase letter
    if (!/[A-Z]/.test(password)) {
      setError(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    // Lowercase letter
    if (!/[a-z]/.test(password)) {
      setError(
        "Password must contain at least one lowercase letter."
      );
      return;
    }

    // Number
    if (!/\d/.test(password)) {
      setError(
        "Password must contain at least one number."
      );
      return;
    }

    // Special character
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError(
        "Password must contain at least one special character."
      );
      return;
    }

    // =================================================
    // REGISTER USER
    // =================================================

    try {
      const result = await register({
        name,
        email,
        phone,

        // IMPORTANT:
        // This can ONLY be "student" or "expert".
        // Admin is never sent from registration.
        role: registerRole,

        // =================================================
        // STUDENT FIELDS
        // =================================================

        educationalLevel:
          registerRole === "student"
            ? educationalLevel
            : null,

        faculty:
          registerRole === "student"
            ? faculty
            : null,

        // =================================================
        // EXPERT FIELDS
        // =================================================

        expertise:
          registerRole === "expert"
            ? expertise
            : null,

        qualification:
          registerRole === "expert"
            ? qualification
            : null,

        experience:
          registerRole === "expert"
            ? experience
            : null,

        password,
      });

      // Registration failed
      if (!result?.success) {
        setError(
          result?.message || "Registration failed."
        );
        return;
      }

      // =================================================
      // REGISTRATION SUCCESS
      // =================================================

      // Clear password fields
      setPassword("");
      setConfirmPassword("");

      // Send user to OTP verification
      navigate("/verify-otp", {
        state: {
          email,
          mode: "register",
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error?.message ||
          "Something went wrong during registration."
      );
    }
  };

  // ===================================================
  // SWITCH TO LOGIN
  // ===================================================

  const handleLoginTab = () => {
    setIsLogin(true);
    setError("");

    // Clear registration-specific error/state if needed
  };

  // ===================================================
  // SWITCH TO STUDENT REGISTER
  // ===================================================

  const handleStudentTab = () => {
    setIsLogin(false);
    setRegisterRole("student");
    setError("");
  };

  // ===================================================
  // SWITCH TO EXPERT REGISTER
  // ===================================================

  const handleExpertTab = () => {
    setIsLogin(false);
    setRegisterRole("expert");
    setError("");
  };

  // ===================================================
  // UI
  // ===================================================

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4 sm:px-6 py-8">

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="w-full md:w-1/2 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Learn, Grow and Connect with Experts!!
          </h1>

          <p className="mt-5 text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl mx-auto leading-relaxed">
            Explore courses and assessments from different
            categories for free, build your skills, and
            connect with experts whenever you need
            personalized guidance.
          </p>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-7 md:p-8">

          {/* =================================================
              LOGIN / STUDENT / EXPERT TABS
              
              IMPORTANT:
              There is NO Admin registration tab.

              Admin uses Login only.
          ================================================= */}

          <div className="grid grid-cols-3 gap-1 bg-gray-100 rounded-xl p-1 mb-7">

            {/* LOGIN */}

            <button
              type="button"
              onClick={handleLoginTab}
              className={`py-3 rounded-lg font-semibold transition ${
                isLogin
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Login
            </button>

            {/* STUDENT REGISTRATION */}

            <button
              type="button"
              onClick={handleStudentTab}
              className={`py-3 rounded-lg font-semibold transition ${
                !isLogin &&
                registerRole === "student"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Student
            </button>

            {/* EXPERT REGISTRATION */}

            <button
              type="button"
              onClick={handleExpertTab}
              className={`py-3 rounded-lg font-semibold transition ${
                !isLogin &&
                registerRole === "expert"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Expert
            </button>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="mb-5 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* =================================================
              LOGIN FORM
              
              Admin uses this same form.
          ================================================= */}

          {isLogin && (
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back!!
                </h2>

                <p className="text-gray-500 mt-2">
                  Login to continue learning.
                </p>
              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* FORGOT PASSWORD */}

              <div className="text-right">

                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Login
              </button>

              {/* GOOGLE */}

              <button
                type="button"
                className="w-full border border-gray-300 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

            </form>
          )}

          {/* =================================================
              REGISTER FORM

              Only Student and Expert can reach this form.
          ================================================= */}

          {!isLogin && (
            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* CREATE ACCOUNT */}

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Create Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Join us and start learning.
                </p>

              </div>

              {/* FULL NAME */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* =================================================
                  STUDENT FIELDS
              ================================================= */}

              {registerRole === "student" && (
                <>

                  {/* EDUCATIONAL LEVEL */}

                  <div>

                    <label className="block mb-2 font-medium text-gray-700">
                      Educational Level
                    </label>

                    <select
                      value={educationalLevel}
                      onChange={(e) =>
                        setEducationalLevel(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                      required
                    >

                      <option value="">
                        Select educational level
                      </option>

                      <option value="SEE">
                        SEE
                      </option>

                      <option value="+2">
                        +2 Graduate
                      </option>

                      <option value="bachelor">
                        Bachelor's Graduate
                      </option>

                      <option value="master">
                        Master's Graduate
                      </option>

                    </select>

                  </div>

                  {/* FACULTY */}

                  <div>

                    <label className="block mb-2 font-medium text-gray-700">
                      Faculty / Course
                    </label>

                    <select
                      value={faculty}
                      onChange={(e) =>
                        setFaculty(e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                      required
                    >

                      <option value="">
                        Select faculty
                      </option>

                      <option value="UI/UX">
                        UI/UX
                      </option>

                      <option value="Frontend Development">
                        Frontend Development
                      </option>

                      <option value="Full Stack Development">
                        Full Stack Development
                      </option>

                    </select>

                  </div>

                </>
              )}

              {/* =================================================
                  EXPERT FIELDS
              ================================================= */}

              {registerRole === "expert" && (
                <>

                  {/* EXPERTISE */}

                  <div>

                    <label className="block mb-2 font-medium text-gray-700">
                      Area of Expertise
                    </label>

                    <input
                      type="text"
                      value={expertise}
                      onChange={(e) =>
                        setExpertise(e.target.value)
                      }
                      placeholder="e.g. Frontend Development"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                      required
                    />

                  </div>

                  {/* QUALIFICATION */}

                  <div>

                    <label className="block mb-2 font-medium text-gray-700">
                      Qualification
                    </label>

                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) =>
                        setQualification(e.target.value)
                      }
                      placeholder="e.g. Bachelor's in Computer Science"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                      required
                    />

                  </div>

                  {/* EXPERIENCE */}

                  <div>

                    <label className="block mb-2 font-medium text-gray-700">
                      Years of Experience
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={experience}
                      onChange={(e) =>
                        setExperience(e.target.value)
                      }
                      placeholder="e.g. 5"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                      required
                    />

                  </div>

                </>
              )}

              {/* PASSWORD */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="e.g. Abc@1234"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block mb-2 font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  required
                />

              </div>

              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Create Account
              </button>

              {/* GOOGLE */}

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Auth;
