import {
  GET_ALL_RECIPES,
  GET_RECIPE,
  CREATE_RECIPE,
  FILTER_BY_DIET,
  ORDER_A_TO_Z,
  ORDER_BY_SCORE,
  GET_RECIPES_BY_NAME,
  CLEAR_STATE,
  GET_DIETS,
  POST_RECIPE,
  DELETE_RECIPE
} from "../actions/Actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipe: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: state.houses.concat(payload),
      };
    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes;
      let dietFiltered 
        if (payload === "all") dietFiltered = allRecipes
        else{
          dietFiltered = allRecipes.filter(recipe =>{
            return typeof recipe.diets[0] === "object" ? recipe.diets.map(object => object.name).includes(payload) : recipe.diets.includes(payload)
          })
        }
        console.log(dietFiltered)
      return {
        ...state,
        recipes: dietFiltered,
      };
    case ORDER_A_TO_Z:
      let alphabeticOrder
        if(payload === "asc"){
            alphabeticOrder = [...state.recipes].sort((a, b) => {
               if (a.title.toLowerCase().trim() > b.title.toLowerCase().trim()) return 1;
               if (b.title.toLowerCase().trim() > a.title.toLowerCase().trim()) return -1;
               return 0;
             });
        }
        else if(payload === "desc"){
            alphabeticOrder = [...state.recipes].sort((a, b) => {
               if (a.title.toLowerCase().trim() > b.title.toLowerCase().trim()) return -1;
               if (b.title.toLowerCase().trim() > a.title.toLowerCase().trim()) return 1;
               return 0;
             });
        }
         else if(payload === "none") alphabeticOrder = state.allRecipes
      return {
        ...state,
        recipes: alphabeticOrder,
      };
      case ORDER_BY_SCORE:
          let orderByScore
          if(payload === "taste"){
            orderByScore = [...state.recipes].sort((a,b) =>{
              if(a.spoonacularScore > b.spoonacularScore) return 1
              if(a.spoonacularScore < b.spoonacularScore) return -1
              return 0
            })
          }
          else if(payload === "health"){
            orderByScore = [...state.recipes].sort((a, b) => {
                if (a.healthScore > b.healthScore) return 1;
                if (b.healthScore > a.healthScore) return -1;
                return 0;
              });
          }  else if(payload === "none") orderByScore = state.allRecipes
          return {
            ...state,
            recipes: orderByScore,
          };
          case GET_RECIPES_BY_NAME:
            return {
              ...state,
              recipes: payload
            }
            case CLEAR_STATE: 
            return{
              ...state,
              recipe: {}
            }
            case GET_DIETS: 
            return{
              ...state,
              diets: payload
            }
            case POST_RECIPE:
              return{
                ...state
              }
              case DELETE_RECIPE:
                return{
                  ...state,
                }
    default:
      return { ...state };
  }
}