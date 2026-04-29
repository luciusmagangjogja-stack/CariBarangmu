import { MessageCircle } from "lucide-react";
import { buildWhatsappLink } from "@/data/products";

interface Props {
  phone: string;
  title: string;
  productUrl: string;
  size?: "sm" | "lg";
  className?: string;
}

export const WhatsappButton = ({ phone, title, productUrl, size = "lg", className = "" }: Props) => {
  const href = buildWhatsappLink(phone, productUrl, title);
  const sizeCls = size === "lg" ? "h-14 px-6 text-base" : "h-11 px-4 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-accent-foreground shadow-elevated transition-colors hover:bg-whatsapp-hover ${sizeCls} ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      Chat WhatsApp
    </a>
  );
};