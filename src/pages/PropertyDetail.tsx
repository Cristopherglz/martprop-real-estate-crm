import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  Bed, Bath, Maximize2, Car, MapPin, ArrowLeft, Heart, Share2, Phone,
  MessageCircle, Mail, ShieldCheck, Calendar, Eye, Sparkles, Check, Building2
} from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PropertyCard from "@/components/site/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { properties, formatPrice } from "@/data/properties";

const amenities = [
  "Pileta", "Parrilla", "Gimnasio", "SUM", "Seguridad 24h",
  "Cocheras cubiertas", "Bauleras", "Laundry", "Solarium", "Quincho",
];

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!property) return <Navigate to="/buscar" replace />;

  // Build a small "gallery" by reusing the cover + other property images
  const gallery = [
    property.image,
    ...properties.filter((p) => p.id !== property.id).map((p) => p.image),
  ].slice(0, 5);

  const related = properties.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-soft-gradient">
      <SiteHeader />

      <div className="container pt-6">
        <Link
          to="/buscar"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a resultados
        </Link>
      </div>

      {/* GALLERY */}
      <section className="container pt-6">
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 md:h-[520px]">
          <div className="md:col-span-3 md:row-span-2 relative overflow-hidden rounded-2xl shadow-elegant group">
            <img
              src={gallery[activeImg]}
              alt={property.title}
              className="h-full w-full object-cover transition-smooth group-hover:scale-[1.02]"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-primary text-primary-foreground border-0">{property.operation}</Badge>
              {property.featured && (
                <Badge className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] border-0">
                  <Sparkles className="h-3 w-3 mr-1" /> Destacado
                </Badge>
              )}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="soft" className="rounded-full"><Heart className="h-4 w-4" /></Button>
              <Button size="icon" variant="soft" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>
          {gallery.slice(1, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i + 1)}
              className={`relative overflow-hidden rounded-2xl shadow-card-soft hidden md:block group ${
                activeImg === i + 1 ? "ring-2 ring-[hsl(var(--gold))]" : ""
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="container py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider">
              {property.type} · {property.id}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 text-balance">
              {property.title}
            </h1>
            <p className="flex items-center gap-2 text-muted-foreground mt-3">
              <MapPin className="h-4 w-4" /> {property.address} — {property.neighborhood}, {property.city}
            </p>
            <p className="font-display font-extrabold text-4xl md:text-5xl text-primary mt-5">
              {formatPrice(property)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Expensas estimadas: USD 180 / mes</p>
          </div>

          {/* Quick stats */}
          <Card className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border shadow-card-soft border-border overflow-hidden">
            {[
              { icon: Bed, label: "Dormitorios", v: property.bedrooms },
              { icon: Bath, label: "Baños", v: property.bathrooms },
              { icon: Maximize2, label: "Superficie", v: `${property.area} m²` },
              { icon: Car, label: "Cocheras", v: property.parking },
            ].map((s) => (
              <div key={s.label} className="p-5 text-center">
                <s.icon className="h-5 w-5 mx-auto text-accent" />
                <p className="font-display font-bold text-xl mt-2">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </Card>

          {/* Description */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Descripción</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Excepcional {property.type.toLowerCase()} ubicado en una de las zonas más codiciadas de
                {" "}{property.neighborhood}. La propiedad se distingue por su diseño contemporáneo, terminaciones
                premium y una distribución pensada para el confort y la elegancia cotidiana.
              </p>
              <p>
                Los ambientes están bañados de luz natural gracias a sus grandes ventanales, mientras que los
                materiales nobles —maderas cálidas, mármoles y herrajes de bronce— refuerzan la sensación de
                exclusividad. Cocina integrada con isla, suite principal con vestidor y baños revestidos en piedra
                completan una experiencia residencial verdaderamente única.
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location placeholder */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Ubicación</h2>
            <div className="aspect-[16/9] rounded-2xl bg-secondary border border-border grid place-items-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="font-medium">{property.address}</p>
                <p className="text-sm">{property.neighborhood}, {property.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR — contact */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-5">
          <Card className="p-6 shadow-elegant border-border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary-gradient grid place-items-center text-primary-foreground font-display font-bold">
                MP
              </div>
              <div>
                <p className="font-display font-bold">MartProp Premium</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-[hsl(var(--gold))]" /> Anunciante verificado
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5 text-center text-xs">
              <div className="rounded-lg bg-secondary p-2">
                <Eye className="h-4 w-4 mx-auto text-accent" />
                <p className="font-semibold mt-1">{property.views.toLocaleString("es-AR")}</p>
                <p className="text-muted-foreground">Vistas</p>
              </div>
              <div className="rounded-lg bg-secondary p-2">
                <MessageCircle className="h-4 w-4 mx-auto text-accent" />
                <p className="font-semibold mt-1">{property.contacts}</p>
                <p className="text-muted-foreground">Consultas</p>
              </div>
              <div className="rounded-lg bg-secondary p-2">
                <Calendar className="h-4 w-4 mx-auto text-accent" />
                <p className="font-semibold mt-1">{new Date(property.publishedAt).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}</p>
                <p className="text-muted-foreground">Publicada</p>
              </div>
            </div>

            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => { e.preventDefault(); alert("Consulta enviada (demo)"); }}
            >
              <Input placeholder="Tu nombre" required />
              <Input type="email" placeholder="Email" required />
              <Input type="tel" placeholder="Teléfono" />
              <Textarea
                rows={4}
                defaultValue={`Hola, me interesa la propiedad ${property.id}. ¿Podemos coordinar una visita?`}
              />
              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Mail className="h-4 w-4" /> Enviar consulta
              </Button>
            </form>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="soft"><Phone className="h-4 w-4" /> Llamar</Button>
              <Button variant="gold"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
            </div>
          </Card>

          <Card className="p-5 bg-primary text-primary-foreground border-0 shadow-card-soft">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-[hsl(var(--gold))] shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-semibold">¿Sos profesional inmobiliario?</p>
                <p className="text-sm text-primary-foreground/75 mt-1">
                  Publicá tus propiedades en MartProp y accedé al mejor CRM del mercado.
                </p>
                <Button asChild variant="gold" size="sm" className="mt-4">
                  <Link to="/register">Crear cuenta</Link>
                </Button>
              </div>
            </div>
          </Card>
        </aside>
      </section>

      {/* RELATED */}
      <section className="container pb-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Propiedades similares</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
