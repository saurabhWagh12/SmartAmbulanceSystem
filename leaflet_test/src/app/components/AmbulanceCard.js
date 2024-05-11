import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import UserContext from '../context/UserContext';

const cardStyle = {
    maxWidth: 345,
    marginBottom: '1rem', 
    flex: '1 1 calc(33.333% - 2rem)',
    marginRight: '1rem',
    marginLeft: '1rem',
    marginTop:'1cm',
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
};

const AmbulanceCard = () => {
    const [ambulances, setAmbulances] = useState(null);
    const { username } = useContext(UserContext);

    useEffect(() => {
        const fetchAmbulances = async () => {
            try {
                const response = await axios.post('http://localhost:8000/getallambulances/', { username: username });
                if (response.data.status === 200) {
                    setAmbulances(response.data.data);
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAmbulances();
    }, [username]);

    return (
        <div style={containerStyle}>
            {ambulances &&
                ambulances.map((ambulance, index) => (
                    <Card key={index} sx={cardStyle}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {ambulance.vehicle_number} {/* Type of ambulance */}
                                </Typography>
                                <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
                                    {/* Add description if available */}
                                    Type: {ambulance.type}
                                </Typography>
                                <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
                                    {/* Add description if available */}
                                    Cost per km: {ambulance.cost}
                                </Typography>
                                <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
                                    {/* Add description if available */}
                                    City: {ambulance.city}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
        </div>
    );
};

export default AmbulanceCard;
