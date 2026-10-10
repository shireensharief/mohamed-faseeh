// Every word on the page lives here. Facts come from the previous portfolio
// (mohamedfaseeh/portfolio, data.service.ts) and the résumé.

export const person = {
  name: "Mohamed Faseeh",
  firstName: "Faseeh",
  ghost: "FASEEH",
  monogram: "MF",
  role: "Site Reliability Engineer",
  location: "India",
  email: "mohamedfaseeh2001@gmail.com",
  phone: "+91 63842 11442",
  phoneHref: "tel:+916384211442",
  whatsapp: "https://wa.me/916384211442",
  linkedin: "https://linkedin.com/in/mohamedfaseeh",
  github: "https://github.com/mohamedfaseeh",
  resume: "/Mohamed_Faseeh_Resume.pdf",
  // Set by the deploy workflow from the GitHub account that owns the repo.
  siteOrigin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://shireensharief.github.io",
  get siteUrl() {
    return `${this.siteOrigin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "moments", label: "Impact" },
  { id: "contact", label: "Contact" },
];

// What the avatar guide says as each section comes into view.
export const avatarLines: Record<string, string> = {
  hero: "Hi, I'm Faseeh. I keep systems fast, secure and up. Scroll down, let me show you around.",
  skills: "A pocketful of tools. Tap a technology to see how I use it.",
  work: "Observability on autopilot. Here's my work.",
  contact: "Got a system that needs to stay up? Let's talk.",
};

export const about = {
  paragraphs: [
    "I'm Mohamed Faseeh, a Site Reliability Engineer with 3 years of hands-on experience running cloud environments, application deployments and monitoring. Today I build end-to-end observability for Samsung's global e-commerce platform at Altimetrik, covering payments, checkout and order management.",
    "I work across AWS, Docker and Kubernetes, with Dynatrace, Grafana, OpenSearch and the Elastic Stack for logging and monitoring. I lead incident response and root-cause analysis, automate the toil away with Python and Jenkins, and I've carried the pager on 24/7 on-call rotations.",
  ],
  badge: {
    org: "SAMSUNG",
    unit: "RELIABILITY",
    title: "SITE RELIABILITY · SRE",
    lanyard: "SAMSUNG · SRE",
    stats: [
      { value: 3, suffix: "+", label: "YEARS" },
      { value: 3, suffix: "", label: "COMPANIES" },
    ],
    backLine: "ON CALL ACROSS GLOBAL E-COMMERCE",
    backNote: "From the first alert to the root cause.",
  },
  facts: [
    { label: "Based in", value: "India", arrow: true },
    { label: "Currently", value: "SRE · Samsung (Altimetrik)" },
    { label: "Focus", value: "Observability. Automation. Cloud." },
    { label: "Education", value: "B.E. Computer Science, Anna University" },
  ],
  quote: ["“From the first alert", "to the root cause.”"],
  quoteNote: "ONE ENGINEER. ALWAYS ON.",
};

// The 15 skills and 6 categories from the previous portfolio, in the same order.
export type SkillFamily = "cloud" | "containers" | "monitoring" | "cicd" | "os" | "iac";

export type Skill = {
  name: string;
  icon: string; // logo in public/icons (from the previous portfolio)
  family: SkillFamily;
  story: string;
  project?: { title: string; href: string };
};

export const skillFilters: { id: "all" | SkillFamily; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud" },
  { id: "containers", label: "Containers" },
  { id: "monitoring", label: "Monitoring" },
  { id: "cicd", label: "CI/CD" },
  { id: "os", label: "OS" },
  { id: "iac", label: "IaC" },
];

const gh = (repo: string) => `https://github.com/mohamedfaseeh/${repo}`;
const netflix = { title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") };

export const skills: Skill[] = [
  { name: "AWS", icon: "/icons/aws.webp", family: "cloud",
    story: "EC2, ECS, EKS, Lambda, S3, IAM, API Gateway and CloudWatch. Hosting, securing and monitoring production workloads on AWS.",
    project: { title: "Highly Available Web App on AWS", href: gh("Load-Balanced-Web-Application") } },
  { name: "Docker", icon: "/icons/docker.svg", family: "containers",
    story: "Containerised applications with lean Dockerfiles so every environment, from laptop to production, runs the same image.",
    project: netflix },
  { name: "Kubernetes", icon: "/icons/kubernetes.webp", family: "containers",
    story: "Amazon EKS clusters with Helm-managed releases, autoscaling and cluster-level monitoring for resilient microservices.",
    project: netflix },
  { name: "Prometheus", icon: "/icons/prometheus.svg", family: "monitoring",
    story: "Cluster and application metrics with Alertmanager routing, so problems page someone before customers notice.",
    project: netflix },
  { name: "Grafana", icon: "/icons/grafana.webp", family: "monitoring",
    story: "Dashboards for application, pod and node health, built so on-call engineers see the problem first.",
    project: netflix },
  { name: "Dynatrace", icon: "/icons/dynatrace.svg", family: "monitoring",
    story: "End-to-end observability for a global e-commerce platform: payments, checkout and order management." },
  { name: "OpenSearch", icon: "/icons/opensearch.svg", family: "monitoring",
    story: "Log search and dashboards for a global platform, the first stop in every root-cause analysis." },
  { name: "Blackbox Exporter", icon: "/icons/blackbox.webp", family: "monitoring",
    story: "Probing endpoints from the outside in for uptime and latency, feeding Prometheus alerts." },
  { name: "GitHub", icon: "/icons/github.svg", family: "cicd",
    story: "Source control, pull-request reviews and pre-deployment checks before anything ships.",
    project: { title: "github.com/mohamedfaseeh", href: "https://github.com/mohamedfaseeh" } },
  { name: "GitLab CI/CD", icon: "/icons/gitlab.svg", family: "cicd",
    story: "Pipelines that build, test and deploy, including versioned database schema changes." },
  { name: "Linux", icon: "/icons/linux.svg", family: "os",
    story: "Day-to-day Linux system administration: services, permissions, logs and the shell work behind every deployment and incident." },
  { name: "Terraform", icon: "/icons/terraform.webp", family: "iac",
    story: "Infrastructure as code from VPC to EKS: modular, variable-driven and repeatable, so environments are rebuilt, not hand-patched.",
    project: { title: "Highly Available Web App on AWS", href: gh("Load-Balanced-Web-Application") } },
  { name: "Elastic Stack", icon: "/icons/elastic-stack.webp", family: "monitoring",
    story: "Centralised logging with Elasticsearch, Logstash and Kibana, so every service tells its story in one place." },
  { name: "Liquibase", icon: "/icons/liquibase.webp", family: "cicd",
    story: "Database schema changes versioned and rolled out through CI/CD, never by hand." },
  { name: "Splunk", icon: "/icons/splunk.webp", family: "monitoring",
    story: "Searching and correlating machine data while tracking errors and job executions across services." },
];

export type Project = {
  id: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  stamp?: [string, string];
  personalStamp?: string[];
  screen: { kicker: string; title: string }; // the laptop on the card: address-bar path and app name
};

export const projects: Project[] = [
  {
    id: "netflix-eks",
    label: "FLAGSHIP · DEVSECOPS",
    title: "Netflix Clone on Amazon EKS",
    description:
      "A production-ready Netflix clone shipped through a complete DevSecOps workflow on Amazon EKS. Terraform provisions the cloud, Jenkins builds, scans and deploys through Helm, and Prometheus, Grafana and the EFK stack watch everything, with zero manual deployment steps.",
    tags: ["AWS EKS", "Terraform", "Jenkins", "Docker", "Helm", "Prometheus", "Grafana", "Trivy"],
    links: [{ label: "GitHub", href: gh("DevSecOps-Project") }],
    featured: true,
    stamp: ["BUILT FOR", "zero downtime."],
    screen: {
      kicker: "CLUSTER / EKS",
      title: "netflix-prod",
    },
  },
  {
    id: "aws-infra",
    label: "CLOUD INFRASTRUCTURE",
    title: "Highly Available Web App on AWS",
    description:
      "A fault-tolerant web tier built entirely in Terraform: VPC, public subnets, security groups, EC2 instances behind an Application Load Balancer, and Nginx installed at launch. Failover was tested by taking instances down.",
    tags: ["AWS", "Terraform", "EC2", "ALB", "VPC", "Nginx", "Bash"],
    links: [{ label: "GitHub", href: gh("Load-Balanced-Web-Application") }],
    screen: {
      kicker: "TERRAFORM / APPLY",
      title: "web-ha-stack",
    },
  },
  {
    id: "iam-automation",
    label: "AUTOMATION",
    title: "AWS IAM User Provisioning",
    description:
      "A Python and boto3 tool that creates IAM users, sets up optional console access with forced password reset, and attaches managed policies on demand, cutting manual IAM setup time by 90%.",
    tags: ["Python", "boto3", "AWS IAM", "AWS CLI"],
    links: [{ label: "GitHub", href: gh("AWS-IAM-User-Provisioning") }],
    screen: {
      kicker: "IAM / PROVISION",
      title: "iam-onboard.py",
    },
  },
  {
    id: "auto-tagging",
    label: "CLOUD GOVERNANCE",
    title: "Auto-Tagging with Lambda & EventBridge",
    description:
      "A serverless engine that finds who created each EC2 instance or S3 bucket from CloudTrail and tags it automatically, giving 100% tagging compliance and clear cost visibility without anyone lifting a finger.",
    tags: ["AWS Lambda", "EventBridge", "CloudTrail", "Python", "boto3", "S3", "EC2"],
    links: [{ label: "GitHub", href: gh("Auto-Tag-AWS-Resources") }],
    personalStamp: ["EVENT-DRIVEN", "100% TAGGED", "SERVERLESS"],
    screen: {
      kicker: "LAMBDA / EVENTBRIDGE",
      title: "auto-tagger",
    },
  },
];

// Company, role, dates and every point are copied word for word from the previous portfolio.
export type Role = {
  year: string;
  period: string;
  eyebrow: string;
  title: string;
  org: string;
  points: string[];
};

export const roles: Role[] = [
  {
    year: "2025",
    period: "Dec 2025 - Present",
    eyebrow: "SITE RELIABILITY",
    title: "Site Reliability Engineer",
    org: "Samsung (Altimetrik)",
    points: [
      "Built end-to-end observability with Dynatrace, Grafana, and OpenSearch for Samsung’s global e-commerce platform, covering payments, checkout, and order management.",
      "Led incident response, RCA, and post-incident reviews while maintaining SLA compliance.",
      "Automated SRE operations with Python, Jenkins, CronJobs, and Slack/Mattermost, cutting manual triage by 80%.",
      "Partnered with engineering teams on long-term fixes, reducing recurring incidents by 75%.",
      "Supported releases and change management, and set up alerting standards and runbooks."
    ]
  },
  {
    year: "2024",
    period: "April 2024 - Aug 2025",
    eyebrow: "CLOUD RELIABILITY",
    title: "Cloud Reliability Engineer",
    org: "Chargebee",
    points: [
      "Monitored AWS infrastructure, tracking errors and job executions across services.",
      "Resolved incidents and service requests, escalating critical issues to module owners or third-party teams.",
      "Ran deployment pre-checks, reviewed and approved PRs, and deployed artifacts to EC2 and ECS.",
      "Fixed build issues such as 5xx errors and performed root cause analysis for failures.",
      "Participated in 24/7 on-call rotations for critical production issues."
    ]
  },
  {
    year: "2023",
    period: "Feb 2023 - Aug 2023",
    eyebrow: "CLOUD & DEVOPS",
    title: "Cloud & DevOps Engineer",
    org: "Avasoft",
    points: [
      "Managed EC2, Lambda, and S3 hosting, and integrated APIs through AWS API Gateway.",
      "Secured workloads with least-privilege IAM policies and WAF configurations.",
      "Rolled out Liquibase with GitLab CI/CD for versioned database schema changes.",
      "Containerized applications with Docker for consistent environments on Linux.",
      "Set up Elastic Stack, Prometheus, Grafana, and Blackbox Exporter for monitoring and logging."
    ]
  }
];

export const education = {
  label: "EDUCATION · 2019 — 2023",
  degree: "B.E., Computer Science & Engineering",
  school: "Dhaanish Ahmed College of Engineering",
  detail: "Anna University · CGPA 8.28",
};

export const certifications = [
  { title: "DevOps Foundations: CI/CD", href: "https://www.linkedin.com/learning/certificates/95df3634727619c033e956d2608d1e692bb3cb2e07261fa637cad7844d90c6e0" },
  { title: "Learning Kubernetes", href: "https://www.linkedin.com/learning/certificates/03bfe90026630ac738405a1635812306fbe1035fa3792f8eee98063d8b6800b5" },
  { title: "Learning Terraform", href: "https://www.linkedin.com/learning/certificates/e9f6ed65843712eb7543a621eb139b1b58e485f639a0f99fbb4638a5d46865d8" },
  { title: "Docker Essential Training", href: "https://www.linkedin.com/learning/certificates/8de520221a191fba12c68582a5d7730fffccb9e19ef96a9a8eba2448484903e8" },
];

export const stats = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 15, suffix: "+", label: "Technologies" },
  { text: "24/7", label: "On-call reliability" },
];

export const moments = [
  { symbol: "80%", eyebrow: "LESS MANUAL TRIAGE", title: "Automate the toil.", text: "SRE operations automated with Python, Jenkins, cron jobs and Slack/Mattermost alerts at Samsung (Altimetrik)." },
  { symbol: "75%", eyebrow: "FEWER REPEAT INCIDENTS", title: "Fix the cause.", text: "Partnered with engineering teams on long-term fixes instead of patching the same failure twice." },
  { symbol: "✦", eyebrow: "OBSERVABILITY AT SCALE", title: "See it first.", text: "End-to-end monitoring for Samsung's global e-commerce platform: payments, checkout and order management." },
];

// Project detail views: copied word for word from the previous portfolio.
export type ProjectDetail = {
  responsibilities: { title: string; items: string[] }[];
  technologies: { title: string; items: string }[];
  outcomes: string[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "netflix-eks": {
    responsibilities: [
      {
        title: "Infrastructure & Deployment",
        items: [
          "Provisioned AWS cloud infrastructure using Terraform, including VPC, subnets, IAM roles, security groups, and Amazon EKS cluster.",
          "Deployed microservices using Kubernetes Helm charts for version-controlled, repeatable releases.",
          "Containerized application components using optimized Dockerfiles."
        ]
      },
      {
        title: "CI/CD Automation",
        items: [
          "Built a complete CI/CD pipeline in Jenkins, automating build, test, security scan, Docker image push, and deploy to EKS.",
          "Integrated Trivy for container vulnerability scanning.",
          "Automated Helm deployments to EKS as part of the pipeline."
        ]
      },
      {
        title: "Monitoring & Logging",
        items: [
          "Implemented Prometheus for cluster metrics and Alertmanager for alerting.",
          "Created custom Grafana dashboards for application, pod, and node-level monitoring.",
          "Configured centralized logging using the EFK Stack."
        ]
      }
    ],
    technologies: [
      {
        title: "Cloud & Infrastructure",
        items: "AWS (EKS, EC2, VPC, IAM, CloudWatch), Terraform, eksctl, Helm"
      },
      {
        title: "DevOps & CI/CD",
        items: "Jenkins, Docker, Git, Trivy, SonarQube"
      },
      {
        title: "Monitoring & Logging",
        items: "Prometheus, Grafana, Alertmanager, EFK Stack"
      }
    ],
    outcomes: [
      "Achieved fully automated CI/CD delivery with zero manual deployment steps.",
      "Ensured secure and reliable container images through integrated vulnerability scanning.",
      "Improved application uptime, scalability, and resilience using EKS autoscaling.",
      "Implemented complete observability with real-time monitoring and log aggregation."
    ]
  },
  "aws-infra": {
    responsibilities: [
      {
        title: "Infrastructure as Code",
        items: [
          "Designed and implemented AWS infrastructure entirely using Terraform.",
          "Defined VPC, public subnets, Internet Gateway, Route Tables, Security Groups, EC2 Instances, and ALB.",
          "Used Terraform variables and outputs for flexible configuration."
        ]
      },
      {
        title: "Automation & Configuration",
        items: [
          "Implemented automated instance provisioning using user_data to install Nginx at launch.",
          "Configured Target Group and Health Checks within ALB.",
          "Verified automatic failover behavior when one instance becomes unhealthy."
        ]
      }
    ],
    technologies: [
      {
        title: "Cloud Platform",
        items: "AWS (VPC, EC2, ALB, Internet Gateway, Security Groups)"
      },
      {
        title: "IaC Tool",
        items: "Terraform"
      },
      {
        title: "Concepts",
        items: "Infrastructure as Code, Load Balancing, High Availability"
      }
    ],
    outcomes: [
      "Deployed a highly available, fault-tolerant web infrastructure with end-to-end automation.",
      "Implemented cross-AZ load balancing and automated Nginx provisioning.",
      "Designed a clean, modular IaC structure with reusable components.",
      "Validated automatic failover and ALB health checks."
    ]
  },
  "iam-automation": {
    responsibilities: [
      {
        title: "IAM User & Group Automation",
        items: [
          "Developed a Python script using boto3 to automate IAM user provisioning.",
          "Enabled optional AWS Console login for users with password reset enforcement.",
          "Automated policy attachment by allowing input of AWS-managed policies dynamically."
        ]
      },
      {
        title: "Security & Governance",
        items: [
          "Followed AWS best practices for secure credential management.",
          "Implemented input validation for password and policy names.",
          "Used IAM roles and policies for restricted permissions."
        ]
      }
    ],
    technologies: [
      {
        title: "Cloud & Infrastructure",
        items: "AWS (IAM, CLI)"
      },
      {
        title: "Programming & SDK",
        items: "Python, boto3"
      },
      {
        title: "Concepts",
        items: "Automation, Access Management, Security"
      }
    ],
    outcomes: [
      "Reduced manual IAM setup time by 90%.",
      "Delivered a secure, reusable Python-based automation tool."
    ]
  },
  "auto-tagging": {
    responsibilities: [
      {
        title: "Event-Driven Auto-Tagging",
        items: [
          "Designed a serverless automation engine using AWS Lambda (Python).",
          "Built a tagging mechanism that detects the resource creator using CloudTrail.",
          "Ensured successful tagging for EC2 instances and S3 buckets."
        ]
      },
      {
        title: "Lambda Function Development",
        items: [
          "Developed a Python-based AWS Lambda function using boto3.",
          "Implemented logic to parse events, identify creator ARN, and apply tags.",
          "Added logging and error handling for auditing."
        ]
      }
    ],
    technologies: [
      {
        title: "AWS Services",
        items: "CloudTrail, EventBridge, Lambda, EC2, S3, IAM"
      },
      {
        title: "Programming",
        items: "Python, boto3"
      },
      {
        title: "Concepts",
        items: "Cloud Governance, Tagging Compliance, Serverless"
      }
    ],
    outcomes: [
      "Ensured 100% tagging compliance for resource creators.",
      "Improved traceability, accountability, and cloud cost visibility.",
      "Eliminated manual tagging effort and human error.",
      "Built a scalable, event-driven automation system."
    ]
  }
};
