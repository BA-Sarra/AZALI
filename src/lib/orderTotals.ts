export type TotalLine = { unitPrice: number; quantity: number };

export function calculateOrderTotals(lines: TotalLine[], shippingFee: number) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  return { subtotal, shippingFee, total: subtotal + shippingFee };
}
