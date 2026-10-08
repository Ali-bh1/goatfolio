// Ali's notebook pages. At 6:30 PM the wind blows them down the promenade; you find
// them along the walk. One page per scene lies in plain sight (so everyone sees all
// of Ali's work); the rest are hidden between scenes.
// Project, about, skills and contact pages reuse the real data. Doodle and note
// pages are DRAFT copy, written for this build: Ali to approve or rewrite.

export type PageKind = 'project' | 'scan' | 'about' | 'skills' | 'certs' | 'contact' | 'note'

export interface Page {
  id: string
  kind: PageKind
  title: string
  /** For project pages: which project. */
  project?: 'veherex' | 'nicetry' | 'tejal' | 'sentiment'
  /** For note pages: the lines written on it. */
  lines?: string[]
  /** A picture on the page (in /public), shown as pixel art. */
  image?: { src: string; alt: string }
  /** Where it ended up, shown as a hint on the missing page. */
  where: string
  /** Hidden pages need finding; the others lie in plain sight. */
  hidden: boolean
}

export const PAGES: Page[] = [
  { id: 'scan', kind: 'scan', title: 'The sarcasm AI', where: 'on the promenade, 6:30 PM', hidden: false },
  { id: 'nicetry', kind: 'project', project: 'nicetry', title: 'NiceTry', where: "near the corn seller's coals", hidden: true },
  {
    id: 'train',
    kind: 'note',
    title: 'A local train',
    lines: ['A Mumbai local train, drawn pixel by pixel.', 'It was on my to-do list. Done!'],
    where: "inside a kid's soap bubble",
    hidden: true,
  },
  { id: 'about', kind: 'about', title: 'Who Ali is', where: 'under the streetlight, 8:05 PM', hidden: false },
  { id: 'sentiment', kind: 'project', project: 'sentiment', title: 'Sentiment Engine', where: 'a blinking streetlamp', hidden: true },
  {
    id: 'chai-bill',
    kind: 'note',
    title: "The chai wala's bill",
    lines: ['ALI: 3 cutting chai', 'Total: ₹45', 'Status: not paid (as usual)'],
    where: 'the street photographer',
    hidden: true,
  },
  { id: 'tejal', kind: 'project', project: 'tejal', title: 'tejaldesae.com', where: 'the bus stop, 9:40 PM', hidden: false },
  { id: 'certs', kind: 'certs', title: 'Certificates', where: 'a paper boat in the rain', hidden: true },
  {
    id: 'cat',
    kind: 'note',
    title: 'My cat',
    // Ali's own cat, from his photo (2026-10-06).
    lines: ['This is my cat.', 'Every portfolio needs one.'],
    image: { src: '/my-cat.png', alt: "Ali's fluffy cream-and-grey cat, lying on a red blanket" },
    where: 'a puddle',
    hidden: true,
  },
  { id: 'veherex', kind: 'project', project: 'veherex', title: 'Veherex', where: 'the café table, 11:50 PM', hidden: false },
  {
    id: 'todo',
    kind: 'note',
    title: 'To-do list',
    lines: ['☐ finish final year', '☐ land an internship', '☑ draw a local train, pixel by pixel'],
    where: "the fisherman's line",
    hidden: true,
  },
  { id: 'skills', kind: 'skills', title: 'Skills', where: 'the sea wall, 2:10 AM', hidden: false },
  {
    id: 'sealink',
    kind: 'note',
    title: 'The sea link at night',
    lines: ['The Bandra–Worli sea link at night, drawn in pencil.'],
    where: 'the newspaper cycle',
    hidden: true,
  },
  {
    id: 'draft',
    kind: 'note',
    title: 'A note to my future team',
    lines: ['Dear future team,', 'Hi, I’m Ali.', 'I can’t wait to build things with you.'],
    where: 'a secret, near the end',
    hidden: true,
  },
  { id: 'contact', kind: 'contact', title: 'How to reach Ali', where: 'the sea link, 5:48 AM', hidden: false },
]

export const pageById = (id: string) => PAGES.find((p) => p.id === id)
