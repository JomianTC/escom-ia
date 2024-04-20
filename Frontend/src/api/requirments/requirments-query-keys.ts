export const requirmentsQueryKeys = {
  all: ['requirments'],
  details: () => [...requirmentsQueryKeys.all, 'detail'],
  detail: (id: number) => [...requirmentsQueryKeys.details(), id],
  pagination: (page: number) => [...requirmentsQueryKeys.all, 'pagination', page],
  infinite: () => [...requirmentsQueryKeys.all, 'infinite']
}
