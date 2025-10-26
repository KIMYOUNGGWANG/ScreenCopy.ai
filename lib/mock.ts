// Mock data for the application

export const features = [
  {
    id: "database",
    icon: "Database",
    title: "Postgres Database",
    description: "Every project includes a full Postgres database, the world's most trusted relational database.",
    highlights: ["100% portable", "Built-in Auth with RLS", "Easy to extend"],
  },
  {
    id: "auth",
    icon: "Lock",
    title: "Authentication",
    description: "Add user sign ups and logins, securing your data with Row Level Security.",
    highlights: ["Multiple providers", "Session management", "Secure by default"],
  },
  {
    id: "edge",
    icon: "Zap",
    title: "Edge Functions",
    description: "Easily write custom code without deploying or scaling servers.",
    highlights: ["Global deployment", "Auto-scaling", "Low latency"],
  },
  {
    id: "storage",
    icon: "HardDrive",
    title: "Storage",
    description: "Store, organize, and serve large files, from videos to images.",
    highlights: ["CDN integration", "Automatic optimization", "Secure uploads"],
  },
  {
    id: "realtime",
    icon: "Radio",
    title: "Realtime",
    description: "Build multiplayer experiences with real-time data synchronization.",
    highlights: ["WebSocket support", "Presence tracking", "Broadcast channels"],
  },
  {
    id: "vector",
    icon: "Box",
    title: "Vector",
    description: "Integrate your favorite ML-models to store, index and search vector embeddings.",
    highlights: ["OpenAI compatible", "Hugging Face support", "Fast similarity search"],
  },
]

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "/month",
    description: "For people looking to explore.",
    features: [
      "$5 of included monthly credits",
      "Deploy apps to Vercel",
      "Edit visually with Design Mode",
      "Sync with GitHub",
    ],
    cta: "Start Building",
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 20,
    period: "/month",
    description: "For higher limits and power users.",
    features: [
      "$20 of included monthly credits",
      "Purchase additional credits outside of your monthly usage",
      "5x higher attachment size limit",
      "Import from Figma",
      "Access to v0 API",
    ],
    cta: "Upgrade to Premium",
    highlighted: false,
  },
  {
    id: "team",
    name: "Team",
    price: 30,
    period: "/user/month",
    description: "For fast moving teams and collaboration.",
    badge: "Recommended",
    features: [
      "$30 of included monthly credits per user",
      "Purchase additional credits outside of your monthly usage shared across your team",
      "Centralized billing on vercel.com",
      "Share chats and collaborate with your team",
      "Access to v0 API",
    ],
    cta: "Start a Team plan",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "For large companies that require additional security.",
    features: [
      "Training opt-out by default",
      "SAML SSO",
      "Priority access for better performance and no queues",
      "Dedicated customer support",
      "Access to v0 API",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
]

export const studioTools = [
  {
    id: "code-editor",
    name: "Code Editor",
    description: "Write and edit code with syntax highlighting and autocomplete.",
    icon: "Code",
  },
  {
    id: "visual-builder",
    name: "Visual Builder",
    description: "Design interfaces visually with drag-and-drop components.",
    icon: "Layout",
  },
  {
    id: "database-browser",
    name: "Database Browser",
    description: "Query and manage your database with a visual interface.",
    icon: "Database",
  },
  {
    id: "api-tester",
    name: "API Tester",
    description: "Test and debug your API endpoints in real-time.",
    icon: "Terminal",
  },
]

export const accountSections = [
  {
    id: "profile",
    title: "Profile",
    description: "Manage your personal information and preferences.",
  },
  {
    id: "security",
    title: "Security",
    description: "Update your password and security settings.",
  },
  {
    id: "billing",
    title: "Billing",
    description: "View your subscription and payment methods.",
  },
  {
    id: "usage",
    title: "Usage",
    description: "Monitor your resource usage and credits.",
  },
]

export const mockSlides = {
  "Social Proof": [
    {
      id: 1,
      title: "Trusted by 50,000+ Teams",
      subtitle: "Join the growing community of businesses building better products.",
      callout: "Top Rated App",
    },
    {
      id: 2,
      title: "The #1 Choice for Developers",
      subtitle: "Rated 4.9/5 stars on G2 and Product Hunt.",
      callout: "Industry Leader",
    },
    {
      id: 3,
      title: "Featured in TechCrunch & Forbes",
      subtitle: "See why top publications are talking about us.",
      callout: "As Seen On",
    },
  ],
  "Urgency": [
    {
      id: 1,
      title: "Limited Time Offer: 50% Off",
      subtitle: "Upgrade today and get access to all premium features.",
      callout: "Ends Friday!",
    },
    {
      id: 2,
      title: "Your Pro Trial is Ending",
      subtitle: "Don't lose access to your projects and premium features.",
      callout: "Upgrade Now",
    },
    {
      id: 3,
      title: "Last Chance to Join!",
      subtitle: "The cohort is almost full. Secure your spot today.",
      callout: "Spots Filling Fast",
    },
  ],
  "Simplicity": [
    {
      id: 1,
      title: "Setup in 5 Minutes",
      subtitle: "Get started with just a few clicks. No credit card required.",
      callout: "Effortless Setup",
    },
    {
      id: 2,
      title: "The Easiest Way to Manage Projects",
      subtitle: "An intuitive interface designed for everyone.",
      callout: "No Learning Curve",
    },
    {
      id: 3,
      title: "One-Click Automations",
      subtitle: "Save hours of manual work with our powerful automations.",
      callout: "Work Smarter",
    },
  ],
  "Quality": [
    {
      id: 1,
      title: "Built for Performance",
      subtitle: "Experience a blazing fast and reliable platform.",
      callout: "99.9% Uptime",
    },
    {
      id: 2,
      title: "Enterprise-Grade Security",
      subtitle: "Your data is safe with our robust security measures.",
      callout: "SOC 2 Certified",
    },
    {
      id: 3,
      title: "Pixel-Perfect Design",
      subtitle: "Crafted with attention to every detail.",
      callout: "Beautifully Designed",
    },
  ],
}

export const benefits = [
  {
    id: 1,
    title: "Conversion-focused copy (A/B-ready)",
    description: "Every line is crafted to drive downloads and engagement",
  },
  {
    id: 2,
    title: "Under a minute from inputs to finished lines",
    description: "Fast generation means you can iterate and test quickly",
  },
  {
    id: 3,
    title: "One-click CSV/JSON export for your designer",
    description: "Seamless handoff to your design and development team",
  },
]

export const howItWorksSteps = [
  {
    id: 1,
    title: "Add basics: persona, tone, goals, key features",
    description: "Tell us about your app and target audience",
  },
  {
    id: 2,
    title: "Generate: clear titles, subtitles, and callouts",
    description: "AI creates multiple variants optimized for conversion",
  },
  {
    id: 3,
    title: "Experiment: ship variants A/B/C and measure",
    description: "Test different approaches and find what resonates",
  },
]

export const faqItems = [
  {
    id: 1,
    question: "How fast is generation?",
    answer: "Most sets are ready in ~5 seconds.",
  },
  {
    id: 2,
    question: "Do you store my inputs?",
    answer: "We minimize data and let you delete anytime.",
  },
  
  {
    id: 4,
    question: "How do I test results?",
    answer: "Use your store's native experiments.",
  },
]

export const sampleSlides = {
  variantA: [
    {
      id: 1,
      title: "Track Your Fitness Goals",
      subtitle: "Monitor progress with detailed analytics and insights",
      callout: "Real-time sync",
    },
    {
      id: 2,
      title: "Personalized Workout Plans",
      subtitle: "AI-powered routines tailored to your fitness level",
      callout: "Adaptive training",
    },
    {
      id: 3,
      title: "Join a Community",
      subtitle: "Connect with thousands of fitness enthusiasts",
      callout: "Stay motivated",
    },
  ],
  variantB: [
    {
      id: 1,
      title: "Achieve Your Best Body",
      subtitle: "Join 50,000+ users who reached their goals in 90 days",
      callout: "Proven results",
    },
    {
      id: 2,
      title: "Never Skip a Workout Again",
      subtitle: "Smart reminders and streak tracking keep you consistent",
      callout: "95% retention",
    },
    {
      id: 3,
      title: "Your Personal Trainer, 24/7",
      subtitle: "Expert guidance whenever you need it, wherever you are",
      callout: "Always available",
    },
  ],
  variantC: [
    {
      id: 1,
      title: "Finally, Fitness That Fits",
      subtitle: "No gym membership required, no judgment included",
      callout: "Work out anywhere",
    },
    {
      id: 2,
      title: "Sweat Now, Netflix Later",
      subtitle: "Quick 15-minute workouts that actually work",
      callout: "Time-efficient",
    },
    {
      id: 3,
      title: "Your Couch Called, It Misses You",
      subtitle: "But your future self will thank you for this",
      callout: "Worth it",
    },
  ],
}

export const mockAccount = {
  plan: "free" as "free" | "pro",
  credits: 5,
  email: "user@example.com",
  joinedDate: "2024-01-15",
}
