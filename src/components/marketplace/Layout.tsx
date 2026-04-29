import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <TopNav />
    <main className="flex-1 pb-20 md:pb-0">{children}</main>
    <Footer />
    <BottomNav />
  </div>
);