import React, { useState } from "react";
import CompanyList from "./CompanyList";
import Search from "./Search";
import { getCompanies } from "../api";
import Filter from "./Filter";
import Pagination from "./Pagination";

const HomeScreen = () => {
  const companysPerPage = 2;
  const [companyList, setComapnyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    try {
      const { data } = await getCompanies();
      setComapnyList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCompany = currentPage * companysPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companysPerPage;
  const currentCompanys = companyList.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  return (
    <div className="home">
      <Search setComapnyList={setComapnyList} onGetData={getData} paginate={paginate}/>
      <Filter setComapnyList={setComapnyList} />
      <CompanyList
        companyList={currentCompanys}
        setComapnyList={setComapnyList}
        getData={getData}
      />
      <Pagination
        postsPerPage={companysPerPage}
        totalPosts={companyList.length}
        paginate={paginate}
      />
    </div>
  );
};

export default HomeScreen;
