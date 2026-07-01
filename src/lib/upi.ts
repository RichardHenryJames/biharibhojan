// UPI payment link + QR helpers.
// Collections go to this VPA; payment is confirmed manually on a call
// (small home kitchen — no payment-gateway webhook to auto-verify).
export const UPI_VPA = "parimal619@okhdfcbank";
export const UPI_PAYEE_NAME = "BihariBhojan";

export type UpiApp = "any" | "phonepe" | "gpay" | "paytm";

// App-specific deep-link schemes. `any` opens the system UPI chooser.
const SCHEMES: Record<UpiApp, string> = {
  any: "upi://pay",
  phonepe: "phonepe://pay",
  gpay: "tez://upi/pay",
  paytm: "paytmmp://pay",
};

/**
 * Build a UPI deep link with the amount + note pre-filled.
 * Spaces are encoded as %20 (not +) so every UPI app parses the note correctly.
 */
export function buildUpiLink(
  app: UpiApp,
  amount: number,
  note = "BihariBhojan order",
): string {
  const q = [
    `pa=${encodeURIComponent(UPI_VPA)}`,
    `pn=${encodeURIComponent(UPI_PAYEE_NAME)}`,
    `am=${Math.max(0, amount).toFixed(2)}`,
    "cu=INR",
    `tn=${encodeURIComponent(note)}`,
  ].join("&");
  return `${SCHEMES[app]}?${q}`;
}
