import { useIsActive } from '@/api/notifications/use-is-active'
import { useUnsubscribe } from '@/api/notifications/use-unsubscribe'
import { useSubscribe } from '@/api/notifications/useSubscribe'
import { BellIconChecked } from '@/components/icons/Icons'
type NotificationAction = 'eliminar' | 'suscribir'
export function NotificationButton () {
  // Brinda la informacion de norificaciones true o false
  const { data: isActive } = useIsActive()

  const removeSubscription = useUnsubscribe()
  const addSubscription = useSubscribe()

  const handleNotification = async (action: NotificationAction) => {
    if (action === 'eliminar') {
      await removeSubscription.mutateAsync()
    } else {
      await addSubscription.mutateAsync()
    }
  }

  return (
        <div className="fixed bottom-0 sm:top-0 right-0 sm:left-0 h-fit w-fit">
            <button
                className={`overflow-hidden flex items-center gap-2 rounded-lg border-2 border-accent_100 text-text_100 font-light text-base p-1 button-reset ml-1 mt-1 ${
                    isActive?.estado === true ? 'bg-yellow-300 hover:bg-transparent' : 'bg-transparent hover:bg-yellow-300'
                }`}
                onClick={async () => {
                  const action = isActive?.estado === true ? 'eliminar' : 'suscribir'
                  await handleNotification(action)
                }}
            >
                <span >
                {isActive?.estado === true
                  ? (
                        <BellIconChecked styles="stroke-2 stroke-primary_300 fill-none w-8 h-8" />
                    )
                  : (
                        <BellIconChecked styles="stroke-2 stroke-primary_100 fill-none w-8 h-8" />
                    )}
                    </span>
            </button>
        </div>
  )
}
