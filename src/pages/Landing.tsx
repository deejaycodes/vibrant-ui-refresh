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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL =
  "https://wa.me/447000000000?text=Hi";

const quickExit = () => {
  window.location.replace("https://www.bbc.co.uk/weather");
};

const helpCards = [
  { icon: Shield, title: "Safety planning", description: "Personalised plans to keep you and your family safe at home, online, and when leaving." },
  { icon: Globe, title: "Local services", description: "We connect you with refuges, outreach workers, and support services near you." },
  { icon: Scale, title: "Legal rights", description: "Understand your rights around injunctions, child custody, housing, and immigration." },
  { icon: HandHeart, title: "Emotional support", description: "A compassionate, trained advisor who listens without judgement — at your pace." },
  { icon: Baby, title: "Children's safety", description: "Guidance on safeguarding children and accessing specialist family support." },
  { icon: Lock, title: "Completely private", description: "End-to-end encrypted WhatsApp chat. We never share your information without consent." },
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Quick Exit Button */}
      <button
        onClick={quickExit}
        className="fixed top-4 right-4 z-50 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity flex items-center gap-1.5"
        aria-label="Quick exit — leaves this site immediately"
      >
        <X className="h-4 w-4" />
        Quick Exit
      </button>

      {/* Safety Banner */}
      <div className="bg-muted border-b border-border px-4 py-3 text-center text-sm text-muted-foreground">
        <Shield className="inline h-4 w-4 mr-1.5 -mt-0.5" />
        Your safety comes first. Use a <strong>private / incognito window</strong> and clear your
        browser history after visiting.
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
        <div className="relative max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            You don't have to face&nbsp;this&nbsp;alone
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Free, confidential support via WhatsApp — from trained advisors who
            understand domestic abuse. Available in your language, on your terms.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[hsl(142,70%,35%)] hover:bg-[hsl(142,70%,30%)] text-white text-base px-8 py-6 rounded-xl shadow-md"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
            <span className="text-sm text-muted-foreground">
              It's free · End-to-end encrypted · No app download needed
            </span>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
          How we help
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
          Whether you're in immediate danger or thinking about your options, we're here for every step.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helpCards.map((card) => (
            <Card
              key={card.title}
              className="border border-border bg-card hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
        <Globe className="mx-auto h-8 w-8 text-primary mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Support in your language
        </h2>
        <p className="mt-3 text-muted-foreground">
          Our advisors can help you in any of these languages.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-destructive/5 border-y border-destructive/20">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-destructive" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              In immediate danger?
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            If you or someone you know is in danger right now, call one of these numbers.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {emergencyContacts.map((c) => (
              <a
                key={c.label}
                href={c.tel}
                className="flex flex-col items-center rounded-xl border border-destructive/20 bg-card p-6 text-center hover:shadow-md transition-shadow"
              >
                <span className="text-2xl font-bold text-foreground">{c.number}</span>
                <span className="mt-1 text-sm font-medium text-foreground">{c.label}</span>
                <span className="mt-1 text-xs text-muted-foreground">{c.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Are you a charity or NGO?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Partner with SafeVoice to give your service users instant, multilingual domestic abuse
          support powered by AI.
        </p>
        <Link to="/">
          <Button variant="outline" size="lg" className="mt-6">
            Learn more
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} SafeVoice. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
