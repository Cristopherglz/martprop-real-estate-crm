import { Link } from "react-router-dom";
import { ArrowRight, Building2, Briefcase, HardHat, User, ShieldCheck, BarChart3, Sparkles, Smartphone, MessageSquare, Camera } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import SearchBar from "@/components/site/SearchBar";
import PropertyCard from "@/components/site/PropertyCard";
import ReelsRail from "@/components/site/ReelsRail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { properties } from "@/data/properties";
import hero from "@/assets/hero-building.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="Edificio premium en Buenos Aires al atardecer" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/40" />
        </div>

        <div className="container py-20 md:py-32 text-primary-foreground">
          <Badge className="bg-white/15 text-primary-foreground border-white/20 backdrop-blur-md mb-6">
            <Sparkles className="h-3 w-3 mr-1" /> La nueva forma de vivir el real estate
          </Badge>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight max-w-4xl text-balance leading-[1.05] animate-fade-up">
            Encontrá tu próximo <span className="text-[hsl(var(--gold))]">hogar</span>.<br />
            Hacé crecer tu inmobiliaria.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            MartProp conecta a quienes buscan con quienes ofrecen propiedades — con un CRM moderno, estadísticas en tiempo real y la mejor experiencia de la región.
          </p>

          <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <SearchBar />
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              ["+120 mil", "Propiedades activas"],
              ["+8.500", "Inmobiliarias confían"],
              ["24 prov.", "Cobertura nacional"],
              ["4.9/5", "Satisfacción"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display font-extrabold text-2xl md:text-3xl">{n}</p>
                <p className="text-xs md:text-sm text-primary-foreground/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADAS */}
      <section className="py-20 bg-soft-gradient">
        <div className="container">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider">Selección destacada</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Propiedades que enamoran</h2>
            </div>
            <Button asChild variant="soft">
              <Link to="/buscar">Ver todas <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* REELS */}
      <ReelsRail />

      {/* SEGMENTOS */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider">Para todos los actores</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 text-balance">Una plataforma, todo el mercado</h2>
            <p className="text-muted-foreground mt-4">Desde el particular que vende su primer departamento hasta la desarrolladora con 200 unidades en pozo.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: "Inmobiliarias", desc: "CRM completo, equipo, leads y publicaciones ilimitadas." },
              { icon: Briefcase, title: "Corredores", desc: "Tu marca personal, embudo de clientes y estadísticas." },
              { icon: HardHat, title: "Desarrolladoras", desc: "Showroom de proyectos, planos, etapas y unidades." },
              { icon: User, title: "Particulares", desc: "Publicá fácil, sin vueltas y con la mayor exposición." },
            ].map((s) => (
              <div key={s.title} className="group p-7 rounded-2xl border border-border bg-card hover:shadow-elegant transition-smooth">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-gradient text-primary-foreground mb-5 group-hover:scale-110 transition-smooth">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM SHOWCASE */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-white/15 text-primary-foreground border-white/20">CRM inmobiliario</Badge>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-balance">El panel que tu equipo merece</h2>
            <p className="text-primary-foreground/80 mt-5 text-lg">
              Gestioná propiedades, leads, visitas y rendimiento desde un solo lugar. Diseñado para ser rápido, claro y hermoso.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: BarChart3, t: "Estadísticas en vivo", d: "Vistas, contactos y conversión por publicación." },
                { icon: MessageSquare, t: "Bandeja unificada de leads", d: "WhatsApp, email y formularios en un mismo lugar." },
                { icon: Camera, t: "Carga 10× más rápida", d: "Subida múltiple de fotos con IA que ordena y mejora." },
                { icon: ShieldCheck, t: "Verificación de propietario", d: "Generá confianza con tu sello de verificado." },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 shrink-0">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.t}</p>
                    <p className="text-sm text-primary-foreground/70">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-3 flex-wrap">
              <Button asChild size="lg" variant="gold">
                <Link to="/register">Empezar gratis <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/dashboard">Ver demo del panel</Link>
              </Button>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="relative">
            <div className="absolute -inset-6 bg-[hsl(var(--gold))]/20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-5 shadow-elegant animate-float">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 text-xs text-primary-foreground/60">app.martprop.com/dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[["Vistas","12.4k","+18%"],["Leads","342","+24%"],["Conversión","4.7%","+0.6"]].map(([t,v,d])=>(
                  <div key={t} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs text-primary-foreground/60">{t}</p>
                    <p className="font-display font-bold text-2xl mt-1">{v}</p>
                    <p className="text-xs text-[hsl(var(--gold))] mt-1">{d}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white/10 p-4 h-44">
                <div className="flex items-end justify-between h-full gap-2">
                  {[35,55,42,78,62,90,72,85,60,95,80,68].map((h,i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[hsl(var(--gold))] to-white/40" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APP INSTALABLE */}
      <section className="py-24">
        <div className="container">
          <div className="rounded-3xl bg-soft-gradient border border-border p-10 md:p-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="secondary" className="mb-4"><Smartphone className="h-3 w-3 mr-1" /> Instalable como app</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">MartProp en tu celular y tu PC</h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Instalá MartProp directamente desde tu navegador. Sin tiendas, sin descargas pesadas. Funciona en iPhone, Android y desktop.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Button size="lg" variant="hero" onClick={() => alert("En tu navegador: menú → 'Instalar app' o 'Agregar a pantalla de inicio'")}>
                  Instalar MartProp
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">Probar el panel</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] rounded-[3rem] border-8 border-foreground/90 bg-foreground shadow-elegant overflow-hidden">
                  <div className="h-6 bg-foreground flex justify-center items-end pb-1">
                    <div className="h-1 w-16 rounded-full bg-background/40" />
                  </div>
                  <div className="bg-soft-gradient h-full p-3 space-y-3">
                    <div className="bg-card rounded-2xl p-3 shadow-card-soft">
                      <div className="aspect-[4/3] rounded-xl bg-primary-gradient mb-2" />
                      <div className="h-3 w-3/4 bg-muted rounded mb-1.5" />
                      <div className="h-2 w-1/2 bg-muted rounded" />
                    </div>
                    <div className="bg-card rounded-2xl p-3 shadow-card-soft">
                      <div className="aspect-[4/3] rounded-xl bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
