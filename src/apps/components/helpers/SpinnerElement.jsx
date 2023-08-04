import React from 'react'
import { MoonLoader } from 'react-spinners'

const override = {
  with: '5rem',
  height: '5rem'
}

const SpinnerElement = () => {
  return (
    <div className='inset-0 bg-slate-900/70 flex justify-center items-center fixed z-[99999]'>
      <MoonLoader
        color="#79E0EE"
        cssOverride={override}
      />
    </div>
  )
}

export default SpinnerElement
