export const proceduresQueryKeys = {
  all: ['procedures'],
  details: () => [...proceduresQueryKeys.all, 'detail'],
  detail: (id: number) => [...proceduresQueryKeys.details(), id],
  pagination: (page: number) => [...proceduresQueryKeys.all, 'pagination', page],
  infinite: () => [...proceduresQueryKeys.all, 'infinite']
}
