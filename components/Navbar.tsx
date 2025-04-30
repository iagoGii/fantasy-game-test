"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

export default function Navbar() {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/team", label: "Meu Time" },
    { href: "/league", label: "Ligas" },
  ];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Fantasy FC</h1>
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <nav
          className={`flex-col md:flex-row md:flex md:items-center space-y-2 md:space-y-0 md:space-x-4 ${
            open ? "flex" : "hidden"
          }`}
        >
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-1 rounded transition-colors font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
