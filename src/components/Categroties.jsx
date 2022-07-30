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
  console.dir(categories)
  return (
    <div>
      <h1>Categroties</h1>
    </div>
  );
}

export default Categroties;
