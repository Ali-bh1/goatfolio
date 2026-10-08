// Scene 2's NiceTry demo: a scam text lands on Ali's phone and you check the link.
// This is a simple, labelled illustration of the idea, not the real model, and it
// makes no claims about which features NiceTry actually uses. DRAFT copy.

export const SCAM_SMS = {
  from: 'VK-PWRBRD',
  text: 'Dear customer, your power will be cut TONIGHT at 9:30 PM. Your last bill is not updated. Pay now:',
  link: 'http://bit.ly/power-bill-upd8',
}

/** Clues the demo points out, one at a time. */
export const SCAM_CLUES = [
  "It's a short link, so you can't see where it really goes.",
  'It says "tonight". Scam messages try to rush you.',
  'It asks you to pay through a random link, not the official app.',
]

export const SCAM_VERDICT = {
  title: "Scam. Don't click it.",
  note: 'NiceTry runs seven checks like these on a link and gives it one score, before anyone clicks.',
}
