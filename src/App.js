import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import LogIn from './Componenets/Login/Login';
import Home from './Componenets/Home/Home';
import Info from './Componenets/Info/Info';
import ErrorScreen from './Componenets/ErrorScreen/ErrorScreen';
import { loginUser, getRestaurants } from './api'; // Updated import

class App extends Component {
  state = {
    loggedIn: false,
    resturaunts: [], // Move the restaurants to the loggedIn user state
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
    this.setState({ loggedIn: false, resturaunts: [] }); // Reset loggedIn and remove the restaurants
    this.props.history.push('/login');
  };

  getResturaunts = () => {
    if (!this.state.loggedIn) return; // Only fetch when user is logged in

    const success = (data) => {
      const { latitude, longitude } = data.coords;
      this.setState({ location: { latitude, longitude } });

      getRestaurants(latitude, longitude, this.state.term)
        .then((data) => this.setState({ resturaunts: data.result.businesses }))
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
    this.getResturaunts(); // Fetch restaurants when the component mounts
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.term !== this.state.term || prevState.loggedIn !== this.state.loggedIn) {
      this.getResturaunts(); // Fetch restaurants when the term or loggedIn state changes
    }
  }

  handleSearch = (e) => {
    this.setState({ term: e.target.value });
  };

  handleMoreinfo = (card) => {
    localStorage.setItem('infoData', card.id);
    this.props.history.push('/info');
  };

  render() {
    if (this.state.error) {
      return <ErrorScreen />;
    }

    return (
      <div className="App">
        {localStorage.token ? (
          <Switch>
            <Route exact path="/home">
              <Home
                handleMoreinfo={this.handleMoreinfo}
                allResturaunts={this.state.resturaunts}
                handleLogout={this.handleLogout}
                term={this.state.term}
                handleSearch={this.handleSearch}
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
    );
  }
}

export default withRouter(App);
