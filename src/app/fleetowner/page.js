'use client'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/NavbarInner';
import AmbulanceCard from '../components/AmbulanceCard';
import DriverCard from '../components/DriverCard';
import UserContext from '../context/UserContext';
import axios from 'axios';
 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Fleet_Owner() {
    const {username,setUsername} = useContext(UserContext);
    useEffect(()=>{
        async function calling(){
            const token = Cookies.get('token')
            try {
                const response = await axios.post('http://127.0.0.1:8000/userdetails/',{token:token});
                if(response.data.status===200){
                    setUsername(response.data.data.username);
                }else{
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        calling()
    },[])



const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
    color:'black',
	p: 4,
};

function Ambulance() {
    const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

    const [city,setCity] = useState("");
    const [cost,setCost] = useState("");
    const [username,setUsername] = useState("");
    const [vehicleNumber,setVehicleNumber] = useState("");
    const [document,setDocument] = useState(null);
    const [type,setType] = useState(null);

    const calling = async()=>{
        try{
            const formData = new FormData();
            formData.append('username', username);
            formData.append('documents',document); 
            formData.append('type',type)
            formData.append('city', city); 
            formData.append('cost', cost); 
            formData.append('vehicle_number',vehicleNumber);
            const response = await axios.post('http://127.0.0.1:8000/addambulance/', formData);
			
			if (response.data.status === 200) {
                console.log(response.data.message)
				router.push('/partners');
			} else {
				console.log(response.data.message);
			}
		} catch (error) {
			alert(error);
		}
    }

	return (
		<div className='text-black'>
			<Button onClick={handleOpen}>Add Ambulance</Button>
			<Modal
				open={open}
				onClose={handleClose}
                >
				<Box sx={style}>
					<div class="mb-5">
						<label
							for="username"
							class="block mb-2 text-sm font-medium text-black">
							Username
						</label>
						<input
							type="text"
							id="username"
                            onChange={(e)=>{setUsername(e.target.value)}}
							class="shadow-sm border   text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
							required
						/>
					</div>

                    <div class="mb-5">
						<label
							for="type"
							class="block mb-2 text-sm font-medium text-black">
							Your vehicle number
						</label>
						<input
							type="text"
							id="type"
                            onChange={(e)=>{setVehicleNumber(e.target.value)}}
							class="shadow-sm border text-black  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						    required
						/>
					</div>
					
					<div class="mb-5">
						<label
							for="type"
							class="block mb-2 text-sm font-medium text-black">
							Your vehicle type
						</label>
						<input
							type="text"
							id="type"
                            onChange={(e)=>{setType(e.target.value)}}
							class="shadow-sm border text-black  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						    required
						/>
					</div>

					<div class="mb-5">
						<label
							class="block mb-2 text-sm font-medium text-black"
							for="documents">
							Upload vehicle documents
						</label>
						<input
							class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
                            aria-describedby="user_avatar_help"
							id="documents"
							type="file"
							required
                            onChange={(e)=>{setDocument(e.target.files[0])}}

						/>
					</div>
					<div class="mb-5">
						<label
							for="cost"
							class="block mb-2 text-sm font-medium text-black">
							Vehicle cost
						</label>
						<input
							type="text"
							min="1"
							step="any"
							id="cost"
                            onChange={(e)=>{setCost(e.target.value)}}

							class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						    required
						/>
					</div>
					<div class="mb-5">
						<label
							for="city"
							class="block mb-2 text-sm font-medium text-black">
							City
						</label>
						<input
							type="text"
							id="city"
							class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
                            onChange={(e)=>{setCity(e.target.value)}}
                            required

						/>
					</div>

					<div class="flex items-start mb-5">
						<div class="flex items-center h-5">
							<input
								id="terms"
								type="checkbox"
								value=""
								class="w-4 h-4 border border-orange-400 rounded bg-white focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
								required
							/>
						</div>
						<label
							for="terms"
							class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">
							I agree with the{" "}
							<a
								href="#"
								class="text-orange-500 hover:underline dark:text-orange-500">
								terms and conditions
							</a>
						</label>
					</div>
					<button
						type="submit"
                        onClick={()=>{calling()}}
						class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-600">
						Add Ambulance
					</button>
				</Box>
			</Modal>
		</div>
	);
}


  return (
    <div>
        <style>{`
            html, body {
              overflow-x: hidden;
            }
          `}</style>
        
      <main className="bg-white min-h-screen w-screen text-center" style={{overflowX:'hidden', overflowY:'auto'}}>
        
        <Navbar />
        <div className='pt-24'><Ambulance/></div>
        <h1 style={{marginTop:'1cm',color:'black',fontWeight:'bold',fontSize: '1.7rem'}}>Ambulance Details</h1>
        <AmbulanceCard  />
        <h1 style={{marginTop:'3cm',color:'black',fontWeight:'bold',fontSize: '1.7rem'}}>Driver Details</h1>
        <DriverCard  />
      </main>
      </div>
  )
}
