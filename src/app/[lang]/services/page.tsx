import {
  Search,
  FileCheck,
  Handshake,
  Car,
  CreditCard,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Browse & Choose",
    description:
      "Explore our curated inventory online or visit our showroom. Filter by make, model, price, and more.",
  },
  {
    icon: FileCheck,
    title: "Inspection",
    description:
      "Every vehicle undergoes a comprehensive multi-point inspection to ensure quality and reliability.",
  },
  {
    icon: Handshake,
    title: "Negotiate & Agree",
    description:
      "Transparent pricing with no hidden fees. We work with you to find the best deal.",
  },
  {
    icon: Car,
    title: "Take Delivery",
    description:
      "Complete paperwork and drive away in your new car the same day.",
  },
];

const financeOptions = [
  {
    icon: CreditCard,
    title: "Bank Financing",
    description:
      "We partner with major banks to offer competitive interest rates and flexible repayment terms.",
  },
  {
    icon: ShieldCheck,
    title: "Trade-In",
    description:
      "Got an old car? Trade it in and get a great value towards your new purchase.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Consultation",
    description:
      "Chat with our finance team directly on WhatsApp to discuss your options.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From finding the perfect car to driving it home, we make the
            process smooth and enjoyable.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">
            The Purchase Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 text-center relative"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="absolute top-4 right-4 text-4xl font-heading font-bold text-primary/10">
                  {i + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">
            Finance Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financeOptions.map((option, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-8 text-center"
              >
                <option.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-3">
                  {option.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Need Help with Financing?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Our finance team is ready to help you find the best option.
          </p>
          <button
            onClick={() =>
              openWhatsApp(
                "Hello! I'd like to know more about your finance options."
              )
            }
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Chat with Finance Team
          </button>
        </div>
      </section>
    </div>
  );
}
