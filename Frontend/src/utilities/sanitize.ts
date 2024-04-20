import DOMPurify from 'dompurify'

export function createMarkup (dirty: string) {
  return { __html: DOMPurify.sanitize(dirty) }
}
