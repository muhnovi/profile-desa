"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Facilities from "@/components/facilities"
import News from "@/components/news"
import Map from "@/components/map"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`min-h-screen bg-background transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <Navigation />
      <Hero />
      <About />
      <Facilities />
      <News />
      <Map />
      <Contact />
      <Footer />
    </div>
  )
}
