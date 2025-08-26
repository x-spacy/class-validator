export function isCRM(document: string) {
  return /^(CRM\s)?(300-)?(EME-)?\d{1,6}(-P)?\/(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/.test(document);
}
