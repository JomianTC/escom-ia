interface ObjectToLink {
  link: string
  title: string
}
export function formatLinks (objectLinks: ObjectToLink) {
  if (!(objectLinks instanceof Object) || objectLinks === undefined) return []
  return Object.entries(objectLinks).flat().map((value, index) => {
    return index % 2 !== 0 ? `${value.link},${value.title}` : null
  }).filter(value => value !== null)
}
