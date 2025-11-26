"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const news = [
    {
      date: "15 Januari 2024",
      title: "Program Pemberdayaan Petani Dimulai",
      description:
        "Pemerintah desa meluncurkan program baru untuk memberdayakan petani lokal dengan pelatihan dan modal usaha.",
      image: "/farmer-training-program-indonesia.jpg",
    },
    {
      date: "8 Januari 2024",
      title: "Renovasi Jalan Desa Selesai",
      description: "Proyek renovasi jalan utama desa telah selesai dan dapat dilalui oleh berbagai jenis kendaraan.",
      image: "/rural-road-construction.png",
    },
    {
      date: "1 Januari 2024",
      title: "Perayaan Tahun Baru Bersama Masyarakat",
      description: "Kegiatan bersama masyarakat untuk merayakan tahun baru dengan penuh kebersamaan dan syukur.",
      image: "/village-community-celebration.jpg",
    },
    {
      date: "20 Desember 2023",
      title: "Pembangunan Fasilitas Kesehatan Desa Baru",
      description:
        "Pembukaan Pusat Kesehatan Masyarakat (Puskesmas) baru di desa dengan dilengkapi peralatan modern untuk melayani kesehatan warga.",
      image: "/community-health-center.jpg",
    },
  ]

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <section id="news" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Berita Umkm Desa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informasi terbaru dan berita-berita penting dari desa
          </p>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article
              key={index}
              className="bg-background rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-border"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg?height=200&width=400&query=berita desa"}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{item.date}</p>
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
                <a href="#" className="mt-4 inline-block text-primary font-semibold hover:underline">
                  Baca Selengkapnya →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="md:hidden">
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {news.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <article className="bg-background rounded-xl overflow-hidden border border-border">
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={item.image || "/placeholder.svg?height=200&width=400&query=berita desa"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-primary font-semibold mb-2">{item.date}</p>
                        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
                        <a href="#" className="mt-4 inline-block text-primary font-semibold hover:underline">
                          Baca Selengkapnya →
                        </a>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-primary text-white rounded-full p-2 hover:bg-primary/80 transition-colors z-10"
              aria-label="Berita sebelumnya"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-primary text-white rounded-full p-2 hover:bg-primary/80 transition-colors z-10"
              aria-label="Berita selanjutnya"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground w-2"
                  }`}
                  aria-label={`Lihat berita ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
