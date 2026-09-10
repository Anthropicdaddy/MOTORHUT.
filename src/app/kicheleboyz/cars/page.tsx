"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PlusCircle, Pencil, Trash2, X, Save } from "lucide-react";
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

const emptyCar = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: "",
  mileage: 0,
  transmission: "Automatic",
  fuel: "Gasoline",
  status: "available",
  imageUrl: "",
  description: "",
};

function AdminCarsContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(searchParams.get("action") === "add");
  const [form, setForm] = useState(emptyCar);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    const res = await fetch("/api/admin/cars");
    setCars(await res.json());
    setLoading(false);
  }

  async function handleSave() {
    const body = {
      ...form,
      price: form.price,
      imageUrl: form.imageUrl || null,
      description: form.description || null,
    };

    if (editingId) {
      await fetch(`/api/admin/cars/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/admin/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyCar);
    fetchCars();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this car?")) return;
    await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
    fetchCars();
  }

  function startEdit(car: CarType) {
    setForm({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      transmission: car.transmission,
      fuel: car.fuel,
      status: car.status,
      imageUrl: car.imageUrl || "",
      description: car.description || "",
    });
    setEditingId(car.id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Cars</h1>
        {!showForm && (
          <button
            onClick={() => {
              setForm(emptyCar);
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-foreground text-background px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add
          </button>
        )}
      </div>

      {showForm && (
        <div className="border border-border rounded-lg p-5 mb-8 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">
              {editingId ? "Edit car" : "New car"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Make *</label>
              <input
                type="text"
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
                placeholder="Toyota"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Model *</label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
                placeholder="Camry"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Year *</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: parseInt(e.target.value) })
                }
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Price (USD) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
                placeholder="25000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Mileage *</label>
              <input
                type="number"
                value={form.mileage}
                onChange={(e) =>
                  setForm({ ...form, mileage: parseInt(e.target.value) })
                }
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Transmission *</label>
              <select
                value={form.transmission}
                onChange={(e) =>
                  setForm({ ...form, transmission: e.target.value })
                }
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Fuel *</label>
              <select
                value={form.fuel}
                onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
              >
                <option>Gasoline</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Status *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium mb-1">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-white border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-btn-text/20 resize-none"
                placeholder="Optional description..."
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={!form.make || !form.model || !form.price}
              className="bg-foreground text-background px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-1.5 disabled:opacity-30"
            >
              <Save className="h-3.5 w-3.5" />
              {editingId ? "Update" : "Save"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="border border-border px-4 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-sm text-muted-foreground">
          Loading...
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-sm text-muted-foreground">
          No cars yet.
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Car
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Mileage
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right px-4 py-2 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-2.5">
                    <p className="font-medium">
                      {car.year} {car.make} {car.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {car.transmission} · {car.fuel}
                    </p>
                  </td>
                  <td className="px-4 py-2.5 font-medium">
                    {formatPrice(Number(car.price))}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {formatMileage(car.mileage)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        car.status === "available"
                          ? "bg-green-50 text-green-700"
                          : car.status === "reserved"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => startEdit(car)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="p-1 text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminCarsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm text-muted-foreground">Loading...</div>}>
      <AdminCarsContent />
    </Suspense>
  );
}
