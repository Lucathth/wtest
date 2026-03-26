import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class strings, resolving conflicts correctly.
 * e.g. cn('px-4', 'px-6') → 'px-6'  (tailwind-merge deduplicates)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
