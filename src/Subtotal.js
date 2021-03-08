import React, { useState, useEffect } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button"

function Subtotal({ basketValue, setbasketValue }) {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  const [discount, setDiscount] = useState('');


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

  return (
    <div className="subtotal">

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
      {!basketValue ? <Button color="primary" disabled variant="contained" onClick={e => history.push('/payment')}>Proceed to Checkout</Button> :
        <Button color="primary" size="small" variant="contained" onClick={e => history.push('/payment')}>Proceed to Checkout</Button>
      }

    </div>
  );
}

export default Subtotal;
