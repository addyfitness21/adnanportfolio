"use client";

import React, { useState, useEffect } from "react";
import { getAboutData } from "../utils/db";

export default function AboutPage() {
  const [aboutConfig, setAboutConfig] = useState(null);

  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  useEffect(() => {
    setAboutConfig(getAboutData());
    fetch("/api/db?type=about")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setAboutConfig(data);
          localStorage.setItem("addy_about", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Error fetching about data from Neon:", err));
  }, []);

  const data = aboutConfig || [];

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
    <div className="fixed inset-0 overflow-y-auto bg-zinc-950 text-zinc-100 pt-28 pb-0 px-4 sm:px-8 selection:bg-rose-500 selection:text-white">
      {/* Background lights to complement the layout */}
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

      {/* MAIN NAV BAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
        <nav className="backdrop-blur-3xl bg-gradient-to-b from-white/[0.18] to-white/[0.08] border border-white/20 border-t-white/35 rounded-full px-6 py-1.5 sm:py-2 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_40px_rgba(0,0,0,0.75)]">
          
          {/* LEFT: Menu Links (Home, Personal, Business, About Me, Contact) */}
          <div className="hidden lg:flex items-center justify-start space-x-1.5 text-[13px] font-semibold tracking-wide text-zinc-400 flex-1">
            <a 
              href="/" 
              className="px-4 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5"
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
              className="px-3.5 py-2 rounded-full border border-white/10 bg-white/10 transition-all duration-300 text-white"
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
              onClick={toggleMobileMenu}
              className="lg:hidden w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none transition-all duration-300" 
              aria-label="Toggle Navigation"
            >
              <i className={`${mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} text-xs`}></i>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu Dropdown */}
        <div className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-3 mx-4 p-4 rounded-3xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col gap-2`}>
          <a href="/" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
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
          <a href="/about" className="px-4 py-3 rounded-xl flex items-center justify-between text-white bg-zinc-900/50">
            <span>About Me</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
          <a href="/blogs" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Blogs</span>
            <i className="fas fa-chevron-right text-xs text-zinc-500"></i>
          </a>
        </div>
      </header>

      {/* ABOUT ME CONTENT CONTAINER */}
      <div className="w-full max-w-6xl mx-auto py-12 space-y-20 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-6 max-w-3xl mx-auto pt-6">
          <span className="inline-flex bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-xs uppercase tracking-widest text-emerald-400 font-bold select-none">
            My Journey
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase">About Me</h1>
        </div>

        {/* SECTION: WHY I STARTED ADDY FITNESS */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">
            Why I Started Addy Fitness
          </h2>
          
          <div className="p-6 sm:p-10 rounded-[2rem] bg-white/[0.01] border border-emerald-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-emerald-500/30 hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:bg-emerald-950/[0.02] transition-all duration-500 ease-out space-y-10 relative overflow-hidden group">
            {/* Subtle background gradient ambient glow */}
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-700"></div>
            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative space-y-10">
              {(data.chapters || []).map((chapter, idx) => {
                const colorClass = chapter.color === "rose" ? "text-rose-400" : "text-emerald-400";
                return (
                  <React.Fragment key={chapter.id || idx}>
                    {idx > 0 && <div className="h-px bg-white/5"></div>}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start text-left">
                      <div className="lg:col-span-4">
                        <span className={`text-[10px] font-mono ${colorClass} uppercase tracking-widest font-bold block mb-1`}>
                          {chapter.chapterNumber || `Chapter 0${idx + 1}`}
                        </span>
                        <h3 className="text-xl font-black text-white uppercase tracking-wide">
                          {chapter.title}
                        </h3>
                      </div>
                      <div className="lg:col-span-8 space-y-4">
                        {chapter.paragraphs && chapter.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              <div className="h-px bg-white/10"></div>

              {/* Never Give Up Callout (Bold and Big Letter) */}
              <div className="pt-6 text-center">
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 tracking-wider uppercase drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] select-none">
                  Never give up
                </h2>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* HIGH FIDELITY FULL-WIDTH FOOTER */}
      <footer className="bg-[#1c1e22] border-t border-white/10 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] py-6 sm:py-7 px-6 sm:px-12 mt-12 -mx-4 sm:-mx-8 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          
          {/* Signature Image */}
          <div className="flex justify-center select-none pointer-events-none">
            <img 
              src="/signature-new.png" 
              alt="Sayed Adnan Ali Signature Logo" 
              className="h-auto max-w-[220px] sm:max-w-[260px] drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-zinc-400 text-xs sm:text-sm tracking-wider uppercase font-bold font-mono">
            Building the future
          </p>

          {/* Sector Identifiers */}
          <div className="text-zinc-500 text-[10px] sm:text-xs tracking-[0.2em] font-black uppercase flex items-center justify-center gap-2 sm:gap-4 flex-wrap pt-1">
            <span>FOOD & BEVERAGE</span>
            <span className="text-white/20">•</span>
            <span>TECHNOLOGY</span>
            <span className="text-white/20">•</span>
            <span>HEALTHCARE</span>
          </div>

          {/* Requested Cursive/Italic Quote */}
          <p className="text-zinc-300 text-xs sm:text-sm italic font-light max-w-xl mx-auto leading-relaxed pt-1 border-t border-white/5">
            "I may not have an MBA, but life gave me something far more valuable—the wisdom to lead, the courage to adapt, and the experience to overcome."
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-3.5 pt-2">
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
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/25 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95"
              >
                <i className={item.icon}></i>
              </a>
            ))}
          </div>

          {/* Bottom Copyright */}
          <div className="flex justify-center pt-4">
            <span className="text-[9px] sm:text-[10px] text-zinc-600 font-mono tracking-widest uppercase text-center">
              © 2026 Sayed Adnan Ali. All rights reserved. • <a href="/admin" className="text-zinc-600 hover:text-rose-450 underline transition-colors">Admin</a>
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
