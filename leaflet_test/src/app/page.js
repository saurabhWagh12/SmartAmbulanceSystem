'use client'
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import { colors } from "@mui/material";
export default function Home() {
  return (
    <div className="bg-white min-h-screen w-screen text-center" style={{overflowX:'hidden', overflowY:'auto'}}> 
      <head>
      <style>{`
          html, body {
            overflow-x: hidden;
          }
        `}</style>
      </head>
      <div >   
  
          <Navbar/>
          <div style={{marginTop:'5cm',marginLeft:'20%',marginRight:'20%'}}>
            <h2 style={{color:'grey',fontWeight:'bold',fontStyle:'Italic'}}>Streamlining Emergency Care: We connects lives and saves valuable time by offering a smart, efficient solution for ambulance dispatch needs. Your trusted partner in critical moments.</h2>
          </div>
          <Cards/>
      </div>
    </div>
  );
}
