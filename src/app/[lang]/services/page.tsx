"use client";

import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Browse",
    description: "Explore our inventory online. Filter by make, model, or price to find what fits.",
  },
  {
    number: "02",
    title: "Inspect",
    description: "Every vehicle passes a comprehensive multi-point inspection before listing.",
  },
  {
    number: "03",
    title: "Decide",
    description: "Transparent pricing with no hidden fees. Finance options available.",
  },
  {
    number: "04",
    title: "Drive",
    description: "Complete the paperwork and take delivery. Most deals close same-day.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            How it works
          </h1>
          <p className="text-muted-foreground">
            A straightforward process from start to finish.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 py-8 border-t border-border">
                <span className="text-xs text-muted-foreground font-mono mt-1">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            Finance options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 border border-border rounded-lg">
              <h3 className="text-sm font-semibold mb-1">Bank financing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We work with major lenders to secure competitive rates and
                flexible terms tailored to your budget.
              </p>
            </div>
            <div className="p-5 border border-border rounded-lg">
              <h3 className="text-sm font-semibold mb-1">Trade-ins</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Got a car to trade? We offer fair market value that goes
                directly toward your new purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-semibold mb-2">Questions about financing?</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Our team is ready to help you find the right option.
          </p>
          <button
            onClick={() =>
              openWhatsApp("Hi, I'd like to learn more about your financing options.")
            }
            className="bg-foreground text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with us
          </button>
        </div>
      </section>
    </div>
  );
}
