# One Evening in Mumbai

Ali Bhatkar's portfolio as a 3D pixel-art visual novel: one night on Marine Drive, sunset to sunrise. Walk the promenade, talk to people, and find Ali's 15 lost notebook pages.

**Live:** https://goatfolio.vercel.app · **Plain version:** https://goatfolio.vercel.app/?plain

```
npm install
npm run dev      # http://localhost:5173  (add ?hits to see click areas)
npm run build
vercel --prod --yes   # deploy (Vercel CLI, logged in)
```

## Built with
React, TypeScript, Vite · Three.js via React Three Fiber, custom GLSL (two pixel sizes, like *Until Then*) · Ink for the story · Zustand · Tailwind for the overlay UI · Howler.js + Web Audio (every sound and the music is generated in code) · Vercel.

## Where things are
- `story/promenade.ink` — all dialogue. `src/data/` — projects, pages, skills, places, stops.
- `src/world/` — the 3D world: scenes, characters (`characters/`), the people between scenes (`stretch1`–`stretch5`), pages, effects (`fx/`).
- `src/ui/` — HUD, dialogue, cards, the Walk on bar, the plain page (`PlainPage.tsx`, also the fallback when 3D can't run).
- `src/audio/` — the generated soundscape, sound effects and music.
- `docs/SPEC.md` — how every system works. `docs/ROADMAP.md` — build order and status.
