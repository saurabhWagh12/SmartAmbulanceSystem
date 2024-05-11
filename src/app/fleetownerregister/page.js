'use client'
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Fleetowner() {
	const router = useRouter();
	const [name,setName] = useState("");
	const [email,setEmail] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");

	const calling = async()=>{
		try {
			const di = {username:name,email:email,phone_number:phone,password,password}
			const response = await axios.post('http://localhost:8000/registerfleetowner/',di)
			if(response.data.status===200){
				router.push('/partners');
			}else{
				alert(response.data.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="pt-10 bg-white min-h-screen w-screen text-black" >
			<h1 className="text-xl text-black font-medium text-center py-10">Fleet Owner Registeration</h1>
			<div class="max-w-sm mx-auto text-left">
				<div class="mb-5">
					<label
						for="name"
						class="block mb-2 text-sm font-medium  ">
						Your name
					</label>
					<input
						type="text"
						onChange={(e)=>{setName(e.target.value)}}
						id="name"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div class="mb-5">
					<label
						for="email"
						class="block mb-2 text-sm font-medium  ">
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
				<div class="mb-5">
					<label
						for="phone"
						class="block mb-2 text-sm font-medium  ">
						Your number
					</label>
					<input
						type="tel"
						onChange={(e)=>{setPhone(e.target.value)}}
						id="phone"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						placeholder="+91 - xxxxxxxxxx"
						required
					/>
				</div>
				
				<div class="mb-5">
					<label
						for="password"
						class="block mb-2 text-sm font-medium  ">
						Your password
					</label>
					<input
						type="password"
						id="password"
						onChange={(e)=>{setPassword(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>

				<div class="flex items-start mb-5">
					<div class="flex items-center h-5">
						<input
							id="terms"
							type="checkbox"
							value=""
							class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
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
					onClick={()=>{calling()}}
					type="submit"
					class="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800">
					Register new account
				</button>
			</div>
		</div>
	);
}
