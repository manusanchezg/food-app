import React, { useEffect } from "react";
import { getRecipeDetail, clearPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./detail.module.css";

export default function RecipeDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeDetail(props.match.params.id));
    return ()=> dispatch(clearPage())
  }, [dispatch, props.match.params.id]);

  function handleClick() {
    dispatch(clearPage());
  }

  const recipe = useSelector((state) => state.recipe);

  return (
    <div>
      <Link to={"/recipes"} onClick={() => handleClick()}>
        {" "}
        <button className={style.homeBtn}>Home</button>{" "}
      </Link>
      {recipe.hasOwnProperty("title") ? (
        <div className={style.containerDetail}>
          <h2 className={style.detailTitle}>{recipe.title}</h2>
          <img
            src={recipe.img ? recipe.img : recipe.image}
            alt={recipe.title}
            className={style.image}
          />
          <p className={style.summary}>
            {recipe.summary.replace(/<[^>]+>/g, "")}
          </p>

          <div className={style.containerScore}>
            <p>
              Taste Score:{" "}
              <span className={style.score}>{recipe.spoonacularScore}</span>
            </p>
            <p>
              Health Score:{" "}
              <span className={style.score}>{recipe.healthScore}</span>
            </p>
          </div>

          <ol className={style.containerList}>
            {typeof recipe.analyzedInstructions === "object" ? (
              recipe.analyzedInstructions.length ? recipe.analyzedInstructions[0].steps.map((steps) => (
                <li key={steps.number} className={style.liDetail}>
                  {steps.step}
                </li>
              )) : <h2 className={style.liDetail}> This recipe has no steps </h2>
            ) : (
              <li className={style.liDetail}>
                {recipe.analyzedInstructions}
              </li>
            )}
          </ol>
        </div>
      ) : (
        <div className={style.loader}>
          <div className={style.ball}></div>
          <div className={style.ball}></div>
          <div className={style.ball}></div>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}
