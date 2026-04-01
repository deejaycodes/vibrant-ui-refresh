import { useState } from "react";
import {
  Headphones,
  Zap,
  FileText,
  Clock,
  X,
  MessageCircle,
  Shield,
  Users,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Search,
} from "lucide-react";

const tabs = ["Overview", "Cases", "Copilot", "Reports"] as const;
type Tab = typeof tabs[number];

const MockBrowserChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
    <div className="bg-slate-800 px-4 sm:px-6 py-3 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-3 h-3 rounded-full bg-emerald-400" />
      </div>
      <span className="text-xs text-slate-400 ml-4">{title}</span>
    </div>
    {children}
  </div>
);

const OverviewScreen = () => (
  <div className="p-4 sm:p-6 space-y-4">
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Active cases", value: "47", change: "+3 today", color: "text-emerald-600" },
        { label: "Avg response", value: "4 min", change: "↓ 12%", color: "text-emerald-600" },
        { label: "This month", value: "128", change: "+18%", color: "text-emerald-600" },
        { label: "Risk: High", value: "8", change: "2 new", color: "text-amber-600" },
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-4">
          <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
        </div>
      ))}
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { icon: Headphones, title: "Live case dashboard", desc: "See all active cases, risk levels, and next actions at a glance." },
        { icon: Zap, title: "Smart copilot", desc: "AI suggests local services, drafts safety plans, and flags high-risk cases." },
        { icon: FileText, title: "Automated reporting", desc: "One-click reports for funders, commissioners, and internal reviews." },
        { icon: Clock, title: "Follow-up scheduling", desc: "Never miss a check-in. Automated reminders keep survivors supported." },
      ].map((f) => (
        <div key={f.title} className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <f.icon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CasesScreen = () => {
  const cases = [
    { id: "SV-1042", risk: "High", lang: "Urdu", status: "Active", lastMsg: "2 min ago", worker: "Sarah K." },
    { id: "SV-1041", risk: "Medium", lang: "English", status: "Active", lastMsg: "15 min ago", worker: "James L." },
    { id: "SV-1039", risk: "High", lang: "Bengali", status: "Follow-up", lastMsg: "1 hr ago", worker: "Sarah K." },
    { id: "SV-1038", risk: "Low", lang: "Polish", status: "Active", lastMsg: "2 hrs ago", worker: "Amy R." },
    { id: "SV-1035", risk: "Medium", lang: "English", status: "Resolved", lastMsg: "1 day ago", worker: "James L." },
  ];
  const riskColors: Record<string, string> = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };
  const statusColors: Record<string, string> = {
    Active: "bg-blue-100 text-blue-700",
    "Follow-up": "bg-purple-100 text-purple-700",
    Resolved: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Active Cases</h3>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
          <Search className="h-3 w-3" />
          Search cases…
        </div>
      </div>
      <div className="rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs text-slate-500 font-medium">
              <th className="px-4 py-2.5">Case</th>
              <th className="px-4 py-2.5 hidden sm:table-cell">Risk</th>
              <th className="px-4 py-2.5 hidden sm:table-cell">Language</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5 hidden lg:table-cell">Last message</th>
              <th className="px-4 py-2.5 hidden lg:table-cell">Caseworker</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.id}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskColors[c.risk]}`}>{c.risk}</span>
                </td>
                <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{c.lang}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">{c.lastMsg}</td>
                <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{c.worker}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CopilotScreen = () => (
  <div className="p-4 sm:p-6 space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <Zap className="h-4 w-4" />
      </div>
      <h3 className="font-semibold text-slate-900">AI Copilot — Case SV-1042</h3>
    </div>
    <div className="space-y-3">
      <div className="rounded-xl bg-red-50 border border-red-100 p-4">
        <div className="flex items-center gap-2 text-red-700 text-sm font-semibold mb-1">
          <AlertTriangle className="h-4 w-4" />
          High Risk Detected
        </div>
        <p className="text-xs text-red-600 leading-relaxed">
          Survivor reports escalating threats and controlling behaviour. Partner has access to phone. Recommend immediate safety planning and refuge referral.
        </p>
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
        <p className="text-xs text-slate-500 font-medium mb-2">Suggested services</p>
        <div className="space-y-2">
          {[
            { name: "Birmingham Women's Aid Refuge", type: "Refuge", distance: "2.3 miles" },
            { name: "IDVA Service — West Midlands", type: "Advocacy", distance: "Local" },
            { name: "Childline — Family Support", type: "Children", distance: "National" },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-lg bg-white border border-slate-100 px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-500">{s.type} · {s.distance}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-emerald-500 shrink-0" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
        <p className="text-xs text-emerald-700 font-medium mb-1">Draft safety plan generated</p>
        <p className="text-xs text-emerald-600 leading-relaxed">
          Includes: safe word with neighbour, emergency bag location, children's school contact, injunction guidance, phone privacy checklist.
        </p>
      </div>
    </div>
  </div>
);

const ReportsScreen = () => (
  <div className="p-4 sm:p-6 space-y-4">
    <h3 className="font-semibold text-slate-900">Impact Reports</h3>
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
      {[
        { label: "Survivors supported", value: "342", period: "This quarter" },
        { label: "Avg time to safety plan", value: "18 min", period: "vs 2.5 hrs manual" },
        { label: "Languages served", value: "9", period: "This quarter" },
        { label: "Referrals made", value: "156", period: "This quarter" },
        { label: "Follow-up completion", value: "94%", period: "30-day rate" },
        { label: "Caseworker time saved", value: "62%", period: "vs baseline" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-4">
          <p className="text-xs text-slate-500 font-medium">{s.label}</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{s.value}</p>
          <p className="text-xs text-emerald-600 mt-1">{s.period}</p>
        </div>
      ))}
    </div>
    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-emerald-800">Funder-ready exports</p>
        <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
          One-click PDF and CSV reports formatted for commissioners, funders, and board meetings. Anonymised data only.
        </p>
      </div>
    </div>
  </div>
);

const screenComponents: Record<Tab, React.FC> = {
  Overview: OverviewScreen,
  Cases: CasesScreen,
  Copilot: CopilotScreen,
  Reports: ReportsScreen,
};

const DashboardPreview = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const ActiveScreen = screenComponents[activeTab];

  return (
    <>
      {/* Inline preview — clickable */}
      <div
        onClick={() => setModalOpen(true)}
        className="cursor-pointer group relative"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
      >
        <MockBrowserChrome title="SafeVoice Dashboard">
          <OverviewScreen />
        </MockBrowserChrome>
        <div className="absolute inset-0 rounded-2xl bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
            Click to explore the dashboard
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-3 -right-3 z-10 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <MockBrowserChrome title="SafeVoice Dashboard — Interactive Preview">
              {/* Tabs */}
              <div className="border-b border-slate-100 px-4 sm:px-6 flex gap-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "border-emerald-500 text-emerald-700"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Screen content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <ActiveScreen />
              </div>
            </MockBrowserChrome>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPreview;
