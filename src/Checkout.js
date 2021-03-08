import React, { useState } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Avatar, IconButton, Grid, Box } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getBasketTotal } from "./reducer";

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [basketValue, setbasketValue] = useState(getBasketTotal(basket));
    console.log(basket);

    return (
        <Grid item xs={12} sm={6} md={4}>

            <Typography variant="h5" display="block" gutterBottom align='center'>
                hello, {user?.email}
            </Typography>
            <Box borderBottom={1}>
                <Typography variant="h6">
                    YOUR SHOPPING BASKET !
            </Typography>
            </Box>
            <Box border={1}>
                {basket.map(item => (
                    <CheckoutProduct

                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />

                ))}

            </Box>
            <Box style={{ paddingTop: 20 }}>
                <Subtotal
                    basketValue={basketValue}
                    setbasketValue={setbasketValue} />
            </Box>
        </Grid >




    );
}

export default Checkout;