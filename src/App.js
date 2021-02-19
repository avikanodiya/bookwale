import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from './Header';
import Checkout from "./Checkout"
import Login from "./Login"
import { db, auth } from "./firebase"
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders"
import Payment from "./Payment";
import firebase from './firebase';


const promise = loadStripe(
  "pk_test_51ILLtKIKK9XemNXpnYSyLrrjuFRBdtqTYbPFOtcUvKLss29RYMUmuhTdxu2Tb9ZzSps5XJpvQ1lACbVRSX5kUcSO00ZcDX1Tce"
);

function App() {

  const [bookslist, setBookslist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("books").get()
      setBookslist(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])


  const [{ books }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("the user is >>>", authUser);

      if (authUser) {
        //user logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });

      } else {
        //user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });

      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home bookslist={bookslist} />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;


