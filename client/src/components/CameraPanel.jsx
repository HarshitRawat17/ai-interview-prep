import React, { useEffect, useRef, useState } from 'react'

export default function CameraPanel() {
  const videoRef = useRef(null)

  const [stream, setStream] = useState(null)
  const [isOn, setIsOn] = useState(false)
  const [error, setError] = useState('')

  // ▶ START CAMERA
  const startCamera = async () => {
    try {
      // stop previous stream if exists
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }

      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })

      setStream(media)
      setIsOn(true)
      setError('')
    } catch (err) {
      console.log("Camera error:", err)
      setError(`${err.name} - ${err.message}`)
      setIsOn(false)
    }
  }

  // ⏹ STOP CAMERA
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsOn(false)
  }

  // 🔥 ATTACH STREAM TO VIDEO (FIXES BLACK SCREEN)
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  // CLEANUP
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-white/5 backdrop-blur shadow-lg space-y-3">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm text-gray-400">Camera</h4>

        <div className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <span className={isOn ? 'text-green-400' : 'text-gray-400'}>
            {isOn ? 'LIVE' : 'OFF'}
          </span>
        </div>
      </div>

      {/* VIDEO */}
      <div className="w-full h-[180px] bg-black rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center">
        {isOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
            onLoadedMetadata={() => {
              videoRef.current.play().catch(() => {})
            }}
          />
        ) : (
          <span className="text-gray-500 text-sm">
            Camera is off
          </span>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-xs text-center">
          {error}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={isOn ? stopCamera : startCamera}
        className={`w-full py-2 rounded-lg text-sm font-medium transition
          ${
            isOn
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
      >
        {isOn ? 'Stop Camera' : 'Start Camera'}
      </button>

    </div>
  )
}