"use client";

import { useState } from "react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

const quickActions = [
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    description: "Get instant replies to your questions",
    action: () => openWhatsApp("Hello! I have a question about Motor Hut."),
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+254 707 242 805",
    action: () => {
      if (typeof window !== "undefined") window.open("tel:+254707242805");
    },
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const waMessage = `Hello! My name is ${name}.\nPhone: ${phone}\n\n${message}`;
    openWhatsApp(waMessage);
    setSubmitted(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
        Get in <span className="text-primary">Touch</span>
      </h1>
      <p className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">
        Have a question about a car or our services? Reach out and we&apos;ll
        get back to you promptly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-2xl font-semibold mb-6">
            Quick Actions
          </h2>
          <div className="space-y-4 mb-8">
            {quickActions.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/50 transition-colors text-left"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold mb-6">
            Send Us a Message
          </h2>
          {submitted ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">
                Message Sent!
              </h3>
              <p className="text-muted-foreground mb-4">
                We&apos;ve opened WhatsApp with your message. Thank you for
                reaching out!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setPhone("");
                  setMessage("");
                }}
                className="text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us what you're looking for..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
