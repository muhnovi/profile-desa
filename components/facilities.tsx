"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Facilities() {
  const { ref, isVisible } = useScrollAnimation()

  const facilities = [
    {
      icon: "🏫",
      title: "Sekolah Dasar & Menengah",
      description: "Fasilitas pendidikan berkualitas untuk anak-anak desa",
    },
    {
      icon: "🏥",
      title: "Puskesmas",
      description: "Layanan kesehatan dasar untuk masyarakat",
    },
    {
      icon: "📚",
      title: "Perpustakaan Desa",
      description: "Sarana belajar dan akses informasi bagi warga",
    },
    // {
    //   icon: "⚽",
    //   title: "Lapangan Olahraga",
    //   description: "Area untuk kegiatan olahraga dan rekreasi",
    // },
    {
      icon: "🛣️",
      title: "Jalan Aspal",
      description: "Infrastruktur jalan yang baik menghubungkan seluruh desa",
    },
    {
      icon: "🌾",
      title: "Sarana Pertanian",
      description: "Irigasi dan peralatan untuk mendukung pertanian",
    },
  ]

  return (
    <section
      id="facilities"
      ref={ref}
      className={`py-20 bg-background transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Fasilitas Desa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berbagai fasilitas publik yang mendukung kehidupan masyarakat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="text-4xl mb-4">{facility.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{facility.title}</h3>
              <p className="text-muted-foreground">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
