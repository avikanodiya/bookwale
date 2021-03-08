import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from './Header';
import Checkout from "./Checkout"
import Login from "./Login1"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders"
import Payment from "./Payment";
import Science from "./Science";
import Commerce from "./Commerce";
import Engineering from "./Engineering";
import Deals from './Deals'
import Greeting from './Greeting'


const promise = loadStripe(
  "pk_test_51ILLtKIKK9XemNXpnYSyLrrjuFRBdtqTYbPFOtcUvKLss29RYMUmuhTdxu2Tb9ZzSps5XJpvQ1lACbVRSX5kUcSO00ZcDX1Tce"
);

function App() {

  const [bookslist, setBookslist] = useState([]);
  const [searchItem, setSearchItem] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://bookstore-dc5e8-default-rtdb.firebaseio.com/products.json")
      const data = await response.json();
      var keys = Object.keys(data);
      var bookslist = [];
      for (let i in data) {
        var k = keys[i];
        console.log(k);
        bookslist.push(data[i]);
      }
      console.log(bookslist);
      console.log(data);
      console.log(keys);
      setBookslist(bookslist);
    }
    fetchData()


  }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await db.collection("books").get()
  //     setBookslist(data.docs.map(doc => doc.data()))
  //   }
  //   fetchData()

  // }, [])
  console.log(bookslist);


  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/science">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Science bookslist={bookslist} setSearchItem={setSearchItem} searchItem={searchItem} />
          </Route>
          <Route path="/commerce">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Commerce bookslist={bookslist} setSearchItem={setSearchItem} searchItem={searchItem} />
          </Route>
          <Route path="/engineering">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Engineering bookslist={bookslist} setSearchItem={setSearchItem} searchItem={searchItem} />
          </Route>
          <Route path="/deals">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Deals bookslist={bookslist} setSearchItem={setSearchItem} searchItem={searchItem} />
          </Route>
          <Route path="/greeting">
            <Greeting />
          </Route>
          <Route path="/">
            <Header searchItem={searchItem} setSearchItem={setSearchItem} />
            <Home bookslist={bookslist} setSearchItem={setSearchItem} searchItem={searchItem} />
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;


