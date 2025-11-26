export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary to-accent/10 py-20 sm:py-32"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-accent blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-primary mb-2">🌾 DESA BENDUNG</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                Selamat Datang di Desa Kami
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Desa Bendung adalah desa yang indah dengan keindahan alam dan kekayaan budaya lokal. Kami bangga
                menjadi bagian dari warisan budaya Indonesia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Pelajari Lebih Lanjut
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img src="/beautiful-village-landscape-with-traditional-house.jpg" alt="Desa Bendung" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
