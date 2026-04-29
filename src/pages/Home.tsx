import { Link } from "react-router-dom";
import { ArrowRight, Search, Megaphone } from "lucide-react";
import { Layout } from "@/components/marketplace/Layout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { categories, products, socials } from "@/data/products";
import hero from "@/assets/hero-banner.jpg";

const Home = () => {
  const latest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  return (
    <Layout>
      {/* HERO */}
      <section className="container pt-4 md:pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
          <img
            src={hero}
            alt="Marketplace kost dan barang anak kos"
            width={1600}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/70 to-transparent" />
          <div className="relative grid gap-6 px-6 py-12 md:px-12 md:py-20">
            <span className="w-fit rounded-full bg-background/15 px-3 py-1 text-xs font-medium backdrop-blur">
              Marketplace #1 untuk Anak Kos
            </span>
            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Cari kost, motor, dan barang second{" "}
              <span className="text-whatsapp">tanpa ribet.</span>
            </h1>
            <p className="max-w-xl text-sm text-primary-foreground/80 md:text-base">
              Browse listing terverifikasi, hubungi penjual langsung via WhatsApp.
              Tanpa daftar, tanpa drama.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-background/90"
              >
                <Search className="h-4 w-4" /> Mulai Cari
              </Link>
              <a
                href={`https://wa.me/${socials.whatsapp}?text=${encodeURIComponent("Halo admin, saya ingin pasang iklan.")}`}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-5 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-background/20"
              >
                <Megaphone className="h-4 w-4" /> Pasang Iklan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mt-10 md:mt-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Kategori Utama</h2>
            <p className="text-sm text-muted-foreground">Pilih sesuai kebutuhanmu</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/produk?cat=${c.id}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="aspect-square overflow-hidden">
                <img src={c.image} alt={c.label} loading="lazy"
                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent p-4">
                <div className="text-base font-bold text-background">{c.label}</div>
                <div className="text-[11px] text-background/80">{c.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LATEST */}
      <section className="container mt-12 md:mt-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Postingan Terbaru</h2>
            <p className="text-sm text-muted-foreground">Listing baru dari penjual</p>
          </div>
          <Link to="/produk" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline">
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {latest.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container my-14 md:my-20">
        <div className="overflow-hidden rounded-3xl bg-foreground p-8 text-center text-background md:p-14">
          <h3 className="mx-auto max-w-2xl text-2xl font-extrabold leading-tight md:text-4xl">
            Punya kost kosong, motor, atau barang nganggur?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-background/70 md:text-base">
            Hubungi admin untuk pasang iklan. Cepat, mudah, dan langsung tampil di halaman ini.
          </p>
          <a
            href={`https://wa.me/${socials.whatsapp}?text=${encodeURIComponent("Halo admin, saya ingin pasang iklan.")}`}
            target="_blank" rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-whatsapp-hover"
          >
            <Megaphone className="h-4 w-4" /> Pasang Iklan via WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Home;