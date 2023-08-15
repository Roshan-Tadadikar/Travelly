import React, { useContext } from 'react'
import { useState } from 'react';
import { ProvideCommonContext } from '../Context/CommonContext';

const EditModal = ({  children }) => {
 const{modalOpen, closeModal} = useContext(ProvideCommonContext)
  return (
    <div className={`fixed inset-0 ${modalOpen ? 'block' : 'hidden'}`}>
    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div className="modal-container fixed top-0 left-0 flex items-center justify-center w-full h-full">
      <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 mt-4 mr-4">
          <button className="text-gray-700 close-modal" onClick={closeModal}>
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.348 14.849a1 1 0 0 1-1.414 1.414l-2.828-2.828-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828-2.828-2.828a1 1 0 1 1 1.414-1.414l2.828 2.828 2.828-2.828a1 1 0 0 1 1.414 1.414l-2.828 2.828 2.828 2.828z"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body p-4">{children}</div>
      </div>
    </div>
  </div>
  )
}

export default EditModal