import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/marketplace/Layout";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CategoryFilter } from "@/components/marketplace/CategoryFilter";
import { CategoryId, products } from "@/data/products";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("cat") as CategoryId | null) ?? "all";
  const [cat, setCat] = useState<CategoryId | "all">(initial);

  useEffect(() => {
    if (cat === "all") setParams({}, { replace: true });
    else setParams({ cat }, { replace: true });
  }, [cat, setParams]);

  const filtered = useMemo(
    () => (cat === "all" ? products : products.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <Layout>
      <section className="container py-6 md:py-10">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Semua Produk</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} listing tersedia
        </p>
        <div className="mt-5">
          <CategoryFilter value={cat} onChange={setCat} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Belum ada produk di kategori ini.
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Products;