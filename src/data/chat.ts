// Ali's scripted replies in the Messages app, from the prototype's chatQs(), in plain English.

export interface ChatQuestion {
  q: string
  a: string[]
  card?: boolean
}

export const CHAT_INTRO = ['oh no.', 'you found my phone.']
export const CHAT_INVITE = "ok fine. since you're here, ask me something. (pick a question. I'm not a real chatbot.)"

export const CHAT: Record<string, ChatQuestion> = {
  what: {
    q: 'so what do you actually do?',
    a: ['two things, mostly.', 'apps that feel nice to use, and AI models that try to understand people.', 'then I write about it. I got a paper into IEEE I3CTCON this year.'],
  },
  hire: {
    q: 'are you open to internships?',
    a: ['YES.', "I'm in my final year. looking for SDE, frontend or AI/ML internships.", 'I work fast and I write good docs. people tell me that is rare.'],
  },
  best: {
    q: "what's your best project?",
    a: ["depends what 'best' means.", 'most fun: NiceTry. it catches scam links before anyone clicks them.', "most serious: Veherex. that's the one with the IEEE paper. both are in my Gallery app."],
  },
  sarcasm: {
    q: 'can AI understand sarcasm?',
    a: ['oh, totally. AI is perfect at it.', 'see? you needed context to know I was joking.', "that's my real research. it's called SCAN. when the model isn't sure, it looks for more context. you can try it at 11:50 PM."],
  },
  why: {
    q: 'why is your portfolio a whole night in Mumbai??',
    a: ["because most portfolios are boring, and evenings here are not.", 'also, I wanted an excuse to draw a Mumbai local train in pixel art.'],
  },
  card: { q: 'send me your details', a: ['here, take my card.'], card: true },
}

// Contact details, from Ali's résumé (2026-10-06).
export const CONTACT = {
  name: 'Ali Bhatkar',
  tagline: 'Final-year Computer Engineering · Data Science minor · Navi Mumbai',
  open: 'Open to SDE · Frontend · AI/ML internships',
  github: { href: 'https://github.com/ali-bh1', label: 'ali-bh1' },
  email: { href: 'mailto:alibhatkar.ab@gmail.com', label: 'alibhatkar.ab@gmail.com' },
  linkedin: { href: 'https://www.linkedin.com/in/ali-bhatkar-416a36293', label: 'in/ali-bhatkar' },
  resume: { href: '/ali-bhatkar-resume.pdf', label: 'Résumé (PDF)' },
}
