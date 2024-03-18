interface Estudiante {
  id: string
  nombre: string
  apellido: string
  boleta: string
  email_academico: string
  email_recuperacion: string
  programa_academico: string
  foto_perfil: string
}

export type EstudianteLogin = Pick<Estudiante, 'nombre' | 'boleta'>

interface Profesor {
  id?: string
  nombre: string
  area: string
  grado_academico: string
  email: string
  contacto: string
  foto_perfil: string
}

// Es informativo debería quitarse, ya que todo solo sera de consulta
interface Tramite {
  id: string
  nombre: string
  descripcion: string
  fecha_inicio: string
  fecha_termino: string
  estado: string
  esInformativo: boolean
}

interface Administrador {
  id: string
  nombre: string
  email: string
  contacto: string
  foto_perfil: string
}

interface Comentario {
  id: string
  id_profesor: Profesor.id
  id_usuario: Estudiante.id
  comentario: string
  fecha: string
}
