import { find, map } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cart, categories } from "../App";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { ImCross } from "react-icons/im";

function ProductPage(props) {
  const { state } = useLocation();
  const [selectedImg, setSelectedImg] = useState(state.img[0]);
  const [quantity, setQuantity] = useState(0);
  const title = useRef();
  const price = useRef();
  const [cartItems, setCartItems] = React.useContext(cart);

  const handleImgClick = (e,img) => {
    setSelectedImg(img);
    const parent = e.target.parentElement
    const active = parent.querySelector('[dataset-active]')
    active.removeAttribute("dataset-active")
    e.target.setAttribute("dataset-active", "true")
  };
  const UpdateCart = () => {
    var newCart;
    if (quantity !== 0) {
      newCart = cartItems.map((i) => {
        if (i.deets === state.title) {
          return { ...i, quantity: quantity };
        }
        return i;
      });
    } else newCart = cartItems.filter((i) => !i.deets === state.title);

    setCartItems(newCart);
  };
  const addToCart = () => {
    if (quantity > 0) {
      setCartItems([
        ...cartItems,
        {
          img: selectedImg,
          deets: state.title,
          price: price.current.innerHTML,
          quantity: quantity,
        },
      ]);
    }
  };
  const calculatePrice = () => {
    return state.discount > 0
      ? `$${
          state.price.substring(1) -
          (state.price.substring(1) * state.discount) / 100
        }`
      : state.price;
  };
  const inCart = () => {
    return cartItems.find((i) => i.deets === state.title);
  };
  const FullView = () => {
    document.querySelector(".full-view").classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
  };
  const handleClick = (e) => {
    const { id } = e.target;
    var active;
    const parent = document.querySelector("[dataset-parent]");

    const child = [...parent.children];
    if (id === "nextBtn") {
      active = parent.querySelector("[dataset-active]");
      let nextActive = child.indexOf(active) + 1;

      if (nextActive >= child.length) nextActive = 0;

      child[nextActive].setAttribute("dataset-active", "true");
      active.removeAttribute("dataset-active");
    } else {
      active = parent.querySelector("[dataset-active]");
      let nextActive = child.indexOf(active) - 1;

      if (nextActive < 0) nextActive = child.length - 1;

      child[nextActive].setAttribute("dataset-active", "true");
      active.removeAttribute("dataset-active");
    }
  };

  useEffect(() => {
    const qty = cartItems.find((i) => i.deets === state.title);
    setQuantity(qty ? qty.quantity : 0);
  }, [cartItems, state.title]);

  return (
    <main>
      <section className="product-img">
        <div className="main-img">
          <img src={selectedImg} onClick={FullView}></img>
        </div>
        <div className="sub-img">
          {state.img.map((t, index) => {
            return (
              <img
                src={t}
                onClick={(e) => {
                  handleImgClick(e,t);
                }}
                dataset-active={index === 0&& "true"}
              ></img>
            );
          })}
        </div>
      </section>
      <section className="product-details">
        <div className="product-details--wrapper">
          <div className="title">
            <p>SNEAKER COMPANY</p>
            <h1 ref={title}>{state.title}</h1>
          </div>
          <div className="product-description">
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they'll withstand
              everything the weather can offer
            </p>
          </div>
          <div className="price-container">
            <span className="price-discount">
              <p className="price" ref={price}>
                {calculatePrice()}
              </p>
              <p className="discount">{state.discount}%</p>
            </span>
            <p className="original-price">
              {state.discount > 0 && state.price}
            </p>
          </div>
          <div className="btn-container">
            <div className="amt-btn">
              <svg
                onClick={() => {
                  if (quantity > 0) setQuantity(quantity - 1);
                }}
                width="12"
                height="4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                  id="a"
                />
              </svg>
              <p>{quantity}</p>
              <svg
                onClick={() => {
                  if (quantity < 10) setQuantity(quantity + 1);
                }}
                width="12"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                  id="b"
                />
              </svg>
            </div>
            <button
              className="addTo"
              onClick={inCart() ? UpdateCart : addToCart}
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" />
              </svg>
              <p>{inCart() ? "Update Cart" : "Add to cart"}</p>
            </button>
          </div>
        </div>
      </section>
      <div className="full-view">
        <div className="all-imgs" dataset-parent="true">
          {state.img.map((i, index) => {
            return (
              <img
                src={i}
                className="full-View-Img"
                dataset-active={index === 0 && "true"}
              ></img>
            );
          })}
        </div>
        <div className="btns">
          <ImCross className="cross" onClick={FullView}></ImCross>
          <span>
          <GrFormPrevious id="prevBtn" onClick={handleClick}></GrFormPrevious>
          <GrFormNext id="nextBtn" onClick={handleClick}></GrFormNext>
          </span>
        </div>
      </div>
    </main>
  );
}
export default ProductPage;
