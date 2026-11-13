"""All portfolio content lives here so the templates stay clean and easy to edit."""

SITE = {
    "name": "Abdyrakhmon Majidov",
    "first_name": "Abdyrakhmon",
    "last_name": "Majidov",
    "brand": "VIRUS",
    "role": "Full-Stack Python Developer",
    "email": "virusdev.uz@gmail.com",
    "phone": "+998 (50) 716-47-41",
    "phone_raw": "+998507164741",
    "location": "Olmazor Street, Bukhara, Uzbekistan",
    "city": "Bukhara, Uzbekistan",
    "birthday": "April 27, 2011",
    "age": 15,
    "experience": "3+",
    "availability": "Available for new projects",
    "tagline": "Code. Build. Innovate.",
    "bio_short": (
        "A 15-year-old full-stack developer from Bukhara, Uzbekistan. I turn ideas "
        "into fast, expressive and reliable web experiences with Python, Django "
        "and modern JavaScript."
    ),
}

NAV_ITEMS = [
    {"name": "Home", "url_name": "home"},
    {"name": "About", "url_name": "about"},
    {"name": "Services", "url_name": "services"},
    {"name": "Certificates", "url_name": "certificates"},
    {"name": "Projects", "url_name": "projects"},
    {"name": "Contact", "url_name": "contact"},
]

STATS = [
    {"value": 3, "suffix": "+", "label": "Years of coding", "icon": "clock"},
    {"value": 13, "suffix": "+", "label": "Certificates earned", "icon": "award"},
    {"value": 12, "suffix": "+", "label": "Projects built", "icon": "folder"},
    {"value": 6, "suffix": "+", "label": "Core technologies", "icon": "cpu"},
]

TECH_MARQUEE = [
    "Python",
    "Django",
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "SCSS",
    "SASS",
    "Node.js",
    "Bootstrap 5",
    "Git",
    "Responsive Design",
]

SKILLS = [
    {"name": "HTML5", "level": 100, "color": "#f97316", "note": "Semantic & accessible"},
    {"name": "CSS3", "level": 98, "color": "#38bdf8", "note": "Layouts & animation"},
    {"name": "Python", "level": 90, "color": "#facc15", "note": "Django & scripting"},
    {"name": "JavaScript", "level": 80, "color": "#fde047", "note": "Interactive UI"},
    {"name": "SCSS", "level": 80, "color": "#f472b6", "note": "Structured styling"},
    {"name": "SASS", "level": 80, "color": "#fb7185", "note": "Reusable systems"},
]

TOOLBOX = [
    "TypeScript",
    "Django",
    "Node.js",
    "Bootstrap 5",
    "Git",
    "GitHub",
    "VS Code",
    "REST APIs",
    "Responsive Design",
    "UI Motion",
]

SERVICES = [
    {
        "slug": "frontend",
        "number": "01",
        "title": "Frontend Development",
        "tagline": "Interfaces that feel effortless",
        "description": (
            "Responsive, pixel-perfect websites built with semantic HTML, modern CSS "
            "and vanilla JavaScript. Every layout is crafted to feel fast, fluid and "
            "natural on any screen."
        ),
        "features": [
            "Mobile-first responsive layouts",
            "Smooth animations & micro-interactions",
            "Semantic, accessible markup",
            "Cross-browser polish",
        ],
        "tech": ["HTML5", "CSS3", "SCSS", "JavaScript"],
        "icon": "layout",
        "accent": "violet",
        "contact_value": "frontend",
    },
    {
        "slug": "backend",
        "number": "02",
        "title": "Backend Development",
        "tagline": "Logic that scales quietly",
        "description": (
            "Reliable Django and Python backends with clean data models, secure "
            "authentication and admin tools that make managing your product simple."
        ),
        "features": [
            "Django-powered architecture",
            "Secure authentication flows",
            "Clean database design",
            "REST-ready endpoints",
        ],
        "tech": ["Python", "Django", "SQLite", "REST"],
        "icon": "server",
        "accent": "cyan",
        "contact_value": "backend",
    },
    {
        "slug": "fullstack-python",
        "number": "03",
        "title": "Full-Stack Python",
        "tagline": "One developer, the whole product",
        "description": (
            "From database schema to the final animation, I build complete Django "
            "applications that connect a thoughtful interface with a dependable backend."
        ),
        "features": [
            "Complete Django applications",
            "API + frontend integration",
            "Custom admin dashboards",
            "Deployment-ready builds",
        ],
        "tech": ["Python", "Django", "JavaScript", "SQLite"],
        "icon": "layers",
        "accent": "pink",
        "contact_value": "fullstack",
    },
    {
        "slug": "nodejs",
        "number": "04",
        "title": "Node.js Development",
        "tagline": "Real-time, event-driven apps",
        "description": (
            "Lightweight Node.js services and APIs for products that need speed, "
            "live updates and a smooth connection between client and server."
        ),
        "features": [
            "Express-style APIs",
            "Real-time features",
            "JSON data pipelines",
            "NPM ecosystem integration",
        ],
        "tech": ["Node.js", "JavaScript", "Express", "JSON"],
        "icon": "node",
        "accent": "emerald",
        "contact_value": "nodejs",
    },
    {
        "slug": "responsive-design",
        "number": "05",
        "title": "Responsive Web Design",
        "tagline": "Every pixel, every device",
        "description": (
            "Fluid interfaces that look intentional on a phone, a tablet, a laptop "
            "and a wide monitor — not just resized, but redesigned for the space."
        ),
        "features": [
            "Fluid grid systems",
            "Mobile-first breakpoints",
            "Touch-friendly interactions",
            "Performance budgets",
        ],
        "tech": ["HTML5", "CSS3", "SCSS", "Flexbox & Grid"],
        "icon": "devices",
        "accent": "amber",
        "contact_value": "responsive",
    },
    {
        "slug": "rest-api",
        "number": "06",
        "title": "REST API Development",
        "tagline": "Clean contracts between systems",
        "description": (
            "Well-structured APIs that are easy to consume, secure by design and "
            "documented clearly, so your frontend and future integrations stay in sync."
        ),
        "features": [
            "Resource-based endpoints",
            "JSON serialization",
            "Authentication & permissions",
            "Clear documentation",
        ],
        "tech": ["Python", "Django", "Node.js", "JSON"],
        "icon": "plug",
        "accent": "blue",
        "contact_value": "api",
    },
]

PROCESS = [
    {
        "number": "01",
        "title": "Discover",
        "description": (
            "We talk about your idea, goals and audience. I ask the right questions "
            "and turn the brief into a clear technical plan."
        ),
        "icon": "search",
    },
    {
        "number": "02",
        "title": "Design",
        "description": (
            "Wireframes and a visual direction that matches your brand — with motion "
            "and responsiveness considered from day one."
        ),
        "icon": "pen",
    },
    {
        "number": "03",
        "title": "Build",
        "description": (
            "Clean, maintainable code. Frontend and backend are developed together, "
            "tested on real devices and refined until they feel right."
        ),
        "icon": "code",
    },
    {
        "number": "04",
        "title": "Launch",
        "description": (
            "Deployment, final checks and a clear handover. I stay available for "
            "improvements after your product goes live."
        ),
        "icon": "rocket",
    },
]

CERTIFICATE_CATEGORIES = ["All", "Frontend", "Programming", "Fundamentals", "Computer Science"]

CERTIFICATES = [
    {
        "id": "C-01",
        "title": "HTML5 in 45 Minutes",
        "category": "Frontend",
        "issuer": "Mohirdev",
        "image": "certificates/web/html5-in-45-minutes.png",
        "description": (
            "A fast-paced introduction to HTML5 structure, semantics and the building "
            "blocks of every page on the web."
        ),
        "skills": ["HTML5", "Semantics", "Document structure"],
    },
    {
        "id": "C-02",
        "title": "First Step into IT",
        "category": "Fundamentals",
        "issuer": "Mohirdev",
        "image": "certificates/web/first-step-into-it.png",
        "description": (
            "The starting point of the journey: core IT concepts, digital literacy and "
            "a first look at how technology is built."
        ),
        "skills": ["IT basics", "Digital literacy"],
    },
    {
        "id": "C-03",
        "title": "Bootstrap 5 — Complete Course",
        "category": "Frontend",
        "issuer": "Mohirdev",
        "image": "certificates/web/bootstrap-5-complete-course.png",
        "description": (
            "Responsive layouts, reusable components and utility classes with the "
            "Bootstrap 5 framework."
        ),
        "skills": ["Bootstrap 5", "Responsive UI", "Components"],
    },
    {
        "id": "C-04",
        "title": "CSS — Complete Course",
        "category": "Frontend",
        "issuer": "Mohirdev",
        "image": "certificates/web/css-complete-course.png",
        "description": (
            "Modern styling, selectors, flexbox, grid, transitions and responsive "
            "design with CSS."
        ),
        "skills": ["CSS3", "Flexbox", "Grid", "Animation"],
    },
    {
        "id": "C-05",
        "title": "Python Fundamentals",
        "category": "Programming",
        "issuer": "Mohirdev",
        "image": "certificates/web/python-fundamentals.png",
        "description": (
            "Variables, loops, functions, data types and the programming mindset — "
            "the foundation behind every Python project I build."
        ),
        "skills": ["Python", "Logic", "Functions"],
    },
    {
        "id": "C-06",
        "title": "Frontend Development Fundamentals",
        "category": "Frontend",
        "issuer": "Mohirdev",
        "image": "certificates/web/frontend-fundamentals.png",
        "description": (
            "A complete foundation in HTML, CSS and JavaScript for building real, "
            "interactive interfaces from scratch."
        ),
        "skills": ["HTML", "CSS", "JavaScript"],
    },
    {
        "id": "C-07",
        "title": "Programming with HTML",
        "category": "Frontend",
        "issuer": "Mohirdev",
        "image": "certificates/web/html-programming.png",
        "description": (
            "Structuring content, building accessible pages and understanding the "
            "document object model in practice."
        ),
        "skills": ["HTML", "Accessibility", "DOM"],
    },
    {
        "id": "C-08",
        "title": "The First Step",
        "category": "Fundamentals",
        "issuer": "Mohirdev",
        "image": "certificates/web/the-first-step.png",
        "description": (
            "An early milestone that turned curiosity into a lasting interest in "
            "software and the web."
        ),
        "skills": ["Foundations", "Mindset"],
    },
    {
        "id": "C-09",
        "title": "Data Structures & Algorithms",
        "category": "Computer Science",
        "issuer": "Mohirdev",
        "image": "certificates/web/data-structures-and-algorithms.png",
        "description": (
            "Core data structures, complexity and problem-solving techniques for "
            "writing code that stays efficient as it grows."
        ),
        "skills": ["Algorithms", "Data structures", "Complexity"],
    },
    {
        "id": "C-10",
        "title": "TypeScript Fundamentals",
        "category": "Programming",
        "issuer": "Mohirdev",
        "image": "certificates/web/typescript-fundamentals.png",
        "description": (
            "Types, interfaces and safer JavaScript development with TypeScript — "
            "a strong next step after mastering the fundamentals."
        ),
        "skills": ["TypeScript", "Types", "Interfaces"],
    },
    {
        "id": "C-11",
        "title": "SOLID Principles",
        "category": "Programming",
        "issuer": "Mohirdev",
        "image": "certificates/web/solid-principles.png",
        "description": (
            "The five SOLID principles of object-oriented design — writing code that "
            "is easier to understand, extend and maintain."
        ),
        "skills": ["SOLID", "OOP", "Clean code"],
    },
    {
        "id": "C-12",
        "title": "Laravel PHP Framework — For Beginners",
        "category": "Programming",
        "issuer": "Mohirdev",
        "image": "certificates/web/laravel-php-framework.png",
        "description": (
            "Routing, controllers, Blade templates and Eloquent models — building "
            "structured web applications with the Laravel PHP framework."
        ),
        "skills": ["Laravel", "PHP", "MVC", "Eloquent"],
    },
    {
        "id": "C-13",
        "title": "Django 3 — Full-Stack Web Development with Python",
        "category": "Programming",
        "issuer": "Mohirdev",
        "image": "certificates/web/django-full-stack-development.png",
        "description": (
            "Full-stack development with Django 3 — models, views, templates, "
            "authentication and building complete Python-powered web applications."
        ),
        "skills": ["Django", "Python", "Full-Stack", "MVC"],
    },
]

PROJECTS = [
    {
        "slug": "virus-portfolio",
        "title": "VIRUS Portfolio",
        "category": "Full-Stack",
        "tagline": "A liquid-glass portfolio built with Django",
        "description": (
            "The site you are looking at: a multi-page Django portfolio with a custom "
            "liquid-glass design system, animated backgrounds and a fully responsive "
            "layout."
        ),
        "long_description": (
            "Designed and developed from a blank folder. The project combines a Django "
            "backend with hand-written HTML, CSS and JavaScript — no heavy frontend "
            "framework. It includes a contact form backed by a database, certificate "
            "and project filtering, accessible modals and motion that respects the "
            "visitor's preferences."
        ),
        "features": [
            "Custom liquid-glass design system",
            "Responsive navigation & mobile menu",
            "Certificate lightbox with keyboard controls",
            "Django contact form with database storage",
            "Scroll-driven animations and counters",
        ],
        "stack": ["Python", "Django", "HTML5", "CSS3", "JavaScript"],
        "year": "2026",
        "status": "Live",
        "theme": "violet",
        "icon": "code",
        "monogram": "VP",
        "featured": True,
    },
    {
        "slug": "shopflow",
        "title": "ShopFlow",
        "category": "Full-Stack",
        "tagline": "A clean storefront with a powerful admin",
        "description": (
            "An e-commerce concept with a product catalog, search, cart, checkout flow "
            "and a custom Django admin for managing products and orders."
        ),
        "long_description": (
            "ShopFlow was built to practise the full journey of a product: browsing, "
            "filtering, adding to cart and completing an order. The backend uses Django "
            "models and views, while the frontend focuses on clear product cards, smooth "
            "cart interactions and a checkout experience that stays simple on mobile."
        ),
        "features": [
            "Product catalog with categories",
            "Persistent cart experience",
            "Order management dashboard",
            "Responsive checkout flow",
        ],
        "stack": ["Python", "Django", "SQLite", "JavaScript", "CSS3"],
        "year": "2025",
        "status": "Personal project",
        "theme": "cyan",
        "icon": "cart",
        "monogram": "SF",
        "featured": True,
    },
    {
        "slug": "taskpilot",
        "title": "TaskPilot",
        "category": "Full-Stack",
        "tagline": "A calm place to plan the day",
        "description": (
            "A task management app with projects, priorities, deadlines and a focused "
            "dashboard that makes progress visible at a glance."
        ),
        "long_description": (
            "TaskPilot explores productivity without the clutter. Users can create "
            "projects, organise tasks by priority and track what is due next. The "
            "interface relies on a small set of reusable components and subtle motion "
            "to keep the experience quick and calm."
        ),
        "features": [
            "Projects, tasks and priorities",
            "Deadline tracking",
            "User authentication",
            "Keyboard-friendly interactions",
        ],
        "stack": ["Python", "Django", "JavaScript", "SCSS"],
        "year": "2025",
        "status": "Personal project",
        "theme": "pink",
        "icon": "check",
        "monogram": "TP",
        "featured": True,
    },
    {
        "slug": "weatherlens",
        "title": "WeatherLens",
        "category": "Frontend",
        "tagline": "Weather that changes with the sky",
        "description": (
            "A weather dashboard that uses geolocation and a public API to show current "
            "conditions, forecasts and a background that adapts to the weather."
        ),
        "long_description": (
            "WeatherLens focuses on one question: what does today feel like? The app "
            "fetches live data, presents it with a clear hierarchy and changes its "
            "visual atmosphere based on conditions and time of day. Built with vanilla "
            "JavaScript and a lot of attention to loading and error states."
        ),
        "features": [
            "Live weather API integration",
            "Geolocation support",
            "Dynamic background themes",
            "Graceful loading & error states",
        ],
        "stack": ["JavaScript", "HTML5", "CSS3", "REST API"],
        "year": "2025",
        "status": "Personal project",
        "theme": "blue",
        "icon": "cloud",
        "monogram": "WL",
        "featured": False,
    },
    {
        "slug": "devblog",
        "title": "DevBlog",
        "category": "Backend",
        "tagline": "A developer's notebook on the web",
        "description": (
            "A blog CMS with a Markdown editor, tags, comments and an admin experience "
            "designed for writing without friction."
        ),
        "long_description": (
            "DevBlog was created to document what I learn. The backend handles posts, "
            "tags and comments, while the writing interface keeps the focus on content. "
            "It was also an exercise in structuring Django apps cleanly and designing "
            "database relationships that stay understandable."
        ),
        "features": [
            "Markdown-powered writing",
            "Tags and archive pages",
            "Comment system",
            "SEO-friendly post pages",
        ],
        "stack": ["Python", "Django", "SQLite", "HTML5", "CSS3"],
        "year": "2024",
        "status": "Personal project",
        "theme": "emerald",
        "icon": "pen",
        "monogram": "DB",
        "featured": False,
    },
    {
        "slug": "chatwave",
        "title": "ChatWave",
        "category": "Backend",
        "tagline": "Conversations without the refresh button",
        "description": (
            "A real-time chat concept with rooms, live messages and a presence indicator, "
            "built on an event-driven Node.js backend."
        ),
        "long_description": (
            "ChatWave was an exploration of real-time communication. Messages appear "
            "instantly, rooms keep conversations organised and the interface makes it "
            "obvious who is online. The project helped me understand events, sockets and "
            "the difference between request-response and live systems."
        ),
        "features": [
            "Real-time message delivery",
            "Multiple chat rooms",
            "Online presence indicators",
            "Responsive chat interface",
        ],
        "stack": ["Node.js", "JavaScript", "WebSocket", "CSS3"],
        "year": "2024",
        "status": "Personal project",
        "theme": "amber",
        "icon": "chat",
        "monogram": "CW",
        "featured": False,
    },
]

PROJECT_CATEGORIES = ["All", "Full-Stack", "Frontend", "Backend"]

JOURNEY = [
    {
        "phase": "Grade 5",
        "title": "The spark",
        "description": (
            "My first real encounter with IT. What started as curiosity about computers "
            "quickly became something I wanted to do every single day."
        ),
        "icon": "sparkles",
    },
    {
        "phase": "Grades 5–8",
        "title": "Building the foundation",
        "description": (
            "I explored how computers and websites work, learned the basics of the web "
            "and took my first steps with HTML and CSS."
        ),
        "icon": "book",
    },
    {
        "phase": "Grade 9",
        "title": "From learning to building",
        "description": (
            "I began turning ideas into real projects, sharpened my frontend skills and "
            "started writing Python. Since then, the projects have kept getting bigger."
        ),
        "icon": "rocket",
    },
    {
        "phase": "Today",
        "title": "Full-stack focus",
        "description": (
            "Three years of hands-on experience, ten certificates and a growing collection "
            "of full-stack projects. I learn online through Mohirdev, UpoUnity and other "
            "trusted platforms — and I am only getting started."
        ),
        "icon": "infinity",
    },
]

HOBBIES = [
    {
        "title": "PC Building",
        "description": (
            "Assembling and upgrading computers — choosing parts, managing cables and "
            "getting every bit of performance out of a build."
        ),
        "icon": "cpu",
    },
    {
        "title": "Gaming",
        "description": (
            "A long-time love for computer games and the technology, design and systems "
            "that make them possible."
        ),
        "icon": "gamepad",
    },
    {
        "title": "Tech Reading",
        "description": (
            "Reading articles and documentation to strengthen my knowledge and discover "
            "better ways to build for the web."
        ),
        "icon": "book",
    },
    {
        "title": "Always Learning",
        "description": (
            "Online courses and experiments across frontend, backend and everything in "
            "between. Curiosity is the engine behind the work."
        ),
        "icon": "graduation",
    },
]

VALUES = [
    {
        "title": "Curiosity first",
        "description": "I ask questions, test ideas and enjoy the process of figuring things out.",
        "icon": "sparkles",
    },
    {
        "title": "Craft over shortcuts",
        "description": "Clean code, thoughtful details and interfaces that respect the people using them.",
        "icon": "gem",
    },
    {
        "title": "Keep it human",
        "description": "Clear communication, honest timelines and a real partnership from first message to launch.",
        "icon": "heart",
    },
]

QUICK_FACTS = [
    {"label": "Full name", "value": "Abdyrakhmon Majidov", "icon": "user"},
    {"label": "Born", "value": "April 27, 2011", "icon": "calendar"},
    {"label": "Location", "value": "Bukhara, Uzbekistan", "icon": "map"},
    {"label": "Email", "value": "virusdev.uz@gmail.com", "icon": "mail", "href": "mailto:virusdev.uz@gmail.com"},
    {"label": "Phone", "value": "+998 (50) 716-47-41", "icon": "phone", "href": "tel:+998507164741"},
    {"label": "Focus", "value": "Full-Stack Python", "icon": "code"},
]

FAQ = [
    {
        "question": "What kind of projects do you take on?",
        "answer": (
            "Marketing sites, portfolio and business websites, dashboards, Django web "
            "applications and API-driven products. If it lives on the web and needs both "
            "a good interface and solid logic, I would love to hear about it."
        ),
    },
    {
        "question": "Are you available for freelance work?",
        "answer": (
            "Yes. I am open to freelance projects and collaborations. Send a message with "
            "your idea, goals and timeline, and I will reply with the next steps."
        ),
    },
    {
        "question": "How do we communicate?",
        "answer": (
            "Email, phone or a call — whichever is easiest for you. I usually reply within "
            "24 hours and share progress regularly while the work is in motion."
        ),
    },
    {
        "question": "Can you work on an existing codebase?",
        "answer": (
            "Absolutely. I can improve, refactor or extend an existing Django, Python or "
            "JavaScript project, and I will always start by understanding how it is built."
        ),
    },
    {
        "question": "What does your process look like?",
        "answer": (
            "Discover, design, build and launch. We start with the problem, agree on a "
            "clear scope, then move through design and development with regular check-ins "
            "until the final handover."
        ),
    },
]

CONTACT_SERVICES = [
    ("frontend", "Frontend Development"),
    ("backend", "Backend Development"),
    ("fullstack", "Full-Stack Python"),
    ("nodejs", "Node.js Development"),
    ("responsive", "Responsive Web Design"),
    ("api", "REST API Development"),
    ("other", "Something else"),
]

SOCIALS = [
    {
        "label": "Email",
        "value": "virusdev.uz@gmail.com",
        "href": "mailto:virusdev.uz@gmail.com",
        "icon": "mail",
    },
    {
        "label": "Phone",
        "value": "+998 (50) 716-47-41",
        "href": "tel:+998507164741",
        "icon": "phone",
    },
    {
        "label": "Location",
        "value": "Bukhara, Uzbekistan",
        "href": "https://www.google.com/maps/search/?api=1&query=Bukhara%2C+Uzbekistan",
        "icon": "map",
    },
]
