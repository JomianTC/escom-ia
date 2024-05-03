import { ReturnButton } from '@/components/ReturnButton'

export function AdminDashboardLayout ({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <section className='grow flex flex-col gap-6 mt-0'>
      <header className='w-full flex'>
              <h3 className='text-lg grow font-semibold  text-primary_200 bg-primary_op_100/20 px-4 py-1 '>{title }</h3>
        <ReturnButton styles='w-8 h-8 sm:w-8 sm:h-8 ' />
      </header>
          { children}
    </section>
  )
}
