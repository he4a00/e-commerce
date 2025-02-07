/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import SearchBar from "./SearchInput";
import Wishlist from "./Wishlist";
import ProfileDropdown from "./ProfileDropdown";
import AuthButtons from "./AuthButtons";
import Cart from "./Cart";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <SearchBar />
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <Cart />
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <Wishlist />
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Account
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/images/logo.svg" alt="logo" width={200} height={200} />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden w-full max-w-xl px-4 lg:block">
          <SearchBar />
        </div>

        {/* Icons - Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <Cart />
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon">
              <Wishlist />
            </Button>
          </Link>
          {user ? <ProfileDropdown /> : <AuthButtons />}
        </div>
      </div>
    </nav>
  );
}
