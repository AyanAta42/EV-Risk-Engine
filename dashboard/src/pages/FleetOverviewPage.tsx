// Home page — fleet stats, simulation controls, and live car list.
import { SimulationControls } from '../components/SimulationControls'
import { FleetCarList } from '../components/FleetCarList'
import { StatCard } from '../components/StatCard'
import { useSimulation } from '../simulation/useSimulation'

export function FleetOverviewPage() {
  const { carList, isSimulating, carCount, setCarCount, toggleSimulation } = useSimulation()
  const atRisk = carList.filter((c) => c.safety_score < 50).length

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <h1 className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        EV Risk Engine
      </h1>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Status" value={isSimulating ? 'Live' : 'Idle'} />
        <StatCard label="Fleet size" value={String(carList.length)} />
        <StatCard label="At risk" value={String(atRisk)} />
      </div>

      <StatCard label="Simulation">
        <SimulationControls
          carCount={carCount}
          isSimulating={isSimulating}
          onCountChange={setCarCount}
          onToggle={toggleSimulation}
        />
      </StatCard>

      <StatCard label="Fleet feed">
        <FleetCarList cars={carList} />
      </StatCard>
    </div>
  )
}
