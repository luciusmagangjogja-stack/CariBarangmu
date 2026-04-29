import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ImageSlider = ({ images, alt }: { images: string[]; alt: string }) => {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-secondary">
      <div className="relative aspect-[4/3] md:aspect-[16/10]">
        <img src={images[i]} alt={alt} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Sebelumnya"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-card transition hover:bg-background">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} aria-label="Selanjutnya"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-card transition hover:bg-background">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};