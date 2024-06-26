export const teacherQueryKeys = {
  all: ['teachers'],
  details: () => [...teacherQueryKeys.all, 'detail'],
  detail: (id: number | string) => [...teacherQueryKeys.details(), id],
  pagination: (page: number) => [...teacherQueryKeys.all, 'pagination', page],
  infinite: () => [...teacherQueryKeys.all, 'infinite'],
  delete: (id: string) => ['deleteTeacher', id]
}
