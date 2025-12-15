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

// --- START: Mocked Shadcn/ui Components for this example ---
// These are simplified versions to make the code runnable in one file.
const Card = ({ children, className }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, className, variant, size, onClick }) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  const sizes = {
    sm: "h-9 px-4",
    lg: "h-11 px-8 py-2",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${
        sizes[size] || ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};
// --- END: Mocked Shadcn/ui Components ---

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

function StatCard({ icon: Icon, label, value, delta, trend }) {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-2xl font-bold">{value}</p>
            <span
              className={`flex items-center gap-1 text-xs font-semibold ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {delta}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-full bg-indigo-50 text-indigo-700">
          <Icon size={24} />
        </div>
      </CardContent>
    </Card>
  );
}

function DealCard({ deal }) {
  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900">{deal.company}</p>
        <Badge variant="info">{deal.value}</Badge>
      </div>
      <p className="text-sm text-gray-600">Owner: {deal.owner}</p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Activity size={16} />
        <span>{deal.status}</span>
      </div>
    </div>
  );
}

function ContactRow({ contact }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div>
        <p className="font-semibold text-gray-900">{contact.name}</p>
        <p className="text-sm text-gray-600">
          {contact.title} · {contact.company}
        </p>
        <div className="flex gap-2 mt-1">
          {contact.tags.map((tag) => (
            <Badge key={tag} variant="info">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="success">Score {contact.score}</Badge>
        <Badge variant="default">{contact.segment}</Badge>
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
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-indigo-50 text-indigo-700">
          <Icon size={18} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{activity.subject}</p>
          <p className="text-sm text-gray-600">{activity.owner}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">{activity.time}</p>
    </div>
  );
}

function TaskItem({ task }) {
  const variant = task.status === "Blocked" ? "warning" : "success";
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div>
        <p className="font-semibold text-gray-900">{task.label}</p>
        <p className="text-sm text-gray-600">{task.due}</p>
      </div>
      <Badge variant={variant}>{task.status}</Badge>
    </div>
  );
}

function RevenueSparkline() {
  return (
    <div className="mt-4 grid grid-cols-6 gap-3">
      {revenue.map((point) => (
        <div key={point.month} className="text-center">
          <div className="h-24 bg-indigo-50 rounded-lg flex items-end justify-center">
            <div
              className="w-8 bg-indigo-600 rounded-md"
              style={{ height: `${point.value / 8}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-600">{point.month}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-800 text-white pb-12">
        <div className="max-w-6xl mx-auto px-6 pt-12 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">Growth CRM</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Atlas CRM Command Center</h1>
            <p className="mt-3 text-indigo-100 max-w-2xl">
              Centralize your revenue team workflows: pipeline health, high-intent contacts, and deal velocity insights in one place.
            </p>
            <div className="flex gap-3 mt-6">
              <Button size="lg" className="bg-white text-indigo-800 hover:bg-indigo-50">
                Create deal
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-indigo-700 text-white hover:bg-indigo-600"
              >
                Schedule sync
              </Button>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 text-sm text-indigo-100">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>Team: Enterprise Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={18} />
              <span>ARR coverage: 3.2x</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>CSAT: 4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 space-y-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Pipeline</p>
                  <h2 className="text-xl font-bold">Deal stages</h2>
                </div>
                <Badge variant="info">Realtime</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {pipelineStages.map((stage) => (
                  <div key={stage.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{stage.name}</p>
                      <Badge variant="default">{stage.deals.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {stage.deals.map((deal) => (
                        <DealCard key={deal.company} deal={deal} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Signal Feed</p>
                  <h2 className="text-xl font-bold">Latest activities</h2>
                </div>
                <Button size="sm" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                  View log
                </Button>
              </div>
              <div className="space-y-1">
                {activities.map((activity) => (
                  <ActivityItem key={activity.subject} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white lg:col-span-2">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Book of Business</p>
                  <h2 className="text-xl font-bold">Priority contacts</h2>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                    Add contact
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white text-gray-700 border">
                    Import CSV
                  </Button>
                </div>
              </div>
              <div className="divide-y">
                {contacts.map((contact) => (
                  <ContactRow key={contact.name} contact={contact} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Tasks</p>
                  <h2 className="text-xl font-bold">RevOps queue</h2>
                </div>
                <Badge variant="success">SLA: 4h</Badge>
              </div>
              <div className="divide-y">
                {tasks.map((task) => (
                  <TaskItem key={task.label} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white lg:col-span-2">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Forecast</p>
                  <h2 className="text-xl font-bold">ARR trend</h2>
                </div>
                <Badge variant="info">Next 6 months</Badge>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <RevenueSparkline />
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight size={16} className="text-green-600" />
                    <span>Expansion deals outpacing churn by 4.2x</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 size={16} className="text-indigo-600" />
                    <span>Average cycle reduced to 24 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-purple-600" />
                    <span>Northwind and Zenith flagged as high-intent</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Customer story</p>
                  <h2 className="text-xl font-bold">Cobalt Fintech</h2>
                </div>
                <Badge variant="success">Renewal</Badge>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Onboarding phase complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-indigo-600" />
                  <span>Weekly health summary shared</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock size={16} className="text-purple-600" />
                  <span>QBR scheduled for July 12</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-amber-600" />
                  <span>Expansion: $220k multi-year add-on in review</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
