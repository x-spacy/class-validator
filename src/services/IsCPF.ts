export function IsCPF(document: string) {
  if (document.length !== 11) {
    return false;
  }

  const digits = document.split('').map(Number);

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  let firstVerifier = (sum * 10) % 11;

  if (firstVerifier === 10 || firstVerifier === 11) {
    firstVerifier = 0;
  }

  if (firstVerifier !== digits[9]) {
    return false;
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }

  let secondVerifier = (sum * 10) % 11;

  if (secondVerifier === 10 || secondVerifier === 11) {
    secondVerifier = 0;
  }

  if (secondVerifier !== digits[10]) {
    return false;
  }

  return true;
}
