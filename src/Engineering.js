import React from 'react'
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";

function Engineering({ bookslist, searchItem }) {
    const [{ }, dispatch] = useStateValue();
    var bookslist = bookslist.filter(book => {
        if (book.category == "Engineering") {
            return book;
        }
    })
    return (
        <section>
            <Product
                bookslist={bookslist}
                searchItem={searchItem}
            ></Product>
        </section>
    )
}

export default Engineering
