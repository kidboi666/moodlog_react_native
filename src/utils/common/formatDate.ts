export const formatDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const date = value.getDate().toString().padStart(2, '0');
  const day = value.getDay();
  return { year, month, date, day };
};
