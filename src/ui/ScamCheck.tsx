import { useEffect, useState } from 'react'
import { sound } from '../audio/bus'
import { PROJECTS } from '../data/projects'
import { SCAM_CLUES, SCAM_SMS, SCAM_VERDICT } from '../data/scam'
import { useStore } from '../store/useStore'

const STEP_MS = 750
const nicetry = PROJECTS.find((p) => p.id === 'nicetry')!

/**
 * Scene 2: Ali shows you a scam text he just got, and lets you run NiceTry on the
 * link. The clues tick in one by one, then the verdict. A labelled illustration.
 */
export function ScamCheck() {
  const open = useStore((s) => s.showing === 'scam')
  const [shown, setShown] = useState(-1)

  useEffect(() => {
    if (!open) setShown(-1)
  }, [open])

  // after you press Check, reveal one clue at a time, then the verdict
  useEffect(() => {
    if (shown < 0 || shown > SCAM_CLUES.length) return
    const id = window.setTimeout(() => {
      setShown((n) => n + 1)
      sound(shown + 1 > SCAM_CLUES.length ? 'chime' : 'tap')
    }, STEP_MS)
    return () => window.clearTimeout(id)
  }, [shown])

  if (!open) return null
  const done = shown > SCAM_CLUES.length

  return (
    <aside
      aria-label="NiceTry demo"
      className="fixed inset-x-0 z-20 mx-auto flex top-[var(--hud-h)] max-h-[calc(100dvh-var(--hud-h)-var(--dialogue-h))] overflow-y-auto overscroll-contain w-[min(760px,calc(100vw-32px))] flex-wrap items-start justify-center gap-5 p-2 motion-safe:animate-[drop_.45s_both]"
    >
      {/* the text on Ali's phone */}
      <div className="flex w-[280px] flex-col gap-2 border-[3px] border-shadow bg-night p-3 text-cream shadow-[8px_8px_0_rgba(4,3,12,.85)]">
        <span className="font-ui text-[10px] text-lilac">Messages · {SCAM_SMS.from} · now</span>
        <p className="m-0 border-2 border-[#2A1F45] bg-[#2A1F45] p-3 text-[14px] leading-snug">
          {SCAM_SMS.text} <span className="break-all text-teal underline">{SCAM_SMS.link}</span>
        </p>
      </div>

      <div className="flex min-w-[260px] flex-1 flex-col gap-3 border-2 border-cream/40 bg-shadow/90 p-5 text-cream shadow-[8px_8px_0_rgba(4,3,12,.85)]" aria-live="polite">
        <span className="font-ui text-[11px] text-accent">NiceTry · a simple demo, not the real model</span>
        {shown < 0 ? (
          <>
            <p className="m-0 text-[14px]">Would you click this link? Let NiceTry look at it first.</p>
            <button
              type="button"
              onClick={() => {
                sound('select')
                setShown(0)
              }}
              className="min-h-12 cursor-pointer self-start border-[3px] border-shadow bg-accent px-[18px] py-3 font-ui text-[12px] text-night shadow-[4px_4px_0_#0A0918]"
            >
              Check the link ›
            </button>
          </>
        ) : (
          <>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {SCAM_CLUES.slice(0, Math.min(shown, SCAM_CLUES.length)).map((c) => (
                <li key={c} className="flex gap-2 text-[14px] motion-safe:animate-[msgIn_.3s_both]">
                  <span className="font-ui text-[12px] text-[#FF6A6A]">!</span>
                  {c}
                </li>
              ))}
              {!done && <li className="font-ui text-[11px] text-lilac">checking…</li>}
            </ul>
            {done && (
              <div className="flex flex-col gap-2 border-t-2 border-dashed border-cream/30 pt-3 motion-safe:animate-[msgIn_.3s_both]">
                <span className="font-display text-[26px] font-bold text-[#FF8080]">{SCAM_VERDICT.title}</span>
                <span className="text-[13px] text-[#E4D6E8]">{SCAM_VERDICT.note}</span>
                <a href={nicetry.href} target="_blank" rel="noreferrer" className="self-start border-2 border-shadow bg-cream px-3 py-2.5 font-ui text-[11px] text-ink no-underline">
                  NiceTry on GitHub ›
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
