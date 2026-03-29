"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "בית", href: "/" },
  { label: "בוט WhatsApp", href: "/whatsapp-bot" },
  { label: "דשבורדים", href: "/dashboards" },
  { label: "פורטל למידה", href: "/learning" },
  { label: "דמו חי", href: "/demo" },
  { label: "צור קשר", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surface-elevated/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-accent">
            Retail-Skillz
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              קבע הדגמה
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2 rounded-lg transition-colors text-center w-fit"
            >
              קבע הדגמה
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
