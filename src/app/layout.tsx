import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumiere.jewelry"),
  title: "Lumière — Fine Jewelry | Handcrafted Diamond Rings, Necklaces & Earrings",
  description:
    "Discover ethically sourced, lab-grown diamond jewelry. Engagement rings, wedding bands, necklaces, earrings & bracelets — handcrafted in 18K gold and platinum. Free shipping across India.",
  keywords: "diamond rings, engagement rings, lab-grown diamonds, 18k gold jewelry, fine jewelry India, wedding bands, diamond necklaces, diamond earrings",
  openGraph: {
    type: "website",
    siteName: "Lumière",
    title: "Lumière — Fine Jewelry | Handcrafted Diamond Rings, Necklaces & Earrings",
    description: "Ethically sourced, lab-grown diamond jewelry. Handcrafted in 18K gold and platinum.",
    url: "https://lumiere.jewelry",
    images: [{ url: "/images/hero-ring.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière — Fine Jewelry",
    description: "Ethically sourced, lab-grown diamond jewelry. Handcrafted in 18K gold and platinum.",
    images: ["/images/hero-ring.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
