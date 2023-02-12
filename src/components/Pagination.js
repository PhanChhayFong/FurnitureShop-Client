import React from "react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  next,
  prev,
}) => {
  const pageNumbers = [];
  //   console.log(itemsPerPage,totalItems,paginate)
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++)
    pageNumbers.push(i);

  const currentItems = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="product__pagination">
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "d-none" : ""}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      {pageNumbers.map((number) => (
        <a
          key={number}
          className={number == currentPage ? "active" : ""}
          onClick={() => paginate(number)}
        >
          {number}
        </a>
      ))}
      <button
        onClick={next}
        disabled={currentItems <= currentPage}
        className={currentItems <= currentPage ? "d-none" : ""}
      >
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};
export default Pagination;
