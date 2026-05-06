import type { Metadata } from "next";
import { Outfit, Playfair_Display, Pacifico, Cinzel, Caveat, Cormorant_Garamond, Eagle_Lake } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBanner from "@/components/AnnouncementBanner";
// import { Great_Vibes, Nunito } from "next/font/google";
// const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
// const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", weight: ["400","600","700","800"] });
// then add both variables to <body className={`${greatVibes.variable} ${nunito.variable} ...`}>

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const eagleLake = Eagle_Lake({
  weight: "400",
  variable: "--font-eagle-lake",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frosty Fluffs Bakery",
  description: "Freshly Baked Happiness - A premium modern bakery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link href="https://fonts.googleapis.com/css2?family=MoMo+Trust+Display:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} ${pacifico.variable} ${cinzel.variable} ${caveat.variable} ${cormorant.variable} ${eagleLake.variable} antialiased`}
      >
        <AppProvider>
          <LoadingScreen />
          <AnnouncementBanner />
          <Navbar />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
