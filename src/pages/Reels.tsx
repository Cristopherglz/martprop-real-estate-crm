import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Video, Sparkles, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { reels } from "@/data/reels";
import ReelCard from "@/components/reels/ReelCard";
import { toast } from "sonner";

export default function Reels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reel-idx]"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number((e.target as HTMLElement).dataset.reelIdx);
            setActiveIdx(idx);
          }
        });
      },
      { root, threshold: [0.6] }
    );
    items.forEach((it) => obs.observe(it));
    return () => obs.disconnect();
  }, []);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      toast.error("Subí un archivo de video válido");
      return;
    }
    if (f.size > 100 * 1024 * 1024) {
      toast.error("El video debe pesar menos de 100MB");
      return;
    }
    setFile(f);
  };

  const handlePublish = () => {
    toast.success("¡Reel publicado!", { description: "Tu video aparecerá pronto en el feed." });
    setUploadOpen(false);
    setFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black text-white">
      {/* Top bar */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
        <Link to="/" className="grid h-10 w-10 place-items-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-smooth">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <Video className="h-5 w-5 text-[hsl(var(--gold))]" />
          <span>Reels</span>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--gold))] text-primary hover:opacity-90 transition-smooth">
              <Upload className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card text-foreground max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--gold))]" /> Subir un nuevo reel
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!file ? (
                <label className="block border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-secondary/40 transition-smooth cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                  <div className="grid h-14 w-14 mx-auto place-items-center rounded-2xl bg-primary/10 text-primary mb-3">
                    <ImagePlus className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Arrastrá tu video o hacé clic</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4 / MOV vertical · hasta 100MB · 9:16 recomendado</p>
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-72 mx-auto">
                  <video src={URL.createObjectURL(file)} className="h-full w-full object-cover" controls />
                  <button
                    onClick={() => setFile(null)}
                    className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea rows={3} placeholder="Contá lo mejor de la propiedad… #palermo #venta" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Vincular propiedad</Label><Input placeholder="MP-1042" /></div>
                <div className="space-y-2"><Label>Hashtags</Label><Input placeholder="#tour #premium" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancelar</Button>
                <Button variant="hero" onClick={handlePublish} disabled={!file}>Publicar reel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Feed */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {reels.map((r, i) => (
          <div key={r.id} data-reel-idx={i} className="h-full w-full">
            <ReelCard
              reel={r}
              active={i === activeIdx}
              muted={muted}
              onToggleMute={() => setMuted((v) => !v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
