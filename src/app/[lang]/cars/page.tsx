"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { formatPrice, formatMileage } from "@/lib/utils";

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

export default function CarsPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: "12" });
      if (search) params.set("make", search);
      if (maxPrice) params.set("maxPrice", maxPrice);

      const res = await fetch(`/api/public/cars?${params}`);
      const data = await res.json();
      if (!cancelled) {
        setCars(data.cars || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page, search, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-1">Inventory</h1>
        <p className="text-sm text-muted-foreground">
          {cars.length > 0 ? `${cars.length} vehicles available` : "Browse our selection"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by make..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-white border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          className="bg-white border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 w-full sm:w-40"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-sm text-muted-foreground">
          Loading...
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-sm text-muted-foreground">
          No vehicles found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Link
                key={car.id}
                href={`/en/cars/${car.id}`}
                className="group"
              >
                <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-3">
                  {car.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={car.imageUrl}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-4xl">
                      {car.make[0]}
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-medium group-hover:underline">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatMileage(car.mileage)} · {car.transmission} · {car.fuel}
                    </p>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    {formatPrice(Number(car.price))}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
              >
                ← Previous
              </button>
              <span className="text-muted-foreground">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
