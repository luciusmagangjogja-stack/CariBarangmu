import { Layout } from "@/components/marketplace/Layout";

const About = () => (
  <Layout>
    <section className="container py-8 md:py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Tentang KostKita</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          KostKita adalah marketplace lokal yang membantu mahasiswa & pekerja muda menemukan
          tempat tinggal serta kebutuhan harian mereka. Kami fokus pada listing kost, kontrakan,
          motor bekas, dan barang second berkualitas — semua dengan komunikasi langsung via WhatsApp,
          tanpa biaya tersembunyi.
        </p>
        <h2 className="mt-10 text-xl font-bold">Kenapa KostKita?</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          <li>✓ Listing terkurasi dan mudah dicari</li>
          <li>✓ Hubungi penjual langsung lewat WhatsApp</li>
          <li>✓ Cepat, ringan, dan mobile-friendly</li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default About;