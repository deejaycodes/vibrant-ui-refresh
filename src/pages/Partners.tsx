import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  MessageCircle,
  BarChart3,
  Globe,
  Users,
  Clock,
  Bot,
  FileText,
  ArrowRight,
  CheckCircle2,
  Headphones,
  Lock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: MessageCircle,
    title: "WhatsApp-first intake",
    description:
      "Survivors reach you via WhatsApp — no app downloads, no waiting rooms. Messages are end-to-end encrypted.",
  },
  {
    icon: Globe,
    title: "Multilingual support",
    description:
      "Automatic translation across 11+ languages so language is never a barrier to safety.",
  },
  {
    icon: Bot,
    title: "AI-assisted triage",
    description:
      "Intelligent copilot helps your caseworkers assess risk, suggest services, and draft safety plans faster.",
  },
  {
    icon: Users,
    title: "Referral management",
    description:
      "Track every case from first contact to resolution. Assign caseworkers, set follow-ups, and monitor outcomes.",
  },
  {
    icon: BarChart3,
    title: "Impact analytics",
    description:
      "Real-time dashboards showing caseload, response times, outcomes, and funding-ready reports.",
  },
  {
    icon: Lock,
    title: "Data security & compliance",
    description:
      "GDPR-compliant, role-based access, full audit trails. Your survivors' data is never shared without consent.",
  },
];

const benefits = [
  "Reduce caseworker admin time by up to 60%",
  "Reach survivors who won't call a helpline",
  "Serve multilingual communities without extra staffing",
  "Generate funder-ready impact reports automatically",
  "24/7 availability — survivors get help outside office hours",
  "No hardware or IT infrastructure required",
];

const dashboardFeatures = [
  {
    icon: Headphones,
    title: "Live case dashboard",
    description: "See all active cases, risk levels, and next actions at a glance.",
  },
  {
    icon: Zap,
    title: "Smart copilot",
    description: "AI suggests local services, drafts safety plans, and flags high-risk cases.",
  },
  {
    icon: FileText,
    title: "Automated reporting",
    description: "One-click reports for funders, commissioners, and internal reviews.",
  },
  {
    icon: Clock,
    title: "Follow-up scheduling",
    description: "Never miss a check-in. Automated reminders keep survivors supported.",
  },
];

const Partners = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            For charities & NGOs
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Empower your team to
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              protect more survivors
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SafeVoice gives your organisation an AI-powered platform to deliver
            faster, multilingual domestic abuse support — via the app survivors
            already use every day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-base px-8 py-6 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
              >
                Get started free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Free for small organisations · No credit card required
          </p>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-3">
            Platform capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Everything your team needs
          </h2>
          <p className="mt-4 text-slate-600 max-w-lg mx-auto">
            A complete case management system designed specifically for domestic
            abuse services.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group rounded-2xl border border-slate-200/80 bg-white p-7 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <cap.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100/50">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-3">
              Your dashboard
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              See every case at a glance
            </h2>
            <p className="mt-4 text-slate-600 max-w-lg mx-auto">
              Purpose-built for caseworkers — not adapted from a generic CRM.
            </p>
          </div>

          {/* Mock dashboard preview */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-slate-800 px-6 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs text-slate-400 ml-4">
                SafeVoice Dashboard
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                {[
                  { label: "Active cases", value: "47", change: "+3 today" },
                  { label: "Avg response", value: "4 min", change: "↓ 12%" },
                  { label: "This month", value: "128", change: "+18%" },
                  { label: "Risk: High", value: "8", change: "2 new" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-slate-50 border border-slate-100 p-4"
                  >
                    <p className="text-xs text-slate-500 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {dashboardFeatures.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-4 rounded-xl bg-slate-50 border border-slate-100 p-5"
                  >
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {f.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-3">
            Why SafeVoice
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            The impact for your organisation
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm leading-relaxed">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to transform your service?
          </h2>
          <p className="mt-4 text-emerald-100 max-w-lg mx-auto">
            Join organisations across the UK already using SafeVoice to reach
            more survivors, faster.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 text-base px-8 py-6 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                Create your free account
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-emerald-200">
            Set up in under 5 minutes · No technical skills needed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} SafeVoice. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/landing" className="hover:text-slate-900 transition-colors">
              Survivor Support
            </Link>
            <a href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Partners;
