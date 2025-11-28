"use client"

import Navigation from "@/components/navigation"
import Complaints from "@/components/complaints"
import Footer from "@/components/footer"

export default function PengaduanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Complaints />
      <Footer />
    </div>
  )
}
