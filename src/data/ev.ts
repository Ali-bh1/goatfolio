// Scene 4's Veherex demo: what a trip costs in an EV compared to a petrol car.
// The prices and mileages are rough example numbers for illustration, clearly
// labelled in the UI. They are not Veherex's real data.

export const EV_EXAMPLE = {
  /** ₹ per litre of petrol */
  petrolPrice: 105,
  /** km per litre, an average small car */
  petrolKmPerL: 15,
  /** ₹ per unit (kWh) of electricity, charging at home */
  powerPrice: 10,
  /** km per kWh, an average small EV */
  evKmPerKwh: 7,
}

/** Trips to try, with rough road distances. */
export const EV_TRIPS = [
  { label: 'To college and back', km: 30 },
  { label: 'Mumbai to Pune', km: 150 },
  { label: 'Mumbai to Goa', km: 590 },
]

export function tripCost(km: number) {
  const e = EV_EXAMPLE
  const petrol = (km / e.petrolKmPerL) * e.petrolPrice
  const ev = (km / e.evKmPerKwh) * e.powerPrice
  return { petrol, ev, saved: petrol - ev }
}
