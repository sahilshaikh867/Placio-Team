import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Camera,
  Check,
  ChevronRight,
  Flame,
  Globe,
  HeartHandshake,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Image Placeholder / Portrait Component
 * Designed for the Black & Neon Orange High-Density theme.
 * Displays photo when provided, or an obsidian carbon frame with neon orange accent.
 */
interface ImagePlaceholderProps {
  photo?: string | null;
  name?: string;
  variant?: "portrait" | "avatar" | "avatar-sm";
  className?: string;
  tag?: string;
}

export function ImagePlaceholder({
  photo,
  name,
  variant = "portrait",
  className,
  tag = "Image Placeholder",
}: ImagePlaceholderProps) {
  if (photo) {
    return (
      <div
        className={cn(
          "image-placeholder-box relative overflow-hidden",
          variant === "portrait" && "image-placeholder-portrait",
          variant === "avatar" && "image-placeholder-avatar",
          className
        )}
      >
        <img
          src={photo}
          alt={name || "Team Member"}
          className="image-real-photo"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "image-placeholder-box select-none",
        variant === "portrait" && "image-placeholder-portrait",
        variant === "avatar" && "image-placeholder-avatar",
        className
      )}
      title="Photo placeholder (Add photo URL in code to replace)"
    >
      {variant === "portrait" ? (
        <>
          <div className="rounded p-2.5 bg-orange-500/10 text-orange-500 image-placeholder-icon border border-orange-500/30">
            <Camera className="w-5 h-5" />
          </div>
          <span className="image-placeholder-tag">{tag}</span>
          <span className="text-[9px] text-zinc-500 font-mono mt-0.5">
            JPG / PNG / WebP
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-orange-500 image-placeholder-icon">
          <User className="w-5 h-5" />
          <span className="text-[7px] font-black uppercase tracking-wider mt-0.5 text-zinc-400">
            Photo
          </span>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// LEADERSHIP DATA
// -------------------------------------------------------------

interface Leader {
  id: string;
  name: string;
  role: string;
  badge: string;
  photo: string | null;
  quote: string;
  responsibilities: string[];
}

const mainLeadership: Leader[] = [
  {
    id: "founder",
    name: "Rajesh More",
    role: "Founder & Visionary",
    badge: "Founder",
    photo: null, // Add photo URL here e.g. "/images/rajesh-more.jpg"
    quote:
      "A bold vision becomes meaningful when it creates enduring value for students, institutions, and the digital future.",
    responsibilities: [
      "Strategic Vision",
      "Executive Direction",
      "Organizational Culture",
      "Global Representation",
    ],
  },
  {
    id: "co-founder-1",
    name: "Pradeep Paygude",
    role: "Co-Founder & Strategic Partner",
    badge: "Co-Founder",
    photo: null, // Add photo URL here e.g. "/images/pradeep-paygude.jpg"
    quote:
      "Disciplined financial governance and seamless operational rhythm transform ambitious ideas into lasting impact.",
    responsibilities: [
      "Business Strategy",
      "Operations Architecture",
      "Enterprise Expansion",
      "Strategic Partnerships",
    ],
  },
  {
    id: "co-founder-2",
    name: "Dipankar Telgote",
    role: "Co-Founder & Strategic Partner",
    badge: "Co-Founder",
    photo: null, // Add photo URL here e.g. "/images/dipankar-telgote.jpg"
    quote:
      "Empowering young talent with industry-ready technology and training requires continuous focus on quality and synergy.",
    responsibilities: [
      "Strategic Expansion",
      "Institutional Synergy",
      "Key Initiatives",
      "Value Creation",
    ],
  },
  {
    id: "ceo",
    name: "Sahil Shaikh",
    role: "Chief Executive Officer (CEO)",
    badge: "Chief Executive",
    photo: null, // Add photo URL here e.g. "/images/sahil-shaikh.jpg"
    quote:
      "Execution is where innovation earns its place—bridging academic potential and industry excellence with precision.",
    responsibilities: [
      "Company Leadership",
      "Vision-to-Execution",
      "Technology & Growth",
      "Stakeholder Value",
    ],
  },
];

// -------------------------------------------------------------
// C-SUITE EXECUTIVE DATA
// -------------------------------------------------------------

interface ExecutiveRole {
  id: string;
  name: string;
  title: string;
  roleCode: "CFO" | "COO" | "CTO" | "CMO" | "CHRO" | "CPO";
  department: string;
  photo: string | null;
  quote: string;
  keyPillars: string[];
}

const executiveTeam: ExecutiveRole[] = [
  {
    id: "cfo",
    name: "Pradeep Paygude",
    title: "Chief Financial Officer",
    roleCode: "CFO",
    department: "Finance",
    photo: null,
    quote:
      "Fiscal integrity, structured risk governance, and disciplined capital allocation fuel our long-term sustainable growth.",
    keyPillars: ["Capital Strategy", "Financial Governance", "Risk & Compliance"],
  },
  {
    id: "coo",
    name: "Pradeep Paygude",
    title: "Chief Operating Officer",
    roleCode: "COO",
    department: "Operations",
    photo: null,
    quote:
      "Flawless operations transform strategic roadmaps into dependable, measurable daily value for colleges and partners.",
    keyPillars: ["Operational Excellence", "Process Optimization", "Delivery Systems"],
  },
  {
    id: "cto",
    name: "Sahil Shaikh",
    title: "Chief Technology Officer",
    roleCode: "CTO",
    department: "Technology",
    photo: null,
    quote:
      "Intelligent technology and robust AI architectures must simplify complex placement workflows and empower thousands.",
    keyPillars: ["AI & Cloud Architecture", "Scalable Systems", "Security & Reliability"],
  },
  {
    id: "cmo",
    name: "Rushi Wagh",
    title: "Chief Marketing Officer",
    roleCode: "CMO",
    department: "Marketing",
    photo: null,
    quote:
      "A trusted brand is built through consistent value, authentic storytelling, and meaningful relationships with academia.",
    keyPillars: ["Brand Positioning", "Institutional Outreach", "Growth Marketing"],
  },
  {
    id: "chro",
    name: "Sayali Paygude",
    title: "Chief Human Resources Officer",
    roleCode: "CHRO",
    department: "Human Resources",
    photo: null,
    quote:
      "People are our greatest differentiator. We cultivate an inclusive culture where passion and purpose thrive together.",
    keyPillars: ["Talent Acquisition", "People Culture", "Leadership Development"],
  },
  {
    id: "cpo",
    name: "Rajesh More",
    title: "Chief Product Officer",
    roleCode: "CPO",
    department: "Product",
    photo: null,
    quote:
      "World-class products begin by listening deeply to educators and students, crafting intuitive, impact-driven tools.",
    keyPillars: ["Product Vision", "UI/UX Excellence", "Continuous Discovery"],
  },
];

// -------------------------------------------------------------
// DEPARTMENTAL SUB-TEAMS (EXACT PLACEHOLDER COUNTS - NO NAMES)
// -------------------------------------------------------------

interface SubTeamMember {
  role: string;
  focus: string;
  photo: string | null;
  skills: string[];
}

interface DepartmentSubTeam {
  id: string;
  departmentName: string;
  executiveLeader: string;
  executiveTitle: string;
  memberCountText: string;
  gridType: "3" | "4" | "10";
  members: SubTeamMember[];
}

const departmentSubTeams: DepartmentSubTeam[] = [
  // 1. CFO - 3 members
  {
    id: "dept-cfo",
    departmentName: "Finance & Accounting",
    executiveLeader: "Pradeep Paygude",
    executiveTitle: "CFO",
    memberCountText: "3 Members",
    gridType: "3",
    members: [
      {
        role: "Financial Analyst",
        focus: "Fiscal planning, forecasting, and budget variance modeling.",
        photo: null,
        skills: ["Financial Analysis", "Budgeting", "Fiscal Modeling"],
      },
      {
        role: "Accounts & Treasury Specialist",
        focus: "Corporate ledger reconciliation, payables, and fiscal audits.",
        photo: null,
        skills: ["Ledger Management", "Treasury", "Reconciliation"],
      },
      {
        role: "Tax & Compliance Associate",
        focus: "Statutory compliances, GST filings, and regulatory reporting.",
        photo: null,
        skills: ["Tax Compliance", "Statutory Audit", "Risk Mitigation"],
      },
    ],
  },

  // 2. COO - 3 members
  {
    id: "dept-coo",
    departmentName: "Operations & Delivery",
    executiveLeader: "Pradeep Paygude",
    executiveTitle: "COO",
    memberCountText: "3 Members",
    gridType: "3",
    members: [
      {
        role: "Operations Lead",
        focus: "Cross-departmental project workflows and execution rhythms.",
        photo: null,
        skills: ["Workflow Ops", "SOP Development", "Program Delivery"],
      },
      {
        role: "Process Optimization Specialist",
        focus: "Efficiency metrics, SLA monitoring, and quality standards.",
        photo: null,
        skills: ["Process Design", "KPI Tracking", "Operational Quality"],
      },
      {
        role: "Logistics & Facilities Coordinator",
        focus: "Vendor management, equipment logistics, and site operations.",
        photo: null,
        skills: ["Vendor Relations", "Logistics", "Workplace Support"],
      },
    ],
  },

  // 3. CTO - 10 members
  {
    id: "dept-cto",
    departmentName: "Technology & Engineering",
    executiveLeader: "Sahil Shaikh",
    executiveTitle: "CTO",
    memberCountText: "10 Members",
    gridType: "10",
    members: [
      {
        role: "Lead Software Architect",
        focus: "High-concurrency cloud architecture and system design.",
        photo: null,
        skills: ["Cloud Architecture", "System Design", "Scalability"],
      },
      {
        role: "Senior Backend Engineer",
        focus: "Robust microservices, database schemas, and REST/gRPC APIs.",
        photo: null,
        skills: ["Node.js / Go", "PostgreSQL", "API Security"],
      },
      {
        role: "Senior Frontend Engineer",
        focus: "High-performance React interfaces and responsive design systems.",
        photo: null,
        skills: ["React 19", "TypeScript", "Tailwind CSS"],
      },
      {
        role: "Full Stack Engineer",
        focus: "End-to-end feature lifecycle and assessment engine logic.",
        photo: null,
        skills: ["Full Stack", "Next.js", "Web Engineering"],
      },
      {
        role: "Mobile App Developer",
        focus: "Cross-platform mobile applications for iOS & Android students.",
        photo: null,
        skills: ["React Native", "Flutter", "Mobile APIs"],
      },
      {
        role: "DevOps & Cloud Engineer",
        focus: "Automated CI/CD pipelines, Docker containers, and Kubernetes.",
        photo: null,
        skills: ["Docker", "Kubernetes", "AWS / GCP"],
      },
      {
        role: "AI & Machine Learning Engineer",
        focus: "AI mock interview models, proctoring algorithms, and NLP.",
        photo: null,
        skills: ["Machine Learning", "Python", "GenAI Models"],
      },
      {
        role: "Cloud Systems Specialist",
        focus: "Site reliability, 99.99% system uptime, and disaster recovery.",
        photo: null,
        skills: ["SRE", "Infrastructure", "Monitoring"],
      },
      {
        role: "QA & Automation Lead",
        focus: "Automated end-to-end testing, test matrices, and QA signoffs.",
        photo: null,
        skills: ["Cypress", "Playwright", "Test Automation"],
      },
      {
        role: "Cybersecurity & Compliance Engineer",
        focus: "Data privacy, DPDP compliance, and vulnerability mitigation.",
        photo: null,
        skills: ["Data Privacy", "Pen-testing", "DPDPA 2023"],
      },
    ],
  },

  // 4. CMO - 3 members
  {
    id: "dept-cmo",
    departmentName: "Marketing & Growth",
    executiveLeader: "Rushi Wagh",
    executiveTitle: "CMO",
    memberCountText: "3 Members",
    gridType: "3",
    members: [
      {
        role: "Brand Strategist",
        focus: "Corporate identity, institution positioning, and campaigns.",
        photo: null,
        skills: ["Brand Strategy", "Campaign Design", "EdTech Marketing"],
      },
      {
        role: "Digital Growth Specialist",
        focus: "Performance marketing, SEO/SEM, and lead acquisition.",
        photo: null,
        skills: ["Growth Marketing", "SEO / SEM", "Data Analytics"],
      },
      {
        role: "Content & Media Lead",
        focus: "Editorial storytelling, PR announcements, and social media.",
        photo: null,
        skills: ["Content Strategy", "Public Relations", "Social Media"],
      },
    ],
  },

  // 5. CHRO - 4 members
  {
    id: "dept-chro",
    departmentName: "Human Resources & Talent",
    executiveLeader: "Sayali Paygude",
    executiveTitle: "CHRO",
    memberCountText: "4 Members",
    gridType: "4",
    members: [
      {
        role: "Talent Acquisition Specialist",
        focus: "Tech recruitment, campus hiring, and executive sourcing.",
        photo: null,
        skills: ["Recruiting", "Talent Sourcing", "Interviewing"],
      },
      {
        role: "HR Operations Lead",
        focus: "Employee policies, onboarding workflows, and compliance.",
        photo: null,
        skills: ["HR Operations", "People Care", "Policy Design"],
      },
      {
        role: "Learning & Development Specialist",
        focus: "Skill workshops, career frameworks, and mentoring.",
        photo: null,
        skills: ["L&D Programs", "Skill Mapping", "Employee Training"],
      },
      {
        role: "Employee Engagement Coordinator",
        focus: "Workplace culture, wellness programs, and feedback cycles.",
        photo: null,
        skills: ["Culture Building", "Wellness", "Retention"],
      },
    ],
  },

  // 6. CPO - 3 members
  {
    id: "dept-cpo",
    departmentName: "Product & Experience",
    executiveLeader: "Rajesh More",
    executiveTitle: "CPO",
    memberCountText: "3 Members",
    gridType: "3",
    members: [
      {
        role: "Senior Product Manager",
        focus: "Placement SaaS roadmap, feature prioritization, and sprints.",
        photo: null,
        skills: ["Product Roadmap", "User Research", "Agile Execution"],
      },
      {
        role: "Lead UI/UX Designer",
        focus: "User journey mapping, interactive prototypes, and design systems.",
        photo: null,
        skills: ["Figma", "UI/UX Systems", "Prototyping"],
      },
      {
        role: "Product Analytics Specialist",
        focus: "Product telemetry, student engagement metrics, and feedback loops.",
        photo: null,
        skills: ["Product Metrics", "Cohort Analysis", "Telemetry"],
      },
    ],
  },
];

const corporateValues = [
  { label: "Innovation", icon: Lightbulb },
  { label: "Collaboration", icon: Users },
  { label: "High Growth", icon: TrendingUp },
  { label: "Integrity & Trust", icon: ShieldCheck },
  { label: "Student Centric", icon: HeartHandshake },
  { label: "Operational Precision", icon: Star },
];

export function TeamPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen dark-texture-bg text-[#f8fafc] font-sans antialiased overflow-x-hidden">
      {/* Subtle background illustration watermark */}
      <div className="page-bg-illustration" aria-hidden="true" />

      {/* ------------------------------------------------------------- */}
      {/* 0. PLACIOBRIDGE TOP NAVIGATION (BLACK & NEON ORANGE)          */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2.5 px-3 sm:px-6">
        <nav
          className="max-w-7xl mx-auto rounded-lg transition-all duration-300 bg-black/85 backdrop-blur-xl border border-orange-500/20 py-2.5 px-4 sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              className="flex items-center gap-3 group"
              aria-label="PlacioBridge Technologies - Home"
              href="https://placiobridge.com/"
            >
              <div className="relative p-0.5 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 group-hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(255,85,0,0.4)]">
                <img
                  alt="PlacioBridge Technologies logo"
                  width="36"
                  height="36"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-black object-cover"
                  src="/logo.png"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black text-white tracking-tight">
                  Placio<span className="text-gradient-orange font-black">Bridge</span>
                </span>
                <span className="block text-[8px] font-bold text-zinc-400 -mt-0.5 tracking-widest uppercase">
                  TECHNOLOGIES LLP
                </span>
              </div>
            </a>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1 bg-[#111118] p-1 rounded-md border border-[#22222e]">
              <a
                className="px-3.5 py-1.5 rounded text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                href="https://placiobridge.com/"
              >
                Home
              </a>
              <a
                className="px-3.5 py-1.5 rounded text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                href="https://placiobridge.com/about"
              >
                About
              </a>
              <a
                className="px-3.5 py-1.5 rounded text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                href="https://placiobridge.com/products"
              >
                Products
              </a>
              <a
                className="px-3.5 py-1.5 rounded text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                href="https://placiobridge.com/services"
              >
                Services
              </a>
              <a
                className="px-3.5 py-1.5 rounded text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_12px_rgba(255,85,0,0.5)]"
                href="#leadership"
              >
                Our Team
              </a>
              <a
                className="px-3.5 py-1.5 rounded text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                href="https://placiobridge.com/contact"
              >
                Contact
              </a>
            </div>

            {/* Right CTA */}
            <div className="hidden lg:flex items-center">
              <a
                className="btn-neon-orange"
                href="https://placiobridge.com/contact?interest=demo"
              >
                Request Demo <Flame className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md bg-[#161622] text-zinc-300 hover:text-orange-400 transition-colors border border-[#2a2a38]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden transition-all duration-300 pt-3 pb-1 border-t border-[#22222e] mt-2 space-y-1">
              <a
                className="block px-3 py-2 rounded text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-orange-400 hover:bg-white/5"
                href="https://placiobridge.com/"
              >
                Home
              </a>
              <a
                className="block px-3 py-2 rounded text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-orange-400 hover:bg-white/5"
                href="https://placiobridge.com/about"
              >
                About
              </a>
              <a
                className="block px-3 py-2 rounded text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-orange-400 hover:bg-white/5"
                href="https://placiobridge.com/products"
              >
                Products
              </a>
              <a
                className="block px-3 py-2 rounded text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-orange-400 hover:bg-white/5"
                href="https://placiobridge.com/services"
              >
                Services
              </a>
              <a
                className="block px-3 py-2 rounded text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-amber-500"
                href="#leadership"
              >
                Our Team
              </a>
              <a
                className="block px-3 py-2 rounded text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-orange-400 hover:bg-white/5"
                href="https://placiobridge.com/contact"
              >
                Contact
              </a>
              <a
                className="block mt-2 px-4 py-2.5 text-center btn-neon-orange"
                href="https://placiobridge.com/contact?interest=demo"
              >
                Request Demo
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (BLACK & NEON ORANGE HIGH IMPACT)             */}
      {/* ------------------------------------------------------------- */}
      <section className="hero-section-dense" aria-labelledby="hero-title">
        <div className="page-shell relative z-10 text-center">
          <div className="brand-badge-neon">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            Leadership & Organizational Teams
          </div>

          <h1 id="hero-title" className="hero-title-dense">
            The Minds Behind <span className="text-gradient-orange">PlacioBridge</span>
          </h1>

          <p className="hero-subtitle-dense">
            Empowering students and institutions with industry-ready skills,
            intelligent technology, and passionate leaders building the future of
            campus placements across India.
          </p>

          <div className="impact-pills-dense">
            <span>People</span>
            <i />
            <span>Ideas</span>
            <i />
            <span>Impact</span>
            <i />
            <span>Execution</span>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="#leadership"
              className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
            >
              Explore Hierarchy <ArrowDown className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. CORE LEADERSHIP HIERARCHY (Founder, 2 Co-Founders, CEO)    */}
      {/* ------------------------------------------------------------- */}
      <section id="leadership" className="section-space-dense">
        <div className="page-shell">
          <header className="section-heading-dense">
            <span className="eyebrow-neon">
              <Zap className="w-3 h-3 text-orange-500" /> Executive Pillars
            </span>
            <h2>Core Leadership</h2>
            <p>
              Visionary leaders shaping strategic direction, campus partnerships,
              and enterprise technology for institutions nationwide.
            </p>
          </header>

          <div className="leadership-grid-dense">
            {mainLeadership.map((leader) => (
              <article key={leader.id} className="leadership-card-dense">
                <span className="leader-badge-neon">{leader.badge}</span>

                <div className="mt-3 aspect-[4/3] w-full">
                  <ImagePlaceholder
                    photo={leader.photo}
                    name={leader.name}
                    variant="portrait"
                    tag="Leader Photo"
                  />
                </div>

                <h3 className="leader-name-dense">{leader.name}</h3>
                <p className="leader-title-dense">{leader.role}</p>

                <blockquote className="leader-quote-dense">
                  “{leader.quote}”
                </blockquote>

                <div className="mt-auto pt-3 border-t border-[#1e1e28]">
                  <span className="text-[9px] font-black text-zinc-500 tracking-wider uppercase block mb-1.5">
                    Core Focus Areas
                  </span>
                  <div className="chip-container-dense">
                    {leader.responsibilities.map((resp) => (
                      <span key={resp} className="chip-item-dense">
                        <Check />
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. C-SUITE EXECUTIVE LEADERSHIP GRID                         */}
      {/* ------------------------------------------------------------- */}
      <section className="executive-section-dense section-space-dense">
        <div className="page-shell">
          <header className="section-heading-dense">
            <span className="eyebrow-neon">
              <Zap className="w-3 h-3 text-orange-500" /> Executive Operations
            </span>
            <h2>C-Suite Leadership</h2>
            <p>
              Dedicated functional heads orchestrating finance, operations,
              technology, marketing, talent, and product innovation.
            </p>
          </header>

          <div className="executive-grid-dense">
            {executiveTeam.map((exec) => (
              <article key={exec.id} className="executive-card-dense">
                <div className="executive-card-header-dense">
                  <ImagePlaceholder
                    photo={exec.photo}
                    name={exec.name}
                    variant="avatar"
                    className="border border-orange-500/40"
                  />
                  <div className="min-w-0">
                    <span className="exec-role-pill-dense dept-pill-neon">{exec.roleCode}</span>
                    <h3 className="exec-name-dense mt-0.5 truncate">{exec.name}</h3>
                    <p className="exec-title-dense truncate">{exec.title}</p>
                  </div>
                </div>

                <div className="executive-card-body-dense">
                  <blockquote className="exec-quote-dense">
                    “{exec.quote}”
                  </blockquote>

                  <div className="mt-3 pt-2.5 border-t border-[#1a1a24]">
                    <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block mb-1.5">
                      Strategic Mandates
                    </span>
                    <div className="chip-container-dense">
                      {exec.keyPillars.map((pillar) => (
                        <span key={pillar} className="chip-item-dense">
                          <Check />
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. DEPARTMENTAL SUB-TEAMS (EXACT PLACEHOLDER COUNTS)         */}
      {/* ------------------------------------------------------------- */}
      <section className="section-space-dense">
        <div className="page-shell">
          <header className="section-heading-dense">
            <span className="eyebrow-neon">
              <Zap className="w-3 h-3 text-orange-500" /> Organizational Teams
            </span>
            <h2>Departmental & Technical Teams</h2>
            <p>
              Structured specialized squads driving technology development,
              academic training, operational execution, and student support.
            </p>
          </header>

          {departmentSubTeams.map((dept) => (
            <div key={dept.id} className="department-block-dense">
              <div className="department-block-header-dense">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    Headed by {dept.executiveLeader} ({dept.executiveTitle})
                  </span>
                  <h3 className="department-block-title-dense mt-0.5">
                    {dept.departmentName}
                  </h3>
                  <p className="department-block-subtitle-dense">
                    Technical & operational specialists executing core company mandates.
                  </p>
                </div>
                <div className="department-count-badge-dense dept-pill-neon">
                  <Users className="w-3 h-3" />
                  {dept.memberCountText}
                </div>
              </div>

              {/* Subteam Grid */}
              <div
                className={cn(
                  dept.gridType === "10" && "subteam-grid-cto-dense",
                  dept.gridType === "4" && "subteam-grid-4-dense",
                  dept.gridType === "3" && "subteam-grid-dense"
                )}
              >
                {dept.members.map((member, idx) => (
                  <div key={idx} className="member-card-dense">
                    <div className="aspect-[4/3] w-full">
                      <ImagePlaceholder
                        photo={member.photo}
                        name={member.role}
                        variant="portrait"
                        tag={`Member ${idx + 1}`}
                      />
                    </div>

                    <span className="member-placeholder-tag-dense">
                      [ Team Member Placeholder ]
                    </span>
                    <h4 className="member-role-dense">{member.role}</h4>
                    <p className="member-focus-dense">{member.focus}</p>

                    <div className="chip-container-dense mt-auto">
                      {member.skills.map((skill) => (
                        <span key={skill} className="chip-item-dense">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. VALUES SECTION                                            */}
      {/* ------------------------------------------------------------- */}
      <section className="values-container-dense" aria-labelledby="values-heading">
        <div className="page-shell">
          <h2 id="values-heading" className="sr-only">
            Core Corporate Values
          </h2>
          <div className="values-grid-dense">
            {corporateValues.map(({ label, icon: Icon }) => (
              <div key={label} className="value-item-dense">
                <Icon />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. CALL TO ACTION (CTA)                                      */}
      {/* ------------------------------------------------------------- */}
      <section id="contact" className="cta-section-dense">
        <div className="page-shell">
          <span className="eyebrow-neon">
            <Zap className="w-3 h-3 text-orange-500" /> Transform Placements & Skills
          </span>
          <h2 className="mt-1 text-white uppercase text-2xl sm:text-4xl font-black">
            Ready to transform your institution?
          </h2>
          <p className="max-w-xl mx-auto mt-2 text-zinc-400 text-sm">
            Join engineering colleges across Maharashtra and India modernising
            placements, skill training, and assessments with PlacioBridge.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a
              href="https://placiobridge.com/contact?interest=demo"
              className="btn-neon-orange"
            >
              Request a Demo <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://placiobridge.com/contact"
              className="btn-neon-outline"
            >
              Get in Touch <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. PLACIOBRIDGE OFFICIAL FOOTER (DARK & ORANGE)              */}
      {/* ------------------------------------------------------------- */}
      <footer
        className="bg-black text-zinc-400 border-t border-orange-500/20 py-12"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-0.5 rounded-md bg-gradient-to-tr from-orange-600 to-amber-500 shadow-[0_0_12px_rgba(255,85,0,0.4)]">
                  <img
                    alt="PlacioBridge Technologies logo"
                    width="32"
                    height="32"
                    className="w-8 h-8 rounded-[4px] bg-black object-cover"
                    src="/logo.png"
                  />
                </div>
                <div>
                  <span className="text-lg font-black text-white tracking-tight">
                    Placio<span className="text-orange-500">Bridge</span>
                  </span>
                  <span className="block text-[8px] text-zinc-500 font-bold -mt-0.5 tracking-widest uppercase">
                    TECHNOLOGIES LLP
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Empowering Students & Institutions with Industry-Ready Skills and
                Intelligent Technology.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/company/placiobridge-technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#14141d] hover:bg-orange-600 hover:text-black rounded flex items-center justify-center transition-all border border-[#262636] text-white"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:ceo@placiobridge.com"
                  className="w-8 h-8 bg-[#14141d] hover:bg-orange-600 hover:text-black rounded flex items-center justify-center transition-all border border-[#262636] text-white"
                  aria-label="Email us"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
                Navigation
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li>
                  <a href="https://placiobridge.com/" className="hover:text-orange-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/about" className="hover:text-orange-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/products" className="hover:text-orange-400 transition-colors">
                    Products (Placio Platform)
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/services" className="hover:text-orange-400 transition-colors">
                    Services & Training
                  </a>
                </li>
                <li>
                  <a href="#leadership" className="text-orange-400 font-bold">
                    Our Leadership & Team
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/contact" className="hover:text-orange-400 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Solutions */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
                Solutions
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li>
                  <a href="https://placiobridge.com/products" className="hover:text-orange-400 transition-colors">
                    Placio Smart Campus
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/services#industry-training" className="hover:text-orange-400 transition-colors">
                    Industry Training to Colleges
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/services#placement-guidance" className="hover:text-orange-400 transition-colors">
                    Placement Guidance & Prep
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/services#internships" className="hover:text-orange-400 transition-colors">
                    Domain Internships
                  </a>
                </li>
                <li>
                  <a href="https://placiobridge.com/contact?interest=demo" className="hover:text-orange-400 transition-colors">
                    AI Assessment Engine
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3">
                Headquarters
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>Thane, Maharashtra, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <a href="mailto:ceo@placiobridge.com" className="hover:text-orange-400 transition-colors">
                    ceo@placiobridge.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <a href="tel:+918928467499" className="hover:text-orange-400 transition-colors">
                    +91 89284 67499
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 mt-8 border-t border-[#1c1c28] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <p>© {new Date().getFullYear()} PlacioBridge Technologies LLP. All rights reserved.</p>
            <p className="text-center sm:text-right text-zinc-400">
              Committed to protecting student data in accordance with India's DPDP Act, 2023.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
