// App shell — wraps pages in SimulationProvider and defines routes (/ and /:id).
import { Route, Routes } from 'react-router-dom'
import { SimulationProvider } from './simulation/SimulationProvider'
import { FleetOverviewPage } from './pages/FleetOverviewPage'
import { SingleCarPage } from './pages/SingleCarPage'

function App() {
  return (
    <SimulationProvider>
      <Routes>
        <Route path="/" element={<FleetOverviewPage />} />
        <Route path="/:id" element={<SingleCarPage />} />
      </Routes>
    </SimulationProvider>
  )
}

export default App
