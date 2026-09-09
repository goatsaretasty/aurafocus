import { useState } from 'react'
import { loadEntries, saveEntries } from './storage'
import type { Entry } from './types'

export type NewEntry = Pick<Entry, 'song' | 'artist' | 'musing'>

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>(loadEntries)

  function commit(next: Entry[]) {
    setEntries(next)
    saveEntries(next)
  }

  function addEntry(input: NewEntry) {
    commit([
      {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      ...entries,
    ])
  }

  function deleteEntry(id: string) {
    commit(entries.filter((entry) => entry.id !== id))
  }

  return { entries, addEntry, deleteEntry }
}
