"use client";

import React, { useState, useEffect } from "react";
import { getBusinessData } from "../utils/db";

export default function BusinessPage() {
  const [businessConfig, setBusinessConfig] = useState(null);

  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  useEffect(() => {
    setBusinessConfig(getBusinessData());
    fetch("/api/db?type=business")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setBusinessConfig(data);
          localStorage.setItem("addy_business", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Error fetching business data from Neon:", err));
  }, []);

  const data = businessConfig && businessConfig.ventures ? businessConfig.ventures : [];

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
      {/* Background lights to complement layout */}
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

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
              className="px-3.5 py-2 rounded-full border border-white/10 bg-white/10 transition-all duration-300 text-white"
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
          <a href="/business" className="px-4 py-3 rounded-xl flex items-center justify-between text-white bg-zinc-900/50">
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

      {/* CONTENT CONTAINER */}
      <div className="w-full max-w-6xl mx-auto py-12 space-y-16 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-6 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 tracking-widest uppercase font-mono">
            My Ecosystem
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
            Business
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed font-light">
            Building scalable, consumer-centric businesses that combine wellness, technology, and accessibility for the modern Indian market.
          </p>
        </div>

        {/* VENTURES CARDS */}
        <div className="space-y-12">
          {data.map((venture, idx) => {
            const themes = {
              green: {
                border: "hover:border-emerald-500/30 hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:bg-emerald-950/[0.03]",
                badge: "text-emerald-400 bg-emerald-500/5",
                bullet: "bg-emerald-400",
                icon: "text-emerald-400/80",
                radial: "bg-emerald-500/5",
                tagColor: "text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30",
              },
              rose: {
                border: "hover:border-rose-500/30 hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)] hover:bg-rose-950/[0.03]",
                badge: "text-rose-400 bg-rose-500/5",
                bullet: "bg-rose-400",
                icon: "text-rose-400/80",
                radial: "bg-rose-500/5",
                tagColor: "text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30",
              },
              cyan: {
                border: "hover:border-cyan-500/30 hover:shadow-[0_30px_60px_rgba(6,182,212,0.12)] hover:bg-cyan-950/[0.03]",
                badge: "text-cyan-400 bg-cyan-500/5",
                bullet: "bg-cyan-400",
                icon: "text-cyan-400/80",
                radial: "bg-cyan-500/5",
                tagColor: "text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/30",
              }
            };

            const colors = ["green", "rose", "cyan"];
            const selectedTheme = themes[venture.color] || themes[colors[idx % colors.length]];

            return (
              <div 
                key={idx}
                className={`p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 ${selectedTheme.border} hover:-translate-y-2 duration-500 ease-out transition-all relative overflow-hidden group`}
              >
                <div className={`absolute top-0 right-0 w-80 h-80 ${selectedTheme.radial} rounded-full blur-[100px] pointer-events-none`}></div>
                
                {/* Card Title & Desc */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5 text-left">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-mono">
                      {venture.role}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                      {venture.title}
                    </h2>
                  </div>
                  {venture.url && (
                    <a 
                      href={venture.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:border-white/30 border border-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95 shrink-0"
                    >
                      Visit Website <i className="fas fa-external-link-alt ml-1 text-[9px]"></i>
                    </a>
                  )}
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light mt-4 text-left">
                  {venture.description}
                </p>

                {/* Sub Columns Grid */}
                {venture.columns && venture.columns.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                    {venture.columns.map((col, colIdx) => (
                      <div 
                        key={colIdx}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 hover:scale-[1.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 shadow-md text-left"
                      >
                        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedTheme.bullet}`}></span>
                          {col.title}
                        </h3>

                        {col.list && col.list.length > 0 && (
                          <ul className="space-y-3 text-[11px] sm:text-xs text-zinc-400 font-light">
                            {col.list.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2.5 hover:text-white transition-colors duration-200">
                                <i className={`fas fa-check ${selectedTheme.icon} text-[10px] mt-0.5`}></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {col.tags && col.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {col.tags.map((tag, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className={`px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[9px] sm:text-[10px] font-medium text-zinc-300 hover:scale-105 transition-all duration-200 cursor-default ${selectedTheme.tagColor}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ECOSYSTEM INTEGRATION SECTION */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-transparent border border-white/10 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono">Connecting Health, Wellness, & Tech</span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">Entrepreneurial Ecosystem Built by Me</h2>
          </div>
          <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
            Through Addy Fitness, Addy Meals, and Pixel Webpages, I am building a connected ecosystem. My entrepreneurial journey reflects a combination of Brand building, Product innovation, Sales growth, Technology integration, Consumer psychology, Operational execution, Startup scalability, and Market expansion.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {[
              "Health-tech",
              "Nutrition",
              "FMCG innovation",
              "Wellness",
              "Technology solutions",
              "Digital infrastructure",
              "Consumer engagement",
              "Functional product development"
            ].map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-semibold text-white/90 hover:border-cyan-400/30 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
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
