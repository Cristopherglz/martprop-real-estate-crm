import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const days = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
const series = days.map((_, i) => 40 + Math.round(Math.sin(i / 3) * 18 + Math.random() * 22));

export default function DashboardStats() {
  const max = Math.max(...series);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Estadísticas</h1>
        <p className="text-muted-foreground mt-1">Performance integral de tu portfolio</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Vistas totales", "48.221", "+22%"],
          ["Leads", "1.284", "+18%"],
          ["Tasa de contacto", "2.66%", "+0.4"],
          ["Tiempo prom. en publicar", "32 días", "-5"],
        ].map(([t, v, d]) => (
          <Card key={t} className="p-5 shadow-card-soft">
            <p className="text-sm text-muted-foreground">{t}</p>
            <p className="font-display text-3xl font-bold mt-2">{v}</p>
            <Badge variant="secondary" className="bg-success/10 text-success border-0 mt-2">{d}</Badge>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-card-soft">
        <h3 className="font-display font-bold text-lg">Vistas — últimos 30 días</h3>
        <div className="mt-6 h-64 relative">
          <svg viewBox="0 0 600 220" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const pts = series.map((v, i) => `${(i / (series.length - 1)) * 600},${220 - (v / max) * 200}`).join(" ");
              return (
                <>
                  <polyline fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" points={pts} />
                  <polygon fill="url(#g)" points={`0,220 ${pts} 600,220`} />
                </>
              );
            })()}
          </svg>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card-soft">
          <h3 className="font-display font-bold text-lg mb-4">Top zonas</h3>
          <div className="space-y-4">
            {[["Palermo", 84], ["Belgrano", 71], ["Nordelta", 58], ["San Telmo", 42], ["Recoleta", 36]].map(([z, p]) => (
              <div key={z as string}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{z}</span><span className="text-muted-foreground">{p}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary-gradient" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 shadow-card-soft">
          <h3 className="font-display font-bold text-lg mb-4">Distribución por operación</h3>
          <div className="space-y-4">
            {[["Venta", 58, "bg-primary"], ["Alquiler", 28, "bg-accent"], ["Alquiler temporario", 14, "bg-[hsl(var(--gold))]"]].map(([t, p, c]) => (
              <div key={t as string}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{t}</span><span className="text-muted-foreground">{p}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full ${c}`} style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
