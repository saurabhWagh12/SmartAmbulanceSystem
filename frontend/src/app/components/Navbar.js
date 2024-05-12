"use client"
import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';
import Logo from '../../assets/Logo.jpg';

const Navbar = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
                    <Link href="/" className="text-black hover:text-gray-300">Home</Link>
                </div>
                <div>
                    <Link href="/about" className="text-black hover:text-gray-300">About</Link>
                </div>
                <div>
                    <Link href="/partners" className="text-black hover:text-gray-300">Partnership</Link>
                </div>
                <div>
                    <Link href="/" className="text-black hover:text-gray-300">Contact Us</Link>
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
            {/* <Image src={Logo} alt="Logo" width={80} height={40} /> */}
            <h1 className='text-white '>Smart Ambulance Management</h1>
            </a>
          </div>
        </div>

        {/* Navbar divs */}
        <div className="hidden lg:flex space-x-4">
          <div>
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          </div>
          <div>
            <Link href="/about" className="text-white hover:text-gray-300">About</Link>
          </div>
          <div>
            <Link href="/partners" className="text-white hover:text-gray-300">Partnership</Link><></>
          </div>
          <div>
            <Link href="/" className="text-white hover:text-gray-300">Contact Us</Link>
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
