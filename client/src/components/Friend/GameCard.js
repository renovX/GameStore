import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router';


export default function GameCard({ gameImg, hours, id }) {
    const navigate = useNavigate()
    return (
        <Card sx={{ width: '70%', marginBottom: '2%' }} onClick={() => { navigate(`/game/${id}`) }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="100%"
                image={gameImg}
            />
            <span style={{ fontSize: '80%' }}>{hours} hrs</span>

        </Card>
    );
}