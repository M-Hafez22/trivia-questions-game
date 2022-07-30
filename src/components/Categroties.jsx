import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SelectedCategoriesContext } from "../contexts/selectedCategories";

function Categroties() {
  const [value, setValue] = useState("");
  const [id, setId] = useState(15);

  const [{ selectedCategories }, setSelectedCategories] = useContext(
    SelectedCategoriesContext
  );
  // Display categorties
  const { isLoading, error, data } = useQuery(["data"], () =>
    fetch("https://opentdb.com/api_category.php").then((res) => res.json())
  );
  // handle Loading
  if (isLoading) return "Loading...";
  // handle Error
  if (error) return "An error has occurred: " + error.message;
  // Get data
  const categories = data?.trivia_categories;
  const categoriesNames = categories?.map((category) => category.name);
  // const categoriesIds = categories.map((category) => category.id);

  const handleClick = (e) => {
    setValue(e.target.innerText);
    setId(categories?.[categoriesNames?.indexOf(e.target.innerText)]?.id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setId(categories?.[categoriesNames?.indexOf(value)]?.id);
    const randomIndex = Math.floor(Math.random() * categoriesNames.length + 1);
    value === ""
      ? setSelectedCategories([
          ...selectedCategories,
          categoriesNames[randomIndex],
        ])
      : setSelectedCategories([...selectedCategories, value]);
  };
  return (
    <div>
      <h1>Categroties</h1>
      <p>
        Now Choose the Question Categroties:{value} - ID:{id}
      </p>
      <ul>
        {categoriesNames?.map((category, i) => (
          <li key={i}>
            <button onClick={handleClick}>{category}</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>
        <Link to={`/question/${id}/0`}>
          Choose {value === "" ? "Random" : value}
        </Link>
      </button>
    </div>
  );
}

export default Categroties;
