"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Car } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/en" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="font-heading text-xl font-bold text-primary">
              Motor Hut
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/en/cars"
              className="text-foreground hover:text-primary transition-colors"
            >
              Inventory
            </Link>
            <Link
              href="/en/services"
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/en/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/en/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/en/cars"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Inventory
            </Link>
            <Link
              href="/en/services"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/en/about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/en/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
