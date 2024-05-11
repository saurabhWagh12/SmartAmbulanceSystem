import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia, { cardMediaClasses } from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
export default function ActionAreaCard() {
  return (
    <div style={containerStyle}>
      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: 140, width: '100%', objectFit: 'cover' }} // Set fixed height for cards
            image="https://5.imimg.com/data5/NW/HW/MY-8229651/advanced-life-support-ambulance-1000x1000.jpg"
            alt="Advanced Life Support Ambulance"
          />
          <CardContent>
            <Typography  gutterBottom variant="h5" component="div">
              Advanced Life Support Ambulance
            </Typography>
            <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
              Efficiently dispatch advanced life support teams to critical emergencies, ensuring swift and expert medical care.
            </Typography>
          </CardContent>
          <button className="bg-orange-600 flex items-center justify-center" style={{ color: 'white', padding: '10px 20px', borderRadius: '5px',margin:'auto',marginBottom:'1rem'}}>Book Now</button>
        </CardActionArea>
      </Card>

      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: 140, width: '100%', objectFit: 'cover' }}
            image="https://5.imimg.com/data5/AH/WO/MY-8229651/img-20180923-wa0003-1000x1000.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Basic Life Support Ambulance
            </Typography>
            <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
            Deploy basic life support units for timely intervention in emergencies, 
            delivering essential medical aid when every second counts.
            </Typography>
          </CardContent>
          <button className= "bg-orange-600 flex items-center justify-center" style={{ color: 'white', padding: '10px 20px', borderRadius: '5px',margin:'auto',marginBottom:'1rem'}}>Book Now</button>
        </CardActionArea>
      </Card>
      
      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: 140, width: '100%', objectFit: 'cover' }}
            image="https://www.ambulance-alize.com/ressources/images/1e82985b29b1.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Patient Transfer Ambulance
            </Typography>
            <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
            Enable prompt and safe patient transport, 
            ensuring seamless transition between medical facilities for optimal care continuity.
            </Typography>
          </CardContent>
          <button className= "bg-orange-600 flex items-center justify-center" style={{ color: 'white', padding: '10px 20px', borderRadius: '5px',margin:'auto',marginBottom:'1rem'}}>Book Now</button>
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
  );
}


    

