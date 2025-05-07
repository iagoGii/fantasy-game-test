// app/layout.tsx
import Navbar from "../components/Navbar";
import { TeamProvider } from "../context/TeamContext";
import "../styles/global.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Fantasy FC",
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-50 py-6">
          <TeamProvider>{children}</TeamProvider>
        </main>
        <footer className="text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} Fantasy FC. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
