import { Rubik } from "next/font/google";

import "../globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { RTKProvider } from "@/components/providers/RTKProvider";

export const metadata = {
  title: "Auth",
};

const inter = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <RTKProvider>
          <body
            className={`${inter.className}  h-screen flex w-full justify-center items-center`}
          >
            {children}
          </body>
        </RTKProvider>
      </QueryProvider>
    </html>
  );
}
