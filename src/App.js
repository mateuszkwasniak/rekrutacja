import { useEffect, useState } from "react";

import Search from "./components/search/Search";
import Table from "./components/products/Table";

import "./App.css";
import PageButtons from "./components/pagination/PageButtons";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(
    +new URLSearchParams(document.location.search).get("page") || 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [searchedId, setSearchedId] = useState(
    new URLSearchParams(document.location.search).get("productId") || ""
  );
  const [isSearching, setIsSearching] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [error, setError] = useState(false);

  const addQueryParameter = (name, value) => {
    const url = new URL(window.location);
    url.searchParams.set(`${name}`, value);
    window.history.replaceState(null, "", url.toString());
  };

  const clearQueryParameter = (name) => {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.replaceState(null, "", url.toString());
  };

  const fetchSingleProduct = async (id) => {
    setError(false);
    const response = await fetch(`https://reqres.in/api/products?id=${id}`);
    if (response.ok) {
      const filtered = await response.json();
      setProducts([filtered.data]);
      setSearchedId("");
    } else {
      if (/^[4]/.test(response.status.toString())) {
        setError("No results found");
      } else if (/^[5]/.test(test(response.status.toString()))) {
        setError(
          "Sorry we have some internal problems. Please try again later."
        );
      } else {
        setError("Something went wrong");
      }
    }
  };

  const submitSearchHandler = async (e) => {
    e.preventDefault();
    if (searchedId !== "") {
      clearQueryParameter("page");
      const id = +searchedId;
      addQueryParameter("productId", id);
      setIsSearching(true);
      fetchSingleProduct(id);
    }
  };

  const fetchProducts = async (pg) => {
    setError(false);
    const response = await fetch(
      `https://reqres.in/api/products?page=${pg}&per_page=5`
    );
    if (response.ok) {
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts.data);
      setTotalPages(fetchedProducts.total_pages);
    } else {
      setError(true);
      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    if (initLoad) {
      if (searchedId !== "") {
        fetchSingleProduct(searchedId);
        setIsSearching(true);
      }
      setInitLoad(false);
    }
  }, [initLoad, searchedId]);

  return (
    <div className="app">
      <Search
        searchedId={searchedId}
        setSearchedId={setSearchedId}
        submitSearchHandler={submitSearchHandler}
      />
      {error ? (
        <p className="errorMsg">{error}</p>
      ) : (
        <Table products={products} />
      )}
      <PageButtons
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        addPageQuery={addQueryParameter}
        clearProductIdQuery={clearQueryParameter.bind(null, "productId")}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default App;
