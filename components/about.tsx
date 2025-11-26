"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function About() {
  const { ref, isVisible } = useScrollAnimation()

  const stats = [
    { label: "Penduduk", value: "3,245", icon: "👥" },
    { label: "Luas Wilayah", value: "12.5 km²", icon: "📍" },
    { label: "Berdiri Sejak", value: "1850", icon: "📅" },
    { label: "Kepala Desa", value: "Bpk. DIdik Rubiyanto", icon: "👔" },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 bg-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Tentang Desa Bendung Semin</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mengenal lebih dekat sejarah, budaya, dan kehidupan masyarakat desa kami di Gunung Kidul
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="/traditional-indonesian-village-in-yogyakarta-mount.jpg"
              alt="Budaya Desa"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Sejarah dan Budaya</h3>
            <p className="text-muted-foreground leading-relaxed">
              Desa Bendung Semin berlokasi di Gunung Kidul, Yogyakarta, dengan kekayaan budaya dan tradisi lokal yang
              masih dijaga hingga saat ini. Masyarakat kami berkomitmen untuk melestarikan warisan budaya Indonesia.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Desa kami terkenal dengan pertanian, kerajinan bambu tradisional, dan kehangatan gotong
              royong antar sesama warga masyarakat.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="text-primary font-bold">✓</span> Pertanian
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary font-bold">✓</span> Kerajinan Bambu Tradisional
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary font-bold">✓</span> Budaya Gotong Royong
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-secondary to-secondary/50 rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
