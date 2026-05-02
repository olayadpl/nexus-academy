export interface PreferenceEntity {
  id: string
  userId: string
  language: "es" | "en"
  theme: "light" | "dark" | "system"
  autoplay: boolean
  subtitlesEnabled: boolean
  playbackRate: 0.75 | 1 | 1.25 | 1.5 | 2
  reduceMotion: boolean
  updatedAt: string
}
