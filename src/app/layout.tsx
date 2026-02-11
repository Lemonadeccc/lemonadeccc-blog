import type { Metadata } from "next";
import "./globals.css";
import PageTransition from '@/app/components/PageTransition'
import CustomCursor from '@/app/components/CustomCursor'

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
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
