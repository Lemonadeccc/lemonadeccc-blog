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
        <div className="h-screen flex flex-col overflow-hidden">
          <Nav />
          <div id="page-scroll-root" className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <PageTransition>
              <main className="flex min-h-full flex-col">
                {children}
              </main>
            </PageTransition>
          </div>
        </div>
      </body>
    </html>
  );
}
