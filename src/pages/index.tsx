import Header from "@/components/Header/Header";
import SearchForm from "@/components/SearchForm/SearchForm";
import FlightTable from "@/components/FlightTable/FlightTable";
import { useState } from "react";

export default function Home() {
  const [searchData, setSearchData] = useState(null); // [1

  const handleSearchSubmit = (data: any) => {
    setSearchData(data);
    console.log(searchData);
  };
  return (
    <>
      <Header></Header>
      <div className="pt-16">
        {" "}
        {/* pt-16 ile Header yüksekliği kadar boşluk bırakılır */}
        <SearchForm onSubmit={handleSearchSubmit}></SearchForm>
        {/* <FlightTable searchData={searchData}></FlightTable> */}
      </div>
    </>
  );
}
