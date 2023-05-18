import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
    return (
        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="40px"
                image="https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg"
            />
            <CardContent>
                <Typography component="div" sx={{ fontSize: 'small' }}>
                    Not Recoom
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 'small' }}>Ad consequat eu incididunt reprehenderit dolore laboris ullamco do magna enim aute. Enim eiusmod ex tempor minim. Esse officia sunt officia adipisicing. Eu minim id voluptate quis veniam cupidatat ex excepteur et pariatur. </Typography>
            </CardContent>
        </Card>
    );
}