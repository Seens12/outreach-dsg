import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { audio } = await req.json()

    if (!audio || typeof audio !== 'string') {
      return NextResponse.json(
        { error: 'No audio data provided' },
        { status: 400 }
      )
    }

    // Dynamic import of z-ai-web-dev-sdk (backend only)
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create()

    const response = await zai.audio.asr.create({
      file_base64: audio,
    })

    const text = response.text?.trim() || ''

    if (!text) {
      return NextResponse.json(
        { error: 'Could not transcribe audio' },
        { status: 422 }
      )
    }

    return NextResponse.json({ text })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Transcription failed'
    console.error('ASR error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
