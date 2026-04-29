import catKost from "@/assets/cat-kost.jpg";
import catMotor from "@/assets/cat-motor.jpg";
import catBarang from "@/assets/cat-barang.jpg";

export type CategoryId = "kost" | "kontrakan" | "motor" | "barang";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  { id: "kost", label: "Kost", description: "Kamar nyaman dekat kampus", image: catKost },
  { id: "kontrakan", label: "Kontrakan", description: "Rumah disewakan tahunan", image: catKost },
  { id: "motor", label: "Motor Bekas", description: "Motor terawat siap pakai", image: catMotor },
  { id: "barang", label: "Barang Kos", description: "Kasur, meja, lemari & lainnya", image: catBarang },
];

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  priceUnit?: string;
  category: CategoryId;
  location: string;
  description: string;
  images: string[];
  whatsapp: string; // E.164 without + (e.g., 6281234567890)
  status: "available" | "sold";
  badge?: "hot" | "new";
  createdAt: string;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const buildWhatsappLink = (phone: string, productUrl: string, title: string) => {
  const text = `Halo, saya tertarik dengan produk ini:\n${title}\n${productUrl}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

export const socials = {
  instagram: "https://instagram.com/kostkita",
  tiktok: "https://tiktok.com/@kostkita",
  whatsapp: "6281234567890",
};