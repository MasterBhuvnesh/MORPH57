"use client";

import Link from "next/link";
import {
  ChevronDown,
  Plus,
  ArrowRight,
  RefreshCw,
  FolderOpen,
} from "lucide-react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { label: "Features", hasDropdown: false },
  { label: "Examples", hasDropdown: false },
  { label: "Templates", hasDropdown: false },
  { label: "Pricing", hasDropdown: false },
];

const promptSets = [
  ["Frontend developer", "Data analyst", "Software engineer"],
  ["Product manager", "UX designer", "DevOps engineer"],
  ["Marketing manager", "Backend developer", "Business analyst"],
];

const headingWords = "ATS-Ready Resumes Instantly".split(" ");

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-menu-link",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-menu-footer",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: "power3.out" }
      );
    }, menuRef);
    return () => ctx.revert();
  }, [menuOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".nav-bar", ".banner", ".hero-word", ".hero-subtitle", ".input-card-wrapper", ".example-section"], { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".nav-bar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      tl.fromTo(
        ".banner",
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
        "-=0.2"
      );

      tl.fromTo(
        ".hero-word",
        { opacity: 0, filter: "blur(12px)", y: 10 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.6,
          stagger: 0.15,
        },
        "-=0.1"
      );

      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

      tl.fromTo(
        ".input-card-wrapper",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.2"
      );

      tl.fromTo(
        ".example-section",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: "var(--bg-cream)" }}>
      {/* Subtle background gradient circles */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute rounded-full w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px]"
          style={{
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(253, 232, 216, 0.7) 0%, rgba(254, 246, 240, 0) 70%)",
          }}
        />
        <div
          className="absolute rounded-full w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px]"
          style={{
            top: "15%",
            left: "20%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(255, 224, 195, 0.4) 0%, rgba(254, 246, 240, 0) 70%)",
          }}
        />
        <div
          className="absolute rounded-full hidden sm:block w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
          style={{
            top: "10%",
            right: "-5%",
            background: "radial-gradient(circle, rgba(255, 230, 210, 0.35) 0%, rgba(254, 246, 240, 0) 70%)",
          }}
        />
      </div>

      {/* Navigation */}
      <div className="nav-bar relative z-50 w-full" style={{ opacity: 0 }}>
        <nav className="w-full flex justify-center px-4 py-3 md:px-8">
          <div className="w-full max-w-[1400px] flex justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-8">
              <Link href="/" className="flex items-center gap-2">
                <span className="px-1 sm:px-2">
                  <Mirage size="50" speed="7" color="#f26522" />
                </span>
                <span className="text-lg sm:text-xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
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
                {!user && (
                  <Link
                    href="/auth/sign-up"
                    className="flex items-center gap-1.5 ml-3 px-3 py-1.5 text-sm font-semibold rounded-full text-white"
                    style={{ backgroundColor: "var(--accent-orange)" }}
                  >
                    Try Free
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => console.log("Records clicked", user?.email)}
                    className="records-btn hidden lg:flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-full border-2"
                    style={{ color: "var(--accent-orange)", borderColor: "var(--accent-orange)" }}
                  >
                    <FolderOpen size={15} />
                    Records
                  </button>
                  <div className="hidden lg:flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                      style={{ backgroundColor: "var(--accent-orange)" }}
                    >
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className="text-[13px] font-medium max-w-[180px] truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {user.email}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="hidden lg:block text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="hidden lg:block text-sm font-medium px-5 py-2 rounded-full border-2 transition-colors hover:bg-orange-50"
                    style={{ color: "var(--accent-orange)", borderColor: "var(--accent-orange)" }}
                  >
                    Create account
                  </Link>
                </>
              )}
              <button
                className="lg:hidden p-2 rounded-lg"
                aria-label="Open menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Fullscreen mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: "var(--bg-cream)" }}
        >
          {/* Menu header */}
          <div className="flex justify-between items-center px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="px-1 sm:px-2">
                <Mirage size="50" speed="7" color="#f26522" />
              </span>
              <span className="text-lg sm:text-xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
                MORPH57
              </span>
            </Link>
            <button
              className="p-2 rounded-lg"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu links */}
          <div className="flex-1 flex flex-col px-6 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="mobile-menu-link flex items-center justify-between py-5 text-[23px] font-normal border-b"
                style={{ color: "#3a3a3a", borderColor: "var(--border-light)", opacity: 0 }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Menu footer */}
          <div className="mobile-menu-footer flex flex-col sm:flex-row items-center gap-4 px-6 py-6" style={{ opacity: 0 }}>
            {user ? (
              <>
                <button
                  onClick={() => console.log("Records clicked", user?.email)}
                  className="records-btn flex items-center gap-1.5 text-sm font-medium px-6 py-2.5 rounded-full border-2"
                  style={{ color: "var(--accent-orange)", borderColor: "var(--accent-orange)" }}
                >
                  <FolderOpen size={15} />
                  Records
                </button>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                    style={{ backgroundColor: "var(--accent-orange)" }}
                  >
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className="text-[13px] font-medium max-w-[200px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {user.email}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium px-6 py-2.5 rounded-full transition-colors hover:bg-black/5"
                  style={{ color: "var(--text-primary)" }}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="text-sm font-medium px-6 py-2.5 rounded-full border-2 transition-colors hover:bg-orange-50"
                  style={{ color: "var(--accent-orange)", borderColor: "var(--accent-orange)" }}
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="banner relative z-10 flex justify-center px-4 pt-2 pb-4" style={{ opacity: 0 }}>
        <div
          className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm text-center"
          style={{ backgroundColor: "#fde8d8", color: "var(--text-primary)" }}
        >
          <span>Smart resume generation, zero setup required.</span>
          <Link
            href="#"
            className="font-semibold underline underline-offset-2 hover:opacity-80 whitespace-nowrap"
            style={{ color: "var(--text-primary)" }}
          >
            Explore
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-6 sm:pt-8 md:pt-16 pb-8">
        <span className="hero-heading text-center flex flex-wrap justify-center gap-x-[0.3em] px-2">
          {headingWords.map((word, i) => (
            <span key={i} className="hero-word inline-block" style={{ opacity: 0 }}>
              {word}
            </span>
          ))}
        </span>

        <p className="mt-4 sm:mt-5 text-center max-w-lg hero-subtitle px-4" style={{ opacity: 0 }}>
          Turn job descriptions into tailored LaTeX resumes
        </p>

        {/* Input Area */}
        <div className="input-card-wrapper mt-8 sm:mt-10 w-full max-w-2xl" style={{ opacity: 0 }}>
          <div className="input-card">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Paste job description here"
                className="flex-1 text-sm sm:text-[15px] outline-none bg-transparent"
                style={{ color: "var(--text-primary)" }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
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
        <div className="example-section mt-8 sm:mt-10 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
            <span>Try a resume example</span>
            <button
              className="p-1 rounded transition-colors"
              aria-label="Refresh examples"
              onClick={() => setPromptIndex((prev) => (prev + 1) % promptSets.length)}
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {promptSets[promptIndex].map((prompt) => (
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
