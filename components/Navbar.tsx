"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { LogOut, BookOpen, LayoutDashboard, BarChart2, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/curriculum", label: "Curriculum", icon: BookOpen },
    { href: "/progress", label: "Progress", icon: BarChart2 },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-custom bg-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link 
              href={user ? "/dashboard" : "/"} 
              className="font-display text-xl tracking-tight text-text-primary hover:opacity-80 transition-opacity"
            >
              Full Stack Bootcamp
            </Link>
          </div>

          {/* Nav links - Center (Only if logged in) */}
          {user && (
            <div className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "border-accent-custom text-accent-custom"
                        : "border-transparent text-text-secondary hover:border-border-custom hover:text-text-primary"
                    }`}
                  >
                    <Icon className="mr-1.5 h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* User profile / Login - Right */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-accent-custom text-sm font-semibold select-none">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-text-primary">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="rounded px-2.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary transition-all duration-200 border border-transparent hover:border-border-custom flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-sm bg-accent-custom px-4 py-2 text-sm font-medium text-surface hover:bg-accent-custom/90 transition-colors shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded p-2 text-text-secondary hover:bg-bg-base hover:text-text-primary focus:outline-none cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-custom bg-surface page-fade-in">
          <div className="space-y-1 pb-3 pt-2">
            {user ? (
              navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all ${
                      active
                        ? "border-accent-custom bg-accent-light text-accent-custom"
                        : "border-transparent text-text-secondary hover:bg-bg-base hover:border-border-custom hover:text-text-primary"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2 text-base font-medium text-text-secondary hover:text-text-primary"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2 rounded bg-accent-custom text-base font-medium text-surface hover:bg-accent-custom/90"
                >
                  Apply Now
                </Link>
              </div>
            )}
          </div>
          {user && (
            <div className="border-t border-border-custom pb-3 pt-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-accent-custom text-base font-semibold">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-text-primary">{user.name}</div>
                  <div className="text-sm font-medium text-text-secondary">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center px-4 py-2 text-base font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary gap-3 cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
