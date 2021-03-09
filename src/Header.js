import React, { useState } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";
import { auth } from './firebase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, InputBase, Button, Menu, MenuItem } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';


const Header = ({ booklist, setSearchItem, searchItem, category, setCategory }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    console.log(category);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

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
            padding: theme.spacing(0, 1),
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


    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Button onClick={handleMobileMenuClose} color="inherit" component={Link} to="/">Home</Button>
            </MenuItem>
            <MenuItem>
                {!user ? <Button varient="contained" color="inherit" component={Link} to={!user && "/login"}>Login</Button> :
                    <><Button color="inherit" aria-controls="logout" aria-haspopup="true" onClick={handleClick1}>{user.email}</Button>
                        <Menu
                            id="logout"
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={handleClose1}
                        >
                            <MenuItem onClick={()=>{
                                handleMobileMenuClose() 
                                handleAuthenticaton()
                            }}>Sign Out</MenuItem>
                        </Menu></>}
            </MenuItem>
            <MenuItem>
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
                    <MenuItem onClick={() => {
                        handleClose();
                        setCategory('Law')
                        handleMobileMenuClose()
                    }} component={Link} to="/category">Law</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        setCategory('Engineering')
                        handleMobileMenuClose()
                    }} component={Link} to="/category">Engineering</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        setCategory('Bcom')
                        handleMobileMenuClose()
                    }} component={Link} to="/category">Bcom</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        setCategory('Bca')
                        handleMobileMenuClose()
                    }} component={Link} to="/category">Bca</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        setCategory('Mca')
                        handleMobileMenuClose()
                    }} component={Link} to="/category">Mca</MenuItem>
                </Menu>
            </MenuItem>
            <MenuItem>
                <Button color="inherit" component={Link} to="/deals">Deal of the day</Button>
            </MenuItem>

        </Menu >
    );


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
                        {!user ? <Button varient="contained" color="inherit" component={Link} to={!user && "/login"}>Login</Button> :
                            <><Button color="inherit" aria-controls="logout" aria-haspopup="true" onClick={handleClick1}>{user.email}</Button>
                                <Menu
                                    id="logout"
                                    anchorEl={anchorEl1}
                                    keepMounted
                                    open={Boolean(anchorEl1)}
                                    onClose={handleClose1}
                                >
                                    <MenuItem onClick={handleClose1, handleAuthenticaton}>Sign Out</MenuItem>
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

                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {/* {renderMenu} */}
        </div>
    )
}

export default Header
