import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import LogIn from './Componenets/Login/Login';
import Home from './Componenets/Home/Home';
import Info from './Componenets/Info/Info';
import ErrorScreen from './Componenets/ErrorScreen/ErrorScreen';
import { loginUser, getRestaurants } from './api'; // Updated import

// Import Material-UI components and styles
import CssBaseline from '@mui/material/CssBaseline'; // Use CssBaseline from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

class App extends Component {
  state = {
    loggedIn: false,
    restaurants: [], // Updated variable name
    location: { longitude: 0, latitude: 0 },
    term: '',
    info: {},
    error: false, // New state to handle errors
  };

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name: e.target[0].value,
      password: e.target[2].value,
    };

    loginUser(user)
      .then((data) => {
        localStorage.setItem('token', data.token);
        this.setState({ loggedIn: true }); // Set the loggedIn state to true
        this.props.history.push('/home');
      });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, restaurants: [] }); // Reset loggedIn and remove the restaurants
    this.props.history.push('/login');
  };

  getRestaurants = () => {
    if (!this.state.loggedIn) return; // Only fetch when the user is logged in

    const success = (data) => {
      const { latitude, longitude } = data.coords;
      this.setState({ location: { latitude, longitude } });

      getRestaurants(latitude, longitude, this.state.term)
        .then((data) => this.setState({ restaurants: data.result.businesses }))
        .catch((error) => {
          console.log(error);
          this.setState({ error: true });
        });
    };

    const fail = (data) => {
      console.log(data, 'fail');
      this.setState({ error: true });
    };

    window.navigator.geolocation.getCurrentPosition(success, fail);
  };

  componentDidMount() {
    this.getRestaurants(); // Fetch restaurants when the component mounts
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.term !== this.state.term || prevState.loggedIn !== this.state.loggedIn) {
      this.getRestaurants(); // Fetch restaurants when the term or loggedIn state changes
    }
  }

  handleSearch = (e) => {
    this.setState({ term: e.target.value });
  };

  handleMoreInfo = (card) => {
    localStorage.setItem('infoData', card.id);
    this.props.history.push('/info');
  };

  render() {
    if (this.state.error) {
      return <ErrorScreen />;
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {localStorage.token ? (
            <Switch>
              <Route exact path="/home">
                <Home
                  handleMoreInfo={this.handleMoreInfo}
                  allRestaurants={this.state.restaurants} // Updated variable name
                  handleLogout={this.handleLogout}
                  term={this.state.term}
                  handleSearch={this.handleSearch}
                  sx={{ width: '100%' }} // Added inline styling using sx
                />
              </Route>
              <Route exact path="/info">
                <Info info={this.state.info} />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/home">
                <LogIn handleLogin={this.handleLogin} />
              </Route>
              <Route exact path="/login">
                <LogIn handleLogin={this.handleLogin} />
              </Route>
              <Redirect to="/login" />
            </Switch>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
