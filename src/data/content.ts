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
  { id: "moments", label: "Proud moments" },
  { id: "contact", label: "Contact" },
];

// What the avatar guide says as each section comes into view.
export const avatarLines: Record<string, string> = {
  hero: "Hi, I'm Faseeh. I keep systems fast, secure and up. Scroll down, let me show you around.",
  skills: "A pocketful of tools. Tap a technology to see how I use it.",
  work: "From EKS clusters to event-driven Lambdas, here's what I've built.",
  contact: "Got a system that needs to stay up? Let's talk.",
};

export const about = {
  paragraphs: [
    "I'm Mohamed Faseeh, a Site Reliability Engineer with 3 years of hands-on experience running cloud environments, application deployments and monitoring. Today I build end-to-end observability for Samsung's global e-commerce platform at Altimetrik, covering payments, checkout and order management.",
    "I work across AWS, Docker and Kubernetes, with Dynatrace, Grafana, OpenSearch and the Elastic Stack for logging and monitoring. I lead incident response and root-cause analysis, automate the toil away with Python and Jenkins, and I've carried the pager on 24/7 on-call rotations.",
  ],
  badge: {
    org: "ALTIMETRIK",
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

export type SkillFamily = "cloud" | "containers" | "monitoring" | "cicd" | "practices";

export type Skill = {
  name: string;
  glyph: string;
  family: SkillFamily;
  story: string;
  project: { label: string; title: string; href?: string };
};

export const skillFilters: { id: "all" | SkillFamily; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud" },
  { id: "containers", label: "Containers" },
  { id: "monitoring", label: "Monitoring" },
  { id: "cicd", label: "CI/CD" },
  { id: "practices", label: "Practices" },
];

const gh = (repo: string) => `https://github.com/mohamedfaseeh/${repo}`;

export const skills: Skill[] = [
  { name: "AWS", glyph: "A", family: "cloud",
    story: "EC2, ECS, EKS, Lambda, S3, IAM, API Gateway and CloudWatch. I've hosted, secured and monitored production workloads on AWS in every role.",
    project: { label: "SEE IT IN", title: "AWS Infrastructure Automation", href: gh("Load-Balanced-Web-Application") } },
  { name: "Terraform", glyph: "T", family: "cloud",
    story: "Infrastructure as code from VPC to EKS: modular, variable-driven and repeatable, so environments are rebuilt rather than hand-patched.",
    project: { label: "SEE IT IN", title: "Highly Available Web App on AWS", href: gh("Load-Balanced-Web-Application") } },
  { name: "Lambda", glyph: "λ", family: "cloud",
    story: "Serverless automation in Python and boto3, wired to EventBridge and CloudTrail so governance happens the moment a resource is created.",
    project: { label: "SEE IT IN", title: "Auto-Tagging with Lambda & EventBridge", href: gh("Auto-Tag-AWS-Resources") } },
  { name: "Linux", glyph: "L", family: "cloud",
    story: "Day-to-day Linux system administration: services, permissions, logs and the shell work behind every deployment and incident.",
    project: { label: "USED AT", title: "Avasoft · Chargebee · Altimetrik" } },
  { name: "Docker", glyph: "D", family: "containers",
    story: "Containerised applications with lean Dockerfiles so every environment, from laptop to production, runs the same image.",
    project: { label: "SEE IT IN", title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") } },
  { name: "Kubernetes", glyph: "K", family: "containers",
    story: "Amazon EKS clusters with Helm-managed releases, autoscaling and cluster-level monitoring for resilient microservices.",
    project: { label: "SEE IT IN", title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") } },
  { name: "Helm", glyph: "H", family: "containers",
    story: "Version-controlled, repeatable Kubernetes releases, deployed automatically from the pipeline.",
    project: { label: "SEE IT IN", title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") } },
  { name: "Dynatrace", glyph: "◆", family: "monitoring",
    story: "End-to-end observability for Samsung's global e-commerce platform: payments, checkout and order management.",
    project: { label: "USED AT", title: "Samsung (Altimetrik)" } },
  { name: "Grafana", glyph: "G", family: "monitoring",
    story: "Dashboards for application, pod and node health, built so on-call engineers see the problem before customers do.",
    project: { label: "SEE IT IN", title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") } },
  { name: "Prometheus", glyph: "P", family: "monitoring",
    story: "Cluster metrics with Alertmanager routing, plus Blackbox Exporter probes for uptime from the outside in.",
    project: { label: "SEE IT IN", title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") } },
  { name: "OpenSearch", glyph: "O", family: "monitoring",
    story: "Log search and dashboards for a global platform, the first stop in every root-cause analysis.",
    project: { label: "USED AT", title: "Samsung (Altimetrik)" } },
  { name: "Elastic Stack", glyph: "E", family: "monitoring",
    story: "Centralised logging with Elasticsearch, Fluentd/Logstash and Kibana, so every service tells its story in one place.",
    project: { label: "USED AT", title: "Avasoft" } },
  { name: "Splunk", glyph: "S", family: "monitoring",
    story: "Searching and correlating machine data while tracking errors and job executions across services.",
    project: { label: "IN THE TOOLKIT", title: "Monitoring & log analytics" } },
  { name: "GitHub", glyph: "⌘", family: "cicd",
    story: "Source control, pull-request reviews and pre-deployment checks before anything ships.",
    project: { label: "SEE IT ON", title: "github.com/mohamedfaseeh", href: "https://github.com/mohamedfaseeh" } },
  { name: "GitLab CI/CD", glyph: "∞", family: "cicd",
    story: "Pipelines that build, test and deploy, including versioned database schema changes with Liquibase.",
    project: { label: "USED AT", title: "Avasoft" } },
  { name: "Jenkins", glyph: "J", family: "cicd",
    story: "Build, test, Trivy scan, image push and Helm deploy in one pipeline, plus scheduled SRE automations.",
    project: { label: "SEE IT IN", title: "Netflix Clone on Amazon EKS", href: gh("DevSecOps-Project") } },
  { name: "Liquibase", glyph: "Q", family: "cicd",
    story: "Database schema changes versioned and rolled out through GitLab CI/CD, never by hand.",
    project: { label: "USED AT", title: "Avasoft" } },
  { name: "Python", glyph: "Py", family: "practices",
    story: "Automation with boto3, cron jobs and Slack/Mattermost bots, which cut manual triage by 80%.",
    project: { label: "SEE IT IN", title: "AWS IAM User Provisioning", href: gh("AWS-IAM-User-Provisioning") } },
  { name: "Incident response", glyph: "!", family: "practices",
    story: "Leading incidents, RCA and post-incident reviews while holding SLA compliance, and fixing causes, not symptoms.",
    project: { label: "IMPACT", title: "75% fewer recurring incidents" } },
  { name: "On-call", glyph: "↻", family: "practices",
    story: "24/7 rotations for critical production issues, backed by runbooks and alerting standards.",
    project: { label: "USED AT", title: "Chargebee · Altimetrik" } },
];

export const alsoInToolkit = [
  "Bash", "boto3", "AWS CLI", "EventBridge", "CloudTrail", "API Gateway", "WAF",
  "Nginx", "Trivy", "SonarQube", "Alertmanager", "Blackbox Exporter", "eksctl",
  "Runbooks", "RCA", "Change management", "Slack / Mattermost alerts",
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
  screen: { kicker: string; title: string; banner: string; rows: [string, string][] };
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
      banner: "All pods healthy.",
      rows: [["Pipeline", "build · scan · deploy"], ["Nodes", "autoscaling on"], ["Alerts", "0 firing"]],
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
      banner: "Cross-AZ, self-healing.",
      rows: [["Load balancer", "2 healthy targets"], ["Subnets", "2 zones"], ["Plan", "0 to change"]],
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
      banner: "90% less setup time.",
      rows: [["Users", "created"], ["Console", "reset on login"], ["Policies", "attached"]],
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
      banner: "Every resource, owned.",
      rows: [["CloudTrail", "event received"], ["Creator", "ARN resolved"], ["Tags", "applied"]],
    },
  },
];

export type Role = {
  year: string;
  period: string;
  eyebrow: string;
  title: string;
  org: string;
  summary: string;
  tags: string[];
};

export const roles: Role[] = [
  {
    year: "2025",
    period: "December 2025 – Present",
    eyebrow: "SITE RELIABILITY",
    title: "Site Reliability Engineer",
    org: "Samsung (Altimetrik)",
    summary:
      "Built end-to-end observability with Dynatrace, Grafana and OpenSearch for Samsung's global e-commerce platform, covering payments, checkout and order management. Lead incident response, RCA and post-incident reviews within SLA. Automated SRE operations with Python, Jenkins, cron jobs and Slack/Mattermost, cutting manual triage by 80%, and partnered with engineering on long-term fixes that reduced recurring incidents by 75%.",
    tags: ["Dynatrace", "Grafana", "OpenSearch", "Python", "Jenkins", "Incident response", "Runbooks"],
  },
  {
    year: "2024",
    period: "April 2024 – August 2025",
    eyebrow: "CLOUD RELIABILITY",
    title: "Cloud Reliability Engineer",
    org: "Chargebee",
    summary:
      "Monitored AWS infrastructure, tracking errors and job executions across services. Resolved incidents and service requests, escalating critical issues to module owners or third parties. Ran deployment pre-checks, reviewed and approved PRs, deployed artifacts to EC2 and ECS, fixed 5xx build failures with root-cause analysis, and took part in 24/7 on-call rotations.",
    tags: ["AWS", "EC2", "ECS", "Root cause analysis", "On-call", "Deployments"],
  },
  {
    year: "2023",
    period: "February 2023 – August 2023",
    eyebrow: "CLOUD & DEVOPS",
    title: "Cloud & DevOps Engineer",
    org: "Avasoft",
    summary:
      "Managed EC2, Lambda and S3 hosting and integrated APIs through API Gateway. Secured workloads with least-privilege IAM policies and WAF. Rolled out Liquibase with GitLab CI/CD for versioned schema changes, containerised applications with Docker on Linux, and set up the Elastic Stack, Prometheus, Grafana and Blackbox Exporter for monitoring.",
    tags: ["AWS", "IAM", "WAF", "GitLab CI/CD", "Liquibase", "Docker", "Elastic Stack"],
  },
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
  { value: 3, suffix: "", label: "Companies" },
  { value: 15, suffix: "+", label: "Technologies" },
  { region: "24 / 7", label: "On-call reliability" },
];

export const moments = [
  { symbol: "80%", eyebrow: "LESS MANUAL TRIAGE", title: "Automate the toil.", text: "SRE operations automated with Python, Jenkins, cron jobs and Slack/Mattermost alerts at Samsung (Altimetrik)." },
  { symbol: "75%", eyebrow: "FEWER REPEAT INCIDENTS", title: "Fix the cause.", text: "Partnered with engineering teams on long-term fixes instead of patching the same failure twice." },
  { symbol: "✦", eyebrow: "OBSERVABILITY AT SCALE", title: "See it first.", text: "End-to-end monitoring for Samsung's global e-commerce platform: payments, checkout and order management." },
];
