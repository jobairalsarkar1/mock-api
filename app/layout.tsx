import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "PlaceAPI - Mock & Realistic APIs for Developers",
  description:
    "PlaceAPI provides realistic mock APIs for frontend development, testing, and prototyping. Fast, production-ready, and easy to integrate.",
  keywords: [
    "mock api",
    "api testing",
    "frontend development",
    "placeapi",
    "developer tools",
  ],
  openGraph: {
    title: "PlaceAPI - Mock & Realistic APIs for Developers",
    description:
      "Fast, production-ready APIs for frontend developers to test and prototype applications.",
    url: "https://placeapi.site",
    siteName: "PlaceAPI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlaceAPI Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceAPI - Mock & Realistic APIs for Developers",
    description:
      "Fast, production-ready APIs for frontend developers to test and prototype applications.",
    images: ["/og-image.png"],
    creator: "@jobairalsarkar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                // const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
                const initialTheme = savedTheme || 'dark';
                document.documentElement.classList.toggle('dark', initialTheme === 'dark');
              } catch (e) {
                console.error('Theme initialization error:', e);
              }
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
