"use client";

import Link from "next/link";
import { Car, Phone } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-heading text-xl font-bold text-primary">
                Motor Hut
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for premium pre-owned vehicles in Kenya.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/en/cars" className="hover:text-primary transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/en/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/en/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/en/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">
              Get in Touch
            </h3>
            <button
              onClick={() =>
                openWhatsApp("Hello! I'd like to inquire about your cars.")
              }
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+254 707 242 805</span>
            </button>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Motor Hut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
