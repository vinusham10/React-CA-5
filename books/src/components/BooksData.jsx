import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BooksRendered from "./BooksRendered";
import "../css/BooksData.css";


export const AuthContext = React.createContext();
function BooksData() {
  const [bookData, setBookData] = useState([]); 
  const [searchItem, setSearchItem] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" }, 
      })
      .then((res) => {
        setBookData(res.data.books); 
      })
      .catch(() => alert("Network Error"));
  }, []);

  const handleSearch = (e) => {
    const inputValue = e.target.value; 
    setSearchItem(inputValue);
    if (inputValue !== "") {
      const relatedBooks = bookData.filter((book) =>
        book.title.toLowerCase().includes(inputValue.toLowerCase())
      ); 
      setSearchItem(relatedBooks); 
      setSearchQuery(inputValue); 
    }
  };

  const newBooks = searchItem.length > 0 ? searchItem : bookData;
  return (
    <>
      <div id="nav">
        <div>
          <div>
            {" "}
            <img src="https://kalvium.com/wp-content/uploads/2022/07/Logo-nav.png"></img>{" "}
            {/*Kalvium Logo*/}
          </div>
          <div>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search Kalvium books"
            ></input>{" "}
          </div>
        </div>
        <div>
          {
            <Link to="/register">
              {" "}
              <button>Register</button>{" "}
            </Link>
          }
        </div>
      </div>
      {searchItem.length > 0 ? (
        <p id="possible-results">
          Showing the results for <em id="results-title">{searchQuery}</em>
        </p>
      ) : null}{" "}
      <BooksRendered bookData={newBooks} />{" "}
    </>
  );
}

export default BooksData;