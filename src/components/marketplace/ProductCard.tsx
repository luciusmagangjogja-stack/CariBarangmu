import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Product, formatPrice } from "@/data/products";

const badgeStyles: Record<string, string> = {
  hot: "bg-hot text-white",
  new: "bg-new text-white",
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/produk/${product.slug}`}
      className="group block overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}
          >
            {product.badge === "hot" ? "🔥 Hot" : "Baru"}
          </span>
        )}
        {product.status === "sold" && (
          <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-[10px] font-bold uppercase text-background">
            Sold
          </span>
        )}
      </div>
      <div className="space-y-1.5 p-3.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug">
          {product.title}
        </h3>
        <div className="text-base font-extrabold text-foreground">
          {formatPrice(product.price)}
          {product.priceUnit && (
            <span className="ml-1 text-xs font-medium text-muted-foreground">{product.priceUnit}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{product.location}</span>
        </div>
      </div>
    </Link>
  );
};