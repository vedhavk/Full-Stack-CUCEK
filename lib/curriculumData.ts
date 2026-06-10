export interface Resource {
  name: string;
  url: string;
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: number; // in minutes
  resources: Resource[];
  youtubeId?: string; // YouTube video ID for embedded tutorials
}

export interface Checkpoint {
  id: string;
  title: string;
  description: string;
  projectIdea: string;
  requiredLessonIds: string[];
}

export interface Week {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  checkpoints: Checkpoint[];
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
        youtubeId: "UB1O30zR-EE",
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
        youtubeId: "yfoY53QXEnI",
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
        youtubeId: "W6NZ1cH58NY",
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
        youtubeId: "jHDhaSSKmUx",
        resources: [
          { name: "npm Docs - Getting Started", url: "https://docs.npmjs.com/about-npm" },
          { name: "roadmap.sh npm Guide", url: "https://roadmap.sh/package-managers" }
        ]
      },
      {
        id: "w1-d5",
        day: 5,
        title: "Git & GitHub Version Control",
        description: "Establish strong foundations in version control. Learn branching strategies, merging, rebasing, resolving merge conflicts, and collaboration on GitHub.",
        duration: 45,
        youtubeId: "RGOj5yH7evk",
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
        youtubeId: "Ke90Tje7VS0",
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
        youtubeId: "lCxcTsOHr5Y",
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
    ]
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
        youtubeId: "fBNz5xF-Kx4",
        resources: [
          { name: "Node.js Dev Guide", url: "https://nodejs.org/en/docs/guides" },
          { name: "Express.js Routing Guide", url: "https://expressjs.com/en/guide/routing.html" }
        ]
      },
      {
        id: "w2-d2",
        day: 2,
        title: "Designing RESTful APIs",
        description: "Implement API design standards. Use correct HTTP status codes, method verbs (GET, POST, PUT, DELETE), handle request bodies, parameters, and query schemas.",
        duration: 60,
        youtubeId: "-MTSQjw5DrM",
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
        youtubeId: "7Q17UBOc_WY",
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
        youtubeId: "jgpVdJB2sKQ",
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
        youtubeId: "wbpMiKi_yHY",
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
        youtubeId: "qw--VYLgGeg",
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
    ]
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
        youtubeId: "3hLmDS179YE",
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
        youtubeId: "7K0Z65b21XU",
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
        youtubeId: "e6w9LwZJFIA",
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
        youtubeId: "R8_veQiYBhI",
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
        youtubeId: "tO7Pcr_QpCo",
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
    ]
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
        youtubeId: "goclfp6a258",
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
        youtubeId: "SLB_c_ayRMc",
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
        youtubeId: "Y8O1G47d-U4",
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
        youtubeId: "SqcY0GlTVPk",
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
        youtubeId: "5fLW5Q5OD24",
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
    ]
  }
];
