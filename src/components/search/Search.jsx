import React, { useState } from "react";
import classes from "./search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ searchedId, setSearchedId, submitSearchHandler }) => {
  const [isNumber, setIsNumber] = useState(false);

  const isNumberKey = (e) => {
    if (isNaN(e.key) && e.key !== "Backspace") {
      setIsNumber(false);
    } else {
      setIsNumber(true);
    }
  };

  return (
    <form className={classes.search} onSubmit={submitSearchHandler}>
      <input
        type="text"
        value={searchedId}
        onKeyDown={isNumberKey}
        onChange={(e) => {
          if (isNumber) setSearchedId(e.target.value.trim());
        }}
        placeholder="Search product by ID..."
      ></input>
      <button type="submit">
        <AiOutlineSearch className={classes.icon} />
      </button>
    </form>
  );
};

export default Search;
