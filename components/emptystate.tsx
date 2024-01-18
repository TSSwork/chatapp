import React from 'react'

export default function EmptyState() {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 flex justify center items-center bg-gray-100 h-full w-full'>
        <div className='text-center items-center flex flex-col w-full'>
            <h3 className='mt-2 text-2xl font-semibold text-gray-900'>
                Select chat or start a new conversation
            </h3>
        </div>
    </div>
  )
}
