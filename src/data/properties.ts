import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";

export type Operation = "Venta" | "Alquiler" | "Alquiler temporario";
export type PropertyType = "Departamento" | "Casa" | "PH" | "Loft" | "Local" | "Oficina" | "Terreno";

export interface Property {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  city: string;
  operation: Operation;
  type: PropertyType;
  price: number;
  currency: "USD" | "ARS";
  bedrooms: number;
  bathrooms: number;
  area: number;        // m²
  parking: number;
  image: string;
  featured?: boolean;
  status: "Publicada" | "Pausada" | "Reservada" | "Vendida";
  views: number;
  contacts: number;
  publishedAt: string; // ISO
}

export const properties: Property[] = [
  {
    id: "MP-1042",
    title: "Departamento luminoso con balcón francés",
    address: "Av. Santa Fe 3200",
    neighborhood: "Palermo",
    city: "CABA",
    operation: "Venta",
    type: "Departamento",
    price: 189000,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 2,
    area: 78,
    parking: 1,
    image: prop1,
    featured: true,
    status: "Publicada",
    views: 1284,
    contacts: 42,
    publishedAt: "2026-04-12",
  },
  {
    id: "MP-1043",
    title: "Casa moderna con pileta y parque",
    address: "Los Aromos 480",
    neighborhood: "Nordelta",
    city: "Tigre",
    operation: "Venta",
    type: "Casa",
    price: 745000,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    parking: 3,
    image: prop2,
    featured: true,
    status: "Publicada",
    views: 3120,
    contacts: 88,
    publishedAt: "2026-03-28",
  },
  {
    id: "MP-1044",
    title: "Loft industrial en edificio reciclado",
    address: "Bolívar 720",
    neighborhood: "San Telmo",
    city: "CABA",
    operation: "Alquiler temporario",
    type: "Loft",
    price: 95,
    currency: "USD",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    parking: 0,
    image: prop3,
    status: "Publicada",
    views: 842,
    contacts: 31,
    publishedAt: "2026-04-20",
  },
  {
    id: "MP-1045",
    title: "Penthouse con terraza y vista panorámica",
    address: "Av. del Libertador 6500",
    neighborhood: "Belgrano",
    city: "CABA",
    operation: "Alquiler",
    type: "Departamento",
    price: 1450000,
    currency: "ARS",
    bedrooms: 3,
    bathrooms: 3,
    area: 165,
    parking: 2,
    image: prop4,
    featured: true,
    status: "Reservada",
    views: 2210,
    contacts: 64,
    publishedAt: "2026-04-02",
  },
];

export const formatPrice = (p: Property) => {
  const v = new Intl.NumberFormat("es-AR").format(p.price);
  const suffix = p.operation === "Venta" ? "" : p.operation === "Alquiler" ? " /mes" : " /noche";
  return `${p.currency === "USD" ? "USD" : "$"} ${v}${suffix}`;
};
