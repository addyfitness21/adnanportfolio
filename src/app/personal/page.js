"use client";

import React, { useState, useEffect, useRef } from "react";
import { getPersonalData } from "../utils/db";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import IntegrationInstructionsRoundedIcon from "@mui/icons-material/IntegrationInstructionsRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

export default function PersonalPage() {
  const [personalConfig, setPersonalConfig] = useState(null);

  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active skill highlighting
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Skill progress bars filling transition state
  const [skillsLoaded, setSkillsLoaded] = useState(false);

  // Ref for Core Competencies section
  const skillsRef = useRef(null);

  // Toast Notification System State
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  useEffect(() => {
    setPersonalConfig(getPersonalData());
    fetch("/api/db?type=personal")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setPersonalConfig(data);
          localStorage.setItem("addy_personal", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Error fetching personal data from Neon:", err));
  }, []);

  const data = personalConfig || {
    professionalProfile: [],
    careerJourney: [],
    coreCompetencies: [],
    education: []
  };

  const renderMuiProfileIcon = (card) => {
    const category = (card.category || "").toLowerCase();
    const title = (card.title || "").toLowerCase();

    if (category.includes("brand") || title.includes("brand") || title.includes("strategy")) {
      return <TrackChangesRoundedIcon className="text-pink-400 !text-xl" />;
    }
    if (category.includes("product") || title.includes("product") || title.includes("fmcg")) {
      return <RocketLaunchRoundedIcon className="text-amber-400 !text-xl" />;
    }
    if (category.includes("sales") || title.includes("sales") || title.includes("growth")) {
      return <TrendingUpRoundedIcon className="text-emerald-400 !text-xl" />;
    }
    if (category.includes("e-commerce") || title.includes("commerce") || title.includes("d2c") || title.includes("market")) {
      return <ShoppingBagRoundedIcon className="text-cyan-400 !text-xl" />;
    }
    if (category.includes("performance") || title.includes("performance") || title.includes("ads") || title.includes("ad")) {
      return <BoltRoundedIcon className="text-yellow-400 !text-xl" />;
    }
    if (category.includes("distribution") || category.includes("trade") || title.includes("trade") || title.includes("offline")) {
      return <HandshakeRoundedIcon className="text-blue-400 !text-xl" />;
    }
    if (category.includes("crm") || category.includes("erp") || title.includes("crm") || title.includes("erp")) {
      return <IntegrationInstructionsRoundedIcon className="text-purple-400 !text-xl" />;
    }
    if (category.includes("healthcare") || title.includes("health") || title.includes("doctor") || title.includes("medical")) {
      return <MedicalServicesRoundedIcon className="text-rose-400 !text-xl" />;
    }
    if (category.includes("team") || category.includes("leadership") || title.includes("leadership") || title.includes("team")) {
      return <GroupsRoundedIcon className="text-indigo-400 !text-xl" />;
    }
    if (category.includes("analytics") || title.includes("analytics")) {
      return <AssessmentRoundedIcon className="text-teal-400 !text-xl" />;
    }
    if (category.includes("psychology") || title.includes("psychology")) {
      return <PsychologyRoundedIcon className="text-pink-400 !text-xl" />;
    }
    
    return <AutoAwesomeRoundedIcon className="text-rose-400 !text-xl" />;
  };

  // Toast timer hook
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

  useEffect(() => {
    // Dynamic Fill Scroll Intersection Observer
    if (!skillsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsLoaded(true);
        } else {
          setSkillsLoaded(false);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const getHighlightClass = (categories = []) => {
    if (!selectedSkill) return "transition-all duration-300";
    const hasMatch = categories.some(cat => cat.toLowerCase() === selectedSkill.toLowerCase());
    return hasMatch 
      ? "ring-2 ring-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)] scale-[1.03] border-emerald-400 bg-emerald-950/20 z-10 transition-all duration-300"
      : "opacity-20 scale-[0.97] blur-[0.5px] transition-all duration-300 pointer-events-none";
  };

  const handleSkillToggle = (skillName) => {
    if (selectedSkill === skillName) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skillName);
      showSectionToast(`Highlighted career areas for: ${skillName}`);
    }
  };

  const showSectionToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black text-zinc-100 pt-28 pb-0 px-4 sm:px-8 selection:bg-rose-500 selection:text-white">
      {/* Background lights to complement white, red, and green highlights */}
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-accentTeal/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-accentRed/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

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
              className="px-3.5 py-2 rounded-full border border-white/10 bg-white/10 transition-all duration-300 text-white"
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

          {/* RIGHT: Social Media & Connection Icons (Desktop Only) */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-3.5">
            <div className="flex items-center space-x-[18px] sm:space-x-[22px] text-zinc-400">
              <a href="/contact" className="hover:text-white transition-all duration-300" title="Contact">
                <i className="fa-solid fa-address-card text-[15px]"></i>
              </a>
              <a href="https://www.facebook.com/adnan.addu.37" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all duration-300" title="Facebook">
                <i className="fa-brands fa-facebook-f text-[15px]"></i>
              </a>
              <a href="https://www.instagram.com/_scooby_dooby_/" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition-all duration-300" title="Instagram">
                <i className="fa-brands fa-instagram text-[16px]"></i>
              </a>
              <a href="https://www.linkedin.com/in/adnan-ali-b4b766214" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-all duration-300" title="LinkedIn">
                <i className="fa-brands fa-linkedin-in text-[15px]"></i>
              </a>
              <a href="mailto:Sayedadnanali905@gmail.com" className="hover:text-rose-400 transition-all duration-300" title="Send Email">
                <i className="fa-regular fa-envelope text-[15px]"></i>
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
                  <i className="fa-solid fa-globe text-[15px]"></i>
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
                      <i className="fa-solid fa-dumbbell"></i>
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
                      <i className="fa-solid fa-bowl-food"></i>
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
                      <i className="fa-solid fa-code"></i>
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
            className="lg:hidden w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none transition-all duration-300 cursor-pointer" 
            aria-label="Toggle Navigation"
          >
            <i className={`${mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} text-xs`}></i>
          </button>
        </nav>

        {/* Mobile Navigation Menu Dropdown */}
        <div className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-2 p-3 rounded-2xl bg-zinc-950/95 border border-white/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl flex-col gap-2`}>
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-white/[0.08]">
            <a href="/" className="px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] text-xs flex items-center justify-between">
              <span>Home</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-zinc-600"></i>
            </a>
            <a href="/personal" className="px-3 py-2 rounded-xl text-white bg-white/[0.12] font-semibold text-xs flex items-center justify-between">
              <span>Personal</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-white/50"></i>
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

      {/* CONTENT CONTAINER */}
      <div className="w-full max-w-6xl mx-auto py-12 space-y-20 relative z-10">
        
        {/* OVERVIEW HEADER */}
        <div className="text-center space-y-6 max-w-3xl mx-auto pt-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-xs uppercase tracking-widest text-zinc-400 font-bold select-none">
            <i className="fa-solid fa-bolt text-rose-400 text-xs"></i>
            5+ Years of Impact
          </span>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase">Personal</h1>
          <p className="text-xl sm:text-2xl font-bold text-zinc-150 leading-snug">
            Building Brands, Scaling Revenue, and Architecting Growth Ecosystems.
          </p>
        </div>

        {/* 3 HERO STATS/VISION CARDS (Interactive, Pink, Blue, Green card borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Strategic Vision (Pink) */}
          <div 
            onClick={() => handleSkillToggle('Brand Strategy')}
            className={`p-7 rounded-[2rem] bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border hover:border-pink-500/50 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-2 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_25px_60px_rgba(244,114,182,0.25)] ${
              selectedSkill === 'Brand Strategy'
                ? 'border-pink-500 ring-2 ring-pink-500/30 shadow-[0_30px_60px_rgba(244,114,182,0.35)] scale-[1.03]'
                : 'border-white/[0.12]'
            }`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.2)] group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300">
                <WorkspacePremiumRoundedIcon className="!text-2xl" />
              </div>
              <h3 className="text-base font-black text-white group-hover:text-pink-300 transition-colors">Strategic Vision</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Over 5 years of experience across FMCG, wellness, and cannabis healthcare, transforming concepts into market-leading consumer brands.
              </p>
            </div>
          </div>

          {/* Card 2: Revenue Architect (Blue) */}
          <div 
            onClick={() => handleSkillToggle('Sales Growth')}
            className={`p-7 rounded-[2rem] bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border hover:border-blue-500/50 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-2 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)] ${
              selectedSkill === 'Sales Growth'
                ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-[0_30px_60px_rgba(59,130,246,0.35)] scale-[1.03]'
                : 'border-white/[0.12]'
            }`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <TrendingUpRoundedIcon className="!text-2xl" />
              </div>
              <h3 className="text-base font-black text-white group-hover:text-blue-300 transition-colors">Revenue Architect</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Expertise in bridging offline distribution with modern D2C & e-commerce systems to build highly scalable, profitable growth engines.
              </p>
            </div>
          </div>

          {/* Card 3: Ecosystem Builder (Green) */}
          <div 
            onClick={() => handleSkillToggle('E-commerce')}
            className={`p-7 rounded-[2rem] bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border hover:border-emerald-500/50 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-2 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.25)] ${
              selectedSkill === 'E-commerce'
                ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-[0_30px_60px_rgba(16,185,129,0.35)] scale-[1.03]'
                : 'border-white/[0.12]'
            }`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                <HubRoundedIcon className="!text-2xl" />
              </div>
              <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">Ecosystem Builder</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Founder of Addy Fitness and Addy Meals, democratizing tech-enabled health and functional nutrition for the next generation.
              </p>
            </div>
          </div>

        </div>

        {/* SECTION: PROFESSIONAL PROFILE BENTO GRID */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">
            Professional Profile
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data.professionalProfile || []).map((card, idx) => {
              const borderColors = [
                "hover:border-pink-500/40 hover:shadow-[0_8px_30px_rgba(244,114,182,0.15)]",
                "hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
                "hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]",
                "hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]",
                "hover:border-purple-500/40 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]"
              ];
              const ringColors = [
                "border-pink-500 ring-pink-500/30",
                "border-blue-500 ring-blue-500/30",
                "border-emerald-500 ring-emerald-500/30",
                "border-amber-500 ring-amber-500/30",
                "border-purple-500 ring-purple-500/30"
              ];
              const borderClass = borderColors[idx % borderColors.length];
              const ringClass = ringColors[idx % ringColors.length];

              return (
                <div 
                  key={idx}
                  onClick={() => handleSkillToggle(card.category)}
                  className={`p-6 rounded-[1.75rem] bg-gradient-to-b from-white/[0.07] via-zinc-950/90 to-black border transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] ${borderClass} ${
                    selectedSkill === card.category
                      ? `${ringClass} ring-2 scale-[1.02]`
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.18] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_20px_rgba(0,0,0,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {renderMuiProfileIcon(card)}
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">{card.title}</h4>
                  </div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: CAREER TIMELINE TIMELINE (Custom Bento Layout) */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">
            Career Journey
          </h2>

          <div className="space-y-12">
            {(data.careerJourney || []).map((milestone, idx) => {
              const borders = {
                pink: "border-pink-500/15 hover:border-pink-500/30 hover:shadow-[0_30px_60px_rgba(244,114,182,0.12)] hover:bg-pink-950/[0.03]",
                blue: "border-blue-500/15 hover:border-blue-500/30 hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)] hover:bg-blue-950/[0.03]",
                emerald: "border-emerald-500/15 hover:border-emerald-500/30 hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:bg-emerald-950/[0.03]",
                purple: "border-purple-500/15 hover:border-purple-500/30 hover:shadow-[0_30px_60px_rgba(168,85,247,0.12)] hover:bg-purple-950/[0.03]"
              };
              const accentClass = borders[milestone.color] || borders.pink;

              return (
                <div 
                  key={milestone.id || idx}
                  className={`p-6 sm:p-8 rounded-[2rem] bg-white/[0.01] border ${accentClass} hover:-translate-y-2 transition-all duration-500 ease-out space-y-6 text-left`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-white">{milestone.title}</h3>
                      <p className="text-sm text-zinc-300 font-semibold mt-0.5">{milestone.company}</p>
                    </div>
                    <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-200 font-bold self-start sm:self-center">
                      {milestone.period}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
                    {milestone.description}
                  </p>

                  {milestone.boxes && milestone.boxes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {milestone.boxes.map((box, bIdx) => (
                        <div 
                          key={bIdx}
                          className={`p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 hover:bg-zinc-900/20 hover:-translate-y-1 hover:scale-[1.02] ${getHighlightClass(box.categories)}`}
                        >
                          <h4 className="text-[13.5px] font-black text-white mb-2">{box.title}</h4>
                          <ul className="list-disc pl-4 text-xs text-zinc-300 space-y-1.5">
                            {box.items && box.items.map((bullet, kIdx) => (
                              <li key={kIdx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {milestone.tags && milestone.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {milestone.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          onClick={() => handleSkillToggle(tag)}
                          className={`text-xs font-mono px-3 py-1 rounded-full cursor-pointer transition-colors ${
                            selectedSkill === tag
                              ? "bg-cyan-500 text-white border-cyan-400"
                              : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: SKILLS STATS & COMPETENCIES & EDUCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1 & 2: Skill progress bars */}
          <div ref={skillsRef} className="lg:col-span-2 p-6 sm:p-8 rounded-[2rem] bg-white/[0.01] border border-zinc-850 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.85)] space-y-6">
            <h2 className="text-lg font-black uppercase tracking-widest text-cyan-400 border-b border-white/5 pb-3">
              Core Competencies & Expertise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-5">
                {(data.coreCompetencies || []).slice(0, Math.ceil((data.coreCompetencies || []).length / 2)).map((skill, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSkillToggle(skill.category)}
                    className={`space-y-1.5 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer ${selectedSkill === skill.category ? 'ring-1 ring-cyan-400 bg-white/5' : ''}`}
                  >
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-zinc-200">{skill.name}</span>
                      <span className="text-cyan-400 font-mono">{skill.value}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-rose-400 rounded-full animate-wave-bar relative" 
                        style={{ 
                          width: skillsLoaded ? `${skill.value}%` : '0%', 
                          transition: 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)' 
                        }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#fff] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {(data.coreCompetencies || []).slice(Math.ceil((data.coreCompetencies || []).length / 2)).map((skill, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSkillToggle(skill.category)}
                    className={`space-y-1.5 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer ${selectedSkill === skill.category ? 'ring-1 ring-cyan-400 bg-white/5' : ''}`}
                  >
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-zinc-200">{skill.name}</span>
                      <span className="text-cyan-400 font-mono">{skill.value}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-rose-400 rounded-full animate-wave-bar relative" 
                        style={{ 
                          width: skillsLoaded ? `${skill.value}%` : '0%', 
                          transition: 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)' 
                        }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#fff] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="space-y-2.5 pt-3 border-t border-white/5">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono block">Specialized Skills</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { tag: "Brand Positioning", skill: "Brand Strategy" },
                  { tag: "Go-To-Market (GTM)", skill: "Brand Strategy" },
                  { tag: "Cannabis Wellness", skill: "Herbal Supplement" },
                  { tag: "Direct-to-Doctor (D2D)", skill: "Healthcare Marketing" },
                  { tag: "Offline Distribution", skill: "Offline Distribution" },
                  { tag: "Amazon Seller Central", skill: "E-commerce" },
                  { tag: "CRM Implementation", skill: "CRM & ERP" },
                  { tag: "FMCG Product Development", skill: "Product Development" },
                  { tag: "P&L Management", skill: "Finance & Operations" }
                ].map((item, idx) => (
                  <span 
                    key={idx} 
                    onClick={() => handleSkillToggle(item.skill)}
                    className={`text-xs font-mono px-3 py-1 rounded-full cursor-pointer transition-colors ${
                      selectedSkill === item.skill
                        ? "bg-cyan-500 text-white border-cyan-400"
                        : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Education */}
          <div className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.01] border border-zinc-805 shadow-xl space-y-6">
            <h2 className="text-lg font-extrabold uppercase tracking-widest text-rose-400 border-b border-white/5 pb-3">
              Educational Background
            </h2>
            
            <div className="space-y-6">
              {(data.education || []).map((edu, idx) => (
                <div key={idx} className="space-y-1 text-left">
                  <h4 className="text-sm font-extrabold text-white">{edu.degree}</h4>
                  <p className="text-xs text-zinc-400 leading-normal">{edu.school} | {edu.period}</p>
                  {edu.details && (
                    <p className="text-[10px] text-zinc-500 font-mono">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ACTIVE FILTER RESET BUBBLE */}
        {selectedSkill && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
            <span>Filtering by: {selectedSkill}</span>
            <button 
              onClick={() => setSelectedSkill(null)} 
              className="bg-black/20 hover:bg-black/40 rounded-full w-5 h-5 flex items-center justify-center text-[10px] transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* PROFESSIONAL VISION STATEMENT */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border border-white/10 shadow-xl text-center space-y-3">
          <span className="text-xs text-emerald-400 uppercase tracking-widest font-mono font-bold block">Professional Vision</span>
          <p className="text-zinc-200 text-xs sm:text-base font-light italic leading-relaxed max-w-4xl mx-auto">
            "My long-term vision is to build scalable health, wellness, and nutrition ecosystems that combine technology, affordable healthcare, functional nutrition, and consumer-centric innovation. I strongly believe that the future of FMCG and healthcare lies in preventive wellness, personalized nutrition, and digitally connected consumer experiences."
          </p>
        </div>

      </div>

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

          {/* Bottom Copyright & Admin - Snug and Clean */}
          <div className="flex justify-center pt-2 sm:pt-3">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono tracking-widest uppercase text-center">
              © 2026 SAYED ADNAN ALI. ALL RIGHTS RESERVED. • <a href="/admin" className="text-zinc-500 hover:text-rose-450 underline transition-colors">ADMIN</a>
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
