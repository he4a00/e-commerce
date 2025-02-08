import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background container mx-auto">
      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/products/new-arrivals">New Arrivals</Link>
              </li>
              <li>
                <Link href="/products/bestsellers">Bestsellers</Link>
              </li>
              <li>
                <Link href="/products/women">Women</Link>
              </li>
              <li>
                <Link href="/products/men">Men</Link>
              </li>
              <li>
                <Link href="/products/accessories">Accessories</Link>
              </li>
              <li>
                <Link href="/products/sale">Sale</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Help</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/customer-service">Customer Service</Link>
              </li>
              <li>
                <Link href="/track-order">Track Your Order</Link>
              </li>
              <li>
                <Link href="/returns">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping Information</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about">Our Story</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/sustainability">Sustainability</Link>
              </li>
              <li>
                <Link href="/press">Press</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and fashion tips.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-full"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/accessibility">Accessibility</Link>
            <p>
              &copy; {new Date().getFullYear()} Your Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
