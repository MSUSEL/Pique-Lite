import React from "react";
import { Link } from "react-router-dom";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages
}) => {
  return (
    <div>
      <Link
        to={`?page=${currentPage - 1}`}
        onClick={(e) => {
          if (currentPage === 1) e.preventDefault();
        }}
        style={{
          color: currentPage === 1 ? "gray" : "blue",
          cursor: currentPage === 1 ? "not-allowed" : "pointer"
        }}
      >
        Previous
      </Link>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index + 1}
          to={`?page=${index + 1}`}
          style={{
            color: currentPage === index + 1 ? "black" : "blue",
            cursor: "pointer"
          }}
        >
          {index + 1}
        </Link>
      ))}
      <Link
        to={`?page=${currentPage + 1}`}
        style={{
          color: currentPage === totalPages ? "gray" : "blue",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer"
        }}
        onClick={(e) => {
          if (currentPage === totalPages) e.preventDefault();
        }}
      >
        Next
      </Link>
    </div>
  );
}; 