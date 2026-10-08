import { AppBody, AppHeader } from '../shared'

// Notes, word for word from the prototype. ("try the demo at 11:50 PM" returns
// once the notebook scene exists.)
export function Notes() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F2E6D4] text-ink">
      <AppHeader title="Notes" light />
      <AppBody className="flex flex-col gap-4 p-3.5">
        <div className="flex flex-col gap-1.5 border-b-2 border-dashed border-lilac pb-3.5">
          <span className="font-ui text-[9px] text-plum">pinned · accepted</span>
          <span className="font-display text-[20px] font-bold">Veherex → IEEE I3CTCON 2026</span>
          <span className="text-[13px]">Paper on suggesting the right electric car, with Aryan Bhanage, Ayushmaan Singh and Arjun Aikat. It got accepted!</span>
        </div>
        <div className="flex flex-col gap-1.5 border-b-2 border-dashed border-lilac pb-3.5">
          <span className="font-ui text-[9px] text-plum">draft · do not read</span>
          <span className="font-display text-[20px] font-bold">SCAN</span>
          <span className="text-[13px]">
            Sarcasm needs context. So the model should notice when it isn't sure, and find more context before it answers. Hoping to
            send it to a conference.
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-ui text-[9px] text-plum">to-do</span>
          <span className="text-[13px]">
            ☐ finish final year
            <br />☐ land an internship
            <br />☑ draw a local train, pixel by pixel
          </span>
        </div>
      </AppBody>
    </div>
  )
}
