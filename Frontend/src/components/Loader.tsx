import { Bubble } from '@/pages/Home/components/Bubble'

export default function Loader () {
  return (
    <section className='main__container flex items-center justify-center overflow-hidden'>
    <div className='relative w-64'>
            <Bubble index="3" top="-80px" left='0px' size="w-64 h-64 loader loader" extraStyles={{ zIndex: 40 }}/>
            <Bubble index="2" top="-60px" left='-50px' size="w-40 h-40 loader " extraStyles={{ zIndex: 40 }}/>
            <Bubble index="4" top="0px" left='0px' size="w-32 h-32 loader " extraStyles={{ zIndex: 40 }}/>
    </div>
</section>
  )
}