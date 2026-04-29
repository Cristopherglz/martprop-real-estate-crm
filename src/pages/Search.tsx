import { useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import SearchBar from "@/components/site/SearchBar";
import PropertyCard from "@/components/site/PropertyCard";
import { properties } from "@/data/properties";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const op = params.get("op") || "Comprar";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="bg-soft-gradient border-b border-border py-8">
        <div className="container">
          <SearchBar compact />
        </div>
      </section>
      <section className="flex-1 container py-10">
        <div className="flex justify-between items-end mb-6 flex-wrap gap-2">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              {properties.length} propiedades {q && <span className="text-muted-foreground">en "{q}"</span>}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Operación: {op}</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
