import Insertpaper from '@/components/Dashboard/Insertpaper'
import Manualinsert from '@/components/Dashboard/Manualinsert'
import EventCalendar from '@/components/EventCalendar'
import React from 'react'

const evaluation = () => {
  return (
    <div className='p-4 space-x-5 flex gap-4 flex-col md:flex-row'>

      <div className="w-full lg:w-2/3 flex flex-col gap-8"><Insertpaper />
        <div className="flex justify-center bg-lamaSky rounded-xl"> <button className=' flex w-1/3 h-9 rounded-md  justify-center  items-center '>
          Grade Now
        </button></div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>
    </div>
  )
}

export default evaluation
