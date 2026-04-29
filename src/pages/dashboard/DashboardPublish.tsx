import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ImagePlus } from "lucide-react";

export default function DashboardPublish() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Publicar nueva propiedad</h1>
        <p className="text-muted-foreground mt-1">Completá los datos y subí fotos. Te lleva menos de 3 minutos.</p>
      </div>

      <Card className="p-6 shadow-card-soft space-y-5">
        <h2 className="font-display font-bold text-lg">Datos principales</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Título</Label><Input placeholder="Departamento luminoso con balcón…" /></div>
          <div className="space-y-2"><Label>Operación</Label><Input placeholder="Venta / Alquiler / Temporario" /></div>
          <div className="space-y-2"><Label>Tipo</Label><Input placeholder="Departamento, Casa, PH…" /></div>
          <div className="space-y-2"><Label>Precio</Label><Input type="number" placeholder="189000" /></div>
          <div className="space-y-2"><Label>Dirección</Label><Input placeholder="Av. Santa Fe 3200" /></div>
          <div className="space-y-2"><Label>Barrio / Ciudad</Label><Input placeholder="Palermo, CABA" /></div>
        </div>
        <div className="space-y-2"><Label>Descripción</Label><Textarea rows={5} placeholder="Contá lo que hace única a esta propiedad…" /></div>
      </Card>

      <Card className="p-6 shadow-card-soft space-y-4">
        <h2 className="font-display font-bold text-lg">Características</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2"><Label>Dormitorios</Label><Input type="number" defaultValue={2} /></div>
          <div className="space-y-2"><Label>Baños</Label><Input type="number" defaultValue={2} /></div>
          <div className="space-y-2"><Label>Sup. (m²)</Label><Input type="number" defaultValue={78} /></div>
          <div className="space-y-2"><Label>Cocheras</Label><Input type="number" defaultValue={1} /></div>
        </div>
      </Card>

      <Card className="p-6 shadow-card-soft">
        <h2 className="font-display font-bold text-lg mb-4">Fotos</h2>
        <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:bg-secondary/30 transition-smooth cursor-pointer">
          <div className="grid h-14 w-14 mx-auto place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
            <ImagePlus className="h-6 w-6" />
          </div>
          <p className="font-medium">Arrastrá las fotos o hacé clic para subir</p>
          <p className="text-sm text-muted-foreground mt-1">Hasta 30 imágenes — JPG o PNG</p>
          <Button variant="soft" className="mt-4"><Upload className="h-4 w-4" /> Seleccionar archivos</Button>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Guardar borrador</Button>
        <Button variant="hero">Publicar propiedad</Button>
      </div>
    </div>
  );
}
