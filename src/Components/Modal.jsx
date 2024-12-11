import React from 'react'
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
	if (!isOpen) return null; // Don't render anything if the modal is not open
	return createPortal(
		<>
			{isOpen && (
				<div className='grid place-items-center absolute top-0 z-40 h-screen w-screen backdrop-blur'>
					<div className='m-auto z-50 relative min-h-[200px] min-w-[80%] bg-white p-2'>
						<div className='flex justify-end'>
							<AiOutlineClose onClick={onClose} className='text-2xl' />
						</div>
						{children}
					</div>
				</div>
			)}
		</>,
		document.getElementById("modal-root")
	)
}

export default Modal