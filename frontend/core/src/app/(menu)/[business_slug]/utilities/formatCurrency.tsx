// NOTE correct usage order if needed to be used together: toPersianDigits(addCommas(roundToThousands(price)))

// Add commas to a number
export function addCommas(num: number): string {
  return num.toLocaleString("en-US");
}

// Convert digits (string or number) to Persian
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

// Round to nearest thousand
export function roundToThousands(num: number): number {
  return Math.round(num / 1000);
}
