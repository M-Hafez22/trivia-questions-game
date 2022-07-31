import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SelectedCategoriesContext } from "../contexts/selectedCategories";
import { ThemeContext } from "../contexts/theme";

function Categroties() {
  const [{ isDark }] = useContext(ThemeContext);

  // Chosen category name
  const [value, setValue] = useState("");
  // Chosen category ID
  const [id, setId] = useState(15);

  const [{ selectedCategories }, setSelectedCategories] = useContext(
    SelectedCategoriesContext
  );

  // Fetch categorties from API
  const { isLoading, error, data } = useQuery(["data"], () =>
    fetch("https://opentdb.com/api_category.php").then((res) => res.json())
  );

  // choose random category (Name, ID)
  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * data?.trivia_categories?.length + 1
    );
    setSelectedCategories([
      ...selectedCategories,
      data?.trivia_categories?.[randomIndex]?.name,
    ]);
    setId(data?.trivia_categories?.[randomIndex]?.id);
  }, [data]);
  // handle Loading
  if (isLoading) return "Loading...";
  // handle Error
  if (error) return "An error has occurred: " + error.message;
  // Get data
  const categories = data?.trivia_categories;
  const categoriesNames = categories?.map((category) => category.name);
  // Unchosen Categories
  const viewCategory = categoriesNames?.filter(
    (c) => !selectedCategories.includes(c)
  );
  // Choose Category
  const handleClick = (e) => {
    setValue(e.target.innerText);
    setId(categories?.[categoriesNames?.indexOf(e.target.innerText)]?.id);
  };
  // Add selected category to selected array
  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedCategories([...selectedCategories, value]);
  };
  return (
    <div>
      <p>Now Choose the Question Categroties</p>
      <ul>
        {viewCategory
          ? viewCategory?.map((category, i) => (
              <li key={i}>
                <button
                  onClick={handleClick}
                  className={
                    value === category
                      ? isDark
                        ? "level-btn dark active"
                        : "level-btn light active"
                      : isDark
                      ? "level-btn dark"
                      : "level-btn light"
                  }
                >
                  {category}
                </button>
              </li>
            ))
          : "Loading"}
      </ul>
      <button onClick={handleSubmit} className={isDark ? "dark submit" : "light submit"}>
        {viewCategory ? (
          <Link to={`/question/${id}/0`}>
            Choose {value === "" ? "Random" : value}
          </Link>
        ) : (
          <Link to={`/score`}>Score</Link>
        )}
      </button>
    </div>
  );
}

export default Categroties;
