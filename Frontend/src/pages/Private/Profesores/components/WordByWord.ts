import { useGetIAComment } from '@/api/ia/use-get-comment'
import { useAskSomething } from '@/api/ia/use-get-response'
import { useEffect, useState } from 'react'

export function useWordByWord () {
  const createComment = useGetIAComment()
  const getIAInstruction = useAskSomething()
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
          if (currentIndex > response.split(' ').length) {
            // clearInterval(interval)
            setIaClicked(false)
            setResponse('')
            setShowingPartial(false)
            return prevResponse
          }
          return prevResponse + ' ' + nextWord
        })
      }, 100) // Cambia el valor del intervalo según lo rápido que quieras que aparezcan las palabras
      return () => { clearInterval(interval) }
    }
  }, [response, iaClicked])

  type CommentIa = {
    type: 'comment'
    values: string[]
  }
  type ProcedureIA = {
    type: 'procedure'
    values: string
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
      const iaResponse = await getIAInstruction.mutateAsync(values)
      setResponse(iaResponse.mensaje as string)
      setIaClicked(false)
      setShowingPartial(false)
      return iaResponse.mensaje as string
      // Aqui se puede hacer algo si se recibe un procedimiento
    }
    return response
  }
  const handleStateReset = () => {
    setResponse('')
    setPartialResponse('')
    setShowingPartial(false)
  }
  return (
    { iaClicked, setIaClicked, partialResponse, showingPartial, response, setResponse, startIASubmit, handleStateReset, isIALoading: createComment.isPending || getIAInstruction.isPending }
  )
}
