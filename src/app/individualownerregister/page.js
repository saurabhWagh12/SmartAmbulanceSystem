'use client'
import axios from "axios";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

export default function Fleetowner() {
	const router = useRouter();
	const [licence,setLicence] = useState(null);
	const [documents,setDocuments] = useState(null);
	const [name,setName] = useState("");
	const [email,setEmail] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const [cost,setCost] = useState("");
	const [city,setCity] = useState("");
	const [vehicle_number,setVehicle] = useState("");
	const [type,setType] = useState("");

	const calling = async () => {
		try {
			const formData = new FormData();
			formData.append('username', name);
			formData.append('email', email);
			formData.append('password', password);
			formData.append('phone_number', phone);
			formData.append('licence', licence); 
			formData.append('documents',documents); 
			formData.append('type',type)
			formData.append('city', city); 
			formData.append('cost', cost); 
			formData.append('vehicle_number', vehicle_number); 

			
			const response = await axios.post('http://127.0.0.1:8000/registerindividual/', formData);
			
			if (response.data.status === 200) {
				router.push('/partners');
			} else {
				console.log(response.data.message);
			}
		} catch (error) {
			alert(error);
		}
	}


	return (
		<div className="py-10 bg-white min-h-screen w-screen text-black " >
			<h1 className="text-xl text-black font-medium text-center py-8">Individual Owner Registeration</h1>

			<div className="max-w-sm mx-auto text-left ">
				<div className="mb-5">
					<label
						for="name"
						className="block mb-2 text-sm font-medium ">
						Your name
					</label>
					<input
						type="name"
						id="name"
						onChange={(e)=>{setName(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div className="mb-5">
					<label
						for="email"
						className="block mb-2 text-sm font-medium ">
						Your email
					</label>
					<input
						type="email"
						id="email"
						onChange={(e)=>{setEmail(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						placeholder="name@flowbite.com"
						required
					/>
				</div>
				<div className="mb-5">
					<label
						for="phone"
						className="block mb-2 text-sm font-medium ">
						Your number
					</label>
					<input
						type="tel"
						onChange={(e)=>{setPhone("+91"+e.target.value)}}
						id="phone"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						placeholder="+91 - xxxxxxxxxx"
						maxLength={10}
						required
					/>
				</div>
				<div className="mb-5">
					<label
						// for="password"
						className="block mb-2 text-sm font-medium ">
						Your vehicle number
					</label>
					<input
						// type="password"
						// id="password"
						onChange={(e)=>{setVehicle(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div className="mb-5">
					<label
						for="type"
						className="block mb-2 text-sm font-medium ">
						Your vehicle type
					</label>
					<input
						type="name"
						id="type"
						onChange={(e)=>{setType(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div className="mb-5">
					<label
						className="block mb-2 text-sm font-medium "
						for="lisence">
						Upload Lisence
					</label>
					<input
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						aria-describedby="user_avatar_help"
						id="lisence"
						onChange = {(e)=>{setLicence(e.target.files[0])}}
						type="file"
						required
					/>
				</div>
				<div className="mb-5">
					<label
						className="block mb-2 text-sm font-medium "
						for="documents">
						Upload vehicle documents
					</label>
					<input
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						aria-describedby="user_avatar_help"
						id="documents"
						type="file"
						onChange = {(e)=>{setDocuments(e.target.files[0])}}
						required
					/>
				</div>
				<div className="mb-5">
					<label
						for="cost"
						className="block mb-2 text-sm font-medium ">
						Vehicle cost
					</label>
					<input
						type="number"
						min="1"
						onChange={(e)=>{setCost(e.target.value)}}
						step="any"
						id="cost"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div className="mb-5">
					<label
						for="city"
						className="block mb-2 text-sm font-medium ">
						City
					</label>
					<input
						type="name"
						onChange={(e)=>{setCity(e.target.value)}}
						id="city"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div className="mb-5">
					<label
						for="password"
						className="block mb-2 text-sm font-medium ">
						Your password
					</label>
					<input
						type="password"
						onChange={(e)=>{setPassword(e.target.value)}}
						id="password"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>

				<div className="flex items-start mb-5">
					<div className="flex items-center h-5">
						<input
							id="terms"
							type="checkbox"
							value=""
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
							required
						/>
					</div>
					<label
						for="terms"
						class="ms-2 text-md font-medium  dark:text-gray-600">
						I agree with the{" "}
						<a
							href="#"
							class="text-orange-500 hover:underline dark:text-orange-600">
							terms and conditions
						</a>
					</label>
				</div>
				<button
					type="submit"
					onClick={()=>{calling()}}
					class="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800">
					Register new account
				</button>
			</div>
		</div>
	);
}
