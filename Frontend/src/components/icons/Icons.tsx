export const Calendar = ({ stroke = '#fff', color = '', styles = '' }) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M15 3v4" />
            <path d="M7 3v4" />
            <path d="M3 11h16" />
            <path d="M18 16.496v1.504l1 1" />
        </svg>
  )
}

export function Clock ({ stroke = '#fff', color = '', styles = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l3 2" />
    <path d="M12 7v5" />
  </svg>
  )
}

export function DeleteProcedure ({ stroke = '#fff', color = '', styles = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M9 14l6 0" />
  </svg>
  )
}
export function AddProcedure ({ stroke = '#fff', color = '', styles = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M12 11l0 6" />
  <path d="M9 14l6 0" />
</svg>
  )
}

export function EditIcon ({ stroke = '#fff', color = '', styles = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
  <path d="M13.5 6.5l4 4" />
</svg>
  )
}

export function RemoveIcon ({ stroke = '#fff', color = '', styles = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 7l16 0" />
  <path d="M10 11l0 6" />
  <path d="M14 11l0 6" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
  )
}
