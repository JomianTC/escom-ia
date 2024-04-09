// TEACHERS

// COMENTARIOS
type Comentario = {
  puntuacion: number
  comentario: string
  fecha: string
}
type StudentComment = {
  nombres: string
  apellidos: string
  foto_perfil: string
}
export interface CommentByTeacher {
  comentario: Comentario
  usuario: StudentComment
  tags: string[]
}
export type CommentsByTeacherResponse = {
  length?: number
  comentarios: CommentByTeacher[]
  total: number
}
export type CommentCreatedResponse = {
  message: string
}
export interface CommentUpdatedResponse extends CommentByTeacher {
  message: string
}
export interface DeleteCommentRespose {
  message: string
}
const comentario: CommentsByTeacherResponse = {
  comentarios: [{
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
console.log(comentario)
