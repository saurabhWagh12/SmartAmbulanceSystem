import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import UserContext from '../context/UserContext';
import Link from 'next/link';

const cardStyle = {
    maxWidth: 345,
    marginBottom: '1rem', // Add margin bottom to create space between rows
    flex: '1 1 calc(33.333% - 2rem)', // Adjust flex basis for responsiveness
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
    // overflowX: 'hidden', // Prevent horizontal scrolling
    // overflowY:'auto',
};

const DriverCard = () => {
    const [drivers, setDrivers] = React.useState(null);
    const { username, setUsername } = React.useContext(UserContext);

    React.useEffect(() => {
        const calling2 = async () => {
            try {
                const response = await axios.post('http://localhost:8000/getalldrivers/', { username: username });
                if (response.data.status === 200) {
                    console.log('Data' + response.data.data)
                    setDrivers(response.data.data)
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        calling2();
    }, [username])

    console.log(drivers)

    return (
        <div style={containerStyle}>
            {drivers && drivers.map((driver, index) => (
                <Card key={index} sx={cardStyle}>
                    <CardActionArea>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {driver.user.username} {/* Name of driver */}
                            </Typography>
                            <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
                                Phone Number: {driver.phone_number} {/* Contact No. */}
                            </Typography>
                            <Typography sx={{fontSize:'1rem'}} variant="body2" color="text.secondary">
                                Status: {(driver.busy===true)?"True":"False"} {/*Status */}
                            </Typography>
                            <Link className='text-gray-600 hover:text-black' href={`http://localhost:8000${driver.license}/`}>See licence{driver.licence}</Link>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
};

export default DriverCard;
