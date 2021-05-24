import React from 'react';
import './App.css';
import LogIn from './Login/Login'
import Home from './Home/Home'
import  { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from "react-router-dom";
// Redirect, Link, Router,

class App extends React.Component {
  state = {
    loggedIn: false
  }

  handleLogin = (e) => {
    e.preventDefault()
    let user = {
      name: e.target[0].value,
      password: e.target[2].value
    }

    let reqPackage = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(user)
    }

    fetch('http://localhost:3000/api/v1/login', reqPackage)
      .then(res => res.json())
      .then(data => {
        // localStorage.token = data.token
        localStorage.setItem("token", data.token)
        this.getResturaunts()
        this.setState({ loggedIn: true })
        this.props.history.push("/home")
      })
  }
  handleLogout = () => {
    // clear localstorage
    console.log('clear localstorage')
    localStorage.clear()
    // redirect 
    this.setState({ loggedIn: false })
  }

  getResturaunts = () => {
    fetch('http://localhost:3000/api/v1/restaurants', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  // componentDidMount() {

  // fetch("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=29.7407&longitude=-95.4636&limit=5&currency=USD&distance=2&open_now=false&lunit=mi&lang=en_US", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-key": "b8ff6ed078msh07057e8dba637a4p181fb2jsn24c2f0f4eeb7",
  //     "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
  //   }
  // })
  // .then(response => response.json())
  // .then(response => {
  //   console.log(response);
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  // }

  render() {
    console.log(this.state.loggedIn)

    return (
      <div className="App">
            {localStorage.token ? (
              <Switch>
              <Route exact path="/home">
                <Home test={this.getResturaunts} />
              </Route>
              </Switch>
            ) : (
              <Switch>
            <Route exact path="/login">
              <LogIn handleLogin={this.handleLogin} />
            </Route>
            <Redirect to="/login" />
            </Switch>
            )}
      </div>
    )
  }
}

export default withRouter(App);

  // http://api.openweathermap.org/data/2.5/weather?q=houston&appid=01e37278f53966b3856ffe031fc95713




