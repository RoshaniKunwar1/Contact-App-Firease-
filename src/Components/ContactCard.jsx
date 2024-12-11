import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";

import React from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../Hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {

	const { isOpen, onClose, onOpen } = useDisclouse();

	const deleteContact = async (id) => {
		try {
			await deleteDoc(doc(db, "contacts", id))
			toast.success("Contact deleted Succesfully")
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
		<div className='flex bg-yellow justify-between items-center rounded-lg p-2 '>

			<div className='flex items-center gap-2'>
				<HiOutlineUserCircle className='text-orange text-4xl' />
				<div>
					<h2>{contact.name}</h2>
					<p className='text-sm font-medium'>{contact.email}</p>
				</div>
			</div>

			<div className='flex text-3xl'>
				<RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
				<IoMdTrash onClick={() => { deleteContact(contact.id) }} className=' text-orange cursor-pointer' />
			</div>
		</div>
			<AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose}></AddAndUpdateContact>
	</>
	)
}

export default ContactCard