import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Heart, Volume2, VolumeX, ArrowRight, Video, MapPin } from "lucide-react";
import { reels } from "@/data/reels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formatNum = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`;

function MiniReel({ reel, index }: { reel: typeof reels[number]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: [0.6] }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      to="/reels"
      className="group relative shrink-0 snap-start w-[230px] sm:w-[260px] aspect-[9/16] overflow-hidden rounded-3xl bg-black shadow-card-soft hover:shadow-elegant transition-smooth"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <video
        ref={ref}
        src={reel.videoUrl}
        poster={reel.poster}
        muted={muted}
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

      {/* Top */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        {reel.property && (
          <Badge className="bg-[hsl(var(--gold))] text-primary border-0 text-[10px] py-0.5 px-2 font-semibold">
            {reel.property.operation}
          </Badge>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setMuted((v) => !v); }}
          className="grid h-8 w-8 place-items-center rounded-full bg-black/40 backdrop-blur-md text-white"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      {!playing && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/30">
            <Play className="h-6 w-6 text-white fill-white" />
          </span>
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-3 text-white space-y-2">
        <div className="flex items-center gap-2">
          <img src={reel.user.avatar} alt={reel.user.name} className="h-7 w-7 rounded-full border border-white/70 object-cover" />
          <p className="text-xs font-medium truncate flex-1">@{reel.user.handle}</p>
          <span className="flex items-center gap-1 text-xs">
            <Heart className="h-3.5 w-3.5" /> {formatNum(reel.stats.likes)}
          </span>
        </div>
        <p className="text-sm font-semibold leading-tight line-clamp-2">{reel.title}</p>
        {reel.property && (
          <p className="text-[11px] text-white/80 flex items-center gap-1 truncate">
            <MapPin className="h-3 w-3" /> {reel.property.location} · {reel.property.price}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function ReelsRail() {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[hsl(var(--gold))]/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <Badge className="bg-white/15 text-primary-foreground border-white/20 mb-3">
              <Video className="h-3 w-3 mr-1" /> Nuevo · MartProp Homees
            </Badge>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-balance">
              Tours en video, <span className="text-[hsl(var(--gold))]">en segundos</span>
            </h2>
            <p className="text-primary-foreground/80 mt-3 max-w-xl">
              Mirá propiedades en formato vertical, con vida y movimiento. Compartí los tuyos y llegá a miles de personas.
            </p>
          </div>
          <Button asChild variant="gold" size="lg" className="rounded-full">
            <Link to="/reels">Abrir feed <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className={cn(
          "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 no-scrollbar",
          "[mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
        )}>
          {reels.map((r, i) => <MiniReel key={r.id} reel={r} index={i} />)}
        </div>
      </div>
    </section>
  );
}
