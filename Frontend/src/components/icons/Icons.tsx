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

export const LinkIcon = ({ stroke = '#fff', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 15l6 -6" />
  <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
  <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
  </svg>
  )
}

export const ReturnIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19 5v6a3 3 0 0 1 -3 3h-7" />
  <path d="M13 10l-4 4l4 4m-5 -8l-4 4l4 4" />
</svg>)
}

export const MailIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
  <path d="M3 7l9 6l9 -6" />
</svg>
  )
}

export const BuildIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 21l18 0" />
  <path d="M9 8l1 0" />
  <path d="M9 12l1 0" />
  <path d="M9 16l1 0" />
  <path d="M14 8l1 0" />
  <path d="M14 12l1 0" />
  <path d="M14 16l1 0" />
  <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
</svg>
  )
}

export const CommentIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
</svg>
  )
}

export const Fileicon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M9 15l2 2l4 -4" />
</svg>
  )
}

export const FormIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M13 5h8" />
  <path d="M13 9h5" />
  <path d="M13 15h8" />
  <path d="M13 19h5" />
  <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
  <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
</svg>
  )
}

export const ImageIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M15 8h.01" />
    <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
    <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
  </svg>
  )
}

export const DonwloadIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
  <path d="M12 17v-6" />
  <path d="M9.5 14.5l2.5 2.5l2.5 -2.5" />
</svg>
  )
}

export const DashboardIconAdmin = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
</svg>
  )
}

export const MenuIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 4h6v6h-6z" />
  <path d="M14 4h6v6h-6z" />
  <path d="M4 14h6v6h-6z" />
  <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
</svg>
  )
}

export const CloseIcon = ({ stroke = '', color = '', styles = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-calendar-time ${styles}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke={ stroke} fill={color} strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
  <path d="M9 9l6 6m0 -6l-6 6" />
</svg>
  )
}
