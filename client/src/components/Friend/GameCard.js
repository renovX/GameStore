import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function GameCard() {
    return (
        <Card sx={{ width: '70%', marginBottom: '2%' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="100%"
                image="https://www.freepnglogos.com/uploads/gta-5-logo-png/grand-theft-auto-v-1.png"
            />
            <span style={{ fontSize: '80%' }}>1000 hrs</span>

        </Card>
    );
}