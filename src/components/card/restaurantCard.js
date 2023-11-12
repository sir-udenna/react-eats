import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Button,
    styled,
    Rating,
} from '@mui/material';

const RestaurantCardStyled = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    backgroundColor: theme.palette.grey[100],
}));

const CardMediaImage = styled(CardMedia)(({ theme }) => ({
    height: 200,
}));

const CardContentCentered = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    //   alignItems: 'flex-start',
}));

export default function RestaurantCard({ restaurant, handleMoreInfo }) {
    return (
        <RestaurantCardStyled>
            <CardActionArea>
                <CardMediaImage
                    component="img"
                    alt={restaurant.name}
                    image={restaurant.image_url || 'https://www.officespacesny.com/wp-content/themes/realestate-7/images/no-image.png'}
                />
                <CardContentCentered>
                    <Typography variant="h6" component="div">
                        {restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {restaurant.categories.map((category) => category.title).join(', ')}
                    </Typography>
                    <Rating value={restaurant.rating} readOnly />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleMoreInfo(restaurant)}
                    >
                        More Info
                    </Button>
                </CardContentCentered>
            </CardActionArea>
        </RestaurantCardStyled>
    );
}
