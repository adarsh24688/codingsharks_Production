// ============================================================================
// SEO LANDING ENGINE — hub & cluster local/intent landing pages.
// Pattern mirrors the Kaya Salon reference (seo-services.ts): one typed shape
// feeds programmatic, interlinked landing pages. NO pricing/fees (owner rule).
// Content is answer-first and fact-dense for AEO citation.
// ============================================================================

export interface SeoStat {
  v: string;
  l: string;
}

export interface SeoSection {
  /** Question-shaped H2 — phrased the way a user/AI would ask. */
  heading: string;
  /** Answer-first body. First sentence is the definitive answer. */
  body: string[];
  bullets?: string[];
}

export interface SeoComparison {
  /** Two column headers, e.g. ["Self-taught", "Coding Sharks"]. */
  columns: [string, string];
  rows: { label: string; a: string; b: string }[];
  caption?: string;
}

export interface SeoLanding {
  slug: string;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Entity-first opening — factual, with real numbers. */
  intro: string;
  stats: SeoStat[];
  /** Optional comparison table (one row = one extractable fact, great for AEO). */
  comparison?: SeoComparison;
  sections: SeoSection[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const HIRING_COMPANIES =
  "Zepto, Razorpay, Swiggy, CRED, Meesho, and other product companies";

export const CODING_BOOTCAMP_INDORE: SeoLanding = {
  slug: "coding-bootcamp-indore",
  eyebrow: "Coding Bootcamp · Indore",
  h1: "Coding Bootcamp in Indore with Placement Support",
  metaTitle: "Coding Bootcamp in Indore | 91%+ Placement | Coding Sharks",
  metaDescription:
    "Placement-focused coding bootcamp in Indore. Live Full Stack, AI, Data Science and DSA programs with 1-on-1 mentorship and a 91%+ placement rate.",
  keywords: [
    "coding bootcamp Indore",
    "coding classes in Indore",
    "full stack course Indore",
    "best coding institute Indore",
    "programming course Indore with placement",
    "software development course Indore",
  ],
  intro:
    "Coding Sharks is a placement-focused coding bootcamp in Indore, Madhya Pradesh, offering live, project-based programs in Full Stack Web Development, AI Agents, Data Science, DSA, and System Design. The institute reports a 91 to 96 percent placement rate across cohorts and has trained more than 15,000 developers, including many from non-CS backgrounds. Classes run from the Bhawarkua campus and online, with 1-on-1 mentorship from senior engineers.",
  stats: [
    { v: "91–96%", l: "placement rate across cohorts" },
    { v: "15,000+", l: "developers trained" },
    { v: "₹8–15 LPA", l: "average first package" },
    { v: "₹21L+", l: "top package" },
    { v: "61%", l: "students from non-CS backgrounds" },
    { v: "50+", l: "hiring partners" },
  ],
  sections: [
    {
      heading: "Where is Coding Sharks located in Indore?",
      body: [
        "Coding Sharks runs from 3rd Floor, Veda Complex, Bhawarkua Main Road, Bhawarkua Square, Indore, Madhya Pradesh. The campus serves learners across Indore and nearby Tier-2 cities, and every program is also available online so you can join the same live cohort from anywhere in India.",
      ],
    },
    {
      heading: "What does the Indore coding bootcamp teach?",
      body: [
        "Coding Sharks teaches job-ready software engineering across five live tracks. Each program is built around shipping real products, not following tutorials, so you graduate with a portfolio interviewers actually review.",
      ],
      bullets: [
        "Full Stack Web Development — JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, AWS, Docker",
        "AI Agents and Automation — Python, LangChain, LLM APIs, vector databases, agentic workflows",
        "Data Science and Machine Learning — Python, ML, data pipelines",
        "DSA Mastery — data structures and algorithms for product-company interviews",
        "System Design and DSA Masterclass — scalable systems plus interview preparation",
      ],
    },
    {
      heading: "What is the placement rate at Coding Sharks in Indore?",
      body: [
        `Coding Sharks reports a 91 to 96 percent placement rate across its programs. Most students receive a first offer within 4 to 8 weeks of finishing a program, with an average starting package of ₹8 to 15 LPA and a top package above ₹21 LPA. Graduates work as full-time software engineers at ${HIRING_COMPANIES}.`,
      ],
    },
    {
      heading: "Is the Indore bootcamp good for beginners and non-CS backgrounds?",
      body: [
        "Yes. 61 percent of Coding Sharks students come from non-CS backgrounds, including roles in sales, teaching, and operations. A pre-cohort prep module covers fundamentals before Day 1, and a mentor guides every student through the harder weeks, so prior coding experience is not required.",
      ],
    },
    {
      heading: "Are the classes online or offline in Indore?",
      body: [
        "Both. Core sessions are live with your cohort, available offline at the Bhawarkua campus and online for remote learners. Every session is recorded and available within 24 hours, while workshops, code reviews, and 1-on-1 mentor sessions stay live.",
      ],
    },
    {
      heading: "How does a structured bootcamp compare to learning on your own?",
      body: [
        "A structured bootcamp closes the gap that stops most self-learners from getting hired. Self-teaching gives you tutorials but rarely a portfolio, mock interviews, referrals, or feedback on real code. Coding Sharks adds the parts that convert effort into offers.",
      ],
      bullets: [
        "Ship 3 to 5 production-grade projects with real users, reviewed by senior engineers",
        "Weekly mock interviews with the engineers who run real interviews",
        "Direct referrals to 50+ hiring partners",
        "A clear, deadline-driven path instead of an endless tutorial backlog",
      ],
    },
    {
      heading: "How do I join the Indore cohort?",
      body: [
        "Book a free demo session. You meet a mentor, see how the live cohort works, and get an honest assessment of which track fits your goal. There is no sales pitch and no payment to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is Coding Sharks a good coding institute in Indore?",
      a: "Coding Sharks is a placement-focused coding bootcamp in Indore with a reported 91 to 96 percent placement rate, 1-on-1 mentorship from senior engineers, and a project-first curriculum. Over 15,000 developers have trained with the institute.",
    },
    {
      q: "Which coding courses are available in Indore at Coding Sharks?",
      a: "Coding Sharks offers Full Stack Web Development, AI Agents and Automation, Data Science and Machine Learning, DSA Mastery, and a System Design and DSA Masterclass, all as live cohorts available offline in Indore and online.",
    },
    {
      q: "Does Coding Sharks offer placement support in Indore?",
      a: "Yes. Coding Sharks provides mock interviews, resume reviews, and direct referrals to 50+ hiring partners. Most students receive a first offer within 4 to 8 weeks of finishing a program.",
    },
    {
      q: "Can I join the Indore bootcamp without a CS degree?",
      a: "Yes. 61 percent of Coding Sharks students come from non-CS backgrounds. A pre-cohort prep module and 1-on-1 mentorship mean prior coding experience is not required.",
    },
    {
      q: "Are Coding Sharks classes online or offline in Indore?",
      a: "Both. Live cohort sessions run offline at the Bhawarkua campus and online for remote learners, and every session is recorded and available within 24 hours.",
    },
    {
      q: "How long do the programs take?",
      a: "Program length depends on the track, ranging from short focused programs to multi-month tracks. Most students receive a first job offer within 4 to 8 weeks of completing their program.",
    },
    {
      q: "How do I start at Coding Sharks Indore?",
      a: "Book a free demo session through the website. You will meet a mentor, see the live cohort format, and get an honest assessment of which program fits your goals.",
    },
  ],
  related: [
    { label: "Full Stack Web Development program", href: "/courses/full-stack" },
    { label: "AI Agents & Automation course", href: "/courses/ai-agents" },
    { label: "all coding programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const WHY_CODING_SHARKS: SeoLanding = {
  slug: "why-coding-sharks",
  eyebrow: "Why Coding Sharks",
  h1: "Why Choose Coding Sharks",
  metaTitle: "Why Choose Coding Sharks | Placement-Focused Coding Bootcamp",
  metaDescription:
    "Coding Sharks gets you hired, not just certified: real product building, 1-on-1 mentorship from senior engineers, and a 91%+ placement rate.",
  keywords: [
    "why coding sharks",
    "is coding sharks good",
    "coding sharks bootcamp",
    "best coding bootcamp with mentorship",
  ],
  intro:
    "Coding Sharks is a placement-focused coding bootcamp built on one observation: engineers who ship real products get hired faster than those with only certificates. Students build 3 to 5 production-grade projects, get 1-on-1 mentorship from senior engineers, and reach a 91 to 96 percent placement rate. Over 15,000 developers have trained with the institute, 61 percent of them from non-CS backgrounds.",
  stats: [
    { v: "91–96%", l: "placement rate" },
    { v: "1-on-1", l: "mentorship from senior engineers" },
    { v: "3–5", l: "real projects shipped per student" },
    { v: "15,000+", l: "developers trained" },
    { v: "50+", l: "hiring partners" },
    { v: "61%", l: "from non-CS backgrounds" },
  ],
  sections: [
    {
      heading: "What makes Coding Sharks different?",
      body: [
        "Coding Sharks is built around shipping real software, not watching tutorials. Every week you build and deploy something, so you graduate with a portfolio of production-grade projects that interviewers actually review. The combination of live cohorts, 1-on-1 mentorship, and direct hiring referrals is what turns learning into offers.",
      ],
      bullets: [
        "Real products with real users, not tutorial clones",
        "1-on-1 mentorship from senior engineers",
        "Mock interviews with the engineers who run real interviews",
        "Direct referrals to 50+ hiring partners",
      ],
    },
    {
      heading: "Who teaches at Coding Sharks?",
      body: [
        "Mentors at Coding Sharks are senior engineers who ship production code at top product companies, not full-time instructors. They run 1-on-1 sessions, review your code, and prepare you for the exact interviews they conduct. This is why feedback is practical and current.",
      ],
    },
    {
      heading: "Do students build real projects?",
      body: [
        "Yes. By the end of a program you will have 3 to 5 production-grade projects on GitHub with real users. Building real software is the single strongest signal in a junior developer interview, and it is the core of how Coding Sharks works.",
      ],
    },
    {
      heading: "What placement support do you get?",
      body: [
        "Placement support at Coding Sharks is direct referrals to 50+ hiring partners, mock interviews with practicing engineers, and resume and portfolio reviews. Most students receive a first offer within 4 to 8 weeks of finishing a program.",
      ],
    },
    {
      heading: "Is Coding Sharks good for non-CS backgrounds?",
      body: [
        "Yes. 61 percent of students come from non-CS backgrounds such as sales, teaching, and operations. A pre-cohort prep module covers fundamentals before Day 1, so prior coding experience is not required.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why should I choose Coding Sharks?",
      a: "Choose Coding Sharks if you want to get hired, not just certified. The program is built around shipping real products, 1-on-1 mentorship from senior engineers, and direct hiring referrals, with a 91 to 96 percent placement rate.",
    },
    {
      q: "Is Coding Sharks worth it?",
      a: "Coding Sharks is worth it for learners who can commit to a live cohort and want placement support. Students build a real portfolio, prepare with mock interviews, and most receive a first offer within 4 to 8 weeks of finishing.",
    },
    {
      q: "What if I have no coding experience?",
      a: "No coding experience is fine. 61 percent of Coding Sharks students come from non-CS backgrounds, and a pre-cohort prep module brings you up to speed before the program starts.",
    },
  ],
  related: [
    { label: "placement outcomes", href: "/placements" },
    { label: "student reviews", href: "/reviews" },
    { label: "all programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const BOOTCAMP_VS_SELF_TAUGHT: SeoLanding = {
  slug: "coding-bootcamp-vs-self-taught",
  eyebrow: "Bootcamp vs Self-Taught",
  h1: "Coding Bootcamp vs Self-Taught: Which Gets You Hired?",
  metaTitle: "Coding Bootcamp vs Self-Taught (2026) | Which Gets You Hired",
  metaDescription:
    "Self-taught vs a placement-focused bootcamp: the real differences in time, portfolio, interview prep, and hiring outcomes, and who each path suits.",
  keywords: [
    "coding bootcamp vs self taught",
    "self taught vs bootcamp developer",
    "is a coding bootcamp worth it",
    "best way to learn coding for a job",
  ],
  intro:
    "A coding bootcamp and self-teaching both teach you to code, but they produce very different hiring outcomes. Self-teaching is flexible and low-cost, yet most self-learners stall before they get hired because they lack a portfolio, interview practice, and referrals. A placement-focused bootcamp like Coding Sharks adds exactly those missing pieces, which is why it reports a 91 to 96 percent placement rate.",
  stats: [
    { v: "91–96%", l: "bootcamp placement rate" },
    { v: "4–8 wks", l: "to first offer after a program" },
    { v: "3–5", l: "real projects shipped" },
    { v: "50+", l: "hiring partners for referrals" },
  ],
  comparison: {
    columns: ["Self-taught", "Coding Sharks bootcamp"],
    caption: "How the two paths compare on what actually gets a junior developer hired.",
    rows: [
      { label: "Structure", a: "You design your own path", b: "Live cohort with deadlines and a clear roadmap" },
      { label: "Portfolio", a: "Often tutorial clones", b: "3 to 5 production-grade projects with real users" },
      { label: "Mentorship", a: "Mostly forums and search", b: "1-on-1 with senior engineers" },
      { label: "Interview prep", a: "Self-organised", b: "Weekly mock interviews with practising engineers" },
      { label: "Referrals", a: "Cold applications only", b: "Direct referrals to 50+ hiring partners" },
      { label: "Accountability", a: "Easy to stall or quit", b: "Mentor and cohort keep you on track" },
    ],
  },
  sections: [
    {
      heading: "Can you get a job as a self-taught developer?",
      body: [
        "Yes, self-taught developers do get hired, but the success rate is low and the timeline is long. The hard part is rarely the syntax. It is building a portfolio that proves your skills, preparing for interviews, and getting your application seen without referrals.",
      ],
    },
    {
      heading: "Why do most self-learners stall before getting hired?",
      body: [
        "Most self-learners stall because tutorials remove the friction where real learning happens. Watching someone build an app feels like progress, but it does not build the judgement you need to ship and debug your own project, present it in an interview, or get past the resume screen.",
      ],
    },
    {
      heading: "What does a bootcamp add that self-teaching does not?",
      body: [
        "A placement-focused bootcamp adds the parts that convert effort into offers: a real portfolio reviewed by engineers, structured interview practice, accountability, and direct referrals. At Coding Sharks, this is why most students receive a first offer within 4 to 8 weeks of finishing.",
      ],
    },
    {
      heading: "Who should still learn on their own?",
      body: [
        "Self-teaching is a fair choice if you already have strong fundamentals, a portfolio, and a network, or if you cannot commit to a live cohort schedule. The honest test is simple: if months of self-study have not produced interviews, the missing pieces are structure and placement support, not more tutorials.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is a coding bootcamp better than self-teaching?",
      a: "A coding bootcamp is better for getting hired quickly because it adds a real portfolio, interview practice, accountability, and referrals. Self-teaching can work but usually takes far longer and has a lower success rate. Coding Sharks reports a 91 to 96 percent placement rate.",
    },
    {
      q: "Can I get a developer job without a bootcamp?",
      a: "Yes, but it is harder and slower without a portfolio and referrals. If months of self-study have not led to interviews, a structured, placement-focused program is usually what closes the gap.",
    },
    {
      q: "How long does a bootcamp take to get you job-ready?",
      a: "At Coding Sharks, most students receive a first offer within 4 to 8 weeks of completing a program, which ranges from short focused tracks to multi-month programs depending on the goal.",
    },
  ],
  related: [
    { label: "placement outcomes", href: "/placements" },
    { label: "why Coding Sharks", href: "/why-coding-sharks" },
    { label: "all programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const FULL_STACK_COURSE: SeoLanding = {
  slug: "full-stack-development-course",
  eyebrow: "Full Stack Web Development",
  h1: "Full Stack Web Development Course with Placement",
  metaTitle: "Full Stack Web Development Course with Placement | Coding Sharks",
  metaDescription:
    "A live, placement-focused Full Stack course covering JavaScript, TypeScript, React, Next.js and Node.js, with 1-on-1 mentorship and placement support.",
  keywords: [
    "full stack web development course",
    "full stack developer course with placement",
    "MERN stack course India",
    "react next.js node course",
    "full stack course with mentorship",
  ],
  intro:
    "The Coding Sharks Full Stack Web Development program is a live, placement-focused course where you build and deploy real applications using JavaScript, TypeScript, React, Next.js, Node.js, and databases like PostgreSQL and MongoDB. The Full Stack track reports a 94 percent placement rate, and students graduate with 3 to 5 production-grade projects on GitHub.",
  stats: [
    { v: "94%", l: "Full Stack placement rate" },
    { v: "3–5", l: "real projects shipped" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What is full stack web development?",
      body: [
        "Full stack web development is building both the frontend (what users see) and the backend (servers, databases, and APIs) of an application. A full stack developer can take a product from idea to deployed software, which is why product companies value the skill set highly.",
      ],
    },
    {
      heading: "What does the Full Stack course cover?",
      body: [
        "The Coding Sharks Full Stack track covers the modern production stack end to end, with each concept shipped into a real project within days of learning it.",
      ],
      bullets: [
        "Frontend: JavaScript, TypeScript, React, Next.js",
        "Backend: Node.js, REST APIs, authentication",
        "Databases: PostgreSQL, MongoDB, Redis",
        "Deployment and tooling: AWS, Docker, Git",
      ],
    },
    {
      heading: "What projects will you build?",
      body: [
        "You build 3 to 5 production-grade applications with real databases, authentication, and live users, not tutorial clones. By graduation these sit on your GitHub as the portfolio interviewers actually open and review.",
      ],
    },
    {
      heading: "What are the placement outcomes?",
      body: [
        "The Full Stack program reports a 94 percent placement rate. Most students receive a first offer within 4 to 8 weeks of finishing, supported by mock interviews and direct referrals to 50+ hiring partners. Graduates work as full-time engineers at companies including Zepto, Razorpay, Swiggy, and Meesho.",
      ],
    },
    {
      heading: "Who is the Full Stack course for?",
      body: [
        "The course suits fresh graduates, career switchers, and self-taught developers who want a structured path into a software engineering role. No CS degree is required, and a pre-cohort prep module covers the fundamentals before Day 1.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor, see the live cohort format, and confirm the Full Stack track fits your goal. There is no payment required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the Full Stack course good for beginners?",
      a: "Yes. The Coding Sharks Full Stack course starts from fundamentals with a pre-cohort prep module, and 61 percent of students come from non-CS backgrounds. No prior coding experience is required.",
    },
    {
      q: "What technologies does the Full Stack course teach?",
      a: "The course covers JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, AWS, and Docker, all applied in real, deployed projects.",
    },
    {
      q: "Does the Full Stack course include placement support?",
      a: "Yes. The Full Stack track reports a 94 percent placement rate, with mock interviews, resume reviews, and direct referrals to 50+ hiring partners. Most students receive a first offer within 4 to 8 weeks.",
    },
  ],
  related: [
    { label: "Full Stack program details", href: "/courses/full-stack" },
    { label: "placement outcomes", href: "/placements" },
    { label: "coding bootcamp in Indore", href: "/coding-bootcamp-indore" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const AI_COURSE_INDIA: SeoLanding = {
  slug: "ai-course-india",
  eyebrow: "AI Agents & Automation",
  h1: "AI Engineering Course in India with Placement",
  metaTitle: "AI Course in India with Placement | AI Agents | Coding Sharks",
  metaDescription:
    "A live, placement-focused AI Agents course covering Python, LangChain, LLM APIs and vector databases, with 1-on-1 mentorship and placement support.",
  keywords: [
    "AI course India with placement",
    "AI engineering course",
    "AI agents course",
    "LLM and LangChain course India",
    "generative AI course with placement",
  ],
  intro:
    "The Coding Sharks AI Agents and Automation program is a live, placement-focused course that trains you to build and ship real AI products, not just notebooks. You work with Python, LangChain, LLM APIs, vector databases, and agentic workflows, with 1-on-1 mentorship from senior engineers. The program reports a 91 percent placement rate.",
  stats: [
    { v: "91%", l: "AI program placement rate" },
    { v: "3–5", l: "real AI projects shipped" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What is AI engineering?",
      body: [
        "AI engineering is building production software that uses large language models and machine learning, not just training models in notebooks. An AI engineer integrates LLM APIs, builds retrieval and agentic workflows, and handles cost, latency, and reliability. It is one of the fastest-growing roles in the Indian tech market.",
      ],
    },
    {
      heading: "What does the AI course cover?",
      body: [
        "The Coding Sharks AI track focuses on applied, production AI engineering.",
      ],
      bullets: [
        "Python for AI and automation",
        "LLM APIs and prompt design",
        "Retrieval-augmented generation (RAG) and vector databases",
        "Agentic workflows and tool use",
        "Deploying and operating AI features in production",
      ],
    },
    {
      heading: "What projects will you build?",
      body: [
        "You build 3 to 5 deployed AI applications such as RAG assistants and automation agents, with real data and real users. These become the portfolio you demo to hiring partners.",
      ],
    },
    {
      heading: "What are the placement outcomes?",
      body: [
        "The AI program reports a 91 percent placement rate, with mock interviews and direct referrals to 50+ hiring partners. Most students receive a first offer within 4 to 8 weeks of finishing.",
      ],
    },
    {
      heading: "Who is the AI course for?",
      body: [
        "The course suits developers and graduates who want to move into AI engineering, plus career switchers with solid fundamentals. A pre-cohort prep module covers the Python and programming basics before the program starts.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the AI track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the AI course good for beginners?",
      a: "The AI Agents and Automation course assumes basic programming, covered by a pre-cohort prep module. Complete beginners are guided through fundamentals first, so prior AI experience is not required.",
    },
    {
      q: "What technologies does the AI course teach?",
      a: "The course covers Python, LangChain, LLM APIs, vector databases, retrieval-augmented generation, and agentic workflows, all applied in real, deployed AI projects.",
    },
    {
      q: "Does the AI course include placement support?",
      a: "Yes. The AI program reports a 91 percent placement rate, with mock interviews, resume reviews, and direct referrals to 50+ hiring partners.",
    },
  ],
  related: [
    { label: "AI Agents & Automation details", href: "/courses/ai-agents" },
    { label: "placement outcomes", href: "/placements" },
    { label: "coding bootcamp in Indore", href: "/coding-bootcamp-indore" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const DATA_SCIENCE_COURSE_INDIA: SeoLanding = {
  slug: "data-science-course-india",
  eyebrow: "Data Science & Machine Learning",
  h1: "Data Science Course in India with Placement",
  metaTitle: "Data Science Course in India with Placement | Coding Sharks",
  metaDescription:
    "A live, placement-focused Data Science and ML course covering Python, ML and data pipelines, with 1-on-1 mentorship and placement support.",
  keywords: [
    "data science course India with placement",
    "data science bootcamp India",
    "machine learning course with placement",
    "python data science course",
    "data analytics and ML course India",
  ],
  intro:
    "The Coding Sharks Data Science and Machine Learning program is a live, placement-focused course where you build real, end-to-end data projects using Python, machine learning, and production data pipelines. The program reports a 92 percent placement rate, and students graduate with a portfolio of deployed data work.",
  stats: [
    { v: "92%", l: "Data Science placement rate" },
    { v: "3–5", l: "real data projects" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What does a data scientist do?",
      body: [
        "A data scientist turns raw data into decisions and products using statistics, machine learning, and engineering. The role spans cleaning and modelling data, building ML pipelines, and communicating results, and it is in steady demand across Indian product companies.",
      ],
    },
    {
      heading: "What does the Data Science course cover?",
      body: ["The Coding Sharks Data Science track covers the practical, job-ready stack."],
      bullets: [
        "Python for data analysis and automation",
        "Statistics and machine learning fundamentals",
        "Data cleaning, feature engineering, and pipelines",
        "Model building, evaluation, and deployment",
        "Real datasets and portfolio projects",
      ],
    },
    {
      heading: "What projects will you build?",
      body: [
        "You build 3 to 5 real data and ML projects with genuine datasets, from analysis to a deployed model or dashboard, so your portfolio shows applied skill rather than coursework.",
      ],
    },
    {
      heading: "What are the placement outcomes?",
      body: [
        "The Data Science program reports a 92 percent placement rate, supported by mock interviews and direct referrals to 50+ hiring partners. Most students receive a first offer within 4 to 8 weeks of finishing.",
      ],
    },
    {
      heading: "Who is the Data Science course for?",
      body: [
        "The course suits graduates, analysts, and career switchers who want a structured path into data science and machine learning. A pre-cohort prep module covers Python and fundamentals first.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the Data Science track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the Data Science course good for beginners?",
      a: "Yes. The course starts from fundamentals with a pre-cohort prep module covering Python and statistics, so prior data science experience is not required.",
    },
    {
      q: "What does the Data Science course teach?",
      a: "The course covers Python, statistics, machine learning, data cleaning and pipelines, and model building and deployment, applied to real datasets and portfolio projects.",
    },
    {
      q: "Does the Data Science course include placement support?",
      a: "Yes. The Data Science program reports a 92 percent placement rate, with mock interviews, resume reviews, and direct referrals to 50+ hiring partners.",
    },
  ],
  related: [
    { label: "Data Science & ML details", href: "/courses/data-science" },
    { label: "placement outcomes", href: "/placements" },
    { label: "coding bootcamp in Indore", href: "/coding-bootcamp-indore" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const BOOTCAMP_VS_COLLEGE: SeoLanding = {
  slug: "coding-bootcamp-vs-college-degree",
  eyebrow: "Bootcamp vs College Degree",
  h1: "Coding Bootcamp vs College Degree for a Tech Job",
  metaTitle: "Coding Bootcamp vs College Degree (2026) | For a Tech Job",
  metaDescription:
    "A clear, fair comparison of a coding bootcamp vs a college degree for getting a software job: time, practical skills, portfolio, and placement outcomes.",
  keywords: [
    "coding bootcamp vs college degree",
    "bootcamp vs degree for software job",
    "do you need a degree to be a developer",
    "coding bootcamp or college",
  ],
  intro:
    "A coding bootcamp and a college degree can both lead to a software job, but they optimise for different things. A degree gives broad theory over three to four years, while a placement-focused bootcamp gives job-ready skills, a real portfolio, and hiring referrals in months. For getting hired as a developer quickly, the deciding factor is demonstrated skill, which is what bootcamps are built to produce.",
  stats: [
    { v: "91–96%", l: "bootcamp placement rate" },
    { v: "Months", l: "vs 3–4 years for a degree" },
    { v: "3–5", l: "real projects shipped" },
    { v: "61%", l: "of students are non-CS" },
  ],
  comparison: {
    columns: ["College degree", "Coding Sharks bootcamp"],
    caption: "How the two paths compare for getting hired as a developer.",
    rows: [
      { label: "Time to job-ready", a: "3 to 4 years", b: "Months, focused on hiring" },
      { label: "Focus", a: "Broad theory and exams", b: "Job-ready, hands-on skills" },
      { label: "Portfolio", a: "Often limited", b: "3 to 5 production-grade projects" },
      { label: "Curriculum recency", a: "Updated slowly", b: "Updated every cohort" },
      { label: "Interview prep", a: "Rarely included", b: "Weekly mock interviews" },
      { label: "Placement support", a: "Varies widely", b: "Direct referrals to 50+ partners" },
    ],
  },
  sections: [
    {
      heading: "Do you need a degree to become a software developer?",
      body: [
        "No, a degree is not required to become a software developer. Product companies increasingly hire on demonstrated skill, which means a strong portfolio, the ability to pass technical interviews, and referrals. At Coding Sharks, 61 percent of students come from non-CS backgrounds and still get placed.",
      ],
    },
    {
      heading: "What does a degree give you that a bootcamp does not?",
      body: [
        "A degree gives broad computer-science theory, a recognised credential, and time to mature, which matters for some research and specialised roles. If your goal is deep theory or a credential-gated path, a degree has real value a bootcamp does not replace.",
      ],
    },
    {
      heading: "What does a bootcamp give you that a degree often does not?",
      body: [
        "A placement-focused bootcamp gives current, job-ready skills, a real portfolio, structured interview practice, and direct hiring referrals, in months rather than years. This is the gap that gets most candidates their first offer.",
      ],
    },
    {
      heading: "Can you combine both?",
      body: [
        "Yes, and many do. Students often use a bootcamp during or after a degree to convert theory into a portfolio and a job. The degree and the bootcamp solve different problems, so they work well together.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is a coding bootcamp better than a degree for getting a job?",
      a: "For getting hired as a developer quickly, a placement-focused bootcamp is usually faster because it produces a real portfolio, interview practice, and referrals in months. A degree adds broad theory and a credential over three to four years. Coding Sharks reports a 91 to 96 percent placement rate.",
    },
    {
      q: "Can I get a software job without a CS degree?",
      a: "Yes. Product companies hire on demonstrated skill, and 61 percent of Coding Sharks students come from non-CS backgrounds. A strong portfolio and interview preparation matter more than the degree itself.",
    },
    {
      q: "Should I do a bootcamp during my degree?",
      a: "Many students do. A bootcamp during or after a degree turns theory into a portfolio and a job, since the two paths solve different problems.",
    },
  ],
  related: [
    { label: "non-CS success at Coding Sharks", href: "/placements" },
    { label: "why Coding Sharks", href: "/why-coding-sharks" },
    { label: "all programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const NON_CS_BACKGROUND: SeoLanding = {
  slug: "non-cs-background",
  eyebrow: "Non-CS to Developer",
  h1: "From Non-CS Background to Software Engineer",
  metaTitle: "Non-CS to Software Engineer | No Degree Needed | Coding Sharks",
  metaDescription:
    "61% of Coding Sharks students come from non-CS backgrounds and get placed as software engineers.",
  keywords: [
    "non-CS to software engineer",
    "career change to tech without degree",
    "non technical background to developer",
    "switch career to coding India",
    "can non-CS get a software job",
  ],
  intro:
    "You do not need a computer science degree to become a software engineer. At Coding Sharks, 61 percent of students come from non-CS backgrounds such as sales, teaching, accounting, and operations, and they get placed as full-time engineers at product companies. What gets you hired is a real portfolio and interview skill, not the subject on your degree.",
  stats: [
    { v: "61%", l: "students from non-CS backgrounds" },
    { v: "91–96%", l: "placement rate" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "15,000+", l: "developers trained" },
  ],
  sections: [
    {
      heading: "Can someone from a non-CS background get a software job?",
      body: [
        "Yes. Product companies hire on demonstrated skill, not the title of your degree. A non-CS candidate with a strong portfolio, solid fundamentals, and good interview preparation routinely beats a CS graduate who only has theory. At Coding Sharks, the majority of placed students are non-CS.",
      ],
    },
    {
      heading: "Real non-CS success stories",
      body: [
        "These are real Coding Sharks graduates who switched from non-technical roles into software engineering.",
      ],
      bullets: [
        "Karan, an accountant, became a software engineer at CRED",
        "Divya, a teacher, became a React developer at Meesho",
        "Sneha, a BPO executive, became a frontend developer at Zepto",
        "Priya, a data entry operator, became a full stack developer at Swiggy",
      ],
    },
    {
      heading: "How does Coding Sharks help non-CS learners specifically?",
      body: [
        "Coding Sharks starts non-CS students at zero, with no assumed knowledge. A pre-cohort prep module covers fundamentals before Day 1, 1-on-1 mentorship catches the gaps a degree would normally fill, and the project-first format builds the portfolio that replaces a CS credential in interviews.",
      ],
    },
    {
      heading: "What background do you actually need?",
      body: [
        "You need commitment and time, not a technical degree. Most successful non-CS students can give 6 to 8 hours a day to the program. Domain knowledge from your previous field often becomes an advantage, since you understand real business problems engineers are hired to solve.",
      ],
    },
    {
      heading: "How do I start the switch?",
      body: [
        "Book a free demo session. You meet a mentor, see the live cohort, and get an honest assessment of whether a career switch into tech is realistic for your situation. There is no payment to attend.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I become a software engineer without a CS degree?",
      a: "Yes. 61 percent of Coding Sharks students come from non-CS backgrounds and get placed as software engineers. Product companies hire on demonstrated skill, so a real portfolio and interview preparation matter more than the degree.",
    },
    {
      q: "Is it too late to switch to tech from another career?",
      a: "It is rarely too late. Coding Sharks has placed career switchers from sales, teaching, accounting, and BPO roles. What matters is commitment and a structured path, not your starting point.",
    },
    {
      q: "Do I need maths or prior coding to start?",
      a: "No prior coding is required, and a pre-cohort prep module covers the fundamentals. Strong logical thinking helps more than advanced maths for most software roles.",
    },
  ],
  related: [
    { label: "placement stories", href: "/placements" },
    { label: "bootcamp vs college degree", href: "/coding-bootcamp-vs-college-degree" },
    { label: "all programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const FOR_FRESHERS: SeoLanding = {
  slug: "for-freshers",
  eyebrow: "For Freshers",
  h1: "Coding Course for Freshers with Placement",
  metaTitle: "Coding Course for Freshers in India with Placement | Coding Sharks",
  metaDescription:
    "A placement-focused coding program for freshers: learn in-demand skills, build real projects, prepare for interviews, and land your first software job.",
  keywords: [
    "coding course for freshers India",
    "first software job for freshers",
    "placement course for final year students",
    "fresher developer job India",
    "coding bootcamp for graduates",
  ],
  intro:
    "Coding Sharks helps freshers and final-year students land their first software engineering job. The programs are placement-focused and project-first, so you graduate with a real portfolio and interview practice instead of only a certificate. Across cohorts, the institute reports a 91 to 96 percent placement rate, with most students getting a first offer within 4 to 8 weeks.",
  stats: [
    { v: "91–96%", l: "placement rate" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "3–5", l: "portfolio projects" },
    { v: "50+", l: "hiring partners" },
  ],
  sections: [
    {
      heading: "Can freshers get placed as software engineers?",
      body: [
        "Yes. Freshers get placed when they can prove skill through projects and clear technical interviews. The common reason freshers struggle is not ability, it is the lack of a portfolio, interview practice, and referrals. Coding Sharks is built to provide exactly those.",
      ],
    },
    {
      heading: "What should a fresher learn to get a tech job?",
      body: [
        "A fresher should pick one strong track and go deep, rather than touching everything shallowly. The reliable paths into a first job are full stack web development, data science, or AI engineering, each paired with data structures and algorithms for interviews.",
      ],
    },
    {
      heading: "How does Coding Sharks prepare freshers?",
      body: [
        "Coding Sharks runs a project-first curriculum where you ship real software from week one, weekly mock interviews starting early, and 1-on-1 mentorship from senior engineers. The placement team then connects you to 50+ hiring partners through direct referrals.",
      ],
    },
    {
      heading: "What will a fresher have by graduation?",
      body: [
        "By graduation you will have 3 to 5 production-grade projects on GitHub, a resume reviewed by engineers, and mock-interview practice for the real rounds. That package is what turns a fresher application into an interview and an offer.",
      ],
    },
    {
      heading: "How do freshers join?",
      body: [
        "Book a free demo session. You meet a mentor, see the live cohort format, and get an honest assessment of which track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is Coding Sharks good for freshers with no experience?",
      a: "Yes. Coding Sharks is built for freshers and career starters. A pre-cohort prep module covers fundamentals, and the project-first format gives you the portfolio and interview practice freshers usually lack.",
    },
    {
      q: "How do freshers get their first software job?",
      a: "Freshers get hired by proving skill through real projects and clearing technical interviews. Coding Sharks provides a portfolio, weekly mock interviews, and direct referrals to 50+ hiring partners, with most students placed within 4 to 8 weeks.",
    },
    {
      q: "Can final-year students join?",
      a: "Yes. Final-year students and recent graduates are a core part of Coding Sharks cohorts, and the schedule and placement support are designed around landing a first job.",
    },
  ],
  related: [
    { label: "placement outcomes", href: "/placements" },
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "non-CS background path", href: "/non-cs-background" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const DSA_COURSE: SeoLanding = {
  slug: "dsa-course-for-placements",
  eyebrow: "DSA Mastery",
  h1: "DSA Course for Placements and Coding Interviews",
  metaTitle: "DSA Course for Placements | Crack Coding Interviews | Coding Sharks",
  metaDescription:
    "A focused Data Structures and Algorithms course built for product-company interviews.",
  keywords: [
    "DSA course for placements",
    "data structures and algorithms course",
    "coding interview preparation course India",
    "crack coding interview DSA",
    "DSA course with mentorship",
  ],
  intro:
    "The Coding Sharks DSA Mastery program prepares you to clear the coding rounds at product companies. Instead of grinding random problems, you learn the roughly 20 patterns that cover the majority of interview questions, practice the right problem set, and get 1-on-1 mentorship. The DSA track reports a 94 percent placement rate.",
  stats: [
    { v: "94%", l: "DSA track placement rate" },
    { v: "~20", l: "core patterns that cover most questions" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What is DSA and why does it matter for interviews?",
      body: [
        "Data Structures and Algorithms (DSA) is the study of organising data and solving problems efficiently. It matters because product companies use DSA coding rounds as the first filter in hiring. Clearing that round is what gets you to the rest of the interview.",
      ],
    },
    {
      heading: "Why learn patterns instead of random problems?",
      body: [
        "About 20 patterns, such as sliding window, two pointers, BFS and DFS, binary search, and dynamic programming, cover the majority of interview questions. Learning patterns lets you solve a problem you have never seen before, which random problem-grinding does not teach.",
      ],
    },
    {
      heading: "What does the DSA course cover?",
      body: ["The Coding Sharks DSA track is structured around interview-ready patterns and practice."],
      bullets: [
        "Arrays, strings, hashing, sliding window, two pointers",
        "Stacks, queues, linked lists, recursion",
        "Trees, graphs, BFS and DFS traversals",
        "Dynamic programming and greedy techniques",
        "Mock interviews and timed problem practice",
      ],
    },
    {
      heading: "What are the placement outcomes?",
      body: [
        "The DSA track reports a 94 percent placement rate, supported by mock interviews with practising engineers and direct referrals to 50+ hiring partners. Most students receive a first offer within 4 to 8 weeks of finishing.",
      ],
    },
    {
      heading: "Who is the DSA course for?",
      body: [
        "The course suits students and working developers preparing for product-company interviews, plus anyone who keeps failing coding rounds despite knowing the basics. Strong fundamentals help, but the program builds the pattern recognition that interviews test.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the DSA track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "How many DSA problems should I solve for interviews?",
      a: "Quality beats quantity. Around 250 to 300 well-chosen problems covering the core patterns is enough for most product-company interviews, which is how the Coding Sharks DSA track is structured.",
    },
    {
      q: "How long does it take to prepare DSA for placements?",
      a: "With a focused, pattern-based approach and consistent practice, a few months is usually enough to be interview-ready. The Coding Sharks DSA track is built around this timeline with mock interviews throughout.",
    },
    {
      q: "Is the DSA course good for product-company interviews?",
      a: "Yes. The DSA track focuses on the patterns and problem types asked by product companies, with mock interviews and referrals to 50+ hiring partners. The track reports a 94 percent placement rate.",
    },
  ],
  related: [
    { label: "DSA Mastery details", href: "/courses/dsa-mastery" },
    { label: "System Design course", href: "/system-design-course" },
    { label: "placement outcomes", href: "/placements" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const SYSTEM_DESIGN_COURSE: SeoLanding = {
  slug: "system-design-course",
  eyebrow: "System Design & DSA",
  h1: "System Design Course for Engineers",
  metaTitle: "System Design Course India | Crack SDE Interviews | Coding Sharks",
  metaDescription:
    "A practical System Design and DSA masterclass for software engineers. Learn to design scalable systems and clear senior interview rounds with 1-on-1 mentorship.",
  keywords: [
    "system design course India",
    "system design interview preparation",
    "scalable systems course",
    "SDE interview system design",
    "system design and DSA course",
  ],
  intro:
    "The Coding Sharks System Design and DSA Masterclass trains you to design scalable systems and clear the design rounds that decide mid and senior software roles. You learn to reason about requirements, estimate scale, and make trade-offs, with 1-on-1 mentorship from senior engineers. The track reports a 96 percent placement rate.",
  stats: [
    { v: "96%", l: "System Design track placement rate" },
    { v: "4–8 wks", l: "to first offer" },
    { v: "1-on-1", l: "mentorship from senior engineers" },
    { v: "50+", l: "hiring partners" },
  ],
  sections: [
    {
      heading: "What is system design and why is it tested?",
      body: [
        "System design is the practice of architecting software that scales, stays reliable, and handles real-world load. It is tested because, beyond writing code, companies need engineers who can reason about databases, caching, queues, and trade-offs. The design round often decides mid and senior offers.",
      ],
    },
    {
      heading: "What does the System Design course cover?",
      body: ["The masterclass covers the building blocks and the interview method together."],
      bullets: [
        "Requirements clarification and back-of-the-envelope estimation",
        "Databases, indexing, caching, and message queues",
        "Scaling, sharding, replication, and consistency trade-offs",
        "Designing real systems (URL shortener, feed, rate limiter, and more)",
        "DSA refresh plus mock design interviews",
      ],
    },
    {
      heading: "What separates a strong design-round candidate?",
      body: [
        "Strong candidates clarify requirements and estimate scale before drawing anything, then stress-test their own design for failure modes. The Coding Sharks masterclass drills this method, not just the components, which is what interviewers actually score.",
      ],
    },
    {
      heading: "What are the placement outcomes?",
      body: [
        "The System Design and DSA track reports a 96 percent placement rate, the highest across Coding Sharks programs, supported by mock interviews and direct referrals to 50+ hiring partners.",
      ],
    },
    {
      heading: "Who is the System Design course for?",
      body: [
        "The course suits working developers and strong final-year students targeting mid to senior software roles, or anyone who clears coding rounds but struggles with design interviews.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the System Design track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long should I prepare for system design interviews?",
      a: "For a first product-company role, 6 to 8 weeks of consistent practice covering core concepts and classic design problems is usually enough. The Coding Sharks masterclass is built around this with mock interviews throughout.",
    },
    {
      q: "Do freshers need system design?",
      a: "Freshers usually get a lighter version, with most weight on DSA and fundamentals, but a basic design discussion is increasingly common even at entry level, so a working familiarity helps.",
    },
    {
      q: "What does the system design course include?",
      a: "It covers estimation, databases, caching, queues, scaling and trade-offs, real system design exercises, a DSA refresh, and mock design interviews, with referrals to 50+ hiring partners.",
    },
  ],
  related: [
    { label: "System Design & DSA details", href: "/courses/system-design" },
    { label: "DSA course for placements", href: "/dsa-course-for-placements" },
    { label: "placement outcomes", href: "/placements" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const DEVELOPER_SALARY_INDIA: SeoLanding = {
  slug: "software-developer-salary-india",
  eyebrow: "Career Data",
  h1: "Software Developer Salary in India (2026)",
  metaTitle: "Software Developer Salary in India 2026 | By Role & Experience",
  metaDescription:
    "Illustrative software developer salary ranges in India for 2026 by role and experience, plus what raises a developer's package.",
  keywords: [
    "software developer salary India 2026",
    "full stack developer salary India",
    "fresher developer salary India",
    "data scientist salary India",
    "AI engineer salary India",
  ],
  intro:
    "Software developer salaries in India vary widely by role, skills, and city, but the direction is clear: practical, in-demand skills command a premium. The ranges below are illustrative composites drawn from public salary sources and placement data, meant to show relative differences rather than exact offers. For context, Coding Sharks graduates see an average first package of ₹8 to 15 LPA and a top package above ₹21 LPA.",
  stats: [
    { v: "₹4–8 LPA", l: "typical fresher developer range" },
    { v: "₹8–15 LPA", l: "Coding Sharks average first package" },
    { v: "₹21L+", l: "Coding Sharks top package" },
    { v: "+30%", l: "premium for AI-fluent developers (directional)" },
  ],
  sections: [
    {
      heading: "What is the average software developer salary in India in 2026?",
      body: [
        "A fresher software developer in India typically earns in the ₹4 to 8 LPA range, while developers with 2 to 4 years of experience commonly reach ₹10 to 20 LPA at product companies. These are illustrative ranges. Actual offers depend heavily on skills, the company tier, and interview performance.",
      ],
    },
    {
      heading: "Developer salary by role (illustrative ranges)",
      body: ["Different roles and stacks command different ranges. The figures below are directional."],
      bullets: [
        "Full Stack Developer: ₹6 to 18 LPA depending on experience and stack",
        "Backend Engineer: ₹7 to 22 LPA",
        "Data Scientist / ML Engineer: ₹8 to 24 LPA",
        "AI Engineer: ₹9 to 28 LPA, with a premium for production AI skills",
        "Frontend Developer: ₹5 to 16 LPA",
      ],
    },
    {
      heading: "Developer salary by experience",
      body: [
        "Salaries rise sharply with demonstrated skill in the first few years. A typical path at product companies looks like ₹4 to 8 LPA as a fresher, ₹10 to 20 LPA at 2 to 4 years, and ₹25 LPA and above at senior levels, with strong variation by company and location.",
      ],
    },
    {
      heading: "What raises a developer's salary the most?",
      body: [
        "The biggest levers are a strong portfolio of real projects, depth in an in-demand stack, data structures and system design skill for interviews, and increasingly, fluency with AI tooling. Engineers who can ship and explain trade-offs out-earn those who only complete courses.",
      ],
    },
    {
      heading: "How does a placement-focused program affect salary?",
      body: [
        "A structured, placement-focused program shortens the path to a first offer and improves it through interview preparation and referrals. Coding Sharks graduates see an average first package of ₹8 to 15 LPA, with most receiving an offer within 4 to 8 weeks of finishing.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the starting salary of a software developer in India?",
      a: "A fresher software developer in India typically starts in the ₹4 to 8 LPA range, though product companies and strong portfolios push this higher. Coding Sharks graduates see an average first package of ₹8 to 15 LPA. These are illustrative ranges, not guarantees.",
    },
    {
      q: "Which developer role pays the most in India?",
      a: "AI engineering and data science roles tend to sit at the higher end, with directional ranges of ₹9 to 28 LPA, because production AI and ML skills are in short supply. Backend and full stack roles also pay strongly with experience.",
    },
    {
      q: "How can I increase my developer salary?",
      a: "Build a strong portfolio of real projects, go deep in one in-demand stack, prepare seriously for DSA and system design interviews, and develop AI tooling fluency. Demonstrated skill and interview performance move packages more than years alone.",
    },
  ],
  related: [
    { label: "placement outcomes", href: "/placements" },
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "AI course", href: "/ai-course-india" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const ONLINE_CODING_COURSE_INDIA: SeoLanding = {
  slug: "online-coding-course-india",
  eyebrow: "Online · Live Cohort",
  h1: "Online Coding Course in India with Placement Support",
  metaTitle: "Online Coding Course in India | Live + Placement | Coding Sharks",
  metaDescription:
    "Live online coding courses in India with 1-on-1 mentorship and placement support. Learn Full Stack, AI, and Data Science from anywhere. Book a free demo.",
  keywords: [
    "online coding course India",
    "online full stack developer course India",
    "learn coding online India",
    "online programming course with placement",
    "best online coding classes India",
  ],
  intro:
    "Coding Sharks runs live, online coding courses for students across India, with the same cohort, 1-on-1 mentorship, and placement support as the in-person program. You learn Full Stack Web Development, AI, Data Science, DSA, and System Design from anywhere, building real projects with senior-engineer mentors. The institute reports a 91 to 96 percent placement rate.",
  stats: [
    { v: "91–96%", l: "placement rate" },
    { v: "Live", l: "online cohorts (not recorded-only)" },
    { v: "1-on-1", l: "mentorship" },
    { v: "50+", l: "hiring partners" },
  ],
  sections: [
    {
      heading: "Are online coding courses as good as offline?",
      body: [
        "Yes, a live online coding course is as effective as offline when it keeps the cohort, mentorship, and projects live rather than just recorded videos. Coding Sharks runs real-time online classes with code reviews and 1-on-1 mentor sessions, so remote learners get the same structure and accountability as in-person students.",
      ],
    },
    {
      heading: "What can you learn in the online course?",
      body: ["You can learn any of the Coding Sharks tracks fully online."],
      bullets: [
        "Full Stack Web Development (JavaScript, TypeScript, React, Next.js, Node.js)",
        "AI Agents and Automation (Python, LangChain, LLM APIs)",
        "Data Science and Machine Learning",
        "DSA Mastery and System Design for interviews",
      ],
    },
    {
      heading: "How do the live online classes work?",
      body: [
        "Classes run live with your cohort on a fixed schedule, and every session is recorded and available within 24 hours so you never fall behind. Workshops, code reviews, and mentor sessions stay live, and you ship a project every week.",
      ],
    },
    {
      heading: "Do online students get the same placement support?",
      body: [
        "Yes. Online students get the same mock interviews, resume reviews, and direct referrals to 50+ hiring partners. Remote work has opened metro and global roles to learners anywhere in India, so location is no longer a barrier.",
      ],
    },
    {
      heading: "How do I join the online cohort?",
      body: [
        "Book a free demo session to meet a mentor and see how the live online cohort works. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the online coding course live or recorded?",
      a: "The Coding Sharks online coding course is live with your cohort, not recorded-only. Every live session is also recorded and available within 24 hours, while workshops, code reviews, and 1-on-1 mentor sessions stay fully live.",
    },
    {
      q: "Can I get placed through an online coding course?",
      a: "Yes. Online students at Coding Sharks receive the same placement support as in-person students, including mock interviews, resume reviews, and referrals to 50+ hiring partners. The institute reports a 91 to 96 percent placement rate.",
    },
    {
      q: "Do I need to be in Indore to join?",
      a: "No. The online cohort is open to students anywhere in India. You join the same live classes and mentorship remotely, and many graduates work remote roles for companies based in metros or abroad.",
    },
  ],
  related: [
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "MERN Stack course", href: "/mern-stack-course" },
    { label: "all programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const MERN_STACK_COURSE: SeoLanding = {
  slug: "mern-stack-course",
  eyebrow: "MERN Stack",
  h1: "MERN Stack Course with Placement Support",
  metaTitle: "MERN Stack Course with Placement | MongoDB, Express, React, Node",
  metaDescription:
    "A live MERN stack course covering MongoDB, Express, React, and Node.js with real projects, 1-on-1 mentorship, and placement support. Book a free demo.",
  keywords: [
    "MERN stack course",
    "MERN stack developer course",
    "MERN stack course with placement",
    "MongoDB Express React Node course",
    "full stack MERN course India",
  ],
  intro:
    "The MERN stack is a JavaScript-based web development stack made of MongoDB, Express, React, and Node.js, and Coding Sharks teaches it inside a live, placement-focused Full Stack program. You build and deploy real MERN applications with 1-on-1 mentorship from senior engineers, and the track is backed by a 91 to 96 percent placement rate.",
  stats: [
    { v: "MERN", l: "MongoDB · Express · React · Node" },
    { v: "91–96%", l: "placement rate" },
    { v: "3–5", l: "deployed projects" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What is the MERN stack?",
      body: [
        "The MERN stack is a set of four JavaScript technologies used to build complete web applications: MongoDB for the database, Express for the backend framework, React for the frontend, and Node.js for the server runtime. Because all four use JavaScript, you build the whole application in one language.",
      ],
    },
    {
      heading: "What do you learn in the MERN course?",
      body: ["The course takes you from fundamentals to deployed, full stack MERN applications."],
      bullets: [
        "JavaScript and TypeScript fundamentals",
        "React and Next.js for the frontend",
        "Node.js and Express for REST APIs",
        "MongoDB data modeling, plus PostgreSQL for relational data",
        "Authentication, deployment, and real-world project architecture",
      ],
    },
    {
      heading: "What projects will I build?",
      body: [
        "You build 3 to 5 production-grade MERN projects with real users, such as an inventory API, a job board, or a full social or e-commerce app. Each project includes authentication, a database, and a live deployed URL, which is exactly what interviewers review.",
      ],
    },
    {
      heading: "Does the MERN course include placement support?",
      body: [
        "Yes. The MERN course sits inside the Full Stack track, which includes mock interviews, resume reviews, and direct referrals to 50+ hiring partners, with a reported 91 to 96 percent placement rate.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the MERN and Full Stack track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the MERN stack used for?",
      a: "The MERN stack is used to build complete web applications using JavaScript end to end. MongoDB stores data, Express and Node.js run the backend and APIs, and React builds the frontend, so you can build and deploy a full app with a single language.",
    },
    {
      q: "Is MERN stack good for getting a job in India?",
      a: "Yes. MERN and JavaScript skills target the deepest web development job market in India. Coding Sharks teaches MERN inside a placement-focused Full Stack track with mock interviews and referrals to 50+ hiring partners.",
    },
    {
      q: "Do I need experience to join the MERN course?",
      a: "No prior experience is required. The course starts from JavaScript fundamentals, and a pre-cohort prep module plus 1-on-1 mentorship bring beginners up to speed before the harder topics.",
    },
  ],
  related: [
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "Web Development course", href: "/web-development-course" },
    { label: "online coding course", href: "/online-coding-course-india" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const WEB_DEVELOPMENT_COURSE: SeoLanding = {
  slug: "web-development-course",
  eyebrow: "Web Development",
  h1: "Web Development Course in India with Placement",
  metaTitle: "Web Development Course in India | Frontend + Backend | Coding Sharks",
  metaDescription:
    "A live, placement-focused web development course covering frontend and backend with real projects and 1-on-1 mentorship. Build and deploy full apps. Free demo.",
  keywords: [
    "web development course",
    "web development course India",
    "web development course with placement",
    "frontend and backend course",
    "full stack web development course",
  ],
  intro:
    "Coding Sharks offers a live web development course in India that teaches both the frontend a user sees and the backend that powers it, so you graduate as a full stack web developer. You build and deploy real applications with 1-on-1 mentorship, and the program is backed by a 91 to 96 percent placement rate and referrals to 50+ hiring partners.",
  stats: [
    { v: "Frontend", l: "+ backend (full stack)" },
    { v: "91–96%", l: "placement rate" },
    { v: "3–5", l: "deployed projects" },
    { v: "50+", l: "hiring partners" },
  ],
  sections: [
    {
      heading: "What is web development?",
      body: [
        "Web development is the work of building websites and web applications, split into frontend (the interface users interact with) and backend (the server, database, and logic behind it). A full stack web developer handles both, which is what most companies hiring for web roles want.",
      ],
    },
    {
      heading: "Frontend or backend, which should you learn?",
      body: [
        "Learn both, because companies hire web developers who can own a feature end to end. The Coding Sharks course starts with frontend (HTML, CSS, JavaScript, React, Next.js), then moves to backend (Node.js, Express, databases), so you can build a complete application yourself.",
      ],
    },
    {
      heading: "What does the web development course cover?",
      body: ["The curriculum is built around shipping real, deployed web applications."],
      bullets: [
        "HTML, CSS, Tailwind, and responsive design",
        "JavaScript, TypeScript, React, and Next.js",
        "Node.js, Express, REST APIs, and authentication",
        "PostgreSQL and MongoDB databases",
        "Deployment, Git, and real project workflows",
      ],
    },
    {
      heading: "Does it include placement support?",
      body: [
        "Yes. The web development course includes mock interviews, resume and portfolio reviews, and direct referrals to 50+ hiring partners, with a reported 91 to 96 percent placement rate.",
      ],
    },
    {
      heading: "How do I start?",
      body: [
        "Book a free demo session to meet a mentor and see the live cohort. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is a web development course?",
      a: "A web development course teaches you to build websites and web applications, covering frontend (HTML, CSS, JavaScript, React) and backend (Node.js, databases, APIs). The Coding Sharks course covers both as a full stack program with real projects and placement support.",
    },
    {
      q: "How long does a web development course take?",
      a: "A focused web development course typically takes a few months of consistent daily practice to reach job-ready level. At Coding Sharks, most students receive a first offer within 4 to 8 weeks of completing the program.",
    },
    {
      q: "Can a beginner join a web development course?",
      a: "Yes. The Coding Sharks web development course starts from fundamentals, and 61 percent of placed students come from non-CS backgrounds. No prior coding experience or CS degree is required.",
    },
  ],
  related: [
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "MERN Stack course", href: "/mern-stack-course" },
    { label: "online coding course", href: "/online-coding-course-india" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const CODING_COURSE_AFTER_12TH: SeoLanding = {
  slug: "coding-course-after-12th",
  eyebrow: "After 12th",
  h1: "Coding Course After 12th: Start a Tech Career",
  metaTitle: "Coding Course After 12th | Start a Tech Career | Coding Sharks",
  metaDescription:
    "The best coding course after 12th for any stream. Learn job-ready software skills, build real projects, and get placement support. No CS degree needed. Free demo.",
  keywords: [
    "coding course after 12th",
    "best course after 12th for coding",
    "programming course after 12th",
    "software course after 12th",
    "coding classes after 12th India",
  ],
  intro:
    "After 12th, from any stream, you can start a software career through a placement-focused coding course without first completing a CS degree. Coding Sharks teaches job-ready skills in Full Stack, AI, and Data Science with 1-on-1 mentorship and real projects, and 61 percent of placed students come from non-CS backgrounds. The institute reports a 91 to 96 percent placement rate.",
  stats: [
    { v: "Any stream", l: "no CS degree required" },
    { v: "61%", l: "placed students are non-CS" },
    { v: "91–96%", l: "placement rate" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "Can I learn coding after 12th from any stream?",
      body: [
        "Yes, you can learn coding after 12th from any stream, including commerce and arts, not just science. Companies hire on demonstrated skills and projects, not your 12th stream. A pre-cohort prep module covers fundamentals so beginners start from zero comfortably.",
      ],
    },
    {
      heading: "Which coding course is best after 12th?",
      body: [
        "Full Stack Web Development is the best first coding course after 12th for most students, because it covers the deepest job market and lets you build complete applications. If your interest is data or AI, the Data Science or AI track is a strong alternative.",
      ],
    },
    {
      heading: "Do I need maths or a CS background?",
      body: [
        "No, you do not need strong maths or a CS background for most software roles, especially web development. Logical thinking matters more than advanced maths. Data Science and AI use more maths, and the program builds that gradually for interested students.",
      ],
    },
    {
      heading: "How long until I can get a job?",
      body: [
        "With consistent daily practice, most students become job-ready in several months. At Coding Sharks, most students receive a first offer within 4 to 8 weeks of completing the program, supported by mock interviews and referrals to 50+ hiring partners.",
      ],
    },
    {
      heading: "How do I start after 12th?",
      body: [
        "Book a free demo session with a mentor. You and your parents can see the live cohort, ask about the curriculum and placement support, and decide with a clear picture. No payment is required to attend.",
      ],
    },
  ],
  faqs: [
    {
      q: "Which coding course is best after 12th?",
      a: "Full Stack Web Development is the best coding course after 12th for most students, because it has the deepest job market and teaches you to build complete applications. Data Science and AI are strong alternatives if your interest is data rather than web development.",
    },
    {
      q: "Can a commerce or arts student learn coding after 12th?",
      a: "Yes. Commerce and arts students can learn coding after 12th and get hired as developers. Companies evaluate skills and projects, not your stream, and 61 percent of placed Coding Sharks students come from non-CS backgrounds.",
    },
    {
      q: "Do I need a degree to get a coding job after 12th?",
      a: "No, a degree is not strictly required for many software roles. A strong portfolio of real projects and good interview performance matter most. Many developers get hired on skills, and a placement-focused program with referrals shortens the path.",
    },
  ],
  related: [
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "for freshers", href: "/for-freshers" },
    { label: "non-CS background", href: "/non-cs-background" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const DATA_ANALYTICS_COURSE: SeoLanding = {
  slug: "data-analytics-course-india",
  eyebrow: "Data Analytics",
  h1: "Data Analytics Course in India with Placement",
  metaTitle: "Data Analytics Course in India | SQL, Python, Power BI | Coding Sharks",
  metaDescription:
    "A live, placement-focused data analytics course covering Excel, SQL, Python, and Power BI with real projects and 1-on-1 mentorship. Book a free demo.",
  keywords: [
    "data analytics course",
    "data analytics course India",
    "data analyst course with placement",
    "SQL Power BI course",
    "business analytics course India",
  ],
  intro:
    "Coding Sharks offers a live, placement-focused data analytics course that trains you to turn raw data into business decisions using Excel, SQL, Python, and Power BI. You work on real datasets with 1-on-1 mentorship from practitioners, build a portfolio of dashboards and analyses, and get placement support backed by a 91 to 96 percent placement rate.",
  stats: [
    { v: "SQL · Python", l: "Excel · Power BI" },
    { v: "91–96%", l: "placement rate" },
    { v: "Real", l: "datasets and dashboards" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What is data analytics?",
      body: [
        "Data analytics is the practice of examining data to find patterns and answer business questions, then presenting those findings clearly. A data analyst cleans data, runs queries, builds dashboards, and helps teams make decisions, which is one of the most accessible entry points into a data career.",
      ],
    },
    {
      heading: "What tools and skills does the course cover?",
      body: ["The course is built around the tools employers actually use for analytics."],
      bullets: [
        "Excel for quick analysis and reporting",
        "SQL for querying databases",
        "Python (Pandas) for data cleaning and analysis",
        "Power BI and visualization for dashboards",
        "Statistics and storytelling with data",
      ],
    },
    {
      heading: "Data analyst vs data scientist, which should I pick?",
      body: [
        "Choose data analytics if you want a faster, more accessible entry into data work without heavy maths, and data science if you want to build machine learning models. Analytics focuses on querying, dashboards, and insight, while data science adds statistics and ML. Many analysts move into data science later.",
      ],
    },
    {
      heading: "Does the analytics course include placement support?",
      body: [
        "Yes. The data analytics course includes mock interviews, portfolio and resume reviews, and direct referrals to 50+ hiring partners, with a reported 91 to 96 percent placement rate.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the data analytics track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "What does a data analytics course teach?",
      a: "A data analytics course teaches you to clean, query, analyze, and visualize data using tools like Excel, SQL, Python, and Power BI. The Coding Sharks course adds statistics, real-dataset projects, and placement support so you graduate job-ready.",
    },
    {
      q: "Do I need coding for data analytics?",
      a: "You need some coding, mainly SQL and basic Python, but far less than software engineering. Data analytics is one of the most accessible data roles, and the Coding Sharks course starts from fundamentals for beginners.",
    },
    {
      q: "Is data analytics a good career in India?",
      a: "Yes. Data analytics is a strong, growing career in India, with demand across product companies, startups, and enterprises. It is also a common stepping stone into data science and other data roles.",
    },
  ],
  related: [
    { label: "Data Science course", href: "/data-science-course-india" },
    { label: "Machine Learning course", href: "/machine-learning-course" },
    { label: "Python course", href: "/python-programming-course" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const PYTHON_COURSE: SeoLanding = {
  slug: "python-programming-course",
  eyebrow: "Python",
  h1: "Python Programming Course with Placement",
  metaTitle: "Python Programming Course | Data, AI & Automation | Coding Sharks",
  metaDescription:
    "A live Python programming course from fundamentals to data, AI, and automation, with real projects, 1-on-1 mentorship, and placement support. Book a free demo.",
  keywords: [
    "python course",
    "python programming course",
    "python course with placement",
    "python for data science course",
    "learn python India",
  ],
  intro:
    "Coding Sharks offers a live Python programming course that takes you from fundamentals to real applications in data science, AI, and automation. Python is one of the most beginner-friendly languages and the dominant choice for data and AI, and the course pairs it with 1-on-1 mentorship, real projects, and placement support backed by a 91 to 96 percent placement rate.",
  stats: [
    { v: "Python", l: "data · AI · automation" },
    { v: "91–96%", l: "placement rate" },
    { v: "Beginner", l: "friendly start" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "Why learn Python?",
      body: [
        "Python is the best first language if your goal is data science, AI, machine learning, or automation, and it is one of the easiest languages for a complete beginner to read and write. Its simple syntax lets you focus on logic, and it powers most data and AI work in the industry.",
      ],
    },
    {
      heading: "What does the Python course cover?",
      body: ["The course goes from core Python to applied, job-ready skills."],
      bullets: [
        "Python fundamentals: data types, loops, functions, OOP",
        "Working with data using Pandas and NumPy",
        "Automation and scripting for real tasks",
        "Foundations for data science, ML, and AI",
        "Building and deploying real Python projects",
      ],
    },
    {
      heading: "What can I do after the Python course?",
      body: [
        "After the Python course you can move into data analytics, data science, machine learning, AI engineering, or backend automation roles. Python is the shared foundation for all of these, so it opens several career paths from one language.",
      ],
    },
    {
      heading: "Does it include placement support?",
      body: [
        "Yes. The Python course includes mock interviews, resume and portfolio reviews, and direct referrals to 50+ hiring partners, with a reported 91 to 96 percent placement rate.",
      ],
    },
    {
      heading: "How do I start?",
      body: [
        "Book a free demo session to meet a mentor and see the live cohort. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is Python good for beginners?",
      a: "Yes, Python is one of the best languages for beginners. Its simple, readable syntax lets you focus on problem-solving instead of complex rules, which is why it is widely recommended as a first language, especially for data and AI careers.",
    },
    {
      q: "What jobs can I get after a Python course?",
      a: "After a Python course you can target roles in data analytics, data science, machine learning, AI engineering, and backend automation. Python is the shared foundation across these fields, so one language opens several career paths.",
    },
    {
      q: "Do I need maths to learn Python?",
      a: "No, you do not need advanced maths to learn Python itself or to do automation and basic analytics. Data science and machine learning use more maths, and the Coding Sharks program builds that gradually for interested students.",
    },
  ],
  related: [
    { label: "Data Science course", href: "/data-science-course-india" },
    { label: "Data Analytics course", href: "/data-analytics-course-india" },
    { label: "AI course", href: "/ai-course-india" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const MACHINE_LEARNING_COURSE: SeoLanding = {
  slug: "machine-learning-course",
  eyebrow: "Machine Learning",
  h1: "Machine Learning Course in India with Placement",
  metaTitle: "Machine Learning Course in India | Python & ML | Coding Sharks",
  metaDescription:
    "A live machine learning course covering Python, ML algorithms, and model building with real projects, 1-on-1 mentorship, and placement support. Book a free demo.",
  keywords: [
    "machine learning course",
    "machine learning course India",
    "ML course with placement",
    "machine learning and AI course",
    "python machine learning course",
  ],
  intro:
    "Coding Sharks offers a live machine learning course that teaches you to build, train, and evaluate models using Python and the core ML algorithms, as part of its Data Science and ML track. You work on real datasets with 1-on-1 mentorship, build an ML project portfolio, and get placement support backed by a 91 to 96 percent placement rate.",
  stats: [
    { v: "Python", l: "+ ML algorithms" },
    { v: "91–96%", l: "placement rate" },
    { v: "Real", l: "model projects" },
    { v: "1-on-1", l: "mentorship" },
  ],
  sections: [
    {
      heading: "What is machine learning?",
      body: [
        "Machine learning is a branch of AI where systems learn patterns from data to make predictions, instead of following hand-written rules. It powers recommendations, fraud detection, forecasting, and more, and is one of the highest-paying skill areas in the Indian tech market.",
      ],
    },
    {
      heading: "What does the machine learning course cover?",
      body: ["The course covers the practical ML workflow end to end."],
      bullets: [
        "Python, Pandas, and NumPy for data work",
        "Supervised and unsupervised learning algorithms",
        "Model training, evaluation, and tuning",
        "Feature engineering and real datasets",
        "An ML project portfolio for interviews",
      ],
    },
    {
      heading: "How much maths do I need for machine learning?",
      body: [
        "You need a working grasp of statistics, probability, and basic linear algebra for machine learning, but you do not need to be a maths expert to start. The Coding Sharks course builds the required maths alongside the practical skills, so motivated beginners can follow.",
      ],
    },
    {
      heading: "Does the ML course include placement support?",
      body: [
        "Yes. The machine learning track includes mock interviews, portfolio reviews, and direct referrals to 50+ hiring partners, with a reported 91 to 96 percent placement rate.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the machine learning track fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the difference between AI, machine learning, and data science?",
      a: "AI is the broad goal of making machines act intelligently, machine learning is a method where systems learn from data, and data science is the wider practice of extracting insight from data, which often uses ML. Coding Sharks covers all three across its data and AI tracks.",
    },
    {
      q: "Do I need to know Python before a machine learning course?",
      a: "Not necessarily. The Coding Sharks machine learning track builds the required Python and data skills from the ground up, so beginners can start, though some prior Python helps you move faster.",
    },
    {
      q: "Is machine learning a good career in India?",
      a: "Yes. Machine learning and AI roles are among the highest-paying and fastest-growing in India, with strong demand for people who can build and ship real models, not just complete courses.",
    },
  ],
  related: [
    { label: "Data Science course", href: "/data-science-course-india" },
    { label: "AI course", href: "/ai-course-india" },
    { label: "Python course", href: "/python-programming-course" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const C_CPP_COURSE: SeoLanding = {
  slug: "c-cpp-programming-course",
  eyebrow: "C / C++",
  h1: "C and C++ Programming Course",
  metaTitle: "C and C++ Programming Course | Fundamentals + DSA | Coding Sharks",
  metaDescription:
    "A live C and C++ programming course building strong fundamentals and a foundation for DSA, with real practice and 1-on-1 mentorship. Book a free demo.",
  keywords: [
    "C programming course",
    "C++ course",
    "C and C++ course",
    "C C++ course with placement",
    "C++ programming course India",
  ],
  intro:
    "Coding Sharks offers a live C and C++ programming course that builds rock-solid programming fundamentals and a strong foundation for data structures and algorithms. C and C++ teach you how computers really work, which makes you a sharper engineer, and the course pairs hands-on practice with 1-on-1 mentorship from senior engineers.",
  stats: [
    { v: "C / C++", l: "core fundamentals" },
    { v: "DSA", l: "strong foundation" },
    { v: "1-on-1", l: "mentorship" },
    { v: "Hands-on", l: "practice" },
  ],
  sections: [
    {
      heading: "Why learn C and C++?",
      body: [
        "C and C++ teach you the fundamentals of how programs and memory actually work, which makes every other language easier to learn. C++ is also widely used in systems programming, game development, competitive programming, and performance-critical software, and it builds a strong base for data structures and algorithms.",
      ],
    },
    {
      heading: "What does the C and C++ course cover?",
      body: ["The course builds from basics to confident problem-solving."],
      bullets: [
        "C fundamentals: variables, control flow, functions, pointers",
        "Memory management and how computers run code",
        "C++ and object-oriented programming",
        "A strong foundation for data structures and algorithms",
        "Hands-on problem-solving practice",
      ],
    },
    {
      heading: "Is C/C++ useful for placements and college?",
      body: [
        "Yes. C and C++ are excellent for building the fundamentals that DSA interviews test, and they are common in engineering college curricula. A strong C/C++ base makes it much easier to pick up DSA and then move into roles in software, systems, or competitive programming.",
      ],
    },
    {
      heading: "Who is the C and C++ course for?",
      body: [
        "The course suits students building their programming foundation, engineering students strengthening fundamentals, and anyone preparing for DSA-heavy interviews who wants a solid base before moving to higher-level languages.",
      ],
    },
    {
      heading: "How do I join?",
      body: [
        "Book a free demo session to meet a mentor and confirm the C and C++ course fits your goal. No payment is required to attend the demo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Should I learn C or C++ first?",
      a: "Learning C first gives you a clear view of fundamentals like memory and pointers, then C++ adds object-oriented programming on top. The Coding Sharks course covers both in sequence, so you build a strong base before moving to higher-level concepts.",
    },
    {
      q: "Is C++ good for coding interviews?",
      a: "Yes. C++ is a popular choice for data structures and algorithms interviews because it is fast and gives you fine control. A strong C and C++ base makes DSA much easier to learn, which is what most product-company interviews test.",
    },
    {
      q: "Is C/C++ still worth learning today?",
      a: "Yes. C and C++ remain valuable for fundamentals, systems programming, game development, and performance-critical software, and they build the foundation that makes learning other languages and DSA far easier.",
    },
  ],
  related: [
    { label: "DSA course for placements", href: "/dsa-course-for-placements" },
    { label: "Full Stack course", href: "/full-stack-development-course" },
    { label: "all programs", href: "/courses" },
    { label: "book a free demo", href: "/book-demo" },
  ],
};

export const SEO_LANDING_MAP: Record<string, SeoLanding> = {
  "coding-bootcamp-indore": CODING_BOOTCAMP_INDORE,
  "why-coding-sharks": WHY_CODING_SHARKS,
  "coding-bootcamp-vs-self-taught": BOOTCAMP_VS_SELF_TAUGHT,
  "full-stack-development-course": FULL_STACK_COURSE,
  "ai-course-india": AI_COURSE_INDIA,
  "data-science-course-india": DATA_SCIENCE_COURSE_INDIA,
  "coding-bootcamp-vs-college-degree": BOOTCAMP_VS_COLLEGE,
  "non-cs-background": NON_CS_BACKGROUND,
  "for-freshers": FOR_FRESHERS,
  "dsa-course-for-placements": DSA_COURSE,
  "system-design-course": SYSTEM_DESIGN_COURSE,
  "software-developer-salary-india": DEVELOPER_SALARY_INDIA,
  "online-coding-course-india": ONLINE_CODING_COURSE_INDIA,
  "mern-stack-course": MERN_STACK_COURSE,
  "web-development-course": WEB_DEVELOPMENT_COURSE,
  "coding-course-after-12th": CODING_COURSE_AFTER_12TH,
  "data-analytics-course-india": DATA_ANALYTICS_COURSE,
  "python-programming-course": PYTHON_COURSE,
  "machine-learning-course": MACHINE_LEARNING_COURSE,
  "c-cpp-programming-course": C_CPP_COURSE,
};
