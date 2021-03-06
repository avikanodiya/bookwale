import { React, useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Home({ bookslist, searchItem, bookdata }) {
    const useStyles = makeStyles((theme) => ({
        hero: {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://c1.wallpaperflare.com/preview/281/150/428/various-book-books.jpg')`,
            height: "350px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "4rem",
            [theme.breakpoints.down("sm")]: {
                height: 300,
                fontSize: "3em"
            }
        }
    }));


    const [{ }, dispatch] = useStateValue();
    const classes = useStyles();

    return (<><Box className={classes.hero}>
        <Box align="center">Books At Your Doorstep!</Box>
    </Box>
        <section>
            <Product
                bookslist={bookslist}
                searchItem={searchItem}

            ></Product>
        </section>
        <Container >
            <Typography  component={Link} to="/privacypolicy">Privacy Policy</Typography>
        </Container>
    </>

    );
}

export default Home;