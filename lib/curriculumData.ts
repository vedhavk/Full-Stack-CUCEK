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

export interface WeekTrack {
  label: string;   // e.g. "Node.js", "FastAPI"
  lessons: Lesson[];
}

export interface Week {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];        // default / first-tab lessons
  tracks?: WeekTrack[];     // optional alternative tracks (triggers tab UI)
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
    tracks: [
      {
        label: "Node.js",
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
        ]
      },
      {
        label: "FastAPI",
        lessons: [
          {
            id: "w2-fa-d1",
            day: 1,
            title: "FastAPI Fundamentals",
            description: "Get started with FastAPI, Python's high-performance async web framework. Learn path operations, query parameters, request bodies, and automatic OpenAPI documentation generation.",
            duration: 60,
            videos: [{ id: "8TMQcRcBnW8" }],
            resources: [
              { name: "FastAPI Official Docs", url: "https://fastapi.tiangolo.com/" },
              { name: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" }
            ]
          },
          {
            id: "w2-fa-d2",
            day: 2,
            title: "Pydantic & Data Validation",
            description: "Master Pydantic v2 for robust data validation and serialization. Define schemas with type hints, use validators, handle nested models, and leverage settings management.",
            duration: 60,
            videos: [{ id: "9GHxnttXxrA" }],
            resources: [
              { name: "Pydantic Docs", url: "https://docs.pydantic.dev/" },
              { name: "FastAPI Request Body", url: "https://fastapi.tiangolo.com/tutorial/body/" }
            ]
          },
          {
            id: "w2-fa-d3",
            day: 3,
            title: "SQLAlchemy ORM & Alembic",
            description: "Connect FastAPI to a relational database using SQLAlchemy 2.0 async ORM. Define models, run migrations with Alembic, and manage database sessions safely across requests.",
            duration: 75,
            videos: [{ id: "e8NnDz8uT7o" }],
            resources: [
              { name: "SQLAlchemy Docs", url: "https://docs.sqlalchemy.org/" },
              { name: "Alembic Migration Guide", url: "https://alembic.sqlalchemy.org/en/latest/tutorial.html" }
            ]
          },
          {
            id: "w2-fa-d4",
            day: 4,
            title: "JWT Authentication with OAuth2",
            description: "Implement secure stateless authentication in FastAPI using OAuth2 password flow and JWTs. Use dependency injection for protected routes, handle token expiry, and hash passwords with passlib.",
            duration: 60,
            videos: [{ id: "8-5othzDPPQ" }],
            resources: [
              { name: "FastAPI Security Guide", url: "https://fastapi.tiangolo.com/tutorial/security/" },
              { name: "JWT.io Introduction", url: "https://jwt.io/introduction" }
            ]
          },
          {
            id: "w2-fa-d5",
            day: 5,
            title: "Redis Caching with aioredis",
            description: "Integrate Redis into a FastAPI application for high-speed caching. Use aioredis for async read/write operations, implement TTL-based cache expiry, and write cache-invalidation middleware.",
            duration: 45,
            videos: [{ id: "3BMuCJTxYh0" }],
            resources: [
              { name: "aioredis Docs", url: "https://aioredis.readthedocs.io/" },
              { name: "Redis Developer Hub", url: "https://developer.redis.com/" }
            ]
          },
          {
            id: "w2-fa-d6",
            day: 6,
            title: "Async I/O & Background Tasks",
            description: "Unlock FastAPI's full async potential. Write truly non-blocking endpoints with async/await, offload work using BackgroundTasks, and manage concurrency with asyncio for high-throughput APIs.",
            duration: 60,
            videos: [{ id: "2JPDt-Jp6fM" }],
            resources: [
              { name: "FastAPI Async Docs", url: "https://fastapi.tiangolo.com/async/" },
              { name: "Python asyncio Docs", url: "https://docs.python.org/3/library/asyncio.html" }
            ]
          }
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
    title: "DevOps & Deployment",
    description: "Launch servers on public clouds, automate deployment pipelines, and configure health checking.",
    lessons: [
      {
        id: "w3-d1",
        day: 1,
        title: "AWS Core Services (EC2 & VPC)",
        description: "Provision virtual hardware. Configure security groups, routing tables, and launch an EC2 instance within an isolated VPC subnetwork.",
        duration: 60,
        videos: [{ id: "3hLmDS179YE" }],
        resources: [
          { name: "AWS EC2 Getting Started", url: "https://aws.amazon.com/ec2/getting-started/" },
          { name: "roadmap.sh AWS Guide", url: "https://roadmap.sh/aws" }
        ]
      },
      {
        id: "w3-d2",
        day: 2,
        title: "DNS & Mail Setup (Route53 & SES)",
        description: "Configure network names. Register domain paths, create record types (A, CNAME, MX), and authorize outbound email protocols using SES.",
        duration: 45,
        videos: [{ id: "7K0Z65b21XU" }],
        resources: [
          { name: "Route53 DNS Overview", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html" }
        ]
      },
      {
        id: "w3-d3",
        day: 3,
        title: "Cloud Object Storage (S3)",
        description: "Configure static assets. Create S3 buckets, set read/write IAM policies, and integrate cloud uploads directly from application scripts.",
        duration: 45,
        videos: [{ id: "e6w9LwZJFIA" }],
        resources: [
          { name: "AWS S3 User Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" }
        ]
      },
      {
        id: "w3-d4",
        day: 4,
        title: "GitHub Actions CI/CD Pipelines",
        description: "Automate delivery. Construct YAML configurations, declare jobs, run test runner suites on commit, and trigger secure release procedures.",
        duration: 60,
        videos: [{ id: "R8_veQiYBhI" }],
        resources: [
          { name: "GitHub Actions Quickstart", url: "https://docs.github.com/en/actions/quickstart" }
        ]
      },
      {
        id: "w3-d5",
        day: 5,
        title: "Process Monitoring with Monit",
        description: "Protect service runtimes. Configure Monit to supervise daemon processes, monitor RAM/CPU limits, and restart crashed node instances automatically.",
        duration: 45,
        videos: [{ id: "tO7Pcr_QpCo" }],
        resources: [
          { name: "Monit Documentation", url: "https://mmonit.com/monit/documentation/" }
        ]
      }
    ],
    checkpoints: [
      {
        id: "w3-cp1",
        title: "Cloud Deployment",
        description: "Deploy client-server suites on cloud hardware.",
        projectIdea: "Launch your application to a live EC2 server, set up an Nginx reverse proxy, request Let's Encrypt certificates, and map a live domain.",
        requiredLessonIds: ["w3-d1", "w3-d2", "w3-d3"]
      },
      {
        id: "w3-cp2",
        title: "CI/CD Automations",
        description: "Enforce automated test execution and pipeline delivery.",
        projectIdea: "Set up a GitHub Actions workflow that executes linting, code testing, and then deploys changes over SSH to your live cloud server.",
        requiredLessonIds: ["w3-d4"]
      },
      {
        id: "w3-cp3",
        title: "Monitoring & Reliability",
        description: "Establish self-healing configurations and alert handlers.",
        projectIdea: "Integrate a Monit runtime monitor checking Express server memory limits. Test automation triggers by forcing a mock memory leak script.",
        requiredLessonIds: ["w3-d5"]
      }
    ],
    weekProject: {
      title: "Week 3 Capstone — Live Deployed App",
      description: "Deploy your Week 2 backend (or a new project) to a live EC2 server with SSL, a custom domain, S3 file storage, and an automated GitHub Actions pipeline. Share a public URL as your deliverable.",
      deliverables: [
        "Application running live on an AWS EC2 instance",
        "Custom domain configured via Route53 with HTTPS (Let's Encrypt SSL)",
        "Nginx reverse proxy routing traffic to your Node server",
        "At least one S3 bucket used for file or static asset storage",
        "GitHub Actions CI/CD pipeline: triggers on push, deploys to EC2 over SSH",
        "Process monitor (Monit or PM2) keeping the server alive",
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
