import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const nama = formData.get("nama") as string
    const nomorWA = formData.get("nomorWA") as string
    const deskripsi = formData.get("deskripsi") as string
    const image = formData.get("image") as File | null

    if (!nama || !nomorWA || !deskripsi) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
    }

    const googleSheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!googleSheetsWebhook) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL tidak diatur. Data tidak akan disimpan ke Google Sheets.")
      return NextResponse.json({ message: "Pengaduan berhasil dikirim (tanpa Google Sheets)" }, { status: 200 })
    }

    let imageUrl: string | null = null
    if (image) {
      try {
        const blob = await put(`complaints/${Date.now()}-${image.name}`, image, {
          access: "public",
        })
        imageUrl = blob.url
      } catch (blobError) {
        console.error("Error uploading to Vercel Blob:", blobError)
        // Jika upload gagal, tetap lanjut tanpa gambar
        imageUrl = null
      }
    }

    const dataToSubmit = {
      timestamp: new Date()
        .toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"),
      nama,
      nomorWA,
      deskripsi,
      imageUrl,
    }

    try {
      await fetch(googleSheetsWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })
    } catch (webhookError) {
      console.error("Error mengirim ke Google Sheets:", webhookError)
    }

    return NextResponse.json({ message: "Pengaduan berhasil dikirim" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting complaint:", error)
    return NextResponse.json({ error: "Gagal memproses pengaduan" }, { status: 500 })
  }
}
