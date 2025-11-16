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
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Vehicle service background"
          fill
          className="object-cover opacity-60"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
      </div>
      
      <Navbar />
      <div className="relative z-10 flex-1 flex items-center">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center gap-6 p-8">
          <div className="max-w-md w-full space-y-8 gap-6 p-12  backdrop-blur-sm  rounded-lg shadow-2xl">
            <h2 className="text-left text-3xl font-extrabold text-white pb-5">
              Login to your account
            </h2>
            <form className="space-y-6 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-white"
                >
                  Email or Username
                </label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
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
              <p className="text-sm text-gray-300">
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

        {/* Right side - Branding */}
        <div className="flex-1 hidden md:flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-8xl font-bold text-[#FF5733] tracking-wider font-[family-name:var(--font-teko)]">SUPERKLEAN</h1>
            <p className="text-2xl text-white mt-4 tracking-wide">VEHICLE SERVICE CENTER</p>
          </div>
        </div>
      </div>
    </div>
  );
}
