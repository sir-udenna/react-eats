import React, { useEffect } from 'react';
import Navbar from '../../components/navigation/navbar';
import { useSelector } from 'react-redux';
import RestaurantCard from '../../components/card/restaurantCard';
import {
  Typography,
  Container,
  Grid,
  styled,
  Box,
} from '@mui/material';
import { FoodSearchBar } from '../../components/search/foodSearchBar';

const HomeContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

// const SearchBar = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
// }));

export default function Home() {
  const restaurants = useSelector(state => state.restaurant.restaurants);

  return (
    <>
      <Navbar />
      <HomeContainer maxWidth="md">
        <Typography variant="h4" align='center' color="textPrimary" gutterBottom>
          Welcome to EATS.
        </Typography>
        <Typography variant="h5" align='center' color="textSecondary" paragraph>
          Here are some food options near you. Search below to personalize your results.
        </Typography>
        <FoodSearchBar />
        <Grid container spacing={4}>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
                <RestaurantCard restaurant={restaurant} handleMoreInfo={props.handleMoreInfo} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align='right'>No restaurants found</Typography>
          )}
        </Grid>
      </HomeContainer>
      <footer>
        <Typography variant="h6" align='center' gutterBottom>
          EATS
        </Typography>
        <Typography variant="subtitle1" align='center' color="textSecondary" component="p">
          Flatiron School Capstone Project 2021
        </Typography>
      </footer>
    </>
  );
}
