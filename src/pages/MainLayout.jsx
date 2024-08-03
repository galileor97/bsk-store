import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";


const MainLayout = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Outlet context={{ searchTerm }} />
    </>
  )
}

export default MainLayout