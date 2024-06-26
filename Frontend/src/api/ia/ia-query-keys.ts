// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const iaQueryKeys = {
  all: ['comment'],
  details: () => [...iaQueryKeys.all, 'detail'],
  detail: (id: number) => [...iaQueryKeys.details(), id]
}
