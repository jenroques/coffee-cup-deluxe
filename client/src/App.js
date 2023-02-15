import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Context } from "./Utils/Context";
import Login from './User/Login';
import SignUp from './User/SignUp';
import Shops from './Shops/Shops';
import Navbar from './Utils/Navbar';
import Profile from './User/Profile';
import ShopDetail from './Shops/ShopDetail';
import AddReview from './Reviews/AddReview';

function App() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([])
  const [id, setId] = useState(undefined);
  const [shop, setShop] = useState([]);
  const [shops, setShops] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [shopReviews, setShopReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // check local storage for isLoggedIn and set the authentication state
    const isLoggedInStorage = localStorage.getItem('isLoggedIn');
    if (isLoggedInStorage === 'true') {
      setIsLoggedIn(prevIsLoggedIn => true);
    }
  }, []);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    })
  }, []);

  useEffect(() => {
    fetch("/shops")
      .then((res) => {
        if (res.ok) {
          res.json().then((shops) => setShops(shops));
        }
      })
  }, []);

  useEffect(() => {
    fetch("/users")
      .then((res) => {
        if (res.ok) {
          res.json().then((users) => setUsers(users));
        }
      })
  }, []);

  useEffect(() => {
    fetch("/reviews")
      .then((res) => {
        if (res.ok) {
          res.json().then((reviews) => setReviews(reviews));
        }
      })
  }, [])



  // console.log(shops)
  // console.log(reviews)
  // console.log(user)
  // console.log(shop)

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        history.push("./login")
      }
      setIsLoggedIn(false)
      localStorage.removeItem('isLoggedIn');
    });
  }

  //console.log(users)
  // if (!user) return <Login setUser={setUser} />


  return (
    <Context.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        id,
        setId,
        shop,
        setShop,
        shops,
        setShops,
        reviews,
        setReviews,
        shopReviews,
        setShopReviews,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      <>
        <Navbar handleLogout={handleLogout} user={user} id={id} />
        <Switch>
          <Route exact path="/">
            <Login setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/shops">
            <Shops shops={shops} shop={shop} setShop={setShop} />
          </Route>
          <Route exact path="/shops/:id">
            <ShopDetail shops={shops} shop={shop} setShop={setShop} setShopReviews={setShopReviews} shopReviews={shopReviews} user={user} users={users} />
          </Route>
          <Route exact path="/addreview">
            <AddReview reviews={reviews} setReviews={setReviews} user={user} shop={shop} />
          </Route>
          <Route exact path="/me" >
            <Profile user={user} />
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={setUser} />
          </Route>
        </Switch>
      </>
    </Context.Provider >
  );
}

export default App;
