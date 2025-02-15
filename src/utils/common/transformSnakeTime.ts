export const transformISODate = (time: number) => {
  return new Date(time).toISOString().split('T')[0];
};
