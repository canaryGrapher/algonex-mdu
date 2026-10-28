/** Formats a number as Indian Rupees with Indian digit grouping, e.g. ₹1,40,000. */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
