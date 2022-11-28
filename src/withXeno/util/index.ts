export const randomNumber = (min: number, max: number) => {
  if (max - min <= 0) return 0;
  const diff = max - min;
  return min + Math.round(Math.random() * diff);
};
