import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SingleCartItem from "./SingleCartItem";
import { useGlobalContext } from "../context/context";

const FloatingCart = ({ className }) => {
  const { state } = useGlobalContext();

  return (
    <FloatingCartWrapper className={className}>
      <header>
        <p>Cart</p>
      </header>
      <div className="divider"></div>
      <ul className="cart-items">
        {state.cart.length > 0 ? (
          state.cart.map((cartItem, index) => (
            <SingleCartItem
              key={`${cartItem.productId}-${index}`} // Unique key
              {...cartItem}
            />
          ))
        ) : (
          <p className="empty">Your cart is empty.</p>
        )}
      </ul>
      {state.cart.length > 0 && (
        <Link to="/payment" className="checkout-btn">
          Checkout
        </Link>
      )}
    </FloatingCartWrapper>
  );
};

const FloatingCartWrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: hsl(var(--white));
  border: 1px solid hsl(var(--divider));
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 300px;
  z-index: 1000;
  display: none;

  &.active {
    display: block;
  }

  header {
    padding: 1rem;
    margin-bottom: 1rem;

    p {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }

  .divider {
    width: 100%;
    height: 0.1rem;
    background-color: hsl(var(--divider));
    margin-bottom: 1rem;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;

    .empty {
      text-align: center;
      font-size: 1.2rem;
      color: hsl(var(--dark-grayish-blue));
    }
  }

  .checkout-btn {
    display: block;
    width: 100%;
    padding: 0.5rem;
    background-color: hsl(var(--orange));
    color: hsl(var(--white));
    text-align: center;
    text-decoration: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export default FloatingCart;