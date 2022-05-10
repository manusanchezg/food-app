import "./App.css";
import { Route,  } from "react-router-dom";
import homePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import Recipes from "./components/Recipes";
import CreateRecipe from "./components/CreateRecipe";

function App() {
  return (
    <>
      <Route exact path={"/"} component={homePage} />
      <Route exact path={"/recipes"} component={Recipes} />
      <Route exact path={"/recipes/:id"} component={RecipeDetail} />
      <Route exact path={"/createRecipe"} component={CreateRecipe} />
    </>
  );
}

export default App;
