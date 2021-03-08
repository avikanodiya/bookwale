import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "./StateProvider";
import Button from '@material-ui/core/Button';

function CheckoutProduct({ image, title, price, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',

        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>

                {!hideButton && (
                    <Button size="small" variant="contained" color="secondary" onClick={removeFromBasket}>Remove from Basket</Button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
