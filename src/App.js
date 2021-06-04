import React from 'react';
import './App.css';
import LogIn from './Login/Login'
import Home from './Home/Home'
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from "react-router-dom";
import Info from './Info/Info'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      resturaunts: [],
      location: { longitude: 0, latitude: 0 },
      term: '',
      info: {}
    }
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
    window.location.href = '/login';
  }

  getResturaunts = () => {

    const success = (data) => {
      this.setState({ location: { longitude: data.coords.longitude, latitude: data.coords.latitude } })
      console.log(data, 'success')

      fetch(`http://localhost:3000/api/v1/yelp_restaurants/?lat=${data.coords.latitude}&long=${data.coords.longitude}&term=${this.state.term} food`, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer TfAfZ9CEBvQhMOvO5CcgbnmVNh4raReuVs6pQ5T9feqpz8_QmXw-R1kWfxJTvMoE5d7mGrencCzHmRCR2alxB2whr8GMm0byjI22x0kia_u2TgHwPLdrwO31RBSwYHYx'
        }
      })
        .then(res => res.json())
        .then(data => this.setState({ resturaunts: data.result.businesses }))

    }

    const fail = (data) => {
      console.log(data, 'fail')
    }

    window.navigator.geolocation.getCurrentPosition(success, fail)

    if (this.state.loggedIn === false) {
      this.setState({ loggedIn: true })
    } else {
      console.log('already logged in')
    }
  }

  componentDidMount() {
    this.getResturaunts()
  }

  handleSearch = (e) => {
    this.setState({ term: e.target.value })
    this.getResturaunts()
  }

  handleMoreinfo = (card) => {
    console.log(card.id)
      localStorage.setItem("infoData", card.id);
      window.location.href = '/info';
  }

  render() {
    return (
      <div className="App">
        {localStorage.token ? (
          <Switch>
            <Route exact path="/home">
              <Home handleMoreinfo={this.handleMoreinfo} allResturaunts={this.state.resturaunts} handleLogout={this.handleLogout} term={this.state.term} handleSearch={this.handleSearch} />
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
          </Switch>

        )}
      </div>
    )
  }
}

export default withRouter(App);




