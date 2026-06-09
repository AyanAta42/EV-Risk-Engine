// Home page — full-screen split layout: hero + speed dial left, fleet feed right.
import { useState } from 'react'
import { CarHeroPanel } from '../components/CarHeroPanel'
import { FleetCarList } from '../components/FleetCarList'
import { SimulationControls } from '../components/SimulationControls'
import { SpeedDial } from '../components/SpeedDial'
import { useSimulation } from '../simulation/useSimulation'

export function FleetOverviewPage() {
  const { carList, isSimulating, carCount, setCarCount, toggleSimulation } = useSimulation()
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>()

  const atRisk = carList.filter((c) => c.safety_score < 50).length
  const selectedCar =
    (selectedCarId ? carList.find((c) => c.carId === selectedCarId) : undefined) ?? carList[0]

  const BORDER = 'rgba(99,102,241,0.15)'

  return (
    <div className="flex h-screen flex-col">

      {/* Header */}
      <header
        className="flex shrink-0 items-center justify-between px-6 py-3"
        style={{
          background: 'rgba(10,9,25,0.85)',
          borderBottom: `1px solid ${BORDER}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: isSimulating ? '#22c55e' : '#334155',
              boxShadow: isSimulating ? '0 0 8px #22c55e' : 'none',
              animation: isSimulating ? 'pulse 2s infinite' : 'none',
            }}
          />
          <h1
            className="text-lg font-bold tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #a5b4fc 0%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EV Risk Engine
          </h1>
        </div>

        <SimulationControls
          carCount={carCount}
          isSimulating={isSimulating}
          onCountChange={setCarCount}
          onToggle={toggleSimulation}
        />
      </header>

      {/* Main */}
      <div className="flex min-h-0 flex-1">

        {/* ── Left 60% ─────────────────────────────────────── */}
        <div
          className="flex w-[60%] flex-col"
          style={{ borderRight: `1px solid ${BORDER}` }}
        >

          {/* Top 70%: hero + speed dial */}
          <div
            className="flex min-h-0 flex-[7]"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          >
            {/* Car hero */}
            <div
              className="w-1/2"
              style={{ borderRight: `1px solid ${BORDER}` }}
            >
              <CarHeroPanel car={selectedCar} />
            </div>

            {/* Speed dial */}
            <div className="w-1/2">
              <SpeedDial speed={selectedCar?.speed ?? 0} />
            </div>
          </div>

          {/* Bottom 30%: fleet summary strip */}
          <div className="flex min-h-0 flex-[3] items-center gap-8 px-8">

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-widest text-slate-600">Status</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: isSimulating ? '#22c55e' : '#475569',
                    boxShadow: isSimulating ? '0 0 6px #22c55e' : 'none',
                  }}
                />
                <span className="text-base font-semibold text-white">
                  {isSimulating ? 'Live' : 'Idle'}
                </span>
              </div>
            </div>

            <div
              className="h-8 w-px"
              style={{ background: BORDER }}
            />

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-widest text-slate-600">Fleet</span>
              <span className="text-2xl font-bold tabular-nums text-white">
                {carList.length}
              </span>
            </div>

            <div
              className="h-8 w-px"
              style={{ background: BORDER }}
            />

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-widest text-slate-600">At Risk</span>
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ color: atRisk > 0 ? '#ef4444' : '#22c55e' }}
              >
                {atRisk}
              </span>
            </div>

            <div
              className="h-8 w-px"
              style={{ background: BORDER }}
            />

            {selectedCar && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-600">Selected</span>
                <span className="font-mono text-sm text-indigo-400">{selectedCar.carId}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Right 40%: fleet feed ──────────────────────── */}
        <div className="flex w-[40%] flex-col p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Fleet Feed
              </p>
              <p className="text-[10px] text-slate-700 mt-0.5">
                Click a vehicle to inspect
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: isSimulating ? '#22c55e' : '#334155',
                  boxShadow: isSimulating ? '0 0 5px #22c55e' : 'none',
                }}
              />
              <span className="text-xs text-slate-600">{carList.length} vehicles</span>
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-hidden rounded-xl p-1"
            style={{
              background: 'rgba(10,9,30,0.6)',
              border: `1px solid ${BORDER}`,
            }}
          >
            <FleetCarList
              cars={carList}
              selectedCarId={selectedCar?.carId}
              onSelect={setSelectedCarId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
