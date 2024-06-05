import { API_URLS, procedureClient } from '@/api'
import { useAppSelector } from '@/store/hooks/useAppSelector'
import { type AllProceduresAdminResponse } from '@/types/api-responses'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { proceduresQueryKeys } from './procedures-query-keys'

const placeHolderProcedures: AllProceduresAdminResponse = {
  tramites: [{
    tramite:
    {
      id: '8591b88c-cfe0-4231-9488-751335fdb529',
      nombre: 'Servicio Social',
      descripcion: ' <p style="font-size:18px; text-align:justify">Es un requisito indispensable para el proceso de titulación profesional. Se cubre al realizar actividades relacionadas con los conocimientos adquiridos en las aulas, talleres y laboratorios, por lo tanto, se considera como una retribución que hace el egresado a la sociedad que le dio la oportunidad de obtener una profesión. Los requisitos (tomados del Reglamento de Servicio Social del IPN) para prestar el Servicio Social dentro del Instituto Politécnico Nacional se enumeran a continuación:</p> <ul style="font-size:18px; text-align:justify"> <li><b>Artículo 7.</b> Por sus funciones y fines académicos, el servicio social estará desvinculado de cualquier relación de carácter laboral y no podrá otorgar categoría de trabajador al prestador bajo ninguna circunstancia, con excepción de lo señalado en el artículo 20 del presente <a href="https://www.aplicaciones.abogadogeneral.ipn.mx/PDFS/Normatividad/carpeta4/GAC_EXT_932B_reglamento_serv_social.pdf" target="_blank">Reglamento</a>.</li> <li><b>Artículo 11.</b> El servicio deberá prestarse dentro de los programas que al efecto se convengan con los sectores público, social y privado, así como los que establezca el propio instituto</li> <li><b>Artículo 13.</b> El servicio que se realice en programas intrainstitucionales será gratuito</li> <li><b>Artículo 14.</b> El servicio deberá prestarse durante un periodo mínimo de seis meses y máximo de dos años, quedando determinado el mismo por las características del programa al que este adscrito el prestador y su duración no podrá ser menor de cuatrocientas ochenta horas. La prestación será continua a efecto de que pueda cumplir sus objetivos</li> <li><b>Artículo 15.</b> El servicio que realicen los prestadores nacionales o extranjeros de los planteles deberá realizarse en el territorio de la República Mexicana, en beneficio de la sociedad y el estado mexicano</li></ul><b>Solicitud de constancia INDISPENSABLE al momento de realizar el registro:</b> <a href="https://forms.office.com/pages/responsepage.aspx?id=2fRL-ZeAlEet9qVGbKKFY-JLdN8w-KlBnYjodQmtWMpUQVNQMjdMQVFGNkY3RzdZVUZZUFlVTTVBWi4u">Link al Formulario</a> ',
      fechaInicio: '',
      fechaTermino: '',
      esInformativo: true,
      links: {
        link: 'https://www.escom.ipn.mx/SSEIS/apoyoseducativos/docs/Registro_de_SS_presencial_dentro_de_la_ESCOM.JPG',
        title: 'Registro de SS presencial dentro de la ESCOM'
      },
      estado: false
    },
    requerimientos: ['Boleta', 'Varía dependiendo si es presencial o a distancia', 'Constancia de Servicio Social', 'Prestador asegurado']
  },
  {
    tramite: {
      id: '8591b88c-cas0-4231-9488-801335fdb529',
      nombre: 'Reportes Servicio Social SISS',
      descripcion: "Recopilatorio de los documentos generales para subir a la plataforma del SISS. Mantente atento al llenado de los formatos y a la fecha de entrega de los mismos, recuerda que si es a distancia <b>NO LLEVAN FIRMAS</b>. Si estan consciente de que <b>no podrás cargar el reporte posterior a los 5 días despues de tu ultima fecha valida debes enviar un correo a  <a href='mailto:servicio_social_escom@ipn.mx'></a> </b>  ",
      fechaInicio: '',
      fechaTermino: '',
      estado: false,
      esInformativo: true,
      links: {
        link: 'https://www.escom.ipn.mx/SSEIS/apoyoseducativos/docs/Registro_de_SS_presencial_dentro_de_la_ESCOM.JPG',
        title: 'Reporte de Servicio Social'
      }
    },
    requerimientos: [
      'Reportes por periodo',
      'Registro SISS autorizado'
    ]
  }
  ],
  total: 2
}

export function useProcedures (resultLimit = 10000) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? 1)
  const [limit, setLimit] = useState(resultLimit)
  const { rol } = useAppSelector((state) => state.auth)

  // https://tanstack.com/query/latest/docs/react/guides/optimistic-updates
  const getProcedures = async (page = 1, limit = 100) => {
    try {
      if (rol === 'admin') {
        const response = await procedureClient.get(API_URLS.procedures.getProceduresAdmin + `?page=${page}&limit=${limit}`)
        const data: AllProceduresAdminResponse = response.data
        return data
      } else {
        const response = await procedureClient.get(API_URLS.procedures.getProceduresUser + `?page=${page}&limit=${limit}`)
        const data: AllProceduresAdminResponse = response.data
        return data
      }
    } catch (error) {
      return {
        tramites: [],
        total: 0
      }
      // return placeHolderProcedures
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: proceduresQueryKeys.all,
    queryFn: async () => await getProcedures(Number(page), limit),
    placeholderData: placeHolderProcedures
  })

  const handlePageChange = (page: number) => {
    if (page < 1) return
    setPage(Number(page))
    const searchParams = new URLSearchParams()
    searchParams.set('page', page.toString())
    setSearchParams(searchParams.toString())
  }

  return {
    handlePageChange,
    page: Number(page),
    data: data?.tramites ?? [],
    isLoading,
    isError,
    totalPages: Math.round(((data?.total ?? 30) / limit) ?? 0),
    setLimit
  }
}
