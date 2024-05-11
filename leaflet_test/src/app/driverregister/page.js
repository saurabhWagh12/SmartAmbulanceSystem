'use client'
import axios from "axios";
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from "react";

export default function Driver() {
	const router = useRouter();
	const [licence,setLicence] = useState(null);
	const [name,setName] = useState("");
	const [email,setEmail] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const [underFleet,setUnderFleet] = useState("");

	const calling = async () => {
		try {
			const formData = new FormData();
			formData.append('username', name);
			formData.append('email', email);
			formData.append('password', password);
			formData.append('phone_number', phone);
			formData.append('licence', licence);
			formData.append('underFleet', underFleet); 
			
			const response = await axios.post('http://localhost:8000/registerdriver/', formData);
			
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
		<div className="pt-10 bg-white min-h-screen w-screen text-black" >
			<h1 className="text-xl text-black font-medium text-center py-10">Driver Registeration</h1>

			<div class="max-w-sm mx-auto text-left">
				<div class="mb-5">
					<label
						for="name"
						class="block mb-2 text-sm font-medium ">
						Your name
					</label>
					<input
						type="name"
						id="name"
						onChange = {(e)=>{setName(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div class="mb-5">
					<label
						for="email"
						class="block mb-2 text-sm font-medium ">
						Your email
					</label>
					<input
						type="email"
						id="email"
						onChange = {(e)=>{setEmail(e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
					    placeholder="name@flowbite.com"
						required
					/>
				</div>
				<div class="mb-5">
					<label
						for="phone"
						class="block mb-2 text-sm font-medium ">
						Your number
					</label>
					<input
						type="tel"
						id="phone"
						onChange = {(e)=>{setPhone('+91'+e.target.value)}}
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						placeholder="+91 - xxxxxxxxxx"
						required
						maxLength={10}
					/>
				</div>

				<div class="mb-5">
					<label
						class="block mb-2 text-sm font-medium "
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
				<div class="mb-5">
					<label
						for="password"
						class="block mb-2 text-sm font-medium ">
						Your password
					</label>
					<input
						type="password"
						onChange = {(e)=>{setPassword(e.target.value)}}
						id="password"
						class="shadow-sm border  bg-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-white dark:border-orange-400 dark:placeholder-gray-400  dark:focus:ring-orange-500 dark:focus:border-orange-500 "
						required
					/>
				</div>
				<div class="mb-5">
					<label
						for="name"
						class="block mb-2 text-sm font-medium ">
						Under Fleet
					</label>
					<input
						type="text"
						id="name"
						onChange = {(e)=>{setUnderFleet(e.target.value)}}
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
					onClick = {()=>{calling()}}
					type="submit"
					class="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800">
					Register new account
				</button>
			</div>
		</div>
	);
}
