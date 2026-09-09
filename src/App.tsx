import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
