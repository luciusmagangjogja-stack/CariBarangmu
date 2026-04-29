import { Layout } from "@/components/marketplace/Layout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { products } from "@/data/products";

const Latest = () => {
  const sorted = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <Layout>
      <section className="container py-6 md:py-10">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Postingan Terbaru</h1>
        <p className="mt-1 text-sm text-muted-foreground">Update terkini dari semua kategori</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
};

export default Latest;