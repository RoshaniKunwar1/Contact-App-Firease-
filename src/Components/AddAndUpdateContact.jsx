import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const contactsSchemaValidation = Yup.object().shape({
	name: Yup.string().required('Name is Required'),
	email: Yup.string().email('Invalid Email').required('Email is Required')
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

	const addContact = async (contactData) => {
		try {
			const contactRef = collection(db, 'contacts');
			await addDoc(contactRef, contactData);
			toast.success("Contact Added Succesfully")
			onClose();
		} catch (error) {
			console.log(error);
		}
	}

	const updateContact = async (contactData,id) => {
		try {
			const contactRef = doc(db, 'contacts', id);
			await updateDoc(contactRef, contactData)
			toast.success("Contact Updated Succesfully")
			onClose();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Formik validationSchema={contactsSchemaValidation}
					initialValues={isUpdate ? {
						name: contact.name,
						email: contact.email,
					}:{
						name: '',
						email:'',
					}}

					onSubmit = {(values) => {
						console.log(values);
						isUpdate ? updateContact(values,contact.id) : addContact(values);
					}}
				>
					
					<Form className='flex flex-col gap-4'>
						<div className='flex flex-col gap-1'>
							<label htmlFor='name'>Name</label>
							<Field name='name' className='border rounded h-8'></Field>
							<div className='text-red-500 text-xs'>
								<ErrorMessage name='name'></ErrorMessage>
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<label htmlFor='email'>Email</label>
							<Field type="email" name='email' className='border rounded h-8'></Field>
							<div className='text-red-500 text-xs'>
								<ErrorMessage name='email'></ErrorMessage>
							</div>
						</div>
						<button type='submit' className={`bg-orange rounded px-3 py-1.5 ${!isUpdate&&"self-end"}`}>{isUpdate? "Update ":"Add "}contact</button>
					</Form>
			</Formik>
			</Modal>
		</div>
	)
}

export default AddAndUpdateContact