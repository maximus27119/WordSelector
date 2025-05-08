// @ts-ignore
export const removeArrayDuplicates = (array: Array<any>): any[] => [...new Set<any>(array)];

export const subtractArrays = (arrayA: Array<any>, arrayB: Array<any>): any[] => {
  const setTwo = new Set(arrayB);
  return arrayA.filter((item: any): boolean => !setTwo.has(item));
};
