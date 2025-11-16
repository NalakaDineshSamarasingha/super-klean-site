"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const isFormValid = () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return false;
    }
    if (password !== confirmPassword) {
      return false;
    }
    if (usernameError || passwordError || emailError) {
      return false;
    }
    if (usernameAvailable === false) {
      return false;
    }
    return true;
  };

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck.trim()) {
      setUsernameAvailable(null);
      return;
    }

    setUsernameChecking(true);
    try {
      const response = await axios.post("/api/auth/check-username", {
        username: usernameToCheck.trim(),
      });
      setUsernameAvailable(response.data.available);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(null);
    }
    setUsernameChecking(false);
  };

  const handleUsernameBlur = () => {
    if (!username.trim()) {
      setUsernameError(null);
      setUsernameAvailable(null);
      return;
    }
    const isValid = /^[a-zA-Z0-9._-]{3,20}$/.test(username);
    if (!isValid) {
      setUsernameError(
        "Username must be 3-20 characters long and contain only letters, numbers, underscores, periods, and hyphens."
      );
      setUsernameAvailable(null);
    } else {
      checkUsernameAvailability(username);
      setUsernameError(null);
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError(null);
      return;
    }
    const isValid =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!isValid) {
      setPasswordError(
        "Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one special character."
      );
    } else {
      setPasswordError(null);
    }
  };

  const handleEmailBlur = async () => {
    if (!email.trim()) {
      setEmailError(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    
    // Check if email is already registered
    try {
      const response = await axios.post("/api/auth/check-email", {
        email: email.trim(),
      });

      if (!response.data.available) {
        setEmailError("This email is already registered. Please use a different email or try signing in.");
      } else {
        setEmailError(null);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check username validation
    if (usernameError) {
      toast.error("Please fix the username validation error");
      return;
    }

    // Check password validation
    if (passwordError) {
      toast.error("Please fix the password validation error");
      return;
    }

    // Check email validation
    if (emailError) {
      toast.error("Please fix the email validation error");
      return;
    }

    // Check username availability
    if (usernameAvailable === false) {
      toast.error("Please choose a different username");
      return;
    }

    if (usernameAvailable === null && username.trim()) {
      // If we haven't checked availability yet, check it now
      await checkUsernameAvailability(username);
      if (usernameAvailable === false) {
        toast.error("Please choose a different username");
        return;
      }
    }

    // Client-side password validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    if (!hasLowercase || !hasUppercase || !hasSpecialChar) {
      toast.error(
        "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
      );
      return;
    }

    setLoading(true);
    try {
      // Send OTP for email verification
      await axios.post("/api/auth/send-otp", { email });
      
      // Store signup data in sessionStorage to use after verification
      sessionStorage.setItem('signupData', JSON.stringify({
        username,
        email,
        password
      }));
      
      toast.success("Verification code sent to your email!");
      router.push("/verify-email");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : "Failed to send verification code";
      toast.error(message || "Failed to send verification code");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex mb-0">
        {/* Left side - Signup Form */}
        <div className="flex-1 flex items-start justify-center p-8 bg-transparent">
          <div className="max-w-md w-full space-y-8 p-12 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="text-left text-3xl font-extrabold text-black">
              Sign up for an account
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-black"
                >
                  Username *
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      // Reset availability status and error when user starts typing
                      if (usernameAvailable !== null) {
                        setUsernameAvailable(null);
                      }
                      setUsernameError(null);
                    }}
                    onFocus={() => setUsernameFocused(true)}
                    onBlur={() => {
                      handleUsernameBlur();
                      setUsernameFocused(false);
                    }}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733] ${
                      usernameError
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : usernameAvailable === true
                          ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                          : usernameAvailable === false
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300"
                    }`}
                  />
                  {usernameChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF5733]"></div>
                    </div>
                  )}
                  {usernameAvailable === true && !usernameChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      ✓
                    </div>
                  )}
                  {usernameAvailable === false && !usernameChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      ✗
                    </div>
                  )}
                </div>
                {usernameError ? (
                  <p className="mt-1 text-sm text-red-600">{usernameError}</p>
                ) : usernameAvailable === false ? (
                  <p className="mt-1 text-sm text-red-600">
                    This username is already taken. Please choose a different
                    one.
                  </p>
                ) : usernameAvailable === true ? (
                  <p className="mt-1 text-sm text-green-600">
                    Username is available!
                  </p>
                ) : null}
                <div
                  className={`mt-1 text-sm text-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${usernameFocused ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p>Username requirements:</p>
                  <ul className="list-disc list-inside ml-4">
                    <li
                      className={
                        username === ""
                          ? "text-gray-500"
                          : username.length >= 3 && username.length <= 20
                            ? "text-green-500"
                            : "text-red-500"
                      }
                    >
                      3-20 characters
                    </li>
                    <li
                      className={
                        username === ""
                          ? "text-gray-500"
                          : /[^a-zA-Z0-9._-]/.test(username)
                            ? "text-red-500"
                            : "text-green-500"
                      }
                    >
                      Only letters, numbers, underscores, periods, and hyphens
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  onBlur={handleEmailBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733] ${
                    emailError
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    handlePasswordBlur();
                    setPasswordFocused(false);
                  }}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733] ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <div
                  className={`mt-1 text-sm text-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${passwordFocused ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside ml-4">
                    <li
                      className={
                        password === ""
                          ? "text-gray-500"
                          : password.length >= 8
                            ? "text-green-500"
                            : "text-red-500"
                      }
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={
                        password === ""
                          ? "text-gray-500"
                          : /[a-z]/.test(password)
                            ? "text-green-500"
                            : "text-red-500"
                      }
                    >
                      At least one lowercase letter
                    </li>
                    <li
                      className={
                        password === ""
                          ? "text-gray-500"
                          : /[A-Z]/.test(password)
                            ? "text-green-500"
                            : "text-red-500"
                      }
                    >
                      At least one uppercase letter
                    </li>
                    <li
                      className={
                        password === ""
                          ? "text-gray-500"
                          : /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                password
                              )
                            ? "text-green-500"
                            : "text-red-500"
                      }
                    >
                      At least one special character
                    </li>
                  </ul>
                </div>
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                />
                {confirmPassword &&
                  password &&
                  confirmPassword !== password && (
                    <p className="mt-1 text-sm text-red-600">
                      Passwords do not match
                    </p>
                  )}
              </div>
              <button
                type="button"
                onClick={handleRegister}
                disabled={loading || !isFormValid()}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#E64A2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733] disabled:opacity-50 ${
                  loading || !isFormValid()
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {loading ? "Sending verification code..." : "Sign Up"}
              </button>
            </form>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#FF5733] hover:text-[#E64A2E]"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Branding */}
        <div
          className="flex-none hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100"
          style={{ height: "100%", width: "50%" }}
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold text-black mb-4">SuperKlean</h1>
            <p className="text-2xl text-gray-600">Vehicle Service Center</p>
          </div>
        </div>
      </div>
    </div>
  );
}
