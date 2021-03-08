import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";
import Button from "@material-ui/core/Button";
import firebase from "./firebase"

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();


    const [discount, setDiscount] = useState('');
    const [error, setError] = useState(null);;
    const [clientSecret, setClientSecret] = useState(true);
    const stringClientSecret = clientSecret.toString();
    const [address, setAddress] = useState('');
    const [basketValue, setbasketValue] = useState(getBasketTotal(basket));
    const [date, setDate] = useState('');


    const valueHandler = (basketvalue) => {
        console.log(basketvalue, 'sssssssssssssss');
        if (discount === 'first50') {
            setbasketValue(basketvalue - basketvalue / 100 * 50);
            console.log(basketValue);
        }
    }
    // useEffect(() => {
    //     // generate the special stripe secret which allows us to charge a customer
    //     const getClientSecret = async () => {
    //         const response = await axios({
    //             method: 'post',
    //             url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //         });
    //         console.log(response);
    //         setClientSecret(response.data.clientSecret)
    //     }

    //     getClientSecret();
    // }, [basket])

    console.log('THE SECRET IS >>>', stringClientSecret)
    console.log('👱', user)
    console.log(getBasketTotal(basket));
    console.log(address);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setProcessing(true);

    //     const payload = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement)
    //         }
    //     }).then(({ paymentIntent }) => {
    //         // paymentIntent = payment confirmation

    //         db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set(
    //             {
    //                 basket: basket,
    //                 amount: paymentIntent.amount,
    //                 created: paymentIntent.created
    //             })

    //         setSucceeded(true);
    //         setError(null);
    //         setProcessing(false);

    //         dispatch({
    //             type: 'EMPTY_BASKET'
    //         })

    //         history.replace('/orders')
    //     })

    // }

    // const handleChange = event => {

    //     setDisabled(event.empty);
    //     setError(event.error ? event.error.message : "");
    // }
    useEffect(() => {
        var d = new Date();
        setDate(d);
    }, [])
    console.log(date);
    console.log(basket);
    const handleSubmit = () => {
        const orders = firebase.database().ref('orders_website');

        const detail = {
            items: basket,
            date: date.toString(),
            address: address,
            TotalAmount: basketValue,
        };
        orders.push(detail);
        dispatch({
            type: 'EMPTY_BASKET'
        })
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className="user__mail"><p>Welcome , {user?.email}</p></div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <div></div>

                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>

                        <textarea className="address__area" value={address} name="" id="" cols="50" rows="10" onChange={(e) => setAddress(e.target.value)}></textarea>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            {/* <CardElement onChange={handleChange} /> */}

                            <div className='payment__priceContainer'>
                                <p>Promo Code : <input className="promo__input" type="text" onChange={(e) => setDiscount(e.target.value.toString().toLowerCase())} /> <Button size="small" variant="contained" color="primary" onClick={() => valueHandler(basketValue)}> Apply</Button></p>
                                <h3>COD(cash on delivery)</h3>
                                <h3>Order Total: {basketValue}</h3>

                            </div>
                            <Button variant="contained" onClick={handleSubmit} component={Link} to="/greeting" style={{ marginTop: '10px' }} color="secondary">Buy now</Button>
                            {/* Errors */}
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
