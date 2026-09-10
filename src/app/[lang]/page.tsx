"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Los Angeles, CA
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Used cars, done right.
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Thoroughly inspected vehicles with transparent pricing.
            No hidden fees, no pressure — just honest deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/cars"
              className="bg-green-btn text-green-btn-text px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-btn-hover transition-colors"
            >
              Browse Inventory
            </Link>
            <button
              onClick={() =>
                openWhatsApp("Hi, I'm interested in your cars. What's available?")
              }
              className="border border-border px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Text Us
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm font-semibold mb-2">Every car inspected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each vehicle goes through a rigorous multi-point inspection
                before it reaches our lot.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Transparent pricing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The price you see is the price you pay. No dealer markups,
                no surprises at the register.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">No-pressure experience</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We&apos;re here to help you find the right car, not to push you
                into a decision. Take your time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-green-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">
            Ready to find your next car?
          </h2>
          <p className="text-muted-foreground mb-6">
            Reach out and we&apos;ll help you find exactly what you&apos;re looking for.
          </p>
          <button
            onClick={() =>
              openWhatsApp("Hi, I'm looking for a car. Can you help?")
            }
            className="bg-green-btn text-green-btn-text px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-btn-hover transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
