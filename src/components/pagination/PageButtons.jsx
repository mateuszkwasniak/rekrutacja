import React from "react";
import classes from "./pagination.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PageButtons = ({
  totalPages,
  page,
  setPage,
  clearProductIdQuery,
  addPageQuery,
  isSearching,
  setIsSearching,
  fetchProducts,
}) => {
  const pagination = (currPage, direction) => {
    if (direction === "next") {
      if (currPage < totalPages) {
        clearProductIdQuery();
        addPageQuery("page", page + 1);
        setPage((prev) => prev + 1);
      }
    } else {
      if (currPage > 1) {
        clearProductIdQuery();
        addPageQuery("page", page - 1);
        setPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className={classes.buttons}>
      {!isSearching ? (
        <>
          <button
            className={classes.btn}
            onClick={() => {
              pagination(page, "prev");
            }}
          >
            <FaChevronLeft />
          </button>
          <p>{page}</p>
          <button
            className={classes.btn}
            onClick={() => {
              pagination(page, "next");
            }}
          >
            <FaChevronRight />
          </button>
        </>
      ) : (
        <button
          className={classes.btn}
          onClick={() => {
            clearProductIdQuery();
            setIsSearching(false);
            fetchProducts(1);
          }}
        >
          Check All
        </button>
      )}
    </div>
  );
};

export default PageButtons;
