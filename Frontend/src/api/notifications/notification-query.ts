export const notificationsQueryKeys = {
  all: ['notifications'],
  details: () => [...notificationsQueryKeys.all, 'notification'],
  detail: (id: number | string) => [...notificationsQueryKeys.details(), id]
}
