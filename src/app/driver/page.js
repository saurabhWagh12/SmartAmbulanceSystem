'use client'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/NavbarInner'
import UserContext from '../context/UserContext';
import axios from 'axios';
import Link from 'next/link';

function Driver() {
    const { username, setUsername } = useContext(UserContext);

    const [details, setDetails] = useState(null);
    const [licence,setLicence] = useState(null);
    const [phone,setPhone] = useState(null);

    useEffect(() => {
        async function calling() {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || '';
            try {
                const response = await axios.post('http://127.0.0.1:8000/userdetails/', { token: token });
                if (response.data.status === 200) {
                    setUsername(response.data.data.username);
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        calling()
    }, [])

    useEffect(() => {
        async function calling() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/getdriverdetails/', { username: username });
                if (response.data.status === 200) {
                    // setDetails(response.data.data);
                    setLicence(response.data.data.license)
                    setPhone(response.data.data.phone_number)
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        calling()
    }, [username])


    console.log(username)
    console.log(phone)

    return (
        <div className="flex justify-center bg-white min-h-screen w-screen text-black">
            <Navbar />

            <div className='pt-24 text-xl font-semibold block justify-start'>
            {(username!==null)?(
                <div>
                    <h1 className=' text-black'>Name: {username}</h1>
                    <h2 className=''>Phone Number: {phone}</h2>

                    <div className='flex '><Link href={`http://localhost:8000${licence}/`} className='text-center text-black'>See Licence</Link></div>

                </div>
            ) : (
                <h1 className='text-center'>Loading...</h1>
            )}
            </div>

        </div>
    )
}

export default Driver
