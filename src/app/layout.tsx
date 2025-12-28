import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { MainLayout } from "@/components/layout/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SocialFeed - Connect & Share",
  description:
    "A modern social media platform to connect with friends, share your thoughts, and discover amazing content.",
  keywords: ["social media", "social network", "posts", "feed", "connect"],
  authors: [{ name: "SocialFeed Team" }],
  openGraph: {
    title: "SocialFeed - Connect & Share",
    description:
      "A modern social media platform to connect with friends and share your thoughts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
