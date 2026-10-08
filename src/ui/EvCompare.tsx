import { useState } from 'react'
import { sound } from '../audio/bus'
import { EV_EXAMPLE, EV_TRIPS, tripCost } from '../data/ev'
import { useStore } from '../store/useStore'

const rupees = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

/**
 * Scene 4: Ali's first project, Veherex, as a little demo. Pick a distance and see
 * what the trip costs in an EV next to a petrol car. Example numbers, labelled.
 */
export function EvCompare() {
  const open = useStore((s) => s.showing === 'ev')
  const [km, setKm] = useState(30)
  if (!open) return null
  const { petrol, ev, saved } = tripCost(km)
  const most = Math.max(petrol, ev, 1)
  const e = EV_EXAMPLE

  return (
    <aside
      aria-label="Veherex demo"
      className="fixed inset-x-0 z-20 mx-auto flex top-[var(--hud-h)] max-h-[calc(100dvh-var(--hud-h)-var(--dialogue-h))] overflow-y-auto overscroll-contain w-[min(640px,calc(100vw-32px))] flex-col gap-4 border-2 border-cream/40 bg-shadow/90 p-5 text-cream shadow-[8px_8px_0_rgba(4,3,12,.85)] motion-safe:animate-[drop_.45s_both]"
    >
      <span className="font-ui text-[11px] text-teal">Veherex · a simple demo with example numbers</span>
      <h2 className="m-0 font-display text-[26px] font-bold leading-tight">EV or petrol: what does the trip cost?</h2>

      <div className="flex flex-wrap gap-2">
        {EV_TRIPS.map((t) => (
          <button
            key={t.km}
            type="button"
            onClick={() => {
              sound('tap')
              setKm(t.km)
            }}
            aria-pressed={km === t.km}
            className={`min-h-11 cursor-pointer border-2 px-3 font-ui text-[10px] ${km === t.km ? 'border-shadow bg-teal text-night' : 'border-cream/50 bg-transparent text-cream'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label htmlFor="ev-km" className="flex justify-between font-ui text-[11px]">
        <span>Distance</span>
        <span className="text-lamp-hot">{km} km</span>
      </label>
      <input id="ev-km" type="range" min={5} max={600} step={5} value={km} onChange={(ev2) => setKm(Number(ev2.target.value))} className="h-11 w-full cursor-pointer accent-teal" />

      <div className="flex flex-col gap-2.5" aria-live="polite">
        {[
          { name: 'Petrol car', cost: petrol, color: '#E07070' },
          { name: 'Electric car', cost: ev, color: '#7FD1C7' },
        ].map((row) => (
          <div key={row.name} className="flex flex-col gap-1">
            <div className="flex justify-between text-[14px]">
              <span>{row.name}</span>
              <span className="font-display text-[20px]">{rupees(row.cost)}</span>
            </div>
            <div className="h-4 border-2 border-shadow bg-[#2A1F45]">
              <div className="h-full transition-[width] duration-300 ease-[steps(6)]" style={{ width: `${(row.cost / most) * 100}%`, background: row.color }} />
            </div>
          </div>
        ))}
      </div>
      <p className="m-0 font-display text-[20px] text-teal">The EV saves about {rupees(saved)} on this trip.</p>
      <p className="m-0 text-[12px] text-[#E4D6E8]">
        Example numbers, not Veherex's real data: petrol ₹{e.petrolPrice}/litre at {e.petrolKmPerL} km/litre; electricity ₹{e.powerPrice}/unit at{' '}
        {e.evKmPerKwh} km/unit, charged at home.
      </p>
    </aside>
  )
}
