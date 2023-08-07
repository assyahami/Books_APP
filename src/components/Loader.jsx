import React from 'react'
import {Audio} from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className='loader'>
         <Audio
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />
    </div>
  )
}

export default Loader