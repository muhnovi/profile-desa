"use client";

import {
  X,
  Youtube,
  ChevronUp,
  ChevronDown,
  Share2,
  Check,
} from "lucide-react";
import { useRef, useState } from "react";

interface NewsItem {
  date: string;
  title: string;
  description: string;
  image: string;
  youtubeUrl?: string;
  fullDescription?: string;
}

interface NewsDetailModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsDetailModal({
  news,
  isOpen,
  onClose,
}: NewsDetailModalProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const checkScroll = () => {
    if (descriptionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = descriptionRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10);
    }
  };

  const scrollUp = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    console.log("[v0] Share button clicked");

    if (!news) return;

    try {
      // Option 1: Use Web Share API jika tersedia (mobile)
      if (navigator.share) {
        console.log("[v0] Using Web Share API");
        await navigator.share({
          title: news.title,
          text: news.description,
          url: window.location.href,
        });
        setIsShared(true);
        setShareMessage("Berhasil dibagikan!");
        setTimeout(() => setIsShared(false), 2000);
        return;
      }
    } catch (err) {
      console.log("[v0] Share dibatalkan atau error:", err);
    }

    // Option 2: Fallback ke copy ke clipboard
    try {
      console.log("[v0] Using Clipboard API");
      const shareText = `${news.title}\n\n${news.description}\n\nVideo: ${
        news.youtubeUrl || "Tidak ada"
      }\n\nBaca selengkapnya di: ${window.location.href}`;

      await navigator.clipboard.writeText(shareText);
      setIsShared(true);
      setShareMessage("Disalin ke clipboard!");
      setTimeout(() => setIsShared(false), 2000);
      console.log("[v0] Berhasil disalin ke clipboard");
    } catch (err) {
      console.log("[v0] Gagal copy clipboard:", err);
      setShareMessage("Gagal menyalin");
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  if (!isOpen || !news) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        {shareMessage && (
          <div className="bg-green-50 border-b border-green-200 p-3 text-center text-green-700 text-sm">
            {shareMessage}
          </div>
        )}

        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{news.title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className={`p-2 rounded-lg transition-colors ${
                isShared ? "bg-green-100" : "hover:bg-muted"
              }`}
              aria-label="Bagikan berita"
              title="Bagikan berita"
            >
              {isShared ? (
                <Check size={20} className="text-green-600" />
              ) : (
                <Share2 size={20} className="text-foreground" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Tutup"
            >
              <X size={24} className="text-foreground" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 overflow-hidden rounded-lg bg-muted">
            <img
              src={
                news.image ||
                "/placeholder.svg?height=400&width=600&query=berita desa detail"
              }
              alt={news.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-sm text-primary font-semibold mb-4">{news.date}</p>

          <div className="mb-6 relative">
            <div
              ref={descriptionRef}
              onScroll={checkScroll}
              onLoad={checkScroll}
              className="max-h-64 overflow-y-auto pr-10"
            >
              <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
                {news.fullDescription || news.description}
              </p>
            </div>

            {(canScrollUp || canScrollDown) && (
              <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center gap-2">
                <button
                  onClick={scrollUp}
                  disabled={!canScrollUp}
                  className={`p-2 rounded-lg transition-colors ${
                    canScrollUp
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                  }`}
                  aria-label="Scroll ke atas"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={scrollDown}
                  disabled={!canScrollDown}
                  className={`p-2 rounded-lg transition-colors ${
                    canScrollDown
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                  }`}
                  aria-label="Scroll ke bawah"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </div>

          {news.youtubeUrl && (
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Youtube size={20} className="text-red-500" />
                <span className="font-semibold text-foreground">
                  Video Terkait
                </span>
              </div>
              <a
                href={news.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {news.youtubeUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
