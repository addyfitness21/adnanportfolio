"use client";

// Initial mock data to bootstrap the localStorage state
export const defaultSettings = {
  email: "1",
  password: "1"
};

export const defaultHomeData = {
  heroImage: "/avatar.png",
  headingTitle: "Building brands that improve how",
  animatedWords: ["live,", "eat,", "grow."],
  stackItems: [
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
  ]
};

export const defaultPersonalData = {
  professionalProfile: [
    { title: "Brand Strategy & Positioning", icon: "🎯", description: "Building brand identity, GTM strategies, and competitive positioning for D2C & retail across multiple industries.", category: "Brand Strategy" },
    { title: "FMCG Product Development", icon: "🚀", description: "End-to-end R&D coordination, market validation, formulation feedback, and launching new successful SKUs.", category: "Product Development" },
    { title: "Sales Growth", icon: "📈", description: "Driving offline & online sales, B2B/B2C pipelines, and achieving aggressive revenue targets.", category: "Sales Growth" },
    { title: "E-commerce & D2C", icon: "🛍️", description: "Scaling Amazon Seller Central, Quick-Commerce, and marketplace channels for high visibility.", category: "E-commerce" },
    { title: "Performance Marketing", icon: "⚡️", description: "Executing high-ROI Meta & Google Ads campaigns, target planning, and promo ad strategies.", category: "Performance Marketing" },
    { title: "Trade Expansion", icon: "🤝", description: "Building distributor networks, retail penetration, and implementing structured field reporting.", category: "Offline Distribution" },
    { title: "CRM & ERP Implementation", icon: "💻", description: "Deploying sales tools like LeadSquared, ERPs, and automated WhatsApp/email engagement flows.", category: "CRM & ERP" },
    { title: "Healthcare Marketing", icon: "🩺", description: "Strategic pharmaceutical marketing, direct-to-doctor channels, and medical schema designs.", category: "Healthcare Marketing" },
    { title: "Team Leadership", icon: "👥", description: "Managing cross-functional teams, field executives, agency relationships, and target reviews.", category: "Team Leadership" }
  ],
  careerJourney: [
    {
      id: 1,
      title: "Senior Sales & Marketing Executive",
      company: "Soul Sante",
      period: "June 2025 – Present",
      description: "Executing simultaneous on-ground operations and national strategic plans across sales, marketing, e-commerce, CRM implementation, and product development.",
      color: "pink",
      boxes: [
        { title: "Brand Building & Product Strategy", items: ["Packaging direction and product identity", "Consumer-oriented branding strategy", "SKU positioning across online and offline channels", "Product proposition development", "Market validation and customer feedback systems"], categories: ["Brand Strategy"] },
        { title: "Offline Sales Expansion", items: ["Managed field sales team of 12 across Tamil Nadu", "Grew monthly revenue from ₹9L to ₹17L", "Established new city-level distributor networks", "Improved trade relationships and retail penetration"], categories: ["Offline Distribution", "Sales Growth"] },
        { title: "Direct-to-Doctor (D2D) Channel", items: ["Independently built and launched D2D sales channel", "Generated new recurring revenue streams", "Designed incentive structures and doctor schemes"], categories: ["Healthcare Marketing", "Sales Growth"] },
        { title: "E-commerce & Marketplace Growth", items: ["Scaled e-commerce targets from ₹3.5 Cr to ₹5.5 Cr (92% achieved)", "Managed Amazon Seller Central, Quick-Commerce, D2C", "Improved account health and visibility"], categories: ["E-commerce"] },
        { title: "Performance Marketing & Digital", items: ["Handled Meta Ads & Google Ads campaigns", "Consumer targeting and ad campaign planning", "Coordinated ad creatives and ATL/BTL communication"], categories: ["Performance Marketing"] },
        { title: "CRM & ERP Implementation", items: ["Implemented LeadSquared CRM and mapped sales pipeline", "Integrated target review structures", "Automated WhatsApp and email workflow triggers"], categories: ["CRM & ERP"] }
      ]
    },
    {
      id: 2,
      title: "Senior Customer Success Executive",
      company: "Green Jeeva LLC",
      period: "Nov 2023 – May 2025",
      description: "Managed key international B2B accounts in the USA market and specialized in customer success, sales strategy, and client relationship management.",
      color: "blue",
      boxes: [
        { title: "Key Contributions", items: ["Onboarded 18 new business clients", "Revived 7 dormant client accounts", "Consistently exceeded 70% of sales targets", "Executed upselling and cross-selling strategies"], categories: ["Sales Growth"] },
        { title: "Team Leadership", items: ["Trained and mentored 13 team members", "Focused on sales communication and negotiation", "Managed CRM process management"], categories: ["Team Leadership"] },
        { title: "Major Strengths Developed", items: ["International client communication", "B2B sales operations and strategic upselling", "Account retention under pressure"], categories: ["Sales Growth", "Offline Distribution"] }
      ],
      tags: ["B2B Account Management", "International Sales", "Client Onboarding", "Cross-selling Strategy", "Team Leadership"]
    },
    {
      id: 3,
      title: "Founder & Brand Manager",
      company: "Addy Fitness, Addy Meals, Pixelwebpages",
      period: "2021 – Present",
      description: "Founded with the vision of creating an affordable, technology-enabled ecosystem for fitness, healthcare, nutrition, and tailored web solutions in India.",
      color: "emerald",
      boxes: [
        { title: "Addy Fitness", items: ["Health-tech platform for fitness coaching", "Nutrition guidance and doctor consultations", "Tech-enabled healthcare accessibility"], categories: ["Herbal Supplement", "Healthcare Marketing"] },
        { title: "Addy Meals", items: ["Healthy Indian meals and functional nutrition", "Ready-to-eat wellness products"], categories: ["Herbal Supplement"] },
        { title: "Pixelwebpages", items: ["Empowering small businesses to scale online", "Building customized, scalable e-commerce solutions", "Creating high-conversion digital presences"], categories: ["E-commerce"] },
        { title: "My Role as Founder", items: ["Independently handled brand positioning", "Product development and marketing strategy", "Client acquisition and vendor management"], categories: ["Brand Strategy"] },
        { title: "Product Innovation & Collaborations", items: ["Developed RTD Coffee, Wellness shots, Protein foods", "Served as CMO for Altrin Peanut Butter"], categories: ["Product Development", "Herbal Supplement"] }
      ],
      tags: ["Startup Founder", "Health-tech", "Functional Nutrition", "Brand Management", "D2C Ecosystem", "Finance & Operations"]
    },
    {
      id: 4,
      title: "Finance & Operations",
      company: "Flextone Fitness",
      period: "Aug 2019 – July 2021",
      description: "Managed financial operations and accounting, billing, budget management, and reporting systems.",
      color: "purple",
      boxes: [
        { title: "Finance & Operations", items: ["Managed financial operations and accounting", "Billing, budget management, and reporting systems"], categories: ["Finance & Operations"] },
        { title: "Business Discipline", items: ["Strengthened understanding of P&L management", "Focused on operational discipline and sustainability"], categories: ["Finance & Operations"] }
      ],
      tags: ["Finance & Operations", "P&L Management", "Budgeting", "Accounting"]
    }
  ],
  coreCompetencies: [
    { name: "Sales & Business Development", value: 92, category: "Sales Growth" },
    { name: "Brand & Marketing", value: 90, category: "Brand Strategy" },
    { name: "Leadership & Communication", value: 95, category: "Team Leadership" },
    { name: "E-commerce & Marketplace", value: 80, category: "E-commerce" },
    { name: "Performance Marketing & Analytics", value: 78, category: "Performance Marketing" },
    { name: "FMCG Product Development", value: 77, category: "Product Development" }
  ],
  education: [
    { degree: "B.Tech in Biotechnology", school: "Odisha University of Technology and Research", period: "2020–2023", details: "CGPA: 8.7 • Fermentation & nutrition labs" },
    { degree: "Medifit-Certification", school: "Medifit", period: "2019–2020", details: "Human Nutrition & Wellness Training" }
  ]
};

export const defaultBusinessData = {
  ventures: [
    {
      id: 1,
      name: "Addy Fitness",
      tagline: "Founder & Visionary",
      role: "Ecosystem Builder",
      description: "I founded Addy Fitness with the vision of building a technology-enabled healthcare, fitness, and nutrition ecosystem where people can access fitness coaching, nutrition guidance, and healthcare consultation within a single platform. The brand was conceptualized to bridge the gap between affordable wellness solutions and modern digital accessibility for Gen Z and middle-class consumers in India.",
      points: [
        "A holistic platform providing end-to-end wellness guidance.",
        "Combines technology with physical fitness to offer remote training.",
        "Built to make health coaching accessible across regional markets."
      ],
      logoBg: "bg-rose-500/10 text-rose-400",
      logoIcon: "fas fa-dumbbell"
    },
    {
      id: 2,
      name: "Addy Meals",
      tagline: "Founder & Product Manager",
      role: "Functional Food Innovator",
      description: "Addy Meals was born to deliver clean, functional, and nutritionist-approved ready-to-eat meals that focus on high quality, macro-nutrient precision, and convenience. I designed the initial product line, packaging style, and oversaw the formulation of protein-rich recipes tailored to modern professionals seeking healthy alternatives.",
      points: [
        "Specializes in low-calorie, high-protein nutrition packs.",
        "Crafted with zero chemical preservatives and fresh ingredients.",
        "Streamlined online ordering and subscriptions for D2C scaling."
      ],
      logoBg: "bg-emerald-500/10 text-emerald-400",
      logoIcon: "fas fa-utensils"
    },
    {
      id: 3,
      name: "Pixel Webpages",
      tagline: "Founder & Operations Head",
      role: "Digital Solutions Provider",
      description: "Pixel Webpages is our custom software design and development agency. We build rapid, responsive, and high-conversion landing pages, customized business platforms, and e-commerce websites for regional retail brands, startups, and service providers. Our focus is to deliver sleek, professional internet presences with modern designs.",
      points: [
        "Builds custom React/Next.js and Shopify stores.",
        "Optimizes conversion rates and user journeys for D2C brands.",
        "Has successfully launched over 35 client websites in local markets."
      ],
      logoBg: "bg-cyan-500/10 text-cyan-400",
      logoIcon: "fas fa-laptop-code"
    }
  ]
};

export const defaultAboutData = {
  chapters: [
    {
      chapterNumber: "Chapter 01",
      title: "A Boy from the Silver City",
      paragraphs: [
        "I grew up in Cuttack the Silver City, a place where strangers help strangers without ever asking for anything back. That spirit shaped me before I knew it was shaping me. I didn't want to wait for life to hand me things, and I didn't want to depend on my parents for every small want. So at fifteen, in 2016, I went looking for my own way.",
        "I weighed 43 kilograms. A skinny, curious kid who had just discovered the gym and who couldn't stop asking how. How does the body change? How does food become muscle? How does any of this actually work? That question became the engine of everything that followed."
      ]
    },
    {
      chapterNumber: "Chapter 02",
      title: "The Boy Who Wanted to Understand",
      paragraphs: [
        "I became a gym trainer before I was old enough to fully understand what I was teaching. Over the next two years, I put on 22 kilograms from 43 to 65 through nothing but discipline, real food, and the same curiosity that got me into the gym in the first place.",
        "But somewhere in that transformation, I noticed something that disturbed me. Genuine people people who just wanted to be healthy were being quietly steered toward bodybuilding and shortcuts, because that's what was trending. Steroids were being whispered about like secrets. And almost nobody was talking about the simplest, most powerful tool we already had: Indian nutrition, the food our own kitchens have known for generations.",
        "Something woke up in me then what I can only call the keeda, that restless itch that doesn't let you look away from a problem once you've seen it. I decided I wanted to give people the right knowledge, not the trending one. I got certified. I trained. I built a client base from nothing. Eventually, I was running a gym as a managing partner. And in 2021, that itch became a name: Addy Fitness."
      ]
    },
    {
      chapterNumber: "Chapter 03",
      title: "The Loss That Changed Everything",
      paragraphs: [
        "But this story isn't only about fitness. It's also about my father.",
        "In 2017, while I was just beginning to find my footing in this industry, my father was diagnosed with AIHA Autoimmune Hemolytic Anemia, a rare and unforgiving blood disorder. For five years, we moved from hospital to hospital, city to city, chasing answers across India. We saw what it means to fight for healthcare in a country where the right treatment often exists just not within reach, not affordably, not in time.",
        "In 2022, after five years of fighting, my father passed away.",
        "That loss didn't break my direction it sharpened it. Every hospital corridor, every second opinion, every form we filled out searching for someone who could help him became part of a question I couldn't stop asking: why is good healthcare so hard to reach in our own country? The grief turned into fuel. Addy Fitness stopped being just an idea about gyms and nutrition. It became a vision to make healthcare itself more affordable and accessible through technology, for every Indian who needs it."
      ]
    },
    {
      chapterNumber: "Chapter 04",
      title: "Building What India Actually Needed",
      paragraphs: [
        "I started researching seriously. The answer kept coming back to the same root cause: it wasn't a lack of doctors or a lack of knowledge. It was affordability and accessibility. People didn't need more advice they needed a way to actually reach care without it costing them everything.",
        "So we built a tele-consultation platform from the ground up. Today, it actively serves more than 84 members in healthcare real people getting real help, without the barriers my father had to fight through.",
        "Along the way, nutrition found its way back into the story, just as it had when I was sixteen. If people are going to be healthy, they need to eat well simply, and without breaking the bank. That belief became Addy Meals, one of the first services in the city to deliver healthy, home-style cooked meals at honest prices. We started as a cloud kitchen and evolved into fresh, packed meals supplied directly to gyms. Both models worked. People didn't just order they came back, because it helped them manage diabetes, lose weight, and finally take control of their health."
      ]
    },
    {
      chapterNumber: "Chapter 05",
      title: "The Builder in Me",
      paragraphs: [
        "Somewhere alongside all of this, Pixel Webpages began almost by accident, as a personal interest to earn some extra income, with no grand vision behind it. But it's grown into something more meaningful: a way to help first-time entrepreneurs avoid the very mistakes I made when I was starting out, fumbling through my first business with no roadmap and no mentor.",
        "I'm not an MBA graduate. I never sat in a classroom learning frameworks for strategy or sales. But life taught me hospital waiting rooms taught me, building a gym client base from zero taught me, losing my father taught me. That kind of education gives you a different kind of confidence: the confidence to walk into any subject, any problem, and figure it out.",
        "I don't fully know where it came from, but sales has always come naturally to me finding the angle nobody else sees in a product or a service, and backing it fully once I believe in it."
      ]
    },
    {
      chapterNumber: "Chapter 06",
      title: "Where I Am Now",
      paragraphs: [
        "I'm learning daily. Building daily. Growing daily.",
        "Outside of work, I cook, I travel, and I tinker with engineering and technology the same curiosity from when I was fifteen, just pointed at new things now. I've had the privilege of being part of DIC, IIT Bhubaneswar, and SPA Delhi, and I currently serve as Fitness and Wellness President at Green Jeeva.",
        "This is where Addy Fitness came from not a business plan, but a question that wouldn't leave me alone, and a loss that gave that question its purpose."
      ]
    }
  ]
};

export const defaultBlogsData = [
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

// Helper functions for reading and writing to LocalStorage
export function getSettings() {
  if (typeof window === "undefined") return defaultSettings;
  const item = localStorage.getItem("addy_settings");
  if (!item) {
    localStorage.setItem("addy_settings", JSON.stringify(defaultSettings));
    return defaultSettings;
  }
  return JSON.parse(item);
}

export function saveSettings(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_settings", JSON.stringify(data));
  fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "settings", data })
  }).catch(err => console.error("Error saving settings:", err));
}

export function getHomeData() {
  if (typeof window === "undefined") return defaultHomeData;
  const item = localStorage.getItem("addy_home");
  if (!item) {
    localStorage.setItem("addy_home", JSON.stringify(defaultHomeData));
    return defaultHomeData;
  }
  return JSON.parse(item);
}

export function saveHomeData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_home", JSON.stringify(data));
  fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "home", data })
  }).catch(err => console.error("Error saving home data:", err));
}

export function getPersonalData() {
  if (typeof window === "undefined") return defaultPersonalData;
  const item = localStorage.getItem("addy_personal");
  if (!item) {
    localStorage.setItem("addy_personal", JSON.stringify(defaultPersonalData));
    return defaultPersonalData;
  }
  return JSON.parse(item);
}

export function savePersonalData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_personal", JSON.stringify(data));
  fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "personal", data })
  }).catch(err => console.error("Error saving personal data:", err));
}

export function getBusinessData() {
  if (typeof window === "undefined") return defaultBusinessData;
  const item = localStorage.getItem("addy_business");
  if (!item) {
    localStorage.setItem("addy_business", JSON.stringify(defaultBusinessData));
    return defaultBusinessData;
  }
  return JSON.parse(item);
}

export function saveBusinessData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_business", JSON.stringify(data));
  fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "business", data })
  }).catch(err => console.error("Error saving business data:", err));
}

export function getAboutData() {
  if (typeof window === "undefined") return defaultAboutData;
  const item = localStorage.getItem("addy_about");
  if (!item) {
    localStorage.setItem("addy_about", JSON.stringify(defaultAboutData));
    return defaultAboutData;
  }
  try {
    const parsed = JSON.parse(item);
    if (!parsed || !parsed.chapters || parsed.chapters.length < 6) {
      localStorage.setItem("addy_about", JSON.stringify(defaultAboutData));
      return defaultAboutData;
    }
    return parsed;
  } catch (e) {
    localStorage.setItem("addy_about", JSON.stringify(defaultAboutData));
    return defaultAboutData;
  }
}

export function saveAboutData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_about", JSON.stringify(data));
  fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "about", data })
  }).catch(err => console.error("Error saving about data:", err));
}

export function getBlogsData() {
  if (typeof window === "undefined") return defaultBlogsData;
  const item = localStorage.getItem("addy_blogs");
  if (!item) {
    localStorage.setItem("addy_blogs", JSON.stringify(defaultBlogsData));
    return defaultBlogsData;
  }
  return JSON.parse(item);
}

export function saveBlogsData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_blogs", JSON.stringify(data));
  fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "blogs", data })
  }).catch(err => console.error("Error saving blogs data:", err));
}

// Contact inquiries management
export function getContacts() {
  if (typeof window === "undefined") return [];
  const item = localStorage.getItem("addy_contacts");
  if (!item) {
    return [];
  }
  try {
    return JSON.parse(item);
  } catch (e) {
    return [];
  }
}

export function saveLocalContacts(contacts) {
  if (typeof window === "undefined") return;
  localStorage.setItem("addy_contacts", JSON.stringify(contacts));
}

export async function submitContactForm(data) {
  const newContact = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    message: data.message,
    status: "new",
    createdAt: new Date().toISOString()
  };

  // Save to localStorage
  if (typeof window !== "undefined") {
    const existing = getContacts();
    const updated = [newContact, ...existing];
    saveLocalContacts(updated);
  }

  // Submit to Neon DB
  try {
    const res = await fetch("/api/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact_submission", data })
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error submitting contact form to DB:", err);
    return { success: true, localOnly: true };
  }
}

