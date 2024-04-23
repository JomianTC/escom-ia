import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useWordByWord } from '../Profesores/components/WordByWord'

export function ChatbotPage () {
  const [recentQuestions, setRecentQuestions] = useState([''
  ])

  const [chatResponses, setChatResponses] = useState([''])
  const [expand, setExpand] = useState(false)
  const { setIaClicked, startIASubmit, isIALoading, showingPartial, partialResponse } = useWordByWord()
  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: async (values) => {
      console.log(chatResponses)
      setRecentQuestions((prev) => {
        return [...prev, values.message]
      })
      setIaClicked(true)
      const response = await startIASubmit({ type: 'procedure', values: 'Hola a todos quiero informacion del procedimiento' })
      console.log(response)

      setChatResponses((prev) => [...prev, response])
    }
  })
  const handleExpand = () => {
    setExpand(!expand)
  }
  useEffect(() => {
    const resetStateOnResize = () => {
      if (window.innerWidth > 640) {
        setExpand(false)
      }
    }
    window.addEventListener('resize', resetStateOnResize)
    return () => {
      setExpand(false)
    }
  }, [])
  return (
    <section className="container p-8 w-full h-full my-0 mx-auto grid gap-2 sm:gap-6 relative grid-cols-4 z-50">
      {/* Lado preguntas recientes */}
      <aside className={`border-4 bg-bg_200   ${expand ? 'absolute w-full h-full top-0 left-0 z-[50] ' : 'hidden sm:block'}`}>
        {
          recentQuestions.map((question) => (
            <div key={uuid()} className="p-4 border-b-2 border-primary_200 cursor-pointer">
              <p className='italic text-nowrap text-ellipsis overflow-hidden'
                onClick={async () => {
                  setExpand(false)
                  await formik.setFieldValue('message', question)
                }}
              >{question}</p>
            </div>
          ))
        }
      </aside>
      {/* Lado chatbot */}
      <article className="chatbot__container col-span-full sm:col-span-3  p-4 rounded-lg flex flex-col h-full justify-between glass ">
        <header className="chatbot__header bg-primary_200 p-4 flex items-center justify-between rounded-md">
          <h1 className="text-2xl font-bold text-white">Chatbot</h1>
          <button onClick={handleExpand} className="bg-primary_100 p-2 rounded-full block md:hidden ">
            <img src="/icons/expand.webp" alt="expand" />
          </button>
        </header>
        <main className=" p-4 grow ">
          <div className="max-h-[300px] sm:max-h-[500px] custom-scrollbar overflow-y-scroll chatbot__messages">
            <div className="chatbot__message">
              <p className="chatbot__text">Hola, soy tu asistente virtual, ¿En qué puedo ayudarte?</p>
              {recentQuestions.map((question, index) => (
                <div key={uuid()} className="chatbot__message">
                  <p className="font-bold py-2">{question}</p>

                  { index === chatResponses.length - 1 ? <p></p> : <p className="italic">{chatResponses[index]}</p>}
                </div>
              ))}
              <p>{partialResponse }</p>
            </div>
          </div>
        </main>
        <footer className="">
          <form onSubmit={formik.handleSubmit} className="chatbot__form flex gap-8">
            <input type="text" name='message' onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.message} placeholder="Escribe tu mensaje aquí" className="chatbot__input" />
            <button type="submit" disabled={isIALoading || showingPartial } className="chatbot__button bg-bg_200 drop-shadow-md  rounded-full w-14 h-12 disabled:opacity-40">
              <img src="/icons/send.webp" width={32} className='mx-auto invert' alt="send" />
            </button>
          </form>
        </footer>
      </article>
    </section>
  )
}
