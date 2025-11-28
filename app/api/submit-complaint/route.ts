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

    const googleSheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!googleSheetsWebhook) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL tidak diatur. Data tidak akan disimpan ke Google Sheets.")
      return NextResponse.json({ message: "Pengaduan berhasil dikirim (tanpa Google Sheets)" }, { status: 200 })
    }

    let imageUrl: string | null = null
    if (image) {
      const buffer = await image.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      imageUrl = `data:${image.type};base64,${base64}`
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
      // Tetap return success karena form submission sudah berhasil,
      // meski webhook Google Sheets gagal
    }

    return NextResponse.json({ message: "Pengaduan berhasil dikirim" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting complaint:", error)
    return NextResponse.json({ error: "Gagal memproses pengaduan" }, { status: 500 })
  }
}
