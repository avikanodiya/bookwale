import React, { useState, useEffect } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button"

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  const [discount, setDiscount] = useState('');
  const [basketValue, setbasketValue] = useState(getBasketTotal(basket));

  // const getInputValue = () => {
  //   var inputVal = document.getElementById("myinput").value;
  //   setDiscount(inputVal.toString().toLowerCase());
  //   if (discount == "first50") {
  //     var basketvalue = basketvalue - basketvalue / 100 * 50;
  //     console.log(basketvalue);
  //   }
  // }
  useEffect(() => {
  }, [basketValue])

  const valueHandler = (basketvalue) => {
    console.log(basketvalue, 'sssssssssssssss');
    if (discount === 'first50') {
      setbasketValue(basketvalue - basketvalue / 100 * 50);
      console.log(basketValue);
    }
  }



  return (
    <div className="subtotal">
      <p>Promo Code : <input className="promo__input" type="text" onChange={(e) => setDiscount(e.target.value.toString().toLowerCase())} /> <Button variant="contained" color="primary" onClick={() => valueHandler(basketValue)}> Apply</Button></p>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{basketValue}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <Button variant="contained" className onClick={e => history.push('/payment')}>Proceed to Checkout</Button>
    </div>
  );
}

export default Subtotal;
