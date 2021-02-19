import { React, useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import { ref, db, auth, database } from './firebase'
import firebase from './firebase';



function Home({ bookslist }) {
    const [{ books }, dispatch] = useStateValue();




    return (
        <section>
            {bookslist.map(book => (<Product
                image={book.image}
                title={book.title}
                price={book.price}
            ></Product>))}
        </section>
    );
}

export default Home;