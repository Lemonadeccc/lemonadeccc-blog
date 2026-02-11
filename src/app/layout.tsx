import type { Metadata } from "next";
import "./globals.css";
import PageTransition from '@/app/components/PageTransition'
import CustomCursor from '@/app/components/CustomCursor'
import Nav from "@/app/components/Nav";

export const metadata: Metadata = {
  title: "Lemonadeccc",
  description: "My venture into the world of frontend development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <div className="min-h-screen flex flex-col">
          <Nav />
          <PageTransition>
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </PageTransition>
        </div>
      </body>
    </html>
  );
}
