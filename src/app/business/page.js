"use client";

import React, { useState } from "react";

export default function BusinessPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  const ventures = [
    {
      role: "Founder & Visionary",
      title: "Addy Fitness",
      url: "https://www.addyfitness.com",
      description:
        "I founded Addy Fitness with the vision of building a technology-enabled healthcare, fitness, and nutrition ecosystem where people can access fitness coaching, nutrition guidance, and healthcare consultation within a single platform. The brand was conceptualized to bridge the gap between affordable wellness solutions and modern digital accessibility for Gen Z and middle-class consumers in India.",
      color: "rose",
      icon: "fas fa-dumbbell",
      columns: [
        {
          title: "Integrated Wellness Platform",
          list: [
            "Fitness transformation programs & Nutrition planning",
            "Doctor consultations & Lifestyle management",
            "Digital wellness accessibility & Community-driven engagement",
          ],
        },
        {
          title: "My Responsibilities",
          list: [
            "Brand strategy and positioning",
            "Website planning and digital presence",
            "Product and service development",
            "Consumer research and validation",
            "Marketing campaigns & performance marketing initiatives",
            "Business operations, sales, and customer acquisition",
            "Vendor and partner coordination",
          ],
        },
        {
          title: "Focus Areas",
          tags: [
            "Health-tech ecosystem planning",
            "Fitness and nutrition branding",
            "Digital customer onboarding",
            "Wellness-based product development",
            "AI-enabled operational planning",
            "CRM and lead management systems",
            "Consumer engagement funnels",
            "Community-focused marketing",
          ],
        },
      ],
    },
    {
      role: "Founder & Product Innovator",
      title: "Addy Meals",
      url: "https://www.addymeals.com",
      description:
        "Addy Meals was created as a modern nutrition-focused food and FMCG brand aimed at delivering healthy, affordable, and functional nutrition products for Indian consumers. The objective is to make functional nutrition accessible for college students, working professionals, and Gen Z consumers.",
      color: "emerald",
      icon: "fas fa-utensils",
      columns: [
        {
          title: "Chia Jiya",
          subLabel: "Signature Product",
          list: [
            "Functional chia-based wellness beverage concept",
            "Focused on hydration and digestive wellness",
            "Youth-focused healthy beverage alternatives",
          ],
        },
        {
          title: "Basil Pops",
          subLabel: "Signature Product",
          list: [
            "Innovative basil-seed-based functional beverage",
            "Cooling and hydration support",
            "Low-calorie healthy refreshment for modern retail",
          ],
        },
        {
          title: "Additional Categories",
          list: [
            "Ready-to-eat healthy meals & Functional drinks",
            "RTD coffee concepts & Wellness shots",
            "Nutrition-based snacks & Protein-focused food",
            "Herbal and nutraceutical wellness products",
          ],
        },
      ],
      extraColumns: [
        {
          title: "My Responsibilities",
          list: [
            "Product ideation and formulation direction",
            "Brand positioning & Packaging concepts",
            "Consumer research & Marketing strategy",
            "Vendor sourcing & Production coordination",
            "Website, digital ecosystem planning & GTM strategy",
          ],
        },
        {
          title: "Strategic Focus",
          tags: [
            "Affordable nutrition",
            "Functional ingredients",
            "Convenience foods",
            "Modern branding",
            "Technology-enabled consumer engagement",
          ],
        },
      ],
    },
    {
      role: "Founder & Digital Business Strategist",
      title: "Pixel Webpages",
      url: "https://www.pixelwebpages.com",
      description:
        "Pixel Webpages is a digital solutions and business technology company focused on helping businesses build their online presence, digital operations, and growth infrastructure. The company provides services related to website development, CRM systems, branding, business automation, and digital growth solutions.",
      color: "cyan",
      icon: "fas fa-laptop-code",
      columns: [
        {
          title: "Areas of Work & Expertise",
          list: [
            "Website development coordination & UI/UX planning",
            "CRM implementation systems & Business automation",
            "Sales funnel creation & Digital branding strategy",
            "E-commerce support & Inventory integration",
            "Marketing automation workflows",
            "Custom operational dashboards",
          ],
        },
        {
          title: "My Role",
          list: [
            "Business development & Client strategy planning",
            "Brand positioning & Sales consultation",
            "System workflow planning",
            "Product, service, and digital ecosystem development",
          ],
        },
        {
          title: "Core Expertise",
          tags: [
            "SaaS-based business systems",
            "CRM workflows",
            "Digital transformation",
            "User journey optimization",
            "Customer acquisition funnels",
            "Startup ecosystem development",
            "Technology-driven business scaling",
          ],
        },
      ],
    },
  ];

  const themes = {
    rose: {
      border: "hover:border-rose-500/30 hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)] hover:bg-rose-950/[0.03]",
      badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      bullet: "bg-rose-400",
      icon: "text-rose-400/80",
      radial: "bg-rose-500/5",
      tagColor: "text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30",
      iconBg: "bg-rose-500/10 text-rose-400",
      glow: "from-rose-500/10",
      subBadge: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    },
    emerald: {
      border: "hover:border-emerald-500/30 hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:bg-emerald-950/[0.03]",
      badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      bullet: "bg-emerald-400",
      icon: "text-emerald-400/80",
      radial: "bg-emerald-500/5",
      tagColor: "text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      glow: "from-emerald-500/10",
      subBadge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    },
    cyan: {
      border: "hover:border-cyan-500/30 hover:shadow-[0_30px_60px_rgba(6,182,212,0.12)] hover:bg-cyan-950/[0.03]",
      badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      bullet: "bg-cyan-400",
      icon: "text-cyan-400/80",
      radial: "bg-cyan-500/5",
      tagColor: "text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/30",
      iconBg: "bg-cyan-500/10 text-cyan-400",
      glow: "from-cyan-500/10",
      subBadge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    },
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-zinc-950 text-zinc-100 pt-28 pb-0 px-4 sm:px-8 selection:bg-rose-500 selection:text-white">
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-rose-500/[0.08] rounded-full blur-[100px] pointer-events-none"></div>

      {/* NAV BAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
        <nav className="backdrop-blur-3xl bg-gradient-to-b from-white/[0.18] to-white/[0.08] border border-white/20 border-t-white/35 rounded-full px-6 py-1.5 sm:py-2 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_40px_rgba(0,0,0,0.75)]">
          <div className="hidden lg:flex items-center justify-start space-x-1.5 text-[13px] font-semibold tracking-wide text-zinc-400 flex-1">
            <a href="/" className="px-4 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5">Home</a>
            <a href="/personal" className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5">Personal</a>
            <a href="/business" className="px-3.5 py-2 rounded-full border border-white/10 bg-white/10 transition-all duration-300 text-white">Business</a>
            <a href="/about" className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5">About Me</a>
            <a href="/blogs" className="px-3.5 py-2 rounded-full border border-transparent transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5">Blogs</a>
          </div>

          <div className="flex-shrink-0 flex justify-center items-center">
            <a href="/" className="group flex items-center select-none">
              <img src="/logo-signature.png" alt="Adnan Ali Signature Logo" className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" style={{ mixBlendMode: "screen" }} />
            </a>
          </div>

          <div className="flex-1 flex items-center justify-end gap-3.5">
            <div className="flex items-center space-x-[18px] sm:space-x-[22px] text-zinc-400">
              <a href="/contact" className="hover:text-white transition-all duration-300" title="Contact"><i className="fas fa-id-card text-[15px]"></i></a>
              <a href="https://www.facebook.com/adnan.addu.37" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300" title="Facebook"><i className="fab fa-facebook-f text-[15px]"></i></a>
              <a href="https://www.instagram.com/_scooby_dooby_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300" title="Instagram"><i className="fab fa-instagram text-[16px]"></i></a>
              <a href="https://www.linkedin.com/in/adnan-ali-b4b766214" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300" title="LinkedIn"><i className="fab fa-linkedin-in text-[15px]"></i></a>
              <a href="mailto:Sayedadnanali905@gmail.com" className="hover:text-white transition-all duration-300" title="Send Email"><i className="far fa-envelope text-[15px]"></i></a>
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
                  className={`absolute right-0 top-full mt-2.5 w-56 rounded-2xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 origin-top-right ${websiteDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'} p-2 z-50`}
                >
                  <a href="https://www.addyfitness.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs"><i className="fas fa-dumbbell"></i></div>
                    <div className="flex flex-col text-left"><span className="text-xs font-semibold text-white">Addy Fitness</span><span className="text-[9px] text-zinc-500 font-mono">addyfitness.com</span></div>
                  </a>
                  <a href="https://www.addymeals.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs"><i className="fas fa-utensils"></i></div>
                    <div className="flex flex-col text-left"><span className="text-xs font-semibold text-white">Addy Meals</span><span className="text-[9px] text-zinc-500 font-mono">addymeals.com</span></div>
                  </a>
                  <a href="https://www.pixelwebpages.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs"><i className="fas fa-laptop-code"></i></div>
                    <div className="flex flex-col text-left"><span className="text-xs font-semibold text-white">Pixel Webpages</span><span className="text-[9px] text-zinc-500 font-mono">pixelwebpages.com</span></div>
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white focus:outline-none transition-all duration-300"
              aria-label="Toggle Navigation"
            >
              <i className={`${mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} text-xs`}></i>
            </button>
          </div>
        </nav>

        <div className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-3 mx-4 p-4 rounded-3xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col gap-2`}>
          <a href="/" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400"><span>Home</span><i className="fas fa-chevron-right text-xs text-zinc-500"></i></a>
          <a href="/personal" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400"><span>Personal</span><i className="fas fa-chevron-right text-xs text-zinc-500"></i></a>
          <a href="/business" className="px-4 py-3 rounded-xl flex items-center justify-between text-white bg-zinc-900/50"><span>Business</span><i className="fas fa-chevron-right text-xs text-zinc-500"></i></a>
          <a href="/about" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400"><span>About Me</span><i className="fas fa-chevron-right text-xs text-zinc-500"></i></a>
          <a href="/blogs" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400"><span>Blogs</span><i className="fas fa-chevron-right text-xs text-zinc-500"></i></a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-6xl mx-auto py-12 space-y-16 relative z-10">

        {/* HERO HEADER */}
        <div className="text-center space-y-5 max-w-3xl mx-auto pt-6 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 tracking-widest uppercase font-mono">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></span>
            My Ecosystem
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
            Founder &amp;<br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Brand Builder</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Building scalable, consumer-centric businesses that combine wellness, technology, and accessibility for the modern Indian market.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {[
              { label: "Addy Fitness", colorCls: "border-rose-500/20 bg-rose-500/5 text-rose-300", icon: "fas fa-dumbbell" },
              { label: "Addy Meals", colorCls: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300", icon: "fas fa-utensils" },
              { label: "Pixel Webpages", colorCls: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300", icon: "fas fa-laptop-code" },
            ].map((v, i) => (
              <span key={i} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-semibold tracking-wide ${v.colorCls}`}>
                <i className={`${v.icon} text-[10px]`}></i>
                {v.label}
              </span>
            ))}
          </div>
        </div>

        {/* VENTURE CARDS */}
        <div className="space-y-14">
          {ventures.map((venture, idx) => {
            const t = themes[venture.color];
            return (
              <div
                key={idx}
                className={`rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 ${t.border} hover:-translate-y-1 duration-500 ease-out transition-all relative overflow-hidden group`}
              >
                <div className={`absolute top-0 right-0 w-96 h-96 ${t.radial} rounded-full blur-[120px] pointer-events-none`}></div>
                <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br ${t.glow} to-transparent rounded-full blur-[80px] pointer-events-none`}></div>

                {/* Card Header */}
                <div className="p-8 sm:p-10 pb-6 border-b border-white/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${t.iconBg} flex items-center justify-center text-lg shrink-0 mt-0.5`}>
                        <i className={venture.icon}></i>
                      </div>
                      <div className="space-y-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest font-mono ${t.badge}`}>
                          {venture.role}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">
                          {venture.title}
                        </h2>
                      </div>
                    </div>
                    {venture.url && (
                      <a
                        href={venture.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                      >
                        Visit Website
                        <i className="fas fa-external-link-alt text-[9px]"></i>
                      </a>
                    )}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed font-light mt-5 max-w-4xl">
                    {venture.description}
                  </p>
                </div>

                {/* Columns */}
                <div className="p-8 sm:p-10 pt-7 space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {venture.columns.map((col, ci) => (
                      <div key={ci} className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] space-y-3.5 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${t.bullet} shrink-0`}></span>
                          <h3 className="text-[11px] font-black text-white uppercase tracking-wider">{col.title}</h3>
                        </div>
                        {col.subLabel && (
                          <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border font-mono ${t.subBadge}`}>
                            {col.subLabel}
                          </span>
                        )}
                        {col.list && col.list.length > 0 && (
                          <ul className="space-y-2.5 text-[11px] sm:text-xs text-zinc-400 font-light">
                            {col.list.map((item, ii) => (
                              <li key={ii} className="flex items-start gap-2.5 hover:text-zinc-200 transition-colors duration-200">
                                <i className={`fas fa-check ${t.icon} text-[9px] mt-0.5 shrink-0`}></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {col.tags && col.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {col.tags.map((tag, ti) => (
                              <span key={ti} className={`px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[9px] sm:text-[10px] font-medium cursor-default transition-all duration-200 ${t.tagColor}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {venture.extraColumns && venture.extraColumns.length > 0 && (
                    <div className={`grid gap-5 ${venture.extraColumns.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                      {venture.extraColumns.map((col, ci) => (
                        <div key={ci} className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] space-y-3.5 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${t.bullet} shrink-0`}></span>
                            <h3 className="text-[11px] font-black text-white uppercase tracking-wider">{col.title}</h3>
                          </div>
                          {col.list && col.list.length > 0 && (
                            <ul className="space-y-2.5 text-[11px] sm:text-xs text-zinc-400 font-light">
                              {col.list.map((item, ii) => (
                                <li key={ii} className="flex items-start gap-2.5 hover:text-zinc-200 transition-colors duration-200">
                                  <i className={`fas fa-check ${t.icon} text-[9px] mt-0.5 shrink-0`}></i>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {col.tags && col.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {col.tags.map((tag, ti) => (
                                <span key={ti} className={`px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[9px] sm:text-[10px] font-medium cursor-default transition-all duration-200 ${t.tagColor}`}>
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
              </div>
            );
          })}
        </div>

        {/* ECOSYSTEM SECTION */}
        <div className="relative p-8 sm:p-12 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-emerald-500/10 rounded-[2.5rem]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent rounded-[2.5rem]"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/[0.08] rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10 space-y-7">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-400 tracking-widest uppercase font-mono">
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></span>
                Connecting Health, Wellness &amp; Tech
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Entrepreneurial Ecosystem
                <span className="block text-xl sm:text-2xl font-semibold text-zinc-400 normal-case tracking-normal mt-1">Built by Me</span>
              </h2>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
              Through <span className="text-rose-300 font-semibold">Addy Fitness</span>, <span className="text-emerald-300 font-semibold">Addy Meals</span>, and <span className="text-cyan-300 font-semibold">Pixel Webpages</span>, I am building a connected ecosystem. My entrepreneurial journey reflects a combination of Brand building, Product innovation, Sales growth, Technology integration, Consumer psychology, Operational execution, Startup scalability, and Market expansion.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                { label: "Health-tech", colorCls: "border-rose-500/20 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10" },
                { label: "Nutrition", colorCls: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10" },
                { label: "FMCG innovation", colorCls: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10" },
                { label: "Wellness", colorCls: "border-rose-500/20 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10" },
                { label: "Technology solutions", colorCls: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10" },
                { label: "Digital infrastructure", colorCls: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10" },
                { label: "Consumer engagement", colorCls: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10" },
                { label: "Functional product development", colorCls: "border-rose-500/20 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10" },
              ].map((tag, i) => (
                <span key={i} className={`px-4 py-1.5 rounded-full border text-[10px] sm:text-xs font-semibold transition-all duration-300 hover:scale-105 cursor-default ${tag.colorCls}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { icon: "fas fa-dumbbell", title: "Addy Fitness", sub: "Health & Wellness Tech", bgCls: "bg-rose-500/10 text-rose-400", borderCls: "hover:border-rose-500/20" },
                { icon: "fas fa-utensils", title: "Addy Meals", sub: "Functional Nutrition & FMCG", bgCls: "bg-emerald-500/10 text-emerald-400", borderCls: "hover:border-emerald-500/20" },
                { icon: "fas fa-laptop-code", title: "Pixel Webpages", sub: "Digital Business Solutions", bgCls: "bg-cyan-500/10 text-cyan-400", borderCls: "hover:border-cyan-500/20" },
              ].map((p, i) => (
                <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] transition-all duration-300 ${p.borderCls}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ${p.bgCls}`}>
                    <i className={p.icon}></i>
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-wide">{p.title}</p>
                    <p className="text-[10px] text-zinc-500 font-light">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#1c1e22] border-t border-white/10 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] py-6 sm:py-7 px-6 sm:px-12 mt-12 -mx-4 sm:-mx-8 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="flex justify-center select-none pointer-events-none">
            <img src="/signature-new.png" alt="Sayed Adnan Ali Signature Logo" className="h-auto max-w-[220px] sm:max-w-[260px] drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-300" />
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm tracking-wider uppercase font-bold font-mono">Building the future</p>
          <div className="text-zinc-500 text-[10px] sm:text-xs tracking-[0.2em] font-black uppercase flex items-center justify-center gap-2 sm:gap-4 flex-wrap pt-1">
            <span>FOOD &amp; BEVERAGE</span>
            <span className="text-white/20">•</span>
            <span>TECHNOLOGY</span>
            <span className="text-white/20">•</span>
            <span>HEALTHCARE</span>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm italic font-light max-w-xl mx-auto leading-relaxed pt-1 border-t border-white/5">
            "I may not have an MBA, but life gave me something far more valuable—the wisdom to lead, the courage to adapt, and the experience to overcome."
          </p>
          <div className="flex justify-center gap-3.5 pt-2">
            {[
              { icon: "fab fa-facebook-f", url: "https://www.facebook.com/adnan.addu.37" },
              { icon: "fab fa-instagram", url: "https://www.instagram.com/_scooby_dooby_/" },
              { icon: "fas fa-envelope", url: "mailto:Sayedadnanali905@gmail.com" },
              { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/adnan-ali-b4b766214" },
            ].map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/25 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 shadow-md hover:scale-110 active:scale-95">
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <span className="text-[9px] sm:text-[10px] text-zinc-600 font-mono tracking-widest uppercase text-center">
              © 2026 Sayed Adnan Ali. All rights reserved. • <a href="/admin" className="text-zinc-600 hover:text-rose-400 underline transition-colors">Admin</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
