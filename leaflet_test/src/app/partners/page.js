'use client'
import Link from 'next/link'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia, { cardMediaClasses } from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Navbar from '../components/Navbar';
import Box from "@mui/material/Box";
import { Button, Typography, Modal, TextField } from "@mui/material";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 300,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	alignItems: "center",
};



const cardStyle = {
    maxWidth: 345,
    marginBottom: '1rem', // Add margin bottom to create space between rows
    flex: '1 1 calc(33.333% - 2rem)', // Adjust flex basis for responsiveness
    marginRight: '1rem',
    marginLeft: '1rem',
    marginTop:'3cm',
  };
  const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
      // overflowX: 'hidden', // Prevent horizontal scrolling
      // overflowY:'auto',
    };

function page() {
  const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
  const router = useRouter();


  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const calling = async()=>{
    try {
      const di = {username:username,password:password}
      const response = await axios.post("http://localhost:8000/login/",di);
      if(response.data.status){
        Cookies.set('token',response.data.token);
        Cookies.set('type',response.data.type);
        alert('Logging In')
        const type = Cookies.get('type')
        if(type==='Fleet_Owner')
            router.push("/fleetowner/") 
        else if(type==='Individual_Owner'){
            router.push('/individualowner')
        }
        else if(type==='Driver')
            router.push('/driver/')
      }else{
        console.log(error)
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='bg-white min-h-screen w-screen text-black'>
    <Navbar/>

    <div className='flex justify-center'>
    <div className='pt-24'>
			<Button 
      className="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 w-15"
						
      onClick={handleOpen}>Sign In</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography
						id="modal-modal-tit
                    le"
						variant="h6"
            className="text-black"
						component="h2">
              
						Sign In
					</Typography>
					<div>
						<TextField
							id="standard-basic"
							label="Username"
							variant="standard"
              onChange={(e)=>{setUsername(e.target.value)}}
						/>
					</div>
					<div>
						<TextField
							id="standard-basic"
							label="Password"
              type='password'
							variant="standard"
              onChange={(e)=>{setPassword(e.target.value)}}
						/>
					</div>
					<button
						type="submit"
            onClick={()=>{calling()}}
						class="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 w-15">
						Sign in
					</button>
				</Box>
			</Modal>
		</div>

    </div>



    <div style={containerStyle}>
      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: 140, width: '100%', objectFit: 'cover' }} // Set fixed height for cards
            image="https://tse4.mm.bing.net/th?id=OIP.y9XDbVZYl0Vi8ZmpaEdyvgHaE8&pid=Api&P=0&h=180"
            alt="Advanced Life Support Ambulance"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Individual Owner
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Owns a ambulance and manage its working individually.
            </Typography>
          </CardContent>
          <span className="w-36 bg-orange-600 flex items-center justify-center" style={{ color: 'white', padding: '10px 20px', borderRadius: '5px',margin:'auto',marginBottom:'1rem'}}><Link href='/individualownerregister/'>Register</Link></span>
        </CardActionArea>
      </Card>

      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: 140, width: '100%', objectFit: 'cover' }}
            image="https://gk.news/michelin-fleet/wp-content/uploads/sites/17/2019/05/302-03-Michelin-South-East-Coast-Ambulance-Service-1200x820.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Fleet Owner
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Owns multiple ambulances of different type and manage their working.
            </Typography>
          </CardContent>
          <span className= "w-36 bg-orange-600 flex items-center justify-center" style={{ color: 'white', padding: '10px 20px', borderRadius: '5px',margin:'auto',marginBottom:'1rem'}}><Link href='/fleetownerregister/'>Register</Link></span>
        </CardActionArea>
      </Card>
      
      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: 140, width: '100%', objectFit: 'cover' }}
            image="https://www.forbesindia.com/media/images/2021/Jan/img_151889_covidyoddha.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Driver
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Works for fleet owner and helps him to manage his services.
            </Typography>
          </CardContent>
          <span className= "w-36 bg-orange-600 flex items-center justify-center" style={{ color: 'white', padding: '10px 20px', borderRadius: '5px',margin:'auto',marginBottom:'1rem'}}><Link href='/driverregister/'>Register</Link></span>
        </CardActionArea>
      </Card>
      <style>
        {`
          @media (max-width: 480px) {
            .MuiCard-root {
              flex-basis: calc(100% - 2rem);
            }
          }
        `}
      </style>
    </div>

    
    
    </div>
  )
}

export default page