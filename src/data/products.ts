import kost1 from "@/assets/p-kost1.jpg";
import motor1 from "@/assets/p-motor1.jpg";
import motor2 from "@/assets/p-motor2.jpg";
import kasur from "@/assets/p-kasur.jpg";
import lemari from "@/assets/p-lemari.jpg";
import kontrakan from "@/assets/p-kontrakan.jpg";
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

export const products: Product[] = [
  {
    id: "1",
    slug: "kost-putri-dekat-ui-depok",
    title: "Kost Putri Eksklusif Dekat UI",
    price: 1500000,
    priceUnit: "/bulan",
    category: "kost",
    location: "Depok, Jawa Barat",
    description:
      "Kamar luas 3x4m, kasur, lemari, AC, WiFi cepat, kamar mandi dalam. 5 menit ke kampus UI. Lingkungan aman dan bersih, ada CCTV 24 jam.",
    images: [kost1, catKost],
    whatsapp: "6281234567890",
    status: "available",
    badge: "new",
    createdAt: "2026-04-25",
  },
  {
    id: "2",
    slug: "honda-beat-2021-merah",
    title: "Honda Beat 2021 Merah Pajak Hidup",
    price: 13500000,
    category: "motor",
    location: "Jakarta Selatan",
    description:
      "Honda Beat tahun 2021, KM 12.000, mesin halus, body mulus, surat lengkap (BPKB+STNK), pajak hidup sampai 2027. Siap pakai.",
    images: [motor1, motor2],
    whatsapp: "6281234567890",
    status: "available",
    badge: "hot",
    createdAt: "2026-04-26",
  },
  {
    id: "3",
    slug: "kasur-busa-single-90x200",
    title: "Kasur Busa Single 90x200 Masih Bagus",
    price: 350000,
    category: "barang",
    location: "Yogyakarta",
    description:
      "Kasur busa ukuran single 90x200, ketebalan 15cm, masih empuk dan bersih. Cocok untuk anak kos. COD area Jogja.",
    images: [kasur],
    whatsapp: "6281234567890",
    status: "available",
    createdAt: "2026-04-22",
  },
  {
    id: "4",
    slug: "lemari-kayu-2-pintu",
    title: "Lemari Kayu 2 Pintu Minimalis",
    price: 600000,
    category: "barang",
    location: "Bandung",
    description:
      "Lemari pakaian kayu solid 2 pintu, kondisi 90%, muat banyak. Bisa dibongkar untuk pengiriman.",
    images: [lemari],
    whatsapp: "6281234567890",
    status: "available",
    createdAt: "2026-04-20",
  },
  {
    id: "5",
    slug: "kontrakan-2-kamar-bekasi",
    title: "Kontrakan 2 Kamar Tidur di Bekasi",
    price: 18000000,
    priceUnit: "/tahun",
    category: "kontrakan",
    location: "Bekasi",
    description:
      "Rumah kontrakan 2 kamar tidur, 1 kamar mandi, dapur, ruang tamu. Lingkungan tenang, dekat tol & pasar. Listrik 1300W.",
    images: [kontrakan],
    whatsapp: "6281234567890",
    status: "available",
    badge: "new",
    createdAt: "2026-04-27",
  },
  {
    id: "6",
    slug: "yamaha-nmax-2022",
    title: "Yamaha NMax 2022 Hitam Doff",
    price: 27500000,
    category: "motor",
    location: "Tangerang",
    description:
      "Yamaha NMax 2022, KM 8.500, kondisi istimewa, ban masih tebal, surat lengkap. Bisa nego sedikit di tempat.",
    images: [motor2, motor1],
    whatsapp: "6281234567890",
    status: "available",
    createdAt: "2026-04-24",
  },
];

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