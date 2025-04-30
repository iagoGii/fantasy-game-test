"use client";
import { ReactNode } from "react";

export default function Container({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto w-full p-6 bg-white shadow-md rounded-lg">
      {children}
    </div>
  );
}
