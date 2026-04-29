import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </span>
            MartProp
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            La plataforma inmobiliaria pensada para inmobiliarias, corredores, desarrolladoras y particulares.
          </p>
        </div>
        {[
          { title: "Producto", items: ["Buscar", "Publicar", "Para empresas", "Precios"] },
          { title: "Recursos", items: ["Centro de ayuda", "Guías", "Blog", "API"] },
          { title: "Compañía", items: ["Sobre MartProp", "Contacto", "Términos", "Privacidad"] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="font-display font-semibold mb-3">{c.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => (
                <li key={i}><a href="#" className="hover:text-foreground transition-smooth">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MartProp. Todos los derechos reservados.</p>
          <p>Hecho con ❤ en Argentina</p>
        </div>
      </div>
    </footer>
  );
}
