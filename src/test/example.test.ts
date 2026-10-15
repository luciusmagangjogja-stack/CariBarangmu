import { describe, it, expect } from "vitest";
import { formatPrice, buildWhatsappLink } from "@/data/products";

describe("formatPrice", () => {
  it("formats rupiah without decimals", () => {
    expect(formatPrice(1500000)).toBe("Rp 1.500.000");
  });
});

describe("buildWhatsappLink", () => {
  it("builds a wa.me link with encoded message containing the product URL", () => {
    const link = buildWhatsappLink("6281234567890", "Kost Putri", "https://kostkita.id/produk/kost-putri");
    expect(link).toContain("https://wa.me/6281234567890?text=");
    expect(decodeURIComponent(link)).toContain("https://kostkita.id/produk/kost-putri");
  });
});
