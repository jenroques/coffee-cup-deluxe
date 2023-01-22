import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './User/Login';
import SignUp from './User/SignUp';
import Forgot from './User/Forgot';
import Reset from './User/Reset';
import Shop from './Shops/Shop';
import Shops from './Shops/Shops';
import Navbar from './Utils/Navbar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((user) => setCurrentUser(user));
      }
    })
  }, []);

  //if (!currentUser) return <Login setCurrentUser={setCurrentUser} />
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Shops} />
        <Route exact path='/shops/${:id}' component={Shop} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </>
  );
}

export default App;
