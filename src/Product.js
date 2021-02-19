import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { Button, Card } from 'react-bootstrap';


function Product({ id, title, image, price, rating }) {
    const [{ state, basket }, dispatch] = useStateValue();

    const addToBasket = () => {

        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },

        });

    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>

            </div>

            <img src={image} alt="" />

            <Button className="button" onClick={addToBasket} type="button">Add to Basket</Button>
        </div>
    );
}

export default Product;