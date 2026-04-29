import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Share2, Tag } from "lucide-react";
import { useEffect } from "react";
import { Layout } from "@/components/marketplace/Layout";
import { ImageSlider } from "@/components/marketplace/ImageSlider";
import { WhatsappButton } from "@/components/marketplace/WhatsappButton";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { categories, formatPrice, products } from "@/data/products";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) {
      document.title = `${product.title} – KostKita`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", product.description.slice(0, 155));
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
          <Link to="/produk" className="mt-4 inline-block text-sm underline">Kembali ke daftar</Link>
        </div>
      </Layout>
    );
  }

  const productUrl = typeof window !== "undefined" ? window.location.href : "";
  const cat = categories.find((c) => c.id === product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url: productUrl });
      } else {
        await navigator.clipboard.writeText(productUrl);
        toast.success("Link disalin");
      }
    } catch { /* user cancelled */ }
  };

  return (
    <Layout>
      <div className="container py-4 md:py-8">
        <Link to="/produk" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>

        <div className="mt-4 grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <ImageSlider images={product.images} alt={product.title} />
          </div>

          <aside className="md:col-span-2">
            <div className="rounded-2xl bg-card p-5 shadow-card md:p-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-medium">
                  <Tag className="h-3 w-3" /> {cat?.label}
                </span>
                {product.status === "available" ? (
                  <span className="rounded-full bg-whatsapp/15 px-2.5 py-1 font-semibold text-whatsapp">Tersedia</span>
                ) : (
                  <span className="rounded-full bg-foreground/10 px-2.5 py-1 font-semibold">Sold</span>
                )}
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                {product.title}
              </h1>
              <div className="mt-3 text-3xl font-extrabold">
                {formatPrice(product.price)}
                {product.priceUnit && (
                  <span className="ml-1 text-sm font-medium text-muted-foreground">{product.priceUnit}</span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {product.location}
              </div>

              <div className="mt-6 space-y-3">
                <WhatsappButton phone={product.whatsapp} title={product.title} productUrl={productUrl} />
                <button
                  onClick={onShare}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold hover:bg-secondary"
                >
                  <Share2 className="h-4 w-4" /> Bagikan Produk
                </button>
              </div>

              <div className="mt-7">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Deskripsi</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {product.description}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-xl font-extrabold tracking-tight">Produk Serupa</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;