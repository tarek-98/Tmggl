import React, { Fragment, useEffect } from "react";
import SearchFiltre from "../components/search/SearchFiltre";

function SearchPage() {
  useEffect(() => {
    document.title = "Search Page";
  }, []);
  return (
    <Fragment>
      <SearchFiltre />
    </Fragment>
  );
}

export default SearchPage;
