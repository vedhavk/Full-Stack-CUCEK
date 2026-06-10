"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Mock network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      await login(email);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-bg-base">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="font-display text-2xl tracking-tight text-text-primary hover:opacity-80 transition-opacity">
            Full Stack Bootcamp
          </Link>
          <h2 className="mt-6 text-2xl font-display text-text-primary tracking-tight">
            Sign in to your learning account
          </h2>
          <p className="mt-2 text-xs text-text-secondary">
            Or{" "}
            <Link href="/register" className="font-medium text-accent-custom hover:underline">
              register a new account
            </Link>
          </p>
        </div>

        <div className="bg-surface p-8 border border-border-custom rounded-card shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded border border-danger-custom/20 bg-danger-custom/5 p-3 text-xs text-danger-custom">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="block w-full rounded border border-border-custom bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-secondary/50 focus:border-accent-custom focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded border border-border-custom bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-secondary/50 focus:border-accent-custom focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded bg-accent-custom px-4 py-2.5 text-sm font-semibold text-surface hover:bg-accent-custom/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
