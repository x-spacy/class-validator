export function IsRG(document: string): boolean {
  document = document.replace(/[^0-9]/g, '');

  if (document.length !== 9) {
    return false;
  }

  const digits = document.substring(0, 8);
  const firstVerifier = document.charAt(8);

  if (!/^\d{8}$/.test(digits)) {
    return false;
  }

  const weights = [ 2, 3, 4, 5, 6, 7, 8, 9 ];

  let sum = 0;

  for (let i = 0; i < 8; i++) {
    const digit = parseInt(digits.charAt(7 - i), 10);

    sum += digit * weights[i];
  }

  const remaining = sum % 11;
  const calculatedVerifiedDigit = 11 - remaining;

  let secondVerifier: string;

  if (calculatedVerifiedDigit === 11) {
    secondVerifier = '0';
  } else if (calculatedVerifiedDigit === 10) {
    secondVerifier = 'X';
  } else {
    secondVerifier = calculatedVerifiedDigit.toString();
  }

  return secondVerifier === firstVerifier;
}
