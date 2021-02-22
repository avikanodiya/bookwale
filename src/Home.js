import { React, useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import { ref, db, auth, database } from './firebase'
import firebase from './firebase';



function Home({ bookslist, searchItem }) {
    const [{ books, setSearchItem }, dispatch] = useStateValue();


    return (
        <section>
            {bookslist.filter(book => {
                if (searchItem ==""){
                    return book;
                } else if(book.title.toLowerCase().includes(searchItem.toLowerCase())) {
                    return book;
                }

                
            }).map(book => (<Product
                image={book.image}
                title={book.title}
                price={book.price}
            ></Product>))
            }
        </section>

    );
}

export default Home;