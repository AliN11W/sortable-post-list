// Check if two arrays are equal regardless of the order of the elements
export const isEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a.length !== b.length) return false;

  const aSorted = a.slice().sort();
  const bSorted = b.slice().sort();

  return aSorted.every((value, index) => value == bSorted[index]);
};

export const rangeFromZeroToN = (n: number): number[] => {
  return Array.from({ length: n }, (_, index) => index);
};
