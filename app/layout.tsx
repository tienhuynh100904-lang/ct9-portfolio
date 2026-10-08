import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono, Unbounded } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display-face",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the deployed domain so Open Graph image URLs resolve correctly.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Huynh Cong Tien — Full-stack & Mobile Developer",
  description:
    "Portfolio of Huynh Cong Tien (CT9): fresh-graduate developer building Flutter mobile apps, Spring Boot / Laravel back-ends and React / Next.js front-ends in Ho Chi Minh City.",
  keywords: ["Huynh Cong Tien", "CT9", "Developer", "Flutter", "Spring Boot", "React", "Next.js", "Portfolio", "Ho Chi Minh City"],
  authors: [{ name: "Huynh Cong Tien" }],
  openGraph: {
    title: "Huynh Cong Tien — Full-stack & Mobile Developer",
    description: "Flutter · Spring Boot · React / Next.js — selected projects, skills and achievements.",
    type: "website",
    images: [{ url: "/images/Logo_Portfolio.png", width: 500, height: 500, alt: "CT9 logo" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${code.variable} antialiased`}>
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
