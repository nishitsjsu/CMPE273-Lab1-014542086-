import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from 'axios';
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idcookie: cookie.load("id"),
      cartitem: 0,
      authFlag: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/cartitems', {
      params: {
        idcookie: this.state.idcookie
      }
    })
      .then((response) => {
        console.log("Received response")
        console.log(response.data)
        //update the state with the response data
        this.setState({

          cartitem: response.data
        });
      });
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    cookie.remove("email", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    let gb = null;
    if (cookie.load("cookie") === "buyer") {
      console.log("Able to read cookie");
      console.log(cookie.load("email"))
      navLogin = (
        <div>
          <ul class="nav navbar-nav">
            <li class="active">
              <Link to="/buyerhome">Home</Link>
            </li>
            <li>
              <Link to="/buyerprofile">Profile </Link>
            </li>
            <li>
              <Link to="/buyerpastorders">Past Orders</Link>
            </li>
            <li>
              <Link to="/buyerfutureorders">Upcoming Orders</Link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <Link to="/viewcart">
                <span class="glyphicon glyphicon-shopping-cart"></span>View Cart({this.state.cartitem})
            </Link>
            </li>
            <li>

              <Link to="/" onClick={this.handleLogout}>
                <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
            </li>
          </ul>
        </div>
      );
    } else if (cookie.load("cookie") === "owner") {
      navLogin = (
        <div>
          <ul class="nav navbar-nav">
            <li class="active">
              <Link to="/ownerhome">Home</Link>
            </li>
            <li>
              <Link to="/ownerprofile">Profile </Link>
            </li>
            <li>
              <Link to="/ownerprofile">Old Orders</Link>
            </li>
            <li>
              <Link to="/ownermenu">Menu</Link>
            </li>
            <li>
              <Link to="/ownersection">Sections</Link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <Link to="/" onClick={this.handleLogout}>
                <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
            </li>
          </ul>
        </div>
      );
    }
    else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    // if (cookie.load("cookie") === "buyer") {
    //   redirectVar = <Redirect to="/buyerhome" />;
    // } else if (cookie.load("cookie") === "owner") {
    //   redirectVar = <Redirect to="/ownerhome" />;
    // } else {
    //   redirectVar = <Redirect to="/home" />;
    // }

    if (cookie.load("cookie") === "buyer") {
      gb =
        <a class="navbar-brand" href="/buyerhome" color="red" >Grubhub</a>
    }
    if (cookie.load("cookie") === "owner") {
      gb =
        <a class="navbar-brand" href="/ownerhome" color="red" >Grubhub</a>
    }
    if (!cookie.load("cookie")) {
      gb =
        <a class="navbar-brand" href="/login" color="red" >Grubhub</a>
    }

    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              {/* <a class="navbar-brand" href="#" color="red">
                Grubhub
              </a> */}
              {gb}
            </div>
            <ul class="nav navbar-nav">
              {/* <li class="active">
                <Link to="/home">Home</Link>
              </li> */}
              {/* <li>
                <Link to="/create">Add a Book</Link>
              </li>
              <li>
                <Link to="/delete">Delete a Book</Link>
              </li> */}

            </ul>
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
