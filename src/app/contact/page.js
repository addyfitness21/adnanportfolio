"use client";

import React, { useState, useEffect } from "react";

export default function ContactPage() {
  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast System State
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

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

  const showSectionToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-zinc-950 text-zinc-100 pt-28 pb-0 px-4 sm:px-8 selection:bg-rose-500 selection:text-white">
      {/* Background lights to complement layout */}
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
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

          {/* CENTER: Signature logo */}
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
              <a href="/contact" className="px-3.5 py-2 rounded-full border border-white/10 bg-white/10 transition-all duration-300 text-white" title="Contact">
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

        {/* Mobile Dropdown */}
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
      <div className="w-full max-w-4xl mx-auto py-12 relative z-10">
        
        {/* Main heading in contact page */}
        <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/10 max-w-xl mx-auto pt-6 animate-fade-in">
          <span className="text-2xl animate-bounce" style={{ animationDuration: '3s' }}>📨</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
              Secure Connection Portal
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Initiate B2B connection, scaling advice, or brand consultation request</p>
          </div>
        </div>

        {/* Grid Layout for Form + Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Left Col: Compact Glass Contact Form */}
          <div className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 shadow-2xl space-y-6 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5">Your Name</label>
                <input type="text" placeholder="e.g. Adnan Ali" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-rose-500/50 transition-colors" />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5">Email Address</label>
                <input type="email" placeholder="name@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-rose-500/50 transition-colors" />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5">Message or Proposition</label>
                <textarea rows="5" placeholder="Describe the scaling plan or business venture..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-rose-500/50 transition-colors resize-none"></textarea>
              </div>
            </div>
            
            <button 
              onClick={() => { showSectionToast('Connection Request Dispatched'); }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-[10px] uppercase tracking-widest hover:shadow-[0_8px_24px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Send Secure Message <i className="fas fa-paper-plane ml-2"></i>
            </button>
          </div>

          {/* Right Col: Details Card & QR Code */}
          <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-md group hover:border-rose-500/20 hover:shadow-[0_20px_40px_rgba(244,63,94,0.08)] transition-all duration-500">
            
            {/* Card Header */}
            <div className="space-y-1">
              <span className="text-[9px] text-rose-400 font-bold uppercase tracking-widest font-mono block">Direct Communication</span>
              <h3 className="text-base font-black text-white uppercase tracking-wider">Contact Credentials</h3>
            </div>

            {/* Direct Details */}
            <div className="space-y-4">
              
              {/* Phone */}
              <a 
                href="tel:+919778803677" 
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 hover:scale-[1.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <i className="fas fa-phone-alt text-xs"></i>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest font-mono block">Phone Number</span>
                  <span className="text-xs font-mono text-white font-semibold tracking-wider hover:text-rose-400 transition-colors">+91 97788 03677</span>
                </div>
              </a>

              {/* Emails */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <i className="fas fa-envelope text-xs"></i>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest font-mono block">Official Email</span>
                    <a href="mailto:adnan@addyfitness.com" className="text-xs font-mono text-white font-semibold tracking-wide hover:text-rose-400 transition-colors block">adnan@addyfitness.com</a>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-2 flex items-center gap-4 pl-14">
                  <div>
                    <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest font-mono block">Secondary Email</span>
                    <a href="mailto:Sayedadnanali905@gmail.com" className="text-xs font-mono text-zinc-300 font-semibold tracking-wide hover:text-rose-400 transition-colors block">Sayedadnanali905@gmail.com</a>
                  </div>
                </div>
              </div>

            </div>

            {/* QR Code Section */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 hover:scale-[1.01] transition-all duration-300 shadow-sm">
              
              {/* QR Image */}
              <div className="relative w-20 h-20 bg-white p-1.5 rounded-xl shadow-lg shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    "BEGIN:VCARD\nVERSION:3.0\nFN:Sayed Adnan Ali\nTEL;TYPE=CELL:+919778803677\nEMAIL;TYPE=PREF,INTERNET:adnan@addyfitness.com\nEMAIL;TYPE=INTERNET:Sayedadnanali905@gmail.com\nEND:VCARD"
                  )}&color=18181b`}
                  alt="Contact QR Code" 
                  className="w-full h-full select-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  Scan V-Card QR
                </span>
                <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                  Scan with phone camera to instantly save contact details.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TOAST SYSTEM POPUP */}
      {toastVisible && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <i className="fas fa-check-circle"></i>
          <span>{toastMessage}</span>
        </div>
      )}

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
