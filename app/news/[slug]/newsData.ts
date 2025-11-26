export interface NewsItem {
  date: string
  title: string
  description: string
  image: string
  youtubeUrl?: string
  fullDescription?: string
  slug: string
}

export const newsData: NewsItem[] = [
  {
    date: "15 Januari 2024",
    title: "Program Pemberdayaan Petani Dimulai",
    description:
      "Pemerintah desa meluncurkan program baru untuk memberdayakan petani lokal dengan pelatihan dan modal usaha.",
    fullDescription:
      "Pemerintah desa meluncurkan program baru untuk memberdayakan petani lokal dengan pelatihan dan modal usaha.\n\nProgram ini dirancang untuk meningkatkan produktivitas pertanian dan kesejahteraan petani di wilayah desa. Dengan adanya pelatihan intensif dan bantuan modal yang tepat, diharapkan petani lokal dapat meningkatkan hasil panen dan memperluas jangkauan pasar mereka.\n\nParisipasi aktif dari seluruh stakeholder sangat diperlukan untuk kesuksesan program ini.",
    image: "/farmer-training-program-indonesia.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    slug: "program-pemberdayaan-petani-dimulai",
  },
  {
    date: "8 Januari 2024",
    title: "Renovasi Jalan Desa Selesai",
    description: "Proyek renovasi jalan utama desa telah selesai dan dapat dilalui oleh berbagai jenis kendaraan.",
    fullDescription:
      "Proyek renovasi jalan utama desa telah selesai dan dapat dilalui oleh berbagai jenis kendaraan dengan aman.\n\nPembangunan infrastruktur jalan ini merupakan prioritas utama pemerintah desa untuk mendukung mobilitas masyarakat dan kelancaran arus barang dagangan. Jalan yang sebelumnya rusak dan berlobang kini telah diperbarui dengan perkerasan aspal berkualitas tinggi.\n\nDiharapkan dengan jalan yang baik ini, dapat meningkatkan konektivitas desa dengan wilayah sekitarnya.",
    image: "/rural-road-construction.png",
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
    slug: "renovasi-jalan-desa-selesai",
  },
  {
    date: "1 Januari 2024",
    title: "Perayaan Tahun Baru Bersama Masyarakat",
    description: "Kegiatan bersama masyarakat untuk merayakan tahun baru dengan penuh kebersamaan dan syukur.",
    fullDescription:
      "Kegiatan bersama masyarakat untuk merayakan tahun baru dengan penuh kebersamaan dan syukur kepada Tuhan Yang Maha Esa.\n\nAcara ini melibatkan seluruh lapisan masyarakat desa dari berbagai kalangan dan usia. Kegiatan mencakup doa bersama, hiburan tradisional, dan makan bersama yang meriah.\n\nMomen ini menjadi sarana untuk mempererat silaturahmi antar warga dan memulai tahun baru dengan semangat baru bersama-sama.",
    image: "/village-community-celebration.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=example3",
    slug: "perayaan-tahun-baru-bersama-masyarakat",
  },
  {
    date: "20 Desember 2023",
    title: "Pembangunan Fasilitas Kesehatan Desa Baru",
    description:
      "Pembukaan Pusat Kesehatan Masyarakat (Puskesmas) baru di desa dengan dilengkapi peralatan modern untuk melayani kesehatan warga.",
    fullDescription:
      "Pembukaan Pusat Kesehatan Masyarakat (Puskesmas) baru di desa dengan dilengkapi peralatan modern untuk melayani kesehatan warga.\n\nFasilitas kesehatan ini dibangun untuk memberikan akses layanan kesehatan yang lebih baik bagi masyarakat desa. Dengan peralatan medis modern dan tenaga kesehatan profesional, Puskesmas ini siap melayani berbagai pelayanan kesehatan mulai dari pemeriksaan rutin hingga penanganan kasus darurat.\n\nKehadiran Puskesmas modern ini diharapkan dapat mengurangi angka penyakit dan meningkatkan kualitas hidup masyarakat desa secara keseluruhan.",
    image: "/community-health-center.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=example4",
    slug: "pembangunan-fasilitas-kesehatan-desa-baru",
  },
]
