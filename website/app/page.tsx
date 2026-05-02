"use client";

import Link from "next/link";
import {
  ChevronDown,
  Plus,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Products", hasDropdown: true },
  { label: "For Work", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Security", hasDropdown: false },
  { label: "Pricing", hasDropdown: false },
];

const examplePrompts = [
  "Mobile app proposal",
  "3D racing game",
  "Beginner running tracker",
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M8 6L18 16L8 26" stroke="#f26522" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 6L24 16L14 26" stroke="#f26522" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
              <span className="text-xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
                MORPH57
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-colors hover:bg-black/5"
                  style={{ color: "#555555" }}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </button>
              ))}
              <Link
                href="#"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full text-white"
                style={{ backgroundColor: "var(--accent-orange)" }}
              >
                Agent
                <span className="bg-white/25 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  4
                </span>
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
          <span>MORPH57 Agent is free on May 2nd for our 10th birthday!</span>
          <Link
            href="#"
            className="font-semibold underline underline-offset-2 hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            Learn more
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-8 md:pt-16 pb-8">
        <span className="hero-heading text-center">
          What will you build?
        </span>

        <p className="mt-5 text-center max-w-md hero-subtitle">
          Turn ideas into apps in minutes — no coding needed
        </p>

        {/* Input Area */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="input-card">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Describe your idea, MORPH57 will bring it to life..."
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
            <span>Try an example prompt</span>
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
