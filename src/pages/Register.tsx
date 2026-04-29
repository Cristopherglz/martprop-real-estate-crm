import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Building2, Briefcase, HardHat, User, Check } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const types = [
  { id: "inmobiliaria", label: "Inmobiliaria", icon: Building2 },
  { id: "corredor", label: "Corredor", icon: Briefcase },
  { id: "desarrolladora", label: "Desarrolladora", icon: HardHat },
  { id: "particular", label: "Particular", icon: User },
];

export default function Register() {
  const nav = useNavigate();
  const [type, setType] = useState("inmobiliaria");

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Sumate gratis y empezá a publicar en minutos"
      footer={<>¿Ya tenés cuenta? <Link to="/login" className="font-semibold text-foreground hover:text-accent">Ingresar</Link></>}
    >
      <form onSubmit={(e) => { e.preventDefault(); nav("/dashboard"); }} className="space-y-5">
        <div>
          <Label className="mb-3 block">¿Cómo te identificás?</Label>
          <div className="grid grid-cols-2 gap-2">
            {types.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={cn(
                  "relative p-3 rounded-xl border text-left transition-smooth",
                  type === t.id
                    ? "border-primary bg-primary/5 shadow-card-soft"
                    : "border-border hover:border-foreground/30 hover:bg-secondary/40"
                )}
              >
                <t.icon className="h-5 w-5 mb-2 text-accent" />
                <p className="text-sm font-medium">{t.label}</p>
                {type === t.id && (
                  <span className="absolute top-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Apellido</Label>
            <Input id="lastname" required className="h-11" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required className="h-11" placeholder="vos@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required className="h-11" placeholder="Mínimo 8 caracteres" />
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">Crear mi cuenta</Button>
        <p className="text-xs text-muted-foreground text-center">
          Al registrarte aceptás nuestros <a className="underline" href="#">Términos</a> y <a className="underline" href="#">Privacidad</a>.
        </p>
      </form>
    </AuthLayout>
  );
}
