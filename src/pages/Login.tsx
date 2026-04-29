import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav("/dashboard"), 600);
  };

  return (
    <AuthLayout
      title="Bienvenido de vuelta"
      subtitle="Ingresá a tu panel MartProp"
      footer={<>¿No tenés cuenta? <Link to="/register" className="font-semibold text-foreground hover:text-accent">Crear cuenta</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="vos@email.com" className="pl-9 h-11" required />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">¿Olvidaste?</a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type="password" placeholder="••••••••" className="pl-9 h-11" required />
          </div>
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Ingresando…" : "Ingresar"}
        </Button>
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">o continuá con</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" size="lg">Google</Button>
          <Button type="button" variant="outline" size="lg">Apple</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
