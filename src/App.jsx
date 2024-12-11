import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './Config/firebase';
import ContactCard from './Components/ContactCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAndUpdateContact from './Components/AddAndUpdateContact';
import useDisclouse from './Hooks/useDisclouse';
import NotFoundContact from './Components/NotFoundContact';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        //const contactsSnapshot = await getDocs(contactsRef); //all data aauxa
        //console.log(contactsSnapshot);

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          //console.log(contactLists);
          return (contactLists);
        })
        
      } catch (error) {
        console.log(error)
      }
    };
    getContacts();
  }, []);

  //For Searching.
  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, 'contacts');
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter(contact => 
        contact.name.toLowerCase().includes(value.toLowerCase())
      )

      setContacts(filteredContacts);
      return filteredContacts;
    })
  }

  return (
    <>
      <div className='max-w-[370px] mx-auto px-5'>
        <Navbar></Navbar>
        <div className='flex gap-2'>
          <div className='flex relative items-center flex-grow'>
            <FiSearch className='text-3xl text-white absolute ml-1' />
            <input type='text' className='bg-transparent border border-white rounded-md h-[40px] flex-grow text-white pl-9' onChange={filterContacts}></input>
          </div>

          <div>
            <AiFillPlusCircle onClick={onOpen} className='text-5xl text-white cursor-pointer' />
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-4'>
          {
            contacts.length<= 0 ? <NotFoundContact/>:
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}></AddAndUpdateContact>
      <ToastContainer position='bottom-center' />
    </>
  )
}

export default App