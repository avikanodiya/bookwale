import React from 'react'
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";

function Science({ bookslist, searchItem }) {
    const [{ }, dispatch] = useStateValue();
    var bookslist = bookslist.filter(book => {
        if (book.category == "Science") {
            return book;
        }
    })
    return (
        <section>
            {bookslist.filter(book => {
                if (searchItem == "") {
                    return book;
                } else if (book.title.toLowerCase().includes(searchItem.toLowerCase())) {
                    return book;
                }


            }).map(book => (<Product
                image={book.image}
                title={book.title}
                price={book.price}
            ></Product>))
            }
        </section>

    )
}

export default Science
