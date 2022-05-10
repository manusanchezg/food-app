import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterRecipesByDiet,
  orderAtoZ,
  orderByScore,
  getRecipesByNames
} from "../../redux/actions";
import style from "./navBar.module.css";

export default function NavBar({setCurrentPage}) {
  // eslint-disable-next-line
  const [order, setOrder] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  function handleFilterRecipes(e) {
    e.preventDefault();
    dispatch(filterRecipesByDiet(e.target.value));
    setCurrentPage(1);
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered by ${e.target.value}`);
  }

  function handleOrderAtoZ(e) {
    e.preventDefault();
    dispatch(orderAtoZ(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered by ${e.target.value}`);
  }

  function handleSearchButton(e) {
    e.preventDefault();
    setName(e.target.value.trim());
  }

 function handleSubmit(e) {
    e.preventDefault();
    const regex = /^[ ]/g;
    if (!name) return alert("You have to fill the input first");
    if (regex.test(name)) return alert("You have to enter a valid name");
    dispatch(getRecipesByNames(name));
    setCurrentPage(1);
    setName("");
  }

  return (
    <div className={style.navBar}>
      <Link to="/createRecipe" style={{ textDecoration: "none" }}>
        <button className={style.newRecipebtn}>New Recipe</button>
      </Link>

        <div className={style.searchContainer}>
          <input
            type="text"
            className={style.searchBar}
            placeholder="Search..."
            onChange={(e) => handleSearchButton(e)}
          />
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className={style.search}
          >
            Search
          </button>
        </div>

      <div className={style.features}>
        <select name="Alphabetic Order" onChange={(e) => handleOrderAtoZ(e)}>
          <option value="none">Select...</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select name="Score" onChange={(e) => handleOrderByScore(e)}>
          <option value="none">Select...</option>
          <option value="taste">Taste Score</option>
          <option value="health">Health Score</option>
        </select>
        <select name="Diet Type" onChange={(e) => handleFilterRecipes(e)}>
          <option value="all">All</option>
          <option value="lacto ovo vegetarian">Vegetarian</option>
          <option value="paleolithic">Paleo</option>
          <option value="dairy free">Dairy free</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="gluten free">Gluten free</option>
          <option value="primal">Primal</option>
          <option value="ketogenic">Keto</option>
        </select>
      </div>
    </div>
  );
}
