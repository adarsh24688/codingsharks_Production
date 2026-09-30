type Range = [number, number];

export const DIVE: Range = [0.03, 0.25];
export const PANS: Range[] = [
  [0.34, 0.46],
  [0.71, 0.83],
];
export const RISE: Range = [0.5, 0.61];
export const FALL: Range = [0.91, 1];
export const CHAPTER_COUNT = 4;
export const SLOTS = [0, 1, 1, 2];
export const RISEN = 2;

const span = (progress: number, [from, to]: Range) =>
  Math.min(1, Math.max(0, (progress - from) / (to - from)));

export function panAt(progress: number) {
  return PANS.reduce((sum, range) => sum + span(progress, range), 0);
}

export function riseAt(progress: number) {
  return span(progress, RISE);
}

export function fallAt(progress: number) {
  return span(progress, FALL);
}
