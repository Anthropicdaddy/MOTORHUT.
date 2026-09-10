"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Pencil, Trash2, X, Save, Car } from "lucide-react";

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
  fuel: "Petrol",
  status: "available",
  imageUrl: "",
  description: "",
};

export default function AdminCarsPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
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
    if (!confirm("Are you sure you want to delete this car?")) return;
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
        <h1 className="font-heading text-3xl font-bold">
          Car <span className="text-primary">Management</span>
        </h1>
        {!showForm && (
          <button
            onClick={() => {
              setForm(emptyCar);
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Car
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold">
              {editingId ? "Edit Car" : "Add New Car"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Make *</label>
              <input
                type="text"
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Toyota"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model *</label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Premio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year *</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: parseInt(e.target.value) })
                }
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Price (KES) *
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="2500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mileage (km) *
              </label>
              <input
                type="number"
                value={form.mileage}
                onChange={(e) =>
                  setForm({ ...form, mileage: parseInt(e.target.value) })
                }
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Transmission *
              </label>
              <select
                value={form.transmission}
                onChange={(e) =>
                  setForm({ ...form, transmission: e.target.value })
                }
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fuel *</label>
              <select
                value={form.fuel}
                onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Optional car description..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={!form.make || !form.model || !form.price}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {editingId ? "Update" : "Save"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="border border-border px-6 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">
          Loading cars...
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Car className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No cars in inventory yet.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Car
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Mileage
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
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
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {car.year} {car.make} {car.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {car.transmission} · {car.fuel}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-primary font-semibold">
                    KES {Number(car.price).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {car.mileage.toLocaleString()} km
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(car)}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
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
