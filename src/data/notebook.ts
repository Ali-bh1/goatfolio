// Scene 4's notebook and the SCAN illustration, from the prototype, in plain English.

export const ENTRIES: { label: string; title: string; body: string; link?: { href: string; label: string } }[] = [
  {
    label: 'Entry 01 · accepted',
    title: 'Veherex @ IEEE I3CTCON 2026',
    body: '“VEHEREX: A Personalized EV Recommendation Platform.” Peer-reviewed, accepted at IEEE I3CTCON 2026, Lonavala, India. Written with Aryan Bhanage, Ayushmaan Singh and Arjun Aikat.',
  },
  {
    label: 'Entry 02 · in progress',
    title: 'SCAN',
    body: "Sarcasm is hard to spot without context. So when this model isn't sure, it doesn't guess. It looks for more context first, and stops once it's sure. (SCAN: Sufficient-Context Acquisition Network. For the curious: uncertainty-gated active inference over a POMDP.)",
  },
]

export const SCAN_QUOTE = '"Oh great. Another Monday."'
export const SCAN_CLUES = ['It is 7:02 AM and their alarm did not go off.', 'Yesterday they said: "I dread Mondays."']
export const SCAN_STEPS = [
  { read: 'Sounds… positive?', unc: 84, note: 'Not enough information. Instead of guessing, the model looks for more context.', button: 'Look for more context ›', bar: '#FF8A4C' },
  { read: 'Hmm. Leaning sarcastic.', unc: 47, note: "Better, but it still isn't sure. One more clue.", button: 'Look for more context ›', bar: '#FFC56B' },
  { read: 'Sarcastic.', unc: 12, note: "Now it's sure, so it stops looking. Knowing when to stop is the main idea.", button: 'Start over ↺', bar: '#7FD1C7' },
]
