"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Car } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
        Our <span className="text-primary">Inventory</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          type="number"
          placeholder="Max price (KES)"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          className="bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-48"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">
          Loading cars...
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Car className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No cars found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Link
                key={car.id}
                href={`/en/cars/${car.id}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group"
              >
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  {car.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={car.imageUrl}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Car className="h-16 w-16 text-muted-foreground/50" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
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
                  <p className="text-primary font-semibold text-lg mb-2">
                    KES {Number(car.price).toLocaleString()}
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{car.mileage.toLocaleString()} km</span>
                    <span>{car.transmission}</span>
                    <span>{car.fuel}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-card border border-border rounded-lg text-foreground disabled:opacity-50 hover:border-primary transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-card border border-border rounded-lg text-foreground disabled:opacity-50 hover:border-primary transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
