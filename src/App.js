import React from 'react';
import './App.css';
import LogIn from './Login/Login'
import Home from './Home/Home'
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from "react-router-dom";
// Redirect, Link, Router,

class App extends React.Component {
  state = {
    loggedIn: false,
    resturaunts: []
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
        localStorage.setItem("token", data.token)
        this.getResturaunts()
        this.setState({ loggedIn: true })
        this.props.history.push("/home")
      })
  }
  handleLogout = () => {
    console.log('clear localstorage')
    localStorage.clear()
  }

  getResturaunts = () => {
    fetch('http://localhost:3000/api/v1/yelp_restaurants/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer TfAfZ9CEBvQhMOvO5CcgbnmVNh4raReuVs6pQ5T9feqpz8_QmXw-R1kWfxJTvMoE5d7mGrencCzHmRCR2alxB2whr8GMm0byjI22x0kia_u2TgHwPLdrwO31RBSwYHYx'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ resturaunts: data.result.businesses }))
      console.log(this.state.resturaunts)

    if (this.state.loggedIn === false) {
      this.setState({ loggedIn: true })
    } else {
      console.log('already logged in')
    }
  }

  render() {
    return (
      <div className="App">
        {localStorage.token ? (
          <Switch>
            <Route exact path="/home">
              <Home allResturaunts={this.state.resturaunts} handleLogout={this.handleLogout} populate={this.getResturaunts} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login">
              <LogIn handleLogin={this.handleLogin} />
              <Redirect to="/login" handleLogin={this.handleLogin} />
            </Route>
          </Switch>
        )}
      </div>
    )
  }
}

export default withRouter(App);




