import { useGetIAComment } from '@/api/ia/use-get-comment'
import { useEffect, useState } from 'react'

export function useWordByWord () {
  const createComment = useGetIAComment()
  const [iaClicked, setIaClicked] = useState(false) // Nuevo estado para indicar si el botón de IA ha sido presionado
  const [partialResponse, setPartialResponse] = useState('')
  const [showingPartial, setShowingPartial] = useState(false)
  const [response, setResponse] = useState('')
  useEffect(() => {
    if (response !== '') {
      setIaClicked(false)
      setShowingPartial(true)
      setPartialResponse('')
      let currentIndex = 0
      const interval = setInterval(() => {
        setPartialResponse((prevResponse) => {
          const nextWord = response.split(' ')[currentIndex]
          currentIndex++
          if (currentIndex >= response.split(' ').length) {
            clearInterval(interval)
            setIaClicked(false)
            // setShowingPartial(false)
            return prevResponse
          }
          return prevResponse + ' ' + nextWord
        })
      }, 200) // Cambia el valor del intervalo según lo rápido que quieras que aparezcan las palabras
      return () => { clearInterval(interval) }
    }
  }, [response, iaClicked])

  type CommentIa = {
    type: 'comment'
    values: string[]
  }
  type ProcedureIA = {
    type: 'procedure'
    values: number
  }

  type IAFunctionResponse = CommentIa | ProcedureIA

  async function startIASubmit (params: IAFunctionResponse) {
    const { type, values } = params
    if (type === 'comment') {
      const iaResponse = await createComment.mutateAsync(values)
      setResponse(iaResponse.mensaje as string)
      setIaClicked(false)
    }
    if (type === 'procedure') {
      // Aqui se puede hacer algo si se recibe un procedimiento
    }
  }
  const handleStateReset = () => {
    setResponse('')
    setPartialResponse('')
    setShowingPartial(false)
  }
  return (
    { iaClicked, setIaClicked, partialResponse, showingPartial, response, setResponse, startIASubmit, handleStateReset }
  )
}
