import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../../middlewear';
import {TextField, styled} from '@mui/material';
import { useDispatch } from 'react-redux';


const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const FoodSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
  }, [searchTerm]);

  //Get User Geolocation
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

  const fetchData = (latitude, longitude) => {
    getRestaurants(latitude, longitude, searchTerm, null, true, 'best_match', dispatch)
      .then(data => {
        // dispatch(data.businesses);
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchBar
      fullWidth
      variant="outlined"
      placeholder="Click here to search for food near you! ..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}
