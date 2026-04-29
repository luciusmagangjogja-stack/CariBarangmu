import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-extrabold">
      K
    </span>
    <span className="text-lg font-extrabold tracking-tight">
      Kost<span className="text-whatsapp">Kita</span>
    </span>
  </Link>
);