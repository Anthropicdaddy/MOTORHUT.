"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-semibold tracking-tight mb-3">Motor Hut</p>
            <p className="text-muted-foreground">
              Quality pre-owned vehicles in Los Angeles.
            </p>
          </div>
          <div>
            <p className="font-semibold tracking-tight mb-3">Links</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/en/cars" className="hover:text-foreground transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/en/services" className="hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/en/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/en/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold tracking-tight mb-3">Contact</p>
            <button
              onClick={() =>
                openWhatsApp("Hello! I'm interested in your inventory.")
              }
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>(254) 707-242-805</span>
            </button>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Motor Hut. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
