import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { sendCopilotMessage } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Copilot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your SafeVoice Copilot. I can help you with case assessments, safety planning, and finding local services. How can I assist you today?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendCopilotMessage(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: data.response, timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm sorry, I wasn't able to process that request. Please try again or contact support.", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Copilot</h1>
          <p className="text-sm text-muted-foreground mt-1">AI assistant for case management support</p>
        </div>
        <Card className="flex-1 flex flex-col shadow-sm overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2.5 text-sm text-muted-foreground">Thinking…</div>
              </div>
            )}
            <div ref={bottomRef} />
          </CardContent>
          <div className="border-t p-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a case, safety plan, or local services…"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default Copilot;
