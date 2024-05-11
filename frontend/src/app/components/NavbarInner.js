"use client"
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';



const Navbar = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const type = Cookies.get('type')
  const router = useRouter();
function Logout(){
    Cookies.remove('token');
    Cookies.remove('type');
    router.push('/');
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const AddAmbulance = async()=>{
    
  }


  const Modal = () => {
    return (
      <div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-orange-600 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className='flex items-center justify-between gap-10 mb-10'>
                    <h2 className="text-4xl text-black font-semibold ">Menu</h2>
                    <button
                        onClick={closeModal}
                        className=" bg-orange-600 text-white px-3 py-1 rounded-full hover:bg-orange-700"
                    >
                        X
                    </button>
              </div>

              <div className="text-2xl">
              <div>
                {(type==='Fleet_Owner')?<button onClick={()=>{AddAmbulance()}} className="text-black cursor-pointer hover:text-gray-300">Add Ambulance</button>:<></>}
              </div>
                <div>
                    <span  onClick={()=>{Logout()}} className="text-black cursor-pointer hover:text-gray-300">Logout</span>
                </div>

            </div>
              
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-orange-500 p-4 fixed top-0 w-full z-50 font-sans">
      <div className="container mx-auto flex justify-between items-center font-semibold">
        <div>
          <div>
            <a href="/" className="text-white text-lg font-bold">
            <h1>Smart Ambulance Management</h1>
            </a>
          </div>
        </div>

        {/* Navbar divs */}
        <div className="hidden lg:flex space-x-4">
        <div>
            {(type==='Fleet_Owner')?<button onClick={()=>{AddAmbulance()}} className="text-white cursor-pointer hover:text-gray-300">Add Ambulance</button>:<></>}
          </div>
          <div>
            <button onClick={()=>{Logout()}} className="text-white cursor-pointer hover:text-gray-300">Logout</button>
          </div>
          
        </div>

        {/* Mobile menu button for small screens */}
        {!isModalOpen && (
          <div className="lg:hidden">
            <button className="text-white text-4xl" onClick={openModal}>&#9776;</button>
          </div>
        )}

        {/* Render the Modal component */}
        {isModalOpen && <Modal />}
      </div>
    </nav>
  );
};

export default Navbar;