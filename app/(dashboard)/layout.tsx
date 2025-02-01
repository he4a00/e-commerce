import { Roboto_Mono } from "next/font/google";

import "../globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { RTKProvider } from "@/components/providers/RTKProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export const metadata = {
  title: "Admin Dashboard",
};

const inter = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <RTKProvider>
          <body className={`${inter.className} h-screen flex w-full`}>
            <SidebarProvider>
              <SidebarTrigger />
              <AppSidebar />
              {children}
            </SidebarProvider>
          </body>
        </RTKProvider>
      </QueryProvider>
    </html>
  );
}
