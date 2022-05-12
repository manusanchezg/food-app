import style from "./card.module.css";
import { Link } from "react-router-dom";
// import { deleteRecipe } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

export default function RecipeCard({ image, title, diets, id, myDataBase }) {

  // const dispatch = useDispatch()
  
  // useEffect(() =>{
  //   dispatch(deleteRecipe(id))
  // }, [dispatch, id])

  return (
      <>
          {/* {myDataBase ?
            <button onClick={deleteRecipe(id)}> X </button> : false } */}
        <Link to={`/recipes/${id}`} style={{"textDecoration": "none"}}>
          <h3 className={style.title}>{ title.split(" ").map(word => word[0].toUpperCase() + word.slice(1) + " ")}</h3>
        </Link>
        <img src={image} alt={title} className={style.image} />
        <div  className={style.text}> <span className={style.dietType}>Diet Type:</span>{diets}</div>
      </>
  );
}