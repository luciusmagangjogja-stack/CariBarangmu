import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/marketplace/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_EMAIL, useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const nav = useNavigate();
  const { user, isAdmin } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user && isAdmin) nav("/admin", { replace: true });
  }, [user, isAdmin, nav]);

  useEffect(() => {
    document.title = "Login Admin – KostKita";
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Akun dibuat. Silakan login.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Berhasil login");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Gagal");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-10 md:py-16">
        <h1 className="text-2xl font-extrabold tracking-tight">Login Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Akses dashboard hanya untuk <span className="font-mono">{ADMIN_EMAIL}</span>.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-card p-6 shadow-card">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" disabled={busy} className="w-full rounded-full">
            {busy ? "Memproses..." : mode === "signin" ? "Login" : "Daftar"}
          </Button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="block w-full text-center text-xs text-muted-foreground hover:underline"
          >
            {mode === "signin" ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Auth;
