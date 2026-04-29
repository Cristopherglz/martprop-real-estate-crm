import { Link, useLocation } from "react-router-dom";
import { Building2, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/buscar", label: "Buscar" },
  { to: "/publicar", label: "Publicar" },
  { to: "/empresas", label: "Para inmobiliarias" },
  { to: "/precios", label: "Precios" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onLanding = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-smooth",
        onLanding ? "glass border-b border-border/40" : "bg-background border-b border-border"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient text-primary-foreground shadow-card-soft">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="tracking-tight">MartProp</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-smooth text-muted-foreground hover:text-foreground hover:bg-secondary",
                pathname === l.to && "text-foreground bg-secondary"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Ingresar</Link>
          </Button>
          <Button asChild size="sm" variant="hero">
            <Link to="/register">Crear cuenta</Link>
          </Button>
        </div>

        <button
          className="md:hidden rounded-lg p-2 hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container flex flex-col py-3 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login">Ingresar</Link>
              </Button>
              <Button asChild variant="hero" className="flex-1">
                <Link to="/register">Crear cuenta</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
