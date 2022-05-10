import {Link} from "react-router-dom"
import styles from "./home.module.css"

export default function homePage(){
    return(
        <div className={styles.home}>
            <div className={styles.entrance}>
            <Link to = "/recipes">
                <button type="button" className={styles.homeBtn}>Enter</button>
            </Link>
            <h1>Enter to the FoodVerse</h1>
            </div>
        </div>
    )
}