import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import Button from '@material-ui/core/Button';
import ShoppingBasketSharpIcon from '@material-ui/icons/ShoppingBasketSharp';

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
        <>
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>

            </div>

            <img src={image} alt="" />
                <Button startIcon={<ShoppingBasketSharpIcon />} onClick={addToBasket} color="black" variant="contained" style={{ background: '#03a9f4'}}>Add to Basket</Button>
        </div>
        
        </>
    );
}

export default Product;