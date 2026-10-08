// Visual-novel bust portraits, drawn as flat vector shapes on a 120×150 canvas and
// turned into pixel art by raster.ts. Each builder returns an SVG string for one
// expression, with eyes open or shut and mouth open or closed (for blinking and talking).
//
// Ali's look is a stand-in based on the prototype (black hair, orange hoodie) until
// he supplies a reference.

export type Who = 'Ali' | 'Chai wala' | 'Cat'
export type Mood = 'neutral' | 'smile' | 'smug' | 'surprised' | 'grin' | 'happy' | 'curious'

export const MOODS: Record<Who, Mood[]> = {
  Ali: ['neutral', 'smile', 'smug', 'surprised'],
  'Chai wala': ['neutral', 'grin', 'surprised'],
  Cat: ['neutral', 'happy', 'curious'],
}

export interface Frame {
  mood: Mood
  blink: boolean
  talk: boolean
}

const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" width="120" height="150">${body}</svg>`
const P = (d: string, fill: string) => `<path d="${d}" fill="${fill}"/>`
const E = (cx: number, cy: number, rx: number, ry: number, fill: string) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`
const R = (x: number, y: number, w: number, h: number, fill: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`

/** Mirror a left-side shape to the right side of the face (x → 120 − x). */
const mirror = (shape: string) => `<g transform="translate(120 0) scale(-1 1)">${shape}</g>`

// ---------------------------------------------------------------- Ali

const A = {
  skin: '#B07A55',
  skinSh: '#8E5E40',
  hair: '#1A1020',
  hairHi: '#3A2850',
  hood: '#FF8A4C',
  hoodSh: '#D96A3A',
  hoodDeep: '#B5532C',
  string: '#F7EAD7',
  white: '#F7EAD7',
  iris: '#3A2018',
  irisLo: '#7A4A2A',
  lidShade: '#CDBFB8',
  rim: '#7FD1C7',
  mouth: '#6E2E2A',
}

function aliEye(f: Frame) {
  const x = 48
  if (f.blink) return P(`M41 59 Q48 62.5 55 59 L55 61 Q48 64.5 41 61 Z`, A.hair)
  const wide = f.mood === 'surprised'
  const lid = f.mood === 'smug' ? P(`M40 52 L56 52 L56 58.5 L40 58.5 Z`, A.skin) : ''
  const smile = f.mood === 'smile' ? P(`M40 63.5 Q48 58.5 56 63.5 L56 67 L40 67 Z`, A.skin) : ''
  return [
    E(x, 59, 6.2, wide ? 6 : 5, A.white),
    P(`M42 ${wide ? 56 : 57} Q48 ${wide ? 52.5 : 54.5} 54 ${wide ? 56 : 57} L54 58 Q48 56 42 58 Z`, A.lidShade),
    E(x + 1, 59.5, wide ? 3 : 3.6, wide ? 3.6 : 4.4, A.iris),
    E(x + 1, 61.5, wide ? 2.2 : 2.6, wide ? 1.6 : 2, A.irisLo),
    R(x + 0.5, 56.5, 2, 2, A.white),
    lid,
    smile,
    P(`M41 ${wide ? 55 : 57} Q48 ${wide ? 50 : 52} 55 ${wide ? 54 : 56} L55.5 ${wide ? 56 : 58} Q48 ${wide ? 52 : 54} 41 ${wide ? 57 : 59} Z`, A.hair),
  ].join('')
}

function aliBrows(f: Frame) {
  const left = f.mood === 'surprised' ? -3 : 0
  const right = f.mood === 'smug' ? -4 : left
  const l = P(`M41 ${50 + left} L54 ${48.5 + left} L54 ${51 + left} L41 ${52.5 + left} Z`, A.hair)
  const r = P(`M41 ${50 + right} L54 ${48.5 + right} L54 ${51 + right} L41 ${52.5 + right} Z`, A.hair)
  return l + mirror(r)
}

function aliMouth(f: Frame) {
  if (f.talk) {
    const w = f.mood === 'smile' ? 8 : 6
    return P(`M${60 - w} 75 Q60 74 ${60 + w} 75 Q${59 + w} 81.5 60 82.5 Q${61 - w} 81.5 ${60 - w} 75 Z`, A.mouth) + R(60 - w + 2, 75, (w - 2) * 2, 1.4, A.white)
  }
  switch (f.mood) {
    case 'smile':
      return P(`M52 75 Q60 81 68 75 L68 76.6 Q60 83 52 76.6 Z`, A.mouth)
    case 'smug':
      return P(`M55 77.5 Q62 77.5 67.5 74 L67.5 75.8 Q62 79.5 55 79.2 Z`, A.mouth)
    case 'surprised':
      return E(60, 77.5, 2.6, 3, A.mouth)
    default:
      return R(55, 76.5, 10, 1.8, A.mouth)
  }
}

export function ali(f: Frame) {
  return svg(
    [
      // hoodie, shaded on the left, hood bunched round the neck, drawstrings
      P('M8 150 L12 122 Q18 104 42 98 L78 98 Q102 104 108 122 L112 150 Z', A.hood),
      P('M8 150 L12 122 Q18 104 42 98 L46 112 Q30 120 26 150 Z', A.hoodSh),
      P('M34 101 Q60 117 86 101 Q84 89 60 88 Q36 89 34 101 Z', A.hoodSh),
      P('M42 100 Q60 111 78 100 Q74 94 60 94 Q46 94 42 100 Z', A.hoodDeep),
      R(50, 108, 2, 17, A.string),
      R(68, 108, 2, 15, A.string),
      P('M30 150 Q34 132 40 124 L42 126 Q37 134 34 150 Z', A.hoodSh),
      P('M86 150 Q84 136 90 126 L92 128 Q88 136 90 150 Z', A.hoodSh),
      P('M104 116 Q108 126 110 150 L112 150 L108 122 Q102 106 86 100 L86 102 Q100 106 104 116 Z', A.rim),
      // back hair, neck, ears, face
      P('M29 62 Q22 24 52 15 Q80 9 92 30 Q98 46 91 64 L84 50 L36 50 Z', A.hair),
      P('M52 76 L68 76 L69 98 Q60 102 51 98 Z', A.skin),
      P('M52 80 Q60 89 68 80 L68 87 Q60 93 52 87 Z', A.skinSh),
      E(35, 61, 4, 6, A.skin),
      E(85, 61, 4, 6, A.skin),
      P('M36 46 Q36 26 60 25 Q84 26 84 46 L84 60 Q83 76 68 85 Q60 90 52 85 Q37 76 36 60 Z', A.skin),
      P('M36 60 Q37 76 52 85 Q44 76 41 62 Z', A.skinSh),
      // messy fringe, two tufts sticking up, a highlight
      P('M33 50 Q33 23 58 19 Q85 17 89 46 L83 40 L81 51 L75 37 L70 49 L64 33 L58 47 L52 33 L46 47 L42 36 L38 52 Z', A.hair),
      P('M49 21 L54 6 L60 19 Z', A.hair),
      P('M62 19 L73 8 L70 22 Z', A.hair),
      P('M47 27 Q58 21 71 25 L69 28 Q58 24 49 30 Z', A.hairHi),
      P('M34 48 L40 52 L38 70 L34 62 Z', A.hair),
      P('M86 48 L80 52 L82 70 L86 62 Z', A.hair),
      P('M38 40 Q42 32 50 29 L50 31 Q44 34 40 41 Z', A.hairHi),
      P('M88 44 Q90 30 80 20 L82 20 Q93 30 90 46 Z', A.rim),
      aliBrows(f),
      aliEye(f),
      mirror(aliEye(f)),
      P('M60 64 L62.5 70.5 L58.5 70.5 Z', A.skinSh),
      aliMouth(f),
    ].join(''),
  )
}

// ---------------------------------------------------------------- the chai wala

const V = {
  skin: '#8A5A3C',
  skinSh: '#6E4630',
  cap: '#F7EAD7',
  capSh: '#D8CBAC',
  kurta: '#E7E0D0',
  kurtaSh: '#C9BFAE',
  must: '#2A2028',
  grey: '#5A5060',
  gam: '#C0504A',
  gamStripe: '#F7EAD7',
  white: '#F7EAD7',
  iris: '#2A1A14',
  irisLo: '#5A3A24',
  mouth: '#5A2424',
}

function vendorEye(f: Frame) {
  if (f.blink || f.mood === 'grin') return P('M41 61 Q47 56.5 53 61 L53 62.6 Q47 58.5 41 62.6 Z', V.must)
  const wide = f.mood === 'surprised'
  return [
    E(47, 61, 5.2, wide ? 4.8 : 3.6, V.white),
    E(47.5, 61.3, 2.6, wide ? 3.4 : 3, V.iris),
    E(47.5, 62.6, 1.8, 1.4, V.irisLo),
    R(47, 59.5, 1.5, 1.5, V.white),
    P(`M41 ${wide ? 58 : 59.5} Q47 ${wide ? 54.5 : 56.5} 53 ${wide ? 57.5 : 59} L53 ${wide ? 59 : 60.5} Q47 ${wide ? 56 : 58} 41 ${wide ? 59.5 : 61} Z`, V.must),
    // crow's feet
    R(38, 61, 2, 1, V.skinSh),
    R(38.5, 63, 2, 1, V.skinSh),
  ].join('')
}

function vendorMouth(f: Frame) {
  const grin = f.mood === 'grin'
  const must = grin
    ? 'M44 72 Q52 69 60 72.5 Q68 69 76 72 Q76 77.5 67 76 Q60 74.5 53 76 Q44 77.5 44 72 Z'
    : 'M45 74.5 Q53 69.5 60 72.5 Q67 69.5 75 74.5 Q73 78.5 66 77.2 Q60 75.8 54 77.2 Q47 78.5 45 74.5 Z'
  let mouth: string
  if (f.talk) mouth = P('M54 78 Q60 77 66 78 Q65 84 60 84.5 Q55 84 54 78 Z', V.mouth) + R(56, 78, 8, 1.3, V.white)
  else if (grin) mouth = P('M51 77.5 Q60 85 69 77.5 L68 80 Q60 86 52 80 Z', V.mouth) + R(54, 78, 12, 1.4, V.white)
  else if (f.mood === 'surprised') mouth = E(60, 80.5, 2.6, 2.8, V.mouth)
  else mouth = R(55, 79.5, 10, 1.6, V.mouth)
  return mouth + P(must, V.must)
}

export function vendor(f: Frame) {
  return svg(
    [
      // kurta with a V collar, a red gamchha over his left shoulder
      P('M6 150 L10 120 Q16 103 40 99 L80 99 Q104 103 110 120 L114 150 Z', V.kurta),
      P('M114 150 L110 120 Q104 103 80 99 L76 112 Q92 120 96 150 Z', V.kurtaSh),
      P('M52 99 L60 117 L68 99 Z', V.skinSh),
      E(60, 124, 1.4, 1.4, V.kurtaSh),
      E(60, 132, 1.4, 1.4, V.kurtaSh),
      P('M14 113 Q28 98 46 100 L40 150 L20 150 Z', V.gam),
      R(27, 104, 3, 46, V.gamStripe),
      R(35, 102, 2, 48, V.gamStripe),
      // neck, ears, a broad face
      P('M50 78 L70 78 L71 99 Q60 104 49 99 Z', V.skin),
      P('M50 82 Q60 92 70 82 L70 88 Q60 95 50 88 Z', V.skinSh),
      E(33, 62, 4.5, 6.5, V.skin),
      E(87, 62, 4.5, 6.5, V.skin),
      P('M34 50 Q34 30 60 29 Q86 30 86 50 L86 62 Q84 80 66 88 Q60 90.5 54 88 Q36 80 34 62 Z', V.skin),
      P('M86 62 Q84 80 66 88 Q78 78 81 62 Z', V.skinSh),
      // grey at the temples, under a white Gandhi topi
      P('M33 42 L38 42 L38 56 L34 53 Z', V.grey),
      P('M87 42 L82 42 L82 56 L86 53 Z', V.grey),
      P('M31 42 Q33 21 60 19 Q87 21 89 42 L85 44 Q60 35 35 44 Z', V.cap),
      P('M39 30 Q60 23 81 30 L81 31.8 Q60 25.5 39 31.8 Z', V.capSh),
      P('M35 44 Q60 35 85 44 L85 46 Q60 37.5 35 46 Z', V.capSh),
      // brows, eyes, a big nose, the moustache
      P(`M40 ${f.mood === 'surprised' ? 51 : 54} L54 ${f.mood === 'surprised' ? 50 : 53} L54 ${f.mood === 'surprised' ? 53 : 56} L40 ${f.mood === 'surprised' ? 54 : 57} Z`, V.grey),
      mirror(P(`M40 ${f.mood === 'surprised' ? 51 : 54} L54 ${f.mood === 'surprised' ? 50 : 53} L54 ${f.mood === 'surprised' ? 53 : 56} L40 ${f.mood === 'surprised' ? 54 : 57} Z`, V.grey)),
      vendorEye(f),
      mirror(vendorEye(f)),
      P('M58 60 Q64 66 63 71 L56 71 Q55 66 58 60 Z', V.skinSh),
      vendorMouth(f),
      // stubble
      ...[44, 49, 71, 76].map((x, i) => R(x, 82 + (i % 2) * 2, 1, 1, V.grey)),
    ].join(''),
  )
}

// ---------------------------------------------------------------- the cat

const C = {
  fur: '#2A2038',
  furHi: '#3E3352',
  chest: '#4A3E5C',
  inner: '#5A3E5C',
  eye: '#E7C55A',
  pupil: '#1A1020',
  nose: '#C98A9A',
  whisker: '#C9B8D6',
}

function catEye(f: Frame) {
  if (f.blink || f.mood === 'happy') return P('M37 71 Q45 63 53 71 L53 73.4 Q45 66 37 73.4 Z', C.furHi)
  const round = f.mood === 'curious'
  return [
    E(45, 70, 8, 8, C.eye),
    E(45.5, 70, round ? 5 : 2, round ? 6 : 6.5, C.pupil),
    R(41, 66, 2.5, 2.5, '#FFF3D0'),
  ].join('')
}

export function cat(f: Frame) {
  return svg(
    [
      P('M18 150 Q22 108 60 103 Q98 108 102 150 Z', C.fur),
      P('M44 150 Q46 116 60 112 Q74 116 76 150 Z', C.chest),
      P('M29 58 L31 20 L54 44 Z', C.fur),
      P('M91 58 L89 20 L66 44 Z', C.fur),
      P('M34 50 L35 30 L48 44 Z', C.inner),
      P('M86 50 L85 30 L72 44 Z', C.inner),
      P('M25 74 Q25 43 60 41 Q95 43 95 74 Q95 99 60 103 Q25 99 25 74 Z', C.fur),
      P('M40 46 Q60 40 80 46 L78 49 Q60 44 42 49 Z', C.furHi),
      catEye(f),
      mirror(catEye(f)),
      P('M56 82 L64 82 L60 87 Z', C.nose),
      f.talk ? E(60, 92, 3.5, 3, C.nose) : P('M52 90 Q56 94 60 90 Q64 94 68 90 L68 91.6 Q64 96 60 92 Q56 96 52 91.6 Z', C.furHi),
      // whiskers
      ...[84, 89].flatMap((y) => [R(16, y, 22, 1, C.whisker), R(82, y, 22, 1, C.whisker)]),
    ].join(''),
  )
}

export const ART: Record<Who, (f: Frame) => string> = { Ali: ali, 'Chai wala': vendor, Cat: cat }
