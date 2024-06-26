import { FormLayout } from '@layouts/FormLayout'
import { useState } from 'react'
import { AdminForm } from './AdminForm/AdminForm'
import { StudentForm } from './StudentForm/StudentForm'
import { useNavigate } from 'react-router-dom'

export default function Register () {
  const [form, setForm] = useState(<StudentForm isUpdate={false} />)
  const [selected, setSelected] = useState('estudiante')
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => {
      setForm(prev === 'administrador' ? <StudentForm /> : <AdminForm />)
      return e.target.value
    })
  }

  const handleReturnToHome = () => {
    navigate('/home')
  }

  return (
        <>
            <FormLayout>
                <img
                    src="/icons/escomNegro.webp"
                    alt="escom plus"
                    className="w-40 cursor-pointer"
                    onClick={handleReturnToHome}
                />
                <div className="flex gap-4">
                    <label className="flex justify-center items-center form-selector">
                        <span className="text-lg p-2">Estudiante</span>
                        <input
                            className="input-form-selector"
                            type="radio"
                            onChange={handleChange}
                            value={'estudiante'}
                            checked={selected === 'estudiante'}
                        />
                        <div className="w-6 h-6 rounded-full radio-checked"></div>
                    </label>
                    <label className="flex justify-center items-center form-selector">
                        <span className="text-lg p-2">Administrador</span>
                        <input
                            className="input-form-selector"
                            type="radio"
                            value={'administrador'}
                            onChange={handleChange}
                            checked={selected === 'administrador'}
                        />
                        <div className="w-6 h-6 rounded-full radio-checked"></div>
                    </label>
                </div>
                {form}
            </FormLayout>
        </>
  )
}
