import { Work_Sans } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "@/app/globals.css";

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: "Nextjs | Movie app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />
        <div className="flex-1 -mt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}