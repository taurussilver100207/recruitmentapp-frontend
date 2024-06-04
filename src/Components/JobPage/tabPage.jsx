import React from 'react';

const Pagination = ({ currentPage, pages, setPage }) => {
    const handlePageClick = (page) => {
        setPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 0; i < pages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-4 py-2 border ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {i + 1}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-4 space-x-1">
            {renderPageNumbers()}
        </div>
    );
};

export default Pagination;
