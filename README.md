# KostKita

Marketplace listing kost, kontrakan, motor bekas, dan barang anak kos. Pembeli menghubungi penjual langsung via WhatsApp — tanpa perlu daftar.

## Stack

- **Frontend:** React 18 + Vite 5 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Lovable Cloud (database Postgres, auth, storage foto)
- **Data fetching:** TanStack Query

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

## Environment Variables

Buat file `.env` di root (jangan di-commit):

```
VITE_SUPABASE_PROJECT_ID=<project-id>
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-public-key>
VITE_SUPABASE_URL=https://<project-id>.supabase.co
```

Semua key di atas adalah key publik (anon) yang aman diekspos di browser — keamanan data diatur oleh Row Level Security di database.

## Struktur

- `src/pages/` — halaman (Home, Products, ProductDetail, Latest, Contact, About, Auth, Admin)
- `src/components/marketplace/` — komponen UI marketplace
- `src/hooks/` — useAuth, useProducts
- `src/data/products.ts` — tipe data + helper (formatPrice, buildWhatsappLink)

## Admin

Dashboard admin di `/admin`. Login via `/auth` dengan email admin yang terdaftar. Hak tulis ke tabel `products` dan bucket `product-images` dibatasi oleh RLS ke email admin.
