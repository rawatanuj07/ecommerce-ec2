import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Carousels from "./components/carousel";

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Created by Decode-Parvati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Carousels />
        <Header /> <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
