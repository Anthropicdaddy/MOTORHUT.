"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, LayoutDashboard, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/kicheleboyz/cars",
    label: "All Cars",
    icon: LayoutDashboard,
  },
  {
    href: "/kicheleboyz/cars?action=add",
    label: "Add Car",
    icon: PlusCircle,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      <Link href="/kicheleboyz/cars" className="flex items-center gap-2 mb-8">
        <Car className="h-8 w-8 text-primary" />
        <span className="font-heading text-xl font-bold text-primary">
          Motor Hut
        </span>
      </Link>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/kicheleboyz/cars"
              ? pathname === item.href && !pathname.includes("?")
              : pathname.includes("action=add");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
