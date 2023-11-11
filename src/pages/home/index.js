import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navigation/navbar';
import { useAuth } from '../../contexts/authContext';
import { getRestaurants } from '../../api';
import {
  Typography,
  TextField,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const HomeContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const RestaurantCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
}));

const CardMediaImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
}));

const CardContentCentered = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Home(props) {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated)

  useEffect(() => {
    getLocation();
  }, [searchTerm]);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchData(latitude, longitude);
      }, (error) => {
        console.error('Error getting user location:', error);
        fetchData(37.7749, -122.4194, searchTerm);
      });
    } else {
      console.error('Geolocation not available');
      fetchData(37.7749, -122.4194, searchTerm);
    }
  };

  const fetchData = async (latitude, longitude) => {
    try {
      const data = await getRestaurants(latitude, longitude, searchTerm, null, true, 'best_match');
      setRestaurants(data.businesses);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Navbar logout={props.handleLogout} />
      <HomeContainer>
        <Typography variant="h2" gutterBottom>
          Welcome to EATS.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Here are some food options near you. Search below to personalize your results.
        </Typography>
        <SearchBar
          fullWidth
          variant="outlined"
          placeholder="Search…"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Grid container spacing={2}>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
                <RestaurantCard>
                  <CardActionArea>
                    <CardMediaImage
                      component="img"
                      alt={restaurant.name}
                      image={restaurant.image_url || 'https://www.officespacesny.com/wp-content/themes/realestate-7/images/no-image.png'}
                    />
                    <CardContentCentered>
                      <Typography variant="h5" component="div">
                        {restaurant.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {restaurant.categories.map((category) => category.title).join(', ')}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => props.handleMoreInfo(restaurant)}
                      >
                        More Info
                      </Button>
                    </CardContentCentered>
                  </CardActionArea>
                </RestaurantCard>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align='center'>No restaurants found</Typography>
          )}
        </Grid>
      </HomeContainer>
      <footer>
        <div>
          <Typography variant="h6">EATS</Typography>
          <Typography variant="body2">Flatiron School Capstone Project 2021</Typography>
        </div>
      </footer>
    </>
  );
}
