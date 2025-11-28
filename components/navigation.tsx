"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    // Tutup mobile menu ketika route berubah
    setIsOpen(false)
  }, [pathname])

  const allNavItems = [
    { label: "Beranda", href: "#home", isLink: false },
    { label: "Berita Umkm", href: "#news", isLink: false },
    { label: "Maps Wisata", href: "#wisata", isLink: false },
    { label: "Pengaduan", href: "/pengaduan", isLink: true },
    { label: "Kontak", href: "#contact", isLink: false },
  ]

  // Tampilkan hanya Beranda dan Pengaduan di halaman /pengaduan
  const navItems =
    pathname === "/pengaduan"
      ? [allNavItems[0], allNavItems[3]] // Beranda dan Pengaduan di halaman /pengaduan
      : allNavItems // Semua menu di halaman lain

  const handleNavClick = (href: string) => {
    setActiveSection(href)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSectionClick = (sectionHref: string, label: string) => {
    if (pathname === "/") {
      handleNavClick(sectionHref)
    } else {
      // Jika itu menu Beranda, pergi ke "/" tanpa hash
      if (label === "Beranda") {
        window.location.href = "/"
      } else {
        // Pergi ke halaman utama dan scroll ke section
        window.location.href = `/${sectionHref}`
      }
    }
    setIsOpen(false)
  }

  const isHomePage = pathname === "/"

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">🏘️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Desa Bendung</h1>
              <p className="text-xs text-muted-foreground">Kecamatan Semin</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.isLink ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium relative transition-colors duration-300 ${
                    pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse"></span>
                  )}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleSectionClick(item.href, item.label)}
                  className={`text-sm font-medium relative transition-colors duration-300 cursor-pointer ${
                    activeSection === item.href && isHomePage ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href && isHomePage && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse"></span>
                  )}
                </button>
              ),
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-all duration-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2 px-4 py-4">
              {navItems.map((item) =>
                item.isLink ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-green-200 text-foreground font-medium"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => handleSectionClick(item.href, item.label)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.href && isHomePage
                        ? "bg-green-200 text-foreground font-medium"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
