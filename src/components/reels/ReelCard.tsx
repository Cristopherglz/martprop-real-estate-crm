import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, Play, BadgeCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Reel } from "@/data/reels";

interface Props {
  reel: Reel;
  active: boolean;
  muted: boolean;
  onToggleMute: () => void;
}

const formatNum = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`;

export default function ReelCard({ reel, active, muted, onToggleMute }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [active]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <div className="relative h-full w-full snap-start snap-always flex items-center justify-center bg-black">
      <div className="relative h-full w-full max-w-[440px] mx-auto overflow-hidden bg-black md:rounded-3xl md:my-4 md:max-h-[calc(100vh-7rem)] shadow-elegant">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.poster}
          loop
          muted={muted}
          playsInline
          onClick={togglePlay}
          className="absolute inset-0 h-full w-full object-cover cursor-pointer"
        />

        {/* Gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Play overlay */}
        {!playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 grid place-items-center"
            aria-label="Reproducir"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/30">
              <Play className="h-9 w-9 text-white fill-white" />
            </span>
          </button>
        )}

        {/* Mute toggle */}
        <button
          onClick={onToggleMute}
          className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-smooth"
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>

        {/* Right action rail */}
        <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 text-white">
          <button onClick={() => setLiked((v) => !v)} className="flex flex-col items-center gap-1 group">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-smooth">
              <Heart className={cn("h-6 w-6 transition-smooth", liked && "fill-red-500 text-red-500 scale-110")} />
            </span>
            <span className="text-xs font-medium">{formatNum(reel.stats.likes + (liked ? 1 : 0))}</span>
          </button>
          <button className="flex flex-col items-center gap-1 group">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-smooth">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span className="text-xs font-medium">{formatNum(reel.stats.comments)}</span>
          </button>
          <button className="flex flex-col items-center gap-1 group">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-smooth">
              <Send className="h-6 w-6" />
            </span>
            <span className="text-xs font-medium">{formatNum(reel.stats.shares)}</span>
          </button>
          <button onClick={() => setSaved((v) => !v)} className="flex flex-col items-center gap-1 group">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-smooth">
              <Bookmark className={cn("h-6 w-6 transition-smooth", saved && "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]")} />
            </span>
            <span className="text-xs font-medium">Guardar</span>
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-4 pr-20 text-white space-y-3">
          <div className="flex items-center gap-2.5">
            <img src={reel.user.avatar} alt={reel.user.name} className="h-10 w-10 rounded-full border-2 border-white/80 object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm truncate">@{reel.user.handle}</p>
                {reel.user.verified && <BadgeCheck className="h-4 w-4 text-[hsl(var(--gold))] fill-[hsl(var(--gold))]/20" />}
              </div>
              <p className="text-xs text-white/70 truncate">{reel.user.name}</p>
            </div>
            <Button size="sm" variant="gold" className="ml-auto h-8 rounded-full px-3 text-xs">Seguir</Button>
          </div>

          <p className="text-sm leading-snug line-clamp-3">{reel.description}</p>

          {reel.property && (
            <Link
              to={`/propiedad/${reel.property.id}`}
              className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 hover:bg-white/15 transition-smooth"
            >
              <img src={reel.poster} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Badge className="bg-[hsl(var(--gold))] text-primary border-0 text-[10px] py-0 px-1.5">{reel.property.operation}</Badge>
                  <span className="text-xs font-bold">{reel.property.price}</span>
                </div>
                <p className="text-xs text-white/80 flex items-center gap-1 truncate">
                  <MapPin className="h-3 w-3" /> {reel.property.location}
                </p>
              </div>
              <span className="text-xs font-medium pr-1">Ver →</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
