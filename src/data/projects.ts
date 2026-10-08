// Projects: started from the prototype, rewritten in plain English, and brought in
// line with Ali's résumé (2026-10-06).

export interface Project {
  id: 'veherex' | 'nicetry' | 'tejal' | 'sentiment' | 'evening'
  title: string
  meta: string
  desc: string
  note: string
  tags: string[]
  href: string
  linkLabel: string
  bg: string
  sub: string
  /** Ali's own line about it, in his words (2026-10-06). */
  story?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'veherex',
    title: 'Veherex',
    meta: 'Jan–Mar 2025 · Research · IEEE I3CTCON 2026',
    desc: 'An EV comparison platform for Indian buyers. It matches you to cars by budget, range and charging, and shows what a trip costs in an EV compared to petrol. I built the whole frontend.',
    note: 'Paper accepted at IEEE I3CTCON 2026. Written with Aryan Bhanage, Ayushmaan Singh and Arjun Aikat, guided by Siuli Das and Gargi Phadke.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Rule-based matching', 'Research'],
    href: '#scene4',
    linkLabel: 'Read the notebook',
    bg: '#7FD1C7',
    sub: 'the one that got published',
    story: 'Veherex was my first project.',
  },
  {
    id: 'nicetry',
    title: 'NiceTry',
    meta: '2026 · started at Smart India Hackathon 2024',
    desc: 'A phishing detection engine. It checks a link in seven separate ways (the URL itself, domain age, SSL certificate, redirects, page content, reputation lists and warning signs) and combines them into one score. Tested on 30,000 real links: 94% of phishing caught.',
    note: 'Started as PhishGuard at Smart India Hackathon 2024, then rebuilt as NiceTry. Each check is its own module, so if one is slow or down, the rest keep working.',
    tags: ['Python', '7 check layers', 'Phishing detection'],
    href: 'https://github.com/Ali-bh1/NiceTry',
    linkLabel: 'View on GitHub',
    bg: '#FF8A4C',
    sub: 'the hackathon project that kept growing',
    story: 'NiceTry was my first time trying to get into cyber security.',
  },
  {
    id: 'tejal',
    title: 'tejaldesae.com',
    meta: '2026 · Freelance · live client site',
    desc: 'A complete website for a live coaching business, built from scratch with no framework. It has a 4-step application form that saves drafts and stops spam bots. I still look after it.',
    note: 'Payments with Razorpay, enquiry forms with Web3Forms, bookings with TidyCal. I also set up Meta Ads and the Meta Pixel to see which ads bring sign-ups.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Meta Pixel', 'Razorpay'],
    href: 'https://tejaldesae.com',
    linkLabel: 'Visit the site',
    bg: '#E7C55A',
    sub: 'the first real client',
    story: 'tejaldesae.com was my first freelance client.',
  },
  {
    id: 'sentiment',
    title: 'Sentiment Engine',
    meta: '2025 · NLP',
    desc: 'Reads a movie review and tells you if it is positive or negative. The full pipeline: cleaning the text, breaking it into words, turning it into numbers (TF-IDF), training, testing.',
    note: 'I compared Naive Bayes and Logistic Regression and picked the winner by F1 score, not plain accuracy, so the smaller class wasn’t hidden. Result: 87% F1 on IMDb movie reviews.',
    tags: ['Python', 'scikit-learn', 'NLTK', 'TF-IDF'],
    href: 'https://github.com/ali-bh1',
    linkLabel: 'Ali on GitHub',
    bg: '#C9B8D6',
    sub: 'reading feelings in text',
  },
  {
    id: 'evening',
    title: 'One Evening in Mumbai',
    meta: '2026 · this website',
    desc: 'This portfolio: one night on Marine Drive as a 3D pixel-art visual novel, with things to find and people to talk to.',
    note: 'Every character, sound and piece of music is made in code. The story runs on Ink, the world on React Three Fiber, rendered at two pixel sizes like the game Until Then.',
    tags: ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'GLSL', 'Ink', 'Zustand', 'Tailwind', 'Howler.js', 'Vercel'],
    href: 'https://goatfolio.vercel.app',
    linkLabel: "You're already here",
    bg: '#F28C5A',
    sub: "the one you're standing in",
  },
]

// Two more things Ali can show on his laptop, from the prototype's notebook and bio.
export const SCREENS = {
  scan: {
    title: 'SCAN',
    meta: 'Entry 02 · in progress',
    desc: "Sarcasm is hard to spot without context. So when this model isn't sure, it doesn't guess. It looks for more context first, and stops once it's sure. (SCAN: Sufficient-Context Acquisition Network. For the curious: uncertainty-gated active inference over a POMDP.)",
    bg: '#7FD1C7',
  },
  about: {
    title: 'Ali Bhatkar',
    meta: 'Navi Mumbai',
    desc: 'Final year of computer engineering, with a minor in data science. Always too many tabs open.',
    note: "I build both parts of an app: the screens people use, and the AI working behind them. Then I explain it with a paper, slides and a short video. To me, a project isn't done until people understand it.",
    facts: [
      ['Studying at', 'RAIT, DY Patil University'],
      ['Builds with', 'React · TypeScript · Python · Three.js'],
      ['Published', 'IEEE I3CTCON 2026'],
      ['Looking for', 'SDE · Frontend · AI/ML internships'],
    ],
    bg: '#FF8A4C',
  },
} as const
