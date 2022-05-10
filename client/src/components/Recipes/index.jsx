import { getAllRecipes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard";
import Pagination from "../Pagination";
import style from "./recipes.module.css";
import imagen from "../../images/pizza.png";
import NavBar from "../NavBar";

export default function Recipes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  const recipes = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.navAndRecipe}>
      <div>
        {" "}
        <NavBar setCurrentPage={setCurrentPage} />{" "}
      </div>
      <div className={style.containerMaster}>
        <div className={style.container}>
          {currentRecipes.length ? (
            currentRecipes.map((recipe) => (
              <div className={style.card} key={recipe.id}>
                <RecipeCard
                  title={recipe.title}
                  image={recipe.image}
                  diets={
                    recipe.myDataBase
                      ? recipe.diets.map((diet) => (
                          <p key={diet.id} className={style.diets}>
                            {diet.name}
                          </p>
                        ))
                      : recipe.diets.map((diet) => (
                          <p key={diet} className={style.diets}>
                            {diet}
                          </p>
                        ))
                  }
                  id={recipe.id}
                />
              </div>
            ))
          ) : (
            <div className={style.loadingFace}>
              <h2 className={style.loading}>
                Cooking Recipes <span className={style.dots}>...</span>
              </h2>
              <div className={style.pizza}>
                <img src={imagen} alt="Rotating Pizza" />
              </div>
            </div>
          )}
        </div>
        <div className={style.pagination}>
          <Pagination
            recipesPerPage={recipesPerPage}
            recipes={recipes.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
