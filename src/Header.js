import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';
import {Link} from "react-router-dom";

function Header() {
    const[{basket},dispatch] = useStateValue();

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
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />



            </div>

            <div className="header_nav">
                <Link to="/login">
                    <div className="header__option">
                        <span className="header_optionLineone">Hello Guest</span>
                        <span className="header_optionLinetwo">Sign In</span>

                    </div>
                </Link>
                
                <div className="header__option">
                    <span className="header_optionLineone">Returns &</span>
                    <span className="header_optionLinetwo">Orders</span>

                </div>

                <div className="header__option">
                    <span className="header_optionLineone">your Deal of</span>
                    <span className="header_optionLinetwo"> the Day</span>

                
                    </div>
                <Link to="/checkout">

                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLinetwo header__basketCount">{basket?.length}</span>

                    </div>
                </Link>



            </div>

        </div>
    )
}

export default Header
