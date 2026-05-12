import type { ReactNode } from 'react';
import { FitnessApp } from './mocks/fitness';
import { PetApp } from './mocks/pet';
import { AstroApp } from './mocks/astro';
import { ElderApp } from './mocks/elder';

const PROTOTYPE_MAP: Record<string, () => ReactNode> = {
  fitness: () => <FitnessApp />,
  pet:     () => <PetApp />,
  astro:   () => <AstroApp />,
  elder:   () => <ElderApp />,
};

export function getPrototype(slug: string): ReactNode | null {
  const factory = PROTOTYPE_MAP[slug];
  return factory ? factory() : null;
}

export function hasPrototype(slug: string): boolean {
  return slug in PROTOTYPE_MAP;
}
