"use client";

import React, { useState, useEffect } from "react";
import { getBlogsData } from "../utils/db";

const blogPosts = [
  {
    id: 1,
    image: "/blog-backpain.png",
    overlayTitle: "Healing Chronic Back Pain with Ayurveda: A Holistic Approach to Wellness",
    tags: ["Condition & Symptoms", "Prevent"],
    title: "Chronic Back Pain in Ayurveda: Causes, Therapies & Remedies",
    excerpt: "Persistent back pain is one of the most common musculoskeletal complaints today. Ayurveda traces it to a Vata imbalance, and treats it through Gridhrasi and Kati Gata Vata...",
    date: "Mar 24, 2025",
    readTime: "5 min read",
    category: "Wellness",
    body: `
      Persistent back pain (known in Ayurveda as Kati Shoola or Kati Gata Vata) is one of the most common musculoskeletal complaints today. According to Ayurvedic principles, the spine and lower back are primary seats of Vata dosha, which governs movement, structure, and communication in the body. When Vata becomes aggravated due to poor posture, stress, cold weather, or improper nutrition, it leads to dryness, stiffness, and degeneration in the lumbar area.
      
      If left unmanaged, simple back pain can escalate into conditions like sciatica (Gridhrasi), where sharp pain radiates down the leg. Ayurveda focuses on identifying the root imbalance rather than merely suppressing the pain, utilizing a holistic combination of diet, lifestyle changes, and targeted herbal therapies.
    `,
    solution: `
      Ayurveda offers a multi-layered approach to restoring balance and alleviating spinal discomfort:
      
      1. Kati Basti (Local Oil Pool): This is the ultimate Ayurvedic therapy for back pain. A reservoir of warm, medicated herbal oil (such as Sahacharadi Taila or Mahanarayana Taila) is held over the lumbar area using a ring of black gram dough. It deeply nourishes the joints, reduces inflammation, and relieves muscle spasms.
      
      2. Abhyanga (Therapeutic Massage): Regular application of warm Ayurvedic oils to the entire body or localized back massage helps lubricate joints and pacify Vata.
      
      3. Dietary Modifications: Since Vata is dry and cold, you should favor warm, freshly cooked, and moist foods. Incorporate healthy fats like organic Ghee, and avoid dry, raw, and cold foods.
      
      4. Gentle Yoga & Pranayama: Poses like Bhujangasana (Cobra Pose) and Cat-Cow stretches, combined with Nadi Shodhana (Alternate Nostril Breathing), keep the spine flexible and reduce muscle tension.
    `
  },
  {
    id: 2,
    image: "/blog-fitness.png",
    overlayTitle: "Nutritional Protocols for Peak Physical and Mental Performance",
    tags: ["Nutrition", "Energy"],
    title: "The Clean Fuel System: Optimizing Food for High-Velocity Founders",
    excerpt: "As a builder or founder, your energy is your highest leverage asset. Discover how structuring your meals, micro-nutrients, and digestive fire can sustain peak energy...",
    date: "May 14, 2026",
    readTime: "4 min read",
    category: "Lifestyle",
    body: `
      To build brands and run systems at high velocities, your body needs clean, sustainable energy. Most founders suffer from mid-day energy crashes, brain fog, and chronic fatigue due to glucose spikes and nutrient-poor eating habits. By viewing food as a performance protocol rather than just a fuel source, you can unlock consistent cognitive clarity and physical stamina throughout the day.
      
      Ayurveda calls this maintaining the 'Agni' (digestive fire). When your Agni is strong, food is fully assimilated, preventing the accumulation of 'Ama' (toxins) which cause lethargy and brain fog.
    `,
    solution: `
      Implement these high-leverage nutritional protocols to sustain high performance:
      
      1. Smart Glucose Management: Start meals with green vegetables and healthy fats before proteins and complex carbs. This slows gastric emptying and flattens glucose spikes, preventing afternoon energy crashes.
      
      2. Power of Whole Foods: Center your diet around single-ingredient whole foods like avocados, leafy greens, sprouts, healthy nuts, and organic proteins.
      
      3. Hydration Cycles: Drink warm water or herbal teas between meals to support Agni. Avoid ice-cold drinks which quench your digestive fire.
      
      4. Mindful Eating Schedule: Have your largest meal at lunch when your metabolic capacity is at its peak, and keep dinner light and early (before 7 PM).
    `
  },
  {
    id: 3,
    image: "/blog-tech.png",
    overlayTitle: "Building Seamless Immersive Interfaces that Convert in 2026",
    tags: ["Web Architecture", "UI/UX"],
    title: "High-Fidelity Interfaces: The Mechanics of Modern Frontend Platforms",
    excerpt: "Design is not just what it looks like; it's how the system responds. Learn the principles of building light, responsive, glassmorphic interfaces with rapid page loads...",
    date: "April 20, 2026",
    readTime: "6 min read",
    category: "Tech",
    body: `
      In 2026, web design has evolved beyond basic static page flows. Users expect fast, immersive, and reactive digital spaces that feel alive. High-fidelity layouts like glassmorphic cards, smooth micro-animations, and container queries are essential tools in a modern frontend builder's stack. However, loading heavy animations and massive styling frameworks can slow down page loading times, severely hurting conversions.
      
      A premium web platform must balance aesthetic beauty with engineering speed—delivering rich interactive experiences while maintaining perfect Lighthouse performance scores.
    `,
    solution: `
      Follow these engineering guidelines to build premium, performant websites:
      
      1. Lightweight Glassmorphism: Use native CSS backdrop-filters (backdrop-blur-md) with semi-transparent borders (border-white/10) to create premium glass layering without using heavy background images.
      
      2. CSS-First Animations: Favor pure CSS keyframes (will-change: transform) instead of javascript-heavy animation frameworks to keep scroll and interactive motion running at a buttery-smooth 60fps.
      
      3. Image Optimization: Serve images in next-gen formats like WebP or AVIF, and use responsive size attributes to load the correct resolution dynamically.
      
      4. Font Subsetting: Load only necessary font weights and subsets to minimize initial render-blocking assets.
    `
  }
];

export default function BlogsPage() {
  const [blogsConfig, setBlogsConfig] = useState(null);

  // Mobile Navigation Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for website dropdown
  const [websiteDropdownOpen, setWebsiteDropdownOpen] = useState(false);

  // Selected Category filter
  const [activeCategory, setActiveCategory] = useState("All");

  // Selected Blog Post detail view state
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setBlogsConfig(getBlogsData());
    fetch("/api/db?type=blogs")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setBlogsConfig(data);
          localStorage.setItem("addy_blogs", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Error fetching blogs from Neon:", err));
  }, []);

  const data = blogsConfig || blogPosts;

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

  const filteredPosts = activeCategory === "All" 
    ? data 
    : data.filter(post => post.category === activeCategory);

  return (
    <div className="fixed inset-0 overflow-y-auto bg-zinc-950 text-zinc-100 pt-28 pb-0 px-4 sm:px-8 selection:bg-rose-500 selection:text-white">
      {/* Background lights to complement layout */}
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

      {/* MAIN NAV BAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
        <nav className="backdrop-blur-3xl bg-gradient-to-b from-white/[0.18] to-white/[0.08] border border-white/20 border-t-white/35 rounded-full px-6 py-1.5 sm:py-2 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_40px_rgba(0,0,0,0.75)]">
          
          {/* LEFT: Menu Links (Home, Personal, Business, About Me, Blogs) */}
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
              className="px-3.5 py-2 rounded-full border border-white/10 bg-white/10 transition-all duration-300 text-white"
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

        {/* Mobile Dropdown */}
        <div className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden mt-3 mx-4 p-4 rounded-3xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col gap-2`}>
          <a href="/" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Home</span>
            <i className="fas fa-chevron-right text-xs text-zinc-550"></i>
          </a>
          <a href="/personal" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Personal</span>
            <i className="fas fa-chevron-right text-xs text-zinc-550"></i>
          </a>
          <a href="/business" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>Business</span>
            <i className="fas fa-chevron-right text-xs text-zinc-550"></i>
          </a>
          <a href="/about" className="px-4 py-3 rounded-xl flex items-center justify-between text-zinc-400">
            <span>About Me</span>
            <i className="fas fa-chevron-right text-xs text-zinc-550"></i>
          </a>
          <a href="/blogs" className="px-4 py-3 rounded-xl flex items-center justify-between text-white bg-zinc-900/50">
            <span>Blogs</span>
            <i className="fas fa-chevron-right text-xs text-zinc-550"></i>
          </a>
        </div>
      </header>

      {/* CONTENT CONTAINER */}
      <div className="w-full max-w-5xl mx-auto py-12 relative z-10">
        
        {selectedPost ? (
          /* BLOG ARTICLE DETAIL VIEW */
          <div className="max-w-3xl mx-auto animate-fade-in pt-6">
            {/* Back Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-8 cursor-pointer group"
            >
              <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i> Back to Blogs
            </button>

            {/* Big Hero Image Container */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-8">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 bg-[#d2a379] text-zinc-950 font-bold px-5 py-3 rounded-br-2xl text-[10px] sm:text-xs leading-tight uppercase font-mono max-w-[85%] text-left shadow-lg">
                {selectedPost.overlayTitle}
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 text-left">
              {selectedPost.title}
            </h1>

            {/* Article Meta Info */}
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-8 border-b border-white/5 pb-4">
              <span className="bg-white/5 border border-white/10 text-zinc-300 px-3.5 py-1 rounded-full text-[9px] uppercase font-mono font-bold">
                {selectedPost.category}
              </span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            {/* Body Section */}
            <div className="space-y-6 text-zinc-350 text-sm sm:text-base leading-relaxed text-left font-light">
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider font-mono border-l-2 border-rose-500 pl-3.5">
                The Situation & Background
              </h2>
              {selectedPost.body.trim().split('\n\n').map((p, i) => (
                <p key={i}>{p.trim()}</p>
              ))}
            </div>

            {/* Solutions Section */}
            <div className="mt-12 p-6 sm:p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 shadow-xl space-y-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <i className="fas fa-check-circle text-base"></i>
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                    Holistic Action Plan & Solution
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-medium">Strategic guidance & remedies</p>
                </div>
              </div>

              <div className="space-y-5 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {selectedPost.solution.trim().split('\n\n').map((p, i) => {
                  const cleaned = p.trim();
                  if (cleaned.startsWith("1.") || cleaned.startsWith("2.") || cleaned.startsWith("3.") || cleaned.startsWith("4.")) {
                    const parts = cleaned.split(":");
                    return (
                      <div key={i} className="pl-4 border-l-2 border-emerald-500/35 py-0.5">
                        <strong className="text-white block mb-0.5 text-xs sm:text-sm font-semibold tracking-wide">
                          {parts[0]}
                        </strong>
                        <span className="text-zinc-350">{parts[1]}</span>
                      </div>
                    );
                  }
                  return <p key={i}>{cleaned}</p>;
                })}
              </div>
            </div>
            
            {/* CTA Back Button at bottom of post */}
            <div className="pt-10 flex justify-start">
              <button 
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all font-semibold text-xs cursor-pointer"
              >
                ← Back to Blogs List
              </button>
            </div>
          </div>
        ) : (
          /* BLOG LIST GRID VIEW */
          <div className="space-y-12">
            {/* Main Header title */}
            <div className="text-center space-y-4 max-w-3xl mx-auto pt-6 mb-10 animate-fade-in">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 tracking-widest uppercase font-mono animate-float-icon">
                Insights & Systems
              </span>
              <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
                Blogs
              </h1>
              <p className="text-zinc-400 text-xs sm:text-base leading-relaxed font-light">
                Thought leadership, scaling guides, and wellness optimization protocols
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center gap-2 mb-10 max-w-xl mx-auto">
              {["All", "Wellness", "Lifestyle", "Tech"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-white/10 border-white/20 text-white shadow-lg" 
                      : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)}
                  className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl shadow-xl space-y-4 text-white backdrop-blur-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-4">
                    {/* Rounded Image Container */}
                    <div className="relative overflow-hidden w-full aspect-[4/3] rounded-[1.5rem] bg-zinc-900/50 shadow-inner">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-0 left-0 bg-[#d2a379] text-zinc-950 font-bold px-4 py-2.5 rounded-br-2xl text-[9px] sm:text-[10px] leading-tight uppercase font-mono max-w-[85%] text-left">
                        {post.overlayTitle}
                      </div>
                    </div>

                    {/* Category tags pill buttons */}
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {post.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`px-3 py-1 rounded-full text-[9px] font-bold border leading-none ${
                            i === 0 
                              ? "bg-white/5 border-white/10 text-zinc-300" 
                              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Heading & description */}
                    <div className="space-y-2">
                      <h3 className="text-sm sm:text-base font-bold text-zinc-150 group-hover:text-white leading-snug tracking-tight text-left transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed text-left">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer (Date) */}
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>{post.date}</span>
                    <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:text-white transition-colors">
                      Read Post <i className="fas fa-chevron-right text-[8px] transition-transform group-hover:translate-x-0.5"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
