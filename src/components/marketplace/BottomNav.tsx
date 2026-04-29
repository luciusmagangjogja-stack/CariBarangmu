import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Sparkles, Phone } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/produk", label: "Kategori", icon: LayoutGrid },
  { to: "/terbaru", label: "Terbaru", icon: Sparkles },
  { to: "/kontak", label: "Kontak", icon: Phone },
];

export const BottomNav = () => (
  <nav
    className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <ul className="grid grid-cols-4">
      {items.map(({ to, label, icon: Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.4]" : ""}`} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);