import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Player from "@/components/player";
import { Lora, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const lora = Lora({subsets:['latin'],variable:'--font-serif'});

export const metadata: Metadata = {
  title: {
    default: "Borahae Beats",
    template: "%s | Borahae Beats",
  },
  description: "Search tracks, preview songs and save your favorite music with Borahae Beats.",
  openGraph: {
    title: "Borahae Beats",
    description: "Search tracks, preview songs and save your favorite music with Borahae Beats.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080012",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn( lora.variable, "font-sans", inter.variable)}>
      <body>
      <Sidebar favoriteCount={0} />
        {children}
        <Player
          title=""
          artist=""
          isPlaying={false}
        />
      </body>
    </html>
  );
}
