'use client'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import Navbar from '../components/NavbarInner';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';

function Individual_Owner() {
    const {username,setUsername} = useContext(UserContext);
    const [details,setDetails] = useState(null);
    const token = Cookies.get('token');
    useEffect(() => {
        async function calling() {
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
                const response = await axios.post('http://127.0.0.1:8000/getindividualdetails/', { username: username });
                if (response.data.status === 200) {
                    setDetails(response.data.data);
                    
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        calling()
    }, [username])

    console.log(details)
  return (
    <div className=" bg-white min-h-screen w-screen text-black">
        <Navbar/>
        <div className='flex justify-center pt-12'>

        <div className='pt-24 text-xl font-semibold block justify-start'>
            {(details!==null)?(
                <div>
                    <h1 className=' text-black'>Name: {username}</h1>
                    <h2 className=''>Phone Number: {details.phone_number}</h2>
                    <h2 className=''>Vehicle Number: {details.vehicle_number}</h2>
                    <h2 className=''>Ambulance Type: {details.type}</h2>
                    <h2 className=''>Cost per km: {details.cost}</h2>
                    <div className='flex '><Link href={`http://localhost:8000${details.license}/`} className='text-center text-black'>See Licence</Link></div>

                </div>
            ) : (
                <h1 className='text-center'>Loading...</h1>
            )}
            </div>


        </div>

    </div>
  )
}

export default Individual_Owner