import { setToken } from '@/api/useAuthToken'
import { useEffect } from 'react'

export default function Dashboard () {
  useEffect(() => {
    setToken()
  }, [])
  return (
    <section className="w-full h-full max-w-screen-lg mx-auto vento p-8 sm:p-2 relative z-40 overflow-y-scroll hide-scrollbar ">
      <article className="rounded-xl p-4 border-4 relative">
        <h2 className="text-5xl">Centraliza tus Trámites Escolares</h2>
        <img src="/icons/logoCompleto.webp" alt="logo escom ++" className="w-96 absolute top-40 sm:top-24 sm:left-48 md:left-32 opacity-40" />
        <p className="text-lg line leading-9">
          <span className="highlighted-text"> Simplifica</span> tu experiencia académica al tener todos tus <span className="highlighted-text"> trámites</span> escolares en un solo lugar. Mantén un registro organizado y actualizado de cada trámite, recibe notificaciones importantes cuando se agregue un nuevo trámite o esté próximo a expirar. Además, accede a información <span className="highlighted-text"> detallada</span> sobre la documentación necesaria, el propósito del trámite y las fechas clave de inicio y termino. ¡<span className="highlighted-text"> Optimiza</span> tu tiempo y elimina la complejidad de busqueda!
        </p>
      </article>
      <article className="rounded-xl p-4 border-4">
        <h2 className="text-4xl">Conversa con el Chatbot</h2>
        <p className="text-base"> ¿Necesitas <span className="highlighted-text"> ayuda</span> rápida? Nuestro chatbot está aquí para asistirte. Interactúa con esta herramienta inteligente para obtener respuestas instantáneas a tus preguntas sobre <span className="highlighted-text"> trámites</span>, horarios, recursos y más. ¡Conversa ahora y <span className="highlighted-text"> Simplifica</span> tu vida estudiantil!</p>
      </article>
      <article className="rounded-xl p-6 border-4">
      <h2 className="text-4xl">Profesores </h2>
        <p className="text-base">
          <span className="highlighted-text">Encuentra y comparte</span>  opiniones sobre tus profesores favoritos en ESCOM. Con este espacio dedicado, puedes acceder a las <span className="highlighted-text"> valoraciones</span> y recomendaciones de otros estudiantes, así como dejar tus propias impresiones. <span className="highlighted-text"> Ayuda </span> a construir una <span className="highlighted-text"> comunidad</span> más informada y colaborativa.</p>
      </article>
      <article className="rounded-xl p-6 border-4">
      <h2 className="text-4xl">ESCOM ++ </h2>
        <p className="text-base"> Descubre nuestra Plataforma Web Progresiva <span className="highlighted-text"> (PWA)</span>, diseñada para la <span className="highlighted-text"> comunidad</span> de la <span className="highlighted-text"> ESCOM</span>
, con el objetivo de centralizar todas los avisos administrativas de ESCOM. Aquí encontrarás una recopilación de todos los trámites escolares, junto con la <span className="highlighted-text"> documentación</span>
 necesaria para su elaboración.</p>
      </article>
    </section>
  )
}
