import React, { useEffect, useState, } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card";
import ProductRequest from "../../helper/ProductRequest";
import { Dropdown } from "flowbite-react";
import { Pagination } from "flowbite-react";




const HomePage = () => {

  
  const [products, setProducts] = useState([]);
  const { searchTerm } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState()
  const [limitPage, setLimitPage] = useState(8)
  const [sortOption, setSortOption] = useState('');


  const onPageChange = (page) => setCurrentPage(page);

  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const getAllProduct = async () => {
    try {

      let url = `/pub/products?page[number]=${currentPage}&page[size]12=${limitPage}&sort=${sortOption}`;
      if (searchTerm) {
        url = `/pub/products/?filter=${searchTerm}`;
      }
      let { data } = await ProductRequest({
        url: url,
        method: "GET",
      });
      setProducts(data);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };


  useEffect(() => {
    getAllProduct();
  }, [searchTerm, currentPage, limitPage, sortOption]);



  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex mb-6 justify-between">
          {/* SORT */}
          <div className="text-black text-2xl font-graphikMedium">
            <Dropdown label="Sort" inline>
              <Dropdown.Item onClick={() => handleSort('-updatedAt')}>Latest</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('updatedAt')}>Oldest</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('price')}>Low to High</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('-price')}>High to Low</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('name')}>Name (A-Z)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('-name')}>Name (Z-A)</Dropdown.Item>
            </Dropdown>
          </div>
          <h1 className="text-black font-graphik font-extrabold text-2xl">BRAND NEW COLLECTIONS</h1>
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data &&
            products.data.map((item) => <Card key={item.id} item={item} />)}
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-end pt-10 font-graphik text-lg ">
        {totalPage > 0 && (
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChange}
            showIcons
          />
        )}

      </div>
    </>
  );
};

export default HomePage;