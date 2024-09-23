import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import Modals from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import JotaiClientProviders from "@/components/jotai-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slack Clone",
  description: "Slack Clone with Next JS 14.2.7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang={"en"}>
        <body className={inter.className}>
          <ConvexClientProvider>
            <JotaiClientProviders>
              <Modals />
              {children}
              <Toaster />
            </JotaiClientProviders>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
