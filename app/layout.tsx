import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AndyAI Visual Factory",
  description: "Brand-to-assets visual production runtime."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/" className="brand">AndyAI Visual Factory</Link>
          <div className="navlinks">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/workspaces">Workspaces</Link>
            <Link href="/jobs">Jobs</Link>
            <Link href="/assets">Assets</Link>
            <Link href="/showcase">Showcase</Link>
            <Link href="/operator">Operator</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
