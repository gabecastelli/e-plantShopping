import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
import CartItem from "./CartItem";
import { addItem, removeItem, updateQuantity } from "./CartSlice";
import plants from "./Plants";

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [cart, setCart] = useState({}); // State to store the cart items
    const totalItems = useSelector(state => state.cart.totalItems);
    const dispatch = useDispatch();

    const styleObj = {
        backgroundColor: "#4CAF50",
        color: "#fff!important",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignIems: "center",
        fontSize: "20px",
    };
    const styleObjUl = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "1100px",
    };
    const styleA = {
        color: "white",
        fontSize: "30px",
        textDecoration: "none",
    };
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setCart((prev) => ({ ...prev, [product.name]: true }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt=""
                        />
                        <a href="/" style={{ textDecoration: "none" }}>
                            <div>
                                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        {" "}
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
                            Plants
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <h1 className="cart">
                                {totalItems > 0 ? totalItems : ""}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    id="IconChangeColor"
                                    height="68"
                                    width="68"
                                >
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none"
                                        stroke="#faf9f9"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        id="mainIconPathAttribute"
                                    ></path>
                                </svg>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plants.map((category, categoryKey) => (
                        <div key={categoryKey} className="category">
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantKey) => (
                                    <div key={plantKey} className="product-card">
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title"><h2>{plant.name}</h2></div>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>
                                        <button className="product-button" onClick={() => handleAddToCart(plant)}>Add to cart</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
