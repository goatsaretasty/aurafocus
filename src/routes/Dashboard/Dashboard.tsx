import { Link } from 'react-router-dom'
import PomodoroTimer from '../../components/PomodoroTimer'

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>

      <ul>
        <li>
          <Link to="/">Return to index</Link>
        </li>
        <li>
          <Link to="/log">Log a song</Link>
        </li>
        <li>
          <Link to="/entries">Past entries</Link>
        </li>
      </ul>
      <PomodoroTimer />
    </>
  )
}