import { TrendingUp, TrendingDown, Eye, MessageSquare, Home, DollarSign, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { properties, formatPrice } from "@/data/properties";

const stats = [
  { label: "Vistas (30d)", value: "12.482", delta: "+18.3%", up: true, icon: Eye },
  { label: "Leads recibidos", value: "342", delta: "+24.1%", up: true, icon: MessageSquare },
  { label: "Propiedades activas", value: "47", delta: "+3", up: true, icon: Home },
  { label: "Operaciones cerradas", value: "8", delta: "-2", up: false, icon: DollarSign },
];

const bars = [35, 55, 42, 78, 62, 90, 72, 85, 60, 95, 80, 68];
const days = ["L", "M", "M", "J", "V", "S", "D", "L", "M", "M", "J", "V"];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Hola, Lucía 👋</h1>
          <p className="text-muted-foreground mt-1">Esto es lo que pasa hoy en tu inmobiliaria.</p>
        </div>
        <Button asChild variant="hero">
          <Link to="/dashboard/publicar">Publicar propiedad</Link>
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 border-border shadow-card-soft hover:shadow-elegant transition-smooth">
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/5 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className={s.up ? "text-success bg-success/10" : "text-destructive bg-destructive/10"}>
                {s.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {s.delta}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-4">{s.label}</p>
            <p className="font-display text-3xl font-bold mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="p-6 lg:col-span-2 shadow-card-soft">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-lg">Vistas por día</h3>
              <p className="text-sm text-muted-foreground">Últimas 12 jornadas</p>
            </div>
            <Badge className="bg-success/10 text-success border-0">+18.3% vs período anterior</Badge>
          </div>
          <div className="h-56 flex items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-primary-gradient hover:opacity-80 transition-smooth" style={{ height: `${h}%` }} />
                <span className="text-xs text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top sources */}
        <Card className="p-6 shadow-card-soft">
          <h3 className="font-display font-bold text-lg mb-1">Origen de leads</h3>
          <p className="text-sm text-muted-foreground mb-5">Cómo llegan tus contactos</p>
          <div className="space-y-4">
            {[
              { src: "Búsqueda directa", pct: 42, color: "bg-primary" },
              { src: "WhatsApp", pct: 28, color: "bg-accent" },
              { src: "Recomendados", pct: 18, color: "bg-[hsl(var(--gold))]" },
              { src: "Otros", pct: 12, color: "bg-muted-foreground" },
            ].map((s) => (
              <div key={s.src}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{s.src}</span>
                  <span className="text-muted-foreground">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent properties */}
      <Card className="shadow-card-soft overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="font-display font-bold text-lg">Tus propiedades recientes</h3>
            <p className="text-sm text-muted-foreground">Rendimiento de los últimos 30 días</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard/propiedades">Ver todas <ArrowUpRight className="h-3 w-3" /></Link>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {properties.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-secondary/40 transition-smooth">
              <img src={p.image} alt="" className="h-16 w-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground truncate">{p.id} · {p.neighborhood}, {p.city}</p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-xs text-muted-foreground">Precio</p>
                <p className="font-semibold text-sm">{formatPrice(p)}</p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-xs text-muted-foreground">Vistas</p>
                <p className="font-semibold text-sm">{p.views.toLocaleString("es-AR")}</p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-xs text-muted-foreground">Leads</p>
                <p className="font-semibold text-sm">{p.contacts}</p>
              </div>
              <Badge variant="secondary" className={
                p.status === "Publicada" ? "bg-success/10 text-success" :
                p.status === "Reservada" ? "bg-warning/10 text-warning" : ""
              }>
                {p.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
