export function formatTnd(value: number | string | { toString(): string }) {
  const amount = typeof value === 'number' ? value : Number(value.toString());
  return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', minimumFractionDigits: 3 }).format(amount);
}
