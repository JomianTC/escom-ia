export const tagQueryKeys = {
  all: ['tags'],
  details: () => [...tagQueryKeys.all, 'detail'],
  detail: (id: number) => [...tagQueryKeys.details(), id],
  pagination: (page: number) => [...tagQueryKeys.all, 'pagination', page],
  infinite: () => [...tagQueryKeys.all, 'infinite']
}
