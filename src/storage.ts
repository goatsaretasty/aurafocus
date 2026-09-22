import type { Entry } from './types'

const KEY = 'earworm.entries'

export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Private browsing and full quotas both throw on write. Returns false so the
// UI can warn that entries won't survive a reload.
export function saveEntries(entries: Entry[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
    return true
  } catch {
    return false
  }
}
