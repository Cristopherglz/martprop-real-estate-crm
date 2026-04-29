import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs, TabsList, TabsTrigger,
} from "@/components/ui/tabs";

const tabs = ["Comprar", "Alquilar", "Temporal"] as const;

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Comprar");
  const [q, setQ] = useState("");
  const nav = useNavigate();

  return (
    <div className={`w-full ${compact ? "" : "max-w-3xl mx-auto"}`}>
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="bg-background/80 border border-border/60 p-1 rounded-t-2xl rounded-b-none w-auto inline-flex">
          {tabs.map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5"
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="bg-card border border-border rounded-2xl rounded-tl-none shadow-elegant p-2 flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 px-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Barrio, ciudad o código (ej: Palermo)"
            className="border-0 focus-visible:ring-0 shadow-none px-0 h-12 text-base"
          />
        </div>
        <Button size="lg" variant="hero" onClick={() => nav(`/buscar?op=${tab}&q=${encodeURIComponent(q)}`)}>
          <Search className="h-4 w-4" /> Buscar propiedades
        </Button>
      </div>
    </div>
  );
}
