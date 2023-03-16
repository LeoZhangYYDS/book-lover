import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
//compoments
import Nav from "./components/Nav";
import Footer from "./components/Footer";

//react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//css
import "./scss/style.css";

//google book api
import googleBook from "./services/googleBook";

const App = () => {
  const [query, setQuery] = useState("nonFiction");
  const [bookData, setBookData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // call api
  useEffect(() => {
    async function getData() {
      try {
        const res = await googleBook(query);
        setBookData(res.data.items);
        console.log(res.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [query]);

  //get search box input value and setQuery => on button click
  const handleClick = (value) => {
    setQuery(value);
  };

  //set dark mode on button click if not dark mode
  const DarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    // id will change by click the button
    <div id={`${isDarkMode ? "dark" : "light"}`}>
      <button id="button" onClick={DarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <Nav handleClick={handleClick} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home bookData={bookData} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
