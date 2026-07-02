"use client";

import React, { useState, useEffect } from "react";
import { getHomeData } from "./utils/db";

const stackRow1 = [
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
  { name: "Razorpay", url: "/processed-icons/razorpay.png" }
];

const stackRow2 = [
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

export default function Home() {
  const [homeConfig, setHomeConfig] = useState(null);

  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Bottom Drawer Expand State
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toast Notification System State
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // State for active CTA logo index (auto swiping)
  const [activeCtaIndex, setActiveCtaIndex] = useState(0);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  useEffect(() => {
    setHomeConfig(getHomeData());
    fetch("/api/db?type=home")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setHomeConfig(data);
          localStorage.setItem("addy_home", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Error fetching home data from Neon:", err));
  }, []);

  const currentHomeData = homeConfig || { 
    heroImage: "/avatar.png", 
    headingTitle: "Building brands that improve how", 
    animatedWords: ["live,", "eat,", "grow."], 
    stackItems: [...stackRow1, ...stackRow2] 
  };

  const allIcons = currentHomeData.stackItems && currentHomeData.stackItems.length > 0 
    ? currentHomeData.stackItems 
    : [...stackRow1, ...stackRow2];

  const half = Math.ceil(allIcons.length / 2);
  const row1 = allIcons.slice(0, half);
  const row2 = allIcons.slice(half);

  useEffect(() => {
    if (allIcons.length === 0) return;
    const timer = setInterval(() => {
      setActiveCtaIndex((prev) => (prev + 1) % allIcons.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [allIcons.length]);

  // Toast dismiss timer hook
  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

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

  // Show Toast action
  const showSectionToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Touch Gestures for mobile swipe-to-open and swipe-to-close
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50;
    const isSwipeDown = distance < -50;

    if (isSwipeUp) {
      setDrawerOpen(true);
    } else if (isSwipeDown) {
      setDrawerOpen(false);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        .animate-float-icon {
          animation: float-icon 3.5s ease-in-out infinite;
        }
        @keyframes wave-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-wave-bar {
          background-size: 200% auto;
          animation: wave-flow 4s linear infinite;
        }
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 25s linear infinite;
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 25s linear infinite;
        }
        .liquid-glass-ball {
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 55%, rgba(255, 255, 255, 0.25) 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          box-shadow: 
            inset 0 3px 5px rgba(255, 255, 255, 0.6), 
            inset -3px -3px 5px rgba(0, 0, 0, 0.12), 
            0 8px 16px rgba(255, 255, 255, 0.06),
            0 4px 6px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.65) translateY(4px);
          }
          15% {
            opacity: 1;
            transform: scale(1.15) translateY(0);
          }
          25%, 85% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.75) translateY(-4px);
          }
        }
        .animate-pop-in {
          animation: pop-in 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
      `}</style>
      
      {/* Background lights to complement white, red, and green highlights on the character jacket */}
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-accentTeal/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-accentRed/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

      {/* MAIN NAV BAR: Redesigned with Left Links, Center Handwritten Signature, Right Icons & Liquid Glass Shading */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
        <nav className="backdrop-blur-3xl bg-gradient-to-b from-white/[0.18] to-white/[0.08] border border-white/20 border-t-white/35 rounded-full px-6 py-1.5 sm:py-2 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_40px_rgba(0,0,0,0.75)]">
          
          {/* LEFT: Menu Links (Home, Personal, Business, About Me, Contact) */}
          <div className="hidden lg:flex items-center justify-start space-x-1.5 text-[13px] font-semibold tracking-wide text-zinc-400 flex-1">
            <a 
              href="/" 
              className="px-4 py-2 rounded-full border border-white/10 bg-white/10 text-white transition-all duration-300"
            >
              Home
            </a>
            <a 
              href="/personal" 
              className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Personal
            </a>
            <a 
              href="/business" 
              className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Business
            </a>
            <a 
              href="/about" 
              className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5"
            >
              About Me
            </a>
            <a 
              href="/blogs" 
              className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Blogs
            </a>
          </div>

          {/* CENTER: Cropped handwritten signature logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <a href="/" className="group flex items-center select-none">
              <img 
                src="/logo-signature.png" 
                alt="Adnan Ali Signature Logo" 
                className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                style={{ mixBlendMode: "screen" }}
              />
            </a>
          </div>

          {/* RIGHT: Social Media & Connection Icons */}
          <div className="flex-1 flex items-center justify-end gap-3.5">
            <div className="flex items-center space-x-[18px] sm:space-x-[22px] text-zinc-400">
              <a href="/contact" className="hover:text-white transition-all duration-300" title="Contact">
                <i className="fas fa-id-card text-[15px]"></i>
              </a>
              <a href="https://www.facebook.com/adnan.addu.37" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300" title="Facebook">
                <i className="fab fa-facebook-f text-[15px]"></i>
              </a>
              <a href="https://www.instagram.com/_scooby_dooby_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300" title="Instagram">
                <i className="fab fa-instagram text-[16px]"></i>
              </a>
              <a href="https://www.linkedin.com/in/adnan-ali-b4b766214" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300" title="LinkedIn">
                <i className="fab fa-linkedin-in text-[15px]"></i>
              </a>
              <a href="mailto:Sayedadnanali905@gmail.com" className="hover:text-white transition-all duration-300" title="Send Email">
                <i className="far fa-envelope text-[15px]"></i>
              </a>
              
              {/* Dropdown for Websites */}
              <div className="relative website-dropdown-container flex items-center">
                <button 
                  onClick={() => setWebsiteDropdownOpen(!websiteDropdownOpen)}
                  onMouseEnter={() => setWebsiteDropdownOpen(true)}
                  onMouseLeave={() => setWebsiteDropdownOpen(false)}
                  className="hover:text-white transition-all duration-300 flex items-center focus:outline-none cursor-pointer" 
                  title="Websites"
                >
                  <i className="fas fa-globe text-[15px]"></i>
                </button>
                
                <div 
                  onMouseEnter={() => setWebsiteDropdownOpen(true)}
                  onMouseLeave={() => setWebsiteDropdownOpen(false)}
                  className={`absolute right-0 top-full mt-2.5 w-56 rounded-2xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 origin-top-right ${
                    websiteDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
                  } p-2 z-50`}
                >
                  <a 
                    href="https://www.addyfitness.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs">
                      <i className="fas fa-dumbbell"></i>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white">Addy Fitness</span>
                      <span className="text-[9px] text-zinc-500 font-mono">addyfitness.com</span>
                    </div>
                  </a>
                  <a 
                    href="https://www.addymeals.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs">
                      <i className="fas fa-utensils"></i>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white">Addy Meals</span>
                      <span className="text-[9px] text-zinc-500 font-mono">addymeals.com</span>
                    </div>
                  </a>
                  <a 
                    href="https://www.pixelwebpages.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-white">Pixel Webpages</span>
                      <span className="text-[9px] text-zinc-500 font-mono">pixelwebpages.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button 
              id="mobileMenuBtn" 
              onClick={toggleMobileMenu}
              className="lg:hidden w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none transition-all duration-300" 
              aria-label="Toggle Navigation"
            >
              <i id="menuIcon" className={`${mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} text-xs`}></i>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu Dropdown */}
        <div id="mobileMenu" className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-3 mx-4 p-4 rounded-3xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col gap-2`}>
          <a href="/" className="px-4 py-3 rounded-xl flex items-center justify-between text-white bg-zinc-900/50">
            <span>Home</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
          <a href="/personal" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Personal</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
          <a href="/business" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Business</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
          <a href="/about" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>About Me</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
          <a href="/blogs" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Blogs</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
        </div>
      </header>

      {/* IMMERSIVE MAIN HERO SECTION (Heading on Left, Avatar Image on Right) */}
      <section id="home" className="min-h-screen w-full flex items-center justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Center-Aligned Grid Blueprint: Text Left, Character Right */}
        <div style={{ marginTop: "-25px" }} className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT CONTENT COLUMN (Heading & Details) */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center text-left z-10 space-y-6 sm:space-y-8 order-2 lg:order-1 animate-fade-in">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 rounded-full pl-3.5 pr-4 py-1.5 text-xs font-semibold tracking-wider text-rose-400 uppercase shadow-md select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              Founder <span className="text-zinc-650 px-1">•</span> Builder <span className="text-zinc-650 px-1">•</span> Entrepreneur
            </div>

            {/* Epic Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.05]">
                {currentHomeData.headingTitle} <br />
                {(() => {
                  const words = currentHomeData.animatedWords || [];
                  const w1 = words[0] || "live,";
                  const w2 = (words[1] || "eat").replace(/,$/, "");
                  const w3 = words[2] || "grow.";
                  return (
                    <>
                      <span className="animate-liquid-text italic font-serif">{w1}</span>{" "}
                      <span className="animate-liquid-text italic font-serif">{w2}</span>{" "}
                      <span className="text-white font-extrabold">&</span>{" "}
                      <span className="animate-liquid-text">{w3}</span>
                    </>
                  );
                })()}
              </h1>
            </div>

            {/* Descriptive Subtext */}
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-xl font-light leading-relaxed">
              I turn ideas into structured growth. I don't just build brands — I build the <span className="text-emerald-400 font-semibold border-b border-emerald-500/30 pb-0.5">systems</span> behind them.
            </p>

            {/* CTA Interaction triggers & Expand Drawer button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="/contact"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-sm tracking-wide hover:shadow-[0_8px_24px_rgba(244,63,94,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Let's Connect <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
              
              <button 
                onClick={() => setDrawerOpen(true)}
                className="relative flex items-center justify-center w-14 h-14 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_8px_24px_rgba(255,255,255,0.08)] cursor-pointer overflow-hidden liquid-glass-ball group shrink-0"
                aria-label="Open Hands on Stack"
                title="Click to view full stack"
              >
                <img 
                  key={activeCtaIndex}
                  src={allIcons[activeCtaIndex] ? allIcons[activeCtaIndex].url : "/globe.svg"} 
                  alt={allIcons[activeCtaIndex] ? allIcons[activeCtaIndex].name : "Globe"} 
                  className="w-8 h-8 object-contain animate-pop-in shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" 
                />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN (IMAGE): High Fidelity Avatar Showcase placed precisely on Right */}
          <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-2">
            
            {/* Back Light Glow (Slow Pulsing Glow directly behind character) */}
            <div 
              className="absolute w-[95%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/20 via-emerald-500/20 to-cyan-500/15 blur-[100px] pointer-events-none animate-pulse" 
              style={{ animationDuration: "7s" }}
            />

            {/* Avatar wrapper offset 60px right and 15px upwards */}
            <div style={{ transform: "translate(60px, -15px)" }} className="relative w-full flex justify-center">
              <div className="relative max-w-[320px] sm:max-w-[450px] lg:max-w-[550px] xl:max-w-[620px] w-full flex flex-col items-center">
                <img 
                  src={currentHomeData.heroImage || "/avatar.png"} 
                  alt="Adnan Ali Character Artwork" 
                  className="w-full h-auto object-contain select-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative z-10 animate-fade-in"
                />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* STICKY BOTTOM DRAWER HANDLE: Clickable tab floating at the viewport base */}
      <div className="fixed bottom-0 left-0 right-0 z-45 flex justify-center pointer-events-none">
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="pointer-events-auto flex items-center gap-2.5 px-7 py-2.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 border-b-0 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 text-[10px] sm:text-xs font-bold text-zinc-200 uppercase tracking-widest hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{drawerOpen ? "Close Hands on" : "Hands on"}</span>
          <i className={`fas ${drawerOpen ? "fa-chevron-down" : "fa-chevron-up"} text-[10px] animate-bounce`} style={{ animationDuration: '2.5s' }}></i>
        </button>
      </div>

      {/* EXPANDABLE LIQUID GLASS DRAWER: Bubbly Bento Grid in Water-Flowing Theme (Single-Screen Layout) */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed bottom-0 left-0 right-0 z-45 backdrop-blur-3xl bg-gradient-to-r from-zinc-950 via-cyan-955/40 to-zinc-950 border-t border-cyan-500/20 shadow-[0_-20px_50px_rgba(0,185,185,0.15)] transition-all duration-500 ease-out overflow-y-auto ${
          drawerOpen ? "max-h-[65vh] h-auto opacity-100 translate-y-0" : "max-h-0 h-0 opacity-0 translate-y-full"
        }`}
      >
        {/* Swipe Down / Drag Handle Button at top */}
        <div className="w-full flex justify-center pt-3 pb-1 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/20">
          <button
            onClick={() => setDrawerOpen(false)}
            className="group flex flex-col items-center gap-1.5 px-6 py-2 rounded-full hover:bg-white/5 transition-all duration-300 focus:outline-none pointer-events-auto cursor-pointer"
            aria-label="Close Hands on"
          >
            <span className="w-12 h-1 rounded-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors duration-300"></span>
            <span className="flex items-center gap-1 text-[9px] font-bold text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest transition-colors duration-300">
              Swipe Down <i className="fas fa-chevron-down text-[8px] animate-bounce" style={{ animationDuration: '2s' }}></i>
            </span>
          </button>
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-2 pb-16">
          
          {/* Main heading in drawer */}
          <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
            <span className="text-2xl animate-bounce" style={{ animationDuration: '3s' }}>🌊</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide uppercase">
                Hands on
              </h2>
              <p className="text-[10px] text-zinc-500">Explore tech stacks and tooling in a fluid layout</p>
            </div>
          </div>

          {/* BUBBLY BENTO GRID SYSTEM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* CARD 3: HANDS-ON TOOLSTACK DIRECTORY (Spans all 3 columns) */}
            <div className="md:col-span-3 p-6 rounded-[2rem] bg-gradient-to-b from-white/[0.01] to-transparent border border-white/5 shadow-xl space-y-6 overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3 px-2">
                <div>
                  <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest font-mono">Hands-on Stack</span>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mt-0.5">Technology & Tooling Portfolio</h3>
                </div>
                <span className="text-[9px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold self-start sm:self-center">
                  Active Stack
                </span>
              </div>

              {/* Scrolling marquees of large, beautiful badges */}
              <div className="space-y-6 pt-2 select-none relative">
                
                {/* Gradient Fades for the edges of the marquee container */}
                <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>

                {/* Line 1 (Scrolls Left) */}
                <div className="overflow-hidden relative w-full h-24 flex items-center">
                  <div className="flex gap-6 animate-marquee-left whitespace-nowrap absolute">
                    {stackRow1.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 w-24 shrink-0">
                        <div className="w-14 h-14 rounded-full liquid-glass-ball flex items-center justify-center shadow-lg mb-1.5 transition-transform duration-300 hover:scale-110">
                          <img 
                            src={item.url} 
                            alt={item.name} 
                            className="w-9 h-9 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" 
                          />
                        </div>
                        <span className="text-[9px] text-zinc-400 font-semibold truncate w-full text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                    {stackRow1.map((item, idx) => (
                      <div key={`dup-${idx}`} className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 w-24 shrink-0">
                        <div className="w-14 h-14 rounded-full liquid-glass-ball flex items-center justify-center shadow-lg mb-1.5 transition-transform duration-300 hover:scale-110">
                          <img 
                            src={item.url} 
                            alt={item.name} 
                            className="w-9 h-9 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" 
                          />
                        </div>
                        <span className="text-[9px] text-zinc-400 font-semibold truncate w-full text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line 2 (Scrolls Right) */}
                <div className="overflow-hidden relative w-full h-24 flex items-center">
                  <div className="flex gap-6 animate-marquee-right whitespace-nowrap absolute">
                    {stackRow2.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 w-24 shrink-0">
                        <div className="w-14 h-14 rounded-full liquid-glass-ball flex items-center justify-center shadow-lg mb-1.5 transition-transform duration-300 hover:scale-110">
                          <img 
                            src={item.url} 
                            alt={item.name} 
                            className="w-9 h-9 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" 
                          />
                        </div>
                        <span className="text-[9px] text-zinc-400 font-semibold truncate w-full text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                    {stackRow2.map((item, idx) => (
                      <div key={`dup-${idx}`} className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 w-24 shrink-0">
                        <div className="w-14 h-14 rounded-full liquid-glass-ball flex items-center justify-center shadow-lg mb-1.5 transition-transform duration-300 hover:scale-110">
                          <img 
                            src={item.url} 
                            alt={item.name} 
                            className="w-9 h-9 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" 
                          />
                        </div>
                        <span className="text-[9px] text-zinc-400 font-semibold truncate w-full text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Slim Drawer Footer Banner (Integrated below Bento Grid for vertical space savings) */}
          <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Let's build together</h4>
              <p className="text-[10px] text-zinc-400 font-light mt-0.5">
                Have a project or brand that needs scaling? • <a href="/admin" className="text-zinc-650 hover:text-rose-400 font-mono tracking-widest text-[9px] uppercase transition-colors">Admin</a>
              </p>
            </div>
            <a 
              href="/contact" 
              onClick={() => setDrawerOpen(false)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-[10px] uppercase tracking-wider hover:shadow-[0_4px_12px_rgba(244,63,94,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </div>

      {/* FLOATING INTERACTIVE TOAST SYSTEM */}
      <div 
        id="toast" 
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-out pointer-events-none ${
          toastVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <div className="bg-zinc-900 border border-zinc-800/90 rounded-2xl px-5 py-4 flex items-center gap-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <i className="fas fa-terminal text-sm"></i>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold">System Protocol</div>
            <div id="toastMessage" className="text-xs text-zinc-200 font-mono font-medium">{toastMessage}</div>
          </div>
        </div>
      </div>
    </>
  );
}
