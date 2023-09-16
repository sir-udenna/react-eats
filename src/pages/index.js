// import React, { Component } from 'react';
// import { useRouter } from 'next/router'; // Import useRouter
// import Link from 'next/link'; // Import Link
// import Home from '../Componen
// import Info from '../Components/Info/Info';
// import ErrorScreen from '../components/ErrorScreen/ErrorScreen';
// import { loginUser, getRestaurants } from '../api';
// import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme();

// class HomePage extends Component {
//   state = {
//     loggedIn: false,
//     restaurants: [],
//     location: { longitude: 0, latitude: 0 },
//     term: '',
//     info: {},
//     error: false,
//   };

//   handleLogin = (e) => {
//     e.preventDefault();
//     const user = {
//       name: e.target[0].value,
//       password: e.target[2].value,
//     };

//     loginUser(user)
//       .then((data) => {
//         localStorage.setItem('token', data.token);
//         this.setState({ loggedIn: true });
//         // Use Next.js' router to navigate to '/home'
//         useRouter().push('/home');
//       });
//   };

//   handleLogout = () => {
//     localStorage.removeItem('token');
//     this.setState({ loggedIn: false, restaurants: [] });
//     // Use Next.js' router to navigate to '/login'
//     useRouter().push('/login');
//   };

//   getRestaurants = () => {
//     if (!this.state.loggedIn) return;

//     const success = (data) => {
//       const { latitude, longitude } = data.coords;
//       this.setState({ location: { latitude, longitude } });

//       getRestaurants(latitude, longitude, this.state.term)
//         .then((data) => this.setState({ restaurants: data.result.businesses }))
//         .catch((error) => {
//           console.log(error);
//           this.setState({ error: true });
//         });
//     };

//     const fail = (data) => {
//       console.log(data, 'fail');
//       this.setState({ error: true });
//     };

//     window.navigator.geolocation.getCurrentPosition(success, fail);
//   };

//   componentDidMount() {
//     this.getRestaurants();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.term !== this.state.term || prevState.loggedIn !== this.state.loggedIn) {
//       this.getRestaurants();
//     }
//   }

//   handleSearch = (e) => {
//     this.setState({ term: e.target.value });
//   };

//   handleMoreInfo = (card) => {
//     localStorage.setItem('infoData', card.id);
//     // Use Next.js' router to navigate to '/info'
//     useRouter().push('/info');
//   };

//   render() {
//     if (this.state.error) {
//       return <ErrorScreen />;
//     }

//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           {localStorage.token ? (
//             <div>
//               <Link href="/home">Home</Link> | <Link href="/info">Info</Link> | <button onClick={this.handleLogout}>Logout</button>
//               <Home
//                 handleMoreInfo={this.handleMoreInfo}
//                 allRestaurants={this.state.restaurants}
//                 handleSearch={this.handleSearch}
//               />
//               <Info info={this.state.info} />
//             </div>
//           ) : (
//             <div>
//               <Link href="/login">Login</Link>
//             </div>
//           )}
//         </div>
//       </ThemeProvider>
//     );
//   }
// }

// export default HomePage;
