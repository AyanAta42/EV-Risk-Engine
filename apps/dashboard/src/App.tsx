import { Controls } from './components/Controls'
import { FleetList } from './components/FleetList'
import { useFleetMonitor } from './hooks/useFleetMonitor'

function App() {
  const { carList, isSimulating, carCount, setCarCount, toggleSimulation } = useFleetMonitor()
  const atRisk = carList.filter((c) => c.safety_score < 50).length

  return (
    <div>
      <h1>Fleet Monitor</h1>
      <p>{isSimulating ? 'Live' : 'Idle'} | {carList.length} cars | {atRisk} at risk</p>
      <Controls
        carCount={carCount}
        isSimulating={isSimulating}
        onCountChange={setCarCount}
        onToggle={toggleSimulation}
      />
      <FleetList cars={carList} />
    </div>
  )
}

export default App
