import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) 
    pageNumbers.push(i);
      
  return (
    <div className="product__pagination">
      {currentPage==1?"":<button onClick={()=>paginate(currentPage-1)}><i className="fas fa-arrow-left"></i></button>}
      {pageNumbers.map((number) => (<a key={number} className={number == currentPage ? "active": ""} onClick={() => paginate(number)}>{number}</a>))}
      {currentPage==pageNumbers.length?"":<button onClick={()=>paginate(currentPage+1)}><i className="fas fa-arrow-right"></i></button>}
    </div> 
  );
};
export default Pagination;
