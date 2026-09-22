import { Alert, Stack } from '@mui/material'
import EntryForm from '../components/EntryForm'
import EntryList from '../components/EntryList'
import { useEntries } from '../useEntries'

const Home = () => {
  const { entries, addEntry, deleteEntry, saveFailed } = useEntries()

  return (
    <Stack spacing={5}>
      {saveFailed && (
        <Alert severity="warning">
          This browser isn't letting Earworm save (storage is full or blocked, which
          private browsing does). Your entries will disappear when you close the tab.
        </Alert>
      )}
      <EntryForm onAdd={addEntry} />
      <EntryList entries={entries} onDelete={deleteEntry} />
    </Stack>
  )
}

export default Home
