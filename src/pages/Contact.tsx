import { Layout } from "@/components/marketplace/Layout";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import { socials } from "@/data/products";

const items = [
  { href: `https://wa.me/${socials.whatsapp}`, label: "WhatsApp Admin", value: "+62 812-3456-7890", Icon: MessageCircle, accent: "bg-whatsapp text-accent-foreground" },
  { href: socials.instagram, label: "Instagram", value: "@kostkita", Icon: Instagram, accent: "bg-secondary text-foreground" },
  { href: socials.tiktok, label: "TikTok", value: "@kostkita", Icon: Music2, accent: "bg-secondary text-foreground" },
];

const Contact = () => (
  <Layout>
    <section className="container py-8 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Hubungi Kami</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Mau pasang iklan, kerja sama, atau bertanya? Kami siap membantu.
        </p>
      </div>
      <div className="mx-auto mt-8 grid max-w-2xl gap-3">
        {items.map(({ href, label, value, Icon, accent }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
             className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated">
            <div className={`grid h-12 w-12 place-items-center rounded-full ${accent}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{label}</div>
              <div className="text-xs text-muted-foreground">{value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  </Layout>
);

export default Contact;