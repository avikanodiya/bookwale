import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import Button from '@material-ui/core/Button';
import ShoppingBasketSharpIcon from '@material-ui/icons/ShoppingBasketSharp';

function Productdeal({ id, title, image, price, rating }) {
    const [{ state, basket }, dispatch] = useStateValue();
    const discprice = price - price / 100 * 20;

    const addToBasket = () => {

        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: discprice,
                rating: rating,
            },

        });

    };

    return (
        <>
            <div className="product">
                
                <div className="product__info">
                    <p>{title}</p>
                    <p className="product__price">
                        <small>₹</small>
                        <strong><strike>{price}</strike></strong>
                    </p>
                    <p className="product__price">
                        <small>₹</small>
                        <strong>{discprice}</strong>
                    </p>

                </div>

                <img src={image} alt="" />
                <Button startIcon={<ShoppingBasketSharpIcon />} onClick={addToBasket} color="black" variant="contained" color="primary">Add to Basket</Button>
            </div>

        </>
    );
}

export default Productdeal;