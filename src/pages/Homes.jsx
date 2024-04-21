import "../css/index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Homes() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRepos = () => {
    fetch(
      `https://api.github.com/users/dalley98/repos?per_page=1&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setShowViewMore("End of Repos");
        } else {
          setUser((user) => [...user, ...data]);
          setShowViewMore("View More");
        }
      });
  };

  useEffect(() => {
    fetchRepos();
  }, [currentPage]);

  const viewMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUserElements = user.filter((userElement) =>
    userElement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search repositories"
          value={searchQuery}
          onChange={handleSearchChange}
        />
       
      </div>
      <section className="repo-container">
        {filteredUserElements.map((userElement) => (
          <div className="repo-card" key={userElement.id}>
            <Link to={`/repodetails/${userElement.name}`}>
              <h2 className="repo-name">{userElement.name}</h2>
            </Link>
            <p className="language">
              Language:{" "}
              {userElement.language === null ? "none" : userElement.language}
            </p>
            <p className="date">Start date & time: {userElement.created_at}</p>
            <p className="visiility">Visibility: {userElement.visibility}</p>
          </div>
        ))}
      </section>
      <div className="view-more-container">
        <button className="view-more" onClick={viewMore}>
            {showViewMore}
        </button>
      </div>
    </>
  );
}

export default Homes;
