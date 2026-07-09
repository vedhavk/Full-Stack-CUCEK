export interface Resource {
  name: string;
  url: string;
}

export interface LectureVideo {
  id: string;    // YouTube video ID
  label?: string; // e.g. "Part 1", "Part 2" — omit for single-video lessons
}

export interface LectureTranscript {
  url?: string;   // path to PDF (e.g. "/transcripts/w1-d1.pdf")
  label?: string; // e.g. "Part 1 Transcript"
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: number; // in minutes
  resources: Resource[];
  videos?: LectureVideo[];       // lecture video(s) for this lesson
  transcripts?: LectureTranscript[]; // PDF transcript(s) for this lesson
}

export interface Checkpoint {
  id: string;
  title: string;
  description: string;
  projectIdea: string;
  requiredLessonIds: string[];
}

export interface WeekProject {
  title: string;
  description: string;
  deliverables: string[];
  githubRequired: boolean;
  liveDemoRequired: boolean;
}

export interface Week {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  checkpoints: Checkpoint[];
  weekProject: WeekProject;
}

export const curriculumData: Week[] = [
  {
    id: 1,
    title: "Frontend Foundations",
    description: "Master the building blocks of user interfaces, styling modern pages, and building interactive client applications.",
    lessons: [
      {
        id: "w1-d1",
        day: 1,
        title: "HTML5 Semantic Structure",
        description: "Learn the core markup language of the web. Understand document outlines, semantic elements (article, section, nav), accessibility tags (ARIA), and SEO best practices.",
        duration: 45,
        videos: [
          { id: "kX3TfdUqpuU" }
        ],
        transcripts: [
          { url: "/transcripts/w1-d1.pdf" }
        ],
        resources: [
          { name: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
          { name: "roadmap.sh HTML Guide", url: "https://roadmap.sh/html" }
        ]
      },
      {
        id: "w1-d2",
        day: 2,
        title: "CSS Layouts & Responsive Design",
        description: "Explore layouts using CSS Flexbox and Grid. Build fluid designs with media queries, customize properties (variables), and construct responsive menus.",
        duration: 60,
        videos: [
          { id: "rg7Fvvl3taU", label: "Part 1" },
          { id: "u044iM9xsWU", label: "Part 2" }
        ],
        transcripts: [
          { url: "/transcripts/w1-d21.pdf", label: "Part 1 Transcript" },
          { url: "/transcripts/w1-d22.pdf", label: "Part 2 Transcript" }
        ],
        resources: [
          { name: "CSS Tricks Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
          { name: "CSS Tricks Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }
        ]
      },
      {
        id: "w1-d3",
        day: 3,
        title: "Modern JavaScript Essentials",
        description: "Deep dive into JS syntax, DOM manipulation, asynchronous programming (Promises, async/await), ES6+ features (destructuring, arrow functions, modules), and API fetching.",
        duration: 60,
        videos: [
          { id: "PLqJRUl4sSVE36S39Nk25TWkOnZjNtujSv", label: "Playlist" },
          { id: "OFpqvaJ3QYg", label: "Part 2" }
        ],
        transcripts: [
          { url: undefined }, // No transcript for the playlist
          { url: "/transcripts/w1-d3.pdf", label: "Part 2 Transcript" }
        ],
        resources: [
          { name: "javascript.info", url: "https://javascript.info/" },
          { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" }
        ]
      },
      {
        id: "w1-d4",
        day: 4,
        title: "Package Management & npm",
        description: "Understand the Node package manager, package.json structure, semantic versioning, and managing dependency trees in local directories.",
        duration: 30,
        videos: [{ id: "jHDhaSSKmB0" }],
        transcripts: [{ url: "/transcripts/w1-d4.pdf" }],
        resources: [
          { name: "npm Docs - Getting Started", url: "https://docs.npmjs.com/about-npm" },
          { name: "npm Guide", url: "https://www.npmjs.com/" }
        ]
      },
      {
        id: "w1-d5",
        day: 5,
        title: "Git & GitHub Version Control",
        description: "Establish strong foundations in version control. Learn branching strategies, merging, rebasing, resolving merge conflicts, and collaboration on GitHub.",
        duration: 45,
        videos: [{ id: "mAFoROnOfHs" }],
        transcripts: [{ url: "/transcripts/w1-d5.pdf" }],
        resources: [
          { name: "Git Book (Pro Git)", url: "https://git-scm.com/book/en/v2" },
          { name: "GitHub Skills Interactive Labs", url: "https://skills.github.com/" }
        ]
      },
      {
        id: "w1-d6",
        day: 6,
        title: "React Core Concepts",
        description: "Transition to components. Understand React elements, components, props, state, event handling, conditional rendering, and the lifecycle of effects (useEffect).",
        duration: 75,
        videos: [{ id: "ABQLwlE8MUA" }],
        transcripts: [{ url: "/transcripts/w1-d6.pdf" }],
        resources: [
          { name: "React official Documentation", url: "https://react.dev/" },
          { name: "Thinking in React Guide", url: "https://react.dev/learn/thinking-in-react" }
        ]
      },
      {
        id: "w1-d7",
        day: 7,
        title: "Tailwind CSS Styling",
        description: "Configure utility-first styling. Apply layouts, responsive spacing, theme adaptations, and customize configuration with React components.",
        duration: 45,
        videos: [{ id: "lCxcTsOHr5Y" }],
        resources: [
          { name: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" }
        ]
      }
    ],
    checkpoints: [
      {
        id: "w1-cp1",
        title: "Static Webpages",
        description: "Implement structural layout and responsive styling without complex client frameworks.",
        projectIdea: "Build a responsive, semantic landing page for a conference, featuring interactive schedules and ticket registration modals powered by vanilla JS.",
        requiredLessonIds: ["w1-d1", "w1-d2", "w1-d3"]
      },
      {
        id: "w1-cp2",
        title: "External Packages",
        description: "Integrate third-party packages to enhance application capability.",
        projectIdea: "Construct a local CLI tool or simple webpage bundle that imports npm packages (like lodash, uuid, or validator) and validates form payloads.",
        requiredLessonIds: ["w1-d4", "w1-d5"]
      },
      {
        id: "w1-cp3",
        title: "Frontend Apps",
        description: "Construct interactive single-page UI apps with React and Tailwind.",
        projectIdea: "Create a fully functional task-tracking dashboard with interactive filters, custom tags, localStorage state sync, and smooth transition animations.",
        requiredLessonIds: ["w1-d6", "w1-d7"]
      }
    ],
    weekProject: {
      title: "Week 1 Capstone — Frontend Showcase",
      description: "Build and submit a fully responsive, interactive frontend application that demonstrates your mastery of HTML5, CSS layouts, JavaScript, React, and Tailwind CSS. This is your first portfolio piece.",
      deliverables: [
        "Responsive landing or dashboard page built with semantic HTML5",
        "CSS Flexbox/Grid layout that adapts to mobile, tablet, and desktop",
        "At least one JavaScript interactive feature (modal, filter, or live fetch)",
        "React component tree with props, state, and useEffect usage",
        "Styled with Tailwind CSS utility classes",
        "Pushed to a public GitHub repository with a descriptive README"
      ],
      githubRequired: true,
      liveDemoRequired: false
    }
  },
  {
    id: 2,
    title: "Backend Basics",
    description: "Develop server-side systems, design RESTful APIs, manage databases, and handle authenticated secure sessions.",
    lessons: [
      {
        id: "w2-d1",
        day: 1,
        title: "Node.js & Express Foundations",
        description: "Set up the backend runtime. Create custom servers with Express.js, understand middleware cascades, request/response cycles, and file system modules.",
        duration: 60,
        videos: [
          { id: "fBNz5xF-Kx4", label: "Part 1" },
          { id: "CnH3kAXSrmU", label: "Part 2" }
        ],
        transcripts: [
          { url: "/transcripts/w2-d11.pdf", label: "Part 1 Transcript" },
          { url: "/transcripts/w2-d12.pdf", label: "Part 2 Transcript" }
        ],
        resources: [
          { name: "Node.js Dev Guide", url: "https://nodejs.org/en/docs" },
          { name: "Express.js Routing Guide", url: "https://expressjs.com/en/guide/routing.html" }
        ]
      },
      {
        id: "w2-d2",
        day: 2,
        title: "Designing RESTful APIs",
        description: "Implement API design standards. Use correct HTTP status codes, method verbs (GET, POST, PUT, DELETE), handle request bodies, parameters, and query schemas.",
        duration: 60,
        videos: [{ id: "7YcW25PHnAA" }],
        transcripts: [{ url: "/transcripts/w2-d2.pdf" }],
        resources: [
          { name: "RESTful API Design Best Practices", url: "https://restfulapi.net/" }
        ]
      },
      {
        id: "w2-d3",
        day: 3,
        title: "JSON Web Tokens (JWT) Auth",
        description: "Secure your backend. Implement stateless authentication using JWTs, handle signature verification, configure authorization headers, and set token lifetimes.",
        duration: 60,
        videos: [{ id: "favjC6EKFgw" }],
        transcripts: [{ url: "/transcripts/w2-d3.pdf" }],
        resources: [
          { name: "JWT.io Introduction", url: "https://jwt.io/introduction" },
          { name: "OWASP Auth Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }
        ]
      },
      {
        id: "w2-d4",
        day: 4,
        title: "Redis In-Memory Cache",
        description: "Optimize server read speeds. Set up Redis key-value storage, write caching middleware, configure expirations (TTL), and handle cache-invalidation strategies.",
        duration: 45,
        videos: [{ id: "jgpVdJB2sKQ" }],
        transcripts: [{ url: "/transcripts/w2-d4.pdf" }],
        resources: [
          { name: "Redis Developer Hub", url: "https://developer.redis.com/" }
        ]
      },
      {
        id: "w2-d5",
        day: 5,
        title: "Linux Command Line Basics",
        description: "Acquire sysadmin comfort. Navigate filesystems, manage system processes, adjust file permissions (chmod, chown), and execute basic SSH commands.",
        duration: 45,
        videos: [{ id: "ZtqBQ68cfJc" }],
        transcripts: [{ url: "/transcripts/w2-d5.pdf" }],
        resources: [
          { name: "Linux Journey tutorial", url: "https://linuxjourney.com/" }
        ]
      },
      {
        id: "w2-d6",
        day: 6,
        title: "Relational DBs & PostgreSQL",
        description: "Structure persistent storage. Design relational schemas, draft standard SQL queries (joins, indexes), connect clients, and manage connection pools.",
        duration: 75,
        videos: [{ id: "u3Xyw6DXm_o" }],
        transcripts: [{ url: "/transcripts/w2-d6.pdf" }],
        resources: [
          { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/" },
          { name: "Prisma Schema Guide", url: "https://www.prisma.io/docs/concepts/components/prisma-schema" }
        ]
      }
    ],
    checkpoints: [
      {
        id: "w2-cp1",
        title: "CLI Apps & CRUD APIs",
        description: "Validate server logic, routes, and memory structures.",
        projectIdea: "Write an Express-backed REST API for a digital library, enabling client CRUD on books, complete with request body validators and query filtering.",
        requiredLessonIds: ["w2-d1", "w2-d2"]
      },
      {
        id: "w2-cp2",
        title: "Complete Backend App",
        description: "Combine authentication, structured persistence, and fast caching.",
        projectIdea: "Build an API gateway or url-shortener with JWT login protection, persistent link metadata stored in PostgreSQL, and rate-limiting using Redis.",
        requiredLessonIds: ["w2-d3", "w2-d4", "w2-d5", "w2-d6"]
      }
    ],
    weekProject: {
      title: "Week 2 Capstone — Full Backend API",
      description: "Submit a production-style REST API server that integrates JWT authentication, PostgreSQL persistence, and Redis caching. Demonstrate your backend architecture with a Postman/Thunder Client collection or curl examples.",
      deliverables: [
        "Express.js server with at least 4 RESTful routes (CRUD)",
        "JWT-based register and login endpoints with protected routes",
        "PostgreSQL database with at least 2 related tables",
        "Redis caching applied to at least one expensive or repeated query",
        "Environment variables via .env (never commit secrets)",
        "API tested and documented with Postman collection or README examples",
        "Pushed to a public GitHub repository"
      ],
      githubRequired: true,
      liveDemoRequired: false
    }
  },
  {
    id: 3,
    title: "Docker + Cloud Deployment + CI/CD",
    description: "Containerise your app locally with Docker, launch it on AWS EC2, secure it with HTTPS, store files in S3, and automate every future deploy with GitHub Actions.",
    lessons: [
      {
        id: "w3-d1",
        day: 1,
        title: "Docker & Docker Compose (Containerise your app)",
        description: "Learn the fundamentals of containerisation. Write a Dockerfile for your Week 2 API, spin up PostgreSQL alongside it with Docker Compose, and run the whole stack locally in isolated containers.",
        duration: 90,
        videos: [{ id: "SXwC9fSwct8" }],
        resources: [
          { name: "Docker Getting Started", url: "https://docs.docker.com/get-started/" },
          { name: "Docker Compose Overview", url: "https://docs.docker.com/compose/" },
          { name: "roadmap.sh Docker Guide", url: "https://roadmap.sh/docker" }
        ]
      },
      {
        id: "w3-d2",
        day: 2,
        title: "Deploying to AWS EC2 (Server + Networking)",
        description: "Provision your first cloud server. Launch an EC2 instance inside a VPC, configure security groups to allow HTTP/HTTPS/SSH, and connect to it over SSH from your local machine.",
        duration: 75,
        videos: [{ id: "-FKQwXtrSSQ" }],
        resources: [
          { name: "AWS EC2 Getting Started", url: "https://aws.amazon.com/ec2/getting-started/" },
          { name: "roadmap.sh AWS Guide", url: "https://roadmap.sh/aws" }
        ]
      },
      {
        id: "w3-d3",
        day: 3,
        title: "DNS, HTTPS & Nginx Reverse Proxy",
        description: "Make your server reachable by a real domain. Point a domain to your EC2 IP, install Nginx as a reverse proxy in front of your Docker container, and obtain a free SSL certificate with Let's Encrypt (Certbot).",
        duration: 75,
        videos: [{ id: "ofBFl4M4BFk" }],
        resources: [
          { name: "Nginx Beginner's Guide", url: "https://nginx.org/en/docs/beginners_guide.html" },
          { name: "Certbot (Let's Encrypt) Docs", url: "https://certbot.eff.org/instructions" },
          { name: "Route53 DNS Overview", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html" }
        ]
      },
      {
        id: "w3-d4",
        day: 4,
        title: "File Storage with AWS S3 (+ IAM Basics)",
        description: "Store and serve user-uploaded files from the cloud. Create an S3 bucket, write scoped IAM policies for read/write access, and integrate file uploads from your API using the AWS SDK.",
        duration: 60,
        videos: [{ id: "tfU0JEZjcsg" }],
        resources: [
          { name: "AWS S3 User Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" },
          { name: "IAM Best Practices", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" }
        ]
      },
      {
        id: "w3-d5",
        day: 5,
        title: "GitHub Actions CI/CD Pipeline",
        description: "Automate every deployment. Write a GitHub Actions workflow that runs linting on every push and SSH-deploys your Docker container to EC2 automatically on merge to main.",
        duration: 75,
        videos: [{ id: "R8_veQiYBjI" }],
        resources: [
          { name: "GitHub Actions Quickstart", url: "https://docs.github.com/en/actions/quickstart" },
          { name: "GitHub Actions – Deploy to EC2", url: "https://docs.github.com/en/actions/deployment/deploying-to-your-cloud-provider/deploying-to-amazon-elastic-container-service" }
        ]
      },
      {
        id: "w3-d6",
        day: 6,
        title: "PM2 Process Management + AWS CloudWatch",
        description: "Keep your server alive and observable. Use PM2 to manage your Node process (auto-restart on crash, startup scripts) and stream logs to AWS CloudWatch for centralised monitoring.",
        duration: 60,
        videos: [
          { id: "4bS7KS_s8Go" }, // PM2 section
          { id: "HRJnhzSSFtk" }  // CloudWatch Logs
        ],
        resources: [
          { name: "PM2 Documentation", url: "https://pm2.keymetrics.io/docs/usage/quick-start/" },
          { name: "AWS CloudWatch Getting Started", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GettingStarted.html" }
        ]
      }
    ],
    checkpoints: [
      {
        id: "w3-cp1",
        title: "Containerised Local Stack",
        description: "Run your full app — API + database — inside Docker containers.",
        projectIdea: "Write a Dockerfile for your Week 2 API and a docker-compose.yml that starts both the API and a PostgreSQL container. The app must start with a single `docker compose up` command.",
        requiredLessonIds: ["w3-d1"]
      },
      {
        id: "w3-cp2",
        title: "Live Server with HTTPS",
        description: "Deploy your Docker container to EC2 and secure it with a real SSL certificate.",
        projectIdea: "Deploy your Dockerised app to EC2, install Nginx as a reverse proxy, point a domain at the server, and get an SSL certificate via Certbot so the app is live at https://yourdomain.com.",
        requiredLessonIds: ["w3-d2", "w3-d3"]
      },
      {
        id: "w3-cp3",
        title: "CI/CD Automations",
        description: "Enforce automated linting and hands-free deployment on every push.",
        projectIdea: "Set up a GitHub Actions workflow that runs ESLint on every push and automatically SSH-deploys the latest Docker image to your EC2 instance on every merge to main.",
        requiredLessonIds: ["w3-d4", "w3-d5"]
      },
      {
        id: "w3-cp4",
        title: "Monitoring & Reliability",
        description: "Keep the server alive and observable after crashes.",
        projectIdea: "Configure PM2 to run your app and auto-restart it on crashes. Forward PM2 logs to AWS CloudWatch and verify you can see live log output in the CloudWatch console.",
        requiredLessonIds: ["w3-d6"]
      }
    ],
    weekProject: {
      title: "Week 3 Capstone — Docker on EC2, Live & Automated",
      description: "Deploy your Week 2 project as a Docker container on AWS EC2 with a custom domain, HTTPS, S3 file storage, and a fully automated GitHub Actions CI/CD pipeline. A live public URL is your deliverable.",
      deliverables: [
        "Dockerfile + docker-compose.yml committed to your repository",
        "Application running live on an AWS EC2 instance via Docker",
        "Custom domain with HTTPS (Nginx + Let's Encrypt SSL certificate)",
        "At least one S3 bucket used for file or static asset storage",
        "GitHub Actions CI/CD pipeline: lints on every push, auto-deploys to EC2 on merge to main",
        "PM2 keeping the Node process alive; logs visible in AWS CloudWatch",
        "Live URL submitted as proof of deployment"
      ],
      githubRequired: true,
      liveDemoRequired: true
    }
  },
  {
    id: 4,
    title: "Automation & Infrastructure",
    description: "Write declarative configurations to manage environment setups, provision cloud resource sets, and launch a complete Capstone project.",
    lessons: [
      {
        id: "w4-d1",
        day: 1,
        title: "Ansible Playbooks & Configuration",
        description: "Define environments programmatically. Write playbooks, setup hosts, configure users, install packages, and manage files declaratively on target nodes.",
        duration: 60,
        videos: [{ id: "goclfp6a258" }],
        resources: [
          { name: "Ansible Getting Started", url: "https://docs.ansible.com/ansible/latest/getting_started/index.html" },
          { name: "roadmap.sh Ansible Guide", url: "https://roadmap.sh/ansible" }
        ]
      },
      {
        id: "w4-d2",
        day: 2,
        title: "Terraform Infrastructure Provisioning",
        description: "Declare resource structures. Understand Terraform providers, resources, variables, plan execution, and coordinate cloud dependencies cleanly.",
        duration: 60,
        videos: [{ id: "SLB_c_ayRMc" }],
        resources: [
          { name: "Terraform Tutorials (HashiCorp Learn)", url: "https://developer.hashicorp.com/terraform/tutorials" },
          { name: "roadmap.sh Terraform Guide", url: "https://roadmap.sh/terraform" }
        ]
      },
      {
        id: "w4-d3",
        day: 3,
        title: "Managing Terraform State",
        description: "Learn state locking, remote backends, workspace isolation, resource updates, and clean state-recovery commands.",
        duration: 60,
        videos: [{ id: "Y8O1G47d-U4" }],
        resources: [
          { name: "Terraform State Management Guide", url: "https://developer.hashicorp.com/terraform/language/state" }
        ]
      },
      {
        id: "w4-d4",
        day: 4,
        title: "Capstone System Architecture Design",
        description: "Draw production layouts. Model database replicas, file storage caching, auto-scaling patterns, and formulate structural load delivery routes.",
        duration: 60,
        videos: [{ id: "SqcY0GlTVPk" }],
        resources: [
          { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
        ]
      },
      {
        id: "w4-d5",
        day: 5,
        title: "Live Demo Prep & Optimization",
        description: "Profile code performance. Benchmark response latencies, clean environment builds, and prepare architecture diagrams for showcase.",
        duration: 120,
        videos: [{ id: "5fLW5Q5OD24" }],
        resources: [
          { name: "Web Page Performance Optimization", url: "https://developer.mozilla.org/en-US/docs/Web/Performance" }
        ]
      }
    ],
    checkpoints: [
      {
        id: "w4-cp1",
        title: "Configuration Automation",
        description: "Automate remote machine setups using playbooks.",
        projectIdea: "Write an Ansible Playbook that configures an empty Ubuntu EC2 instance, configures environment variables, builds directories, and starts PM2.",
        requiredLessonIds: ["w4-d1"]
      },
      {
        id: "w4-cp2",
        title: "Infrastructure as Code",
        description: "Provision and teardown infrastructure from code declarations.",
        projectIdea: "Manage your cloud architecture—VPC, subnet, EC2, and S3 instance—entirely inside Terraform files, executing plans to verify resource allocation.",
        requiredLessonIds: ["w4-d2", "w4-d3"]
      },
      {
        id: "w4-cp3",
        title: "Capstone Project & Demo",
        description: "Launch your complete bootcamp application with active monitoring and continuous integration pipelines.",
        projectIdea: "Present your completed application deployed with SSL, structured SQL tables, cache layers, continuous actions pipeline, and full process monitoring.",
        requiredLessonIds: ["w4-d4", "w4-d5"]
      }
    ],
    weekProject: {
      title: "Week 4 Capstone — Full-Stack Production Demo",
      description: "Present your complete full-stack bootcamp application. Your capstone must demonstrate the entire stack from frontend to infrastructure, running live on the internet with automated deployment and IaC-managed cloud resources.",
      deliverables: [
        "Ansible Playbook that configures a fresh EC2 from zero with one command",
        "Terraform files provisioning VPC, EC2, and S3 — applied and verified",
        "Complete application live on the internet (frontend + backend + database)",
        "SSL certificate, custom domain, and Nginx reverse proxy in place",
        "GitHub Actions CI/CD pipeline running on every push",
        "Architecture diagram (draw.io, Excalidraw, or similar) included in README",
        "5-minute demo video or live walkthrough recording of the full system",
        "Public GitHub repository with all IaC, app code, and deployment scripts"
      ],
      githubRequired: true,
      liveDemoRequired: true
    }
  }
];
