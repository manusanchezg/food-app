import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe, getAllRecipes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./create.module.css";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const dietsState = useSelector((state) => state.diets);
  const allRecipes = useSelector((state) => state.recipes);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: [],
    image: "",
  });

  const [error, setError] = useState({});

  function validateInput(input) {
    let error = {};
    const regex = /^[a-zA-Z ]+$/;
    const imgRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    if (!input.title || !regex.test(input.title))
      error.title = "Enter a valid title, no special characters allowed";
    if (!input.summary) error.summary = "This field is mandatory";
    if (
      !input.spoonacularScore ||
      input.spoonacularScore < 0 ||
      input.spoonacularScore > 100
    )
      error.spoonacularScore = "The number should be between 0 and 100";
    if (isNaN(input.spoonacularScore))
      error.spoonacularScore = "The Score must be a number";
    if (isNaN(input.healthScore))
      error.healthScore = "The Score must be a number";
    if (!input.healthScore || input.healthScore < 0 || input.healthScore > 100)
      error.healthScore = "The number should be between 0 and 100";
    if(!imgRegex.test(input.image))
    error.image = "The image should be an URL";
    return error;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleClassName(error) {
    if (!error) return style.inputClass;
    else return style.inputError;
  }

  function handleCheckBox(e) {
    let isChecked = e.target.checked;
    if (isChecked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
    if (!isChecked) {
      setInput({
        ...input,
        diets: input.diets.filter((diet) => diet !== e.target.value),
      });
    }
  }
  //Function for submit button recipe//
  function handleSubmit(e) {
    e.preventDefault();
    const recipesExists = allRecipes.find(
      (recipe) => recipe.title.toLowerCase() === input.title.toLowerCase()
    );
    if (
      error.title ||
      error.summary ||
      error.spoonacularScore ||
      error.healthScore
    )
      return alert("You have to fill the mandatory fields first");
    if (
      !input.title &&
      !input.summary &&
      !input.spoonacularScore &&
      !input.healthScore
    )
      return alert("You have to fill the mandatory fields first");
    if (recipesExists) return alert("This recipe already exists");
    dispatch(postRecipe(input));
    setInput({});
    history.push("/recipes");
  }

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getAllRecipes());
  }, [dispatch]);
  return (
    <div className={style.createContainer}>
      <div className={style.buttonAndTitle}>
        <Link to={"/recipes"}>
          {" "}
          <button className={style.homeBtn}>Home</button>{" "}
        </Link>
        <h2>Create Your Recipe:</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.form}>
          <label className={style.labelTitle}>Title</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handleChange(e)}
            placeholder="Recipe Name, any ideas?"
            className={handleClassName(error.title)}
          />
          {error.title && <p className={style.error}>{error.title}</p>}
          <label className={style.labelTitle}>Summary</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
            placeholder="Tell me about this Recipe"
            className={handleClassName(error.summary)}
          />
          {error.summary && <p className={style.error}>{error.summary}</p>}
          <label className={style.labelTitle}>Taste Score</label>
          <input
            type="text"
            name="spoonacularScore"
            value={input.spoonacularScore}
            onChange={(e) => handleChange(e)}
            placeholder="0-100, how much tasty?"
            className={handleClassName(error.spoonacularScore)}
          />
          {error.spoonacularScore && (
            <p className={style.error}>{error.spoonacularScore}</p>
          )}
          <label className={style.labelTitle}>Health Score</label>
          <input
            type="text"
            name="healthScore"
            value={input.healthScore}
            onChange={(e) => handleChange(e)}
            placeholder="0-100, is it healthy?"
            className={handleClassName(error.healthScore)}
          />
          {error.healthScore && (
            <p className={style.error}>{error.healthScore}</p>
          )}

          <label className={style.labelTitle}>Source Image</label>
          <input
            type="url"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
            placeholder="Example: https://image.jpg"
            className={handleClassName(error.image)}
          />
          {error.image && <p className={style.error}>{error.image}</p>}
          <label className={style.labelTitle}>Instructions:</label>
          <input
            type="text"
            name="analyzedInstructions"
            value={input.analyzedInstructions}
            onChange={(e) => handleChange(e)}
            placeholder="instructions go here"
            className={handleClassName(error.analyzedInstructions)}
            id={style.analyzedInstructions}
          />
          {error.analyzedInstructions && (
            <p className={style.error}>{error.analyzedInstructions}</p>
          )}
        </div>
        <div className={style.checkboxContainer}>
          <label className={style.labelTitle}>Diet Type</label>
          <br />
          {dietsState
            ? dietsState.map((diet) => (
                <label key={diet.id} className={style.text}>
                  <input
                    type="checkbox"
                    name={diet.name}
                    value={diet.name}
                    onChange={(e) => handleCheckBox(e)}
                    className={style.hidden}
                    defaultChecked={false}
                  />
                  <span className={style.newCheck}></span>
                  {diet.name}
                </label>
              ))
            : (dietsState = [])}
        </div>
        <div>
          <button type="submit" className={style.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
