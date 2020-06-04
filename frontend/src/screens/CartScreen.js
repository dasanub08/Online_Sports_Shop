import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function CartScreen(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
        alert('Item removed from cart');
    }
    useEffect(() => {
        if (productId)
            dispatch(addToCart(productId, qty));
    }, [])

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>
                        Price
                        </div>
                </li>
                {
                    cartItems.length === 0 ? <div>
                        Cart is Empty
                        </div> :
                        cartItems.map(item =>
                            <div>
                                <div className="cart-image">
                                    <img className="itemimg" src={item.image} alt="products" />
                                </div>
                                <div className="cart-name">
                                    <Link to={"/product/" + item.product}>
                                        {item.name}
                                    </Link>
                                </div>
                                <div>
                                    Qty: &nbsp;
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                        Delete
                                    </button>
                                </div>
                                <div className="cart-price">
                                    Rs.{item.price}
                                </div>
                            </div>
                        )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :
                    Rs. {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <Link to={"/order/" + cartItems.product}>
                <button className="button primary" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
            </Link>
        </div>

    </div>
}
export default CartScreen;