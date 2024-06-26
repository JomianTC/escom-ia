export const commentsQueryKeys = {
  all: ['comments'],
  allByUser: ['commentsUser'],
  details: () => [...commentsQueryKeys.all, 'detail'],
  detail: (id: number) => [...commentsQueryKeys.details(), id],
  pagination: (page: number) => [...commentsQueryKeys.all, 'pagination', page],
  infinite: () => [...commentsQueryKeys.all, 'infinite']
}
