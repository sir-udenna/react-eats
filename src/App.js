import React from 'react';
import './App.css';
import LogIn from './Login/Login'
import Home from './Home/Home'
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
        // this.getDragons()
        this.setState({ loggedIn: true })
      })
  }
  handleLogout = () => {
    // clear localstorage
    console.log('clear localstorage')
    localStorage.clear()
    // redirect 
    this.setState({ loggedIn: false })
  }

  // componentDidMount() {

  //   fetch("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=29.7407&longitude=-95.4636&limit=5&currency=USD&distance=2&open_now=false&lunit=mi&lang=en_US", {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "b8ff6ed078msh07057e8dba637a4p181fb2jsn24c2f0f4eeb7",
  //       "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // }

  render() {
    console.log(this.state.loggedIn)
    // if (this.state.loggedIn) {
    //   return (<BrowserRouter><Route exact path="/login">{<LogIn handleLogin={this.handleLogin} />}</Route></BrowserRouter>)
    // }
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>

            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/login">
              <LogIn handleLogin={this.handleLogin} />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

  // http://api.openweathermap.org/data/2.5/weather?q=houston&appid=01e37278f53966b3856ffe031fc95713




