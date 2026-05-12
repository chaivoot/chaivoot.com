import type { ReactNode } from 'react';
import { FitnessApp } from './mocks/fitness';

const PROTOTYPE_MAP: Record<string, () => ReactNode> = {
  fitness: () => <FitnessApp />,
};

export function getPrototype(slug: string): ReactNode | null {
  const factory = PROTOTYPE_MAP[slug];
  return factory ? factory() : null;
}

export function hasPrototype(slug: string): boolean {
  return slug in PROTOTYPE_MAP;
}
