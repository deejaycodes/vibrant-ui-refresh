import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Plus, PhoneOff, UserCheck, Circle } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { TableSkeleton } from "@/components/Skeletons";
import {
  getActiveHandoffs, startHandoff, endHandoff,
  getHandoffMessages, sendHandoffMessage,
  sendTypingIndicator, clearTypingIndicator,
  markMessageRead, getPresence,
} from "@/lib/api";
import { toast } from "sonner";

interface HandoffSession {
  survivorId: string;
  caseworkerName: string;
  status?: string;
  phone?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "inbound" | "outbound";
  timestamp: string;
  read?: boolean;
}

interface PresenceData {
  typing?: boolean;
  online?: boolean;
}

const Handoff = () => {
  const [handoffs, setHandoffs] = useState<HandoffSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [presence, setPresence] = useState<PresenceData>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSurvivorId, setNewSurvivorId] = useState("");
  const [newCaseworker, setNewCaseworker] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout>>();

  const selected = handoffs.find((h) => h.survivorId === selectedId);

  // Fetch handoffs
  const fetchHandoffs = useCallback(() => {
    getActiveHandoffs()
      .then((data) => setHandoffs(data?.handoffs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchHandoffs(); }, [fetchHandoffs]);

  // Fetch messages for selected handoff (poll every 3s)
  useEffect(() => {
    if (!selectedId) return;

    const fetchMessages = () => {
      getHandoffMessages(selectedId)
        .then((data) => {
          const msgs = data?.messages || [];
          setMessages(msgs);
          // Mark unread messages as read
          msgs.filter((m: ChatMessage) => m.sender === "inbound" && !m.read)
            .forEach((m: ChatMessage) => markMessageRead(selectedId, m.id).catch(() => {}));
        })
        .catch(() => {});
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedId]);

  // Poll presence
  useEffect(() => {
    if (!selectedId) return;
    const fetchPresence = () => {
      getPresence(selectedId).then(setPresence).catch(() => setPresence({}));
    };
    fetchPresence();
    const interval = setInterval(fetchPresence, 5000);
    return () => clearInterval(interval);
  }, [selectedId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedId || !selected) return;
    setSending(true);
    try {
      await sendHandoffMessage(selectedId, selected.phone || "", input.trim(), selected.caseworkerName);
      setInput("");
      // Immediately fetch new messages
      const data = await getHandoffMessages(selectedId);
      setMessages(data?.messages || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setSending(false);
      clearTypingIndicator(selectedId).catch(() => {});
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!selectedId) return;
    // Typing indicator
    sendTypingIndicator(selectedId).catch(() => {});
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      clearTypingIndicator(selectedId).catch(() => {});
    }, 2000);
  };

  const handleStartHandoff = async () => {
    if (!newSurvivorId.trim() || !newCaseworker.trim()) {
      toast.error("Both fields are required");
      return;
    }
    try {
      await startHandoff(newSurvivorId.trim(), newCaseworker.trim());
      toast.success("Handoff started");
      setDialogOpen(false);
      setNewSurvivorId("");
      setNewCaseworker("");
      fetchHandoffs();
    } catch (err: any) {
      toast.error(err.message || "Failed to start handoff");
    }
  };

  const handleEndHandoff = async (survivorId: string) => {
    try {
      await endHandoff(survivorId);
      toast.success("Handoff ended");
      if (selectedId === survivorId) {
        setSelectedId(null);
        setMessages([]);
      }
      fetchHandoffs();
    } catch (err: any) {
      toast.error(err.message || "Failed to end handoff");
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Live Handoff</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time messaging with survivors during case handoff</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" />Start Handoff</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start Handoff</DialogTitle>
                <DialogDescription>Begin a live handoff session with a survivor.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Survivor ID *</Label>
                  <Input placeholder="e.g. SV-001" value={newSurvivorId} onChange={(e) => setNewSurvivorId(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Caseworker Name *</Label>
                  <Input placeholder="Your name" value={newCaseworker} onChange={(e) => setNewCaseworker(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleStartHandoff}>Start</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-12rem)]">
          {/* Left panel — handoff list */}
          <Card className="shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Handoffs</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-2 space-y-1">
              {loading ? (
                <div className="p-2 space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-md bg-muted animate-pulse" />
                  ))}
                </div>
              ) : handoffs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No active handoffs</p>
              ) : (
                handoffs.map((h) => (
                  <div
                    key={h.survivorId}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedId === h.survivorId ? "bg-accent" : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedId(h.survivorId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{h.survivorId}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); handleEndHandoff(h.survivorId); }}
                      >
                        <PhoneOff className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{h.caseworkerName}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Right panel — chat */}
          <Card className="shadow-sm overflow-hidden flex flex-col">
            {!selectedId ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Select a handoff to start messaging
              </div>
            ) : (
              <>
                {/* Chat header */}
                <div className="border-b px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{selectedId}</span>
                    {presence.online && (
                      <div className="flex items-center gap-1 text-xs text-success">
                        <Circle className="h-2 w-2 fill-current" />Online
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{selected?.caseworkerName}</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">No messages yet</p>
                  )}
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "outbound" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === "outbound" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        <p>{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${
                          msg.sender === "outbound" ? "text-primary-foreground/60" : "text-muted-foreground"
                        }`}>{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  {presence.typing && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                        Typing…
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Type a message…"
                      disabled={sending}
                    />
                    <Button type="submit" disabled={sending || !input.trim()} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Handoff;
