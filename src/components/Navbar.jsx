import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { store, dispatch } = useGlobalReducer();

  const favorites = [
    ...store.favoritesCharacters.map(fav => ({ ...fav, type: "character" })),
    ...store.favoritesLocations.map(fav => ({ ...fav, type: "location" }))
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-yellow bg-yellow">
      <div className="container-fluid d-flex w-100 bg-yellow">
        <Link className="navbar-brand" to="/">The Simpsons</Link>

        <div className="dropdown ms-auto position-relative">
          <button
            className="btn btn-outline-warning dropdown-toggle"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            ❤️ {favorites.length}
          </button>

          {open && (
            <ul
              className="dropdown-menu show"
              style={{
                right: 0,
                left: "auto",
                maxHeight: "400px",
                overflowY: "auto",
                minWidth: "200px",
              }}
            >
              {favorites.length === 0 && (
                <li><span className="dropdown-item">No favorites yet</span></li>
              )}

              {favorites.map(fav => (
                <li key={fav.id} className="d-flex justify-content-between align-items-center px-2">

                  <span
                    className="dropdown-item flex-grow-1 mb-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/single/${fav.type}/${fav.id}`);
                      setOpen(false);
                    }}
                  >
                    {fav.name}
                  </span>
                    <Link to="/">
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => {
                      if (fav.type === "character") {
                        dispatch({ type: "toggle_favoriteCharacters", payload: fav });
                      } else {
                        dispatch({ type: "toggle_favoriteLocations", payload: fav });
                      }
                    }}
                  >
                    🗑️
                  </button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
