import { Logo } from "./Logo";
import { Instagram, Music2 } from "lucide-react";
import { socials } from "@/data/products";

export const Footer = () => (
  <footer className="hidden border-t border-border bg-secondary/40 md:block">
    <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <Logo />
        <p className="max-w-sm text-sm text-muted-foreground">
          Marketplace lokal untuk anak kos: kost, kontrakan, motor bekas, dan barang second berkualitas.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href={socials.instagram} target="_blank" rel="noreferrer"
           className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary">
          <Instagram className="h-4 w-4" />
        </a>
        <a href={socials.tiktok} target="_blank" rel="noreferrer"
           className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary">
          <Music2 className="h-4 w-4" />
        </a>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} KostKita. Dibuat dengan ❤️ untuk anak kos Indonesia.
    </div>
  </footer>
);