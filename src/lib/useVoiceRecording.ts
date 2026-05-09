'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { toast } from 'sonner'

type VoicePhase = 'idle' | 'recording' | 'transcribing' | 'done'

interface UseVoiceRecordingOptions {
  /** Called with the transcribed text when transcription succeeds */
  onTranscribed: (text: string) => void
}

interface UseVoiceRecordingReturn {
  isRecording: boolean
  isTranscribing: boolean
  voicePhase: VoicePhase
  transcribedText: string
  analyserNode: AnalyserNode | null
  handleMicClick: () => void
  cancelRecording: () => void
}

export function useVoiceRecording({ onTranscribed }: UseVoiceRecordingOptions): UseVoiceRecordingReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [voicePhase, setVoicePhase] = useState<VoicePhase>('idle')
  const [transcribedText, setTranscribedText] = useState('')
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  // Keep onTranscribed ref stable
  const onTranscribedRef = useRef(onTranscribed)
  useEffect(() => {
    onTranscribedRef.current = onTranscribed
  }, [onTranscribed])

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setAnalyserNode(null)
    mediaRecorderRef.current = null
    audioChunksRef.current = []
  }, [])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Create analyser for real-time frequency data
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      setAnalyserNode(analyser)

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        // Stop all tracks
        stream.getTracks().forEach(t => t.stop())
        streamRef.current = null

        // Close audio context
        try { audioCtx.close() } catch { /* ignore */ }

        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        if (blob.size < 100) {
          setIsRecording(false)
          setVoicePhase('idle')
          return
        }

        // Start transcription
        setVoicePhase('transcribing')
        setIsTranscribing(true)

        try {
          const reader = new FileReader()
          reader.onloadend = async () => {
            const base64 = (reader.result as string).split(',')[1]
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audio: base64 }),
            })
            const data = await res.json()

            if (data.text) {
              setTranscribedText(data.text)
              onTranscribedRef.current(data.text)
              setVoicePhase('done')

              // Return to idle after showing "done" briefly
              setTimeout(() => {
                setVoicePhase('idle')
                setIsTranscribing(false)
              }, 800)
            } else {
              toast.error('Не удалось распознать речь')
              setVoicePhase('idle')
              setIsTranscribing(false)
            }
          }
          reader.readAsDataURL(blob)
        } catch {
          toast.error('Ошибка транскрипции')
          setVoicePhase('idle')
          setIsTranscribing(false)
        }
      }

      mediaRecorder.start(100)
      setIsRecording(true)
      setVoicePhase('recording')
    } catch {
      toast.error('Нет доступа к микрофону')
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    // Keep voicePhase as 'recording' until onstop fires
  }, [])

  const cancelRecording = useCallback(() => {
    cleanupStream()
    setIsRecording(false)
    setVoicePhase('idle')
    setIsTranscribing(false)
  }, [cleanupStream])

  const handleMicClick = useCallback(() => {
    if (isTranscribing) return
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }, [isRecording, isTranscribing, stopRecording, startRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanupStream()
  }, [cleanupStream])

  return {
    isRecording,
    isTranscribing,
    voicePhase,
    transcribedText,
    analyserNode,
    handleMicClick,
    cancelRecording,
  }
}
