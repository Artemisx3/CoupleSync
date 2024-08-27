// utils/parseDate.ts
export const parseDate = (dateString: string): Date => {
  const [datePart, timePart] = dateString.split('-');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes); // month is 0-based
};
