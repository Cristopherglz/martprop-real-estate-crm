import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail } from "lucide-react";

const leads = [
  { name: "Martín Rodríguez", prop: "Departamento Palermo", channel: "WhatsApp", date: "hace 5 min", status: "Nuevo" },
  { name: "Ana Pérez", prop: "Casa Nordelta", channel: "Email", date: "hace 1 h", status: "Contactado" },
  { name: "Diego López", prop: "Loft San Telmo", channel: "Form", date: "hace 3 h", status: "Visita" },
  { name: "Sofía Castro", prop: "Penthouse Belgrano", channel: "WhatsApp", date: "ayer", status: "Cerrado" },
  { name: "Ignacio Vera", prop: "Departamento Palermo", channel: "Llamada", date: "ayer", status: "Nuevo" },
];

const channelIcon = { WhatsApp: MessageSquare, Email: Mail, Form: MessageSquare, Llamada: Phone } as const;
const statusCls: Record<string, string> = {
  Nuevo: "bg-accent/10 text-accent",
  Contactado: "bg-warning/10 text-warning",
  Visita: "bg-primary/10 text-primary",
  Cerrado: "bg-success/10 text-success",
};

export default function DashboardLeads() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground mt-1">Bandeja unificada de contactos</p>
      </div>
      <Card className="shadow-card-soft overflow-hidden">
        <div className="divide-y divide-border">
          {leads.map((l, i) => {
            const Icon = channelIcon[l.channel as keyof typeof channelIcon];
            return (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-secondary/40 transition-smooth">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary font-semibold">
                  {l.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{l.prop}</p>
                </div>
                <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" /> {l.channel}
                </div>
                <p className="hidden md:block text-xs text-muted-foreground w-20 text-right">{l.date}</p>
                <Badge className={`${statusCls[l.status]} border-0`}>{l.status}</Badge>
                <Button size="sm" variant="soft">Abrir</Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
