import "../globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { RTKProvider } from "@/components/providers/RTKProvider";
import Footer from "@/components/shared/Home/Foote";
import MainNavbar from "@/components/shared/Home/MainNavbar/MainNavbar";
import SecNavbar from "@/components/shared/Home/SecNavbar/SecNavbar";
import { Toaster } from "@/components/ui/toaster";

import { Nunito } from "next/font/google";

export const metadata = {
  title: "E",
};

const inter = Nunito({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <RTKProvider>
          <body className={`${inter.className} antialiased`}>
            <MainNavbar />
            <SecNavbar />
            {children}
            <Toaster />
            <Footer />
          </body>
        </RTKProvider>
      </QueryProvider>
    </html>
  );
}
