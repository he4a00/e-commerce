"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-64 bg-gray-100 dark:bg-gray-900 h-screen">
      <SidebarContent>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/images/cat/category-1.png"
                alt="Logo"
                width={50}
                height={50}
              />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Home
              </span>
            </div>
          </Link>
        </div>

        {SidebarLinks.map((group) => (
          <SidebarGroup key={group.name} className="mb-6">
            <SidebarGroupLabel className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              <group.icon className="mr-3 h-5 w-5 text-blue-500" />
              {group.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.subLinks.map((subLink) => {
                  const isActive = pathname === `/admin/${subLink.url}`;
                  return (
                    <SidebarMenuItem key={subLink.name}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/admin/${subLink.url}`}
                          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            isActive
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-500 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          <subLink.icon className="mr-3 h-5 w-5" />
                          <span className="text-sm">{subLink.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
