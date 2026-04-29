import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/products";
import { toast } from "sonner";
import { X, Upload } from "lucide-react";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface Props {
  initial?: any;
  onClose: () => void;
  onSaved: () => void;
}

export const ProductForm = ({ initial, onClose, onSaved }: Props) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState<string>(initial?.price?.toString() ?? "");
  const [priceUnit, setPriceUnit] = useState(initial?.price_unit ?? "");
  const [category, setCategory] = useState(initial?.category ?? "kost");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [whatsapp, setWhatsapp] = useState(initial?.whatsapp ?? "6281234567890");
  const [status, setStatus] = useState(initial?.status ?? "available");
  const [badge, setBadge] = useState(initial?.badge ?? "none");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const ext = f.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, f);
        if (error) throw error;
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
      setImages([...images, ...urls]);
    } catch (err: any) {
      toast.error(err.message ?? "Gagal upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!images.length) return toast.error("Upload minimal 1 foto");
    setBusy(true);
    try {
      const slug = initial?.slug ?? `${slugify(title)}-${Date.now().toString(36).slice(-4)}`;
      const payload = {
        title,
        slug,
        price: Number(price),
        price_unit: priceUnit || null,
        category,
        location,
        description,
        whatsapp,
        status,
        badge: badge === "none" ? null : badge,
        images,
      };
      if (initial?.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", initial.id);
        if (error) throw error;
        toast.success("Produk diperbarui");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Produk ditambahkan");
      }
      onSaved();
    } catch (err: any) {
      toast.error(err.message ?? "Gagal menyimpan");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{initial ? "Edit Produk" : "Tambah Produk"}</h2>
        <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-secondary">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label>Judul</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label>Harga (Rp)</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <Label>Satuan (opsional)</Label>
          <Input placeholder="/bulan, /tahun" value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} />
        </div>
        <div>
          <Label>Kategori</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Lokasi</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <Label>Nomor WhatsApp</Label>
          <Input placeholder="6281234567890" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
        </div>
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Tersedia</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label>Badge</Label>
          <Select value={badge} onValueChange={setBadge}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Tidak ada</SelectItem>
              <SelectItem value="hot">🔥 Hot</SelectItem>
              <SelectItem value="new">Baru</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label>Deskripsi</Label>
          <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="md:col-span-2">
          <Label>Foto Produk</Label>
          <div className="mt-2 flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative h-24 w-24 overflow-hidden rounded-lg bg-secondary">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 rounded-full bg-foreground/80 p-1 text-background"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-xs text-muted-foreground hover:bg-secondary">
              <Upload className="h-4 w-4" />
              {uploading ? "..." : "Upload"}
              <input type="file" accept="image/*" multiple onChange={onUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="rounded-full">Batal</Button>
        <Button type="submit" disabled={busy} className="rounded-full">{busy ? "Menyimpan..." : "Simpan"}</Button>
      </div>
    </form>
  );
};
