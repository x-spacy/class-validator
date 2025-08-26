export function isCRN(document: string) {
  return /^(CRN-([1-9]|1[0-2]))\s(\d*)(\/(P|D|S))?$/.test(document);
}
