// Default portfolio content — used until (or unless) the /admin dashboard
// saves edits to Supabase. This keeps the site fully working with zero
// backend configured: it's the fallback getContent() returns in lib/content.js.

const defaultContent = {
  name: "Ali Hamza",
  role: "Computer Engineering Student",
  kicker: "Computer Engineering · AI & Full-Stack Development",
  tagline_a: "embedded hardware",
  tagline_b: "applied AI",
  tagline_rest: "from PCB traces to production web apps.",
  summary:
    "Computer Engineering student and AI & Full-Stack Development intern with hands-on work spanning embedded systems, circuit/PCB design and FPGA hardware, alongside AI-driven web applications in Python, Django and React.",
  location: "Lahore, Pakistan",
  email: "alirana0405@gmail.com",
  phone: "+92 303 4928301",
  github: "https://github.com/BuildsWithAli",
  githubLabel: "github.com/BuildsWithAli",
  linkedin: "https://linkedin.com/in/buildswithali",
  linkedinLabel: "linkedin.com/in/buildswithali",

  stats: [
    { num: "3.04", suffix: "/4.00", label: "CGPA · COMSATS" },
    { num: "6", suffix: "", label: "Engineering & AI Projects" },
    { num: "3", suffix: "", label: "Certifications" },
    { num: "2025", suffix: "", label: "AI Intern · Arbisoft" },
  ],

  about: [
    "Detail-oriented Computer Engineering student and AI & Full-Stack Development intern with hands-on experience spanning embedded systems, circuit/PCB design and FPGA-based hardware, alongside AI-driven web application development.",
    "Proficient in Python, Django, React.js and VHDL, with a strong foundation in Digital Image Processing, Computer Networking and Artificial Intelligence — skilled at leveraging AI coding assistants and cloud-based environments to accelerate delivery and improve code quality.",
  ],

  focusAreas: [
    "Embedded systems & PCB / circuit design",
    "FPGA design in VHDL",
    "Full-stack web apps — Django & React",
    "Applied AI & agentic tool-calling",
    "IoT & sensor-network integration",
  ],

  experience: {
    when: "2025",
    whenNote: "Ongoing track",
    role: "AI Remote Internship",
    org: "ARBISOFT — Lahore",
    bullets: [
      "Worked as an Artificial Intelligence Intern focused on full-stack development and AI integration.",
      "Built and maintained dynamic web applications using Python, Django, React.js, HTML and CSS.",
      "Integrated AI features into full-stack projects to enhance functionality and user experience.",
      "Leveraged AI coding assistants and cloud-based development tools — including Claude and GitHub Copilot — to accelerate delivery and improve code quality.",
    ],
    tags: ["Python", "Django", "React.js", "Claude API", "GitHub Copilot"],
  },

  featuredProjects: [
    {
      num: "PRJ / 01",
      badge: "Final Year Project",
      name: "Multi-Agent AI System for Landslide Monitoring & Early Warning",
      bullets: [
        "Leading PCB/hardware design for a distributed ESP32-S3 sensor network — schematics, PCB layout, power management and component integration.",
        "Performing hardware testing and system integration across sensor nodes, the LoRa-based gateway and the Firebase cloud backend.",
        "Collaborating on a multi-agent AI architecture for real-time risk classification and automated alerts via a web dashboard and SMS.",
      ],
      tags: ["ESP32-S3", "PCB Design", "LoRa", "Firebase", "Multi-Agent AI"],
    },
    {
      num: "PRJ / 02",
      badge: "Arbisoft Internship",
      name: "FAWNIC — AI-Powered Smart Inventory & Order Management",
      bullets: [
        "Built a full-stack inventory and order management platform for FAWNIC, a leather-goods e-commerce brand, as a solo build.",
        "Designed a reusable, config-driven CRUD engine powering nine master-data/transaction modules, plus a live ORM-aggregated analytics dashboard.",
        "Developed a drag-and-drop Kanban board for order tracking, paired with an agentic AI assistant that flags low stock on status changes.",
      ],
      tags: ["React", "Tailwind CSS", "Django REST", "PostgreSQL", "Recharts"],
    },
  ],

  miniProjects: [
    {
      name: "Hand Gesture Recognition",
      copy: "Automated gesture-recognition system built with MATLAB and App Designer, using image processing for accurate classification.",
      tags: ["MATLAB", "Image Processing"],
    },
    {
      name: "Enhanced Reaction Timer",
      copy: "High-precision reaction timer in VHDL, targeted to an FPGA with a hand-architected FSM for datapath and control logic.",
      tags: ["VHDL", "FPGA", "FSM"],
    },
    {
      name: "Smart Parking Management",
      copy: "Engineered a smart parking solution to optimize vehicle-space allocation, with full architecture docs and technical presentations.",
      tags: ["Systems Design", "Docs"],
    },
    {
      name: "Library Management System",
      copy: "Robust library management system on a SQL backend, with a custom HTML/CSS front end to manage operations.",
      tags: ["SQL", "HTML/CSS"],
    },
  ],

  skillGroups: [
    { title: "Technical", chips: ["Python", "C++", "Embedded C", "VHDL", "SQL", "React", "Django", "HTML/CSS"] },
    { title: "Technical Software", chips: ["Quartus", "MATLAB", "Cisco Packet Tracer", "Proteus", "IDEs"] },
    { title: "Domain Knowledge", chips: ["Embedded Systems", "PCB & Circuit Design", "IoT & Sensors", "Networking"] },
    { title: "Core Competencies", chips: ["Troubleshooting", "Data Analysis", "Technical Documentation", "Continuous Learning"] },
    { title: "Languages", chips: ["English — Intermediate", "Urdu — Native"] },
  ],

  education: [
    { when: "2023–Present", degree: "Bachelor of Computer Engineering", org: "COMSATS University, Lahore", score: "CGPA 3.04 / 4.00" },
    { when: "2021–2023", degree: "Intermediate FSc — Pre-Engineering", org: "Punjab Group of Colleges", score: "80% · 880/1100" },
    { when: "2019–2021", degree: "Matriculation", org: "Lahore Development Authority School", score: "99% · 1089/1100" },
  ],

  certifications: [
    "AI Remote Internship Completion — Arbisoft",
    "Design Prompts for Everyday Work Tasks — Google",
    "Claude with the Anthropic API — Anthropic",
  ],

  contactTitle: "Let's build\nsomething reliable.",
  contactCopy:
    "Open to internships, collaborations and full-stack or embedded-systems roles where AI and hardware meet. Reach out directly — I usually reply within a day.",
};

export default defaultContent;
