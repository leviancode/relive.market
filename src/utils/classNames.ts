/**
 * Utility function to join class names together
 * @param classes - Class names to join
 * @returns Joined class names
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
} 