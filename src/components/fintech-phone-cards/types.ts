export type HeroCard = {
  id: string
  label: string
  gradient: string
  glowColor: string
  shadowColor: string
  textColor?: string
  startX: number; startY: number
  midX: number; midY: number
  endX: number; endY: number
  startScale?: number; midScale?: number; endScale?: number
  startOpacity?: number; midOpacity?: number; endOpacity?: number
  zIndex: number
}
