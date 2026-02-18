"use client";

import { useState, useCallback, createContext, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  Moon,
  Menu,
  X,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";

// Theme Context
type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Navigation Component
function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Video", href: "/#kategori" },
    { label: "Grafik", href: "/#portfolio" },
    { label: "Virksomheder", href: "/#virksomheder" },
    { label: "Kontakt", href: "/#kontakt" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === "dark"
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-md shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ChrisProduction Logo"
              width={50}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
            <span
              className={`font-bold text-xl tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ChrisProduction
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/om-mig"
              className={`font-medium transition-colors duration-200 hover:text-[#D4AF37] ${
                theme === "dark" ? "text-[#D4AF37]" : "text-[#D4AF37]"
              }`}
            >
              Om mig
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-medium transition-colors duration-200 hover:text-[#D4AF37] ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === "dark"
                  ? "bg-zinc-800 text-yellow-400 hover:bg-zinc-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-zinc-800 text-yellow-400"
                  : "bg-gray-100 text-gray-900"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden py-4 border-t transition-all duration-300 ${
              theme === "dark"
                ? "bg-black/95 border-zinc-800"
                : "bg-white/95 border-gray-200"
            }`}
          >
            <Link
              href="/om-mig"
              className={`block w-full text-left px-4 py-3 font-medium transition-colors ${
                theme === "dark"
                  ? "text-[#D4AF37] hover:bg-zinc-900"
                  : "text-[#D4AF37] hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Om mig
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block w-full text-left px-4 py-3 font-medium transition-colors ${
                  theme === "dark"
                    ? "text-white hover:text-[#D4AF37] hover:bg-zinc-900"
                    : "text-gray-900 hover:text-[#D4AF37] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-8 px-4 border-t ${
        theme === "dark"
          ? "bg-black border-zinc-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-[#D4AF37] ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-[#D4AF37] ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-[#D4AF37] ${
                theme === "dark" ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
          <p
            className={`text-sm text-center ${
              theme === "dark" ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            © 2025 ChrisProduction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Om Mig Page
export default function OmMigPage() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      return savedTheme || "dark";
    }
    return "dark";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <Navigation />

        {/* Om Mig Section */}
        <section className={`pt-32 pb-20 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <h1
              className={`text-4xl md:text-5xl font-bold text-center mb-16 uppercase tracking-wider ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              OM MIG
            </h1>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Portrait Image */}
              <div className="order-1 lg:order-1 flex justify-center">
                <div
                  className={`relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden shadow-2xl ${
                    theme === "dark" ? "ring-1 ring-zinc-800" : "ring-1 ring-gray-200"
                  }`}
                >
                  <img
                    src="/portrait.jpg"
                    alt="ChrisProduction - Videoredigerer og Multimediedesigner"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div
                    className={`absolute inset-0 ${
                      theme === "dark"
                        ? "bg-gradient-to-t from-black/30 to-transparent"
                        : "bg-gradient-to-t from-white/20 to-transparent"
                    }`}
                  />
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="order-2 lg:order-2">
                <div className={`prose prose-lg max-w-none ${
                  theme === "dark" ? "prose-invert" : ""
                }`}>
                  <p
                    className={`text-lg leading-relaxed mb-6 ${
                      theme === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    Hej, og velkommen til ChrisProduction. Jeg er en passioneret videoredigerer 
                    og multimediedesigner, der har dedikeret det sidste årti til at perfektionere 
                    kunsten at skabe visuelt indhold, der fanger opmærksomheden og fortæller 
                    historier, der rør ved mennesker.
                  </p>

                  <p
                    className={`text-lg leading-relaxed mb-6 ${
                      theme === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    Med <span className="font-semibold text-[#D4AF37]">10 års erfaring inden for videoredigering</span> har 
                    jeg arbejdet med alt fra bryllupsfilm til reklameproduktioner, musikvideoer 
                    og dokumentarer. Hvert projekt er en ny mulighed for at skabe noget unikt 
                    og meningsfuldt.
                  </p>

                  <p
                    className={`text-lg leading-relaxed mb-6 ${
                      theme === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    Jeg brænder for <span className="font-semibold text-[#D4AF37]">visuel historiefortælling</span> – 
                    evnen til at væve billeder, lyd og bevægelse sammen til en fortælling, 
                    der taler direkte til seerens hjerte. Det handler ikke kun om teknisk 
                    færdighed, men om at forstå historien bag hvert projekt og bringe den 
                    til live på lærredet.
                  </p>

                  <p
                    className={`text-lg leading-relaxed mb-6 ${
                      theme === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    Min faglige baggrund omfatter en solid <span className="font-semibold text-[#D4AF37]">uddannelse inden for video, 
                    medie og grafisk design</span>. Jeg er uddannet <span className="font-semibold text-[#D4AF37]">Multimediedesigner fra UCL</span>, 
                    hvor jeg har opbygget et stærkt fundament i både den kreative og tekniske 
                    side af medieproduktion. Denne kombination af uddannelse og praktisk erfaring 
                    sikrer, at jeg kan levere professionelle resultater af høj kvalitet.
                  </p>

                  <p
                    className={`text-lg leading-relaxed ${
                      theme === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    Uanset om du har brug for en bryllupsfilm, en reklamevideo, en musikvideo 
                    eller en dokumentar, er jeg her for at hjælpe dig med at realisere din 
                    vision. Lad os skabe noget fantastisk sammen.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-10">
                  <Link
                    href="/#kontakt"
                    className="inline-block bg-[#D4AF37] hover:bg-[#B8962E] text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 rounded"
                  >
                    Kontakt mig
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ThemeContext.Provider>
  );
}
