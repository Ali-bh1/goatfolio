import { CONTACT } from '../data/chat'
import { CERTIFICATIONS, SKILL_GROUPS } from '../data/constellations'
import type { Page } from '../data/pages'
import { PROJECTS, SCREENS } from '../data/projects'

// What's written on a notebook page, drawn in ink on lined paper. Used by the page
// card you see when you pick one up, and by the phone's Notebook app.

const label = 'font-ui text-[10px] tracking-wider text-plum'
const link = 'self-start border-2 border-shadow bg-accent px-3 py-2.5 font-ui text-[11px] text-night no-underline shadow-[3px_3px_0_#0A0918]'

/** Ali's pencil drawing of a Mumbai local, pixel by pixel: three coaches and a pantograph. */
function TrainDoodle() {
  const coach = (x: number) => (
    <g key={x}>
      <rect x={x} y={8} width={30} height={12} fill="#6E2034" />
      <rect x={x} y={10} width={30} height={4} fill="#D8CCB0" />
      <rect x={x} y={15} width={30} height={1} fill="#E7C55A" />
      <rect x={x} y={7} width={30} height={1} fill="#3A3048" />
      {[3, 9, 15, 21].map((w) => (
        <rect key={w} x={x + w} y={11} width={4} height={2} fill="#2A2440" />
      ))}
      <rect x={x + 13} y={15} width={4} height={5} fill="#2A2440" />
      <rect x={x + 4} y={20} width={4} height={2} fill="#1E1630" />
      <rect x={x + 22} y={20} width={4} height={2} fill="#1E1630" />
    </g>
  )
  return (
    <svg viewBox="0 0 100 26" shapeRendering="crispEdges" className="block w-full border-2 border-dashed border-plum/40 bg-[#FBF3E4] p-1" role="img" aria-label="A pixel drawing of a Mumbai local train">
      <rect x={10} y={2} width={1} height={5} fill="#3A3048" />
      <rect x={8} y={2} width={6} height={1} fill="#3A3048" />
      {[2, 34, 66].map(coach)}
      <rect x={0} y={22} width={100} height={1} fill="#8A7A6A" />
    </svg>
  )
}

export function PageContent({ page }: { page: Page }) {
  if (page.kind === 'project') {
    const p = PROJECTS.find((x) => x.id === page.project)!
    return (
      <>
        <span className={label}>{p.meta}</span>
        {p.story && <p className="m-0 border-l-4 border-accent pl-3 font-display text-[17px] text-plum">Ali: “{p.story}”</p>}
        <p className="m-0 font-display text-[19px] leading-[1.35]">{p.desc}</p>
        <p className="m-0 text-[13px]">{p.note}</p>
        <p className="m-0 text-[12px] text-plum">Built with: {p.tags.join(', ')}</p>
        {p.href.startsWith('http') && (
          <a href={p.href} target="_blank" rel="noreferrer" className={link}>
            {p.linkLabel} ›
          </a>
        )}
      </>
    )
  }
  if (page.kind === 'scan') {
    const s = SCREENS.scan
    return (
      <>
        <span className={label}>{s.meta}</span>
        <p className="m-0 font-display text-[19px] leading-[1.35]">An AI that can tell when someone is being sarcastic.</p>
        <p className="m-0 text-[13px]">{s.desc}</p>
        <p className="m-0 text-[12px] text-plum">Try it with Ali at 11:50 PM.</p>
      </>
    )
  }
  if (page.kind === 'about') {
    const a = SCREENS.about
    return (
      <>
        <span className={label}>{a.meta}</span>
        <p className="m-0 font-display text-[19px] leading-[1.35]">{a.desc}</p>
        <p className="m-0 text-[13px]">{a.note}</p>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px]">
          {a.facts.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-plum">{k}</dt>
              <dd className="m-0">{v}</dd>
            </div>
          ))}
        </dl>
      </>
    )
  }
  if (page.kind === 'skills')
    return (
      <>
        {SKILL_GROUPS.map((g) => (
          <div key={g.name} className="flex flex-col">
            <span className={label}>{g.name}</span>
            <span className="text-[14px]">{g.items.join(' · ')}</span>
          </div>
        ))}
      </>
    )
  if (page.kind === 'certs')
    return (
      <ul className="m-0 flex flex-col gap-1 pl-5 font-display text-[18px]">
        {CERTIFICATIONS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    )
  if (page.kind === 'contact')
    return (
      <>
        <p className="m-0 font-display text-[19px]">{CONTACT.open}</p>
        {[
          ['Email', CONTACT.email],
          ['GitHub', CONTACT.github],
          ['LinkedIn', CONTACT.linkedin],
          ['Résumé', CONTACT.resume],
        ].map(([k, v]) => {
          const item = v as { href: string; label: string }
          return (
            <a key={k as string} href={item.href} target="_blank" rel="noreferrer" className="flex justify-between gap-3 border-b-2 border-dashed border-plum/40 py-1.5 text-[13px] text-ink no-underline">
              <span className="text-plum">{k as string}</span>
              <span>{item.label}</span>
            </a>
          )
        })}
      </>
    )
  return (
    <div className="flex flex-col gap-1 font-display text-[19px] leading-[1.4]">
      {page.id === 'train' && <TrainDoodle />}
      {page.image && (
        <img src={page.image.src} alt={page.image.alt} width={96} height={96} className="block h-auto w-full max-w-[240px] border-[3px] border-shadow [image-rendering:pixelated]" />
      )}
      {page.lines?.map((l) => (
        <p key={l} className="m-0">
          {l}
        </p>
      ))}
    </div>
  )
}
