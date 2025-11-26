"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Share2, Check } from "lucide-react"
import { newsData, type NewsItem } from "./newsData"

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isShared, setIsShared] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  useEffect(() => {
    setIsLoading(true)
    const newsItem = newsData.find((item) => item.slug === slug)
    setSelectedNews(newsItem || null)
    setIsLoading(false)
  }, [slug])

  const handleShare = async () => {
    if (!selectedNews) return

    try {
      const shareUrl = `${window.location.origin}/news/${selectedNews.slug}`

      if (navigator.share) {
        await navigator.share({
          title: selectedNews.title,
          text: selectedNews.description,
          url: shareUrl,
        })
        setIsShared(true)
        setShareMessage("Berhasil dibagikan!")
        setTimeout(() => setIsShared(false), 2000)
        return
      }
    } catch (err) {
      console.log("[v0] Share dibatalkan atau error")
    }

    try {
      const shareUrl = `${window.location.origin}/news/${selectedNews.slug}`
      const shareText = `${selectedNews.title}\n\n${selectedNews.description}\n\nBaca selengkapnya di: ${shareUrl}`

      await navigator.clipboard.writeText(shareText)
      setIsShared(true)
      setShareMessage("Disalin ke clipboard!")
      setTimeout(() => setIsShared(false), 2000)
    } catch (err) {
      console.log("[v0] Gagal copy clipboard")
      setShareMessage("Gagal menyalin")
      setTimeout(() => setShareMessage(""), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 transition-colors"
          aria-label="Kembali ke halaman beranda"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </button>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : selectedNews ? (
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {shareMessage && (
              <div className="bg-green-50 border-b border-green-200 p-3 text-center text-green-700 text-sm">
                {shareMessage}
              </div>
            )}

            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={selectedNews.image || "/placeholder.svg?height=400&width=800&query=berita desa"}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <p className="text-sm text-primary font-semibold mb-2">{selectedNews.date}</p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{selectedNews.title}</h1>
                </div>
                <button
                  onClick={handleShare}
                  className={`p-2 rounded-lg transition-colors ml-4 flex-shrink-0 ${
                    isShared ? "bg-green-100" : "hover:bg-muted"
                  }`}
                  aria-label="Bagikan berita"
                  title="Bagikan berita"
                >
                  {isShared ? (
                    <Check size={24} className="text-green-600" />
                  ) : (
                    <Share2 size={24} className="text-foreground" />
                  )}
                </button>
              </div>

              <div className="prose prose-sm max-w-none mb-8">
                <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
                  {selectedNews.fullDescription || selectedNews.description}
                </p>
              </div>

              {selectedNews.youtubeUrl && (
                <div className="bg-muted rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-3">Video Terkait</h3>
                  <a
                    href={selectedNews.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {selectedNews.youtubeUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">Berita tidak ditemukan</p>
            <button
              onClick={() => router.push("/")}
              className="inline-block text-primary hover:underline font-semibold"
            >
              Kembali ke halaman utama
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
