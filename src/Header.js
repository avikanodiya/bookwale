import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';

function Header() {
    const[{basket},dispatch] = useStateValue();

    return (
        //logo
        <div className='header'>
            <img src="img/pngtree-books-logo-image_79985.png"
                alt="LOGO"
                className="header_logo" />


            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />



            </div>

            <div className="header_nav">
                <div className="header__option">
                    <span className="header_optionLineone">Hello Guest</span>
                    <span className="header_optionLinetwo">Sign In</span>

                </div>

                <div className="header__option">
                    <span className="header_optionLineone">Returns &</span>
                    <span className="header_optionLinetwo">Orders</span>

                </div>

                <div className="header__option">
                    <span className="header_optionLineone">your Deal of</span>
                    <span className="header_optionLinetwo"> the Day</span>

                </div>

                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLinetwo header__basketCount">{basket?.length}</span>

                </div>



            </div>

        </div>
    )
}

export default Header
