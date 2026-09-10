"use client";

import Link from "next/link";
import { Car, Shield, Handshake, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-background via-card to-background py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Find Your <span className="text-primary">Perfect Ride</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Premium pre-owned vehicles in Kenya. Quality cars, transparent
            deals, and exceptional service you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/cars"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse Inventory
            </Link>
            <button
              onClick={() =>
                openWhatsApp("Hello! I'm interested in your car inventory.")
              }
              className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-primary">Motor Hut</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <Car className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-3">
                Quality Vehicles
              </h3>
              <p className="text-muted-foreground">
                Every car is thoroughly inspected to ensure the highest
                standards of quality and reliability.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-3">
                Transparent Deals
              </h3>
              <p className="text-muted-foreground">
                No hidden fees, no surprises. What you see is what you get with
                full vehicle history.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-3">
                Exceptional Service
              </h3>
              <p className="text-muted-foreground">
                From browsing to purchase, our team is here to guide you every
                step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">
            Ready to Find Your Next Car?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Contact us today and let us help you find the perfect vehicle for
            your needs.
          </p>
          <button
            onClick={() =>
              openWhatsApp(
                "Hello! I'm looking for a car. Can you help me find the right one?"
              )
            }
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Start a Conversation
          </button>
        </div>
      </section>
    </div>
  );
}
