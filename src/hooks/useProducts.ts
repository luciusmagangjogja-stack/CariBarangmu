import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product, CategoryId } from "@/data/products";

type Row = {
  id: string;
  slug: string;
  title: string;
  price: number;
  price_unit: string | null;
  category: CategoryId;
  location: string;
  description: string;
  images: string[];
  whatsapp: string;
  status: "available" | "sold";
  badge: "hot" | "new" | null;
  created_at: string;
};

const toProduct = (r: Row): Product => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  price: Number(r.price),
  priceUnit: r.price_unit ?? undefined,
  category: r.category,
  location: r.location,
  description: r.description,
  images: r.images ?? [],
  whatsapp: r.whatsapp,
  status: r.status,
  badge: r.badge ?? undefined,
  createdAt: r.created_at,
});

export const useProducts = (category?: CategoryId | "all") => {
  return useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      let q = supabase.from("products").select("*").order("created_at", { ascending: false });
      if (category && category !== "all") q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return (data as Row[]).map(toProduct);
    },
  });
};

export const useProductBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ["product", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("slug", slug!).maybeSingle();
      if (error) throw error;
      return data ? toProduct(data as Row) : null;
    },
  });
};
