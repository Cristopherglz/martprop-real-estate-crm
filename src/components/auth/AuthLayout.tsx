import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-building.jpg";

export default function AuthLayout({ title, subtitle, children, footer }: {
  title: string; subtitle: string; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/70" />
        <div className="relative h-full p-12 flex flex-col justify-between text-primary-foreground">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur-md">
              <Building2 className="h-5 w-5" />
            </span>
            MartProp
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight max-w-md text-balance">
              "Pasamos de Excel a MartProp y nuestro equipo cerró 38% más operaciones en 6 meses."
            </h2>
            <p className="mt-6 text-primary-foreground/80">Lucía Méndez — Méndez Propiedades</p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col p-6 md:p-12">
        <div className="lg:hidden mb-8">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </span>
            MartProp
          </Link>
        </div>
        <Button asChild variant="ghost" size="sm" className="self-start mb-6">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Volver al inicio</Link>
        </Button>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
