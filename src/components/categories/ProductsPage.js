import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiFilterAlt } from "react-icons/bi";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { categories } from "../../App";
import { mens, womens } from "../Propage";
function ProductsPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useContext(categories);
  const [Content, setContent] = useState(null);

  const handleClick = (item) => {
    navigate(`/Product/${item.title}`, { state: item });
  };

  const handleCheck = (e) => {
    const box = document.getElementsByClassName("filterCheck");
    const { id } = e.target;
    for (var x in box) {
      if (box.hasOwnProperty(x)) box[x].checked = false;
    }
    e.target.checked = true;

    var sortedArray = [...Content];
    if (id === "asce") {
      sortedArray = sortedArray.sort(
        (a, b) => a.price.substring(1) - b.price.substring(1)
      );
    } else if (id === "desc") {
      sortedArray = sortedArray.sort(
        (a, b) => b.price.substring(1) - a.price.substring(1)
      );
    }
    setContent(sortedArray);
  };
  useEffect(() => {
    if (category === "mens") setContent(mens);
    else setContent(womens);
  }, [category]);

  return (
    <div className="Products--wrapper">
      <div className="filter-wrapper">
        <BiFilterAlt
          onClick={() => {
            document
              .querySelector(".filter--options")
              .classList.toggle("active");
          }}
        ></BiFilterAlt>
        <div className="filter--options">
          <label>
            <input
              type="checkbox"
              class="filterCheck"
              id="asce"
              onClick={handleCheck}
            ></input>
            Price <FiArrowUp></FiArrowUp>
          </label>
          <label>
            <input
              type="checkbox"
              class="filterCheck"
              id="desc"
              onClick={handleCheck}
            ></input>
            Price <FiArrowDown></FiArrowDown>
          </label>
        </div>
      </div>
      <div className="Products">
        {Content &&
          Content.map((d) => {
            return (
              <div
                className="Product"
                onClick={() => {
                  handleClick(d);
                }}
              >
                <img src={d.img[0]}></img>
                <div className="description">
                  <div className="title">
                    <p>{d.title}</p>
                  </div>
                  <span className="price-view">
                    <p className="price">{d.price}</p>
                    <button
                      onClick={() => {
                        handleClick(d);
                      }}
                      className="more"
                    >
                      View Product
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsPage;
