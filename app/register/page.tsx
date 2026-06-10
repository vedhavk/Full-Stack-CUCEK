"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { register } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Mock network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      await register(email, name);
    } catch (err) {
      setError("An error occurred. Please try again.");
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
            Create your learning account
          </h2>
          <p className="mt-2 text-xs text-text-secondary">
            Or{" "}
            <Link href="/login" className="font-medium text-accent-custom hover:underline">
              sign in to your existing account
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
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="block w-full rounded border border-border-custom bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-secondary/50 focus:border-accent-custom focus:outline-none transition-colors"
              />
            </div>

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
                placeholder="jane@company.com"
                className="block w-full rounded border border-border-custom bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-secondary/50 focus:border-accent-custom focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Password
              </label>
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
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
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
