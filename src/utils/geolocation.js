export const getLocation = () => {
    return new Promise((resolve, reject) => {
       if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
           const { latitude, longitude } = position.coords;
           resolve({ latitude, longitude });
         }, (error) => {
           console.error('Error getting user location:', error);
           reject(error);
         });
       } else {
         console.error('Geolocation not available');
         resolve({ latitude: 37.7749, longitude: -122.4194 });
       }
    });
   };
   