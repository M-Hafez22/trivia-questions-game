import React from "react";
import { useQuery } from "@tanstack/react-query";

function Categroties() {
  // Display categorties
  const { isLoading, error, data } = useQuery(["data"], () =>
    fetch("https://opentdb.com/api_category.php").then((res) => res.json())
  );
  // handle Loading
  if (isLoading) return "Loading...";
  // handle Error
  if (error) return "An error has occurred: " + error.message;
  // Get data
  const categories = data.trivia_categories;
  const categoriesNames =  categories.map((category) => (category.name));
  const categoriesIds =  categories.map((category) => (category.id));
  console.log(categoriesNames)
  console.log(categoriesIds)

  return (
    <div>
      <h1>Categroties</h1>
      <ul>{categoriesNames?.map((category, i) => <li key={i}><button>{category}</button></li>)}</ul>
    </div>
  );
}

export default Categroties;
