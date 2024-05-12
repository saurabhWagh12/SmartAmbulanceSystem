"use client";

import React from "react";
import Lottie from "lottie-react";
import ambulancelottie from "./ambulance-lottie.json";
import doctorlottie from "./doctor-lottie.json";
import Navbar from "../components/Navbar";

export default function AboutUs() {
	return (
		<div>
			<Navbar />
			<section id="about-us" className="py-32 bg-white">
				<div className="container mx-auto">
					<div className="flex flex-col items-center justify-center mb-16">
						<h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white p-4 rounded-lg shadow-lg">
							About Us
						</h2>
						<p className="text-lg text-gray-700 text-center">
							In today's rapidly evolving world, accessing emergency medical
							services swiftly and effectively is increasingly challenging.
							Smart Ambulance Management is here to revolutionize the way
							ambulance services are accessed and managed.
						</p>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-center mb-16">
						<div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
							<h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white p-4 rounded-lg shadow-lg">
								Our Mission
							</h3>
							<p className="text-lg text-gray-700">
								Our mission is to provide a smart, agile solution for summoning
								life-saving assistance effortlessly. We leverage cutting-edge
								technology to bridge the gap between crisis and care, ensuring
								rapid, coordinated responses to emergencies.
							</p>
						</div>
						<div className="md:w-1/2 flex justify-center">
							<Lottie
								animationData={ambulancelottie}
								style={{ width: 400, height: 400 }}
							/>
						</div>
					</div>
					<div className="flex">
						<div className="w-1/3">
							<Lottie
								animationData={doctorlottie}
								style={{ width: 400, height: 400 }}
							/>
						</div>
						<div className="flex flex-col md:flex-row items-center justify-end">
							<div className="w-2/3 md:pr-8 mb-8 md:mb-0">
								<h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white p-4 rounded-lg shadow-lg">
									Our Vision
								</h3>
								<p className="text-lg text-gray-700">
									We envision a safer, healthier future where access to
									emergency medical services is seamless and efficient. Our
									commitment lies in saving lives and shaping a world where
									every individual feels empowered and supported in times of
									need.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
