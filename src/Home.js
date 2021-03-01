import { React, useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import { ref, db, auth, database } from './firebase'
import firebase from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


function Home({ bookslist, searchItem ,bookdata}) {
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
        <Box>Perfect Place for your Brain!!!</Box>
    </Box>
        <section>
            <Product
                bookslist={bookslist}
                searchItem={searchItem}
                
            ></Product>
        </section>
    </>

    );
}

export default Home;