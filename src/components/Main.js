import React, { useContext, useEffect, useRef, useState } from "react";
import { cart, categories } from "../App";
import { Thumb_Images } from "./images";
import product_Title from "./title.json";

function Main(props) {
  const [selectedImg, setSelectedImg] = useState(Thumb_Images[0].main);
  const [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [Title, setTitle] = useState("");
  const title = useRef();
  const price = useRef();
  const didMount = useRef(false);
  const [cartItems, setCartItems] = React.useContext(cart);
  const [category] = useContext(categories);

  const handleImgClick = (img) => {
    setSelectedImg(img.main);
  };

  const UpdateCart = () => {
    const newCart = cartItems.map((i) => {
      if (i.deets === title.current.innerHTML) {
        return { ...i, quantity: quantity };
      }
      return i;
    });

    setCartItems(newCart);
  };
  const addToCart = () => {
    if (quantity > 0) {
      setCartItems([
        ...cartItems,
        {
          img: selectedImg,
          deets: title.current.innerHTML,
          price: price.current.innerHTML,
          quantity: quantity,
        },
      ]);
    }
  };

  useEffect(() => {
    cartItems.some((i) => {
      if (i.deets === Title) {
        setInCart(true);
        setQuantity(i.quantity);
      }
    });
  }, [cartItems, category, Title]);

  useEffect(() => {
    setTitle(product_Title[category]);
    setInCart(false);
  }, [category]);

  return (
    <main>
      <section className="product-img">
        <div className="main-img">
          <img alt="main" src={selectedImg}></img>
        </div>
        <div className="sub-img">
          {Thumb_Images.map((t) => {
            return (
              <img
                alt="thumbnail"
                src={t.thumbnail}
                onClick={(e) => {
                  handleImgClick(t);
                }}
              ></img>
            );
          })}
        </div>
      </section>
      <section className="product-details">
        <div className="product-details--wrapper">
          <div className="title">
            <p>SNEAKER COMPANY</p>
            <h1 ref={title}>{Title}</h1>
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
                $125.00
              </p>
              <p className="discount">50%</p>
            </span>
            <p className="original-price">$250.00</p>
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
            <button className="addTo" onClick={inCart ? UpdateCart : addToCart}>
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" />
              </svg>
              <p>{inCart ? "Update Cart" : "Add to cart"}</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Main;
