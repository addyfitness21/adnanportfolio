"use client";

import React, { useState, useEffect } from "react";
import { submitContactForm } from "../utils/db";

export default function ContactPage() {
  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast System State
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showSectionToast("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      showSectionToast("Connection Request Dispatched! Adnan will contact you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      showSectionToast("Connection Request Sent!");
    } finally {
      setIsSubmitting(false);
    }
  };


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
    <div className="fixed inset-0 overflow-y-auto bg-black text-zinc-100 pt-28 pb-0 px-4 sm:px-8 selection:bg-rose-500 selection:text-white">
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

          {/* RIGHT: Social Media & Connection Icons (Desktop Only) */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-3.5">
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
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none transition-all duration-300" 
            aria-label="Toggle Navigation"
          >
            <i className={`${mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} text-xs`}></i>
          </button>
        </nav>

        {/* Mobile Navigation Menu Dropdown */}
        <div className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-2 p-3 rounded-2xl bg-zinc-950/95 border border-white/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl flex-col gap-2`}>
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-white/[0.08]">
            <a href="/" className="px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs flex items-center justify-between">
              <span>Home</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-zinc-600"></i>
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
            <a href="/contact" className="px-3 py-2 rounded-xl text-white bg-white/[0.12] font-semibold text-xs flex items-center justify-between">
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
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/_scooby_dooby_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-rose-400 transition-all text-xs" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/adnan-ali-b4b766214" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-sky-400 transition-all text-xs" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:Sayedadnanali905@gmail.com" className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] flex items-center justify-center text-zinc-300 hover:text-rose-400 transition-all text-xs" title="Email">
              <i className="far fa-envelope"></i>
            </a>
          </div>
        </div>
      </header>

      {/* CONTENT CONTAINER */}
      <div className="w-full max-w-4xl mx-auto py-12 relative z-10">
        
        {/* Main heading in contact page */}
        <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/10 max-w-xl mx-auto pt-6 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-lg shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            <i className="fa-solid fa-paper-plane"></i>
          </div>
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
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-6 backdrop-blur-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-user text-[9px] text-rose-400"></i>
                  Your Name
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:bg-white/[0.08] transition-all" 
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5 flex items-center gap-1.5">
                  <i className="fa-regular fa-envelope text-[9px] text-rose-400"></i>
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:bg-white/[0.08] transition-all" 
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-phone text-[9px] text-rose-400"></i>
                  Phone Number (Optional)
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 ..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:bg-white/[0.08] transition-all" 
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono block mb-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-comment-dots text-[9px] text-rose-400"></i>
                  Message or Proposition
                </label>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your scaling plan, business venture, or collaboration..." 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/70 focus:bg-white/[0.08] transition-all resize-none"
                ></textarea>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs uppercase tracking-widest shadow-[0_8px_32px_rgba(244,63,94,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_42px_rgba(244,63,94,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{isSubmitting ? "Dispatching..." : "Send Secure Message"}</span>
              <i className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} text-xs group-hover:translate-x-1 transition-transform`}></i>
            </button>
          </form>

          {/* Right Col: Details Card & QR Code */}
          <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between space-y-6 backdrop-blur-2xl group hover:border-rose-500/30 hover:shadow-[0_25px_60px_rgba(244,63,94,0.12)] transition-all duration-500">
            
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
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <i className="fa-solid fa-phone text-xs"></i>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Phone Number</span>
                  <span className="text-xs font-mono text-white font-semibold tracking-wider hover:text-rose-400 transition-colors">+91 97788 03677</span>
                </div>
              </a>

              {/* Emails */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <i className="fa-regular fa-envelope text-xs"></i>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Official Email</span>
                    <a href="mailto:adnan@addyfitness.com" className="text-xs font-mono text-white font-semibold tracking-wide hover:text-rose-400 transition-colors block">adnan@addyfitness.com</a>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-2 flex items-center gap-4 pl-14">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Secondary Email</span>
                    <a href="mailto:Sayedadnanali905@gmail.com" className="text-xs font-mono text-zinc-300 font-semibold tracking-wide hover:text-rose-400 transition-colors block">Sayedadnanali905@gmail.com</a>
                  </div>
                </div>
              </div>

            </div>

            {/* QR Code Section */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4 hover:scale-[1.01] transition-all duration-300 shadow-sm">
              
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
          <i className="fa-solid fa-circle-check"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HIGH FIDELITY LIQUID GLASS FOOTER */}
      <footer className="w-full relative z-20 mt-12 overflow-hidden rounded-t-[2.75rem] sm:rounded-t-[3.75rem] backdrop-blur-3xl backdrop-saturate-200 bg-gradient-to-b from-white/[0.12] via-zinc-950/80 to-black/95 border-t border-white/[0.24] border-x border-white/[0.06] shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.35),0_-20px_60px_rgba(0,0,0,0.9)] pt-5 sm:pt-6 pb-5 sm:pb-6 px-6 sm:px-12 -mx-4 sm:-mx-8">
        
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
              { icon: "fa-brands fa-facebook-f", url: "https://www.facebook.com/adnan.addu.37" },
              { icon: "fa-brands fa-instagram", url: "https://www.instagram.com/_scooby_dooby_/" },
              { icon: "fa-regular fa-envelope", url: "mailto:Sayedadnanali905@gmail.com" },
              { icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com/in/adnan-ali-b4b766214" }
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
