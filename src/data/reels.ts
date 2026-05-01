import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";

export interface Reel {
  id: string;
  videoUrl: string;
  poster: string;
  title: string;
  description: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  property?: {
    id: string;
    operation: "Venta" | "Alquiler" | "Alquiler temporario";
    price: string;
    location: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

// Videos cortos verticales de muestra (CDN público)
export const reels: Reel[] = [
  {
    id: "r-1",
    videoUrl: "https://cdn.pixabay.com/video/2024/03/15/204258-925475643_large.mp4",
    poster: prop1,
    title: "Departamento boutique en Palermo",
    description: "Tour completo · 78m² · 2 amb · balcón francés ✨ #palermo #venta",
    user: {
      name: "Lucía Méndez",
      handle: "mendezpropiedades",
      avatar: "https://i.pravatar.cc/100?img=47",
      verified: true,
    },
    property: { id: "MP-1042", operation: "Venta", price: "USD 189.000", location: "Palermo, CABA" },
    stats: { likes: 2840, comments: 124, shares: 86, views: 18420 },
  },
  {
    id: "r-2",
    videoUrl: "https://cdn.pixabay.com/video/2022/12/18/142875-781658636_large.mp4",
    poster: prop2,
    title: "Casa con pileta en Nordelta",
    description: "4 dorm · parque privado · cochera triple 🌿 #nordelta #casas",
    user: {
      name: "Estudio Aurora",
      handle: "auroraestate",
      avatar: "https://i.pravatar.cc/100?img=12",
      verified: true,
    },
    property: { id: "MP-1043", operation: "Venta", price: "USD 745.000", location: "Nordelta, Tigre" },
    stats: { likes: 5210, comments: 312, shares: 198, views: 41230 },
  },
  {
    id: "r-3",
    videoUrl: "https://cdn.pixabay.com/video/2023/10/12/184147-873441815_large.mp4",
    poster: prop3,
    title: "Loft industrial en San Telmo",
    description: "Reciclado de autor · ideal Airbnb 🏛️ #santelmo #temporario",
    user: {
      name: "Martín Iriarte",
      handle: "iriarteprops",
      avatar: "https://i.pravatar.cc/100?img=33",
    },
    property: { id: "MP-1044", operation: "Alquiler temporario", price: "USD 95 /noche", location: "San Telmo, CABA" },
    stats: { likes: 1320, comments: 58, shares: 41, views: 9870 },
  },
  {
    id: "r-4",
    videoUrl: "https://cdn.pixabay.com/video/2020/08/30/48569-454825064_large.mp4",
    poster: prop4,
    title: "Penthouse con terraza panorámica",
    description: "Vista al río · 165m² · amenities premium 🌇 #belgrano",
    user: {
      name: "Premium Realty",
      handle: "premiumrealty",
      avatar: "https://i.pravatar.cc/100?img=68",
      verified: true,
    },
    property: { id: "MP-1045", operation: "Alquiler", price: "$ 1.450.000 /mes", location: "Belgrano, CABA" },
    stats: { likes: 3940, comments: 201, shares: 132, views: 27640 },
  },
];
