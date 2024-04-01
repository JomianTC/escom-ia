import { Route, Routes } from 'react-router-dom'

export default function RoutesWithNotFound ({ children }: { children: React.ReactNode }) {
  return (
        <Routes>
            {children}
            <Route path="*" element={<h1>Not found sorry</h1>} />
        </Routes>

  )
}
