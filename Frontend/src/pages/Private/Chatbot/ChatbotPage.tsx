import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import uuid from 'react-uuid'
import { useWordByWord } from '../../hooks/useWordByWord'

export function ChatbotPage () {
  // const [recentQuestions, setRecentQuestions] = useState<string[]>([] as string[])
  // const [chatResponses, setChatResponses] = useState([] as string[])
  // const [expand, setExpand] = useState(false)
  const [answerResponse, setAnswerResponse] = useState([] as string[])
  const { setIaClicked, startIASubmit, isIALoading, showingPartial, partialResponse } = useWordByWord('procedure')
  const propmptRef = useRef<HTMLInputElement>(null)
  const formik = useFormik({
    initialValues: {
      message: '',
      second: ''
    },
    onSubmit: async (values) => {
      if (propmptRef.current != null) propmptRef.current.value = ''
      const userPrompt = values.message
      await formik.setFieldValue('second', userPrompt)
      if (userPrompt.trim() === '') {
        return
      }
      setIaClicked(true)
      // setAnswerResponse((prev) => [...prev, userPrompt])

      await startIASubmit({ type: 'procedure', values: [...answerResponse, userPrompt] }).then((res) => {
        setAnswerResponse((prev) => [...prev, userPrompt, res])
        // setChatResponses((prev) => [...prev, res])
        formik.resetForm()
      })
    }
  })
  // console.log({ recentQuestions, chatResponses, answerResponse, partialResponse })

  return (
    <section className="container p-8 w-full h-full my-0 mx-auto grid  relative  z-50  ">
      {/* Lado preguntas recientes */}
      {/* <aside className={`border-4 border-accent_200 -right-4 ${expand ? 'absolute w-full h-full top-0 left-0 z-[50] bg-bg_200' : 'hidden sm:block scale-95'}`}>
        {
          recentQuestions?.map((question) => (
            <div key={uuid()} className="px-2 py-1 text-left font-semibold border-b-2 border-primary_200 cursor-pointer shadow-lg transition-all duration-200 bg-accent_100 text-white  ">
              <p className='italic text-nowrap text-ellipsis overflow-hidden'
                onClick={async () => {
                  setExpand(false)
                  await formik.setFieldValue('message', question)
                }}
              >{question}</p>
            </div>
          ))
        }
      </aside> */}
      {/* Lado chatbot */}
      <article className="chatbot__container col-span-full sm:col-span-3  p-4 rounded-lg flex flex-col h-full justify-between glass ">
        <header className="chatbot__header bg-primary_200 p-4 flex items-center justify-between rounded-md">
          <h1 className="text-2xl font-bold text-white">Chatbot</h1>
          {/* <button onClick={handleExpand} className="bg-primary_100 p-2 rounded-full block md:hidden ">
            <MenuIcon styles='stroke-2 w-10 h-10 fill-primary_200' />
          </button> */}
        </header>
        <main className=" p-4 grow ">
          <div className="max-h-[300px] sm:max-h-[500px] custom-scrollbar overflow-y-scroll chatbot__messages">
            <div className="chatbot__message">
              <p className="chatbot__text">Hola, soy tu asistente virtual, ¿En qué puedo ayudarte?</p>
              {answerResponse.map((_, index) => (
                <div key={uuid()} className="chatbot__message">
                  <p className={index % 2 !== 0 ? 'font-bold' : 'font-light' }>{answerResponse[index - 1]}</p>
                  {/* <p className="font-bold">{answerResponse[index - 1]}</p> */}
                </div>
              ))}
              <p className='font-light'>{partialResponse}</p>
              {formik.isSubmitting && <p className='font-bold'>{formik.values.message }</p>}
            </div>
          </div>
        </main>
        <footer className="">
          <form onSubmit={formik.handleSubmit} className="chatbot__form flex gap-8">
            <input autoComplete='off' type="text" name='message' onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message} placeholder="Escribe tu mensaje aquí" className={`chatbot__input ${(isIALoading || showingPartial) ? 'white' : 'black'}`}
              disabled={isIALoading || showingPartial}
            ref= {propmptRef}
            />
            <button type="submit" disabled={isIALoading || showingPartial} className="chatbot__button bg-bg_200 drop-shadow-md  rounded-full w-14 h-12 disabled:opacity-40">
              <img src="/icons/send.webp" width={32} className='mx-auto invert' alt="send" />
            </button>
          </form>
        </footer>
      </article>
    </section>
  )
}
