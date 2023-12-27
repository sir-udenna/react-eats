export const setRestaurants = (restaurants) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_RESTAURANTS',
        payload: restaurants
      });
    };
   };
   