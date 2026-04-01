import { Link } from "react-router-dom";
import {
  Shield,
  Heart,
  Scale,
  HandHeart,
  Baby,
  Lock,
  MessageCircle,
  Phone,
  Globe,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/447000000000?text=Hi";

const quickExit = () => {
  window.location.replace("https://www.bbc.co.uk/weather");
};

const helpCards = [
  { icon: Shield, title: "Safety planning", description: "Personalised plans to keep you and your family safe at home, online, and when leaving.", color: "from-blue-500/10 to-blue-600/5" },
  { icon: Globe, title: "Local services", description: "We connect you with refuges, outreach workers, and support services near you.", color: "from-teal-500/10 to-teal-600/5" },
  { icon: Scale, title: "Legal rights", description: "Understand your rights around injunctions, child custody, housing, and immigration.", color: "from-amber-500/10 to-amber-600/5" },
  { icon: HandHeart, title: "Emotional support", description: "A compassionate, trained advisor who listens without judgement — at your pace.", color: "from-rose-500/10 to-rose-600/5" },
  { icon: Baby, title: "Children's safety", description: "Guidance on safeguarding children and accessing specialist family support.", color: "from-purple-500/10 to-purple-600/5" },
  { icon: Lock, title: "Completely private", description: "End-to-end encrypted WhatsApp chat. We never share your information without consent.", color: "from-emerald-500/10 to-emerald-600/5" },
];

const iconColors = [
  "text-blue-600", "text-teal-600", "text-amber-600",
  "text-rose-600", "text-purple-600", "text-emerald-600",
];

const steps = [
  { step: 1, title: "Open WhatsApp", description: "Tap the green button to start a confidential chat." },
  { step: 2, title: "Tell us what you need", description: "Share as much or as little as you're comfortable with." },
  { step: 3, title: "Get matched with support", description: "Our AI copilot finds the right local services for you." },
  { step: 4, title: "Receive ongoing help", description: "Your advisor follows up to make sure you're safe." },
];

const languages = [
  "English", "Urdu", "Bengali", "Punjabi", "Arabic",
  "Polish", "Romanian", "Somali", "French", "Spanish", "Portuguese",
];

const emergencyContacts = [
  { label: "Emergency", number: "999", note: "Press 55 if you can't speak", tel: "tel:999" },
  { label: "National DA Helpline", number: "0808 2000 247", note: "Free, 24/7", tel: "tel:08082000247" },
  { label: "Samaritans", number: "116 123", note: "24/7 emotional support", tel: "tel:116123" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-foreground">
      {/* Quick Exit Button */}
      <button
        onClick={quickExit}
        className="fixed top-4 right-4 z-50 bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-red-600/25 hover:bg-red-700 hover:shadow-red-700/30 transition-all flex items-center gap-2"
        aria-label="Quick exit — leaves this site immediately"
      >
        <X className="h-4 w-4" strokeWidth={3} />
        Quick Exit
      </button>

      {/* Safety Banner */}
      <div className="bg-slate-800 text-slate-200 px-4 py-3 text-center text-sm">
        <Shield className="inline h-4 w-4 mr-1.5 -mt-0.5 text-slate-400" />
        Your safety comes first. Use a{" "}
        <strong className="text-white">private / incognito window</strong>{" "}
        and clear your browser history after visiting.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <Heart className="h-4 w-4" />
            Free & confidential support
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            You don't have to
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              face this alone
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed">
            Free, confidential support via WhatsApp — from trained advisors who
            understand domestic abuse. Available in your language, on your terms.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-8 py-6 rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-700/30 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> It's free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> End-to-end encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No app download needed
            </span>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-3">
            Our services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            How we help
          </h2>
          <p className="mt-4 text-slate-600 max-w-lg mx-auto">
            Whether you're in immediate danger or thinking about your options,
            we're here for every step.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {helpCards.map((card, i) => (
            <div
              key={card.title}
              className={`group relative rounded-2xl border border-slate-200/80 bg-gradient-to-br ${card.color} p-7 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`h-11 w-11 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 ${iconColors[i]}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100/50">
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-24">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-3">
              Simple process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              How it works
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="text-center group">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                  {s.step}
                </div>
                <h3 className="mt-5 font-semibold text-slate-900 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-24 text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-5">
          <Globe className="h-7 w-7" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Support in your language
        </h2>
        <p className="mt-4 text-slate-600">
          Our advisors can help you in any of these languages.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {languages.map((lang) => (
            <span
              key={lang}
              className="px-5 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors cursor-default"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-gradient-to-b from-red-50 to-rose-50 border-y border-red-100">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
            In immediate danger?
          </h2>
          <p className="text-center text-slate-600 mt-3 mb-10">
            If you or someone you know is in danger right now, call one of these numbers.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {emergencyContacts.map((c) => (
              <a
                key={c.label}
                href={c.tel}
                className="flex flex-col items-center rounded-2xl border border-red-200/60 bg-white p-8 text-center hover:shadow-lg hover:shadow-red-100/50 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl font-bold text-slate-900">{c.number}</span>
                <span className="mt-2 text-sm font-semibold text-slate-700">{c.label}</span>
                <span className="mt-1 text-xs text-slate-500">{c.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Are you a charity or NGO?
        </h2>
        <p className="mt-4 text-slate-600 max-w-lg mx-auto">
          Partner with SafeVoice to give your service users instant, multilingual
          domestic abuse support powered by AI.
        </p>
        <Link to="/">
          <Button
            variant="outline"
            size="lg"
            className="mt-8 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 px-8"
          >
            Learn more
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} SafeVoice. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
