import { type Student } from '.'
// TEACHERS

// COMENTARIOS
type Comentario = {
  puntuacion: number
  comentario: string
  fecha: string
}

type ComentarioDeUsuario = Pick<
Student,
'nombres' | 'apellidos' | 'foto_perfil'
>
export interface CommentByTeacher {
  comentario: Comentario
  usuario: ComentarioDeUsuario
  tags: string[]
}

export type CommentsByTeacherResponse = {
  comments: CommentByTeacher[]
  total: number
}

export type CommentCreatedRespose = {
  message: string
}

export interface CommentUpdatedResponse extends CommentByTeacher {
  message: string
}

export interface CommentCreatedResponse extends CommentsByTeacherResponse { }

export interface DeleteCommentRespose {
  id: string
  user: Student
}

const comentario: CommentsByTeacherResponse = {
  comments: [{
    comentario: {
      puntuacion: 5,
      comentario: 'Muy buen profesor',
      fecha: '2021-10-10'
    },
    usuario: {
      nombres: 'Juan',
      apellidos: 'Perez',
      foto_perfil: 'https://example.com'
    },
    tags: ['tag1', 'tag2']
  }
  ],
  total: 1
}

export type FindOneCommentResponse = CommentByTeacher

const commentCreated: CommentCreatedResponse = {
  comments: [
    {
      comentario: {
        puntuacion: 5,
        comentario: 'Muy buen profesor',
        fecha: '2021-10-10'
      },
      usuario: {
        nombres: 'Juan',
        apellidos: 'Perez',
        foto_perfil: 'https://example.com'
      },
      tags: ['tag1', 'tag2']
    }
  ],
  total: 1
}
console.log(comentario)
console.log(commentCreated)
