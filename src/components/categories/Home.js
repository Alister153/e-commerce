import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../App";
import { imgs } from "./CollectionImgs";
function Home() {
  return (
    <div className="layout--wrapper">
      {imgs.map((i) => {
        return (
          <div className="img">
            <img src={i}></img>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
