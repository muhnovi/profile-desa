export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Desa Bendung</h3>
            <p className="text-sm opacity-90">
              Portal resmi Desa Bendung menyediakan informasi lengkap tentang
              desa kami.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="#facilities"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Fasilitas
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Berita
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Perizinan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Kesehatan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Pendidikan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Pertanian
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Facebook
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  WhatsApp
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  YouTube
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 mt-8">
          <p className="text-center text-sm opacity-90">
            &copy; {currentYear} Desa Bendung. Semua hak dilindungi. Universitas
            Duta Bangsa Surakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
