// The eight moments, from the prototype's momentDefs() (two hints made clearer).
export const MOMENTS = [
  { id: 'phone', title: "Picked up Ali's phone", hint: 'it buzzes in the corner' },
  { id: 'ali', title: 'Actually talked to Ali', hint: 'the promenade, 6:30 PM' },
  { id: 'chai', title: 'Bothered the chai wala', hint: 'he knows things' },
  { id: 'cat', title: 'Pet the promenade cat', hint: 'on the wall at 6:30 PM' },
  { id: 'rain', title: 'Got caught in the rain', hint: 'around 9:40 PM' },
  { id: 'sarcasm', title: 'Taught a model sarcasm', hint: 'the notebook, 11:50 PM' },
  { id: 'photo', title: 'Took a photo of the city', hint: 'camera app' },
  { id: 'dawn', title: 'Stayed till sunrise', hint: 'walk to the very end' },
] as const

export type MomentId = (typeof MOMENTS)[number]['id']
