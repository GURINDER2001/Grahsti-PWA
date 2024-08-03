import "@/styles/globals.css";
import { Metadata } from "next";
import type { AppProps } from "next/app";

export const metadata: Metadata = {
  title: "Grahsti App",
  description: "One Stop solution to manage pot money",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Gurinder Singh Kalsi",
      url: "https://www.linkedin.com/in/kalgury/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
