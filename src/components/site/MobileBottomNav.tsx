import { Link, useLocation } from "react-router-dom";
import { Home, Search, Video, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/dashboard/publicar", label: "Publicar", icon: PlusCircle, primary: true },
  { to: "/reels", label: "Reels", icon: Video },
  { to: "/login", label: "Cuenta", icon: User },
];

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  // Hide on full-screen reels view
  if (pathname.startsWith("/reels")) return null;

  const active = (to: string, end?: boolean) => end ? pathname === to : pathname.startsWith(to);

  return (
    <>
      {/* Spacer so content isn't hidden behind the bar on mobile */}
      <div className="md:hidden h-20" aria-hidden />
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 h-16">
          {items.map((it) => {
            const isActive = active(it.to, it.end);
            if (it.primary) {
              return (
                <li key={it.to} className="flex items-center justify-center">
                  <Link
                    to={it.to}
                    className="grid h-12 w-12 -mt-6 place-items-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-elegant hover:scale-105 transition-smooth"
                    aria-label={it.label}
                  >
                    <it.icon className="h-5 w-5" />
                  </Link>
                </li>
              );
            }
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "h-full flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-smooth",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <it.icon className={cn("h-5 w-5", isActive && "scale-110")} />
                  <span>{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
