"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    alert("Terima kasih telah menghubungi kami!")
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Hubungi Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami siap membantu Anda. Hubungi kami melalui formulir atau informasi kontak di bawah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white rounded-xl p-8 border border-border">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Alamat</h3>
            <p className="text-muted-foreground">Desa Bendung, Kecamatan Semin, Gunung Kidul</p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-border">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Telepon</h3>
            <p className="text-muted-foreground">
              (022) 1234-5678
              <br />
              0812-3456-7890
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-border">
            <div className="text-3xl mb-4">✉️</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground">
              info@desasukamaju.id
              <br />
              admin@desasukamaju.id
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-8">Kirim Pesan Kami</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                Subjek
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Subjek pesan"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
