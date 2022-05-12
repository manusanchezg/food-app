import axios from "axios";
import {
  GET_ALL_RECIPES,
  GET_RECIPE,
  FILTER_BY_DIET,
  ORDER_A_TO_Z,
  ORDER_BY_SCORE,
  GET_RECIPES_BY_NAME,
  CLEAR_STATE,
  GET_DIETS,
} from "./Actions";

export const getAllRecipes = () => (dispatch) => {
  return axios
    .get("http://localhost:3001/recipes")
    .then((json) => dispatch({ type: GET_ALL_RECIPES, payload: json.data }))
    .catch((error) => console.log(error));
};
export const getRecipeDetail = (id) => {
  return async (dispatch) => {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_RECIPE, payload: json }))
      .catch((error) => console.log(error));
  };
};

export function filterRecipesByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderAtoZ(payload) {
  return {
    type: ORDER_A_TO_Z,
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}

export function getRecipesByNames(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({ type: GET_RECIPES_BY_NAME, payload: json.data });
    } catch (error) {
      window.alert(`Oops! 🤭 It looks like ${name} it's not on the menu 😅`);
    }
  };
}

export function clearPage() {
  return {
    type: CLEAR_STATE,
  };
}
export function getDiets() {
  return async (dispatch) => {
    return axios
      .get("http://localhost:3001/types")
      .then((json) => dispatch({ type: GET_DIETS, payload: json.data }))
      .catch((error) => console.log(error));
  };
}

export function postRecipe(payload) {
  return function () {
    return axios
      .post("http://localhost:3001/recipe", payload)
      .then(() => window.alert("Your recipe was created succesfully"))
      .catch((error) => window.alert(error.response.data));
  };
}

// export function deleteRecipe(payload) {
//   return function () {
//     return axios
//       .delete("http://localhost:3001/recipe", payload)
//       .then(() => window.alert(`Your recipe was deleted succesfully`))
//       .catch((error) => console.log(error.message));
//   };
// }
