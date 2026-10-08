import type { RefObject } from 'react'
import type { Group, Mesh, MeshBasicMaterial } from 'three'
import { toon } from '../materials'

export const FUR = '#2A2038'
const FUR_HI = '#3E3352'
const MUZZLE = '#4A3E5C'

/** Handles the animation code reaches into. */
export interface CatRig {
  head: RefObject<Group | null>
  earL: RefObject<Group | null>
  earR: RefObject<Group | null>
  eyes: RefObject<(Mesh | null)[]>
  tail: RefObject<(Group | null)[]>
  legs: RefObject<(Group | null)[]>
}

/** Sitting upright, facing -x: round haunches, a chest, a big round head. */
export function SitPose({ rig, eyeMat }: { rig: CatRig; eyeMat: MeshBasicMaterial }) {
  return (
    <group>
      <mesh material={toon(FUR)} position={[0.05, 0.1, 0]} scale={[1.15, 0.85, 1]}>
        <sphereGeometry args={[0.12, 12, 8]} />
      </mesh>
      <mesh material={toon(FUR)} position={[-0.05, 0.19, 0]} rotation-z={-0.25}>
        <capsuleGeometry args={[0.068, 0.1, 4, 10]} />
      </mesh>
      <mesh material={toon(FUR_HI)} position={[-0.105, 0.16, 0]} scale={[0.5, 1, 0.8]}>
        <sphereGeometry args={[0.05, 8, 6]} />
      </mesh>
      {[-0.04, 0.04].map((lz) => (
        <mesh key={lz} material={toon(FUR)} position={[-0.09, 0.055, lz]}>
          <capsuleGeometry args={[0.022, 0.08, 3, 6]} />
        </mesh>
      ))}
      <group position={[0.16, 0.05, 0]}>
        <TailSegment index={0} refs={rig.tail} />
      </group>
      <group ref={rig.head} position={[-0.07, 0.32, 0]}>
        <CatHead rig={rig} eyeMat={eyeMat} />
      </group>
    </group>
  )
}

/** Trotting, facing -x: a long soft body, four legs, tail up. */
export function WalkPose({ legs, eyeMat }: { legs: RefObject<(Group | null)[]>; eyeMat: MeshBasicMaterial }) {
  return (
    <group>
      <mesh material={toon(FUR)} position={[0, 0.2, 0]} rotation-z={Math.PI / 2}>
        <capsuleGeometry args={[0.07, 0.2, 4, 10]} />
      </mesh>
      {[
        [-0.11, -0.045],
        [-0.11, 0.045],
        [0.11, -0.045],
        [0.11, 0.045],
      ].map(([lx, lz], i) => (
        <group key={i} ref={(g) => (legs.current[i] = g)} position={[lx, 0.15, lz]}>
          <mesh material={toon(FUR)} position={[0, -0.07, 0]}>
            <capsuleGeometry args={[0.022, 0.11, 3, 6]} />
          </mesh>
        </group>
      ))}
      <mesh material={toon(FUR)} position={[0.2, 0.31, 0]} rotation-z={-0.45}>
        <capsuleGeometry args={[0.02, 0.2, 3, 6]} />
      </mesh>
      <group position={[-0.2, 0.3, 0]} rotation-y={0.4}>
        <CatHead eyeMat={eyeMat} />
      </group>
    </group>
  )
}

function CatHead({ rig, eyeMat }: { rig?: CatRig; eyeMat: MeshBasicMaterial }) {
  return (
    <>
      <mesh material={toon(FUR)} scale={[1, 0.9, 1.05]}>
        <sphereGeometry args={[0.09, 12, 10]} />
      </mesh>
      <mesh material={toon(MUZZLE)} position={[-0.075, -0.025, 0]} scale={[0.6, 0.7, 1]}>
        <sphereGeometry args={[0.04, 8, 6]} />
      </mesh>
      <mesh material={toon('#C98A9A')} position={[-0.098, -0.008, 0]}>
        <sphereGeometry args={[0.009, 6, 4]} />
      </mesh>
      {[-1, 1].map((side, i) => (
        <mesh
          key={side}
          ref={rig ? (m) => (rig.eyes.current[i] = m) : undefined}
          material={eyeMat}
          position={[-0.078, 0.015, side * 0.038]}
          scale={[0.4, 1, 1]}
        >
          <sphereGeometry args={[0.017, 8, 6]} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <group key={side} ref={rig ? (side < 0 ? rig.earL : rig.earR) : undefined} position={[0.005, 0.07, side * 0.048]}>
          <mesh material={toon(FUR)} position={[0, 0.03, 0]}>
            <coneGeometry args={[0.032, 0.075, 4]} />
          </mesh>
          <mesh material={toon('#5A3E5C')} position={[-0.012, 0.025, 0]} scale={[0.4, 1, 0.6]}>
            <coneGeometry args={[0.022, 0.05, 4]} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function TailSegment({ index, refs }: { index: number; refs: RefObject<(Group | null)[]> }) {
  return (
    <group ref={(g) => (refs.current[index] = g)} rotation-z={0.2}>
      <mesh material={toon(index === 4 ? FUR_HI : FUR)} position={[0.012, 0.035, 0]}>
        <capsuleGeometry args={[0.019 - index * 0.002, 0.05, 3, 6]} />
      </mesh>
      {index < 4 && (
        <group position={[0.012, 0.07, 0]}>
          <TailSegment index={index + 1} refs={refs} />
        </group>
      )}
    </group>
  )
}
