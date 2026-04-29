-- Admin check function (hardcoded admin email)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND email = 'admin@kostkita.id'
  );
$$;

-- Category enum
CREATE TYPE public.product_category AS ENUM ('kost', 'kontrakan', 'motor', 'barang');
CREATE TYPE public.product_status AS ENUM ('available', 'sold');
CREATE TYPE public.product_badge AS ENUM ('hot', 'new');

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  price BIGINT NOT NULL,
  price_unit TEXT,
  category product_category NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  whatsapp TEXT NOT NULL,
  status product_status NOT NULL DEFAULT 'available',
  badge product_badge,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can view all products
CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT
USING (true);

-- Only admin can mutate
CREATE POLICY "Admin can insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update products"
ON public.products FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin can delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.is_admin());

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admin can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admin can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_admin());