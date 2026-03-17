"use client";

import PasswordGate from "./PasswordGate";
import Navigation from "./Navigation";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PasswordGate>
      <main className="min-h-screen pb-24">{children}</main>
      <Navigation />
    </PasswordGate>
  );
}
