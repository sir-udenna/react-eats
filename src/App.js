import React from 'react';
import './App.css';
import LogIn from './Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  BrowserRouter,
  // Redirect
} from "react-router-dom";

class App extends React.Component {

  // http://api.openweathermap.org/data/2.5/weather?q=houston&appid=01e37278f53966b3856ffe031fc95713



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

  handleLogin = (e) => {
    e.preventDefault()
    let user = {
      name: e.target[0].value,
      password: e.target[1].value
    }

    let reqPackage = {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(user)
    }

    fetch('http://localhost:3000/api/v1/login', reqPackage)
    .then(res => res.json())
    .then(data=> {
      // localStorage.token = data.token
      localStorage.setItem("token", data.token)
      // this.getDragons()
      

    })
  }
  handleLogout = () =>{
    // clear localstorage
    console.log('clear localstorage')
    localStorage.clear()
    // redirect 
    
  }

  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {/* form to login goes here */}
            <LogIn handleLogin = {this.handleLogin}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    )
  }
}

export default App;
