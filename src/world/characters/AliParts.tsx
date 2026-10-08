import type { RefObject } from 'react'
import type { Group, Material } from 'three'
import { toon } from '../materials'

// Ali, rounded and in visual-novel proportions (a big head, soft shoulders), built
// facing +z. Colours from the prototype.
export const SKIN = '#A86F4C'
const HAIR = '#17101C'
const HAIR_HI = '#3A2C3E'
const HOODIE = '#FF8A4C'
const HOODIE_DARK = '#D96A3A'
const JEANS = '#2A2440'

/** Seat, thighs, and legs hanging over the sea side. */
export function Legs() {
  return (
    <group>
      <mesh material={toon(JEANS)} position={[0, 0.08, 0.06]} scale={[1.25, 0.7, 1]}>
        <sphereGeometry args={[0.15, 10, 8]} />
      </mesh>
      {[-0.085, 0.085].map((x) => (
        <group key={x}>
          <mesh material={toon(JEANS)} position={[x, 0.08, 0.2]} rotation-x={Math.PI / 2}>
            <capsuleGeometry args={[0.065, 0.2, 4, 8]} />
          </mesh>
          <mesh material={toon(JEANS)} position={[x, -0.14, 0.33]}>
            <capsuleGeometry args={[0.058, 0.3, 4, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Hoodie: rounded torso, wide soft shoulders, the hood bunched behind the neck. */
export function Torso({ forearms, pose = 'typing' }: { forearms: RefObject<(Group | null)[]>; pose?: 'typing' | 'pockets' }) {
  return (
    <group>
      <mesh material={toon(HOODIE)} position={[0, 0.32, 0]} scale={[1.18, 1, 0.72]}>
        <capsuleGeometry args={[0.15, 0.2, 6, 12]} />
      </mesh>
      <mesh material={toon(HOODIE_DARK)} position={[0, 0.54, -0.08]} scale={[1.35, 0.6, 0.85]}>
        <sphereGeometry args={[0.12, 12, 8]} />
      </mesh>
      {/* a seam down the back */}
      <mesh material={toon(HOODIE_DARK)} position={[0, 0.32, -0.112]}>
        <boxGeometry args={[0.018, 0.28, 0.004]} />
      </mesh>
      {[-1, 1].map((side, i) => (
        <group key={side} position={[side * 0.2, 0.47, 0.02]} rotation={pose === 'typing' ? [-0.45, 0, side * 0.12] : [0.05, 0, side * 0.16]}>
          <mesh material={toon(HOODIE)} position={[0, -0.1, 0]}>
            <capsuleGeometry args={[0.05, 0.14, 4, 8]} />
          </mesh>
          <group ref={(f) => (forearms.current[i] = f)} position={[0, -0.21, 0]}>
            <mesh material={toon(HOODIE)} position={[0, -0.08, 0]}>
              <capsuleGeometry args={[0.045, 0.12, 4, 8]} />
            </mesh>
            <mesh material={toon(SKIN)} position={[0, -0.2, 0]}>
              <sphereGeometry args={[0.038, 8, 6]} />
            </mesh>
          </group>
        </group>
      ))}
      <mesh material={toon(SKIN)} position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 0.08, 8]} />
      </mesh>
    </group>
  )
}

// Messy hair: spikes radiating off the crown and the back, a fringe, side locks.
// Ali's hair, after his photo: thick wavy hair, built from soft round curls (no
// spikes), falling over the forehead to the brows and over the ears.
// x, y, z, radius (head-centred)
const CURLS: [number, number, number, number][] = [
  [0, 0.16, -0.02, 0.09],
  [0.085, 0.14, 0.01, 0.08],
  [-0.085, 0.14, 0.01, 0.08],
  [0.13, 0.08, -0.03, 0.075],
  [-0.13, 0.08, -0.03, 0.075],
  [0.04, 0.13, -0.1, 0.085],
  [-0.05, 0.12, -0.1, 0.085],
  [0, 0.06, -0.15, 0.09],
  [0.11, 0.01, -0.1, 0.08],
  [-0.11, 0.01, -0.1, 0.08],
  [0.155, -0.03, -0.02, 0.065],
  [-0.155, -0.03, -0.02, 0.065],
  [0, -0.06, -0.13, 0.08],
  [0.11, -0.08, -0.07, 0.065],
  [-0.11, -0.08, -0.07, 0.065],
]
// rounded locks hanging over the forehead: x, y, z, length, sideways tilt
const LOCKS: [number, number, number, number, number][] = [
  [-0.075, 0.06, 0.135, 0.07, 0.35],
  [-0.02, 0.07, 0.15, 0.06, 0.1],
  [0.04, 0.065, 0.148, 0.06, -0.2],
  [0.09, 0.05, 0.125, 0.07, -0.45],
  // the long one over his right eye
  [-0.045, 0.035, 0.162, 0.07, 0.15],
]

export function Head({ face }: { face: Material }) {
  return (
    <group position={[0, 0.17, 0]}>
      <mesh material={toon(SKIN)} scale={[1, 1.04, 0.98]}>
        <sphereGeometry args={[0.16, 14, 10]} />
      </mesh>
      {/* the face, a hair's breadth in front of the skin */}
      <mesh material={face} position={[0, -0.02, 0.155]}>
        <planeGeometry args={[0.2, 0.175]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} material={toon(SKIN)} position={[s * 0.158, -0.01, 0.0]} scale={[0.6, 1, 0.8]}>
          <sphereGeometry args={[0.035, 8, 6]} />
        </mesh>
      ))}
      {/* hair mass sits back and up so the face stays clear */}
      <mesh material={toon(HAIR)} position={[0, 0.04, -0.035]} scale={[1.1, 1.05, 1.05]}>
        <sphereGeometry args={[0.17, 14, 10]} />
      </mesh>
      {CURLS.map(([x, y, z, r], i) => (
        <mesh key={i} material={toon(i % 5 === 0 ? HAIR_HI : HAIR)} position={[x, y, z]}>
          <sphereGeometry args={[r, 10, 8]} />
        </mesh>
      ))}
      {/* a fringe band across the top of the forehead, then the locks */}
      <mesh material={toon(HAIR)} position={[0, 0.1, 0.1]} scale={[1.25, 0.55, 0.7]}>
        <sphereGeometry args={[0.1, 12, 8]} />
      </mesh>
      {LOCKS.map(([x, y, z, len, rz], i) => (
        <mesh key={`f${i}`} material={toon(HAIR)} position={[x, y, z]} rotation-z={rz} scale={[1, 1, 0.6]}>
          <capsuleGeometry args={[0.028, len, 4, 8]} />
        </mesh>
      ))}
      {/* side locks over the ears, down to the jaw */}
      {[-1, 1].map((s) => (
        <mesh key={`l${s}`} material={toon(HAIR)} position={[s * 0.152, -0.05, 0.04]} rotation-z={s * 0.12} scale={[0.8, 1, 1]}>
          <capsuleGeometry args={[0.042, 0.11, 4, 8]} />
        </mesh>
      ))}
    </group>
  )
}

/** Standing: legs straight down from the hip (the root sits at hip height), trainers. */
export function StandingLegs() {
  return (
    <group>
      <mesh material={toon(JEANS)} position={[0, 0.04, 0]} scale={[1.2, 0.6, 0.8]}>
        <sphereGeometry args={[0.15, 10, 8]} />
      </mesh>
      {[-0.08, 0.08].map((x) => (
        <group key={x}>
          <mesh material={toon(JEANS)} position={[x, -0.36, 0]}>
            <capsuleGeometry args={[0.065, 0.62, 4, 8]} />
          </mesh>
          <mesh material={toon('#F7EAD7')} position={[x, -0.76, 0.04]} scale={[1, 0.6, 1.5]}>
            <sphereGeometry args={[0.07, 8, 6]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
