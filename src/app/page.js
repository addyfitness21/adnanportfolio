"use client";

import React, { useState, useEffect } from "react";
import { getHomeData } from "./utils/db";

const techLogos = [
  { name: "Meta", url: "/processed-icons/meta.png" },
  { name: "Google Ads", url: "/processed-icons/googleads.png" },
  { name: "Gemini", url: "/processed-icons/gemini.png" },
  { name: "GPT", url: "/processed-icons/gpt.png" },
  { name: "Claude", url: "/processed-icons/claude.png" },
  { name: "Next.js", url: "/processed-icons/nextjs.png" },
  { name: "Vercel", url: "/processed-icons/vercel.png" },
  { name: "Netlify", url: "/processed-icons/netlify.png" },
  { name: "Shopify", url: "/processed-icons/shopify.png" },
  { name: "AWS", url: "/processed-icons/aws.png" },
  { name: "Razorpay", url: "/processed-icons/razorpay.png" },
  { name: "PhonePe", url: "/processed-icons/phonepe.png" },
  { name: "Cashfree", url: "/processed-icons/cashfree.png" },
  { name: "DotPe", url: "/processed-icons/dotpe.png" },
  { name: "GetGabs", url: "/processed-icons/getgabs.png" },
  { name: "MailerLite", url: "/processed-icons/mailerlite.png" },
  { name: "Canva", url: "/processed-icons/canva.png" },
  { name: "Adobe", url: "/processed-icons/adobe.png" },
  { name: "Corel Draw", url: "/processed-icons/coreldraw.png" },
  { name: "Matlab", url: "/processed-icons/matlab.png" },
  { name: "Arduino", url: "/processed-icons/arduino.png" }
];

const impactProjects = [
  {
    id: "addy-fitness",
    tag: "FITNESS & HEALTHCARE",
    name: "Addy Fitness",
    role: "Founder & Product Architect",
    color: "from-rose-500 via-orange-500 to-amber-400",
    accentHex: "#f43f5e",
    gradientId: "addyGrad",
    statSummary: "5+ Years Compounding Execution",
    description: "From a raw workout concept in 2021 to a multi-branch fitness & healthcare ecosystem powered by custom web systems and performance marketing.",
    metrics: [
      { label: "Timeline", val: "2021 – 2026" },
      { label: "Milestone", val: "Healthcare Launch" },
      { label: "Engine", val: "Performance Mktg" },
      { label: "Scale Strategy", val: "Organic + Paid" }
    ],
    points: [
      { year: "2021", label: "Genesis & Idea", value: 18, x: 50, y: 190, highlight: "Started as a fitness concept. Prototyped training philosophy, client regimes, and nutritional systems." },
      { year: "2022", label: "V1 Launch & Website", value: 36, x: 190, y: 155, highlight: "Engineered first web platform. Onboarded initial local beta clients with early iterative feedback loops." },
      { year: "2023", label: "Multiple Clients", value: 60, x: 330, y: 110, highlight: "Rapid client roster expansion. Program structures standardized with transformation validation." },
      { year: "2024", label: "Healthcare Launch", value: 46, x: 470, y: 140, highlight: "Strategic pivot & re-architecture: Launched dedicated healthcare branch, custom digital client hub & new website." },
      { year: "2025", label: "Performance Marketing", value: 82, x: 610, y: 65, highlight: "Performance marketing engine deployed. Paid acquisition funnels + high-converting landing pages." },
      { year: "2026", label: "Compounding Growth", value: 96, x: 750, y: 35, highlight: "Growing gradually and sustainably. High-retention member community and multi-tier wellness programs." }
    ],
    curvePath: "M 50 190 C 120 180, 140 160, 190 155 C 240 150, 280 115, 330 110 C 390 105, 420 150, 470 140 C 520 130, 560 75, 610 65 C 670 55, 700 40, 750 35",
    areaPath: "M 50 190 C 120 180, 140 160, 190 155 C 240 150, 280 115, 330 110 C 390 105, 420 150, 470 140 C 520 130, 560 75, 610 65 C 670 55, 700 40, 750 35 L 750 220 L 50 220 Z"
  },
  {
    id: "sikhaid",
    tag: "HUMANITARIAN NGO",
    name: "Sikhaid",
    role: "Operations & Digital Systems Lead",
    color: "from-teal-400 via-cyan-400 to-blue-500",
    accentHex: "#06b6d4",
    gradientId: "sikhGrad",
    statSummary: "Leading National NGO in India",
    description: "Restructured disjointed field operations into a balanced, automated digital organization with nationwide donor and relief outreach.",
    metrics: [
      { label: "Status", val: "Top NGO in India" },
      { label: "Restructuring", val: "Full Ops Audit" },
      { label: "Platform", val: "Custom Web Portal" },
      { label: "Trajectory", val: "MoM Scaling" }
    ],
    points: [
      { year: "Early 2025", label: "Joined & Audit", value: 24, x: 90, y: 180, highlight: "Joined team. Conducted deep operational audits; identified bottlenecks in logistics, data flow and donor tracking." },
      { year: "Mid 2025", label: "Ops & Web Rebuild", value: 48, x: 270, y: 135, highlight: "Balanced operations & built centralized processes. Designed & deployed brand new high-trust web platform." },
      { year: "Late 2025", label: "Month-by-Month Scale", value: 78, x: 490, y: 75, highlight: "Automated donation tracking & transparent field reporting. Rapid month-over-month volunteer and donor scaling." },
      { year: "2026", label: "National Leadership", value: 98, x: 710, y: 30, highlight: "Recognized as one of the leading, most impactful NGOs in India with nationwide multi-state initiatives." }
    ],
    curvePath: "M 90 180 C 170 175, 200 145, 270 135 C 350 125, 410 88, 490 75 C 570 62, 630 38, 710 30",
    areaPath: "M 90 180 C 170 175, 200 145, 270 135 C 350 125, 410 88, 490 75 C 570 62, 630 38, 710 30 L 710 220 L 90 220 Z"
  },
  {
    id: "badsha-magic",
    tag: "ENTERTAINMENT & TICKETING",
    name: "Badsha Magic World",
    role: "Backend & Systems Architect",
    color: "from-purple-500 via-pink-500 to-rose-400",
    accentHex: "#ec4899",
    gradientId: "badshaGrad",
    statSummary: "100,000+ Visitors Across 19 Cities",
    description: "Architected high-concurrency ticket booking, seat allocation, and customer management engine — overcoming an operational consolidation dip in 2025 to achieve nationwide mega scale.",
    metrics: [
      { label: "Total Visitors", val: "100,000+" },
      { label: "Cities Toured", val: "19 Cities" },
      { label: "Mega Shows", val: "100+ Shows" },
      { label: "2026 Resurgence", val: "+310% Post-Dip" }
    ],
    points: [
      { year: "2024", label: "Backend Build & Setup", value: 45, x: 80, y: 135, highlight: "Engineered robust backend system for high-concurrency ticket booking and customer management before mega tour rollout." },
      { year: "2025", label: "Operational Dip & Restructure", value: 20, x: 380, y: 188, highlight: "Operational consolidation dip during touring logistics restructure. Re-engineered field operations, automated gate scanning & ticket reconciliation to eliminate bottlenecks." },
      { year: "2026", label: "Massive Resurgence • 100k+ Visitors", value: 100, x: 720, y: 25, highlight: "Phenomenal rebound: Scaled to 19 cities with 100+ shows and 100,000+ happy visitors with rock-solid 99.99% system stability." }
    ],
    curvePath: "M 80 135 C 190 135, 250 192, 380 188 C 500 182, 600 35, 720 25",
    areaPath: "M 80 135 C 190 135, 250 192, 380 188 C 500 182, 600 35, 720 25 L 720 220 L 80 220 Z"
  },
  {
    id: "astro-healer",
    tag: "ORGANIC CONVERSION FUNNEL",
    name: "Astro Healer",
    role: "Community & Growth Strategist",
    color: "from-emerald-400 via-teal-400 to-cyan-400",
    accentHex: "#10b981",
    gradientId: "astroGrad",
    statSummary: "10+ Organic Orders Daily",
    description: "Built engaged Instagram community from scratch and architected conversion funnels delivering continuous daily organic sales.",
    metrics: [
      { label: "Daily Orders", val: "10+ Paid / Day" },
      { label: "Acquisition", val: "100% Organic" },
      { label: "Funnel System", val: "IG to Custom Web" },
      { label: "Ad Spend", val: "₹0 (Pure Strategy)" }
    ],
    points: [
      { year: "Q1 2026", label: "Community Foundation", value: 32, x: 100, y: 165, highlight: "Partnered with client. Initiated organic Instagram community building with compelling astrological storytelling & brand trust." },
      { year: "Q2 2026", label: "Bespoke Web Platform", value: 66, x: 380, y: 100, highlight: "Designed and developed bespoke conversion-focused website with friction-free consultation booking & instant checkout." },
      { year: "Current 2026", label: "10+ Daily Conversions", value: 96, x: 700, y: 35, highlight: "Structured organic funnel strategy now converts steadily at 10+ consultation orders daily with zero ad-spend waste." }
    ],
    curvePath: "M 100 165 C 220 155, 290 110, 380 100 C 490 90, 590 45, 700 35",
    areaPath: "M 100 165 C 220 155, 290 110, 380 100 C 490 90, 590 45, 700 35 L 700 220 L 100 220 Z"
  },
  {
    id: "connect-slide",
    tag: "YOUR VENTURE NEXT",
    name: "Let's Build Your Growth Curve",
    role: "System Architecture & Execution",
    color: "from-rose-500 via-purple-500 to-cyan-400",
    accentHex: "#a855f7",
    gradientId: "connectGrad",
    statSummary: "From 0 to 1 and 1 to 100",
    description: "Every breakthrough trajectory begins with a clear system. Let's design, build, and scale your brand's next inflection point.",
    metrics: [
      { label: "Focus", val: "Systems + Growth" },
      { label: "Approach", val: "Full-Stack Builder" },
      { label: "Velocity", val: "High Execution" },
      { label: "Outcome", val: "Predictable Scale" }
    ],
    isCtaSlide: true
  }
];

function TypingText({ text = "Execute to Lead.", delay = 150, speed = 75, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timer;
    let charIdx = 0;
    setDisplayedText("");
    setIsDone(false);

    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        charIdx++;
        setDisplayedText(text.slice(0, charIdx));
        if (charIdx >= text.length) {
          clearInterval(timer);
          setIsDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, delay, speed]);

  return (
    <span className={`inline-flex items-center align-baseline ${className}`}>
      <span>{displayedText}</span>
      <span
        className={`inline-block w-[3px] sm:w-[3.5px] h-[0.88em] bg-rose-500 ml-1 sm:ml-1.5 rounded-full transition-opacity duration-200 ${
          isDone ? "animate-cursor opacity-90" : "opacity-100"
        }`}
        style={{ transform: "translateY(2px)" }}
      />
    </span>
  );
}

export default function Home() {
  const [homeConfig, setHomeConfig] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);
  const [activeImpactIndex, setActiveImpactIndex] = useState(0);
  const [activeNodeIndex, setActiveNodeIndex] = useState(null);

  useEffect(() => {
    setHomeConfig(getHomeData());
    fetch("/api/db?type=home")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setHomeConfig(data);
        }
      })
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  // Close website dropdown when clicking outside
  useEffect(() => {
    if (!websiteDropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".website-dropdown-container")) {
        setWebsiteDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [websiteDropdownOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-rose-500 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Global CSS for Smooth Auto-Marquee Carousel */}
      <style>{`
        @keyframes autoMarqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .auto-carousel-track {
          display: flex;
          width: max-content;
          animation: autoMarqueeScroll 65s linear infinite;
          will-change: transform;
        }
        .auto-carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-64 right-5 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[1200px] left-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[2200px] right-10 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. FLOATING HEADER / NAVBAR (Pure Liquid Glassmorphism Effect) */}
      <header className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-60px)] lg:w-[calc(100%-72px)] max-w-[1400px] z-50">
        <nav className="backdrop-blur-2xl backdrop-saturate-150 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.16] border-t-white/[0.3] rounded-full px-5 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_12px_36px_rgba(0,0,0,0.65)] transition-all duration-300">
          
          {/* Left Menu Links */}
          <div className="hidden lg:flex items-center space-x-1.5 text-[13px] font-medium text-zinc-300">
            <a 
              href="/" 
              className="px-4 py-1.5 rounded-full bg-white/[0.12] text-white border border-white/20 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md transition-all duration-200"
            >
              Home
            </a>
            <a 
              href="/personal" 
              className="px-3.5 py-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              Personal
            </a>
            <a 
              href="/business" 
              className="px-3.5 py-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              Business
            </a>
            <a 
              href="/about" 
              className="px-3.5 py-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              About Me
            </a>
            <a 
              href="/blogs" 
              className="px-3.5 py-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              Blogs
            </a>
          </div>

          {/* Center Handwritten Logo */}
          <div className="flex justify-center items-center">
            <a href="/" className="group flex items-center select-none">
              <img 
                src="/logo-signature.png" 
                alt="Adnan Ali Logo" 
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                style={{ mixBlendMode: "screen" }}
              />
            </a>
          </div>

          {/* Right Social Icons & Websites (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-3.5 sm:gap-4 text-zinc-300 text-xs sm:text-sm">
            <a href="/contact" className="hover:text-rose-400 hover:scale-110 transition-all p-1" title="Contact">
              <i className="fa-solid fa-address-card text-[14px]"></i>
            </a>
            <a href="https://www.facebook.com/adnan.addu.37" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:scale-110 transition-all p-1" title="Facebook">
              <i className="fa-brands fa-facebook-f text-[14px]"></i>
            </a>
            <a href="https://www.instagram.com/_scooby_dooby_/" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 hover:scale-110 transition-all p-1" title="Instagram">
              <i className="fa-brands fa-instagram text-[15px]"></i>
            </a>
            <a href="https://www.linkedin.com/in/adnan-ali-b4b766214" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 hover:scale-110 transition-all p-1" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in text-[14px]"></i>
            </a>
            <a href="mailto:Sayedadnanali905@gmail.com" className="hover:text-rose-400 hover:scale-110 transition-all p-1" title="Email">
              <i className="fa-regular fa-envelope text-[14px]"></i>
            </a>

            {/* Websites Dropdown */}
            <div className="relative website-dropdown-container flex items-center">
              <button 
                onClick={() => setWebsiteDropdownOpen(!websiteDropdownOpen)}
                className="hover:text-cyan-400 hover:scale-110 transition-all p-1 flex items-center focus:outline-none cursor-pointer"
                title="Websites"
              >
                <i className="fa-solid fa-globe text-[14px]"></i>
              </button>

              <div 
                className={`absolute right-0 top-full mt-2 w-52 rounded-2xl bg-zinc-950/90 border border-white/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl transition-all duration-300 origin-top-right ${
                  websiteDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
                } p-2 z-50`}
              >
                <a 
                  href="https://www.addyfitness.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all text-xs group"
                >
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all">
                    <i className="fa-solid fa-dumbbell text-xs"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Addy Fitness</div>
                    <div className="text-[10px] text-zinc-500 font-mono">Healthcare &amp; Fitness</div>
                  </div>
                </a>
                <a 
                  href="https://www.addymeals.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all text-xs group"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <i className="fa-solid fa-bowl-food text-xs"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Addy Meals</div>
                    <div className="text-[10px] text-zinc-500 font-mono">Functional Nutrition</div>
                  </div>
                </a>
                <a 
                  href="https://www.pixelwebpages.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all text-xs group"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <i className="fa-solid fa-code text-xs"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Pixel Webpages</div>
                    <div className="text-[10px] text-zinc-500 font-mono">Web Architecture</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.18] flex items-center justify-center text-white focus:outline-none transition-colors shadow-sm cursor-pointer" 
            aria-label="Toggle Navigation"
          >
            <i className={`${mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} text-xs`}></i>
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <div className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-2 p-3 rounded-2xl bg-zinc-950/95 border border-white/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl flex-col gap-2`}>
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-white/[0.08]">
            <a href="/" className="px-3 py-2 rounded-xl text-white bg-white/[0.12] font-semibold text-xs flex items-center justify-between">
              <span>Home</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-white/50"></i>
            </a>
            <a href="/personal" className="px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs flex items-center justify-between">
              <span>Personal</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-zinc-600"></i>
            </a>
            <a href="/business" className="px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs flex items-center justify-between">
              <span>Business</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-zinc-600"></i>
            </a>
            <a href="/about" className="px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs flex items-center justify-between">
              <span>About Me</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-zinc-600"></i>
            </a>
            <a href="/blogs" className="px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs flex items-center justify-between">
              <span>Blogs</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-zinc-600"></i>
            </a>
            <a href="/contact" className="px-3 py-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-500/20 bg-rose-500/10 border border-rose-500/20 text-xs font-semibold flex items-center justify-between">
              <span>Contact</span>
              <i className="fa-solid fa-address-card text-[10px] text-rose-400"></i>
            </a>
          </div>

          {/* Mobile Ecosystem & Ventures */}
          <div className="pt-1 pb-1 space-y-1">
            <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 px-2 font-bold">Ventures &amp; Ecosystem</span>
            <div className="grid grid-cols-1 gap-1">
              <a href="https://www.addyfitness.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs">
                <div className="w-5 h-5 rounded-md bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-400 text-[9px]">
                  <i className="fa-solid fa-dumbbell"></i>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="font-semibold text-white text-[11px]">Addy Fitness</span>
                  <span className="text-[9px] text-zinc-500 font-mono">addyfitness.com</span>
                </div>
              </a>
              <a href="https://www.addymeals.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs">
                <div className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-[9px]">
                  <i className="fa-solid fa-bowl-food"></i>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="font-semibold text-white text-[11px]">Addy Meals</span>
                  <span className="text-[9px] text-zinc-500 font-mono">addymeals.com</span>
                </div>
              </a>
              <a href="https://www.pixelwebpages.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs">
                <div className="w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-[9px]">
                  <i className="fa-solid fa-code"></i>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="font-semibold text-white text-[11px]">Pixel Webpages</span>
                  <span className="text-[9px] text-zinc-500 font-mono">pixelwebpages.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Mobile Social Bar at Bottom of Menu */}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-around px-2 py-1">
            <a href="https://www.facebook.com/adnan.addu.37" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-blue-400 transition-all text-xs" title="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/_scooby_dooby_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-rose-400 transition-all text-xs" title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/adnan-ali-b4b766214" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-sky-400 transition-all text-xs" title="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="mailto:Sayedadnanali905@gmail.com" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-rose-400 transition-all text-xs" title="Email">
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>
        </div>
      </header>

      {/* 2. FULL VIEWPORT HERO SECTION (Character and Text Together, Prominently Scaled in All Directions) */}
      <section className="min-h-screen sm:h-screen w-full flex flex-col justify-between relative overflow-hidden pt-16 sm:pt-20 pb-3 sm:pb-6 lg:pb-8">
        
        {/* Top Spacer for Fixed Header */}
        <div className="h-1 sm:h-2 shrink-0 pointer-events-none" />

        {/* Center Main Hero Content (Significantly Scaled in All Directions) */}
        <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 min-h-0">
          <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center justify-center">
            
            {/* Character Artwork (Significantly enlarged and prominent) */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex items-center justify-center relative w-full">
              <div className="relative w-full max-w-[420px] xs:max-w-[480px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[720px] xl:max-w-[780px] flex items-center justify-center">
                <img 
                  src="/avatar.png" 
                  alt="Adnan Ali Character" 
                  className="w-full h-auto max-h-[60vh] xs:max-h-[66vh] sm:max-h-[72vh] md:max-h-[78vh] lg:max-h-[82vh] xl:max-h-[88vh] object-contain relative z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] scale-105 sm:scale-110 lg:scale-115 xl:scale-120 transform-gpu transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Headline & Action Triggers (Prominently scaled in all directions) */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 sm:space-y-5 md:space-y-6 z-10">
              
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/[0.14] rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wider text-rose-400 uppercase shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]"></span>
                FOUNDER <span className="text-zinc-600">•</span> BUILDER <span className="text-zinc-600">•</span> ENTREPRENEUR
              </div>

              {/* Main Headline (Observe to Learn / Execute to Lead with Typing on 2nd Line) */}
              <h1 className="text-[38px] xs:text-[44px] sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[5rem] font-extrabold text-white leading-[1.08] tracking-tight">
                <span className="block">Observe to Learn</span>
                <span className="block italic font-serif text-white min-h-[1.12em] whitespace-nowrap">
                  <TypingText text="Execute to Lead." delay={150} speed={75} />
                </span>
              </h1>

              {/* Subtitle in 1 Line */}
              <p className="text-zinc-300/90 text-sm xs:text-base sm:text-lg md:text-xl lg:text-[1.35rem] whitespace-normal sm:whitespace-nowrap max-w-none leading-relaxed font-normal">
                I don&apos;t just build brands. I build the{" "}
                <span className="text-emerald-400 font-semibold border-b border-emerald-500/40 pb-0.5">systems</span> behind them.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-500 to-rose-600 text-white font-bold text-base sm:text-lg tracking-wide shadow-[0_8px_32px_rgba(244,63,94,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_42px_rgba(244,63,94,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                >
                  <span>Let&apos;s Connect</span>
                  <i className="fa-solid fa-arrow-right-long text-sm sm:text-base group-hover:translate-x-1.5 transition-transform duration-300"></i>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM EDGE-TO-EDGE LOGO CAROUSEL STRIP (Elevated and clear) */}
        <div className="w-full shrink-0 border-y border-white/[0.12] bg-black/95 backdrop-blur-2xl py-3 sm:py-3.5 relative overflow-hidden shadow-2xl z-20">
          
          {/* Left and Right Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

          {/* Auto Marquee Track (Smooth Calibrated Speed) */}
          <div className="auto-carousel-track flex items-center gap-4 sm:gap-8 select-none">
            {techLogos.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2.5 shrink-0 px-3.5 py-2 sm:px-4 sm:py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-white/30 hover:bg-white/[0.09] transition-all cursor-pointer group shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg bg-zinc-900/90 flex items-center justify-center p-1 shadow-sm group-hover:scale-110 transition-transform">
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="w-full h-full object-contain filter drop-shadow-sm" 
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}

            {/* Duplicate set for seamless continuous infinite carousel */}
            {techLogos.map((item, idx) => (
              <div 
                key={`dup-${idx}`} 
                className="flex items-center gap-2.5 shrink-0 px-3.5 py-2 sm:px-4 sm:py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-white/30 hover:bg-white/[0.09] transition-all cursor-pointer group shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-lg bg-zinc-900/90 flex items-center justify-center p-1 shadow-sm group-hover:scale-110 transition-transform">
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="w-full h-full object-contain filter drop-shadow-sm" 
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* 3. SCROLLABLE REST OF SECTIONS */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 py-16 pb-24">

        {/* ABOUT ME SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px]">
              
              {/* Image Card Container */}
              <div className="relative aspect-[4/4.8] rounded-[32px] bg-gradient-to-b from-zinc-900 to-black border border-white/[0.12] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center group">
                <img 
                  src="/about-adnan.jpg" 
                  alt="About Adnan Ali" 
                  className="w-full h-full object-cover object-[center_20%] filter brightness-100 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/about-portrait.jpg';
                  }}
                />
              </div>

            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              <i className="fa-solid fa-user-tie text-[11px]"></i>
              ABOUT ME
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              &ldquo;From a learner, for the{" "}
              <span className="text-rose-500">learners.&rdquo;</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
              I&apos;m Adnan Ali, a founder, builder, and lifelong learner. Money doesn&apos;t matter to me as much as people do. What drives me is the opportunity to help people grow, turn their ideas into reality, and become better versions of themselves. I believe success is not just about what we build for ourselves, but about how many people we can help along the way. I&apos;m still learning every day, and that&apos;s why I believe in sharing, building, and growing together.
            </p>

            <div className="pt-2">
              <a 
                href="/about" 
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-b from-white/[0.1] to-white/[0.03] border border-white/[0.18] text-white font-semibold text-xs sm:text-sm hover:border-white/35 hover:bg-white/[0.14] transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <span>More About Me</span>
                <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>

        </section>


        {/* 4. MY VENTURES SECTION */}
        <section className="space-y-8">
          
          {/* Section Header (Center aligned on phone) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-4 text-center sm:text-left items-center sm:items-end">
            <div className="flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1">
                <i className="fa-solid fa-cubes-stacked text-[11px]"></i>
                MY VENTURES
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ideas in <span className="text-cyan-400">action</span><span className="text-rose-500">.</span>
              </h2>
            </div>
            
            <a 
              href="/business" 
              className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-rose-400 bg-clip-text text-transparent inline-flex items-center gap-1.5 transition-opacity hover:opacity-80 group"
            >
              <span>View All Projects</span>
              <i className="fa-solid fa-arrow-right text-xs text-rose-400 group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

          {/* 3 Venture Cards Grid (Vibrant Top Imagery with Smooth Dark Fade at Bottom for Readability) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Venture 1: Addy Fitness (59.webp) */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[32px] overflow-hidden border border-rose-500/30 p-6 flex flex-col justify-end group shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-rose-400/70 transition-all duration-500 bg-zinc-950">
              {/* Background Image: Crisp, vibrant & colorful */}
              <img 
                src="/59.webp" 
                alt="Addy Fitness" 
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-100 contrast-105 saturate-110 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              {/* Smooth Dark Gradient only on the bottom side for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/85 via-45% to-transparent pointer-events-none" />

              {/* Bottom Content Area */}
              <div className="relative z-10 space-y-2.5">
                {/* Company Name & Arrow Button Beside It */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/25 border border-rose-400/40 flex items-center justify-center text-rose-300 shadow-sm">
                      <i className="fa-solid fa-dumbbell text-xs"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                      Addy Fitness
                    </h3>
                  </div>
                  <a 
                    href="https://www.addyfitness.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-rose-600 group-hover:border-rose-400 transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] shrink-0 hover:scale-110 active:scale-95"
                  >
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>
                </div>

                {/* Description Text Below */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal drop-shadow-sm">
                  Affordable fitness, nutrition and complete health solutions for a stronger India.
                </p>
              </div>
            </div>

            {/* Venture 2: Addy Meals (61.webp) */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[32px] overflow-hidden border border-amber-500/30 p-6 flex flex-col justify-end group shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-amber-400/70 transition-all duration-500 bg-zinc-950">
              {/* Background Image: Crisp, vibrant & colorful */}
              <img 
                src="/61.webp" 
                alt="Addy Meals" 
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-100 contrast-105 saturate-110 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              {/* Smooth Dark Gradient only on the bottom side for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/85 via-45% to-transparent pointer-events-none" />

              {/* Bottom Content Area */}
              <div className="relative z-10 space-y-2.5">
                {/* Company Name & Arrow Button Beside It */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/25 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm">
                      <i className="fa-solid fa-bowl-food text-xs"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      Addy Meals
                    </h3>
                  </div>
                  <a 
                    href="https://www.addymeals.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-amber-600 group-hover:border-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0 hover:scale-110 active:scale-95"
                  >
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>
                </div>

                {/* Description Text Below */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal drop-shadow-sm">
                  Functional, delicious and better-for-you food & beverages for everyday wellness.
                </p>
              </div>
            </div>

            {/* Venture 3: Pixel Webpages (60.webp) */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[32px] overflow-hidden border border-cyan-500/30 p-6 flex flex-col justify-end group shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-cyan-400/70 transition-all duration-500 bg-zinc-950">
              {/* Background Image: Clean, high contrast & stylish */}
              <img 
                src="/60.webp" 
                alt="Pixel Webpages" 
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-100 contrast-125 invert-[0.92] group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              {/* Smooth Dark Gradient only on the bottom side for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/85 via-45% to-transparent pointer-events-none" />

              {/* Bottom Content Area */}
              <div className="relative z-10 space-y-2.5">
                {/* Company Name & Arrow Button Beside It */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/25 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-sm">
                      <i className="fa-solid fa-code text-xs"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Pixel Webpages
                    </h3>
                  </div>
                  <a 
                    href="https://www.pixelwebpages.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-cyan-600 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0 hover:scale-110 active:scale-95"
                  >
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>
                </div>

                {/* Description Text Below */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal drop-shadow-sm">
                  Modern websites and digital solutions for brands that want to grow.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* 5. WHAT I DO SECTION */}
        <section className="space-y-8">
          
          {/* Header Row (Center aligned on phone) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900/90 pb-4 text-center sm:text-left items-center sm:items-start">
            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
              <div className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center justify-center sm:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                WHAT I DO
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Strategy. Execution. <span className="bg-gradient-to-r from-cyan-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Growth.</span>
              </h2>
            </div>
          </div>

          {/* 4 Premium Cards Grid with High-Fidelity Liquid Glass & Context-Specific Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Card 1: Building Systems */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-zinc-950/90 to-black p-6 sm:p-7 border border-white/[0.12] hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500 pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/70 group-hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300">
                    <i className="fa-solid fa-diagram-project text-xl"></i>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-500 group-hover:text-cyan-400 transition-colors">01</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    Building Systems
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                    Architecting end-to-end operational workflows, automated systems, and scalable infrastructure built for long-term growth.
                  </p>
                </div>
              </div>

              <div className="pt-5 relative z-10">
                <div className="w-6 h-0.5 rounded-full bg-cyan-500/30 group-hover:w-12 group-hover:bg-cyan-400 transition-all duration-300"></div>
              </div>
            </div>

            {/* Card 2: Conceptualizing Products */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-zinc-950/90 to-black p-6 sm:p-7 border border-white/[0.12] hover:border-rose-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(244,63,94,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-500/15 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-all duration-500 pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:border-rose-400/70 group-hover:bg-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all duration-300">
                    <i className="fa-solid fa-shapes text-xl"></i>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-500 group-hover:text-rose-400 transition-colors">02</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-rose-300 transition-colors">
                    Conceptualizing Products
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                    Turning raw insights into validated products through rapid prototyping, intuitive UX, and market-driven execution.
                  </p>
                </div>
              </div>

              <div className="pt-5 relative z-10">
                <div className="w-6 h-0.5 rounded-full bg-rose-500/30 group-hover:w-12 group-hover:bg-rose-400 transition-all duration-300"></div>
              </div>
            </div>

            {/* Card 3: Digital & Technology */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-zinc-950/90 to-black p-6 sm:p-7 border border-white/[0.12] hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,185,129,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500 pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400/70 group-hover:bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                    <i className="fa-solid fa-code text-xl"></i>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-500 group-hover:text-emerald-400 transition-colors">03</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    Digital & Technology
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                    Building high-performance digital platforms, custom ecosystems, and modern software that turn ideas into working products.
                  </p>
                </div>
              </div>

              <div className="pt-5 relative z-10">
                <div className="w-6 h-0.5 rounded-full bg-emerald-500/30 group-hover:w-12 group-hover:bg-emerald-400 transition-all duration-300"></div>
              </div>
            </div>

            {/* Card 4: Growth & Marketing */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-zinc-950/90 to-black p-6 sm:p-7 border border-white/[0.12] hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-500/15 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500 pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:border-purple-400/70 group-hover:bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                    <i className="fa-solid fa-arrow-trend-up text-xl"></i>
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-500 group-hover:text-purple-400 transition-colors">04</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    Growth & Marketing
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                    Building acquisition strategies, distribution channels, and data-driven growth systems that turn traction into scale.
                  </p>
                </div>
              </div>

              <div className="pt-5 relative z-10">
                <div className="w-6 h-0.5 rounded-full bg-purple-500/30 group-hover:w-12 group-hover:bg-purple-400 transition-all duration-300"></div>
              </div>
            </div>

          </div>

        </section>


        {/* 6. RESULTS / IMPACT — “Ideas are nice. Results are better.” */}
        <section className="space-y-8 relative">
          
          {/* Section Header (Center aligned on phone) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-900 pb-6 text-center lg:text-left items-center lg:items-start">
            <div className="space-y-2 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <i className="fa-solid fa-arrow-trend-up text-cyan-400 text-[11px]"></i>
                PROVEN TRACTION &amp; INFLECTION POINTS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Results / <span className="text-cyan-400">Impact</span>
              </h2>
              <p className="text-zinc-300 text-base sm:text-lg italic font-light font-serif">
                &ldquo;Ideas are nice. <span className="text-white font-medium not-italic bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-sans font-bold">Results are better.</span>&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed text-center lg:text-left">
              Real growth is never a straight line. It is a compounding journey of architecture, rapid iterations, pivots, and scaling breakthroughs.
            </p>
          </div>

          {/* Interactive Navigation Tabs & Carousel Controls */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap">
              {impactProjects.map((p, idx) => {
                const isActive = activeImpactIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveImpactIndex(idx);
                      setActiveNodeIndex(null);
                    }}
                    className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border flex items-center gap-2 ${
                      isActive
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]"
                        : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    <span>{p.name}</span>
                    {p.isCtaSlide ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">Connect</span>
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : "bg-zinc-600"}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Buttons */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setActiveImpactIndex((prev) => (prev === 0 ? impactProjects.length - 1 : prev - 1));
                  setActiveNodeIndex(null);
                }}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center text-xs transition-all active:scale-95"
                aria-label="Previous Slide"
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button
                onClick={() => {
                  setActiveImpactIndex((prev) => (prev === impactProjects.length - 1 ? 0 : prev + 1));
                  setActiveNodeIndex(null);
                }}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center text-xs transition-all active:scale-95"
                aria-label="Next Slide"
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>

          {/* Active Venture Graph Card / Case Study Card */}
          {(() => {
            const project = impactProjects[activeImpactIndex];
            const isCta = project.isCtaSlide;

            if (isCta) {
              return (
                <div className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border border-purple-500/30 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase">
                        <i className="fa-solid fa-sparkles text-[10px]"></i>
                        READY FOR YOUR NEXT LEAP?
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                        Let&apos;s Engineer Your Brand&apos;s <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Growth Curve</span>
                      </h3>

                      <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        Every scalable venture is built on three pillars: rock-solid system architecture, conversion-focused digital platforms, and disciplined growth distribution. Let&apos;s build yours.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                          <div className="text-cyan-400 text-sm font-bold mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-compass-drafting text-xs"></i>
                            01. Strategy
                          </div>
                          <div className="text-zinc-400 text-xs">Zero-fluff audit, bottlenecks removal &amp; blueprint</div>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                          <div className="text-purple-400 text-sm font-bold mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-code-merge text-xs"></i>
                            02. Engineering
                          </div>
                          <div className="text-zinc-400 text-xs">Custom web systems, booking engines &amp; automation</div>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                          <div className="text-rose-400 text-sm font-bold mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-rocket text-xs"></i>
                            03. Scale
                          </div>
                          <div className="text-zinc-400 text-xs">Community funnels &amp; performance growth</div>
                        </div>
                      </div>

                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        <a
                          href="/contact"
                          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(244,63,94,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_8px_32px_rgba(244,63,94,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                        >
                          <span>Connect to Know More</span>
                          <i className="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1.5 transition-transform" />
                        </a>
                        <a
                          href="/business"
                          className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95"
                        >
                          <span>Explore Business Ventures</span>
                          <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <div className="w-full max-w-sm p-6 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl relative space-y-4 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                          <i className="fa-solid fa-chart-line" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">Full-Stack Execution</h4>
                          <p className="text-xs text-zinc-400 mt-1">From initial concept to 100,000+ users &amp; automated daily conversions.</p>
                        </div>
                        <div className="pt-2 border-t border-white/10 flex items-center justify-around text-center">
                          <div>
                            <div className="text-lg font-black text-white font-mono">100k+</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase">Visitors Handled</div>
                          </div>
                          <div className="w-[1px] h-8 bg-zinc-800" />
                          <div>
                            <div className="text-lg font-black text-white font-mono">19+</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase">Cities Impacted</div>
                          </div>
                          <div className="w-[1px] h-8 bg-zinc-800" />
                          <div>
                            <div className="text-lg font-black text-white font-mono">5+ Yrs</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase">Track Record</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-zinc-950 border border-white/[0.12] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden space-y-6">
                
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

                {/* Venture Overview Top Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.08] text-zinc-300 border border-white/10 uppercase">
                        {project.tag}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium font-mono">
                        {project.role}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1.5 flex items-center gap-3">
                      <span>{project.name}</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-right shadow-sm">
                      <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Highlight Metric</div>
                      <div className={`text-sm sm:text-base font-extrabold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                        {project.statSummary}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                {/* SVG ROLLERCOASTER GROWTH & IMPACT GRAPH */}
                <div className="relative rounded-2xl bg-black/60 border border-zinc-800/80 p-4 sm:p-6 overflow-hidden">
                  
                  {/* Graph Top Axis Bar */}
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-zinc-500 pb-2 border-b border-zinc-900">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <i className="fa-solid fa-chart-area text-cyan-400" />
                      NON-LINEAR EXECUTION &amp; IMPACT CURVE
                    </span>
                    <span className="text-zinc-600 hidden sm:inline">
                      Hover nodes to inspect milestone events
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <div className="relative w-full aspect-[16/7] sm:aspect-[16/5.5] min-h-[220px] mt-2">
                    
                    {/* SVG Graphic */}
                    <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={project.gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={project.accentHex} stopOpacity="0.55" />
                          <stop offset="65%" stopColor={project.accentHex} stopOpacity="0.12" />
                          <stop offset="100%" stopColor={project.accentHex} stopOpacity="0.00" />
                        </linearGradient>

                        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Horizontal Grid Guide Lines */}
                      <line x1="40" y1="35" x2="760" y2="35" stroke="#27272a" strokeDasharray="4 4" strokeWidth="1" />
                      <line x1="40" y1="95" x2="760" y2="95" stroke="#27272a" strokeDasharray="4 4" strokeWidth="1" />
                      <line x1="40" y1="155" x2="760" y2="155" stroke="#27272a" strokeDasharray="4 4" strokeWidth="1" />
                      <line x1="40" y1="210" x2="760" y2="210" stroke="#3f3f46" strokeWidth="1.2" />

                      {/* Guide Text Labels */}
                      <text x="45" y="30" fill="#a1a1aa" fontSize="9" fontWeight="bold" fontFamily="monospace">SCALE / LEADERSHIP (95%+)</text>
                      <text x="45" y="90" fill="#71717a" fontSize="9" fontFamily="monospace">INFLECTION / SURGE (65%+)</text>
                      <text x="45" y="150" fill="#52525b" fontSize="9" fontFamily="monospace">VALIDATION / PIVOT (35%+)</text>

                      {/* Vertical Laser Drop Beams for each milestone point */}
                      {project.points.map((pt, pIdx) => {
                        const isHovered = activeNodeIndex === pIdx;
                        return (
                          <line
                            key={`beam-${pIdx}`}
                            x1={pt.x}
                            y1={pt.y}
                            x2={pt.x}
                            y2="210"
                            stroke={isHovered ? project.accentHex : "#3f3f46"}
                            strokeDasharray={isHovered ? "2 2" : "3 3"}
                            strokeWidth={isHovered ? "1.5" : "1"}
                            opacity={isHovered ? "0.9" : "0.4"}
                            className="transition-all duration-200"
                          />
                        );
                      })}

                      {/* Shaded Area Under Curve with Ambient Refraction */}
                      <path d={project.areaPath} fill={`url(#${project.gradientId})`} />

                      {/* Background Soft Neon Blur Path */}
                      <path
                        d={project.curvePath}
                        fill="none"
                        stroke={project.accentHex}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.35"
                        filter="url(#neonGlow)"
                      />

                      {/* Foreground Crisp Main Stroke */}
                      <path
                        d={project.curvePath}
                        fill="none"
                        stroke={project.accentHex}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      />

                      {/* Interactive Data Point Nodes */}
                      {project.points.map((pt, pIdx) => {
                        const isHovered = activeNodeIndex === pIdx;
                        const isLast = pIdx === project.points.length - 1;
                        const isDip = pt.value <= 25 && pIdx > 0;
                        return (
                          <g
                            key={pIdx}
                            className="cursor-pointer group"
                            onMouseEnter={() => setActiveNodeIndex(pIdx)}
                            onMouseLeave={() => setActiveNodeIndex(null)}
                            onClick={() => setActiveNodeIndex(pIdx)}
                          >
                            {/* Animated Pulse Ring on active or last or dip point */}
                            {(isHovered || isLast) && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="15"
                                fill="none"
                                stroke={project.accentHex}
                                strokeWidth="1.5"
                                opacity="0.6"
                                className="animate-ping"
                              />
                            )}

                            {/* Halo background */}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isHovered ? "10" : "7.5"}
                              fill="#09090b"
                              stroke={isDip ? "#fbbf24" : project.accentHex}
                              strokeWidth={isHovered ? "3.5" : "2.5"}
                              className="transition-all duration-200 shadow-lg"
                            />

                            {/* Center Dot */}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="3.5"
                              fill={isDip ? "#fbbf24" : "#ffffff"}
                            />

                            {/* Year Marker Label */}
                            <text
                              x={pt.x}
                              y={pt.y > 175 ? pt.y - 18 : pt.y - 16}
                              textAnchor="middle"
                              fill={isHovered ? "#ffffff" : isDip ? "#fbbf24" : "#e4e4e7"}
                              fontSize="11"
                              fontWeight="bold"
                              fontFamily="monospace"
                              className="transition-colors duration-200 select-none drop-shadow"
                            >
                              {pt.year}
                            </text>

                            {/* Mini Status Tag Above Dip or Peak Point */}
                            {isDip && (
                              <text
                                x={pt.x}
                                y={pt.y + 20}
                                textAnchor="middle"
                                fill="#fbbf24"
                                fontSize="8.5"
                                fontWeight="bold"
                                fontFamily="monospace"
                                className="select-none"
                              >
                                [CONSOLIDATION DIP]
                              </text>
                            )}

                            {isLast && project.id === "badsha-magic" && (
                              <text
                                x={pt.x}
                                y={pt.y + 20}
                                textAnchor="middle"
                                fill="#38bdf8"
                                fontSize="8.5"
                                fontWeight="bold"
                                fontFamily="monospace"
                                className="select-none"
                              >
                                [19 CITIES • 100K+ VISITORS]
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* Active Tooltip / Inspection Overlay */}
                    {activeNodeIndex !== null && project.points[activeNodeIndex] && (
                      <div className="absolute top-2 right-2 max-w-xs bg-zinc-950/95 border border-white/25 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-left pointer-events-none transition-all">
                        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-zinc-800">
                          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentHex }} />
                            {project.points[activeNodeIndex].year} — {project.points[activeNodeIndex].label}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                            {project.points[activeNodeIndex].value}% Index
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-2 leading-relaxed">
                          {project.points[activeNodeIndex].highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Milestone Breakdown Cards Grid */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                    Trajectory Milestones &amp; Strategic Moves
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {project.points.map((pt, pIdx) => {
                      const isSelected = activeNodeIndex === pIdx;
                      return (
                        <div
                          key={pIdx}
                          onMouseEnter={() => setActiveNodeIndex(pIdx)}
                          onMouseLeave={() => setActiveNodeIndex(null)}
                          className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-white/[0.08] border-white/30 shadow-[0_4px_16px_rgba(255,255,255,0.1)] -translate-y-0.5"
                              : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                              {pt.year}
                            </span>
                            <span className="text-[11px] font-bold text-white tracking-tight truncate">
                              {pt.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-3">
                            {pt.highlight}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Metrics Footprint Row */}
                <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{m.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{m.val}</div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })()}

        </section>


        {/* 7. LATEST FROM MY BLOG SECTION */}
        <section className="space-y-8">
          
          {/* Header Row (Center aligned on phone) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-4 text-center sm:text-left items-center sm:items-end">
            <div className="flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-1">
                <i className="fa-solid fa-feather-pointed text-[11px]"></i>
                LATEST FROM MY BLOG
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Thoughts, learnings <br className="hidden sm:inline" />
                and <span className="text-cyan-400">what&apos;s</span> <span className="text-rose-500">next.</span>
              </h2>
            </div>
            
            <a 
              href="/blogs" 
              className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>View All Blogs</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

          {/* 3 Blog Cards Grid with Liquid Glass & Elevated Action Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Blog Card 1 */}
            <a 
              href="/blogs"
              className="rounded-3xl bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border border-white/[0.12] overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-xl block"
            >
              <div>
                {/* Image Card Container */}
                <div className="relative aspect-[16/10] bg-zinc-900/90 overflow-hidden">
                  <img 
                    src="/blog-fitness.png" 
                    alt="Fitness Blog" 
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                    <i className="fa-regular fa-clock text-[9px] text-cyan-400"></i>
                    5 min read
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    How to Build a Sustainable Fitness Routine
                  </h3>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-zinc-500 text-[11px] font-medium border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <i className="fa-regular fa-calendar text-[10px]"></i>
                  Sep 28, 2026
                </span>
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-sm">
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </div>
              </div>
            </a>

            {/* Blog Card 2 */}
            <a 
              href="/blogs"
              className="rounded-3xl bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border border-white/[0.12] overflow-hidden hover:border-orange-400/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-xl block"
            >
              <div>
                {/* Image Card Container */}
                <div className="relative aspect-[16/10] bg-zinc-900/90 overflow-hidden">
                  <img 
                    src="/blog-backpain.png" 
                    alt="Indian Food Blog" 
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                    <i className="fa-regular fa-clock text-[9px] text-orange-400"></i>
                    4 min read
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-2">
                    Indian Food for a Healthier You
                  </h3>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-zinc-500 text-[11px] font-medium border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <i className="fa-regular fa-calendar text-[10px]"></i>
                  Sep 20, 2026
                </span>
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-sm">
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </div>
              </div>
            </a>

            {/* Blog Card 3 */}
            <a 
              href="/blogs"
              className="rounded-3xl bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border border-white/[0.12] overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-xl block"
            >
              <div>
                {/* Image Card Container */}
                <div className="relative aspect-[16/10] bg-zinc-900/90 overflow-hidden">
                  <img 
                    src="/blog-tech.png" 
                    alt="Website Blog" 
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                    <i className="fa-regular fa-clock text-[9px] text-cyan-400"></i>
                    6 min read
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    Why a Good Website Can Change Your Business
                  </h3>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-zinc-500 text-[11px] font-medium border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <i className="fa-regular fa-calendar text-[10px]"></i>
                  Sep 15, 2026
                </span>
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all shadow-sm">
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </div>
              </div>
            </a>

          </div>

        </section>


        {/* 8. LET'S WORK TOGETHER / FOOTER CTA BANNER */}
        <section className="relative w-full max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border border-white/[0.12] px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 pb-0 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)]">
          
          {/* Ambient Glows */}
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            
            {/* Left Content (Vertically Centered) */}
            <div className="lg:col-span-7 space-y-4 py-8 sm:py-10 lg:py-12 self-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <i className="fa-solid fa-handshake text-[11px]"></i>
                LET&apos;S WORK TOGETHER
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-white leading-tight tracking-tight">
                Have an idea <br />
                or a <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">project</span><span className="text-rose-500">?</span>
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed font-normal">
                I&apos;m always open to meaningful collaborations, new opportunities and interesting conversations.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-500 to-rose-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_8px_32px_rgba(244,63,94,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_42px_rgba(244,63,94,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                >
                  <span>Let&apos;s Connect</span>
                  <i className="fa-solid fa-arrow-right-long text-xs group-hover:translate-x-1.5 transition-transform"></i>
                </a>
              </div>
            </div>

            {/* Right Character Pointing (Base sits directly flush with bottom bezel of card) */}
            <div className="lg:col-span-5 flex items-end justify-center lg:justify-end self-end relative">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] flex items-end justify-center">
                <img 
                  src="/pointing-avatar-transparent.png" 
                  alt="Character Pointing" 
                  className="w-full h-auto object-contain block align-bottom filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
                  onError={(e) => {
                    e.currentTarget.src = '/above-fot.webp';
                  }}
                />
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* HIGH FIDELITY LIQUID GLASS FOOTER */}
      <footer className="w-full relative z-20 mt-12 overflow-hidden rounded-t-[2.75rem] sm:rounded-t-[3.75rem] backdrop-blur-3xl backdrop-saturate-200 bg-gradient-to-b from-white/[0.12] via-zinc-950/80 to-black/95 border-t border-white/[0.24] border-x border-white/[0.06] shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.35),0_-20px_60px_rgba(0,0,0,0.9)] pt-5 sm:pt-6 pb-5 sm:pb-6 px-6 sm:px-12">
        
        {/* Internal Liquid Ambient Light Refractions */}
        <div className="absolute top-0 left-1/4 w-96 h-40 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-40 bg-rose-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle Top Liquid Highlight Specular Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 relative z-10">
          
          {/* Large Signature Image */}
          <div className="flex justify-center select-none pointer-events-none">
            <img 
              src="/signature-new.png" 
              alt="Sayed Adnan Ali Signature Logo" 
              className="h-auto max-w-[320px] sm:max-w-[420px] md:max-w-[480px] w-full object-contain drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-zinc-400 text-xs sm:text-sm tracking-[0.28em] uppercase font-bold font-mono drop-shadow-sm">
            BUILDING THE FUTURE
          </p>

          {/* Sector Identifiers in Liquid Glass Capsule */}
          <div className="flex justify-center pt-0.5">
            <div className="inline-flex items-center justify-center gap-2 sm:gap-4 px-5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] text-zinc-400 text-[10px] sm:text-xs tracking-[0.2em] font-black uppercase flex-wrap">
              <span>FOOD &amp; BEVERAGE</span>
              <span className="text-white/30">•</span>
              <span>TECHNOLOGY</span>
              <span className="text-white/30">•</span>
              <span>HEALTHCARE</span>
            </div>
          </div>

          {/* Requested Cursive/Italic Quote */}
          <p className="text-zinc-300/90 text-xs sm:text-sm italic font-light max-w-xl mx-auto leading-relaxed pt-1.5 border-t border-white/[0.08]">
            &ldquo;I may not have an MBA, but life gave me something far more valuable—the wisdom to lead, the courage to adapt, and the experience to overcome.&rdquo;
          </p>

          {/* Liquid Glass Floating Social Bubbles */}
          <div className="flex justify-center gap-3.5 pt-1">
            {[
              { icon: "fab fa-facebook-f", url: "https://www.facebook.com/adnan.addu.37" },
              { icon: "fab fa-instagram", url: "https://www.instagram.com/_scooby_dooby_/" },
              { icon: "fas fa-envelope", url: "mailto:Sayedadnanali905@gmail.com" },
              { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/adnan-ali-b4b766214" }
            ].map((item, idx) => (
              <a 
                key={idx} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-white/[0.02] border border-white/[0.22] hover:border-white/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.45),0_8px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_0_24px_rgba(255,255,255,0.3)] backdrop-blur-xl hover:-translate-y-1 hover:scale-110 active:scale-95"
              >
                <i className={`${item.icon} text-sm`}></i>
              </a>
            ))}
          </div>

          {/* Bottom Copyright & Discreet Admin Access */}
          <div className="flex justify-center pt-2 sm:pt-3">
            <a 
              href="/admin" 
              className="text-[9px] sm:text-[10px] text-zinc-500 hover:text-zinc-400 font-mono tracking-widest uppercase text-center transition-colors cursor-pointer select-none"
              title="Admin"
            >
              © 2026 SAYED ADNAN ALI. ALL RIGHTS RESERVED.
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
