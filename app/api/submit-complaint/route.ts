import { type NextRequest, NextResponse } from "next/server"

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

    // This example uses a webhook to Google Forms or Apps Script
    // You'll need to set up Google Sheets integration separately

    const dataToSubmit = {
      timestamp: new Date().toISOString(),
      nama,
      nomorWA,
      deskripsi,
      imageUrl: null as string | null,
    }

    if (image) {
      const buffer = await image.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      dataToSubmit.imageUrl = `data:${image.type};base64,${base64}`
    }

    // Replace GOOGLE_FORMS_WEBHOOK_URL with your actual webhook URL
    const googleFormsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (googleFormsWebhook) {
      await fetch(googleFormsWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })
    }

    return NextResponse.json({ message: "Pengaduan berhasil dikirim" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting complaint:", error)
    return NextResponse.json({ error: "Gagal memproses pengaduan" }, { status: 500 })
  }
}
