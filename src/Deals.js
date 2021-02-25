import { React, useState, useEffect } from "react";
import "./Home.css";
import Productdeal from "./Productdeal";
import { useStateValue } from "./StateProvider";
import { ref, db, auth, database } from './firebase'
import firebase from './firebase';



function Deals({ bookslist, searchItem }) {
    const [{ }, dispatch] = useStateValue();


    return (
        <section><marquee style={{color: 'green'}}>20% discount on below products</marquee>
        
            {bookslist.filter(book => {
                if (book.price > 300) {
                    if (searchItem == "") {
                        return book;
                    } else if (book.title.toLowerCase().includes(searchItem.toLowerCase())) {
                        return book;
                    }}
                


            }).map(book => (<Productdeal
                image={book.image}
                title={book.title}
                price={book.price}
            ></Productdeal>))
            }
        </section>

    );
}

export default Deals;