import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://thesimpsonsapi.com/api/characters")
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "set_characters",
          payload: data.results
        });
      })
      .catch(err => console.error("Error fetching characters:", err));

    fetch("https://thesimpsonsapi.com/api/locations")
      .then(res => res.json())
      .then(data => {
        const locationsWithImage = data.results.map((loc, index) => ({
          ...loc,
          image: `https://cdn.thesimpsonsapi.com/1280/location/${index + 1}.webp`
        }));
        dispatch({ type: "set_locations", payload: locationsWithImage });
      })
      .catch(err => console.error("Error fetching locations:", err));
  }, [dispatch]);

  if (store.characters.length === 0) {
    return <h2 className="text-center mt-5">Loading characters...</h2>;
  }

  return (
    <div>
      <h1 className="text-warning mb-4">Characters</h1>
      <div className="d-flex overflow-auto">
        {store.characters.map(character => (
          <div
            className="card me-3"
            style={{ minWidth: "300px" }}
            key={character.id}
          >
            <img
              src={`https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`}
              className="card-img-top"
              style={{ height: "300px", objectFit: "cover" }}
              alt={character.name}
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <div className="d-flex justify-content-between">
                <Link to={`/single/character/${character.id}`}>
                  <button className="btn btn-outline-primary">Learn more!</button>
                </Link>
                <button
                  className={`btn ${store.favoritesCharacters.some(fav => fav.id === character.id)
                    ? "btn-warning"
                    : "btn-outline-warning"
                    }`}
                  onClick={() =>
                    dispatch({
                      type: "toggle_favoriteCharacters",
                      payload: character
                    })
                  }
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <h2 className="text-warning mb-4">Locations</h2>
      <div className="d-flex overflow-auto">
        {store.locations.map(location => (
          <div
            className="card me-3"
            style={{ minWidth: "250px" }}
            key={location.id}
          >
            <img
              src={location.image}
              className="card-img-top"
              alt={location.name}
              style={{ height: "200px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{location.name}</h5>
              <p className="card-text">
                {location.use}
              </p>
              <div className="d-flex justify-content-between">
                <Link to={`/single/location/${location.id}`}>
                  <button className="btn btn-outline-primary">Learn more!</button>
                </Link>
                <button
                  className={`btn ${store.favoritesLocations.some(fav => fav.id === location.id)
                    ? "btn-warning"
                    : "btn-outline-warning"
                    }`}
                  onClick={() =>
                    dispatch({
                      type: "toggle_favoriteLocations",
                      payload: location
                    })
                  }
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
