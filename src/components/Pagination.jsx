import React from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pagesToShow = 5;
    const pageNumbers = [];

    let startPage;
    if (currentPage <= pagesToShow) {
      startPage = 1;
    } else {
      startPage = currentPage - 2;
    }

    for (let i = startPage; i <= totalPages && pageNumbers.length < pagesToShow; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="pagination">
      {currentPage > 5 && (
        <button className="pagination-button" onClick={() => handlePageChange(1)}>
          <AiOutlineDoubleLeft/>
        </button>
      )}

      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 5)}
        disabled={currentPage === 1}
      >
        <BsChevronCompactLeft/>
      </button>

      {renderPageNumbers()}

      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 5)}
        disabled={currentPage === totalPages}
      >
        <BsChevronCompactRight/>
      </button>

      {currentPage + 10 <= totalPages && (
        <button className="pagination-button" onClick={() => handlePageChange(currentPage + 10)}>
          <AiOutlineDoubleRight/>
        </button>
      )}
    </div>
  );
};

export default Pagination;
