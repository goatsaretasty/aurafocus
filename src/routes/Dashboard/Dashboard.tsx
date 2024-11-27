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
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/PastAurasPage">Past Auras</Link>
        </li>
        <li>
          <Link to="/PastFocusScapePage">Past Focus Scape</Link>
        </li>
      </ul>
      <PomodoroTimer />
    </>
  )
}