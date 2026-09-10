"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { openWhatsApp, formatPrice, formatMileage } from "@/lib/utils";

interface CarType {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  transmission: string;
  fuel: string;
  status: string;
  imageUrl: string | null;
  description: string | null;
}

export default function CarDetailPage() {
  const params = useParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCar() {
      const res = await fetch(`/api/public/cars/${params.id}`);
      if (!res.ok) {
        setError("Vehicle not found");
        setLoading(false);
        return;
      }
      setCar(await res.json());
      setLoading(false);
    }
    fetchCar();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground mb-4">{error || "Vehicle not found"}</p>
        <Link href="/en/cars" className="text-sm text-foreground underline underline-offset-4">
          Back to inventory
        </Link>
      </div>
    );
  }

  const inquireMessage = `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed at ${formatPrice(Number(car.price))}. Is it still available?`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href="/en/cars"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
            {car.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={car.imageUrl}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 text-6xl font-light">
                {car.make[0]}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {car.year} {car.make} {car.model}
              </h1>
              {car.status !== "available" && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {car.status}
                </span>
              )}
            </div>
            <p className="text-2xl font-semibold">{formatPrice(Number(car.price))}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Mileage</p>
              <p className="font-medium">{formatMileage(car.mileage)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Transmission</p>
              <p className="font-medium">{car.transmission}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Fuel</p>
              <p className="font-medium">{car.fuel}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Year</p>
              <p className="font-medium">{car.year}</p>
            </div>
          </div>

          {car.description && (
            <div className="mb-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>
          )}

          <button
            onClick={() => openWhatsApp(inquireMessage)}
            className="w-full bg-foreground text-background px-6 py-3 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Inquire via WhatsApp
          </button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Usually responds within minutes
          </p>
        </div>
      </div>
    </div>
  );
}
