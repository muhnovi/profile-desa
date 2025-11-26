"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface TourismSpot {
  id: number
  name: string
  description: string
  lat: number
  lng: number
  category: string
  image?: string
}

const tourismSpots: TourismSpot[] = [
  {
    id: 1,
    name: "Lembung Mataraman Bendung",
    description: "Bendung air bersejarah yang menjadi simbol Desa Bendung Semin",
    lat: -7.858661511592048,
    lng: 110.72306997857926,
    category: "Monumen Bersejarah",
    image: "/rural-road-construction.png",
  },
  {
    id: 2,
    name: "Desa Wisata Bendung",
    description: "Embung yang indah dengan pemandangan alam yang menakjubkan",
    lat: -7.85851874586773,
    lng: 110.72301134603538,
    category: "Wisata Alam",
    image: "/beautiful-village-landscape-with-traditional-house.jpg",
  },
  {
    id: 3,
    name: "Desa Wisata Bendung",
    description: "Embung yang indah dengan pemandangan alam yang menakjubkan",
    lat: -7.85851874586773,
    lng: 110.72301134603538,
    category: "Wisata Alam",
    image: "/beautiful-village-landscape-with-traditional-house.jpg",
  },
  {
    id: 4,
    name: "Desa Wisata Bendung",
    description: "Embung yang indah dengan pemandangan alam yang menakjubkan",
    lat: -7.85851874586773,
    lng: 110.72301134603538,
    category: "Wisata Alam",
    image: "/beautiful-village-landscape-with-traditional-house.jpg",
  },
  {
    id: 5,
    name: "Desa Wisata Bendung",
    description: "Embung yang indah dengan pemandangan alam yang menakjubkan",
    lat: -7.85851874586773,
    lng: 110.72301134603538,
    category: "Wisata Alam",
    image: "/beautiful-village-landscape-with-traditional-house.jpg",
  },
  
]

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markers = useRef<any[]>([])
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)
  const listContainer = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)

    const checkScroll = () => {
      if (listContainer.current) {
        const { scrollTop, scrollHeight, clientHeight } = listContainer.current
        setCanScrollUp(scrollTop > 0)
        setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10)
      }
    }

    checkScroll()
    const timer = setTimeout(checkScroll, 100)

    return () => {
      if (map.current) {
        map.current.remove()
      }
      clearTimeout(timer)
    }
  }, [])

  const initMap = () => {
    const L = (window as any).L
    if (!L || !mapContainer.current) return

    const centerLat = -7.858661511592048
    const centerLng = 110.72306997857926

    map.current = L.map(mapContainer.current).setView([centerLat, centerLng], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map.current)

    tourismSpots.forEach((spot) => {
      const popupContent = `
        <div style="width: 300px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 16px; color: #1a1a1a;">${spot.name}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">${spot.category}</p>
          </div>
          <img src="${spot.image}" alt="${spot.name}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; margin-bottom: 12px;">
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #444; line-height: 1.5;">${spot.description}</p>
          <a href="https://www.google.com/maps?q=${spot.lat},${spot.lng}&z=15" target="_blank" style="display: inline-block; background-color: #0066cc; color: white; padding: 8px 12px; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: 600;">
            📍 Buka di Google Maps
          </a>
        </div>
      `

      const marker = L.marker([spot.lat, spot.lng], {
        icon: L.icon({
          iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      })
        .addTo(map.current)
        .bindPopup(popupContent, { maxWidth: 320, className: "leaflet-popup-custom" })

      marker.on("click", () => {
        setSelectedSpot(spot.id)
      })

      marker.spotId = spot.id
      markers.current.push(marker)
    })
  }

  const handleSpotClick = (spot: TourismSpot) => {
    setSelectedSpot(spot.id)
    if (map.current) {
      const marker = markers.current.find((m) => m.spotId === spot.id)
      if (marker) {
        map.current.setView([spot.lat, spot.lng], 15)
        marker.openPopup()
      }
    }
  }

  const scroll = (direction: "up" | "down") => {
    if (listContainer.current) {
      const scrollAmount = 100
      if (direction === "up") {
        listContainer.current.scrollBy({ top: -scrollAmount, behavior: "smooth" })
      } else {
        listContainer.current.scrollBy({ top: scrollAmount, behavior: "smooth" })
      }
      setTimeout(() => {
        if (listContainer.current) {
          const { scrollTop, scrollHeight, clientHeight } = listContainer.current
          setCanScrollUp(scrollTop > 0)
          setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10)
        }
      }, 300)
    }
  }

  return (
    <section id="wisata" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Wisata Desa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Klik marker atau pilih dari daftar untuk melihat detail wisata
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with Tourism List */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl shadow-md overflow-hidden h-fit sticky top-4">
              <div className="bg-primary text-primary-foreground p-4">
                <h3 className="font-bold text-lg">Daftar Wisata</h3>
              </div>
              {tourismSpots.length >= 3 && (
                <div className="flex items-center justify-between px-2 py-1 bg-muted border-b border-border">
                  <button
                    onClick={() => scroll("up")}
                    disabled={!canScrollUp}
                    className="p-1 rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Scroll up"
                  >
                    <ChevronUp className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="text-xs text-muted-foreground">{tourismSpots.length} wisata</span>
                  <button
                    onClick={() => scroll("down")}
                    disabled={!canScrollDown}
                    className="p-1 rounded hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Scroll down"
                  >
                    <ChevronDown className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              )}
              <div ref={listContainer} className="divide-y divide-border max-h-96 overflow-y-auto">
                {tourismSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => handleSpotClick(spot)}
                    className={`w-full text-left p-4 transition-all duration-300 ease-in-out hover:bg-green-100 ${
                      selectedSpot === spot.id ? "bg-green-200" : "bg-card"
                    }`}
                  >
                    <h4 className="font-semibold text-foreground text-sm line-clamp-1">{spot.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{spot.category}</p>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{spot.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="w-full flex-1 min-h-96 sm:min-h-[500px] lg:min-h-[600px]">
            <div
              ref={mapContainer}
              className="w-full h-full rounded-xl shadow-lg border border-border"
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
