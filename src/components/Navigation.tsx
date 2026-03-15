"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Home,
  Megaphone,
  MapPin,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/itinerary", label: "Schedule", icon: CalendarDays },
  { href: "/announcements", label: "Updates", icon: Megaphone },
  { href: "/travel", label: "Travel", icon: MapPin },
  { href: "/guests", label: "Guests", icon: Users },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-[var(--gold-dark)]"
                  : "text-[var(--charcoal)]/50 hover:text-[var(--charcoal)]/80"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={isActive ? "text-[var(--gold-dark)]" : ""}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for notched phones */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
