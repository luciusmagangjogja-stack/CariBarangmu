import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/produk", label: "Kategori" },
  { to: "/tentang", label: "Tentang" },
  { to: "/kontak", label: "Kontak" },
];

export const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-border/70 bg-background/80 backdrop-blur md:block">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button asChild variant="default" className="ml-3 rounded-full">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
              Pasang Iklan
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};