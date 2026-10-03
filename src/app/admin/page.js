"use client";

import React, { useState, useEffect } from "react";
import { 
  getSettings, saveSettings, 
  getHomeData, saveHomeData, 
  getPersonalData, savePersonalData, 
  getBusinessData, saveBusinessData, 
  getAboutData, saveAboutData, 
  getBlogsData, saveBlogsData 
} from "../utils/db";

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login Form States
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState("Home");

  // Site Configuration States
  const [settings, setSettings] = useState({ email: "1", password: "1" });
  const [homeData, setHomeData] = useState({ heroImage: "", headingTitle: "", animatedWords: [], stackItems: [] });
  const [personalData, setPersonalData] = useState({ professionalProfile: [], careerJourney: [], coreCompetencies: [], education: [] });
  const [businessData, setBusinessData] = useState({ ventures: [] });
  const [aboutData, setAboutData] = useState({ chapters: [] });
  const [blogsData, setBlogsData] = useState([]);

  // Active items being edited (for modal or detail forms)
  const [editingIndex, setEditingIndex] = useState(null);
  const [editItemType, setEditItemType] = useState(""); // e.g. "tool", "skill", "career", "competency", "education", "venture", "chapter", "blog"

  // Temporary Form States for adding/editing items
  const [toolForm, setToolForm] = useState({ name: "", url: "" });
  const [skillForm, setSkillForm] = useState({ title: "", icon: "", description: "", category: "" });
  const [competencyForm, setCompetencyForm] = useState({ name: "", value: 50, category: "" });
  const [educationForm, setEducationForm] = useState({ degree: "", school: "", period: "", details: "" });
  const [ventureForm, setVentureForm] = useState({ name: "", tagline: "", role: "", description: "", pointsText: "", logoBg: "", logoIcon: "" });
  const [chapterForm, setChapterForm] = useState({ chapterNumber: "", title: "", paragraphsText: "" });
  const [blogForm, setBlogForm] = useState({ image: "", overlayTitle: "", tagsText: "", title: "", excerpt: "", readTime: "", date: "", body: "", solution: "" });

  // Career Form is special because of nested bento boxes
  const [careerForm, setCareerForm] = useState({
    title: "", company: "", period: "", description: "", color: "pink",
    boxesText: "", tagsText: "" // serialized for simple editing
  });

  // Settings Change States
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");

  useEffect(() => {
    setIsClient(true);
    // Initial fetch from localStorage
    const savedSettings = getSettings();
    setSettings(savedSettings);
    setHomeData(getHomeData());
    setPersonalData(getPersonalData());
    setBusinessData(getBusinessData());
    setAboutData(getAboutData());
    setBlogsData(getBlogsData());

    // Pull fresh data from Neon DB
    fetch("/api/db?type=settings")
      .then(res => res.json())
      .then(data => { if (data && !data.error) { setSettings(data); localStorage.setItem("addy_settings", JSON.stringify(data)); } });

    fetch("/api/db?type=home")
      .then(res => res.json())
      .then(data => { if (data && !data.error) { setHomeData(data); localStorage.setItem("addy_home", JSON.stringify(data)); } });

    fetch("/api/db?type=personal")
      .then(res => res.json())
      .then(data => { if (data && !data.error) { setPersonalData(data); localStorage.setItem("addy_personal", JSON.stringify(data)); } });

    fetch("/api/db?type=business")
      .then(res => res.json())
      .then(data => { if (data && !data.error) { setBusinessData(data); localStorage.setItem("addy_business", JSON.stringify(data)); } });

    fetch("/api/db?type=about")
      .then(res => res.json())
      .then(data => { if (data && !data.error) { setAboutData(data); localStorage.setItem("addy_about", JSON.stringify(data)); } });

    fetch("/api/db?type=blogs")
      .then(res => res.json())
      .then(data => { if (data && !data.error) { setBlogsData(data); localStorage.setItem("addy_blogs", JSON.stringify(data)); } });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const savedSettings = getSettings();
    if (emailInput === savedSettings.email && passwordInput === savedSettings.password) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ----------------------------------------------------
  // HOME ACTIONS
  // ----------------------------------------------------
  const handleSaveHomeMeta = () => {
    saveHomeData(homeData);
    alert("Home settings saved successfully!");
  };

  const handleAddTool = () => {
    if (!toolForm.name || !toolForm.url) return alert("Please fill name and image URL.");
    const updated = { ...homeData, stackItems: [...homeData.stackItems, toolForm] };
    setHomeData(updated);
    saveHomeData(updated);
    setToolForm({ name: "", url: "" });
  };

  const handleDeleteTool = (index) => {
    const updatedItems = homeData.stackItems.filter((_, idx) => idx !== index);
    const updated = { ...homeData, stackItems: updatedItems };
    setHomeData(updated);
    saveHomeData(updated);
  };

  // ----------------------------------------------------
  // PERSONAL ACTIONS (Professional Profile)
  // ----------------------------------------------------
  const handleAddSkill = () => {
    if (!skillForm.title || !skillForm.description) return alert("Title and Description are required.");
    const updatedProfile = [...personalData.professionalProfile, skillForm];
    const updated = { ...personalData, professionalProfile: updatedProfile };
    setPersonalData(updated);
    savePersonalData(updated);
    setSkillForm({ title: "", icon: "", description: "", category: "" });
  };

  const handleDeleteSkill = (index) => {
    const updatedProfile = personalData.professionalProfile.filter((_, idx) => idx !== index);
    const updated = { ...personalData, professionalProfile: updatedProfile };
    setPersonalData(updated);
    savePersonalData(updated);
  };

  // ----------------------------------------------------
  // PERSONAL ACTIONS (Career Journey)
  // ----------------------------------------------------
  // Quick format helper to serialize / deserialize nested structures into simple forms
  const handleOpenCareerEdit = (index) => {
    const item = personalData.careerJourney[index];
    setEditingIndex(index);
    setEditItemType("career");
    
    // Convert boxes array to standard JSON string for easier text-editing
    const boxesJson = JSON.stringify(item.boxes || [], null, 2);
    const tagsStr = (item.tags || []).join(", ");

    setCareerForm({
      title: item.title,
      company: item.company,
      period: item.period,
      description: item.description,
      color: item.color || "pink",
      boxesText: boxesJson,
      tagsText: tagsStr
    });
  };

  const handleSaveCareer = () => {
    try {
      const parsedBoxes = JSON.parse(careerForm.boxesText || "[]");
      const parsedTags = careerForm.tagsText 
        ? careerForm.tagsText.split(",").map(t => t.trim()).filter(Boolean) 
        : [];
      
      const newEntry = {
        id: editingIndex !== null ? personalData.careerJourney[editingIndex].id : Date.now(),
        title: careerForm.title,
        company: careerForm.company,
        period: careerForm.period,
        description: careerForm.description,
        color: careerForm.color,
        boxes: parsedBoxes,
        tags: parsedTags
      };

      let updatedJourney = [...personalData.careerJourney];
      if (editingIndex !== null) {
        updatedJourney[editingIndex] = newEntry;
      } else {
        updatedJourney.push(newEntry);
      }

      const updated = { ...personalData, careerJourney: updatedJourney };
      setPersonalData(updated);
      savePersonalData(updated);
      setEditingIndex(null);
      setEditItemType("");
      alert("Career entry saved successfully!");
    } catch (e) {
      alert("Error parsing Boxes JSON format. Please make sure it is valid JSON.");
    }
  };

  const handleDeleteCareer = (index) => {
    const updatedJourney = personalData.careerJourney.filter((_, idx) => idx !== index);
    const updated = { ...personalData, careerJourney: updatedJourney };
    setPersonalData(updated);
    savePersonalData(updated);
  };

  // ----------------------------------------------------
  // PERSONAL ACTIONS (Core Competencies & Skills with %)
  // ----------------------------------------------------
  const handleAddCompetency = () => {
    if (!competencyForm.name) return alert("Competency name is required.");
    const updatedList = [...personalData.coreCompetencies, { ...competencyForm, value: Number(competencyForm.value) }];
    const updated = { ...personalData, coreCompetencies: updatedList };
    setPersonalData(updated);
    savePersonalData(updated);
    setCompetencyForm({ name: "", value: 50, category: "" });
  };

  const handleDeleteCompetency = (index) => {
    const updatedList = personalData.coreCompetencies.filter((_, idx) => idx !== index);
    const updated = { ...personalData, coreCompetencies: updatedList };
    setPersonalData(updated);
    savePersonalData(updated);
  };

  // ----------------------------------------------------
  // PERSONAL ACTIONS (Education)
  // ----------------------------------------------------
  const handleAddEducation = () => {
    if (!educationForm.degree || !educationForm.school) return alert("Degree and School are required.");
    const updatedList = [...personalData.education, educationForm];
    const updated = { ...personalData, education: updatedList };
    setPersonalData(updated);
    savePersonalData(updated);
    setEducationForm({ degree: "", school: "", period: "", details: "" });
  };

  const handleDeleteEducation = (index) => {
    const updatedList = personalData.education.filter((_, idx) => idx !== index);
    const updated = { ...personalData, education: updatedList };
    setPersonalData(updated);
    savePersonalData(updated);
  };

  // ----------------------------------------------------
  // BUSINESS ACTIONS (Ventures)
  // ----------------------------------------------------
  const handleOpenVentureEdit = (index) => {
    const item = businessData.ventures[index];
    setEditingIndex(index);
    setEditItemType("venture");
    setVentureForm({
      name: item.name,
      tagline: item.tagline,
      role: item.role,
      description: item.description,
      pointsText: (item.points || []).join("\n"),
      logoBg: item.logoBg || "bg-rose-500/10 text-rose-400",
      logoIcon: item.logoIcon || "fas fa-dumbbell"
    });
  };

  const handleSaveVenture = () => {
    const pointsArr = ventureForm.pointsText.split("\n").map(p => p.trim()).filter(Boolean);
    const newEntry = {
      id: editingIndex !== null ? businessData.ventures[editingIndex].id : Date.now(),
      name: ventureForm.name,
      tagline: ventureForm.tagline,
      role: ventureForm.role,
      description: ventureForm.description,
      points: pointsArr,
      logoBg: ventureForm.logoBg,
      logoIcon: ventureForm.logoIcon
    };

    let updatedVentures = [...businessData.ventures];
    if (editingIndex !== null) {
      updatedVentures[editingIndex] = newEntry;
    } else {
      updatedVentures.push(newEntry);
    }

    const updated = { ventures: updatedVentures };
    setBusinessData(updated);
    saveBusinessData(updated);
    setEditingIndex(null);
    setEditItemType("");
    alert("Venture saved successfully!");
  };

  const handleDeleteVenture = (index) => {
    const updatedVentures = businessData.ventures.filter((_, idx) => idx !== index);
    const updated = { ventures: updatedVentures };
    setBusinessData(updated);
    saveBusinessData(updated);
  };

  // ----------------------------------------------------
  // ABOUT ME ACTIONS (Chapters)
  // ----------------------------------------------------
  const handleOpenChapterEdit = (index) => {
    const item = aboutData.chapters[index];
    setEditingIndex(index);
    setEditItemType("chapter");
    setChapterForm({
      chapterNumber: item.chapterNumber,
      title: item.title,
      paragraphsText: (item.paragraphs || []).join("\n\n")
    });
  };

  const handleSaveChapter = () => {
    const paragraphsArr = chapterForm.paragraphsText.split("\n\n").map(p => p.trim()).filter(Boolean);
    const newEntry = {
      chapterNumber: chapterForm.chapterNumber,
      title: chapterForm.title,
      paragraphs: paragraphsArr
    };

    let updatedChapters = [...aboutData.chapters];
    if (editingIndex !== null) {
      updatedChapters[editingIndex] = newEntry;
    } else {
      updatedChapters.push(newEntry);
    }

    const updated = { chapters: updatedChapters };
    setAboutData(updated);
    saveAboutData(updated);
    setEditingIndex(null);
    setEditItemType("");
    alert("Chapter saved successfully!");
  };

  const handleDeleteChapter = (index) => {
    const updatedChapters = aboutData.chapters.filter((_, idx) => idx !== index);
    const updated = { chapters: updatedChapters };
    setAboutData(updated);
    saveAboutData(updated);
  };

  // ----------------------------------------------------
  // BLOGS ACTIONS
  // ----------------------------------------------------
  const handleOpenBlogEdit = (index) => {
    const item = blogsData[index];
    setEditingIndex(index);
    setEditItemType("blog");
    setBlogForm({
      image: item.image,
      overlayTitle: item.overlayTitle,
      tagsText: (item.tags || []).join(", "),
      title: item.title,
      excerpt: item.excerpt,
      readTime: item.readTime,
      date: item.date,
      body: item.body,
      solution: item.solution
    });
  };

  const handleSaveBlog = () => {
    const tagsArr = blogForm.tagsText.split(",").map(t => t.trim()).filter(Boolean);
    const newEntry = {
      id: editingIndex !== null ? blogsData[editingIndex].id : Date.now(),
      image: blogForm.image,
      overlayTitle: blogForm.overlayTitle,
      tags: tagsArr,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      readTime: blogForm.readTime,
      date: blogForm.date,
      category: tagsArr[0] || "General",
      body: blogForm.body,
      solution: blogForm.solution
    };

    let updatedBlogs = [...blogsData];
    if (editingIndex !== null) {
      updatedBlogs[editingIndex] = newEntry;
    } else {
      updatedBlogs.push(newEntry);
    }

    setBlogsData(updatedBlogs);
    saveBlogsData(updatedBlogs);
    setEditingIndex(null);
    setEditItemType("");
    alert("Blog saved successfully!");
  };

  const handleDeleteBlog = (index) => {
    const updatedBlogs = blogsData.filter((_, idx) => idx !== index);
    setBlogsData(updatedBlogs);
    saveBlogsData(updatedBlogs);
  };

  // ----------------------------------------------------
  // SETTINGS ACTIONS
  // ----------------------------------------------------
  const handleUpdateSettings = (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword) {
      setSettingsMessage("Please fill both email and password.");
      return;
    }
    const updated = { email: newEmail, password: newPassword };
    setSettings(updated);
    saveSettings(updated);
    setNewEmail("");
    setNewPassword("");
    setSettingsMessage("Admin credentials updated successfully!");
  };

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black text-zinc-100 selection:bg-rose-500 selection:text-white pb-12 pt-20 px-4 sm:px-8">
      {/* Background ambient light */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* ADMIN HEADER */}
      <header className="max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚙️</span>
          <div>
            <h1 className="text-lg font-black uppercase tracking-wider text-white">Ecosystem Manager</h1>
            <p className="text-[10px] text-zinc-500 font-mono">Portfolio Control Panel</p>
          </div>
        </div>
        {isLoggedIn && (
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-rose-500/20 text-zinc-300 hover:text-rose-400 font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        )}
      </header>

      {!isLoggedIn ? (
        /* LOGIN PORTAL */
        <div className="max-w-md mx-auto my-24 animate-fade-in relative z-10">
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-3xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 mx-auto flex items-center justify-center text-rose-400 text-2xl animate-pulse">
              <i className="fas fa-lock"></i>
            </div>

            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">Admin Login</h2>
              <p className="text-xs text-zinc-500 mt-1">Authenticate to update portfolio sections</p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold leading-relaxed">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Email / Username</label>
                <input 
                  type="text" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full bg-white/5 border border-white/10 focus:border-rose-500/30 rounded-2xl px-4.5 py-3 text-sm text-white focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Password</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-rose-500/30 rounded-2xl px-4.5 py-3 text-sm text-white focus:outline-none transition-colors"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-2xl bg-white border border-transparent hover:bg-transparent hover:border-white hover:text-white text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <a href="/" className="inline-block text-[11px] font-semibold text-zinc-550 hover:text-zinc-350 transition-colors uppercase tracking-wider">
              ← Return to Site
            </a>

          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD */
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          
          {/* TAB SELECTOR LEFT BAR */}
          <div className="lg:col-span-1 space-y-2.5">
            {["Home", "Personal", "Business", "About Me", "Blogs", "Settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setEditingIndex(null);
                  setEditItemType("");
                }}
                className={`w-full text-left px-5 py-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  activeTab === tab 
                    ? "bg-white/10 border-white/20 text-white shadow-md" 
                    : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                <span>{tab}</span>
                <i className={`fas fa-chevron-right text-[9px] transition-transform ${activeTab === tab ? "translate-x-0.5" : "text-zinc-600"}`}></i>
              </button>
            ))}
            
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full text-center mt-6 py-3 rounded-2xl border border-dashed border-white/15 hover:border-white/30 text-zinc-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>View Site</span> <i className="fas fa-external-link-alt text-[9px]"></i>
            </a>
          </div>

          {/* MAIN EDITING FORM AREA */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/10 shadow-2xl backdrop-blur-2xl space-y-8">
            
            {/* TAB TITLE */}
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-white">{activeTab} Manager</h2>
              <p className="text-xs text-zinc-500 mt-1">Configure layout, content paragraphs, items and details</p>
            </div>

            {/* 1. HOME TAB */}
            {activeTab === "Home" && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Hero Settings */}
                <div className="space-y-5 border-b border-white/5 pb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-rose-400">Hero Section Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Hero Image */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Hero Avatar Image</label>
                      <div className="flex items-center gap-3">
                        <img 
                          src={homeData.heroImage || "/avatar.png"} 
                          alt="Preview" 
                          className="w-12 h-12 rounded-xl object-cover bg-zinc-900 border border-white/10" 
                        />
                        <div className="flex-1 space-y-1">
                          <input 
                            type="text" 
                            value={homeData.heroImage} 
                            onChange={(e) => setHomeData({ ...homeData, heroImage: e.target.value })}
                            placeholder="Image URL or Path" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-rose-500/30"
                          />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (dataUrl) => setHomeData({ ...homeData, heroImage: dataUrl }))}
                            className="block text-[10px] text-zinc-500 file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/15 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hero Heading Text */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Hero Headline Start Text</label>
                      <input 
                        type="text" 
                        value={homeData.headingTitle} 
                        onChange={(e) => setHomeData({ ...homeData, headingTitle: e.target.value })}
                        placeholder="e.g. Building brands that improve how" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>
                  </div>

                  {/* Animated Words */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Animated Words (Comma Separated)</label>
                    <input 
                      type="text" 
                      value={(homeData.animatedWords || []).join(", ")} 
                      onChange={(e) => setHomeData({ ...homeData, animatedWords: e.target.value.split(",").map(w => w.trim()).filter(Boolean) })}
                      placeholder="e.g. live, eat, grow." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                    />
                  </div>

                  <button 
                    onClick={handleSaveHomeMeta}
                    className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors hover:bg-white/90 cursor-pointer"
                  >
                    Save Hero Settings
                  </button>
                </div>

                {/* Hands-On Stack List */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400">Hands-On Tech Stack Icons</h3>
                    <span className="text-[10px] font-mono text-zinc-550">{(homeData.stackItems || []).length} items</span>
                  </div>

                  {/* Add New Tool Form */}
                  <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Tool Name</label>
                      <input 
                        type="text" 
                        value={toolForm.name} 
                        onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                        placeholder="e.g. React" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Icon Image Path / Upload</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={toolForm.url} 
                          onChange={(e) => setToolForm({ ...toolForm, url: e.target.value })}
                          placeholder="/processed-icons/react.png" 
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (dataUrl) => setToolForm({ ...toolForm, url: dataUrl }))}
                          className="w-16 text-[9px]"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleAddTool}
                      className="py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 hover:bg-cyan-500/20 text-cyan-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Add Tool
                    </button>
                  </div>

                  {/* List Current Tools */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {(homeData.stackItems || []).map((tool, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2">
                          <img 
                            src={tool.url} 
                            alt={tool.name} 
                            className="w-6 h-6 object-contain" 
                            onError={(e) => e.target.src = "/globe.svg"} 
                          />
                          <span className="text-xs font-semibold text-zinc-300">{tool.name}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteTool(idx)}
                          className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                          title="Delete Tool"
                        >
                          <i className="fas fa-trash text-[10px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* 2. PERSONAL TAB */}
            {activeTab === "Personal" && (
              <div className="space-y-10 animate-fade-in">
                
                {/* SUBSECTION: PROFESSIONAL PROFILE */}
                <div className="space-y-5 border-b border-white/5 pb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-pink-400">Professional Profile (Bento Grid Cards)</h3>
                  
                  {/* Add Profile Card Form */}
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Add New Profile Card</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Title</label>
                        <input 
                          type="text" 
                          value={skillForm.title} 
                          onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })}
                          placeholder="e.g. Sales Expansion" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Emoji Icon</label>
                        <input 
                          type="text" 
                          value={skillForm.icon} 
                          onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                          placeholder="e.g. 🎯" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Category Match ID</label>
                        <input 
                          type="text" 
                          value={skillForm.category} 
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                          placeholder="e.g. Brand Strategy" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Card Description</label>
                      <textarea 
                        value={skillForm.description} 
                        onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                        placeholder="Provide details about this competency..." 
                        rows="2"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>

                    <button 
                      onClick={handleAddSkill}
                      className="px-5 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/25 hover:bg-pink-500/20 text-pink-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Add Profile Card
                    </button>
                  </div>

                  {/* List current Profile Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(personalData.professionalProfile || []).map((card, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-4 group">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{card.icon}</span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{card.title}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{card.description}</p>
                          <span className="inline-block text-[9px] text-zinc-550 font-mono">Category: {card.category}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteSkill(idx)}
                          className="text-zinc-550 hover:text-rose-450 p-1.5 transition-colors cursor-pointer self-start"
                        >
                          <i className="fas fa-trash text-[10px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                </div>

                {/* SUBSECTION: CAREER JOURNEY */}
                <div className="space-y-5 border-b border-white/5 pb-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Career Journey Milestones</h3>
                    {editingIndex === null && editItemType !== "career" && (
                      <button 
                        onClick={() => {
                          setEditingIndex(null);
                          setEditItemType("career");
                          setCareerForm({ title: "", company: "", period: "", description: "", color: "pink", boxesText: "[]", tagsText: "" });
                        }}
                        className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-wider hover:bg-blue-500/20 transition-all cursor-pointer"
                      >
                        + Add Milestone
                      </button>
                    )}
                  </div>

                  {editItemType === "career" ? (
                    /* Detailed Add/Edit Career Form */
                    <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        {editingIndex !== null ? "Edit Career Milestone" : "Add Career Milestone"}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Role Title</label>
                          <input 
                            type="text" 
                            value={careerForm.title} 
                            onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                            placeholder="e.g. Senior Brand Specialist" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                          />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Company Name</label>
                          <input 
                            type="text" 
                            value={careerForm.company} 
                            onChange={(e) => setCareerForm({ ...careerForm, company: e.target.value })}
                            placeholder="e.g. Google India" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                          />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Period</label>
                          <input 
                            type="text" 
                            value={careerForm.period} 
                            onChange={(e) => setCareerForm({ ...careerForm, period: e.target.value })}
                            placeholder="e.g. June 2025 – Present" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Accent Border Color</label>
                          <select 
                            value={careerForm.color} 
                            onChange={(e) => setCareerForm({ ...careerForm, color: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-white"
                          >
                            <option value="pink">Pink</option>
                            <option value="blue">Blue</option>
                            <option value="emerald">Emerald / Green</option>
                            <option value="purple">Purple</option>
                          </select>
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Tags (Comma Separated)</label>
                          <input 
                            type="text" 
                            value={careerForm.tagsText} 
                            onChange={(e) => setCareerForm({ ...careerForm, tagsText: e.target.value })}
                            placeholder="e.g. Marketing, Team Management" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Milestone Summary Description</label>
                        <textarea 
                          value={careerForm.description} 
                          onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                          placeholder="Provide details about overall responsibilities..." 
                          rows="3"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono block">
                          Bento Boxes Details (JSON Format)
                        </label>
                        <span className="text-[9px] text-zinc-550 font-mono leading-tight block mb-1">
                          Example structure: [&#123; "title": "B2B Sales", "items": ["Task 1", "Task 2"], "categories": ["Sales Growth"] &#125;]
                        </span>
                        <textarea 
                          value={careerForm.boxesText} 
                          onChange={(e) => setCareerForm({ ...careerForm, boxesText: e.target.value })}
                          rows="6"
                          className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-rose-500/30 text-emerald-400"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button 
                          onClick={handleSaveCareer}
                          className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Save Milestone
                        </button>
                        <button 
                          onClick={() => {
                            setEditingIndex(null);
                            setEditItemType("");
                          }}
                          className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>
                  ) : (
                    /* Milestones Listing */
                    <div className="space-y-4">
                      {(personalData.careerJourney || []).map((milestone, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-6 hover:bg-white/[0.03] transition-colors group">
                          <div>
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="text-sm font-bold text-white uppercase">{milestone.title}</span>
                              <span className="text-xs text-zinc-400">@ {milestone.company}</span>
                              <span className="text-[9px] text-zinc-500 font-mono">({milestone.period})</span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed max-w-2xl">{milestone.description}</p>
                            
                            {/* Inner Bento boxes count */}
                            <div className="flex items-center gap-4 mt-3 text-[10px] text-zinc-500 font-mono uppercase font-semibold">
                              <span>Boxes: {(milestone.boxes || []).length}</span>
                              <span>Tags: {(milestone.tags || []).length}</span>
                              <span>Accent: {milestone.color}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleOpenCareerEdit(idx)}
                              className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer"
                              title="Edit Entry"
                            >
                              <i className="fas fa-edit text-[11px]"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteCareer(idx)}
                              className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                              title="Delete Entry"
                            >
                              <i className="fas fa-trash text-[11px]"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* SUBSECTION: CORE COMPETENCIES & EXPEPRTISE (WITH %) */}
                <div className="space-y-5 border-b border-white/5 pb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400">Core Competencies & Expertise (Add/Edit with %)</h3>

                  {/* Add Competency form */}
                  <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1.5 text-left sm:col-span-2">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Skill Name</label>
                      <input 
                        type="text" 
                        value={competencyForm.name} 
                        onChange={(e) => setCompetencyForm({ ...competencyForm, name: e.target.value })}
                        placeholder="e.g. Team Leadership & Strategy" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Progress Percentage: {competencyForm.value}%</label>
                      <input 
                        type="range" 
                        min="0"
                        max="100"
                        value={competencyForm.value} 
                        onChange={(e) => setCompetencyForm({ ...competencyForm, value: Number(e.target.value) })}
                        className="w-full h-2 rounded-lg bg-zinc-900 border border-white/10 focus:outline-none accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <button 
                      onClick={handleAddCompetency}
                      className="py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 hover:bg-cyan-500/20 text-cyan-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Add Competency
                    </button>
                  </div>

                  {/* List current Competencies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(personalData.coreCompetencies || []).map((skill, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 group">
                        <div className="flex-1 space-y-1.5 text-left">
                          <div className="flex justify-between text-xs font-bold text-white">
                            <span>{skill.name}</span>
                            <span className="text-cyan-450 font-mono">{skill.value}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-400 to-rose-450 rounded-full" style={{ width: `${skill.value}%` }}></div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteCompetency(idx)}
                          className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                          title="Delete Entry"
                        >
                          <i className="fas fa-trash text-[10px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                </div>

                {/* SUBSECTION: EDUCATIONAL BACKGROUND */}
                <div className="space-y-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-rose-400">Educational Background</h3>

                  {/* Add Education form */}
                  <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Degree Title</label>
                      <input 
                        type="text" 
                        value={educationForm.degree} 
                        onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                        placeholder="e.g. B.Tech in Biotechnology" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">School & Period</label>
                      <input 
                        type="text" 
                        value={educationForm.school} 
                        onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
                        placeholder="e.g. Odisha University | 2020–2023" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Key Details / CGPA</label>
                      <input 
                        type="text" 
                        value={educationForm.details} 
                        onChange={(e) => setEducationForm({ ...educationForm, details: e.target.value })}
                        placeholder="e.g. CGPA: 8.7 • Fermentation Lab" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>
                    <button 
                      onClick={handleAddEducation}
                      className="py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 hover:bg-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer col-span-3 sm:col-span-1"
                    >
                      Add Education
                    </button>
                  </div>

                  {/* List current Education items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(personalData.education || []).map((edu, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-4 group">
                        <div className="space-y-1.5 text-left">
                          <h4 className="text-xs font-bold text-white uppercase">{edu.degree}</h4>
                          <p className="text-[11px] text-zinc-300 leading-normal">{edu.school}</p>
                          <p className="text-[10px] text-zinc-500 font-mono leading-none">{edu.details}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteEducation(idx)}
                          className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                          title="Delete entry"
                        >
                          <i className="fas fa-trash text-[10px]"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* 3. BUSINESS TAB */}
            {activeTab === "Business" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400">My Business Ventures</h3>
                  {editingIndex === null && editItemType !== "venture" && (
                    <button 
                      onClick={() => {
                        setEditingIndex(null);
                        setEditItemType("venture");
                        setVentureForm({ name: "", tagline: "", role: "", description: "", pointsText: "", logoBg: "bg-rose-500/10 text-rose-400", logoIcon: "fas fa-dumbbell" });
                      }}
                      className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-500/20 transition-all cursor-pointer"
                    >
                      + Add Venture
                    </button>
                  )}
                </div>

                {editItemType === "venture" ? (
                  /* Venture Form */
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {editingIndex !== null ? "Edit Venture Details" : "Add Business Venture"}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Venture Name</label>
                        <input 
                          type="text" 
                          value={ventureForm.name} 
                          onChange={(e) => setVentureForm({ ...ventureForm, name: e.target.value })}
                          placeholder="e.g. Addy Fitness" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Tagline / Date</label>
                        <input 
                          type="text" 
                          value={ventureForm.tagline} 
                          onChange={(e) => setVentureForm({ ...ventureForm, tagline: e.target.value })}
                          placeholder="e.g. Founder & Visionary" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Role</label>
                        <input 
                          type="text" 
                          value={ventureForm.role} 
                          onChange={(e) => setVentureForm({ ...ventureForm, role: e.target.value })}
                          placeholder="e.g. Ecosystem Builder" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Logo Background CSS</label>
                        <input 
                          type="text" 
                          value={ventureForm.logoBg} 
                          onChange={(e) => setVentureForm({ ...ventureForm, logoBg: e.target.value })}
                          placeholder="e.g. bg-rose-500/10 text-rose-400" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">FontAwesome Icon Class</label>
                        <input 
                          type="text" 
                          value={ventureForm.logoIcon} 
                          onChange={(e) => setVentureForm({ ...ventureForm, logoIcon: e.target.value })}
                          placeholder="e.g. fas fa-dumbbell" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Venture Description</label>
                      <textarea 
                        value={ventureForm.description} 
                        onChange={(e) => setVentureForm({ ...ventureForm, description: e.target.value })}
                        placeholder="Venture overall summary and goals..." 
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Venture Highlights (One Point per Line)</label>
                      <textarea 
                        value={ventureForm.pointsText} 
                        onChange={(e) => setVentureForm({ ...ventureForm, pointsText: e.target.value })}
                        placeholder="Bullet point 1&#10;Bullet point 2&#10;Bullet point 3" 
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={handleSaveVenture}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Save Venture
                      </button>
                      <button 
                        onClick={() => {
                          setEditingIndex(null);
                          setEditItemType("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>
                ) : (
                  /* Venture List */
                  <div className="space-y-4">
                    {(businessData.ventures || []).map((venture, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-6 hover:bg-white/[0.03] transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${venture.logoBg}`}>
                            <i className={venture.logoIcon}></i>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white uppercase">{venture.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">{venture.tagline} • {venture.role}</span>
                            <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed max-w-xl">{venture.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenVentureEdit(idx)}
                            className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <i className="fas fa-edit text-[11px]"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteVenture(idx)}
                            className="text-zinc-550 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <i className="fas fa-trash text-[11px]"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. ABOUT ME TAB */}
            {activeTab === "About Me" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-pink-400">About Chapters</h3>
                  {editingIndex === null && editItemType !== "chapter" && (
                    <button 
                      onClick={() => {
                        setEditingIndex(null);
                        setEditItemType("chapter");
                        setChapterForm({ chapterNumber: "", title: "", paragraphsText: "" });
                      }}
                      className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold text-[10px] uppercase tracking-wider hover:bg-pink-500/20 transition-all cursor-pointer"
                    >
                      + Add Chapter
                    </button>
                  )}
                </div>

                {editItemType === "chapter" ? (
                  /* Chapter Form */
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {editingIndex !== null ? "Edit Chapter Details" : "Add About Chapter"}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Chapter Number</label>
                        <input 
                          type="text" 
                          value={chapterForm.chapterNumber} 
                          onChange={(e) => setChapterForm({ ...chapterForm, chapterNumber: e.target.value })}
                          placeholder="e.g. Chapter 01" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Chapter Title</label>
                        <input 
                          type="text" 
                          value={chapterForm.title} 
                          onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                          placeholder="e.g. A Boy from the Silver City" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">
                        Chapter Body Paragraphs (Double Break [Enter Enter] between Paragraphs)
                      </label>
                      <textarea 
                        value={chapterForm.paragraphsText} 
                        onChange={(e) => setChapterForm({ ...chapterForm, paragraphsText: e.target.value })}
                        placeholder="First paragraph...&#10;&#10;Second paragraph...&#10;&#10;Third paragraph..." 
                        rows="8"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={handleSaveChapter}
                        className="px-5 py-2.5 rounded-xl bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Save Chapter
                      </button>
                      <button 
                        onClick={() => {
                          setEditingIndex(null);
                          setEditItemType("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>
                ) : (
                  /* Chapter List */
                  <div className="space-y-4">
                    {(aboutData.chapters || []).map((chapter, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-6 hover:bg-white/[0.03] transition-colors group">
                        <div className="text-left">
                          <span className="text-[9px] text-emerald-450 font-mono block uppercase">{chapter.chapterNumber}</span>
                          <span className="text-sm font-bold text-white uppercase block mt-0.5">{chapter.title}</span>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-2 uppercase">{(chapter.paragraphs || []).length} Paragraphs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenChapterEdit(idx)}
                            className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <i className="fas fa-edit text-[11px]"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteChapter(idx)}
                            className="text-zinc-550 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <i className="fas fa-trash text-[11px]"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. BLOGS TAB */}
            {activeTab === "Blogs" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-rose-400">Blog Posts</h3>
                  {editingIndex === null && editItemType !== "blog" && (
                    <button 
                      onClick={() => {
                        setEditingIndex(null);
                        setEditItemType("blog");
                        setBlogForm({ image: "", overlayTitle: "", tagsText: "", title: "", excerpt: "", readTime: "", date: "", body: "", solution: "" });
                      }}
                      className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-[10px] uppercase tracking-wider hover:bg-rose-500/20 transition-all cursor-pointer"
                    >
                      + Add Blog Post
                    </button>
                  )}
                </div>

                {editItemType === "blog" ? (
                  /* Blog Entry Form */
                  <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {editingIndex !== null ? "Edit Blog Details" : "Add Blog Post"}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Blog Cover Image Path / Upload</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={blogForm.image} 
                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                            placeholder="e.g. /blog-backpain.png" 
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                          />
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (dataUrl) => setBlogForm({ ...blogForm, image: dataUrl }))}
                            className="w-16 text-[9px]"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Beige Overlay Title (On Card Cover)</label>
                        <input 
                          type="text" 
                          value={blogForm.overlayTitle} 
                          onChange={(e) => setBlogForm({ ...blogForm, overlayTitle: e.target.value })}
                          placeholder="e.g. Healing Back Pain with Ayurveda" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Heading Title</label>
                        <input 
                          type="text" 
                          value={blogForm.title} 
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          placeholder="e.g. Chronic Back Pain in Ayurveda: Causes & Remedies" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Read Time</label>
                        <input 
                          type="text" 
                          value={blogForm.readTime} 
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          placeholder="e.g. 5 min read" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Date</label>
                        <input 
                          type="text" 
                          value={blogForm.date} 
                          onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                          placeholder="e.g. Mar 24, 2025" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Category Tags (Comma Separated)</label>
                        <input 
                          type="text" 
                          value={blogForm.tagsText} 
                          onChange={(e) => setBlogForm({ ...blogForm, tagsText: e.target.value })}
                          placeholder="e.g. Wellness, Prevention" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Short Excerpt (Grid Summary)</label>
                        <input 
                          type="text" 
                          value={blogForm.excerpt} 
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          placeholder="Brief 1-sentence teaser for the card grid..." 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Blog Body Paragraphs</label>
                      <textarea 
                        value={blogForm.body} 
                        onChange={(e) => setBlogForm({ ...blogForm, body: e.target.value })}
                        placeholder="Double-space paragraphs here..." 
                        rows="6"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 font-mono">Solution / Protocol Section (Numbered Steps)</label>
                      <textarea 
                        value={blogForm.solution} 
                        onChange={(e) => setBlogForm({ ...blogForm, solution: e.target.value })}
                        placeholder="Provide details about solutions and actionable remedies..." 
                        rows="6"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={handleSaveBlog}
                        className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Save Blog
                      </button>
                      <button 
                        onClick={() => {
                          setEditingIndex(null);
                          setEditItemType("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>
                ) : (
                  /* Blog List */
                  <div className="space-y-4 animate-fade-in">
                    {blogsData.map((blog, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-6 hover:bg-white/[0.03] transition-colors group">
                        <div className="flex items-center gap-4 text-left">
                          <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <span className="text-sm font-bold text-white uppercase block leading-snug">{blog.title}</span>
                            <span className="text-[9px] text-zinc-500 font-mono block mt-1">({blog.date} • {blog.readTime})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenBlogEdit(idx)}
                            className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <i className="fas fa-edit text-[11px]"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(idx)}
                            className="text-zinc-550 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <i className="fas fa-trash text-[11px]"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* 6. SETTINGS TAB */}
            {activeTab === "Settings" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xs font-black uppercase tracking-widest text-rose-400">Change Admin Access Credentials</h3>

                {settingsMessage && (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-xs">
                    {settingsMessage}
                  </div>
                )}

                <form onSubmit={handleUpdateSettings} className="space-y-4 max-w-md text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Current Settings Profile</label>
                    <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-zinc-500">
                      Email Address: <span className="text-zinc-350">{settings.email}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 font-mono">New Email / Username</label>
                    <input 
                      type="text" 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter new email/username" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 font-mono">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500/30 text-white"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors hover:bg-white/90 cursor-pointer"
                  >
                    Update Credentials
                  </button>
                </form>

              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
