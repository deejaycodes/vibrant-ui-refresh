import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, Search } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import { CardSkeleton } from "@/components/Skeletons";
import { getServices } from "@/lib/api";

interface Service {
  id: string;
  name: string;
  type: string;
  location: string;
  phone: string;
  website?: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data?.services || []))
      .catch(() => {
        setServices([
          { id: "S-001", name: "Women's Aid Shelter", type: "Shelter", location: "London, UK", phone: "020 7123 4567", website: "https://womensaid.org" },
          { id: "S-002", name: "Legal Aid Society", type: "Legal", location: "Manchester, UK", phone: "0161 234 5678" },
          { id: "S-003", name: "MIND Counselling", type: "Mental Health", location: "Birmingham, UK", phone: "0121 345 6789", website: "https://mind.org.uk" },
          { id: "S-004", name: "Refuge Housing", type: "Housing", location: "Leeds, UK", phone: "0113 456 7890" },
          { id: "S-005", name: "Children's Society", type: "Children", location: "Bristol, UK", phone: "0117 567 8901", website: "https://childrenssociety.org.uk" },
          { id: "S-006", name: "Victim Support", type: "Support", location: "Edinburgh, UK", phone: "0131 678 9012" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter((s) =>
    `${s.name} ${s.type} ${s.location}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Local Services</h1>
          <p className="text-sm text-muted-foreground mt-1">Directory of support services for referrals</p>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
              <Card key={s.id} className="shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm">{s.name}</h3>
                    <Badge variant="secondary" className="text-xs">{s.type}</Badge>
                  </div>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{s.location}</div>
                    <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{s.phone}</div>
                    {s.website && <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /><a href={s.website} target="_blank" rel="noopener" className="text-primary hover:underline truncate">{s.website}</a></div>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default Services;
