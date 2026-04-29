import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/marketplace/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/data/products";
import { ProductForm } from "@/components/marketplace/ProductForm";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | "new" | null>(null);

  useEffect(() => {
    document.title = "Dashboard Admin – KostKita";
  }, []);

  const { data: items = [], refetch } = useQuery({
    queryKey: ["admin-products"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (loading) return <Layout><div className="container py-20 text-center">Memuat...</div></Layout>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Akses Ditolak</h1>
          <p className="mt-2 text-sm text-muted-foreground">Akun ini bukan admin.</p>
          <Button className="mt-6" onClick={() => supabase.auth.signOut()}>Logout</Button>
        </div>
      </Layout>
    );
  }

  const onDelete = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Produk dihapus");
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const editingItem = editing && editing !== "new" ? items.find((i) => i.id === editing) : null;

  return (
    <Layout>
      <div className="container py-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Dashboard Admin</h1>
            <p className="text-sm text-muted-foreground">{items.length} produk</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setEditing("new")} className="rounded-full gap-1">
              <Plus className="h-4 w-4" /> Tambah Produk
            </Button>
            <Button variant="outline" className="rounded-full gap-1" onClick={() => supabase.auth.signOut()}>
              <LogOut className="h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>

        {editing && (
          <div className="mt-6 rounded-2xl bg-card p-5 shadow-card md:p-6">
            <ProductForm
              initial={editingItem ?? undefined}
              onClose={() => setEditing(null)}
              onSaved={() => {
                setEditing(null);
                refetch();
                qc.invalidateQueries({ queryKey: ["products"] });
              }}
            />
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl bg-card shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="h-10 w-10 rounded object-cover bg-secondary" />
                      <Link to={`/produk/${p.slug}`} className="font-medium hover:underline">{p.title}</Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3">{formatPrice(Number(p.price))}{p.price_unit ?? ""}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => setEditing(p.id)} className="rounded-full p-2 hover:bg-secondary">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(p.id)} className="rounded-full p-2 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">Belum ada produk</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
