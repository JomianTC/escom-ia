import { ErrorPage } from '@/pages/ErrorPage'
import { Route, Routes } from 'react-router-dom'

export default function RoutesWithNotFound ({ children }: { children: React.ReactNode }) {
  return (
        <Routes>
            {children}
            <Route path="*" element={<ErrorPage/>} />
        </Routes>

  )
}
