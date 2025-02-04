import Insertpaper from '@/components/Dashboard/Insertpaper'
import EventCalendar from '@/components/EventCalendar'
import ExamCreationForm from '@/components/ExamCreation'
import React from 'react'

const evaluation = () => {
  return (
    <div className='p-4 space-x-5 flex gap-4 flex-col md:flex-row'>

      <div className="w-full lg:w-2/3 flex flex-col gap-8"><ExamCreationForm />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>
    </div>
  )
}

export default evaluation
