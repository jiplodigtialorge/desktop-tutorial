import React from "react";
import {
  Users,
  PhoneCall,
  Mail,
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Target,
  DollarSign,
  CheckCircle2,
  Clock3,
  Star,
  Activity,
  Building2,
} from "lucide-react";
import "../assets/crm.css";

const stats = [
  {
    label: "Active Deals",
    value: "32",
    delta: "+8 this month",
    icon: Briefcase,
    trend: "up",
  },
  {
    label: "Quarter Pipeline",
    value: "$1.42M",
    delta: "12% MoM",
    icon: Target,
    trend: "up",
  },
  {
    label: "Win Rate",
    value: "38%",
    delta: "-3% vs last quarter",
    icon: Activity,
    trend: "down",
  },
  {
    label: "Avg. Close Time",
    value: "24 days",
    delta: "2 days faster",
    icon: Clock3,
    trend: "up",
  },
];

const pipelineStages = [
  {
    name: "Prospecting",
    deals: [
      {
        company: "Northwind Logistics",
        owner: "Alex Kim",
        value: "$28,400",
        status: "Discovery call booked",
      },
      {
        company: "Zenith Labs",
        owner: "Priya Patel",
        value: "$19,900",
        status: "Awaiting brief",
      },
    ],
  },
  {
    name: "Qualified",
    deals: [
      {
        company: "Apex Security",
        owner: "Jamie Lee",
        value: "$46,300",
        status: "Proposal sent",
      },
      {
        company: "Greenstone Solar",
        owner: "Maria Ruiz",
        value: "$35,100",
        status: "Compliance review",
      },
    ],
  },
  {
    name: "Negotiation",
    deals: [
      {
        company: "Helix Health",
        owner: "Alex Kim",
        value: "$81,750",
        status: "Legal redlines",
      },
      {
        company: "Brightline Retail",
        owner: "Priya Patel",
        value: "$64,200",
        status: "Discount request",
      },
    ],
  },
  {
    name: "Closed Won",
    deals: [
      {
        company: "Cobalt Fintech",
        owner: "Jamie Lee",
        value: "$120,000",
        status: "Live onboarding",
      },
      {
        company: "Vertex Analytics",
        owner: "Maria Ruiz",
        value: "$98,500",
        status: "Kickoff scheduled",
      },
    ],
  },
];

const contacts = [
  {
    name: "Danielle Rivers",
    title: "VP of Operations",
    company: "Cobalt Fintech",
    segment: "Enterprise",
    score: 92,
    tags: ["Champion", "Renewal"],
  },
  {
    name: "Malik Thompson",
    title: "Head of Procurement",
    company: "Northwind Logistics",
    segment: "Mid-Market",
    score: 78,
    tags: ["Price sensitive"],
  },
  {
    name: "Sofia Martin",
    title: "IT Director",
    company: "Zenith Labs",
    segment: "Mid-Market",
    score: 84,
    tags: ["Security review"],
  },
  {
    name: "Kevin Wu",
    title: "Founder",
    company: "Brightline Retail",
    segment: "SMB",
    score: 74,
    tags: ["Fast close"],
  },
];

const activities = [
  {
    type: "Call",
    subject: "Renewal strategy with Cobalt",
    owner: "Alex Kim",
    time: "Today, 2:30pm",
  },
  {
    type: "Email",
    subject: "Proposal follow-up with Apex",
    owner: "Priya Patel",
    time: "Today, 11:00am",
  },
  {
    type: "Demo",
    subject: "Security review for Zenith",
    owner: "Jamie Lee",
    time: "Tomorrow, 9:00am",
  },
  {
    type: "Task",
    subject: "Send onboarding playbook",
    owner: "Maria Ruiz",
    time: "Tomorrow, 3:00pm",
  },
];

const tasks = [
  {
    label: "Build bespoke ROI calculator for Helix",
    due: "Due today",
    status: "On track",
  },
  {
    label: "Finalize MSA redlines with Vertex",
    due: "Due tomorrow",
    status: "Blocked",
  },
  {
    label: "Prep QBR deck for Cobalt",
    due: "Due Friday",
    status: "On track",
  },
];

const revenue = [
  { month: "Jan", value: 240 },
  { month: "Feb", value: 310 },
  { month: "Mar", value: 420 },
  { month: "Apr", value: 380 },
  { month: "May", value: 520 },
  { month: "Jun", value: 610 },
];

const Button = ({ children, variant = "primary", size = "md" }) => (
  <button className={`btn ${variant === "ghost" ? "btn--ghost" : variant === "subtle" ? "btn--subtle" : "btn--primary"}`}>
    {children}
  </button>
);

const Badge = ({ children, tone = "indigo" }) => (
  <span
    className={`badge ${
      tone === "success" ? "badge--success" : tone === "warning" ? "badge--warning" : tone === "muted" ? "badge--muted" : ""
    }`}
  >
    {children}
  </span>
);

function StatCard({ icon: Icon, label, value, delta, trend }) {
  const deltaClass = trend === "up" ? "stat-card__delta stat-card__delta--up" : "stat-card__delta stat-card__delta--down";

  return (
    <div className="card card--subtle">
      <div className="card__content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p className="stat-card__title">{label}</p>
          <div className="stat-card__value">
            <span>{value}</span>
            <span className={deltaClass}>
              {trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {delta}
            </span>
          </div>
        </div>
        <span className="icon-pill">
          <Icon size={24} />
        </span>
      </div>
    </div>
  );
}

function DealCard({ deal }) {
  return (
    <div className="deal-card">
      <div className="deal-card__top">
        <h4 className="deal-card__title">{deal.company}</h4>
        <Badge>{deal.value}</Badge>
      </div>
      <p className="deal-card__owner">Owner: {deal.owner}</p>
      <div className="deal-card__status">
        <Activity size={16} />
        <span>{deal.status}</span>
      </div>
    </div>
  );
}

function ContactRow({ contact }) {
  return (
    <div className="contact-row">
      <div>
        <p className="deal-card__title" style={{ margin: 0 }}>{contact.name}</p>
        <p className="contact-meta">
          {contact.title} · {contact.company}
        </p>
        <div className="tag-row">
          {contact.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <Badge tone="success">Score {contact.score}</Badge>
        <Badge tone="muted">{contact.segment}</Badge>
      </div>
    </div>
  );
}

function ActivityItem({ activity }) {
  const iconMap = {
    Call: PhoneCall,
    Email: Mail,
    Demo: CalendarClock,
    Task: CheckCircle2,
  };

  const Icon = iconMap[activity.type] || Activity;

  return (
    <div className="activity-row">
      <div className="activity-row__left">
        <span className="activity-icon">
          <Icon size={18} />
        </span>
        <div>
          <p className="deal-card__title" style={{ margin: 0 }}>{activity.subject}</p>
          <p className="contact-meta" style={{ marginBottom: 0 }}>{activity.owner}</p>
        </div>
      </div>
      <p className="contact-meta" style={{ margin: 0 }}>{activity.time}</p>
    </div>
  );
}

function TaskItem({ task }) {
  const tone = task.status === "Blocked" ? "warning" : "success";
  return (
    <div className="task-row">
      <div>
        <p className="deal-card__title" style={{ margin: 0 }}>{task.label}</p>
        <p className="contact-meta" style={{ margin: 0 }}>{task.due}</p>
      </div>
      <Badge tone={tone}>{task.status}</Badge>
    </div>
  );
}

function RevenueSparkline() {
  return (
    <div className="sparkline">
      {revenue.map((point) => (
        <div key={point.month}>
          <div className="sparkline__bar-wrap">
            <div className="sparkline__bar" style={{ height: `${point.value / 7}%` }} />
          </div>
          <p className="sparkline__label">{point.month}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <div className="hero">
        <div className="hero__grid">
          <div>
            <p className="hero__eyebrow">Growth CRM</p>
            <h1 className="hero__title">Atlas CRM Command Center</h1>
            <p className="hero__subtitle">
              Centralize your revenue team workflows: pipeline health, high-intent contacts, and deal velocity insights in one place.
            </p>
            <div className="hero__actions">
              <Button>Create deal</Button>
              <Button variant="ghost">Schedule sync</Button>
            </div>
          </div>
          <div className="hero__meta">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Users size={18} />
              <span>Team: Enterprise Sales</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Building2 size={18} />
              <span>ARR coverage: 3.2x</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Star size={18} />
              <span>CSAT: 4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      <main className="main">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="section-grid">
          <div className="card">
            <div className="card__content">
              <div className="section-header">
                <div>
                  <p className="section-meta">Pipeline</p>
                  <h2 className="section-title">Deal stages</h2>
                </div>
                <Badge>Realtime</Badge>
              </div>
              <div className="pipeline-grid">
                {pipelineStages.map((stage) => (
                  <div key={stage.name} className="pipeline-column">
                    <div className="pipeline-column__head">
                      <p className="deal-card__title" style={{ margin: 0 }}>{stage.name}</p>
                      <Badge tone="muted">{stage.deals.length}</Badge>
                    </div>
                    {stage.deals.map((deal) => (
                      <DealCard key={deal.company} deal={deal} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__content">
              <div className="section-header">
                <div>
                  <p className="section-meta">Signal Feed</p>
                  <h2 className="section-title">Latest activities</h2>
                </div>
                <Button variant="subtle">View log</Button>
              </div>
              <div className="list-divider">
                {activities.map((activity) => (
                  <ActivityItem key={activity.subject} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section-grid">
          <div className="card">
            <div className="card__content">
              <div className="section-header">
                <div>
                  <p className="section-meta">Book of Business</p>
                  <h2 className="section-title">Priority contacts</h2>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button variant="subtle">Add contact</Button>
                  <Button variant="ghost">Import CSV</Button>
                </div>
              </div>
              <div className="list-divider">
                {contacts.map((contact) => (
                  <ContactRow key={contact.name} contact={contact} />
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__content">
              <div className="section-header">
                <div>
                  <p className="section-meta">Tasks</p>
                  <h2 className="section-title">RevOps queue</h2>
                </div>
                <Badge tone="success">SLA: 4h</Badge>
              </div>
              <div className="list-divider">
                {tasks.map((task) => (
                  <TaskItem key={task.label} task={task} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section-grid">
          <div className="card">
            <div className="card__content">
              <div className="section-header">
                <div>
                  <p className="section-meta">Forecast</p>
                  <h2 className="section-title">ARR trend</h2>
                </div>
                <Badge>Next 6 months</Badge>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
                <RevenueSparkline />
                <div style={{ display: "grid", gap: "10px", alignContent: "start" }}>
                  <div className="story-item">
                    <span className="story-item__icon green">
                      <ArrowUpRight size={16} />
                    </span>
                    <span>Expansion deals outpacing churn by 4.2x</span>
                  </div>
                  <div className="story-item">
                    <span className="story-item__icon indigo">
                      <Clock3 size={16} />
                    </span>
                    <span>Average cycle reduced to 24 days</span>
                  </div>
                  <div className="story-item">
                    <span className="story-item__icon purple">
                      <Target size={16} />
                    </span>
                    <span>Northwind and Zenith flagged as high-intent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__content">
              <div className="section-header">
                <div>
                  <p className="section-meta">Customer story</p>
                  <h2 className="section-title">Cobalt Fintech</h2>
                </div>
                <Badge tone="success">Renewal</Badge>
              </div>
              <div className="story-grid">
                <div className="story-item">
                  <span className="story-item__icon green">
                    <CheckCircle2 size={16} />
                  </span>
                  <span>Onboarding phase complete</span>
                </div>
                <div className="story-item">
                  <span className="story-item__icon indigo">
                    <Mail size={16} />
                  </span>
                  <span>Weekly health summary shared</span>
                </div>
                <div className="story-item">
                  <span className="story-item__icon purple">
                    <CalendarClock size={16} />
                  </span>
                  <span>QBR scheduled for July 12</span>
                </div>
                <div className="story-item">
                  <span className="story-item__icon amber">
                    <DollarSign size={16} />
                  </span>
                  <span>Expansion: $220k multi-year add-on in review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
