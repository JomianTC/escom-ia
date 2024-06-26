import DOMPurify from 'dompurify'

export function createMarkup (dirty: string) {
  return { __html: DOMPurify.sanitize(dirty) }
}

export function getAnchorTags (dirty: string) {
  const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[\s\S]*?>(.*?)<\/a>/gi
  const newString = dirty.matchAll(regex)
  const anchorTags = []
  for (const coincidencia of newString) {
    const etiquetaCompleta = coincidencia[0] // La etiqueta completa <a> con su contenido
    const enlace = coincidencia[1] // El valor del atributo href
    const contenido = coincidencia[2] // El contenido dentro de la etiqueta <a>
    anchorTags.push({ etiquetaCompleta, enlace, contenido })
  }
  if (anchorTags.length > 0) {
    return anchorTags
  } else {
    return []
  }
}
