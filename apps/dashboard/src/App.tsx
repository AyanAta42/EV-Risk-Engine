import { Route, Routes } from 'react-router-dom'
import { FleetMonitorProvider } from './context/FleetMonitorContext'
import { CarPage } from './pages/CarPage'
import { FleetPage } from './pages/FleetPage'

function App() {
  return (
    <FleetMonitorProvider>
      <Routes>
        <Route path="/" element={<FleetPage />} />
        <Route path="/:id" element={<CarPage />} />
      </Routes>
    </FleetMonitorProvider>
  )
}

export default App
