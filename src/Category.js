import React, { useState } from 'react'
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";

function Category({ bookslist, searchItem, category }) {
    const [{ }, dispatch] = useStateValue();
    var bookslist = bookslist.filter(book => {
        if (book.category == category) {
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

export default Category
