"use client";

import { useState } from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const waMessage = `Hi, my name is ${name}.\nPhone: ${phone}\n\n${message}`;
    openWhatsApp(waMessage);
    setSubmitted(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-1">Contact</h1>
      <p className="text-sm text-muted-foreground mb-12">
        Have a question? We&apos;re here to help.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-sm font-semibold mb-4">Reach out directly</h2>
          <div className="space-y-3 mb-8">
            <button
              onClick={() => openWhatsApp("Hi, I have a question about Motor Hut.")}
              className="w-full flex items-center gap-3 p-4 border border-border rounded-lg text-left hover:bg-muted transition-colors text-sm"
            >
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Instant replies</p>
              </div>
            </button>
            <a
              href="tel:+1254707242805"
              className="w-full flex items-center gap-3 p-4 border border-border rounded-lg text-left hover:bg-muted transition-colors text-sm"
            >
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-xs text-muted-foreground">(254) 707-242-805</p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Los Angeles, CA</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-4">Send a message</h2>
          {submitted ? (
            <div className="border border-border rounded-lg p-8 text-center">
              <p className="font-medium mb-1">Message sent</p>
              <p className="text-sm text-muted-foreground mb-4">
                We&apos;ll get back to you shortly via WhatsApp.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setPhone("");
                  setMessage("");
                }}
                className="text-sm underline underline-offset-4 hover:text-foreground"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium mb-1.5">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 resize-none"
                  placeholder="What are you looking for?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
