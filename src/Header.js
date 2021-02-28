import React, { useState } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";
import { auth } from './firebase';
import Deals from './Deals';
import firebase, { db } from './firebase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, InputBase, Button, Menu, MenuItem } from "@material-ui/core"
import { grey } from '@material-ui/core/colors';


const Header = ({ booklist, setSearchItem, searchItem}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,

        },
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }));

    const classes = useStyles();
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
            alert('User Sign out')
        }
    }



    return (
        //logo
        <div className={classes.root}>
            <AppBar position="static" color="primary" style={{ background: '#03a9f4' }}>
                <Toolbar color="primary">
                    <Button component={Link} to="/" className={classes.title} variant="h6" noWrap color="inherit">BookWale</Button>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={e => setSearchItem(e.target.value)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                       {!user ? <Button varient="contained" color="inherit" component={Link} to={!user && "/login"}>Login</Button>:
                            <><Button color="inherit" aria-controls="logout" aria-haspopup="true" onClick={handleClick1 }>{user.email}</Button>
                       <Menu
                            id="logout"
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={handleClose1}
                        >
                                    <MenuItem onClick={handleClose1, handleAuthenticaton }>Sign Out</MenuItem>
                            </Menu></>}
                        <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Category
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component={Link} to="/science">Science</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/commerce">Commerce</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/engineering">Engineering</MenuItem>
                        </Menu>
                        <Button color="inherit" component={Link} to="/deals">Deal of the day</Button>
                    </div>
                    {user ? <Link to="/checkout">

                        <div className="header__optionBasket">
                            <ShoppingBasketIcon />
                            <span className="header__optionLinetwo header__basketCount">{basket?.length}</span>

                        </div>
                    </Link> : <div className="header__optionBasket" onClick={() => alert('SignIn first')} style={{ cursor: 'pointer' }}>
                            <ShoppingBasketIcon />
                            <span className="header__optionLinetwo header__basketCount">{basket?.length}</span></div>}
                </Toolbar>
            </AppBar>





        </div>
    )
}

export default Header
