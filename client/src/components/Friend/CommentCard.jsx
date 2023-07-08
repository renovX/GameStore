import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CommentCard({ gameImg, rate, comm_data }) {
    return (
        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="40px"
                image={gameImg ? gameImg : "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg"}
            />
            <CardContent>
                <Typography component="div" sx={{ fontSize: 'small' }}>
                    {rate ? <span>Recommended</span> : <span>Not Recommended</span>}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 'small' }}>{comm_data} </Typography>
            </CardContent>
        </Card>
    );
}