export const teacherQueryKeys = {
  all: ['teachers'],
  details: () => [...teacherQueryKeys.all, 'detail'],
  detail: (id: number) => [...teacherQueryKeys.details(), id],
  pagination: (page: number) => [...teacherQueryKeys.all, 'pagination', page],
  infinite: () => [...teacherQueryKeys.all, 'infinite']
}
