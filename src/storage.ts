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

export function saveEntries(entries: Entry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
  } catch {
    // Private browsing and full quotas both throw here. Entries stay in memory
    // for the session rather than taking the page down.
  }
}
