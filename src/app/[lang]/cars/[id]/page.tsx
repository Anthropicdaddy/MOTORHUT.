"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  MessageCircle,
  Gauge,
  Fuel,
  Calendar,
  Cog,
} from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

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
        setError("Car not found");
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground text-lg mb-4">
          {error || "Car not found"}
        </p>
        <Link
          href="/en/cars"
          className="text-primary hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>
      </div>
    );
  }

  const inquireMessage = `Hello! I'm interested in the ${car.year} ${car.make} ${car.model} (KES ${Number(car.price).toLocaleString()}). Is it still available?`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/en/cars"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-[4/3] bg-card border border-border rounded-xl flex items-center justify-center">
          {car.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={car.imageUrl}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Car className="h-24 w-24 text-muted-foreground/30" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              {car.year} {car.make} {car.model}
            </h1>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                car.status === "available"
                  ? "bg-green-900/30 text-green-400"
                  : car.status === "reserved"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-red-900/30 text-red-400"
              }`}
            >
              {car.status}
            </span>
          </div>

          <p className="text-primary font-semibold text-3xl mb-6">
            KES {Number(car.price).toLocaleString()}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="h-5 w-5 text-primary" />
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cog className="h-5 w-5 text-primary" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Fuel className="h-5 w-5 text-primary" />
              <span>{car.fuel}</span>
            </div>
          </div>

          {car.description && (
            <div className="mb-6">
              <h2 className="font-heading text-xl font-semibold mb-2">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>
          )}

          <button
            onClick={() => openWhatsApp(inquireMessage)}
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Inquire on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
