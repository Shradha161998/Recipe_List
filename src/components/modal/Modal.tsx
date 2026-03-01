import React from 'react'
import ReactDOM from 'react-dom'
import './modal.css'

type ModalProps = {
    isOpen : boolean,
    onClose : ()=> void,
    children: React.ReactNode;
}
function Modal({isOpen, onClose, children}: ModalProps) {
    if(!isOpen) return null
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
             {/* Prevent clicks inside the modal from closing it */}
            <button className="modal-close-button" onClick={onClose}>&times;</button>
            {children}
        </div>
    </div> , 
    document.getElementById('modal-root') as HTMLElement
  )

}

export default Modal
