import { Stack } from '@mui/material'
import EntryForm from '../components/EntryForm'
import EntryList from '../components/EntryList'
import { useEntries } from '../useEntries'

const Home = () => {
  const { entries, addEntry, deleteEntry } = useEntries()

  return (
    <Stack spacing={5}>
      <EntryForm onAdd={addEntry} />
      <EntryList entries={entries} onDelete={deleteEntry} />
    </Stack>
  )
}

export default Home
