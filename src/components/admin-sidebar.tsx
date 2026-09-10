"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle } from "lucide-react";
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
    <aside className="w-56 border-r border-border bg-white min-h-screen p-4">
      <Link href="/kicheleboyz/cars" className="text-sm font-semibold tracking-tight block mb-8">
        Motor Hut Admin
      </Link>

      <nav className="space-y-0.5">
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
                "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
