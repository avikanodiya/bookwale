import React, { useState } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";
import { auth } from './firebase';
import Deals from './Deals';
import firebase, { db } from './firebase';


const Header = ({ booklist, setSearchItem, searchItem }) => {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        //logo
        <div className='header'>
            <Link to="/">
                <img
                    className="header__logo"
                    src=""
                    alt="bookshop logo"
                />
            </Link>


            <div className="header_search">
                <input className="header_searchInput" type="text" onChange={e => setSearchItem(e.target.value)} />
                <SearchIcon className="header__searchIcon" />



            </div>

            <div className="header_nav">

                <div className="header__option">
                    {!user ? <Link to={!user && '/login'} className="usermail"><span className="header_optionLineone dropbtn">SignIn Here</span></Link> : <div class="dropdown">
                        <button class="dropbtn header_optionLineone" ><span>{user.email}</span></button>
                        <div class="dropdown-content" onClick={handleAuthenticaton}>
                            <Link to="/"><a>Sign Out</a></Link>
                        </div>
                    </div>}

                </div>


                <div className="header__option">
                    <div class="dropdown">
                        <button class="dropbtn header_optionLineone" ><span>Category</span></button>
                        <div class="dropdown-content">
                            <Link to="science"><a>Science</a></Link>
                            <Link to="commerce"><a>Commerce</a></Link>
                            <Link to="engineering"><a>Engineering</a></Link>
                        </div>
                    </div>

                </div>

                <Link to='/deals'><div className="header__option dealoftheday">
                    <span className="header_optionLineone">your Deal of</span>
                    <span className="header_optionLinetwo"> the Day</span>


                </div></Link>
                {user ? <Link to="/checkout">

                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLinetwo header__basketCount">{basket?.length}</span>

                    </div>
                </Link> : <div className="header__optionBasket" onClick={() => alert('SignIn first')} style={{cursor: 'pointer'}}>
                        <ShoppingBasketIcon />
                        <span className="header__optionLinetwo header__basketCount">{basket?.length}</span></div>}
            </div>





        </div>
    )
}

export default Header
