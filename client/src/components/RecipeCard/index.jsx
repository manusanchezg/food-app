import style from "./card.module.css";
import { Link } from "react-router-dom";

export default function RecipeCard({ image, title, diets, id }) {
  return (
    
      <>
        <Link to={`/recipes/${id}`} style={{"textDecoration": "none"}}>
          <h3 className={style.title}>{ title.split(" ").map(word => word[0].toUpperCase() + word.slice(1) + " ")}</h3>
        </Link>
        <img src={image} alt={title} className={style.image} />
        <div  className={style.text}> <span className={style.dietType}>Diet Type:</span>{diets}</div>
      </>
  );
}