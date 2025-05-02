import type {Metadata} from "next";
import {Noto_Sans_JP} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  preload: false,
  display: "swap",
  fallback: [
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Meiryo",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "oumelab",
  description: "Web Development Learning Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable}  font-noto-sans-jp antialiased`}
    >
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="max-w-3xl mx-auto px-5 py-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
