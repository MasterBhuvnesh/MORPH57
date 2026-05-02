"use client";

import Link from "next/link";
import {
  ChevronDown,
  Plus,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useState } from "react";

const navLinks = [
  { label: "Features", hasDropdown: false },
  { label: "Examples", hasDropdown: false },
  { label: "Templates", hasDropdown: false },
  { label: "Pricing", hasDropdown: false },
];

const examplePrompts = [
  "Frontend developer",
  "Data analyst",
  "Software engineer",
];

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: "var(--bg-cream)" }}>
      {/* Subtle background gradient circles */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: "800px",
            height: "800px",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(253, 232, 216, 0.7) 0%, rgba(254, 246, 240, 0) 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "15%",
            left: "20%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(255, 224, 195, 0.4) 0%, rgba(254, 246, 240, 0) 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            top: "10%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(255, 230, 210, 0.35) 0%, rgba(254, 246, 240, 0) 70%)",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 w-full flex justify-center px-4 py-3 md:px-8">
        <div className="w-full max-w-[1400px] flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="px-2">
                <Mirage size="50" speed="7" color="#f26522" />
              </span>
              <span className="text-xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
                MORPH57
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className="nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-colors hover:bg-black/5"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </button>
              ))}
              <Link
                href="#"
                className="flex items-center gap-1.5 ml-3 px-3 py-1.5 text-sm font-semibold rounded-full text-white"
                style={{ backgroundColor: "var(--accent-orange)" }}
              >
                Try Free
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--text-primary)" }}
            >
              Log in
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-sm font-medium px-5 py-2 rounded-full border-2 transition-colors hover:bg-orange-50"
              style={{ color: "var(--accent-orange)", borderColor: "var(--accent-orange)" }}
            >
              Create account
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-black/5"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Banner */}
      <div className="relative z-10 flex justify-center px-4 pt-2 pb-4">
        <div
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm"
          style={{ backgroundColor: "#fde8d8", color: "var(--text-primary)" }}
        >
          <span>Smart resume generation, zero setup required.</span>
          <Link
            href="#"
            className="font-semibold underline underline-offset-2 hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            Explore
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-8 md:pt-16 pb-8">
        <span className="hero-heading text-center">
          ATS-Ready Resumes Instantly
        </span>

        <p className="mt-5 text-center max-w-lg hero-subtitle">
          Turn job descriptions into tailored LaTeX resumes
        </p>

        {/* Input Area */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="input-card">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Paste job description here"
                className="flex-1 text-[15px] outline-none bg-transparent"
                style={{ color: "var(--text-primary)" }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
                style={{ color: "var(--text-secondary)" }}
                aria-label="Add attachment"
              >
                <Plus size={20} />
              </button>
              <button
                className="submit-btn"
                style={{ backgroundColor: "var(--accent-orange)" }}
                aria-label="Submit"
              >
                <ArrowRight size={18} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span>Try a resume example</span>
            <button
              className="p-1 rounded hover:bg-black/5 transition-colors"
              aria-label="Refresh examples"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                className="prompt-chip"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
