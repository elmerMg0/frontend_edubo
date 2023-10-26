import { useEffect, useRef, useState } from "react";
import './pagination.css'
import { PageInfo } from "../../../models/models";
let maxPages: number;

interface Props {
    pageInfo: PageInfo,
    getData: (page: number) => void
}   

function Pagination ({ pageInfo, getData }: Props) {
  let { page, next, previus, totalPages } = pageInfo;
  const pageInfoRef = useRef<PageInfo>();

  const [pageNumbers, setPageNumbers] = useState<number[]>([])
  useEffect(() => {
    maxPages = window.innerWidth < 700 ? 2 : 3
    //solo actualizar cuando se modifican los filtros.
    if(pageNumbers.length === 0 || pageInfoRef.current?.totalPages !== totalPages){
      if(totalPages > maxPages){
        setPageNumbers(Array.from({ length: maxPages }, (_, i) => i + 1))
      }else{
        setPageNumbers(Array.from({ length: totalPages }, (_, i) => i + 1))
      }
      pageInfoRef.current = pageInfo;
    }
    //return;
  
  },[pageInfo])
  
  const handlePrevius = () => {
    getData(previus)
    if(page === pageNumbers[0]) handleSwapListLeft();
  }
  
  const handleNext = () => {
    getData(next)
    if(page === pageNumbers[pageNumbers.length - 1]) handleSwapListRight();
  };

  const handleSwapListLeft = () => {
    let ini = pageNumbers[0] - maxPages;
    setPageNumbers(Array.from({ length: maxPages }, (_, i) => ini + i));
  }

  const handleSwapListRight = () => {
    let ini = pageNumbers[pageNumbers.length - 1];
    let nroMaxPages =  totalPages - ini;
    if(nroMaxPages > maxPages){
      nroMaxPages = maxPages;
    }
    if(nroMaxPages > 0) setPageNumbers(Array.from({ length: nroMaxPages }, (_, i) => ini + i + 1));
  }

  return (
    <div className="paginator">

      <button disabled={page === 1 ? true: false} onClick={handlePrevius} className={`paginator-btn ${page === 1 ? 'btn-disabled': ''}`}>{"<-Prev"}</button>
    
      {
        pageNumbers[0] > 1 && <p onClick={handleSwapListLeft}>
          ....
        </p>
      }
      {
        totalPages > 0 ?  pageNumbers.map((number) => {
          return <button key={crypto.randomUUID()} className={`pagination-numbers ${page === number ? "page-active": ''}`} onClick={() => getData(number)}>
              <p>{number}</p>
          </button>
        }):''
      }
      {
        totalPages > maxPages && totalPages !== pageNumbers[pageNumbers.length - 1] && <p onClick={handleSwapListRight}>
          ....
        </p>
      }
      <button disabled={page === totalPages ? true: false} onClick={handleNext} className={`paginator-btn ${page === totalPages? "btn-disabled": ''}`}>{"Next->"}</button>
    </div>
  );
};

export default Pagination;