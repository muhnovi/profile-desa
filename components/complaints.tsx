"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"

export default function Complaints() {
  const [formData, setFormData] = useState({
    nama: "",
    nomorWA: "",
    deskripsi: "",
    image: null as File | null,
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("nama", formData.nama)
      formDataToSend.append("nomorWA", formData.nomorWA)
      formDataToSend.append("deskripsi", formData.deskripsi)
      if (formData.image) {
        formDataToSend.append("image", formData.image)
      }

      const response = await fetch("/api/submit-complaint", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setMessage("✅ Pengaduan Anda berhasil dikirim. Terima kasih telah melaporkan.")
        setFormData({ nama: "", nomorWA: "", deskripsi: "", image: null })
        setImagePreview(null)
      } else {
        setMessage("❌ Gagal mengirim pengaduan. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error submitting complaint:", error)
      setMessage("❌ Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="complaints" className="py-20 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Pengaduan dan Saran</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami membuka kanal untuk menerima pengaduan, saran, dan masukan dari masyarakat. Silakan isi formulir di
            bawah.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-border max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Pengadu */}
            <div>
              <label htmlFor="nama" className="block text-sm font-semibold text-foreground mb-2">
                Nama Lengkap <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* Nomor WA */}
            <div>
              <label htmlFor="nomorWA" className="block text-sm font-semibold text-foreground mb-2">
                Nomor WhatsApp <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                id="nomorWA"
                name="nomorWA"
                value={formData.nomorWA}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                placeholder="08xx-xxxx-xxxx"
              />
            </div>

            {/* Deskripsi Aduan */}
            <div>
              <label htmlFor="deskripsi" className="block text-sm font-semibold text-foreground mb-2">
                Deskripsi Aduan <span className="text-destructive">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder-muted-foreground"
                placeholder="Jelaskan pengaduan, masalah, atau saran Anda secara detail..."
              />
            </div>

            {/* Upload Gambar */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-foreground mb-2">
                Unggah Gambar (Opsional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center w-full px-4 py-6 rounded-lg border-2 border-dashed border-border bg-background cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Klik untuk mengunggah gambar atau seret gambar ke sini
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF hingga 5MB</p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-48 rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData((prev) => ({ ...prev, image: null }))
                    }}
                    className="mt-2 text-sm text-destructive hover:underline"
                  >
                    Hapus gambar
                  </button>
                </div>
              )}
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  message.includes("✅")
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:bg-primary/50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Pengaduan"
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Data pengaduan Anda akan kami proses secara profesional dan rahasia.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
