import { Link } from "react-router-dom";
import { Bed, Bath, Maximize2, Car, MapPin } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { Badge } from "@/components/ui/badge";

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      to={`/propiedad/${p.id}`}
      className="group block overflow-hidden rounded-2xl bg-card border border-border shadow-card-soft hover:shadow-elegant transition-smooth hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground border-0">{p.operation}</Badge>
          {p.featured && (
            <Badge className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] border-0">Destacado</Badge>
          )}
        </div>
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-primary/85 to-transparent">
          <p className="font-display font-bold text-xl text-primary-foreground">{formatPrice(p)}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-display font-semibold leading-snug line-clamp-1">{p.title}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {p.neighborhood}, {p.city}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {p.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {p.bathrooms}</span>
          <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" /> {p.area} m²</span>
          <span className="flex items-center gap-1"><Car className="h-3.5 w-3.5" /> {p.parking}</span>
        </div>
      </div>
    </Link>
  );
}
