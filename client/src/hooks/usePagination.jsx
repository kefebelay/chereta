import { useState } from "react";

function usePagination(items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return { currentPage, totalPages, currentItems, handlePageChange };
}

export default usePagination;
{
  /*
usage
const[items,setItems]=useState([])
const ITEMS_PER_PAGE = 8;
const { currentPage, totalPages, currentItems, handlePageChange } = usePagination(items, itemsPerPage);
  usePagination(items, ITEMS_PER_PAGE);
currentItems.map
 <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>; 
*/
}
