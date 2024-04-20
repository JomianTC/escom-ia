import { format, parse } from '@formkit/tempo'

export function dateFormatter (date: string) {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()
  return `${day}/${month}/${year}`
}

export function getDate (fecha: string) {
  const date = new Date(fecha)

  if (date === 'Invalid Date') {
    return fecha
  }

  if (isNaN(date.getTime())) {
    return fecha
  }
  try {
    return format(date, 'short')
  } catch (e) {
    return format(parse(fecha, 'DD,MM,YYYY'), 'short')
  }
}
