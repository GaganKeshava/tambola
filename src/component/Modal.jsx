import React from 'react'

export const Modal = ({setShowModal}) => {
  return (
    <div className='modalWrapper'>
        <div className='modalContainer'>
            <h1>Confirm reset?</h1>
            <div className='buttonWrapper'>
                <button onClick={() => setShowModal(false)}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
            </div>
        </div>
    </div>
  )
}
