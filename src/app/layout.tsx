import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "Must watch",
  description: "Your premium guide to the latest movies and series",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen text-white">
        <Background />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}
