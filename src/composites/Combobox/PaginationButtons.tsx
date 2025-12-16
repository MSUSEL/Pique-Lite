import React from "react";
import { Flex, Link } from "@radix-ui/themes";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

//Pagination logic
export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Flex direction="row" gap="3" mt="4">
      <Link
        onClick={handlePreviousPage}
        style={{
          color: currentPage === 1 ? "gray" : "blue",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Previous
      </Link>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          style={{
            color: currentPage === index + 1 ? "black" : "blue",
            cursor: "pointer",
          }}
        >
          {index + 1}
        </Link>
      ))}
      <Link
        onClick={handleNextPage}
        style={{
          color: currentPage === totalPages ? "gray" : "blue",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </Link>
    </Flex>
  );
};
