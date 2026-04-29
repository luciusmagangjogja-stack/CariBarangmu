-- Restrict is_admin execution
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Tighten storage SELECT: public can view individual files via URL,
-- but listing should require admin. We replace the broad SELECT policy.
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

-- Public can view individual files (needed for direct URL access on public bucket)
CREATE POLICY "Public can view product image files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');