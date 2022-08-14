import React, { useState } from "react";

function Table() {
  const [data, setData] = React.useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchDataShow, setSearchDataShow] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Moives");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMovieData, setSortMovieData] = useState("Ascending");
  const pageSize = 4;

  const delteData = (id) => {
    const delteItem = data.filter((value, index) => {
      return id !== value;
    });
    setData(delteItem);
  };

  const fetchData = async () => {
    const response = await fetch("data.json");
    const userData = await response.json();
    setData(userData);
    setSearchData(userData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const newData = searchData.filter((value) => {
      return value.Title.toLowerCase().startsWith(searchDataShow.toLowerCase());
    });
    setData(newData);
  }, [searchDataShow]);

  const handleSearchDatashow = (e) => {
    setSearchDataShow(e.target.value);
  };

  const handleClickGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const selectedPageNumber = (genre) => {
    setCurrentPage(genre);
  };

  const selectedFilteredMoives =
    selectedGenre === "All Moives"
      ? data
      : data.filter((movies) => {
          return movies.Genre === selectedGenre ? true : false;
        });

  const getPages = () => {
    const pageItem = Math.ceil(selectedFilteredMoives.length / pageSize);
    const pages = [];
    for (let i = 1; i <= pageItem; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  const firstIndex = currentPage * pageSize - pageSize;
  const lastIndex = currentPage * pageSize - 1;

  const showMovies = selectedFilteredMoives.filter((value, index) => {
    if (index >= firstIndex && index <= lastIndex) {
      return true;
    }
    return false;
  });

  const sortData = (colData) => {
    sortMovieData === "Ascending"
      ? setSortMovieData("Decending")
      : setSortMovieData("Ascending");
    sortMovies(sortMovieData, colData);
  };

  const sortMovies = (sortMovieData, colData) => {
    if (colData === "Title") {
      sortMovieData === "Ascending"
        ? data.sort((preValue, nextValue) =>
            preValue.Title > nextValue.Title ? 1 : -1
          )
        : data.sort((preValue, nextValue) =>
            preValue.Title < nextValue.Title ? 1 : -1
          );
      return;
    } else if (colData === "Genre") {
      sortMovieData === "Ascending"
        ? data.sort((preValue, nextValue) =>
            preValue.Genre > nextValue.Genre ? 1 : -1
          )
        : data.sort((preValue, nextValue) =>
            preValue.Genre < nextValue.Genre ? 1 : -1
          );
      return;
    } else if (colData === "Type") {
      sortMovieData === "Ascending"
        ? data.sort((preValue, nextValue) =>
            preValue.Type > nextValue.Type ? 1 : -1
          )
        : data.sort((preValue, nextValue) =>
            preValue.Type < nextValue.Type ? 1 : -1
          );
      return;
    } else if (colData === "Rate") {
      sortMovieData === "Ascending"
        ? data.sort((preValue, nextValue) =>
            preValue.imdbRating > nextValue.imdbRating ? 1 : -1
          )
        : data.sort((preValue, nextValue) =>
            preValue.imdbRating < nextValue.imdbRating ? 1 : -1
          );
      return;
    }
  };

  return (
    <>
      <div className="container w-50 ">
        <input
          className="container w-25 mt-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchDataShow}
          onChange={handleSearchDatashow}
        ></input>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-3">
            <ul className="list-group mt-4">
              <li
                className={
                  selectedGenre === "All Moives"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => handleClickGenre("All Moives")}
              >
                All Movies
              </li>
              <li
                className={
                  selectedGenre === "Action"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => handleClickGenre("Action")}
              >
                Action
              </li>
              <li
                className={
                  selectedGenre === "Comedy"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => handleClickGenre("Comedy")}
              >
                Comedy
              </li>
              <li
                className={
                  selectedGenre === "Thriller"
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => handleClickGenre("Thriller")}
              >
                Thriller
              </li>
            </ul>
          </div>
          <div className="col container mt-5 ">
            <p>
              There are {selectedFilteredMoives.length} movies in The Database
            </p>
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col" onClick={() => sortData("Title")}>
                    Title
                  </th>
                  <th scope="col" onClick={() => sortData("Genre")}>
                    Genre
                  </th>
                  <th scope="col" onClick={() => sortData("Type")}>
                    Type
                  </th>
                  <th scope="col" onClick={() => sortData("Rate")}>
                    Rate
                  </th>
                </tr>
              </thead>
              {showMovies.map((value, index) => {
                return (
                  <tbody>
                    <tr>
                      <td> {value.Title}</td>
                      <td>{value.Genre}</td>
                      <td>{value.Type}</td>
                      <td>{value.imdbRating}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => delteData(value)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="nav">
              <ul className="pagination">
                {pages.map((value) => {
                  return (
                    <li
                      className={
                        currentPage === value ? "page-item active" : "page-item"
                      }
                    >
                      <button
                        className="page-link"
                        onClick={() => selectedPageNumber(value)}
                      >
                        {value}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
