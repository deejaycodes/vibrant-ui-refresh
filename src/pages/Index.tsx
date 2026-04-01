import { Link } from "react-router-dom";
import { Shield, Phone, Heart, Scale, Baby, Lock, Clock, Globe, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuickExit from "@/components/QuickExit";

const helpCards = [
  { icon: Shield, title: "Safety Planning", desc: "Personalised safety strategies to help protect you and your family." },
  { icon: Globe, title: "Local Services", desc: "Connect with trusted support services and shelters near you." },
  { icon: Scale, title: "Legal Rights", desc: "Understand your legal options and protections available to you." },
  { icon: Heart, title: "Emotional Support", desc: "AI-powered compassionate listening available 24/7 in 11 languages." },
  { icon: Baby, title: "Children's Safety", desc: "Resources and guidance to protect children affected by abuse." },
  { icon: Lock, title: "Privacy First", desc: "Your conversations are confidential. No data shared without consent." },
];

const steps = [
  { num: "1", title: "Start a Conversation", desc: "Message SafeVoice on WhatsApp — free and confidential." },
  { num: "2", title: "Share Your Situation", desc: "Tell us what's happening at your own pace. We listen without judgement." },
  { num: "3", title: "Get Support", desc: "Receive a personalised safety plan and local service referrals." },
  { num: "4", title: "Take Next Steps", desc: "We help connect you with professionals who can assist further." },
];

const trustIndicators = [
  { icon: Clock, label: "24/7 Available" },
  { icon: Lock, label: "100% Confidential" },
  { icon: Heart, label: "Always Free" },
  { icon: Globe, label: "11 Languages" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <QuickExit />

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between h-14">
          <span className="text-lg font-bold text-primary">SafeVoice</span>
          <Link to="/login">
            <Button variant="ghost" size="sm">Partner Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-20 md:py-28 text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            You are not alone. Help is here.
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            SafeVoice provides free, confidential support for survivors of domestic abuse. 
            Talk to us anytime on WhatsApp — in your own language, at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2 text-base px-8">
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
              <Phone className="h-5 w-5" />
              Call a Helpline
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            {trustIndicators.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 text-sm opacity-80">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">How We Help</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive support designed around your needs and safety.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted">
        <div className="container py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Getting support is simple and safe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto">
                  {step.num}
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-10">
            <Button size="lg" className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2">
              <MessageCircle className="h-5 w-5" />
              Start a Conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Emergency Contacts</h2>
          <p className="text-muted-foreground text-lg">
            If you are in immediate danger, please call 999 or contact these helplines.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "National DA Helpline", number: "0808 2000 247", note: "24hrs, free" },
            { name: "Refuge", number: "0808 2000 247", note: "Women's aid" },
            { name: "Men's Advice Line", number: "0808 801 0327", note: "Male survivors" },
          ].map((line) => (
            <Card key={line.name}>
              <CardContent className="p-6 text-center space-y-2">
                <Phone className="h-6 w-6 text-accent mx-auto" />
                <h3 className="font-semibold text-foreground">{line.name}</h3>
                <p className="text-xl font-bold text-primary">{line.number}</p>
                <p className="text-xs text-muted-foreground">{line.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container py-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              SafeVoice does not store personal data. Your privacy is our priority.
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SafeVoice. Supporting survivors with compassion and technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
