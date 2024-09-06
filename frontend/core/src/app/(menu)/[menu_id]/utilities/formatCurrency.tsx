const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "IRR",
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
