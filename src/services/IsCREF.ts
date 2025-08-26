export function isCREF(document: string) {
  return /(\d{6})(-)(G|P)(\/(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO))$/.test(document);
}
