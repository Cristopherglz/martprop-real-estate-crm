import { Link } from "react-router-dom";
import { Plus, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { properties, formatPrice } from "@/data/properties";

export default function DashboardProperties() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Mis propiedades</h1>
          <p className="text-muted-foreground mt-1">{properties.length} propiedades publicadas</p>
        </div>
        <Button asChild variant="hero">
          <Link to="/dashboard/publicar"><Plus className="h-4 w-4" /> Nueva propiedad</Link>
        </Button>
      </div>

      <Card className="p-3 flex gap-2 flex-wrap items-center shadow-card-soft">
        <Input placeholder="Buscar por título, dirección, código…" className="flex-1 min-w-[220px] border-border" />
        <Button variant="outline"><Filter className="h-4 w-4" /> Filtros</Button>
        <Button variant="soft">Estado: Todas</Button>
        <Button variant="soft">Operación: Todas</Button>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => (
          <Card key={p.id} className="overflow-hidden shadow-card-soft hover:shadow-elegant transition-smooth">
            <div className="relative aspect-[16/10]">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">{p.operation}</Badge>
              <button className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-background/90 hover:bg-background">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display font-semibold leading-snug">{p.title}</p>
                <Badge variant="secondary" className={
                  p.status === "Publicada" ? "bg-success/10 text-success" :
                  p.status === "Reservada" ? "bg-warning/10 text-warning" : ""
                }>{p.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{p.id} · {p.neighborhood}, {p.city}</p>
              <p className="font-display text-xl font-bold">{formatPrice(p)}</p>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center">
                <div><p className="font-semibold">{p.views.toLocaleString("es-AR")}</p><p className="text-xs text-muted-foreground">Vistas</p></div>
                <div><p className="font-semibold">{p.contacts}</p><p className="text-xs text-muted-foreground">Leads</p></div>
                <div><p className="font-semibold">{((p.contacts / p.views) * 100).toFixed(1)}%</p><p className="text-xs text-muted-foreground">Conv.</p></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
