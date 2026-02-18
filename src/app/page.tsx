"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Video,
  Film,
  Music,
  FileVideo,
  Play,
  Youtube,
  Instagram,
  Facebook,
  Sun,
  Moon,
  Menu,
  X,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VideoModal } from "@/components/VideoModal";
import Image from "next/image";
import Link from "next/link";

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

// Custom hook for fade-in animation on scroll
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// Navigation Component
function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Video", id: "kategori" },
    { label: "Grafik", id: "portfolio" },
    { label: "Virksomheder", id: "virksomheder" },
    { label: "Kontakt", id: "kontakt" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
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
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Om mig
            </Link>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium transition-colors duration-200 hover:text-[#D4AF37] ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {link.label}
              </button>
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
                  ? "text-white hover:text-[#D4AF37] hover:bg-zinc-900"
                  : "text-gray-900 hover:text-[#D4AF37] hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Om mig
            </Link>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-3 font-medium transition-colors ${
                  theme === "dark"
                    ? "text-white hover:text-[#D4AF37] hover:bg-zinc-900"
                    : "text-gray-900 hover:text-[#D4AF37] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-banner.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wider mb-6">
          VISUEL FORTÆLLING
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection({
  onVideoClick,
}: {
  onVideoClick: (url: string) => void;
}) {
  const { theme } = useTheme();
  const { ref, isVisible } = useInView();

  const categories = [
    {
      title: "BRYLLUPSVIDEO",
      icon: Video,
      image: "/images/category-wedding.png",
      videoUrl: "https://youtu.be/K1YzToa-EoA",
    },
    {
      title: "REKLAME VIDEO",
      icon: Film,
      image: "/images/category-commercial.png",
      videoUrl: "https://youtu.be/K1YzToa-EoA",
    },
    {
      title: "MUSIK VIDEO",
      icon: Music,
      image: "/images/category-music.png",
      videoUrl: "https://youtu.be/K1YzToa-EoA",
    },
    {
      title: "DOKUMENTAR",
      icon: FileVideo,
      image: "/images/category-documentary.png",
      videoUrl: "https://youtu.be/K1YzToa-EoA",
    },
  ];

  return (
    <section
      id="kategori"
      ref={ref}
      className={`py-20 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wider transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          KATEGORI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              onClick={() => onVideoClick(category.videoUrl)}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`aspect-video relative ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}`}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 ${
                    theme === "dark"
                      ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      : "bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"
                  }`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className={`mb-4 p-4 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-white/10 group-hover:bg-[#D4AF37]/20"
                        : "bg-white/20 group-hover:bg-[#D4AF37]/20"
                    }`}
                  >
                    <category.icon
                      className={`w-10 h-10 transition-colors duration-300 text-white group-hover:text-[#D4AF37]`}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                    {category.title}
                  </h3>
                  <button className="px-6 py-2 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#B8962E] transition-colors">
                    KLIK HER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Portfolio Section
function PortfolioSection({
  onVideoClick,
}: {
  onVideoClick: (url: string) => void;
}) {
  const { theme } = useTheme();
  const { ref, isVisible } = useInView();

  const projects = [
    { id: 1, title: "SUSTAINABLE GREENPLAY", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 2, title: "CULTURE CAMP", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 3, title: "ODENSE FILMVÆRKSTED", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 4, title: "FILM SKABER", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 5, title: "TILMELD DIG NU", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 6, title: "SHOWREEL 2020", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 7, title: "COFFEE WITH QUALITY", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 8, title: "BULGARIA WINE TASTING", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 9, title: "CREATIVE STUDIO PROJECT", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 10, title: "VISUAL STORYTELLING", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 11, title: "BRAND DOCUMENTARY", videoUrl: "https://youtu.be/K1YzToa-EoA" },
    { id: 12, title: "EVENT HIGHLIGHTS", videoUrl: "https://youtu.be/K1YzToa-EoA" },
  ];

  return (
    <section
      id="portfolio"
      ref={ref}
      className={`py-20 px-4 ${theme === "dark" ? "bg-zinc-950" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wider transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          PORTFOLIO
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onVideoClick(project.videoUrl)}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`aspect-video relative ${theme === "dark" ? "bg-zinc-800" : "bg-gray-200"}`}>
                <img
                  src={`/images/portfolio-${((project.id - 1) % 12) + 1}.png`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                      : "bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"
                  } opacity-0 group-hover:opacity-100`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 rounded-full bg-[#D4AF37] mb-3">
                    <Play className="w-8 h-8 text-black fill-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white text-center px-4">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const { theme } = useTheme();
  const { ref, isVisible } = useInView();

  const testimonials = [
    {
      name: "Navn",
      text: "Kort udtalelse tekst om virksomhedens arbejde og kvalitet.",
      company: "Virksomhed",
    },
    {
      name: "Navn",
      text: "Kort udtalelse tekst om virksomhedens arbejde og kvalitet.",
      company: "Virksomhed",
    },
    {
      name: "Navn",
      text: "Kort udtalelse tekst om virksomhedens arbejde og kvalitet.",
      company: "Virksomhed",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className={`py-20 px-4 ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wider transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          KUNDER
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${theme === "dark" ? "bg-zinc-800" : "bg-white"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full overflow-hidden mb-4 border-4 ${
                    theme === "dark" ? "border-zinc-700" : "border-gray-100"
                  }`}
                >
                  <img
                    src={`/images/testimonial-${index + 1}.png`}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4
                  className={`font-semibold text-lg mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {testimonial.name}
                </h4>
                <p
                  className={`mb-4 italic leading-relaxed ${
                    theme === "dark" ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  {testimonial.text}
                </p>
                <Quote
                  className={`w-8 h-8 ${
                    theme === "dark" ? "text-[#D4AF37]/50" : "text-[#D4AF37]/50"
                  }`}
                />
                <p
                  className={`text-sm mt-2 ${
                    theme === "dark" ? "text-zinc-500" : "text-gray-500"
                  }`}
                >
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Companies Section
function CompaniesSection() {
  const { theme } = useTheme();
  const { ref, isVisible } = useInView();

  const companies = [
    { id: 1, name: "MURER OG BYGGERÅDGIVNING" },
    { id: 2, name: "VITEC" },
    { id: 3, name: "CFU" },
    { id: 4, name: "ODENSE FILMVÆRKSTED" },
  ];

  return (
    <section
      id="virksomheder"
      ref={ref}
      className={`py-20 px-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-2xl md:text-3xl font-bold text-center mb-4 uppercase tracking-wider transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          VIRKSOMHEDER
        </h2>
        <p
          className={`text-center mb-12 text-lg transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } ${theme === "dark" ? "text-zinc-400" : "text-gray-600"}`}
        >
          CHRISPRODUCTION HAR ARBEJDET MED:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${
                isVisible
                  ? "opacity-50 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`px-6 py-4 rounded-lg border ${
                  theme === "dark"
                    ? "border-zinc-700 text-zinc-400"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <span className="font-semibold text-sm md:text-base">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { theme } = useTheme();
  const { ref, isVisible } = useInView();
  const [formData, setFormData] = useState({
    navn: "",
    email: "",
    emne: "",
    besked: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Tak for din besked! Vi vender tilbage hurtigst muligt.");
    setFormData({ navn: "", email: "", emne: "", besked: "" });
  };

  return (
    <section
      id="kontakt"
      ref={ref}
      className={`py-20 px-4 ${theme === "dark" ? "bg-zinc-950" : "bg-gray-900"}`}
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 uppercase tracking-wider transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } text-white`}
        >
          KONTAKT
        </h2>
        <p
          className={`text-center mb-12 text-lg transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } text-zinc-400`}
        >
          SIG HEJ
        </p>
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Input
            type="text"
            placeholder="Navn"
            value={formData.navn}
            onChange={(e) => setFormData({ ...formData, navn: e.target.value })}
            required
            className={`border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 ${
              theme === "dark" ? "bg-zinc-900" : "bg-gray-800"
            }`}
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className={`border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 ${
              theme === "dark" ? "bg-zinc-900" : "bg-gray-800"
            }`}
          />
          <Input
            type="text"
            placeholder="Emne"
            value={formData.emne}
            onChange={(e) =>
              setFormData({ ...formData, emne: e.target.value })
            }
            className={`border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 ${
              theme === "dark" ? "bg-zinc-900" : "bg-gray-800"
            }`}
          />
          <Textarea
            placeholder="Besked"
            value={formData.besked}
            onChange={(e) =>
              setFormData({ ...formData, besked: e.target.value })
            }
            required
            rows={5}
            className={`border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 resize-none ${
              theme === "dark" ? "bg-zinc-900" : "bg-gray-800"
            }`}
          />
          <Button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-black font-semibold py-6 text-lg transition-all duration-300 hover:scale-[1.02]"
          >
            SEND
          </Button>
        </form>
      </div>
    </section>
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

// Main Page
export default function Home() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      return savedTheme || "dark";
    }
    return "dark";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  // Save theme to localStorage
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  const handleVideoClick = useCallback((url: string) => {
    setCurrentVideoUrl(url);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentVideoUrl("");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <Navigation />
        <HeroSection />
        <CategoriesSection onVideoClick={handleVideoClick} />
        <PortfolioSection onVideoClick={handleVideoClick} />
        <TestimonialsSection />
        <CompaniesSection />
        <ContactSection />
        <Footer />
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoUrl={currentVideoUrl}
        />
      </main>
    </ThemeContext.Provider>
  );
}
