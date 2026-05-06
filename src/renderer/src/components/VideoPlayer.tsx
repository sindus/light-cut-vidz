import React, { useEffect, useRef, useMemo } from 'react'
import { getFilterById } from '../utils/filters'
import './VideoPlayer.css'

interface Props {
  videoRef: React.RefObject<HTMLVideoElement | null>
  src: string
  speed: number
  muted: boolean
  filterId: string
  onTimeUpdate: (time: number) => void
  onDurationLoaded: (duration: number) => void
  onPlayPause: (playing: boolean) => void
}

export default function VideoPlayer({ videoRef, src, speed, muted, filterId, onTimeUpdate, onDurationLoaded, onPlayPause }: Props) {
  const prevSrc = useRef<string | null>(null)

  const filter = useMemo(() => getFilterById(filterId), [filterId])

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed
  }, [speed, videoRef])

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted, videoRef])

  useEffect(() => {
    if (src !== prevSrc.current && videoRef.current) {
      prevSrc.current = src
      videoRef.current.load()
    }
  }, [src, videoRef])

  const videoStyle: React.CSSProperties = {
    filter: filter.id !== 'mirror' && filter.id !== 'upside_down' ? filter.css : 'none',
    transform: filter.id === 'mirror' ? 'scaleX(-1)' : filter.id === 'upside_down' ? 'scaleY(-1)' : 'none',
  }

  return (
    <video
      ref={videoRef}
      className="video-element"
      src={src}
      style={videoStyle}
      onTimeUpdate={(e) => onTimeUpdate(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => onDurationLoaded(e.currentTarget.duration)}
      onPlay={() => onPlayPause(true)}
      onPause={() => onPlayPause(false)}
      onEnded={() => onPlayPause(false)}
      onClick={(e) => {
        const v = e.currentTarget
        if (v.paused || v.ended) { void v.play() } else { v.pause() }
      }}
    />
  )
}
