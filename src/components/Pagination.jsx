import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <ul className="pagination mt-3  d-flex align-items-center justify-content-center">
      {Array.from({ length: totalPages }).map((_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
        >
          <button onClick={() => paginate(index + 1)} className="page-link">
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
