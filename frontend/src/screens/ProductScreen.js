import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const [qty, setqty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))

        return () => {

        };
    }, [])

    const handleAddtoCart = () => {
        alert('Your Item is added to Cart');
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    return (
        <div>
            <div className="backlink">
                <Link to="/">Back to Results</Link>
            </div>
            {loading ? <div>Loading..</div> :
                error ? <div>{error}</div> :
                    (
                        <div className="details">
                            <div className="details-image">
                                <img className="prodimage" src={product.image} alt={product.name} />
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h4>{product.name}</h4>
                                    </li>
                                    <li>
                                        {product.rating} Stars ({product.numReviews} Reviews)
                        </li>
                                    <li>
                                        Price: <b>Rs.{product.price}</b>
                                    </li>
                                    <li>
                                        Description:
                            <div>{product.description}</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>
                                        Price: {product.price}
                                    </li>
                                    <li>
                                        Status: {product.countInStock > 0 ? "In Stock" : "out of Stock"}
                                    </li>
                                    <li>
                                        Qty: <select value={qty} onChange={(e) => { setqty(e.target.value) }}>
                                            {[...Array(product.countInStock).keys()].map((x, index) =>
                                                <option value={x + 1} key={index} >{x + 1}</option>
                                            )}
                                        </select>
                                    </li>
                                    <li>
                                        {product.countInStock > 0 && <button onClick={handleAddtoCart} className="button">Add to Cart</button>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
            }


        </div>
    );
}
export default ProductScreen;