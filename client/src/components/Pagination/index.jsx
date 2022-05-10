import React from "react";
import style from "./Pagination.module.css"

export default function Pagination({
  recipesPerPage,
  recipes,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.navBar}>
      <ul className={style.lowerBar}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className={style.numbers}>
              <a onClick={() => paginate(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
