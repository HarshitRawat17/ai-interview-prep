import React, { useEffect, useRef, useState } from 'react'

export default function CameraPanel({ theme = 'dark' }) {
  const videoRef = useRef(null)

  const [stream, setStream] = useState(null)
  const [isOn, setIsOn] = useState(false)
  const [error, setError] = useState('')

  const isDark = theme === 'dark'

  const startCamera = async () => {
    try {
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
      console.log(err)

      // ❌ REMOVE TECH ERROR — SHOW CLEAN MESSAGE
      setError('Camera unavailable. Close other apps or check permissions.')
      setIsOn(false)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setStream(null)
    setIsOn(false)
  }

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className={`p-4 rounded-xl border backdrop-blur shadow-sm ${
      isDark ? 'border-slate-800 bg-white/5' : 'border-slate-200 bg-white'
    }`}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h4 className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          Camera
        </h4>

        <div className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${
            isOn ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
          }`} />
          <span className={isOn ? 'text-green-400' : 'text-gray-400'}>
            {isOn ? 'LIVE' : 'OFF'}
          </span>
        </div>
      </div>

      {/* VIDEO / PLACEHOLDER */}
      <div className={`w-full h-[180px] rounded-lg overflow-hidden border flex items-center justify-center ${
        isDark ? 'bg-black border-slate-700' : 'bg-slate-100 border-slate-200'
      }`}>

        {isOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        ) : (
          <div className="text-center px-3">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Camera is off
            </p>

            {error && (
              <p className="text-xs text-red-400 mt-2">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={isOn ? stopCamera : startCamera}
        className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition ${
          isOn
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
        }`}
      >
        {isOn ? 'Stop Camera' : 'Start Camera'}
      </button>
    </div>
  )
}