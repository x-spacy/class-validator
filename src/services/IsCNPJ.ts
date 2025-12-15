export function isCNPJ(document: string) {
  document = document.replace(/[^0-9]/g, '');

  if (document.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(document)) {
    return false;
  }

  const weights1 = [ 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];
  const weights2 = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];

  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(document.charAt(i)) * weights1[i];
  }

  const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  sum = 0;

  for (let i = 0; i < 13; i++) {
    sum += parseInt(document.charAt(i)) * weights2[i];
  }

  const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return digit1 === parseInt(document.charAt(12)) && digit2 === parseInt(document.charAt(13));
}
