import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import { Avatar, IconButton, Grid, Box } from "@material-ui/core";
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import ShoppingBasketSharpIcon from '@material-ui/icons/ShoppingBasketSharp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        maxWidth: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    icon: {
        flexGrow: 1,
        // width: 40,
        // height: 35,
        cursor: "pointer",
    },
    
    // button: {
    //     flexGrow:1,
    // }
    // expand: {
    //     transform: 'rotate(0deg)',
    //     marginLeft: 'auto',
    //     transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //     }),
    // },
    // expandOpen: {
    //     transform: 'rotate(180deg)',
    // },
    // avatar: {
    //     backgroundColor: red[500],
    // },
}));

function Product({ bookslist, searchItem }) {


    const [{ state, basket }, dispatch] = useStateValue();
    const [bookdata, setBookdata] = useState();

    const addToBasket = (book) => {

        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                
                title: book.title,
                image: book.imageUrl,
                price: book.price,
            },

        });
        console.log(book);
    };
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    return (
        // <>

        //     <Card
        //         container
        //         spacing={2}
        //         direction="row"
        //         justify="flex-start"
        //         alignItems="flex-start"
        //         className={classes.root}>

        //         <CardHeader
        //             title={title}
        //             subheader={price}
        //         />
        //         <CardMedia
        //             className={classes.media}
        //             image={image}
        //         />
        //         <CardContent>
        //             <Typography variant="body2" color="textSecondary" component="p">
        //                 This impressive paella is a perfect party dish and a fun meal to cook together with your
        //                 guests. Add 1 cup of frozen peas along with the mussels, if you like.
        //     </Typography>
        //         </CardContent>
        //         <CardActions disableSpacing>
        //             <IconButton aria-label="add to favorites">
        //                 <FavoriteIcon />
        //             </IconButton>

        //         </CardActions>

        //     </Card>
        // </><Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
        <div className={classes.root}>
            <Grid
                container
                spacing={5}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {bookslist.filter(book => {
                    if (searchItem == "") {
                        return book;
                    } else if (book.title.toLowerCase().includes(searchItem.toLowerCase())) {
                        return book;
                        
                    }
                }).map(book => (<Grid key={book.id} item xs={12} sm={6} md={4} >
                    <Card className={classes.cardStyle}>
                        <CardMedia
                            className={classes.media}
                            image={book.imageUrl}
                        />
                        <CardHeader
                            title={book.title}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                ₹{book.price}
                            </Typography>
                            {/* <AddBoxRoundedIcon onClick={addToBasket} varient="contained" className={classes.icon} type="submit" /> */}

                        </CardContent>
                        <CardActions className={classes.button}>
                            <Button size='large' startIcon={<ShoppingBasketSharpIcon />}
                                variant="contained" className={classes.icon} onClick={() => {
                                    addToBasket(book);
                                }} style={{ background: '#03a9f4' }}>add</Button>
                        </CardActions>

                    </Card>
                </Grid>))}


            </Grid>
        </div >
    );
}

export default Product;