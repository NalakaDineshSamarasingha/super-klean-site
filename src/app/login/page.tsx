"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, login } = useAuth();

  useEffect(() => {
    // Redirect if already signed in
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleLogin = async () => {
    if (!identifier || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // First, resolve username to email if needed
      let email = identifier;
      
      if (!identifier.includes("@")) {
        // It's a username, need to get email
        const response = await fetch("/api/auth/get-email-by-username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: identifier }),
        });
        
        if (!response.ok) {
          toast.error("Invalid username or password");
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        email = data.email;
      }

      // Use AuthContext login which uses Firebase Client SDK
      await login(email, password);
      
      toast.success("Login successful");
      
      // AuthContext will handle the redirect via useEffect
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      toast.error("Invalid email/username or password");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      <div className="flex-1 flex md:-mt-24 mb-0">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-transparent">
          <div className="max-w-md w-full space-y-8 p-12 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="text-left text-3xl font-extrabold text-black">
              Login to your account
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-black"
                >
                  Email or Username
                </label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#E64A2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Login In..." : "Login"}
              </button>
            </form>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#FF5733] hover:text-[#E64A2E]"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Logo */}
        <div className="flex-1 hidden md:flex items-center justify-center p-8 bg-transparent">
          <div className="relative w-full h-192 max-w-4xl">
            <Image
              src="/fitsixeslogo.png"
              alt="Fit Sixes Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
