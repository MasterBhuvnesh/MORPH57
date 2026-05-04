"use client";

import Link from "next/link";
import {
  ChevronDown,
  Plus,
  ArrowRight,
  RefreshCw,
  FolderOpen,
  X,
  FileText,
  Code,
  Search,
  Sparkles,
} from "lucide-react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { createClient } from "@/lib/supabase/client";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import type { User } from "@supabase/supabase-js";
import { resumePrompts, promptSets, type ResumePrompt } from "@/constants/resume-prompts";

const navLinks = [
  { label: "Features", hasDropdown: false },
  { label: "Examples", hasDropdown: false },
  { label: "Templates", hasDropdown: false },
  { label: "Pricing", hasDropdown: false },
];

const sectionGradients = [
  "var(--bg-cream)",
  "linear-gradient(to bottom, #fef6f0 0%, #fef6f0 15%, #fde8d8 55%, #fef6f0 100%)",
  "linear-gradient(to bottom, #fef6f0 0%, #fef6f0 15%, #fcd5ba 55%, #fef6f0 100%)",
  "linear-gradient(to bottom, #fef6f0 0%, #fef6f0 15%, #fadbc4 55%, #fef6f0 100%)",
  "linear-gradient(to bottom, #fef6f0 0%, #fef6f0 15%, #fce2d0 55%, #fef6f0 100%)",
];

const headingWords = "ATS-Ready Resumes Instantly".split(" ");

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<ResumePrompt | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const zIndexRef = useRef(10);

  const handlePromptSelect = (promptName: string) => {
    const prompt = resumePrompts.find((p) => p.name === promptName) ?? null;
    setSelectedPrompt(prompt);
    if (prompt) console.log(prompt.description);
  };

  const navigateToSection = useCallback((index: number) => {
    if (index === activeIndex || gsap.isTweening(sectionsRef.current.filter(Boolean))) return;
    const target = sectionsRef.current[index];
    if (!target) return;

    zIndexRef.current += 1;
    target.style.zIndex = String(zIndexRef.current);

    gsap.fromTo(
      target,
      { yPercent: 100, rotation: 5 },
      {
        yPercent: 0,
        rotation: 0,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          if (index === 1) {
            const headers = target.querySelectorAll(".feature-header");
            const cards = target.querySelectorAll(".feature-card");
            gsap.fromTo(
              headers,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
            );
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, delay: 0.25, ease: "power3.out" }
            );
          }
        },
      }
    );

    setActiveIndex(index);
  }, [activeIndex]);

  const handleNavClick = useCallback((linkIndex: number) => {
    navigateToSection(linkIndex + 1);
    setMenuOpen(false);
  }, [navigateToSection]);

  const handleLogoClick = useCallback(() => {
    if (activeIndex === 0) return;
    navigateToSection(0);
    setMenuOpen(false);
  }, [activeIndex, navigateToSection]);

  useEffect(() => {
    document.body.setAttribute("data-page", "home");
    return () => { document.body.removeAttribute("data-page"); };
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setMenuOpen(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    sectionsRef.current.forEach((el, i) => {
      if (!el || i === 0) return;
      gsap.set(el, { yPercent: 100, rotation: 5 });
    });
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
    <main ref={mainRef} className="w-full h-screen overflow-hidden relative" style={{ backgroundColor: "var(--bg-cream)", overscrollBehavior: "none" }}>
      <style>{`body[data-page="home"] { overflow: hidden; overscroll-behavior: none; position: fixed; width: 100%; height: 100%; }`}</style>

      {/* Fixed Navigation */}
      <div className="nav-bar fixed top-0 left-0 w-full z-[60]" style={{ opacity: 0 }}>
        <nav className="w-full flex justify-center px-4 py-3 md:px-8 backdrop-blur-md" style={{ backgroundColor: "rgba(254, 246, 240, 0.75)" }}>
          <div className="w-full max-w-[1400px] flex justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-8">
              <button onClick={handleLogoClick} className="flex items-center gap-2">
                <span className="px-1 sm:px-2">
                  <Mirage size="50" speed="7" color="#f26522" />
                </span>
                <span className="text-lg sm:text-xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
                  MORPH57
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, i) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(i)}
                    className="nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition-colors"
                    style={
                      activeIndex === i + 1
                        ? { color: "var(--accent-orange)", backgroundColor: "rgba(242, 101, 34, 0.08)" }
                        : {}
                    }
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
          <div className="flex justify-between items-center px-4 py-3">
            <button onClick={() => { handleLogoClick(); setMenuOpen(false); }} className="flex items-center gap-2">
              <span className="px-1 sm:px-2">
                <Mirage size="50" speed="7" color="#f26522" />
              </span>
              <span className="text-lg sm:text-xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
                MORPH57
              </span>
            </button>
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

          <div className="flex-1 flex flex-col px-6 pt-4">
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(i)}
                className="mobile-menu-link flex items-center justify-between py-5 text-[23px] font-normal border-b"
                style={{
                  color: activeIndex === i + 1 ? "var(--accent-orange)" : "#3a3a3a",
                  borderColor: "var(--border-light)",
                  opacity: 0,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

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

      {/* === SECTIONS STACK === */}

      {/* Section 0: Hero */}
      <div
        ref={(el) => { sectionsRef.current[0] = el; }}
        className="absolute top-0 left-0 w-full h-screen origin-bottom-left flex flex-col overflow-hidden"
        style={{ background: sectionGradients[0], zIndex: 1 }}
      >
        {/* Background gradients */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
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

        {/* Banner */}
        <div className="banner relative z-10 flex justify-center px-4 pt-16 sm:pt-[72px] pb-4" style={{ opacity: 0 }}>
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

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-2 sm:pt-4 md:pt-8 pb-8">
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
                <div className="flex items-center gap-2 min-w-0">
                  {selectedPrompt && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full text-white truncate"
                      style={{ backgroundColor: "var(--accent-orange)" }}
                    >
                      <span className="truncate">{selectedPrompt.name}</span>
                      <button
                        onClick={() => setSelectedPrompt(null)}
                        className="flex-shrink-0 hover:opacity-70 transition-opacity"
                        aria-label="Remove selected prompt"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  <button
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-black/5"
                    style={{ color: "var(--text-secondary)" }}
                    aria-label="Add attachment"
                  >
                    <Plus size={20} />
                  </button>
                </div>
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
                  onClick={() => handlePromptSelect(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Features */}
      <div
        ref={(el) => { sectionsRef.current[1] = el; }}
        className="absolute top-0 left-0 w-full h-screen origin-bottom-left overflow-y-auto"
        style={{ background: sectionGradients[1], overscrollBehavior: "contain" }}
      >
        <div className="flex flex-col items-center pt-20 sm:pt-24 pb-12 px-4 sm:px-6 md:px-8">
          {/* Section Header */}
          <div className="text-center max-w-xl mb-10 sm:mb-14">
            <div
              className="feature-header inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm mb-5"
              style={{ backgroundColor: "#fde8d8", color: "var(--text-primary)", opacity: 0 }}
            >
              WHAT YOU GET
            </div>
            <h2
              className="feature-header text-2xl sm:text-3xl md:text-[2.5rem] font-normal tracking-tight leading-tight"
              style={{ color: "var(--text-primary)", opacity: 0 }}
            >
              Everything you need to land interviews
            </h2>
          </div>

          {/* Row 1: 3 cards */}
          <div className="w-full max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">

            {/* Card 1: Instant Generation */}
            <div
              className="feature-card rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)", opacity: 0 }}
            >
              <div className="h-[180px] sm:h-[200px] flex items-center justify-center relative" style={{ backgroundColor: "#fef6f0" }}>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border px-4 py-3 flex items-center gap-2" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "", color: "var(--accent-orange)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>resume.pdf</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-orange)" }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  <div className="rounded-xl border px-3 py-1.5 text-[11px] font-semibold text-white" style={{ backgroundColor: "var(--accent-orange)", borderColor: "var(--accent-orange)" }}>
                    Ready
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-[15px] sm:text-base font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                  Instant resume generation from any JD
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Paste a job description and get an ATS-optimized, tailored resume in seconds.
                </p>
              </div>
            </div>

            {/* Card 2: LaTeX-Powered */}
            <div
              className="feature-card rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)", opacity: 0 }}
            >
              <div className="h-[180px] sm:h-[200px] flex items-center justify-center relative" style={{ backgroundColor: "#fef6f0" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-xl border px-5 py-3" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                    <span className="text-lg font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>L<span className="text-sm align-super">A</span>T<span className="text-sm align-sub">E</span>X</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="rounded-md h-1.5" style={{ width: `${40 + j * 20}px`, backgroundColor: j === 1 ? "var(--accent-orange)" : "var(--border-light)" }} />
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="rounded-md h-1.5" style={{ width: `${50 + j * 15}px`, backgroundColor: "var(--border-light)" }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-[15px] sm:text-base font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                  LaTeX-powered professional formatting
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Pixel-perfect typography that stands out from Word templates.
                </p>
              </div>
            </div>

            {/* Card 3: Smart JD Parsing */}
            <div
              className="feature-card rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
              style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)", opacity: 0 }}
            >
              <div className="h-[180px] sm:h-[200px] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#fef6f0" }}>
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: "#fde8d8" }}>
                    <Search size={18} style={{ color: "var(--accent-orange)" }} />
                  </div>
                  <OrbitingCircles radius={60} duration={20} speed={1} iconSize={28} path={true}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                      <span className="text-[9px] font-bold" style={{ color: "var(--accent-orange)" }}>JS</span>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                      <Code size={12} style={{ color: "var(--accent-orange)" }} />
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                      <span className="text-[9px] font-bold" style={{ color: "var(--accent-orange)" }}>TS</span>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                      <Sparkles size={12} style={{ color: "var(--accent-orange)" }} />
                    </div>
                  </OrbitingCircles>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-[15px] sm:text-base font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                  Smart JD parsing with AI
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  AI extracts key skills and requirements so your resume speaks the right language.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: 2 wider cards */}
          <div className="w-full max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            {/* Card 4: Multi-Format Export */}
            <div
              className="feature-card rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)", opacity: 0 }}
            >
              <div className="h-[180px] sm:h-[200px] flex items-center justify-center relative" style={{ backgroundColor: "#fef6f0" }}>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    {/* PDF card */}
                    <div className="rounded-2xl border p-3 flex flex-col items-center gap-2 w-[90px]" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#dc2626" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <span className="text-[10px] font-bold" style={{ color: "#dc2626" }}>.PDF</span>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="h-1 rounded-full w-full" style={{ backgroundColor: "var(--border-light)" }} />
                        <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: "var(--border-light)" }} />
                      </div>
                    </div>


                    {/* TEX card */}
                    <div className="rounded-2xl border p-3 flex flex-col items-center gap-2 w-[90px]" style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-orange)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                      <span className="text-[10px] font-bold" style={{ color: "var(--accent-orange)" }}>.TEX</span>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="h-1 rounded-full w-full" style={{ backgroundColor: "var(--accent-orange)", opacity: 0.3 }} />
                        <div className="h-1 rounded-full w-2/3" style={{ backgroundColor: "var(--accent-orange)", opacity: 0.3 }} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-[15px] sm:text-base font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                  Export in multiple formats
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Download as PDF or grab the LaTeX source to customize further.
                </p>
              </div>
            </div>

            {/* Card 5: Resume History */}
            <div
              className="feature-card rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              style={{ backgroundColor: "var(--surface-white)", borderColor: "var(--border-light)", opacity: 0 }}
            >
              <div className="h-[180px] sm:h-[200px] flex flex-col items-center justify-center gap-4 relative" style={{ backgroundColor: "#fef6f0" }}>
                <div className="flex -space-x-3">
                  {["B", "A", "S", "M"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-white"
                      style={{ backgroundColor: ["#f26522", "#f0894a", "#e8a06e", "#d4886a"][i] }}
                    >
                      {letter}
                    </div>
                  ))}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-semibold border-2 border-white"
                    style={{ backgroundColor: "#fde8d8", color: "var(--accent-orange)" }}
                  >
                    +20
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { role: "Frontend Dev", active: true },
                    { role: "Full-Stack" },
                    { role: "React Dev" },
                  ].map((item) => (
                    <div
                      key={item.role}
                      className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
                      style={{
                        backgroundColor: item.active ? "var(--accent-orange)" : "var(--surface-white)",
                        borderColor: item.active ? "var(--accent-orange)" : "var(--border-light)",
                        color: item.active ? "#ffffff" : "var(--text-secondary)",
                      }}
                    >
                      {item.role}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-[15px] sm:text-base font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                  Track your resume history
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Revisit and manage all your past resumes and job descriptions in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Examples */}
      <div
        ref={(el) => { sectionsRef.current[2] = el; }}
        className="absolute top-0 left-0 w-full h-screen origin-bottom-left overflow-y-auto"
        style={{ background: sectionGradients[2], overscrollBehavior: "contain" }}
      >
        <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-6">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
            Examples
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Coming soon — sample resumes and use cases
          </p>
        </div>
      </div>

      {/* Section 3: Templates */}
      <div
        ref={(el) => { sectionsRef.current[3] = el; }}
        className="absolute top-0 left-0 w-full h-screen origin-bottom-left overflow-y-auto"
        style={{ background: sectionGradients[3], overscrollBehavior: "contain" }}
      >
        <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-6">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
            Templates
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Coming soon — professional resume templates
          </p>
        </div>
      </div>

      {/* Section 4: Pricing */}
      <div
        ref={(el) => { sectionsRef.current[4] = el; }}
        className="absolute top-0 left-0 w-full h-screen origin-bottom-left overflow-y-auto"
        style={{ background: sectionGradients[4], overscrollBehavior: "contain" }}
      >
        <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-6">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight" style={{ color: "var(--text-primary)" }}>
            Pricing
          </h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Coming soon — plans and pricing details
          </p>
        </div>
      </div>

    </main>
  );
}
